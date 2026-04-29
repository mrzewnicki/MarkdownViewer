import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import type { MarkdownHeading } from '../lib/rpgMarkdown'

interface TableOfContentsProps {
  headings: MarkdownHeading[]
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const location = useLocation()
  const activeSlug = new URLSearchParams(location.search).get('s')
  const minLevel = useMemo(() => Math.min(...headings.map((heading) => heading.level)), [headings])
  const currentHash = typeof window === 'undefined' ? '' : (window.location.hash.split('?')[0] ?? '')

  if (headings.length === 0) return null

  return (
    <nav className="toc" aria-label="Spis treści">
      <div className="toc-title">Spis treści</div>
      <ol className="toc-list">
        {headings.map((heading) => {
          const isActive = activeSlug === heading.slug
          return (
            <li key={heading.slug} className="toc-item" style={{ paddingLeft: `${(heading.level - minLevel) * 12}px` }}>
              <a className={isActive ? 'toc-link toc-link--active' : 'toc-link'} href={`${currentHash}?s=${encodeURIComponent(heading.slug)}`}>
                {heading.text}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
