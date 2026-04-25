import { useCallback, useEffect, useMemo, useState } from 'react'
import { loadComments, subscribeToComments } from '../lib/commentStore'
import type { Comment } from '../types'
import { CommentItem } from './CommentItem'

interface CommentPanelProps {
  projectId: string
  fileId: string
  isOpen: boolean
}

export function CommentPanel({ projectId, fileId, isOpen }: CommentPanelProps) {
  const [comments, setComments] = useState<Comment[]>(() => loadComments())

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

  const activeComments = useMemo(
    () =>
      comments.filter((comment) => comment.projectId === projectId && comment.fileId === fileId && !comment.resolved),
    [comments, fileId, projectId],
  )

  if (!isOpen) return null

  return (
    <aside className="comment-panel" aria-label="Komentarze">
      <div className="comment-panel__header">
        <h2>Komentarze</h2>
        <span>{activeComments.length}</span>
      </div>
      {activeComments.length ? (
        <div className="comment-panel__list">
          {activeComments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      ) : (
        <p className="comment-panel__empty">Brak aktywnych komentarzy dla tego dokumentu.</p>
      )}
    </aside>
  )
}
