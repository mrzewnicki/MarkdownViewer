import { useCallback, useEffect, useState } from 'react'
import { loadComments, subscribeToComments } from '../lib/commentStore'
import type { Comment } from '../types'

export function useComments(): Comment[] {
  const [comments, setComments] = useState<Comment[]>(() => loadComments())

  const refreshComments = useCallback(() => {
    setComments(loadComments())
  }, [])

  useEffect(() => {
    const unsubscribe = subscribeToComments(refreshComments)
    window.addEventListener('storage', refreshComments)

    return () => {
      unsubscribe()
      window.removeEventListener('storage', refreshComments)
    }
  }, [refreshComments])

  return comments
}
