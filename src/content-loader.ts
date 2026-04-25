import {
  DEFAULT_RPG_CONFIG,
  type ContentFile,
  type FileTreeNode,
  type ProjectContent,
  type RpgRendererConfig,
} from './types'
import { basename, normalizePath, withoutMarkdownExtension } from './lib/paths'

const markdownModules = import.meta.glob<string>('/content/**/*.{md,markdown,mdx}', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const configModules = import.meta.glob<{ default: unknown }>('/content/**/.rpg-renderer/config.json', {
  eager: true,
})

const assetModules = import.meta.glob<string>('/content/**/*.{png,jpg,jpeg,gif,webp,svg,bmp,ico}', {
  query: '?url',
  import: 'default',
  eager: true,
})

function parseContentPath(path: string): { projectId: string; relativePath: string } | null {
  const normalized = normalizePath(path).replace(/^content\//, '').replace(/^\/content\//, '')
  const [projectId, ...rest] = normalized.split('/')
  if (!projectId || rest.length === 0) return null
  return { projectId, relativePath: rest.join('/') }
}

function cloneConfig(config: RpgRendererConfig): RpgRendererConfig {
  return {
    ...config,
    entityTypes: { ...config.entityTypes },
    icons: { ...config.icons },
    calloutTypes: { ...config.calloutTypes },
    paths: { ...config.paths },
    scan: { ...config.scan },
    preview: { ...config.preview },
    renderer: { ...config.renderer },
  }
}

function mergeConfig(projectConfig: unknown): RpgRendererConfig {
  const base = cloneConfig(DEFAULT_RPG_CONFIG)
  if (!projectConfig || typeof projectConfig !== 'object') return base

  const partial = projectConfig as Partial<RpgRendererConfig>
  return {
    ...base,
    ...partial,
    entityTypes: { ...base.entityTypes, ...(partial.entityTypes ?? {}) },
    icons: { ...base.icons, ...(partial.icons ?? {}) },
    calloutTypes: { ...base.calloutTypes, ...(partial.calloutTypes ?? {}) },
    paths: { ...base.paths, ...(partial.paths ?? {}) },
    scan: { ...base.scan, ...(partial.scan ?? {}) },
    preview: { ...base.preview, ...(partial.preview ?? {}) },
    renderer: { ...base.renderer, ...(partial.renderer ?? {}) },
  }
}

function readFrontmatterTitle(content: string): string | null {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  const inner = match?.[1]
  if (!inner) return null
  const titleMatch = inner.match(/^title:\s*(.+)$/m)
  if (!titleMatch?.[1]) return null
  return titleMatch[1].trim().replace(/^['"]|['"]$/g, '')
}

function readHeadingTitle(content: string): string | null {
  const match = content.match(/^#\s+(.+)$/m)
  return match?.[1]?.trim() || null
}

function titleFromPath(path: string): string {
  return basename(withoutMarkdownExtension(path)).replace(/[-_]+/g, ' ').trim()
}

function titleForFile(path: string, content: string): string {
  return readFrontmatterTitle(content) ?? readHeadingTitle(content) ?? titleFromPath(path)
}

function compareFiles(a: ContentFile, b: ContentFile): number {
  const depthDelta = a.path.split('/').length - b.path.split('/').length
  if (depthDelta !== 0) return depthDelta
  return a.path.localeCompare(b.path, 'pl')
}

function insertTreeNode(root: FileTreeNode[], file: ContentFile): void {
  const parts = file.path.split('/')
  let level = root

  for (let i = 0; i < parts.length; i += 1) {
    const part = parts[i]!
    const isFile = i === parts.length - 1
    let node = level.find((item) => item.name === part)

    if (!node) {
      node = {
        name: part,
        path: parts.slice(0, i + 1).join('/'),
        kind: isFile ? 'file' : 'dir',
        children: isFile ? undefined : [],
      }
      level.push(node)
    }

    if (isFile) {
      node.title = file.title
      node.path = file.path
      node.kind = 'file'
    } else {
      node.children ??= []
      level = node.children
    }
  }
}

function sortTree(nodes: FileTreeNode[]): FileTreeNode[] {
  return nodes
    .sort((a, b) => {
      if (a.kind !== b.kind) return a.kind === 'dir' ? -1 : 1
      return a.name.localeCompare(b.name, 'pl')
    })
    .map((node) => ({
      ...node,
      children: node.children ? sortTree(node.children) : undefined,
    }))
}

function buildTree(files: ContentFile[]): FileTreeNode[] {
  const root: FileTreeNode[] = []
  for (const file of files) insertTreeNode(root, file)
  return sortTree(root)
}

function projectTitle(id: string): string {
  return id.replace(/[-_]+/g, ' ').replace(/\b\p{L}/gu, (letter) => letter.toLocaleUpperCase('pl'))
}

function buildProjects(): ProjectContent[] {
  const projectConfigs = new Map<string, RpgRendererConfig>()
  const projectFiles = new Map<string, ContentFile[]>()
  const projectAssets = new Map<string, Map<string, string>>()

  for (const [path, module] of Object.entries(configModules)) {
    const parsed = parseContentPath(path)
    if (!parsed) continue
    projectConfigs.set(parsed.projectId, mergeConfig(module.default ?? module))
  }

  for (const [path, content] of Object.entries(markdownModules)) {
    const parsed = parseContentPath(path)
    if (!parsed) continue
    const relativePath = normalizePath(parsed.relativePath)
    const file: ContentFile = {
      path: relativePath,
      routePath: withoutMarkdownExtension(relativePath),
      title: titleForFile(relativePath, content),
      content,
    }
    const files = projectFiles.get(parsed.projectId) ?? []
    files.push(file)
    projectFiles.set(parsed.projectId, files)
  }

  for (const [path, url] of Object.entries(assetModules)) {
    const parsed = parseContentPath(path)
    if (!parsed) continue
    const assets = projectAssets.get(parsed.projectId) ?? new Map<string, string>()
    assets.set(normalizePath(parsed.relativePath), url)
    projectAssets.set(parsed.projectId, assets)
  }

  const ids = new Set([...projectConfigs.keys(), ...projectFiles.keys(), ...projectAssets.keys()])
  return Array.from(ids)
    .sort((a, b) => a.localeCompare(b, 'pl'))
    .map((id) => {
      const files = [...(projectFiles.get(id) ?? [])].sort(compareFiles)
      const fileMap = new Map(files.map((file) => [file.path, file]))
      const routeMap = new Map(files.map((file) => [file.routePath, file]))
      return {
        id,
        title: projectTitle(id),
        config: projectConfigs.get(id) ?? cloneConfig(DEFAULT_RPG_CONFIG),
        files,
        fileMap,
        routeMap,
        tree: buildTree(files),
        assets: projectAssets.get(id) ?? new Map<string, string>(),
      }
    })
}

export const projects = buildProjects()

export function getProject(projectId: string | undefined): ProjectContent | null {
  if (!projectId) return null
  return projects.find((project) => project.id === projectId) ?? null
}

export function getFirstFile(project: ProjectContent): ContentFile | null {
  return project.files[0] ?? null
}
