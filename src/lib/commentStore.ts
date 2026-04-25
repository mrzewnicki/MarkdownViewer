import {
  collection,
  onSnapshot,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from 'firebase/firestore'
import { db } from './firebase'
import type { Comment } from '../types'

const listeners = new Set<() => void>()
let cache: Comment[] = []

function isComment(value: unknown): value is Comment {
  if (!value || typeof value !== 'object') return false
  const c = value as Partial<Comment>
  return (
    typeof c.id === 'string' &&
    typeof c.projectId === 'string' &&
    typeof c.fileId === 'string' &&
    typeof c.quote === 'string' &&
    typeof c.anchor === 'string' &&
    typeof c.text === 'string' &&
    typeof c.createdAt === 'string' &&
    typeof c.resolved === 'boolean'
  )
}

function notifyListeners(): void {
  listeners.forEach((listener) => listener())
}

const commentsRef = collection(db, 'comments')

onSnapshot(query(commentsRef, orderBy('createdAt')), (snapshot) => {
  cache = snapshot.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .filter(isComment)
  notifyListeners()
})

export function loadComments(): Comment[] {
  return cache
}

export function saveComment(comment: Comment): void {
  const { id, ...data } = comment
  setDoc(doc(db, 'comments', id), data).catch(() => {})
}

export function resolveComment(commentId: string): void {
  cache = cache.map((c) => (c.id === commentId ? { ...c, resolved: true } : c))
  notifyListeners()
  updateDoc(doc(db, 'comments', commentId), { resolved: true }).catch(() => {})
}

export function deleteComment(commentId: string): void {
  cache = cache.filter((c) => c.id !== commentId)
  notifyListeners()
  deleteDoc(doc(db, 'comments', commentId)).catch(() => {})
}

export function subscribeToComments(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
