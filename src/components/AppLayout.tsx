import { type ReactNode, useState, useRef, useEffect } from 'react'
import { Sidebar } from './Sidebar'
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
  const mainRef = useRef<HTMLElement>(null)

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
      <Sidebar activeProject={activeProject} />
      <main ref={mainRef} className="content" style={{ zoom }}>
        {children}
      </main>
    </div>
  )
}
