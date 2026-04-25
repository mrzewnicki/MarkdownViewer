import { NavLink } from 'react-router-dom'
import { getFirstFile, projects } from '../content-loader'
import { toProjectRoute } from '../lib/paths'
import type { ProjectContent } from '../types'
import { FileTree } from './FileTree'

interface SidebarProps {
  activeProject?: ProjectContent | null
}

export function Sidebar({ activeProject }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-title">MarkdownViewer</span>
      </div>

      <div className="section-label">Projects</div>
      <nav>
        <ul className="project-list">
          {projects.map((project) => {
            const firstFile = getFirstFile(project)
            return (
              <li key={project.id}>
                <NavLink className="nav-link" to={toProjectRoute(project.id, firstFile?.routePath)}>
                  {project.title}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>

      {activeProject ? (
        <>
          <div className="section-label">Files</div>
          <FileTree projectId={activeProject.id} nodes={activeProject.tree} />
        </>
      ) : null}
    </aside>
  )
}
