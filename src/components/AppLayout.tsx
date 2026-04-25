import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import type { ProjectContent } from '../types'

interface AppLayoutProps {
  activeProject?: ProjectContent | null
  children: ReactNode
}

export function AppLayout({ activeProject, children }: AppLayoutProps) {
  return (
    <div className="app-shell">
      <Sidebar activeProject={activeProject} />
      <main className="content">{children}</main>
    </div>
  )
}
