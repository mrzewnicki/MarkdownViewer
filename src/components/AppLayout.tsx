import { type ReactNode, useState, useRef, useEffect, useCallback } from 'react'
import { Sidebar } from './Sidebar'
import { SearchDialog } from './SearchDialog'
import type { ProjectContent } from '../types'

interface AppLayoutProps {
  activeProject?: ProjectContent | null
  children: ReactNode
}

const ZOOM_STEP = 0.1
const ZOOM_MIN = 0.3
const ZOOM_MAX = 3.0

export function AppLayout({ activeProject, children }: AppLayoutProps) {
  const [zoom, setZoom] = useState(1)
  const [searchOpen, setSearchOpen] = useState(false)
  const mainRef = useRef<HTMLElement>(null)

  const openSearch = useCallback(() => setSearchOpen(true), [])
  const closeSearch = useCallback(() => setSearchOpen(false), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!e.shiftKey || e.ctrlKey || e.metaKey || e.altKey) return
      if (e.key.toLowerCase() !== 'f') return
      if (!activeProject) return
      e.preventDefault()
      setSearchOpen(true)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeProject])

  useEffect(() => {
    const el = mainRef.current
    if (!el) return
    const handleWheel = (e: WheelEvent) => {
      if (!e.ctrlKey) return
      e.preventDefault()
      setZoom((prev) => {
        const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP
        return Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Math.round((prev + delta) * 10) / 10))
      })
    }
    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [])

  return (
    <div className="app-shell">
      <Sidebar activeProject={activeProject} onOpenSearch={openSearch} />
      <div className="app-content-area">
        <main ref={mainRef} className="content" style={{ zoom }}>
          {children}
        </main>
        {activeProject ? <SearchDialog project={activeProject} open={searchOpen} onClose={closeSearch} /> : null}
      </div>
    </div>
  )
}
