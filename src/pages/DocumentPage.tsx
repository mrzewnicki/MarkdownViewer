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
        <h1>Project not found</h1>
        <p>The requested project is not available in the generated content index.</p>
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
        <h1>No markdown files</h1>
        <p>This project has a config entry, but no markdown files were found.</p>
      </section>
    )
  }

  if (routePath && file.routePath !== routePath) {
    return (
      <section className="not-found">
        <h1>Document not found</h1>
        <p>
          The document <code>{routePath}</code> does not exist in <code>{project.id}</code>.
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
        <div className="document-path">{file.path}</div>
      </header>
      <MarkdownContent project={project} file={file} />
    </>
  )
}
