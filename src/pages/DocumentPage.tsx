import { Navigate, useParams } from 'react-router-dom'
import { getFirstFile, getProject } from '../content-loader'
import { MarkdownContent } from '../components/MarkdownContent'
import { decodeRoutePath, toProjectRoute } from '../lib/paths'

export function DocumentPage() {
  const params = useParams()
  const project = getProject(params.project)

  if (!project) {
    return (
      <section className="not-found">
        <h1>Nie znaleziono projektu</h1>
        <p>Żądany projekt nie występuje w wygenerowanym indeksie treści.</p>
      </section>
    )
  }

  const routePath = decodeRoutePath(params['*'])
  const firstFile = getFirstFile(project)

  if (!routePath && firstFile) {
    return <Navigate to={toProjectRoute(project.id, firstFile.routePath)} replace />
  }

  const file = project.routeMap.get(routePath) ?? firstFile

  if (!file) {
    return (
      <section className="not-found">
        <h1>Brak plików markdown</h1>
        <p>Ten projekt ma wpis w konfiguracji, ale nie znaleziono plików markdown.</p>
      </section>
    )
  }

  if (routePath && file.routePath !== routePath) {
    return (
      <section className="not-found">
        <h1>Nie znaleziono dokumentu</h1>
        <p>
          Dokument <code>{routePath}</code> nie istnieje w projekcie <code>{project.id}</code>.
        </p>
      </section>
    )
  }

  return (
    <>
      <header className="content-header">
        <div>
          <div className="breadcrumb">{project.title}</div>
          <h1 className="document-title">{file.title}</h1>
        </div>
      </header>
      <MarkdownContent project={project} file={file} />
    </>
  )
}
