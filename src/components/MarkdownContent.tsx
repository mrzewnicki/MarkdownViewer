import { useMemo } from 'react'
import { renderRpgMarkdown } from '../lib/rpgMarkdown'
import { resolveRelativePath, toProjectHref, withoutMarkdownExtension } from '../lib/paths'
import type { ContentFile, ProjectContent } from '../types'

interface MarkdownContentProps {
  project: ProjectContent
  file: ContentFile
}

function normalizeLookup(value: string): string {
  return value.trim().toLocaleLowerCase('pl')
}

function resolveWikiFile(project: ProjectContent, title: string, currentFilePath: string): ContentFile | null {
  const requested = title.trim()
  const withoutHash = requested.split('#')[0] ?? requested
  const directPath = withoutMarkdownExtension(withoutHash)

  const direct =
    project.routeMap.get(directPath) ??
    project.routeMap.get(`wiki/${directPath}`) ??
    project.fileMap.get(withoutHash) ??
    project.fileMap.get(`${withoutHash}.md`)
  if (direct) return direct

  const relative = resolveRelativePath(withoutHash, currentFilePath)
  if (relative) {
    const relativeRoute = withoutMarkdownExtension(relative)
    const relativeFile = project.routeMap.get(relativeRoute) ?? project.fileMap.get(relative)
    if (relativeFile) return relativeFile
  }

  const target = normalizeLookup(withoutHash)
  return (
    project.files.find((file) => normalizeLookup(file.title) === target) ??
    project.files.find((file) => normalizeLookup(withoutMarkdownExtension(file.path).split('/').at(-1) ?? '') === target) ??
    null
  )
}

function appendHash(href: string, raw: string): string {
  const hash = raw.includes('#') ? raw.slice(raw.indexOf('#') + 1) : ''
  return hash ? `${href}#${encodeURIComponent(hash)}` : href
}


export function MarkdownContent({ project, file }: MarkdownContentProps) {
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

  return <article className="preview-body" dangerouslySetInnerHTML={{ __html: html }} />
}
