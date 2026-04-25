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

function sortedKeys(record: Record<string, unknown>): string[] {
  return Object.keys(record).sort()
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

function applyInlineRpg(src: string, cfg: RpgRendererConfig, options?: RenderRpgMarkdownOptions): string {
  let output = src.replace(/@([a-z]+):([\w-]+)/gi, (_all, type: string, id: string) => {
    const entityType = type.toLowerCase()
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
    installContainer(container, type, {
      render(tokens: { nesting: number; type: string }[], idx: number) {
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
      render(tokens: { nesting: number; type: string }[], idx: number) {
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

  return md
}

let cachedKey = ''
let cachedMd: MarkdownIt | null = null

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

export function extractHeadingsForLinkPicker(source: string, cfg: RpgRendererConfig): { text: string; slug: string }[] {
  const frontmatter = splitLeadingFrontmatter(source)
  const markdownBody = frontmatter ? frontmatter.body : source
  const withCallouts = preprocessCallouts(markdownBody, cfg)
  const withInline = preprocessInline(withCallouts, cfg)
  const md = getMd(cfg)
  const tokens = md.parse(fixMarkdownParenDestinationsWithWhitespace(withInline), {})
  const out: { text: string; slug: string }[] = []

  for (let i = 0; i < tokens.length; i += 1) {
    const token = tokens[i]
    if (token?.type === 'heading_open') {
      const inline = tokens[i + 1]
      if (inline?.type === 'inline') {
        const text = anchorStyleInlinePlainText(inline)
        const slug = tokenAttrGet(token, 'id') ?? ''
        if (text && slug) out.push({ text, slug })
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
  ADD_ATTR: ['data-entity', 'data-id', 'data-title', 'data-block', 'data-callout', 'id', 'tabindex', 'class'],
  ADD_TAGS: ['aside', 'header', 'section'],
  ALLOWED_URI_REGEXP:
    /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|#|\/|\.\/|\.\.\/|[^a-z]|[a-z+.-]+(?:[^a-z+.-:]|$))/i,
}

export function renderRpgMarkdown(source: string, cfg: RpgRendererConfig, options?: RenderRpgMarkdownOptions): string {
  const frontmatter = splitLeadingFrontmatter(source)
  const markdownBody = frontmatter ? frontmatter.body : source
  const md = getMd(cfg)
  const withCallouts = preprocessCallouts(markdownBody, cfg)
  const withInline = preprocessInline(withCallouts, cfg, options)
  const raw = md.render(fixMarkdownParenDestinationsWithWhitespace(withInline))
  const rewritten = rewriteLocalRefs(raw, options)
  const sanitized = String(DOMPurify.sanitize(rewritten, PURIFY_PREVIEW))
  return frontmatter ? renderFrontmatterPreview(frontmatter.inner) + sanitized : sanitized
}
