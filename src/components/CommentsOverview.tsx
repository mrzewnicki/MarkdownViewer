import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { projects } from '../content-loader'
import { confirmDeleteComment, confirmResolveComment, formatCommentDate } from '../lib/commentUtils'
import { toProjectRoute } from '../lib/paths'
import { useComments } from '../hooks/useComments'
import type { Comment } from '../types'
import { Dialog } from './Dialog'
import { CloseIcon } from './icons'

interface CommentsOverviewProps {
  open: boolean
  onClose: () => void
}

type Tab = 'open' | 'resolved'

function getFileTitle(projectId: string, fileId: string): string {
  const project = projects.find((p) => p.id === projectId)
  if (!project) return fileId
  const file = project.routeMap.get(fileId)
  return file?.title ?? fileId
}

function getProjectTitle(projectId: string): string {
  return projects.find((p) => p.id === projectId)?.title ?? projectId
}

interface CommentRowProps {
  comment: Comment
  onNavigate: (comment: Comment) => void
}

function CommentRow({ comment, onNavigate }: CommentRowProps) {
  const projectTitle = getProjectTitle(comment.projectId)
  const fileTitle = getFileTitle(comment.projectId, comment.fileId)

  return (
    <article className="co-item" onClick={() => onNavigate(comment)}>
      <div className="co-item__breadcrumb">
        <span className="co-item__project">{projectTitle}</span>
        <span className="co-item__sep" aria-hidden>/</span>
        <span className="co-item__file">{fileTitle}</span>
      </div>
      <blockquote className="co-item__quote">{comment.quote}</blockquote>
      <p className="co-item__text">{comment.text}</p>
      <div className="co-item__footer">
        <time className="co-item__date" dateTime={comment.createdAt}>
          {formatCommentDate(comment.createdAt)}
        </time>
        <div className="co-item__actions" onClick={(e) => e.stopPropagation()}>
          {!comment.resolved && (
            <button type="button" className="comment-button" onClick={() => confirmResolveComment(comment.id)}>
              Rozwiąż
            </button>
          )}
          <button
            type="button"
            className="comment-button comment-button--ghost"
            onClick={() => confirmDeleteComment(comment.id)}
          >
            Usuń
          </button>
        </div>
      </div>
    </article>
  )
}

export function CommentsOverview({ open, onClose }: CommentsOverviewProps) {
  const comments = useComments()
  const [tab, setTab] = useState<Tab>('open')
  const navigate = useNavigate()

  const openComments = useMemo(() => comments.filter((c) => !c.resolved), [comments])
  const resolvedComments = useMemo(() => comments.filter((c) => c.resolved), [comments])
  const visibleComments = tab === 'open' ? openComments : resolvedComments

  const handleNavigate = useCallback(
    (comment: Comment) => {
      navigate(toProjectRoute(comment.projectId, comment.fileId))
      onClose()
    },
    [navigate, onClose],
  )

  return (
    <Dialog
      open={open}
      onClose={onClose}
      backdropClassName="co-backdrop"
      panelClassName="co-dialog"
      ariaLabel="Wszystkie komentarze"
    >
      <div className="co-header">
        <div className="co-header__top">
          <h2 className="co-title">Wszystkie komentarze</h2>
          <div className="co-header__actions">
            <button type="button" className="co-close-btn" onClick={onClose} aria-label="Zamknij">
              <CloseIcon />
            </button>
          </div>
        </div>
        <div className="co-tabs" role="tablist">
          <button
            role="tab"
            type="button"
            className="co-tab"
            aria-selected={tab === 'open'}
            onClick={() => setTab('open')}
          >
            Otwarte
            <span className="co-tab__count">{openComments.length}</span>
          </button>
          <button
            role="tab"
            type="button"
            className="co-tab"
            aria-selected={tab === 'resolved'}
            onClick={() => setTab('resolved')}
          >
            Rozwiązane
            <span className="co-tab__count">{resolvedComments.length}</span>
          </button>
        </div>
      </div>

      <div className="co-body">
        {visibleComments.length === 0 ? (
          <p className="co-empty">
            {tab === 'open' ? 'Brak otwartych komentarzy.' : 'Brak rozwiązanych komentarzy.'}
          </p>
        ) : (
          <div className="co-list">
            {visibleComments.map((comment) => (
              <CommentRow key={comment.id} comment={comment} onNavigate={handleNavigate} />
            ))}
          </div>
        )}
      </div>
    </Dialog>
  )
}
