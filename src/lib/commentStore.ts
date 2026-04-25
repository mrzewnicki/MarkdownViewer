import type { Comment } from '../types'

const COMMENTS_KEY = 'md-viewer-comments'
const listeners = new Set<() => void>()

function isComment(value: unknown): value is Comment {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Partial<Comment>

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.projectId === 'string' &&
    typeof candidate.fileId === 'string' &&
    typeof candidate.quote === 'string' &&
    typeof candidate.anchor === 'string' &&
    typeof candidate.text === 'string' &&
    typeof candidate.createdAt === 'string' &&
    typeof candidate.resolved === 'boolean'
  )
}

function notifyListeners() {
  listeners.forEach((listener) => listener())
}

export function loadComments(): Comment[] {
  if (typeof window === 'undefined') return []

  try {
    const raw = window.localStorage.getItem(COMMENTS_KEY)
    if (!raw) return []

    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter(isComment) : []
  } catch {
    return []
  }
}

export function saveComments(comments: Comment[]) {
  window.localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments))
  notifyListeners()
}

export function saveComment(comment: Comment) {
  saveComments([...loadComments(), comment])
}

export function resolveComment(commentId: string) {
  saveComments(loadComments().map((comment) => (comment.id === commentId ? { ...comment, resolved: true } : comment)))
}

export function deleteComment(commentId: string) {
  saveComments(loadComments().filter((comment) => comment.id !== commentId))
}

export function subscribeToComments(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function importComments(incoming: unknown[]): { imported: number; skipped: number } {
  const existing = loadComments()
  const existingIds = new Set(existing.map((c) => c.id))

  const valid = incoming.filter(isComment)
  const fresh = valid.filter((c) => !existingIds.has(c.id))

  if (fresh.length > 0) {
    saveComments([...existing, ...fresh])
  }

  return { imported: fresh.length, skipped: valid.length - fresh.length }
}
