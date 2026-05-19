import { NavLink } from 'react-router-dom'
import { getFirstFile, projects } from '../content-loader'
import { toProjectRoute } from '../lib/paths'
import type { ProjectContent } from '../types'
import { FileTree } from './FileTree'
import { ChevronLeftIcon, CommentsIcon, SearchIcon } from './icons'

interface SidebarProps {
  activeProject?: ProjectContent | null
  onOpenSearch: () => void
  onOpenCommentsOverview: () => void
  onCloseSidebar: () => void
}

export function Sidebar({ activeProject, onOpenSearch, onOpenCommentsOverview, onCloseSidebar }: SidebarProps) {
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
          aria-label={activeProject ? 'Wyszukaj' : 'Wybierz projekt, aby włączyć wyszukiwanie'}
        >
          <SearchIcon />
          <span className="search-icon-button-label">Wyszukaj</span>
        </button>
        <button
          type="button"
          className="comments-overview-button"
          onClick={onOpenCommentsOverview}
          title="Wszystkie komentarze"
        >
          <CommentsIcon />
          <span className="comments-overview-button-label">Wszystkie komentarze</span>
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
