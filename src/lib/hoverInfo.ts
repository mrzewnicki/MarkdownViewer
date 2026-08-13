import type {
  ContentFile,
  HoverInfoNamespaceConfig,
  MarkdownTableRegistrySource,
  ProjectContent,
  RpgRendererConfig,
} from '../types'

export interface HoverInfoKey {
  namespace: string
  id: string
}

export interface HoverInfo {
  title: string
  body: string
}

export interface HoverInfoProvider {
  resolve(key: HoverInfoKey): HoverInfo | null
}

const EMPTY_PROVIDER: HoverInfoProvider = {
  resolve: () => null,
}

const MD_LINK_RE = /\[([^\]]+)\]\([^)]*\)/g
const HTML_TAG_RE = /<[^>]+>/g

export function normalizeHoverInfoId(value: string): string {
  return value.replace(/-/g, ' ').trim().toLocaleLowerCase('pl')
}

function stripCellMarkdown(raw: string): string {
  return raw
    .replace(MD_LINK_RE, '$1')
    .replace(HTML_TAG_RE, '')
    .replace(/\\\|/g, '|')
    .trim()
}

function parseTableRows(block: string): string[][] {
  const rows: string[][] = []
  for (const line of block.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed.startsWith('|')) continue
    const cells = trimmed
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((cell) => cell.trim())
    if (cells.length === 0) continue
    if (cells.every((cell) => /^:?-{3,}:?$/.test(cell))) continue
    rows.push(cells)
  }
  return rows
}

function extractSectionBody(markdown: string, heading: string): string {
  const headingRe = new RegExp(`^##\\s+${escapeRegExp(heading)}\\s*$`, 'im')
  const match = headingRe.exec(markdown)
  if (!match || match.index == null) return ''
  const start = match.index + match[0].length
  const rest = markdown.slice(start)
  const nextHeading = rest.search(/^##\s+/m)
  return nextHeading >= 0 ? rest.slice(0, nextHeading) : rest
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function columnIndex(headers: string[], name: string): number {
  const target = name.trim().toLocaleLowerCase('pl')
  return headers.findIndex((header) => header.trim().toLocaleLowerCase('pl') === target)
}

function parseNamespaceEntries(
  markdown: string,
  namespace: string,
  config: HoverInfoNamespaceConfig,
  into: Map<string, HoverInfo>,
): void {
  const body = extractSectionBody(markdown, config.heading)
  if (!body) return

  const rows = parseTableRows(body)
  if (rows.length < 2) return

  const headers = rows[0]!.map(stripCellMarkdown)
  const nameIdx = columnIndex(headers, config.nameColumn)
  const descIdx = columnIndex(headers, config.descriptionColumn)
  if (nameIdx < 0 || descIdx < 0) return

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i]!
    const name = stripCellMarkdown(row[nameIdx] ?? '')
    const description = stripCellMarkdown(row[descIdx] ?? '')
    if (!name || !description) continue
    const key = `${namespace}:${normalizeHoverInfoId(name)}`
    into.set(key, { title: name, body: description })
  }
}

export function parseMarkdownTableRegistry(
  markdown: string,
  namespaces: Record<string, HoverInfoNamespaceConfig>,
): Map<string, HoverInfo> {
  const entries = new Map<string, HoverInfo>()
  for (const [namespace, config] of Object.entries(namespaces)) {
    parseNamespaceEntries(markdown, namespace, config, entries)
  }
  return entries
}

function resolveRegistryFile(project: ProjectContent, filePath: string): ContentFile | null {
  const normalized = filePath.replace(/\\/g, '/').replace(/^\.\//, '')
  return (
    project.fileMap.get(normalized) ??
    project.fileMap.get(`${normalized}.md`) ??
    project.routeMap.get(normalized.replace(/\.md$/i, '')) ??
    null
  )
}

function buildFromMarkdownTableRegistry(
  project: ProjectContent,
  source: MarkdownTableRegistrySource,
  into: Map<string, HoverInfo>,
): void {
  const file = resolveRegistryFile(project, source.file)
  if (!file) return
  const parsed = parseMarkdownTableRegistry(file.content, source.namespaces)
  for (const [key, value] of parsed) {
    into.set(key, value)
  }
}

export function createHoverInfoProvider(
  project: ProjectContent,
  config: RpgRendererConfig = project.config,
): HoverInfoProvider {
  const sources = config.renderer.hoverInfo?.sources
  if (!sources?.length) return EMPTY_PROVIDER

  const entries = new Map<string, HoverInfo>()
  for (const source of sources) {
    if (source.kind === 'markdownTableRegistry') {
      buildFromMarkdownTableRegistry(project, source, entries)
    }
  }

  if (entries.size === 0) return EMPTY_PROVIDER

  return {
    resolve(key: HoverInfoKey): HoverInfo | null {
      const lookup = `${key.namespace}:${normalizeHoverInfoId(key.id)}`
      return entries.get(lookup) ?? null
    },
  }
}

export function parseHoverInfoAttr(raw: string | null): HoverInfoKey | null {
  if (!raw) return null
  const sep = raw.indexOf(':')
  if (sep <= 0) return null
  const namespace = raw.slice(0, sep).trim().toLowerCase()
  const id = raw.slice(sep + 1).trim()
  if (!namespace || !id) return null
  return { namespace, id }
}
