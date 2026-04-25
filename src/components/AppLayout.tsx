import { type ReactNode, useState, useRef, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
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
  const location = useLocation()
  const [zoom, setZoom] = useState(1)
  const [searchOpen, setSearchOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const mainRef = useRef<HTMLElement>(null)

  const openSearch = useCallback(() => setSearchOpen(true), [])
  const closeSearch = useCallback(() => setSearchOpen(false), [])

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((o) => !o)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!e.ctrlKey && !e.metaKey) return
      if (e.key.toLowerCase() !== 'b') return
      if (e.shiftKey || e.altKey) return
      e.preventDefault()
      toggleSidebar()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toggleSidebar])

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

  useEffect(() => {
    const el = mainRef.current
    if (!el) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      el.scrollTo({ top: 0 })
      return
    }
    el.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <div className={sidebarOpen ? 'app-shell' : 'app-shell app-shell--sidebar-collapsed'}>
      <Sidebar activeProject={activeProject} onOpenSearch={openSearch} onCloseSidebar={() => setSidebarOpen(false)} />
      <button
        type="button"
        className={sidebarOpen ? 'sidebar-reopen sidebar-reopen--dormant' : 'sidebar-reopen'}
        onClick={() => setSidebarOpen(true)}
        title="Pokaż panel boczny (Ctrl+B)"
        aria-label="Pokaż panel boczny"
        aria-hidden={sidebarOpen}
        tabIndex={sidebarOpen ? -1 : 0}
      >
        <ChevronRightIcon />
      </button>
      <div className="app-content-area">
        <main ref={mainRef} className="content" style={{ zoom }}>
          <div key={location.pathname} className="route-transition">
            {children}
          </div>
        </main>
      </div>
      {activeProject ? <SearchDialog project={activeProject} open={searchOpen} onClose={closeSearch} /> : null}
    </div>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="m9 18 6-6-6-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
