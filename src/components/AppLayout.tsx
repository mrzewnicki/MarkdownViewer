import { type ReactNode, useState, useRef, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { SearchDialog } from './SearchDialog'
import { CommentsOverview } from './CommentsOverview'
import { ChevronRightIcon } from './icons'
import { useKeyboardShortcut } from '../hooks/useKeyboardShortcut'
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
  const [commentsOverviewOpen, setCommentsOverviewOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const mainRef = useRef<HTMLElement>(null)

  const openSearch = useCallback(() => setSearchOpen(true), [])
  const closeSearch = useCallback(() => setSearchOpen(false), [])
  const openCommentsOverview = useCallback(() => setCommentsOverviewOpen(true), [])
  const closeCommentsOverview = useCallback(() => setCommentsOverviewOpen(false), [])

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((o) => !o)
  }, [])

  const handleToggleSidebarShortcut = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault()
      toggleSidebar()
    },
    [toggleSidebar],
  )

  const handleOpenSearchShortcut = useCallback(
    (e: KeyboardEvent) => {
      if (!activeProject) return
      e.preventDefault()
      setSearchOpen(true)
    },
    [activeProject],
  )

  useKeyboardShortcut({ key: 'b', ctrlOrMeta: true }, handleToggleSidebarShortcut)
  useKeyboardShortcut({ key: 'f', shift: true }, handleOpenSearchShortcut)

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
      <Sidebar
        activeProject={activeProject}
        onOpenSearch={openSearch}
        onOpenCommentsOverview={openCommentsOverview}
        onCloseSidebar={() => setSidebarOpen(false)}
      />
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
      <CommentsOverview open={commentsOverviewOpen} onClose={closeCommentsOverview} />
    </div>
  )
}
