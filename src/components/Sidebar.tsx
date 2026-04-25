import { NavLink } from 'react-router-dom'
import { getFirstFile, projects } from '../content-loader'
import { toProjectRoute } from '../lib/paths'
import type { ProjectContent } from '../types'
import { FileTree } from './FileTree'

interface SidebarProps {
  activeProject?: ProjectContent | null
  onOpenSearch: () => void
  onCloseSidebar: () => void
}

export function Sidebar({ activeProject, onOpenSearch, onCloseSidebar }: SidebarProps) {

  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-title">MarkdownViewer</span>
        <button
          type="button"
          className="sidebar-collapse"
          onClick={onCloseSidebar}
          title="Zwiń panel boczny (Ctrl+B)"
          aria-label="Zwiń panel boczny"
        >
          <ChevronLeftIcon />
        </button>
      </div>

      <div className="sidebar-search-row">
        <button
          type="button"
          className="search-icon-button"
          onClick={onOpenSearch}
          disabled={!activeProject}
          title={activeProject ? 'Szukaj (Shift+F)' : 'Wybierz projekt, aby włączyć wyszukiwanie'}
          aria-label={
            activeProject ? 'Wyszukaj' : 'Wybierz projekt, aby włączyć wyszukiwanie'
          }
        >
          <SearchIcon />
          <span className="search-icon-button-label">Wyszukaj</span>
        </button>
      </div>

      <div className="section-label">Projekty</div>
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
          <div className="section-label">Pliki</div>
          <FileTree key={activeProject.id} projectId={activeProject.id} nodes={activeProject.tree} />
        </>
      ) : null}
    </aside>
  )
}

function ChevronLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="m15 18-6-6 6-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m21 21-4.35-4.35"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
