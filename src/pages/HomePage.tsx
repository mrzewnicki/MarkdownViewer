import { Link } from 'react-router-dom'
import { getFirstFile, projects } from '../content-loader'
import { toProjectRoute } from '../lib/paths'

function plMarkdownFileCount(n: number): string {
  if (n === 1) return '1 plik markdown'
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 > 20)) {
    return `${n} pliki markdown`
  }
  return `${n} plików markdown`
}

export function HomePage() {
  if (projects.length === 0) {
    return (
      <section className="empty-state">
        <h1>Brak treści</h1>
        <p>
          Dodaj katalogi źródłowe w <code>content/</code>. Każdy katalog może zawierać pliki markdown oraz opcjonalny{' '}
          <code>.rpg-renderer/config.json</code> skopiowany z edytora.
        </p>
      </section>
    )
  }

  return (
    <section className="home">
      <h1>Opublikowane źródła Markdown</h1>
      <p>
        Wybierz źródłowy projekt, aby przeglądać markdown z blokami RPG, wyróżnieniami, linkami wiki i odniesieniami
        inline z edytora.
      </p>
      <div className="project-cards">
        {projects.map((project) => {
          const firstFile = getFirstFile(project)
          return (
            <Link className="project-card" key={project.id} to={toProjectRoute(project.id, firstFile?.routePath)}>
              <span className="project-card-title">{project.title}</span>
              <span className="project-card-meta">{plMarkdownFileCount(project.files.length)}</span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
