interface CommentTooltipProps {
  x: number
  y: number
  onAdd: () => void
}

export function CommentTooltip({ x, y, onAdd }: CommentTooltipProps) {
  return (
    <button
      type="button"
      className="comment-tooltip"
      style={{ left: x, top: y }}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onAdd}
    >
      Dodaj komentarz
    </button>
  )
}
