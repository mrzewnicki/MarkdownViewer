import { useEffect, type MutableRefObject } from 'react'
import { useLocation } from 'react-router-dom'

function createScrollToId(
  setActiveSlug: (slug: string) => void,
  isProgrammaticScrollRef: MutableRefObject<boolean>,
) {
  return (id: string) => {
    setActiveSlug(id)
    isProgrammaticScrollRef.current = true
    const scrollTimer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
    const clearTimer = window.setTimeout(() => {
      isProgrammaticScrollRef.current = false
    }, 80 + 600)
    return () => {
      clearTimeout(scrollTimer)
      clearTimeout(clearTimer)
      isProgrammaticScrollRef.current = false
    }
  }
}

export function useScrollToHeading(
  setActiveSlug: (slug: string) => void,
  isProgrammaticScrollRef: MutableRefObject<boolean>,
): void {
  const location = useLocation()

  useEffect(() => {
    const section = new URLSearchParams(location.search).get('s')
    if (!section) return
    return createScrollToId(setActiveSlug, isProgrammaticScrollRef)(section)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search])

  useEffect(() => {
    const fragment = location.hash ? location.hash.slice(1) : ''
    if (!fragment) return
    return createScrollToId(setActiveSlug, isProgrammaticScrollRef)(fragment)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.hash])
}
