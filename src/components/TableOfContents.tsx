import { useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import { useLocation } from 'react-router-dom'
import type { MarkdownHeading } from '../lib/rpgMarkdown'

interface TableOfContentsProps {
  headings: MarkdownHeading[]
  activeSlug?: string | null
}

interface TocNode {
  heading: MarkdownHeading
  children: TocNode[]
}

const COLLAPSE_THRESHOLD = 14

function buildTocTree(headings: MarkdownHeading[]): TocNode[] {
  const roots: TocNode[] = []
  const stack: { level: number; node: TocNode }[] = []

  for (const heading of headings) {
    const node: TocNode = { heading, children: [] }
    while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
      stack.pop()
    }
    const parent = stack[stack.length - 1]
    if (parent) {
      parent.node.children.push(node)
    } else {
      roots.push(node)
    }
    stack.push({ level: heading.level, node })
  }

  return roots
}

function nodeContainsSlug(node: TocNode, slug: string | null | undefined): boolean {
  if (!slug) return false
  if (node.heading.slug === slug) return true
  return node.children.some((child) => nodeContainsSlug(child, slug))
}

interface TocNodeItemProps {
  node: TocNode
  activeSlug: string | null | undefined
  currentHash: string
  activeRef: RefObject<HTMLAnchorElement | null>
  collapsible: boolean
}

function TocNodeItem({ node, activeSlug, currentHash, activeRef, collapsible }: TocNodeItemProps) {
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
            />
          ))}
        </ol>
      ) : null}
    </li>
  )
}

export function TableOfContents({ headings, activeSlug: activeSlugProp }: TableOfContentsProps) {
  const location = useLocation()
  const urlSlug = new URLSearchParams(location.search).get('s')
  const activeSlug = activeSlugProp ?? urlSlug
  const tree = useMemo(() => buildTocTree(headings), [headings])
  const collapsible = headings.length > COLLAPSE_THRESHOLD
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
        {tree.map((node) => (
          <TocNodeItem
            key={node.heading.slug}
            node={node}
            activeSlug={activeSlug}
            currentHash={currentHash}
            activeRef={activeRef}
            collapsible={collapsible}
          />
        ))}
      </ol>
    </nav>
  )
}
