import { deleteComment, resolveComment } from '../lib/commentStore'
import type { Comment } from '../types'

interface CommentItemProps {
  comment: Comment
}

function formatCommentDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat('pl', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date)
}

function scrollToComment(commentId: string) {
  const highlight = Array.from(document.querySelectorAll<HTMLElement>('.comment-highlight')).find(
    (element) => element.dataset.commentId === commentId,
  )
  if (!highlight) return

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  highlight.scrollIntoView({
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
    block: 'center',
    inline: 'nearest',
  })

  highlight.classList.remove('comment-highlight--focus')
  window.setTimeout(() => {
    highlight.classList.add('comment-highlight--focus')
    window.setTimeout(() => highlight.classList.remove('comment-highlight--focus'), 1400)
  }, 120)
}

function confirmResolve(commentId: string) {
  if (!window.confirm('Czy na pewno oznaczyć ten komentarz jako rozwiązany?')) return
  resolveComment(commentId)
}

function confirmDelete(commentId: string) {
  if (!window.confirm('Czy na pewno usunąć ten komentarz?')) return
  deleteComment(commentId)
}

export function CommentItem({ comment }: CommentItemProps) {
  return (
    <article className="comment-item" onClick={() => scrollToComment(comment.id)}>
      <blockquote>{comment.quote}</blockquote>
      <p>{comment.text}</p>
      <time dateTime={comment.createdAt}>{formatCommentDate(comment.createdAt)}</time>
      <div className="comment-item__actions" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="comment-button" onClick={() => confirmResolve(comment.id)}>
          Rozwiąż
        </button>
        <button type="button" className="comment-button comment-button--ghost" onClick={() => confirmDelete(comment.id)}>
          Usuń
        </button>
      </div>
    </article>
  )
}
