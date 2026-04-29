import { useEffect, useMemo, useRef, useState } from 'react'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import { CommentPanel } from '../components/CommentPanel'
import { getFirstFile, getProject } from '../content-loader'
import { MarkdownContent } from '../components/MarkdownContent'
import { TableOfContents } from '../components/TableOfContents'
import { extractHeadingsForToc } from '../lib/rpgMarkdown'
import { loadComments, subscribeToComments } from '../lib/commentStore'
import { decodeRoutePath, toProjectRoute } from '../lib/paths'

export function DocumentPage() {
  const params = useParams()
  const location = useLocation()
  const [commentsOpen, setCommentsOpen] = useState(false)
  const [scrollActiveSlug, setScrollActiveSlug] = useState<string | null>(null)
  const userToggledRef = useRef(false)
  const isProgrammaticScrollRef = useRef(false)
  const project = getProject(params.project)

  const scrollToId = (id: string) => {
    setScrollActiveSlug(id)
    isProgrammaticScrollRef.current = true
    const scrollTimer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
    const clearTimer = setTimeout(() => {
      isProgrammaticScrollRef.current = false
    }, 80 + 600)
    return () => {
      clearTimeout(scrollTimer)
      clearTimeout(clearTimer)
      isProgrammaticScrollRef.current = false
    }
  }

  useEffect(() => {
    const section = new URLSearchParams(location.search).get('s')
    if (!section) return
    return scrollToId(section)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search])

  useEffect(() => {
    const fragment = location.hash ? location.hash.slice(1) : ''
    if (!fragment) return
    return scrollToId(fragment)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.hash])

  const routePath = decodeRoutePath(params['*'])
  const firstFile = project ? getFirstFile(project) : null
  const file = project ? (project.routeMap.get(routePath) ?? firstFile) : null
  const headings = useMemo(() => (project && file ? extractHeadingsForToc(file.content, project.config) : []), [file, project])

  useEffect(() => {
    if (headings.length === 0) return

    const getActive = () => {
      if (isProgrammaticScrollRef.current) return
      const threshold = window.innerHeight * 0.25
      let active: string | null = null
      for (const h of headings) {
        const el = document.getElementById(h.slug)
        if (!el) continue
        if (el.getBoundingClientRect().top <= threshold) {
          active = h.slug
        }
      }
      setScrollActiveSlug(active)
    }

    getActive()
    window.addEventListener('scroll', getActive, { passive: true })
    return () => window.removeEventListener('scroll', getActive)
  }, [headings])

  const projectId = project?.id
  const fileId = file?.routePath

  useEffect(() => {
    userToggledRef.current = false

    const check = () => {
      if (userToggledRef.current) return
      const hasComments = loadComments().some(
        (c) => c.projectId === projectId && c.fileId === fileId && !c.resolved,
      )
      setCommentsOpen(hasComments)
    }

    check()
    const unsubscribe = subscribeToComments(check)
    window.addEventListener('storage', check)
    return () => {
      unsubscribe()
      window.removeEventListener('storage', check)
    }
  }, [projectId, fileId])

  if (!project) {
    return (
      <section className="not-found">
        <h1>Nie znaleziono projektu</h1>
        <p>Żądany projekt nie występuje w wygenerowanym indeksie treści.</p>
      </section>
    )
  }

  if (!routePath && firstFile) {
    return <Navigate to={toProjectRoute(project.id, firstFile.routePath)} replace />
  }

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
    <div className={commentsOpen ? 'document-layout' : 'document-layout document-layout--comments-closed'}>
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
            onClick={() => { userToggledRef.current = true; setCommentsOpen((open) => !open) }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </button>
        </header>
        <MarkdownContent project={project} file={file} />
        {headings.length > 0 ? <TableOfContents headings={headings} activeSlug={scrollActiveSlug} /> : null}
      </div>
      <CommentPanel projectId={project.id} fileId={file.routePath} isOpen={commentsOpen} />
    </div>
  )
}
