import MarkdownIt from 'markdown-it'
import type Token from 'markdown-it/lib/token.mjs'
import markdownItAnchor from 'markdown-it-anchor'
import container from 'markdown-it-container'
import { slug as githubHeadingSlug } from 'github-slugger'
import DOMPurify from 'dompurify'
import type { RpgRendererConfig } from '../types'
import {
  resolveCalloutIcon,
  resolveCalloutLabel,
  resolveEntityIcon,
  resolveEntityLabel,
} from './entityMeta'

export interface MarkdownHeading {
  text: string
  slug: string
  level: number
}

export interface MarkdownHeadingLink {
  text: string
  slug: string
}

export interface ContainerRenderToken {
  nesting: number
  type: string
}

export interface TimelineSubitem {
  date: string
  name: string
}

export interface TimelineItem {
  date: string
  name: string
  subitems: TimelineSubitem[]
}

function sortedKeys(record: Record<string, unknown>): string[] {
  return Object.keys(record).sort()
}

const SPECIAL_OPEN_RE = /^([ \t]*)```(ai|wip)\b[^\n]*$/
const BARE_CLOSE_RE = /^([ \t]*)```[ \t]*$/

function isSpecialOpen(line: string): { indent: string; lang: 'ai' | 'wip' } | null {
  const m = SPECIAL_OPEN_RE.exec(line)
  if (!m) return null
  return { indent: m[1] ?? '', lang: m[2] as 'ai' | 'wip' }
}

function isBareCloseAtIndent(line: string, indent: string): boolean {
  const m = BARE_CLOSE_RE.exec(line)
  return Boolean(m && m[1] === indent)
}

/**
 * Hidden AI notes as a CommonMark type-1 HTML block (`<pre>`).
 * A `<div>` ends at the first blank line, leaving an open tag that hides the rest of the doc.
 */
function renderAiInstructionsHtml(content: string): string {
  const safe = escapeHtml(content).replace(/<\/pre/gi, '&lt;/pre')
  // Newlines keep a trailing `:::` from gluing to `</pre>` (that broke mutation closers).
  return `<pre class="ai-instructions" aria-hidden="true">\n${safe}\n</pre>\n`
}

/** Indent-aware ```ai / ```wip so nested fences do not close the block early. */
function preprocessAiWipFences(src: string): string {
  const lines = src.split(/\r?\n/)
  const out: string[] = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i] ?? ''
    const open = isSpecialOpen(line)
    if (!open) {
      out.push(line)
      i++
      continue
    }
    i++
    const contentLines: string[] = []
    while (i < lines.length && !isBareCloseAtIndent(lines[i] ?? '', open.indent)) {
      contentLines.push(lines[i] ?? '')
      i++
    }
    if (i < lines.length) i++
    const content = contentLines.join('\n')
    if (open.lang === 'wip') continue
    out.push(renderAiInstructionsHtml(content))
  }
  return out.join('\n')
}

function preprocessCallouts(src: string, cfg: RpgRendererConfig): string {
  const allowed = new Set(Object.keys(cfg.calloutTypes))
  const lines = src.split(/\n/)
  const out: string[] = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i] ?? ''
    const match = line.match(/^>\s*\[!([a-z][a-z0-9-]*)\]\s*(.*)$/i)
    if (match) {
      const kind = match[1]?.toLowerCase() ?? ''
      if (!allowed.has(kind)) {
        out.push(line)
        i += 1
        continue
      }
      const title = match[2] ?? ''
      const body: string[] = []
      i += 1
      while (i < lines.length && /^>\s?/.test(lines[i] ?? '')) {
        body.push((lines[i] ?? '').replace(/^>\s?/, ''))
        i += 1
      }
      out.push(`::: callout-${kind}`)
      if (title.trim()) out.push(`### ${title.trim()}`)
      out.push(...body)
      out.push(':::')
      continue
    }
    out.push(line)
    i += 1
  }
  return out.join('\n')
}

function splitCodeAware(src: string): { text: string; code: string }[] {
  const re = /(```[\s\S]*?```|`[^`\n]+`)/g
  const chunks: { text: string; code: string }[] = []
  let last = 0
  let match: RegExpExecArray | null
  while ((match = re.exec(src)) !== null) {
    if (match.index > last) chunks.push({ text: src.slice(last, match.index), code: '' })
    chunks.push({ text: '', code: match[0] })
    last = match.index + match[0].length
  }
  if (last < src.length) chunks.push({ text: src.slice(last), code: '' })
  return chunks
}

function fixMarkdownParenDestinationsWithWhitespace(src: string): string {
  const wrapIfNeeded = (dest: string): string | null => {
    const trimmed = dest.trim()
    if (!trimmed || trimmed.startsWith('<')) return null
    if (!/\s/.test(trimmed)) return null
    return `<${trimmed}>`
  }

  const fixChunk = (text: string): string => {
    let fixed = text.replace(/!\[([^\]]*)\]\(([^)<][^)]*)\)/g, (full, alt: string, dest: string) => {
      const wrapped = wrapIfNeeded(dest)
      return wrapped ? `![${alt}](${wrapped})` : full
    })
    fixed = fixed.replace(/\[([^\]]+)\]\(([^)<][^)]*)\)/g, (full, label: string, dest: string) => {
      const wrapped = wrapIfNeeded(dest)
      return wrapped ? `[${label}](${wrapped})` : full
    })
    return fixed
  }

  return splitCodeAware(src)
    .map((chunk) => (chunk.code ? chunk.code : fixChunk(chunk.text)))
    .join('')
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function escapeAttr(value: string): string {
  return escapeHtml(value).replace(/'/g, '&#39;')
}

export interface RenderRpgMarkdownOptions {
  currentFilePath?: string
  resolveWikiHref?: (title: string, currentFilePath?: string) => string | null
  resolveAssetSrc?: (src: string, currentFilePath?: string) => string | null
  resolveDocumentHref?: (href: string, currentFilePath?: string) => string | null
}

function formatInlineDisplayName(id: string): string {
  return id.replace(/-/g, ' ')
}

function parseOptionalRank(raw: string | undefined): number | null {
  if (raw == null || raw === '') return null
  const n = Number(raw)
  return Number.isFinite(n) ? n : null
}

function applyInlineRpg(src: string, cfg: RpgRendererConfig, options?: RenderRpgMarkdownOptions): string {
  // Ranked @pros / @cons (rank optional) must run before generic @type:id.
  let output = src.replace(
    /@(pros|cons):([\p{L}\p{N}_-]+)(?:\((\d+)\))?/giu,
    (_all, type: string, id: string, rankRaw: string | undefined) => {
      const variant = type.toLowerCase() === 'cons' ? 'cons' : 'pros'
      const displayName = formatInlineDisplayName(id)
      const rank = parseOptionalRank(rankRaw)
      const icon = variant === 'pros' ? '✚' : '−'
      const tip =
        rank == null
          ? variant === 'pros'
            ? `Zaleta · ${displayName}`
            : `Wada · ${displayName}`
          : variant === 'pros'
            ? `Zaleta · ${displayName} (${rank})`
            : `Wada · ${displayName} (${rank})`
      const numHtml =
        rank == null
          ? ''
          : `<span class="pros-cons-badge-num" aria-label="ranga ${escapeAttr(String(rank))}">${escapeHtml(String(rank))}</span>`
      return `<span class="pros-cons-badge pros-cons-badge--${variant}" data-hover-info="${escapeAttr(`${variant}:${id}`)}" title="${escapeAttr(tip)}"><span class="pros-cons-badge-icon" aria-hidden="true">${icon}</span><span class="pros-cons-badge-id">${escapeHtml(displayName)}</span>${numHtml}</span>`
    },
  )

  output = output.replace(/@([a-z][a-z0-9-]*):([\p{L}\p{N}_-]+)/giu, (_all, type: string, id: string) => {
    const entityType = type.toLowerCase()
    if (entityType === 'pros' || entityType === 'cons') return `@${type}:${id}`
    const label = resolveEntityLabel(entityType, cfg)
    const icon = resolveEntityIcon(entityType, cfg, '')
    return `<span class="rpg-inline rpg-inline-ref" data-entity="${escapeAttr(entityType)}" data-id="${escapeAttr(id)}"><span class="rpg-inline-icon">${icon}</span><span class="rpg-inline-label">${escapeHtml(label)}</span><span class="rpg-inline-id">${escapeHtml(id)}</span></span>`
  })

  if (cfg.renderer?.wikiLinks !== false) {
    output = output.replace(/\[\[([^\]]+)\]\]/g, (_all, title: string) => {
      const wikiTitle = title.trim()
      const href = options?.resolveWikiHref?.(wikiTitle, options.currentFilePath)
      if (!href) {
        return `<span class="rpg-wikilink is-missing" data-title="${escapeAttr(wikiTitle)}">${escapeHtml(wikiTitle)}</span>`
      }
      return `<a class="rpg-wikilink" data-title="${escapeAttr(wikiTitle)}" href="${escapeAttr(href)}">${escapeHtml(wikiTitle)}</a>`
    })
  }

  return output
}

const LEADING_FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---/

function splitLeadingFrontmatter(source: string): { inner: string; body: string } | null {
  const match = source.match(LEADING_FRONTMATTER_RE)
  if (!match || match.index !== 0) return null
  return { inner: match[1] ?? '', body: source.slice(match[0].length) }
}

function renderFrontmatterPreview(inner: string): string {
  return `<aside class="markdown-frontmatter"><pre>${escapeHtml(inner)}</pre></aside>`
}

function preprocessInline(src: string, cfg: RpgRendererConfig, options?: RenderRpgMarkdownOptions): string {
  return splitCodeAware(src)
    .map((chunk) => (chunk.code ? chunk.code : applyInlineRpg(chunk.text, cfg, options)))
    .join('')
}

// ─── Timeline block ──────────────────────────────────────────────────────────

function parseTimelineContent(src: string): TimelineItem[] {
  const lines = src.split(/\r?\n/)
  const items: TimelineItem[] = []
  const itemRe = /^(\s*)([-*])\s*(?:\[([^\]]*)\])?\s*(.*)$/

  for (const line of lines) {
    if (!line.trim()) continue
    const m = line.match(itemRe)
    if (!m) continue
    const indent = m[1] ?? ''
    const date = (m[3] ?? '').trim()
    const name = (m[4] ?? '').trim()
    const isSubitem = indent.length > 0

    if (isSubitem) {
      const parent = items[items.length - 1]
      if (parent) parent.subitems.push({ date, name })
    } else {
      items.push({ date, name, subitems: [] })
    }
  }

  return items
}

function dateGroupKey(date: string): string {
  if (!date) return ''
  const yMatch = date.match(/^(\d{4})/)
  if (yMatch) return yMatch[1] ?? ''
  return date
}

function timelineSubitemCountLabel(count: number): string {
  return `${count} elementów`
}

function renderTimelineBlock(src: string, renderInline: (text: string) => string): string {
  const items = parseTimelineContent(src)
  if (items.length === 0) return '<div class="timeline-block"></div>\n'

  const parts: string[] = ['<div class="timeline-block">']
  let currentGroupKey: string | null = null
  let inGroup = false

  for (const item of items) {
    const groupKey = dateGroupKey(item.date)

    if (groupKey !== currentGroupKey) {
      if (inGroup) parts.push('</div></div>')
      currentGroupKey = groupKey
      inGroup = true
      parts.push('<div class="timeline-group">')
      if (groupKey) {
        parts.push('<div class="timeline-group-header">')
        parts.push('<div class="timeline-group-dot"></div>')
        parts.push(`<div class="timeline-group-label">${escapeHtml(groupKey)}</div>`)
        parts.push('</div>')
      }
      parts.push('<div class="timeline-group-items">')
    }

    const hasSubitems = item.subitems.length > 0
    const itemClass = hasSubitems
      ? 'timeline-item has-subitems is-expanded'
      : 'timeline-item'
    const dateAttr = item.date ? ` data-date="${escapeAttr(item.date)}"` : ''
    const expandAttr = hasSubitems
      ? ' data-timeline-expandable aria-expanded="true"'
      : ''

    parts.push(`<div class="${itemClass}"${dateAttr}${expandAttr}>`)
    parts.push('<div class="timeline-dot"></div>')
    parts.push('<div class="timeline-item-body">')
    if (item.date) parts.push(`<span class="timeline-date">${escapeHtml(item.date)}</span>`)
    parts.push(`<span class="timeline-name">${renderInline(item.name)}</span>`)

    if (hasSubitems) {
      parts.push(
        `<span class="timeline-collapsed-count">${escapeHtml(timelineSubitemCountLabel(item.subitems.length))}</span>`
      )
      parts.push('<span class="timeline-chevron" aria-hidden="true"></span>')
      parts.push('<div class="timeline-subitems-wrapper">')
      parts.push('<div class="timeline-subitems">')
      for (const sub of item.subitems) {
        parts.push('<div class="timeline-subitem">')
        parts.push('<div class="timeline-subitem-dot"></div>')
        if (sub.date) parts.push(`<span class="timeline-date">${escapeHtml(sub.date)}</span>`)
        parts.push(`<span class="timeline-name">${renderInline(sub.name)}</span>`)
        parts.push('</div>')
      }
      parts.push('</div>')
      parts.push('</div>')
    }

    parts.push('</div></div>')
  }

  if (inGroup) parts.push('</div></div>')
  parts.push('</div>')
  return parts.join('\n') + '\n'
}

// ─── Mutation card (Option B) ────────────────────────────────────────────────

interface MutationTrait {
  title: string
  description: string
}

interface MutationRankEffect {
  rank: number
  effect: string
}

interface MutationFields {
  name: string
  pochodzenie: string
  rodzaj: string
  opis: string
  ranga: string
  charakter: string
  /** Legacy snapshot (Atuty/Wady) — used only if `wplyw` is empty. */
  atuty: MutationTrait[]
  wady: MutationTrait[]
  kosztAktywacji: string
  /** Pasywna: Wpływ per Ranga */
  wplyw: MutationRankEffect[]
  /** Aktywna: Aktywacja per Ranga */
  aktywacja: MutationRankEffect[]
  rezonans: string
}

const MUTATION_OPEN_RE = /^([ \t]*):::mutation[ \t]*$/i
const MUTATION_CLOSE_RE = /^([ \t]*):::[ \t]*$/
const MUTATION_FIELD_RE = /^([ \t]*)([-*])\s+([^:]+):\s*(.*)$/
const MUTATION_NAME_RE = /^\*\*([^*]+)\*\*\s*(.*)$/
const RANK_LABELS: Record<number, string> = {
  1: 'Zalążek',
  2: 'Adaptacja',
  3: 'Rozwinięta',
  4: 'Dominacja',
}

function normalizeMutationOrigin(raw: string): string {
  const t = raw.trim()
  if (/^anomali/i.test(t)) return 'Anomalie'
  if (/^livecore$/i.test(t)) return 'LiveCore'
  if (/^deathnet$/i.test(t)) return 'DeathNet'
  return t
}

function normalizeMutationCharacter(raw: string): string {
  const t = raw.trim()
  if (/^pasywn/i.test(t)) return 'Pasywna'
  if (/^aktywn/i.test(t)) return 'Aktywna'
  return t
}

function parseRankNumber(ranga: string): number | null {
  const m = ranga.trim().match(/^(\d+)/)
  if (!m) return null
  const n = Number(m[1])
  return Number.isFinite(n) ? n : null
}

function splitTraitLine(rest: string): MutationTrait {
  const sep = rest.indexOf(' - ')
  if (sep >= 0) {
    return { title: rest.slice(0, sep).trim(), description: rest.slice(sep + 3).trim() }
  }
  const colon = rest.indexOf(': ')
  if (colon >= 0) {
    return { title: rest.slice(0, colon).trim(), description: rest.slice(colon + 2).trim() }
  }
  return { title: rest.trim(), description: '' }
}

const MUTATION_TOP_LEVEL_KEYS = new Set([
  'nazwa',
  'pochodzenie',
  'rodzaj',
  'opis',
  'ranga',
  'charakter',
  'koszt aktywacji',
  'rezonans',
  'atuty',
  'wady',
  'wpływ per ranga',
  'wplyw per ranga',
  'aktywacja per ranga',
  'aktywacja',
])

function pushRankEffect(
  target: MutationRankEffect[],
  key: string,
  value: string,
): void {
  const rankMatch = key.match(/^ranga\s+(\d+)$/i)
  if (rankMatch) {
    target.push({ rank: Number(rankMatch[1]), effect: value })
  } else {
    target.push({
      rank: target.length + 1,
      effect: `${key}${value ? `: ${value}` : ''}`,
    })
  }
}

function parseMutationFields(src: string): MutationFields {
  const fields: MutationFields = {
    name: '',
    pochodzenie: '',
    rodzaj: '',
    opis: '',
    ranga: '',
    charakter: '',
    atuty: [],
    wady: [],
    kosztAktywacji: '',
    wplyw: [],
    aktywacja: [],
    rezonans: '',
  }

  type NestMode = null | 'atuty' | 'wady' | 'wplyw' | 'aktywacja'
  let nest: NestMode = null
  const lines = src.split(/\r?\n/)

  const pushNestItem = (key: string, value: string): void => {
    if (nest === 'atuty') {
      fields.atuty.push(splitTraitLine(key + (value ? `: ${value}` : '')))
    } else if (nest === 'wady') {
      fields.wady.push(splitTraitLine(key + (value ? `: ${value}` : '')))
    } else if (nest === 'wplyw') {
      pushRankEffect(fields.wplyw, key, value)
    } else if (nest === 'aktywacja') {
      pushRankEffect(fields.aktywacja, key, value)
    }
  }

  const pushNestRest = (rest: string): void => {
    if (nest === 'atuty') fields.atuty.push(splitTraitLine(rest))
    else if (nest === 'wady') fields.wady.push(splitTraitLine(rest))
    else if (nest === 'wplyw' || nest === 'aktywacja') {
      const rankMatch = rest.match(/^ranga\s+(\d+)\s*:\s*(.*)$/i)
      const target = nest === 'wplyw' ? fields.wplyw : fields.aktywacja
      if (rankMatch) {
        target.push({ rank: Number(rankMatch[1]), effect: (rankMatch[2] ?? '').trim() })
      } else {
        target.push({ rank: target.length + 1, effect: rest })
      }
    }
  }

  for (const line of lines) {
    if (!line.trim()) continue

    const nameMatch = MUTATION_NAME_RE.exec(line.trim())
    if (nameMatch && !fields.name) {
      const base = (nameMatch[1] ?? '').trim()
      const suffix = (nameMatch[2] ?? '').trim()
      fields.name = suffix ? `${base} ${suffix}` : base
      nest = null
      continue
    }

    const fieldMatch = MUTATION_FIELD_RE.exec(line)
    if (fieldMatch) {
      const indent = fieldMatch[1] ?? ''
      const key = (fieldMatch[3] ?? '').trim()
      const value = (fieldMatch[4] ?? '').trim()
      const keyLower = key.toLowerCase()
      const isTopLevelKey = MUTATION_TOP_LEVEL_KEYS.has(keyLower)

      if (indent.length > 0 || (nest && !isTopLevelKey)) {
        pushNestItem(key, value)
        continue
      }

      nest = null
      if (keyLower === 'nazwa') fields.name = value
      else if (keyLower === 'pochodzenie') fields.pochodzenie = value
      else if (keyLower === 'rodzaj') fields.rodzaj = value
      else if (keyLower === 'opis') fields.opis = value
      else if (keyLower === 'ranga') fields.ranga = value
      else if (keyLower === 'charakter') fields.charakter = value
      else if (keyLower === 'koszt aktywacji') fields.kosztAktywacji = value
      else if (keyLower === 'rezonans') fields.rezonans = value
      else if (keyLower === 'atuty') {
        nest = 'atuty'
        if (value) fields.atuty.push(splitTraitLine(value))
      } else if (keyLower === 'wady') {
        nest = 'wady'
        if (value) fields.wady.push(splitTraitLine(value))
      } else if (keyLower === 'wpływ per ranga' || keyLower === 'wplyw per ranga') {
        nest = 'wplyw'
      } else if (keyLower === 'aktywacja per ranga' || keyLower === 'aktywacja') {
        nest = 'aktywacja'
      }
      continue
    }

    const bulletMatch = nest
      ? /^([ \t]*)([-*])\s+(.*)$/.exec(line)
      : /^([ \t]+)([-*])\s+(.*)$/.exec(line)
    if (bulletMatch && nest) {
      pushNestRest((bulletMatch[3] ?? '').trim())
    }
  }

  return fields
}

function mutationOriginIcon(origin: string): string {
  const o = normalizeMutationOrigin(origin)
  const file =
    o === 'LiveCore'
      ? 'LiveCoreIconTransparent.png'
      : o === 'DeathNet'
        ? 'DeathNetIconTransparent.png'
        : o === 'Anomalie'
          ? 'AnomalyIconTransparent.png'
          : null
  if (!file) return '<span class="rpg-mutation-chip-icon-fallback" aria-hidden="true">🧬</span>'
  // Project-root path (Viewer + Editor with projectRoot): /images/icons/...
  return `<img class="rpg-mutation-origin-icon" src="/images/icons/${escapeAttr(file)}" alt="" width="18" height="18" loading="lazy" decoding="async" />`
}

function mutationKindIcon(rodzaj: string): string {
  const r = rodzaj.trim().toLowerCase()
  if (r.startsWith('fizyc')) return '💪'
  if (r.startsWith('mental')) return '🧠'
  if (r.startsWith('psion')) return '🌀'
  return '•'
}

function mutationRankDots(rank: number | null): string {
  const n = rank == null || rank < 1 ? 0 : Math.min(4, Math.max(1, rank))
  const parts: string[] = ['<span class="rpg-mutation-rank-dots" aria-hidden="true">']
  for (let i = 1; i <= 4; i += 1) {
    const filled = i <= n
    parts.push(
      `<span class="rpg-mutation-rank-dot${filled ? ' is-filled' : ''}"></span>`,
    )
  }
  parts.push('</span>')
  return parts.join('')
}

function isMutationActive(fields: MutationFields): boolean {
  const ch = normalizeMutationCharacter(fields.charakter)
  if (ch === 'Aktywna') return true
  if (ch === 'Pasywna') return false
  if (fields.kosztAktywacji || fields.aktywacja.length > 0) return true
  if (fields.wplyw.length > 0 || fields.atuty.length > 0 || fields.wady.length > 0) return false
  return false
}

function renderMutationChip(icon: string, label: string, kind: string): string {
  if (!label.trim()) return ''
  const iconHtml = icon
    ? `<span class="rpg-mutation-chip-icon" aria-hidden="true">${icon}</span>`
    : ''
  return `<span class="rpg-mutation-chip rpg-mutation-chip--${escapeAttr(kind)}">${iconHtml}<span class="rpg-mutation-chip-label">${escapeHtml(label.trim())}</span></span>`
}

function renderMutationTraitList(items: MutationTrait[], variant: 'pros' | 'cons', renderInline: (text: string) => string): string {
  if (items.length === 0) return '<p class="rpg-mutation-empty">—</p>'
  const parts = ['<ul class="rpg-mutation-trait-list">']
  for (const item of items) {
    const titleHtml = item.title ? `<strong class="rpg-mutation-trait-title">${renderInline(item.title)}</strong>` : ''
    const descHtml = item.description ? `<span class="rpg-mutation-trait-desc">${renderInline(item.description)}</span>` : ''
    const sep = item.title && item.description ? ' — ' : ''
    parts.push(
      `<li class="rpg-mutation-trait rpg-mutation-trait--${variant}">${titleHtml}${sep}${descHtml}</li>`,
    )
  }
  parts.push('</ul>')
  return parts.join('')
}

function rankEffectLabel(rank: number): string {
  const name = RANK_LABELS[rank]
  return name ? `Ranga ${rank} (${name})` : `Ranga ${rank}`
}

function formatTraitPlain(t: MutationTrait): string {
  if (t.title && t.description) return `${t.title} - ${t.description}`
  return t.title || t.description
}

/** Legacy Atuty/Wady → jeden wiersz Wpływu na bieżącej randze. */
function legacyTraitsAsWplyw(fields: MutationFields): MutationRankEffect[] {
  if (fields.wplyw.length > 0) return fields.wplyw
  if (fields.atuty.length === 0 && fields.wady.length === 0) return []
  const parts = [
    ...fields.atuty.map(formatTraitPlain),
    ...fields.wady.map(formatTraitPlain),
  ].filter(Boolean)
  const rank = parseRankNumber(fields.ranga) ?? 1
  return [{ rank, effect: parts.join('; ') }]
}

function renderRankEffectCell(effect: string, renderInline: (text: string) => string): string {
  const parts = effect
    .split(';')
    .map((p) => p.trim())
    .filter(Boolean)
  if (parts.length <= 1) return renderInline(effect)
  return `<div class="rpg-mutation-effect-parts">${parts
    .map((p) => `<div class="rpg-mutation-effect-part">${renderInline(p)}</div>`)
    .join('')}</div>`
}

function renderMutationRanksTable(
  rows: MutationRankEffect[],
  label: string,
  renderInline: (text: string) => string,
): string {
  if (rows.length === 0) return ''
  const parts: string[] = [
    '<div class="rpg-mutation-ranks-wrap">',
    `<h4 class="rpg-mutation-section-label">${escapeHtml(label)}</h4>`,
    '<table class="rpg-mutation-ranks"><thead><tr><th>Ranga</th><th>Efekt</th></tr></thead><tbody>',
  ]
  for (const row of [...rows].sort((a, b) => a.rank - b.rank)) {
    parts.push(
      `<tr><td class="rpg-mutation-rank-num" title="${escapeAttr(rankEffectLabel(row.rank))}">${escapeHtml(String(row.rank))}</td><td>${renderRankEffectCell(row.effect, renderInline)}</td></tr>`,
    )
  }
  parts.push('</tbody></table></div>')
  return parts.join('\n')
}

function renderMutationCard(src: string, renderInline: (text: string) => string): string {
  const fields = parseMutationFields(src)
  const origin = normalizeMutationOrigin(fields.pochodzenie)
  const character = normalizeMutationCharacter(fields.charakter)
  const rankNum = parseRankNumber(fields.ranga)
  const active = isMutationActive(fields)
  const rankLabel =
    fields.ranga.trim() ||
    (rankNum != null ? `${rankNum} (${RANK_LABELS[rankNum] ?? ''})` : '')

  const chips = [
    renderMutationChip(mutationOriginIcon(origin), origin || fields.pochodzenie, 'origin'),
    renderMutationChip('', character || fields.charakter, 'character'),
    renderMutationChip(mutationKindIcon(fields.rodzaj), fields.rodzaj, 'kind'),
    renderMutationChip(mutationRankDots(rankNum), rankLabel, 'rank'),
  ]
    .filter(Boolean)
    .join('')

  const name = fields.name.trim() || 'Mutacja'
  const parts: string[] = [
    `<article class="rpg-mutation-card" data-block="mutation" data-origin="${escapeAttr(origin)}" data-character="${escapeAttr(character)}"${rankNum != null ? ` data-rank="${escapeAttr(String(rankNum))}"` : ''}${fields.rodzaj ? ` data-kind="${escapeAttr(fields.rodzaj)}"` : ''}>`,
    '<header class="rpg-mutation-head">',
    `<h3 class="rpg-mutation-name">${renderInline(name)}</h3>`,
    `<div class="rpg-mutation-chips">${chips}</div>`,
    '</header>',
    '<div class="rpg-mutation-body">',
  ]

  if (fields.opis.trim()) {
    parts.push(`<p class="rpg-mutation-opis">${renderInline(fields.opis.trim())}</p>`)
  }

  if (active) {
    if (fields.kosztAktywacji.trim()) {
      parts.push(
        `<p class="rpg-mutation-cost"><span class="rpg-mutation-section-label">Koszt aktywacji</span> ${renderInline(fields.kosztAktywacji.trim())}</p>`,
      )
    }
    parts.push(renderMutationRanksTable(fields.aktywacja, 'Aktywacja per Ranga', renderInline))
  } else {
    const wplywRows = legacyTraitsAsWplyw(fields)
    if (wplywRows.length > 0) {
      parts.push(renderMutationRanksTable(wplywRows, 'Wpływ per Ranga', renderInline))
    } else if (fields.atuty.length > 0 || fields.wady.length > 0) {
      parts.push('<div class="rpg-mutation-split">')
      parts.push('<section class="rpg-mutation-col rpg-mutation-col--pros">')
      parts.push('<h4 class="rpg-mutation-section-label">Atuty</h4>')
      parts.push(renderMutationTraitList(fields.atuty, 'pros', renderInline))
      parts.push('</section>')
      parts.push('<section class="rpg-mutation-col rpg-mutation-col--cons">')
      parts.push('<h4 class="rpg-mutation-section-label">Wady</h4>')
      parts.push(renderMutationTraitList(fields.wady, 'cons', renderInline))
      parts.push('</section>')
      parts.push('</div>')
    }
  }

  if (fields.rezonans.trim()) {
    parts.push(
      `<p class="rpg-mutation-rezonans"><span class="rpg-mutation-section-label">Rezonans</span> ${renderInline(fields.rezonans.trim())}</p>`,
    )
  }

  parts.push('</div></article>')
  return parts.join('\n') + '\n'
}

/** Convert `:::mutation` … `:::` into a ` ```mutation ` fence for custom rendering. */
function preprocessMutationBlocksInText(text: string): string {
  const lines = text.split(/\r?\n/)
  const out: string[] = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i] ?? ''
    const open = MUTATION_OPEN_RE.exec(line)
    if (!open) {
      out.push(line)
      i += 1
      continue
    }
    const indent = open[1] ?? ''
    i += 1
    const content: string[] = []
    while (i < lines.length) {
      const cur = lines[i] ?? ''
      const close = MUTATION_CLOSE_RE.exec(cur)
      if (close && (close[1] ?? '') === indent) {
        i += 1
        break
      }
      content.push(cur)
      i += 1
    }
    out.push(`${indent}\`\`\`mutation`)
    out.push(...content)
    out.push(`${indent}\`\`\``)
  }
  return out.join('\n')
}

/**
 * Protect AI instruction `<pre>` blocks and markdown code spans/fences so
 * `:::mutation` examples inside ```ai notes are not turned into real cards
 * (and cannot swallow the rest of the document when `:::` is glued to `</pre>`).
 */
function splitMutationProtected(src: string): { text: string; protected: string }[] {
  const re =
    /(<pre\b[^>]*\bai-instructions\b[^>]*>[\s\S]*?<\/pre>|```[\s\S]*?```|`[^`\n]+`)/gi
  const chunks: { text: string; protected: string }[] = []
  let last = 0
  let match: RegExpExecArray | null
  while ((match = re.exec(src)) !== null) {
    if (match.index > last) chunks.push({ text: src.slice(last, match.index), protected: '' })
    chunks.push({ text: '', protected: match[0] })
    last = match.index + match[0].length
  }
  if (last < src.length) chunks.push({ text: src.slice(last), protected: '' })
  return chunks
}

function preprocessMutationBlocks(src: string): string {
  return splitMutationProtected(src)
    .map((chunk) =>
      chunk.protected ? chunk.protected : preprocessMutationBlocksInText(chunk.text),
    )
    .join('')
}

// ─────────────────────────────────────────────────────────────────────────────

function blockClass(type: string): string {
  return `rpg-block rpg-block-${type}`
}

function calloutClass(kind: string): string {
  return `rpg-callout rpg-callout-${kind}`
}

function entityBlockKindFromToken(token: { type: string } | undefined, fallback: string): string {
  if (!token?.type) return fallback
  const match = /^container_([a-z0-9-]+)_open$/.exec(token.type)
  const slug = match?.[1]
  if (!slug || slug.startsWith('callout-')) return fallback
  return slug
}

function calloutKindFromToken(token: { type: string } | undefined, fallback: string): string {
  if (!token?.type) return fallback
  const match = /^container_(callout-[a-z0-9-]+)_open$/.exec(token.type)
  const slug = match?.[1]
  if (!slug?.startsWith('callout-')) return fallback
  return slug.slice('callout-'.length)
}

function buildMd(cfg: RpgRendererConfig): MarkdownIt {
  const md = new MarkdownIt({ html: true, linkify: true, typographer: true })
  const installContainer = md.use.bind(md) as (plugin: unknown, ...args: unknown[]) => MarkdownIt

  for (const type of sortedKeys(cfg.entityTypes)) {
    if (type === 'mutation') continue
    installContainer(container, type, {
      render(tokens: ContainerRenderToken[], idx: number) {
        const token = tokens[idx]
        if (!token) return ''
        const kind = entityBlockKindFromToken(token, type)
        const icon = resolveEntityIcon(kind, cfg, '📦')
        const label = resolveEntityLabel(kind, cfg)
        if (token.nesting === 1) {
          return `<div class="${blockClass(kind)}" data-block="${kind}"><header class="rpg-block-head"><span class="rpg-block-icon">${icon}</span><span class="rpg-block-title">${escapeHtml(label)}</span></header><div class="rpg-block-body">\n`
        }
        return '</div></div>\n'
      },
    })
  }

  for (const callout of sortedKeys(cfg.calloutTypes)) {
    const key = `callout-${callout}`
    installContainer(container, key, {
      render(tokens: ContainerRenderToken[], idx: number) {
        const token = tokens[idx]
        if (!token) return ''
        const kind = calloutKindFromToken(token, callout)
        const icon = resolveCalloutIcon(kind, cfg, '💬')
        const label = resolveCalloutLabel(kind, cfg)
        if (token.nesting === 1) {
          return `<aside class="${calloutClass(kind)}" data-callout="${kind}"><div class="rpg-callout-bar"></div><div class="rpg-callout-inner"><div class="rpg-callout-head"><span class="rpg-callout-icon">${icon}</span><span class="rpg-callout-label">${escapeHtml(label)}</span></div><div class="rpg-callout-content">\n`
        }
        return '</div></div></aside>\n'
      },
    })
  }

  md.use(markdownItAnchor, {
    permalink: false,
    tabIndex: false,
    slugify: (value: string) => githubHeadingSlug(value),
  })

  const origFence = md.renderer.rules.fence
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    if (token?.info.trim() === 'wip') return ''
    if (token?.info.trim() === 'ai') {
      return `${renderAiInstructionsHtml(token.content)}\n`
    }
    if (token?.info.trim() === 'timeline') {
      const renderInline = (text: string): string =>
        md.renderInline(applyInlineRpg(text, cfg, _currentRenderOptions))
      return renderTimelineBlock(token.content, renderInline)
    }
    if (token?.info.trim() === 'mutation') {
      const renderInline = (text: string): string =>
        md.renderInline(applyInlineRpg(text, cfg, _currentRenderOptions))
      return renderMutationCard(token.content, renderInline)
    }
    if (origFence) return origFence(tokens, idx, options, env, self)
    return self.renderToken(tokens, idx, options)
  }

  return md
}

let cachedKey = ''
let cachedMd: MarkdownIt | null = null
let _currentRenderOptions: RenderRpgMarkdownOptions | undefined

function getMd(cfg: RpgRendererConfig): MarkdownIt {
  const key = JSON.stringify(cfg)
  if (cachedMd && key === cachedKey) return cachedMd
  cachedKey = key
  cachedMd = buildMd(cfg)
  return cachedMd
}

function tokenAttrGet(token: Token, name: string): string | null {
  const attrs = token.attrs
  if (!attrs) return null
  for (const attr of attrs) {
    if (attr[0] === name) return attr[1] ?? null
  }
  return null
}

function anchorStyleInlinePlainText(inline: Token): string {
  if (inline.type !== 'inline' || !inline.children) return ''
  const parts: string[] = []
  for (const child of inline.children) {
    if (child.type === 'text' || child.type === 'code_inline') parts.push(child.content)
  }
  return parts.join('')
}

export function extractHeadingsForLinkPicker(source: string, cfg: RpgRendererConfig): MarkdownHeadingLink[] {
  return extractHeadingsForToc(source, cfg).map(({ text, slug }) => ({ text, slug }))
}

export function extractHeadingsForToc(source: string, cfg: RpgRendererConfig): MarkdownHeading[] {
  const frontmatter = splitLeadingFrontmatter(source)
  const markdownBody = frontmatter ? frontmatter.body : source
  const withAiWip = preprocessAiWipFences(markdownBody)
  const withMutations = preprocessMutationBlocks(withAiWip)
  const withCallouts = preprocessCallouts(withMutations, cfg)
  const withInline = preprocessInline(withCallouts, cfg)
  const md = getMd(cfg)
  const tokens = md.parse(fixMarkdownParenDestinationsWithWhitespace(withInline), {})
  const out: MarkdownHeading[] = []

  for (let i = 0; i < tokens.length; i += 1) {
    const token = tokens[i]
    if (token?.type === 'heading_open') {
      const inline = tokens[i + 1]
      if (inline?.type === 'inline') {
        const text = anchorStyleInlinePlainText(inline)
        const slug = tokenAttrGet(token, 'id') ?? ''
        const level = Number.parseInt(token.tag.slice(1), 10)
        if (text && slug && Number.isInteger(level)) out.push({ text, slug, level })
      }
    }
  }

  return out
}

function rewriteLocalRefs(html: string, options?: RenderRpgMarkdownOptions): string {
  if (typeof document === 'undefined') return html
  const template = document.createElement('template')
  template.innerHTML = html

  for (const img of template.content.querySelectorAll('img[src]')) {
    const src = img.getAttribute('src') ?? ''
    const resolved = options?.resolveAssetSrc?.(src, options.currentFilePath)
    if (resolved) img.setAttribute('src', resolved)
  }

  for (const anchor of template.content.querySelectorAll('a[href]')) {
    const href = anchor.getAttribute('href') ?? ''
    const resolved = options?.resolveDocumentHref?.(href, options.currentFilePath)
    if (resolved) anchor.setAttribute('href', resolved)
  }

  return template.innerHTML
}

const PURIFY_PREVIEW: import('dompurify').Config = {
  ADD_ATTR: [
    'data-entity',
    'data-id',
    'data-title',
    'data-block',
    'data-callout',
    'data-date',
    'data-timeline-expandable',
    'data-hover-info',
    'data-origin',
    'data-character',
    'data-rank',
    'data-kind',
    'id',
    'tabindex',
    'class',
    'title',
    'aria-label',
    'aria-hidden',
  ],
  ADD_TAGS: ['aside', 'header', 'section', 'article'],
  ALLOWED_URI_REGEXP:
    /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|#|\/|\.\/|\.\.\/|[^a-z]|[a-z+.-]+(?:[^a-z+.-:]|$))/i,
}

export function renderRpgMarkdown(source: string, cfg: RpgRendererConfig, options?: RenderRpgMarkdownOptions): string {
  const frontmatter = splitLeadingFrontmatter(source)
  const markdownBody = frontmatter ? frontmatter.body : source
  const md = getMd(cfg)
  const withAiWip = preprocessAiWipFences(markdownBody)
  const withMutations = preprocessMutationBlocks(withAiWip)
  const withCallouts = preprocessCallouts(withMutations, cfg)
  const withInline = preprocessInline(withCallouts, cfg, options)
  _currentRenderOptions = options
  const raw = md.render(fixMarkdownParenDestinationsWithWhitespace(withInline))
  _currentRenderOptions = undefined
  const rewritten = rewriteLocalRefs(raw, options)
  const sanitized = String(DOMPurify.sanitize(rewritten, PURIFY_PREVIEW))
  return frontmatter ? renderFrontmatterPreview(frontmatter.inner) + sanitized : sanitized
}
