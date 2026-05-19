import { useEffect, useMemo, useRef } from 'react'
import { renderRpgMarkdown } from '../lib/rpgMarkdown'
import { buildDocumentHeadingLinkUrl, resolveRelativePath, toProjectHref, withoutMarkdownExtension } from '../lib/paths'
import type { ContentFile, ProjectContent } from '../types'
import { CommentLayer } from './CommentLayer'

interface MarkdownContentProps {
  project: ProjectContent
  file: ContentFile
}

function normalizeLookup(value: string): string {
  return value.trim().toLocaleLowerCase('pl')
}

function wipToggleStem(stem: string): string {
  if (/\.wip$/i.test(stem)) return stem.replace(/\.wip$/i, '')
  return `${stem}.wip`
}

function resolveWikiFile(project: ProjectContent, title: string, currentFilePath: string): ContentFile | null {
  const requested = title.trim()
  const withoutHash = requested.split('#')[0] ?? requested
  const directPath = withoutMarkdownExtension(withoutHash)
  const directPathAlt = wipToggleStem(directPath)

  const direct =
    project.routeMap.get(directPath) ??
    project.routeMap.get(directPathAlt) ??
    project.routeMap.get(`wiki/${directPath}`) ??
    project.routeMap.get(`wiki/${directPathAlt}`) ??
    project.fileMap.get(withoutHash) ??
    project.fileMap.get(`${withoutHash}.md`)
  if (direct) return direct

  const relative = resolveRelativePath(withoutHash, currentFilePath)
  if (relative) {
    const relativeRoute = withoutMarkdownExtension(relative)
    const relativeRouteAlt = wipToggleStem(relativeRoute)
    const relativeFile =
      project.routeMap.get(relativeRoute) ??
      project.routeMap.get(relativeRouteAlt) ??
      project.fileMap.get(relative)
    if (relativeFile) return relativeFile
  }

  const target = normalizeLookup(withoutHash)
  const targetNoWip = target.replace(/\.wip$/i, '')
  return (
    project.files.find((file) => normalizeLookup(file.title) === target) ??
    project.files.find((file) => {
      const stem = normalizeLookup(withoutMarkdownExtension(file.path).split('/').at(-1) ?? '')
      const stemNoWip = stem.replace(/\.wip$/i, '')
      return stem === target || stemNoWip === target || stem === targetNoWip
    }) ??
    null
  )
}

function appendHash(href: string, raw: string): string {
  const hash = raw.includes('#') ? raw.slice(raw.indexOf('#') + 1) : ''
  return hash ? `${href}?s=${encodeURIComponent(hash)}` : href
}


const LINK_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`

const HEADING_WITH_ID_RE = /<h([1-6])(\s[^>]*?\bid="([^"]+)"[^>]*)>/gi

function escapeHtmlAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
}

function injectHeadingCopyLinks(html: string): string {
  return html.replace(HEADING_WITH_ID_RE, (match, level: string, attrs: string, id: string) => {
    if (match.includes('heading-copy-link')) return match
    const safeId = escapeHtmlAttr(id)
    return `<h${level}${attrs}><button type="button" class="heading-copy-link" aria-label="Copy link to heading" title="Copy link" data-heading-id="${safeId}">${LINK_ICON_SVG}</button>`
  })
}

export function MarkdownContent({ project, file }: MarkdownContentProps) {
  const articleRef = useRef<HTMLElement>(null)
  const html = useMemo(() => {
    const rendered = renderRpgMarkdown(file.content, project.config, {
      currentFilePath: file.path,
      resolveWikiHref: (title, currentFilePath) => {
        const target = resolveWikiFile(project, title, currentFilePath ?? file.path)
        return target ? appendHash(toProjectHref(project.id, target.routePath), title) : null
      },
      resolveAssetSrc: (src, currentFilePath) => {
        const resolved = resolveRelativePath(src, currentFilePath ?? file.path)
        return resolved ? (project.assets.get(resolved) ?? null) : null
      },
      resolveDocumentHref: (href, currentFilePath) => {
        if (/^(?:[a-z][a-z0-9+.-]*:|#)/i.test(href)) return null
        const [pathPart, hashPart] = href.split('#')
        const resolved = resolveRelativePath(pathPart ?? href, currentFilePath ?? file.path)
        if (!resolved) return null
        const routePath = withoutMarkdownExtension(resolved)
        const target = project.routeMap.get(routePath)
        if (!target) return null
        const base = toProjectHref(project.id, target.routePath)
        return hashPart ? `${base}?s=${encodeURIComponent(hashPart)}` : base
      },
    })
    return injectHeadingCopyLinks(rendered)
  }, [file, project])

  useEffect(() => {
    const article = articleRef.current
    if (!article) return
    const onClick = (e: MouseEvent): void => {
      const target = e.target as HTMLElement

      const copyBtn = target.closest<HTMLElement>('.heading-copy-link')
      if (copyBtn && article.contains(copyBtn)) {
        e.preventDefault()
        const id = copyBtn.getAttribute('data-heading-id')
        if (id) {
          navigator.clipboard.writeText(buildDocumentHeadingLinkUrl(id)).catch(() => {})
          copyBtn.classList.add('heading-copy-link--copied')
          window.setTimeout(() => copyBtn.classList.remove('heading-copy-link--copied'), 1500)
        }
        return
      }

      const item = target.closest<HTMLElement>('.timeline-item[data-timeline-expandable]')
      if (!item) return
      item.classList.toggle('is-collapsed')
      const collapsed = item.classList.contains('is-collapsed')
      item.classList.toggle('is-expanded', !collapsed)
      item.setAttribute('aria-expanded', collapsed ? 'false' : 'true')
    }
    article.addEventListener('click', onClick)
    return () => article.removeEventListener('click', onClick)
  }, [html])

  return (
    <CommentLayer projectId={project.id} fileId={file.routePath}>
      <article ref={articleRef} className="preview-body" dangerouslySetInnerHTML={{ __html: html }} />
    </CommentLayer>
  )
}
