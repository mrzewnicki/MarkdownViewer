import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { Link } from 'react-router-dom'
import { type ProjectSearchHit, searchProject } from '../lib/projectSearch'
import { toProjectRoute } from '../lib/paths'
import type { ContentFile, ProjectContent } from '../types'

interface SearchDialogProps {
  project: ProjectContent
  open: boolean
  onClose: () => void
}

export function SearchDialog({ project, open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const titleId = useId()
  const descId = useId()

  const results = useMemo(() => searchProject(project, query), [project, query])

  useEffect(() => {
    if (!open) {
      setQuery('')
      return
    }
    const t = requestAnimationFrame(() => inputRef.current?.focus())
    return () => cancelAnimationFrame(t)
  }, [open])

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    },
    [onClose]
  )

  if (!open) return null

  return (
    <div
      className="search-dialog-backdrop"
      role="presentation"
      onClick={onClose}
      onKeyDown={onKeyDown}
    >
      <div
        className="search-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="search-dialog-header">
          <h2 id={titleId} className="search-dialog-title">
            Szukaj
          </h2>
          <p id={descId} className="search-dialog-hint">
            Filtruj po nazwie pliku, tagach lub treści strony.
            wpisywania.
          </p>
          <input
            ref={inputRef}
            className="search-dialog-input"
            type="search"
            autoComplete="off"
            spellCheck={false}
            placeholder="Szukaj…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Zapytanie wyszukiwania"
          />
        </div>
        <div className="search-dialog-columns">
          <SearchColumn
            label="Nazwy plików"
            emptyMessage={
              query.trim()
                ? 'Brak dopasowań w nazwach plików.'
                : 'Wpisz tekst, aby przeszukać ścieżki i tytuły plików.'
            }
            items={results.filenames}
            projectId={project.id}
            onPick={onClose}
            renderExtra={() => null}
          />
          <SearchColumn
            label="Tagi"
            emptyMessage={query.trim() ? 'Brak dopasowań tagów.' : 'Wpisz tekst, aby dopasować tagi z frontmattera.'}
            items={results.tags}
            projectId={project.id}
            onPick={onClose}
            renderExtra={(file) => (
              <span className="search-dialog-tags">
                {file.tags.map((t) => (
                  <span key={t} className="search-dialog-tag">
                    {t}
                  </span>
                ))}
              </span>
            )}
          />
          <SearchColumn
            label="Treść"
            emptyMessage={
              query.trim() ? 'Brak dopasowań w treści.' : 'Wpisz tekst, aby przeszukać treść dokumentu.'
            }
            items={results.content}
            projectId={project.id}
            onPick={onClose}
            renderExtra={(_file, snippet) =>
              snippet ? <span className="search-dialog-snippet">{snippet}</span> : null
            }
          />
        </div>
      </div>
    </div>
  )
}

function SearchColumn({
  label,
  emptyMessage,
  items,
  projectId,
  onPick,
  renderExtra,
}: {
  label: string
  emptyMessage: string
  items: ProjectSearchHit[]
  projectId: string
  onPick: () => void
  renderExtra: (file: ContentFile, snippet?: string) => ReactNode
}) {
  return (
    <section className="search-dialog-col" aria-label={label}>
      <h3 className="search-dialog-col-title">{label}</h3>
      {items.length === 0 ? (
        <p className="search-dialog-col-empty">{emptyMessage}</p>
      ) : (
        <ul className="search-dialog-list">
          {items.map((hit) => (
            <li key={hit.file.path}>
              <Link
                className="search-dialog-link"
                to={toProjectRoute(projectId, hit.file.routePath)}
                onClick={onPick}
              >
                <span className="search-dialog-link-title">{hit.file.title}</span>
                <span className="search-dialog-link-path">{hit.file.path}</span>
                {renderExtra(hit.file, hit.snippet)}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
