import { useEffect, useState, type MouseEvent as ReactMouseEvent, type RefObject } from 'react'
import type { TocNode } from './TableOfContents'

export interface TocNodeItemProps {
  node: TocNode
  activeSlug: string | null | undefined
  currentHash: string
  activeRef: RefObject<HTMLAnchorElement | null>
  collapsible: boolean
  onLinkContextMenu: (event: ReactMouseEvent<HTMLAnchorElement>, slug: string) => void
}

function nodeContainsSlug(node: TocNode, slug: string | null | undefined): boolean {
  if (!slug) return false
  if (node.heading.slug === slug) return true
  return node.children.some((child) => nodeContainsSlug(child, slug))
}

export function TocNodeItem({
  node,
  activeSlug,
  currentHash,
  activeRef,
  collapsible,
  onLinkContextMenu,
}: TocNodeItemProps) {
  const hasChildren = node.children.length > 0
  const containsActive = nodeContainsSlug(node, activeSlug)
  const [expanded, setExpanded] = useState(() => !collapsible || containsActive)

  useEffect(() => {
    if (containsActive) setExpanded(true)
  }, [containsActive])

  const isActive = activeSlug === node.heading.slug
  const level = node.heading.level

  return (
    <li className={`toc-item toc-item--level-${level}`}>
      <div className="toc-row">
        {hasChildren && collapsible ? (
          <button
            type="button"
            className="toc-expand"
            aria-expanded={expanded}
            aria-label={expanded ? 'Zwiń sekcję' : 'Rozwiń sekcję'}
            onClick={() => setExpanded((value) => !value)}
          >
            <span className="toc-expand-icon" aria-hidden />
          </button>
        ) : null}
        <a
          ref={isActive ? activeRef : null}
          className={isActive ? 'toc-link toc-link--active' : 'toc-link'}
          href={`${currentHash}?s=${encodeURIComponent(node.heading.slug)}`}
          onContextMenu={(event) => onLinkContextMenu(event, node.heading.slug)}
        >
          {node.heading.text}
        </a>
      </div>
      {hasChildren && (!collapsible || expanded) ? (
        <ol className="toc-list toc-list--nested">
          {node.children.map((child) => (
            <TocNodeItem
              key={child.heading.slug}
              node={child}
              activeSlug={activeSlug}
              currentHash={currentHash}
              activeRef={activeRef}
              collapsible={collapsible}
              onLinkContextMenu={onLinkContextMenu}
            />
          ))}
        </ol>
      ) : null}
    </li>
  )
}
