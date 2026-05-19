import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from 'react'
import { createPortal } from 'react-dom'
import { useLocation } from 'react-router-dom'
import type { MarkdownHeading } from '../lib/rpgMarkdown'
import { buildDocumentHeadingLinkUrl, getCurrentDocumentHash } from '../lib/paths'
import { TocNodeItem } from './TocNodeItem'

export interface TableOfContentsProps {
  headings: MarkdownHeading[]
  activeSlug?: string | null
}

export interface TocNode {
  heading: MarkdownHeading
  children: TocNode[]
}

interface TocContextMenuState {
  x: number
  y: number
  slug: string
}

export interface TocContextMenuProps {
  x: number
  y: number
  slug: string
  onClose: () => void
}

const COLLAPSE_THRESHOLD = 14

const TOC_CONTEXT_MENU_GAP = 8
const TOC_CONTEXT_MENU_VIEWPORT_PADDING = 8

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

function clampTocContextMenuPosition(menu: HTMLElement, x: number, y: number) {
  const rect = menu.getBoundingClientRect()
  const pad = TOC_CONTEXT_MENU_VIEWPORT_PADDING
  const maxTop = window.innerHeight - rect.height - pad
  const toc = document.querySelector<HTMLElement>('.toc')
  const tocBounds = toc?.getBoundingClientRect()

  let left: number
  let top = y

  if (tocBounds) {
    left = x - rect.width - TOC_CONTEXT_MENU_GAP
    left = Math.min(left, tocBounds.right - rect.width - pad)
    left = Math.max(left, tocBounds.left + pad)
  } else {
    left = x - rect.width - TOC_CONTEXT_MENU_GAP
    left = Math.min(Math.max(left, pad), window.innerWidth - rect.width - pad)
  }

  top = Math.min(Math.max(top, pad), maxTop)

  menu.style.left = `${left}px`
  menu.style.top = `${top}px`
}

function TocLinkContextMenu({ x, y, slug, onClose }: TocContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)

  useLayoutEffect(() => {
    const menu = menuRef.current
    if (!menu) return
    clampTocContextMenuPosition(menu, x, y)
  }, [x, y])

  useEffect(() => {
    const closeUnlessMenu = (event: MouseEvent) => {
      if (menuRef.current?.contains(event.target as Node)) return
      onClose()
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    const closeOnScroll = () => onClose()

    const timer = window.setTimeout(() => {
      window.addEventListener('click', closeUnlessMenu)
      window.addEventListener('contextmenu', closeUnlessMenu)
      window.addEventListener('keydown', closeOnEscape)
      window.addEventListener('scroll', closeOnScroll, true)
    }, 0)

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('click', closeUnlessMenu)
      window.removeEventListener('contextmenu', closeUnlessMenu)
      window.removeEventListener('keydown', closeOnEscape)
      window.removeEventListener('scroll', closeOnScroll, true)
    }
  }, [onClose])

  const copyLink = () => {
    navigator.clipboard.writeText(buildDocumentHeadingLinkUrl(slug)).catch(() => {})
    setCopied(true)
    window.setTimeout(onClose, 600)
  }

  return createPortal(
    <div
      ref={menuRef}
      className="toc-context-menu"
      style={{ top: y, left: x }}
      role="menu"
      onContextMenu={(event) => event.preventDefault()}
    >
      <button type="button" className="toc-context-menu-item" role="menuitem" onClick={copyLink}>
        {copied ? 'Skopiowano!' : 'Kopiuj link do nagłówka'}
      </button>
    </div>,
    document.body,
  )
}

export function TableOfContents({ headings, activeSlug: activeSlugProp }: TableOfContentsProps) {
  const location = useLocation()
  const urlSlug = new URLSearchParams(location.search).get('s')
  const activeSlug = activeSlugProp ?? urlSlug
  const tree = useMemo(() => buildTocTree(headings), [headings])
  const collapsible = headings.length > COLLAPSE_THRESHOLD
  const currentHash = getCurrentDocumentHash()
  const activeRef = useRef<HTMLAnchorElement>(null)
  const [contextMenu, setContextMenu] = useState<TocContextMenuState | null>(null)

  const closeContextMenu = useCallback(() => setContextMenu(null), [])

  const handleLinkContextMenu = useCallback((event: ReactMouseEvent<HTMLAnchorElement>, slug: string) => {
    event.preventDefault()
    setContextMenu({ x: event.clientX, y: event.clientY, slug })
  }, [])

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
            onLinkContextMenu={handleLinkContextMenu}
          />
        ))}
      </ol>
      {contextMenu ? (
        <TocLinkContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          slug={contextMenu.slug}
          onClose={closeContextMenu}
        />
      ) : null}
    </nav>
  )
}
