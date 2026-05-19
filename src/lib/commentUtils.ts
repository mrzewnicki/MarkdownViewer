import { deleteComment, resolveComment } from './commentStore'

const plDateTimeFormatter = new Intl.DateTimeFormat('pl', {
  dateStyle: 'short',
  timeStyle: 'short',
})

export function formatCommentDate(value: string | Date): string {
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return typeof value === 'string' ? value : ''
  return plDateTimeFormatter.format(date)
}

export function confirmResolveComment(commentId: string): void {
  if (!window.confirm('Czy na pewno oznaczyć ten komentarz jako rozwiązany?')) return
  resolveComment(commentId)
}

export function confirmDeleteComment(commentId: string): void {
  if (!window.confirm('Czy na pewno usunąć ten komentarz?')) return
  deleteComment(commentId)
}

export function scrollToCommentHighlight(commentId: string): void {
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
