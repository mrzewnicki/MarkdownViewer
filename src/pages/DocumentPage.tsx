import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { CommentPanel } from '../components/CommentPanel'
import { getFirstFile, getProject } from '../content-loader'
import { MarkdownContent } from '../components/MarkdownContent'
import { decodeRoutePath, toProjectRoute } from '../lib/paths'

export function DocumentPage() {
  const params = useParams()
  const [commentsOpen, setCommentsOpen] = useState(true)
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
    <div className="document-layout">
      <div className="document-main">
        <header className="content-header">
          <div>
            <div className="breadcrumb">{project.title}</div>
            <h1 className="document-title">{file.title}</h1>
          </div>
          <button
            type="button"
            className="comment-panel-toggle"
            aria-pressed={commentsOpen}
            onClick={() => setCommentsOpen((open) => !open)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Komentarze
          </button>
        </header>
        <MarkdownContent project={project} file={file} />
      </div>
      <CommentPanel projectId={project.id} fileId={file.routePath} isOpen={commentsOpen} />
    </div>
  )
}
