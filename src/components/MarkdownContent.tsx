import { useEffect, useMemo, useRef } from 'react'
import { renderRpgMarkdown } from '../lib/rpgMarkdown'
import { resolveRelativePath, toProjectHref, withoutMarkdownExtension } from '../lib/paths'
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
  return hash ? `${href}#${encodeURIComponent(hash)}` : href
}


const LINK_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`

export function MarkdownContent({ project, file }: MarkdownContentProps) {
  const articleRef = useRef<HTMLElement>(null)
  const html = useMemo(
    () =>
      renderRpgMarkdown(file.content, project.config, {
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
          return hashPart ? `${base}#${encodeURIComponent(hashPart)}` : base
        },
      }),
    [file, project],
  )

  useEffect(() => {
    const article = articleRef.current
    if (!article) return

    const headings = article.querySelectorAll<HTMLElement>('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]')
    const handlers: Array<{ btn: HTMLButtonElement; handler: () => void }> = []

    for (const heading of headings) {
      const id = heading.getAttribute('id') ?? ''
      const btn = document.createElement('button')
      btn.className = 'heading-copy-link'
      btn.setAttribute('aria-label', 'Copy link to heading')
      btn.setAttribute('type', 'button')
      btn.innerHTML = LINK_ICON_SVG

      const handler = () => {
        const currentHash = window.location.hash.split('?')[0] ?? ''
        const url = window.location.origin + window.location.pathname + currentHash + '?s=' + encodeURIComponent(id)
        navigator.clipboard.writeText(url).catch(() => {})
        btn.classList.add('heading-copy-link--copied')
        setTimeout(() => btn.classList.remove('heading-copy-link--copied'), 1500)
      }

      btn.addEventListener('click', handler)
      heading.prepend(btn)
      handlers.push({ btn, handler })
    }

    return () => {
      for (const { btn, handler } of handlers) {
        btn.removeEventListener('click', handler)
        btn.remove()
      }
    }
  }, [html])

  return (
    <CommentLayer projectId={project.id} fileId={file.routePath}>
      <article ref={articleRef} className="preview-body" dangerouslySetInnerHTML={{ __html: html }} />
    </CommentLayer>
  )
}
