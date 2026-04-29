import { useEffect, useMemo, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import type { MarkdownHeading } from '../lib/rpgMarkdown'

interface TableOfContentsProps {
  headings: MarkdownHeading[]
  activeSlug?: string | null
}

export function TableOfContents({ headings, activeSlug: activeSlugProp }: TableOfContentsProps) {
  const location = useLocation()
  const urlSlug = new URLSearchParams(location.search).get('s')
  const activeSlug = activeSlugProp ?? urlSlug
  const minLevel = useMemo(() => Math.min(...headings.map((heading) => heading.level)), [headings])
  const currentHash = typeof window === 'undefined' ? '' : window.location.hash.split('?')[0].split('#').slice(0, 2).join('#')
  const activeRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: 'nearest' })
  }, [activeSlug])

  if (headings.length === 0) return null

  return (
    <nav className="toc" aria-label="Spis treści">
      <div className="toc-title">Spis treści</div>
      <ol className="toc-list">
        {headings.map((heading) => {
          const isActive = activeSlug === heading.slug
          return (
            <li key={heading.slug} className="toc-item" style={{ paddingLeft: `${(heading.level - minLevel) * 12}px` }}>
              <a
                ref={isActive ? activeRef : null}
                className={isActive ? 'toc-link toc-link--active' : 'toc-link'}
                href={`${currentHash}?s=${encodeURIComponent(heading.slug)}`}
              >
                {heading.text}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
