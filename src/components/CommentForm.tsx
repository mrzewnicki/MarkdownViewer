import { type FormEvent, useState } from 'react'

interface CommentFormProps {
  x: number
  y: number
  quote: string
  onCancel: () => void
  onSave: (text: string) => void
}

export function CommentForm({ x, y, quote, onCancel, onSave }: CommentFormProps) {
  const [text, setText] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onSave(trimmed)
  }

  return (
    <form className="comment-form" style={{ left: x, top: y }} onSubmit={handleSubmit}>
      <div className="comment-form__quote">"{quote}"</div>
      <textarea
        autoFocus
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Treść komentarza"
        rows={4}
      />
      <div className="comment-form__actions">
        <button type="button" className="comment-button comment-button--ghost" onClick={onCancel}>
          Anuluj
        </button>
        <button type="submit" className="comment-button" disabled={!text.trim()}>
          Zapisz
        </button>
      </div>
    </form>
  )
}
