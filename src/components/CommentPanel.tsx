import { useMemo } from 'react'
import { useComments } from '../hooks/useComments'
import { CommentItem } from './CommentItem'

interface CommentPanelProps {
  projectId: string
  fileId: string
  isOpen: boolean
}

export function CommentPanel({ projectId, fileId, isOpen }: CommentPanelProps) {
  const comments = useComments()

  const activeComments = useMemo(
    () =>
      comments.filter((comment) => comment.projectId === projectId && comment.fileId === fileId && !comment.resolved),
    [comments, fileId, projectId],
  )

  return (
    <aside className="comment-panel" aria-label="Komentarze" aria-hidden={!isOpen}>
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
