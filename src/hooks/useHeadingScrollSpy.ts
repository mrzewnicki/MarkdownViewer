import { useEffect, useState, type MutableRefObject } from 'react'
import type { MarkdownHeading } from '../lib/rpgMarkdown'

export interface HeadingScrollSpyResult {
  activeSlug: string | null
  setActiveSlug: (slug: string) => void
}

export function useHeadingScrollSpy(
  headings: MarkdownHeading[],
  isProgrammaticScrollRef: MutableRefObject<boolean>,
): HeadingScrollSpyResult {
  const [activeSlug, setActiveSlug] = useState<string | null>(null)

  useEffect(() => {
    if (headings.length === 0) return

    const getActive = () => {
      if (isProgrammaticScrollRef.current) return
      const threshold = window.innerHeight * 0.25
      let active: string | null = null
      for (const h of headings) {
        const el = document.getElementById(h.slug)
        if (!el) continue
        if (el.getBoundingClientRect().top <= threshold) {
          active = h.slug
        }
      }
      setActiveSlug(active)
    }

    getActive()
    window.addEventListener('scroll', getActive, { passive: true })
    return () => window.removeEventListener('scroll', getActive)
  }, [headings, isProgrammaticScrollRef])

  return { activeSlug, setActiveSlug }
}
