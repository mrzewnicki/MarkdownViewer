import { Link } from 'react-router-dom'
import { getFirstFile, projects } from '../content-loader'
import { toProjectRoute } from '../lib/paths'

export function HomePage() {
  if (projects.length === 0) {
    return (
      <section className="empty-state">
        <h1>No content yet</h1>
        <p>
          Add source folders under <code>content/</code>. Each folder can contain markdown files and an optional{' '}
          <code>.rpg-renderer/config.json</code> copied from the Editor.
        </p>
      </section>
    )
  }

  return (
    <section className="home">
      <h1>Published Markdown Sources</h1>
      <p>Select a source project to browse markdown rendered with the RPG blocks, callouts, wiki links, and inline refs from the Editor.</p>
      <div className="project-cards">
        {projects.map((project) => {
          const firstFile = getFirstFile(project)
          return (
            <Link className="project-card" key={project.id} to={toProjectRoute(project.id, firstFile?.routePath)}>
              <span className="project-card-title">{project.title}</span>
              <span className="project-card-meta">
                {project.files.length} markdown file{project.files.length === 1 ? '' : 's'}
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
