import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { saveComment } from '../lib/commentStore'
import {
  getSelectionAnchor,
  restoreHighlightsFromComments,
  selectionIntersectsCommentHighlight,
} from '../lib/textSelection'
import { useComments } from '../hooks/useComments'
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

export function CommentLayer({ projectId, fileId, children }: CommentLayerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const comments = useComments()
  const [pendingSelection, setPendingSelection] = useState<PendingSelection | null>(null)
  const [formSelection, setFormSelection] = useState<PendingSelection | null>(null)

  const activeComments = useMemo(
    () =>
      comments.filter((comment) => comment.projectId === projectId && comment.fileId === fileId && !comment.resolved),
    [comments, fileId, projectId],
  )

  useEffect(() => {
    const article = wrapperRef.current?.querySelector<HTMLElement>('article.preview-body')
    if (!article) return
    restoreHighlightsFromComments(article, activeComments)
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

    const comment: Comment = {
      id: createCommentId(),
      projectId,
      fileId,
      quote: formSelection.quote,
      anchor: formSelection.anchor,
      text,
      createdAt: new Date().toISOString(),
      resolved: false,
    }
    saveComment(comment)

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
