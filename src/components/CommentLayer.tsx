import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { loadComments, saveComment, subscribeToComments } from '../lib/commentStore'
import type { Comment } from '../types'
import { CommentForm } from './CommentForm'
import { CommentTooltip } from './CommentTooltip'

interface CommentLayerProps {
  projectId: string
  fileId: string
  children: ReactNode
}

interface PendingSelection {
  quote: string
  anchor: string
  x: number
  y: number
}

function createCommentId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function getTextNodes(root: HTMLElement): Text[] {
  const nodes: Text[] = []
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement
      if (!parent) return NodeFilter.FILTER_REJECT
      if (parent.closest('script, style, textarea')) return NodeFilter.FILTER_REJECT
      return node.textContent ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
    },
  })

  while (walker.nextNode()) {
    nodes.push(walker.currentNode as Text)
  }

  return nodes
}

function getRangeOffsets(root: HTMLElement, range: Range) {
  const preRange = document.createRange()
  preRange.selectNodeContents(root)
  preRange.setEnd(range.startContainer, range.startOffset)

  const start = preRange.toString().length
  return { start, end: start + range.toString().length }
}

function getSelectionAnchor(root: HTMLElement, range: Range): string {
  const fullText = root.textContent ?? ''
  const { start, end } = getRangeOffsets(root, range)
  return fullText.slice(Math.max(0, start - 60), Math.min(fullText.length, end + 60))
}

function rangesOverlap(first: { start: number; end: number }, second: { start: number; end: number }): boolean {
  return first.start < second.end && second.start < first.end
}

function selectionIntersectsCommentHighlight(root: HTMLElement, range: Range): boolean {
  return Array.from(root.querySelectorAll('.comment-highlight')).some((highlight) => range.intersectsNode(highlight))
}

function restoreCommentHighlights(root: HTMLElement) {
  root.querySelectorAll('mark.comment-highlight').forEach((mark) => {
    mark.replaceWith(document.createTextNode(mark.textContent ?? ''))
  })
  root.normalize()
}

function findQuoteOffset(root: HTMLElement, comment: Comment): number {
  const fullText = root.textContent ?? ''
  const anchorOffset = comment.anchor ? fullText.indexOf(comment.anchor) : -1

  if (anchorOffset >= 0) {
    const quoteOffset = comment.anchor.indexOf(comment.quote)
    if (quoteOffset >= 0) return anchorOffset + quoteOffset
  }

  return fullText.indexOf(comment.quote)
}

function getRangeFromOffsets(root: HTMLElement, start: number, end: number): Range | null {
  const nodes = getTextNodes(root)
  const range = document.createRange()
  let current = 0
  let startSet = false

  for (const node of nodes) {
    const length = node.textContent?.length ?? 0
    const next = current + length

    if (!startSet && start <= next) {
      range.setStart(node, Math.max(0, start - current))
      startSet = true
    }

    if (startSet && end <= next) {
      range.setEnd(node, Math.max(0, end - current))
      return range
    }

    current = next
  }

  return null
}

function applyCommentHighlights(root: HTMLElement, comments: Comment[]) {
  restoreCommentHighlights(root)
  const highlightedRanges: Array<{ start: number; end: number }> = []

  comments.forEach((comment) => {
    const start = findQuoteOffset(root, comment)
    if (start < 0) return
    const end = start + comment.quote.length
    const nextRange = { start, end }
    if (highlightedRanges.some((highlightedRange) => rangesOverlap(highlightedRange, nextRange))) return

    const range = getRangeFromOffsets(root, start, end)
    if (!range || range.collapsed) return

    const mark = document.createElement('mark')
    mark.className = 'comment-highlight'
    mark.dataset.commentId = comment.id
    mark.title = comment.text

    const contents = range.extractContents()
    mark.append(contents)
    range.insertNode(mark)
    highlightedRanges.push(nextRange)
  })
}

export function CommentLayer({ projectId, fileId, children }: CommentLayerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [comments, setComments] = useState<Comment[]>(() => loadComments())
  const [pendingSelection, setPendingSelection] = useState<PendingSelection | null>(null)
  const [formSelection, setFormSelection] = useState<PendingSelection | null>(null)

  const activeComments = useMemo(
    () =>
      comments.filter((comment) => comment.projectId === projectId && comment.fileId === fileId && !comment.resolved),
    [comments, fileId, projectId],
  )

  const refreshComments = useCallback(() => {
    setComments(loadComments())
  }, [])

  useEffect(() => {
    const unsubscribe = subscribeToComments(refreshComments)
    window.addEventListener('storage', refreshComments)

    return () => {
      unsubscribe()
      window.removeEventListener('storage', refreshComments)
    }
  }, [refreshComments])

  useEffect(() => {
    const article = wrapperRef.current?.querySelector<HTMLElement>('article.preview-body')
    if (!article) return
    applyCommentHighlights(article, activeComments)
  }, [activeComments, children])

  const clearSelection = () => {
    window.getSelection()?.removeAllRanges()
    setPendingSelection(null)
  }

  const handleMouseUp = () => {
    if (formSelection) return

    const article = wrapperRef.current?.querySelector<HTMLElement>('article.preview-body')
    const selection = window.getSelection()
    if (!article || !selection || selection.rangeCount === 0 || selection.isCollapsed) {
      setPendingSelection(null)
      return
    }

    const range = selection.getRangeAt(0).cloneRange()
    if (!article.contains(range.commonAncestorContainer)) {
      setPendingSelection(null)
      return
    }

    if (selectionIntersectsCommentHighlight(article, range)) {
      setPendingSelection(null)
      return
    }

    const quote = selection.toString().trim()
    const rect = range.getBoundingClientRect()
    if (!quote || rect.width === 0 || rect.height === 0) {
      setPendingSelection(null)
      return
    }

    setPendingSelection({
      quote,
      anchor: getSelectionAnchor(article, range),
      x: rect.left + rect.width / 2,
      y: Math.max(12, rect.top - 10),
    })
  }

  const handleSave = (text: string) => {
    if (!formSelection) return

    saveComment({
      id: createCommentId(),
      projectId,
      fileId,
      quote: formSelection.quote,
      anchor: formSelection.anchor,
      text,
      createdAt: new Date().toISOString(),
      resolved: false,
    })

    setFormSelection(null)
    clearSelection()
  }

  return (
    <div ref={wrapperRef} className="comment-layer" onMouseUp={handleMouseUp}>
      {children}
      {pendingSelection ? (
        <CommentTooltip
          x={pendingSelection.x}
          y={pendingSelection.y}
          onAdd={() => {
            setFormSelection({ ...pendingSelection, y: pendingSelection.y + 34 })
            setPendingSelection(null)
          }}
        />
      ) : null}
      {formSelection ? (
        <CommentForm
          x={formSelection.x}
          y={formSelection.y}
          quote={formSelection.quote}
          onCancel={() => {
            setFormSelection(null)
            clearSelection()
          }}
          onSave={handleSave}
        />
      ) : null}
    </div>
  )
}
