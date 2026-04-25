import { useCallback, useEffect, useMemo, useState, type KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { projects } from '../content-loader'
import { deleteComment, loadComments, resolveComment, subscribeToComments } from '../lib/commentStore'
import { toProjectRoute } from '../lib/paths'
import type { Comment } from '../types'

interface CommentsOverviewProps {
  open: boolean
  onClose: () => void
}

type Tab = 'open' | 'resolved'

function formatDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('pl', { dateStyle: 'short', timeStyle: 'short' }).format(date)
}

function getFileTitle(projectId: string, fileId: string): string {
  const project = projects.find((p) => p.id === projectId)
  if (!project) return fileId
  const file = project.routeMap.get(fileId)
  return file?.title ?? fileId
}

function getProjectTitle(projectId: string): string {
  return projects.find((p) => p.id === projectId)?.title ?? projectId
}

function downloadComments(comments: Comment[]) {
  const open = comments.filter((c) => !c.resolved)
  const resolved = comments.filter((c) => c.resolved)

  const lines: string[] = ['# Komentarze', '']

  const appendSection = (title: string, items: Comment[]) => {
    lines.push(`## ${title} (${items.length})`, '')
    if (items.length === 0) {
      lines.push('Brak komentarzy.', '')
      return
    }
    for (const c of items) {
      const projectTitle = getProjectTitle(c.projectId)
      const fileTitle = getFileTitle(c.projectId, c.fileId)
      lines.push(`### ${projectTitle} / ${fileTitle}`)
      lines.push(`> ${c.quote}`)
      lines.push('')
      lines.push(c.text)
      lines.push('')
      lines.push(`_${formatDate(c.createdAt)}_`)
      lines.push('')
      lines.push('---', '')
    }
  }

  appendSection('Otwarte', open)
  appendSection('Rozwiązane', resolved)

  const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'komentarze.md'
  a.click()
  URL.revokeObjectURL(url)
}

function confirmResolve(commentId: string) {
  if (!window.confirm('Czy na pewno oznaczyć ten komentarz jako rozwiązany?')) return
  resolveComment(commentId)
}

function confirmDelete(commentId: string) {
  if (!window.confirm('Czy na pewno usunąć ten komentarz?')) return
  deleteComment(commentId)
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
        <time className="co-item__date" dateTime={comment.createdAt}>{formatDate(comment.createdAt)}</time>
        <div className="co-item__actions" onClick={(e) => e.stopPropagation()}>
          {!comment.resolved && (
            <button type="button" className="comment-button" onClick={() => confirmResolve(comment.id)}>
              Rozwiąż
            </button>
          )}
          <button
            type="button"
            className="comment-button comment-button--ghost"
            onClick={() => confirmDelete(comment.id)}
          >
            Usuń
          </button>
        </div>
      </div>
    </article>
  )
}

export function CommentsOverview({ open, onClose }: CommentsOverviewProps) {
  const [comments, setComments] = useState<Comment[]>(() => loadComments())
  const [tab, setTab] = useState<Tab>('open')
  const navigate = useNavigate()

  const refreshComments = useCallback(() => setComments(loadComments()), [])

  useEffect(() => {
    const unsubscribe = subscribeToComments(refreshComments)
    window.addEventListener('storage', refreshComments)
    return () => {
      unsubscribe()
      window.removeEventListener('storage', refreshComments)
    }
  }, [refreshComments])

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

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    },
    [onClose],
  )

  if (!open) return null

  return (
    <div
      className="co-backdrop"
      role="presentation"
      onClick={onClose}
      onKeyDown={onKeyDown}
    >
      <div
        className="co-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Wszystkie komentarze"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="co-header">
          <div className="co-header__top">
            <h2 className="co-title">Wszystkie komentarze</h2>
            <div className="co-header__actions">
              <button
                type="button"
                className="co-download-btn"
                onClick={() => downloadComments(comments)}
                title="Pobierz komentarze jako plik Markdown"
                disabled={comments.length === 0}
              >
                <DownloadIcon />
                Pobierz
              </button>
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
      </div>
    </div>
  )
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="7 10 12 15 17 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="12"
        y1="15"
        x2="12"
        y2="3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M18 6 6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
