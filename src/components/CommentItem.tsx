import {
  confirmDeleteComment,
  confirmResolveComment,
  formatCommentDate,
  scrollToCommentHighlight,
} from '../lib/commentUtils'
import type { Comment } from '../types'

interface CommentItemProps {
  comment: Comment
}

export function CommentItem({ comment }: CommentItemProps) {
  return (
    <article className="comment-item" onClick={() => scrollToCommentHighlight(comment.id)}>
      <blockquote>{comment.quote}</blockquote>
      <p>{comment.text}</p>
      <time dateTime={comment.createdAt}>{formatCommentDate(comment.createdAt)}</time>
      <div className="comment-item__actions" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="comment-button" onClick={() => confirmResolveComment(comment.id)}>
          Rozwiąż
        </button>
        <button type="button" className="comment-button comment-button--ghost" onClick={() => confirmDeleteComment(comment.id)}>
          Usuń
        </button>
      </div>
    </article>
  )
}
