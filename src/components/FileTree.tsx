import { useCallback, useEffect, useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import type { FileTreeNode } from '../types'
import { loadComments, subscribeToComments } from '../lib/commentStore'
import { toProjectRoute, withoutMarkdownExtension } from '../lib/paths'

const FOLDER_PATH =
  'M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9l-1.42-1.9A2 2 0 0 0 7.43 2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2Z'

/** Outline when collapsed, filled when open (per sidebar convention). */
function TreeDirectoryIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="tree-directory-icon"
      data-open={open}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {open ? (
        <path d={FOLDER_PATH} fill="currentColor" stroke="none" />
      ) : (
        <path
          d={FOLDER_PATH}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  )
}

interface FileTreeProps {
  projectId: string
  nodes: FileTreeNode[]
}

function FileTreeItem({
  projectId,
  node,
  collapsedPaths,
  commentCounts,
  onToggleFolder,
}: {
  projectId: string
  node: FileTreeNode
  collapsedPaths: ReadonlySet<string>
  commentCounts: ReadonlyMap<string, number>
  onToggleFolder: (path: string) => void
}) {
  if (node.kind === 'dir') {
    const hasChildren = Boolean(node.children && node.children.length > 0)
    const isExpanded = hasChildren && !collapsedPaths.has(node.path)
    return (
      <li className="tree-folder">
        {hasChildren ? (
          <button
            type="button"
            className="tree-folder-header"
            onClick={() => onToggleFolder(node.path)}
            aria-expanded={isExpanded}
            title={isExpanded ? 'Zwiń folder' : 'Rozwiń folder'}
          >
            <span className="tree-folder-directory" aria-hidden>
              <TreeDirectoryIcon open={isExpanded} />
            </span>
            <span className="tree-folder-name-text">{node.name}</span>
          </button>
        ) : (
          <div className="tree-folder-header tree-folder-header--empty">
            <span className="tree-folder-directory" aria-hidden>
              <TreeDirectoryIcon open={false} />
            </span>
            <span className="tree-folder-name-text">{node.name}</span>
          </div>
        )}
        {hasChildren ? (
          <div
            className="tree-folder-collapse"
            data-expanded={isExpanded}
            inert={!isExpanded}
          >
            <div className="tree-folder-collapse-inner">
              <ul className="file-tree file-tree-children">
                {node.children!.map((child) => (
                  <FileTreeItem
                    key={`${child.kind}:${child.path}`}
                    projectId={projectId}
                    node={child}
                    collapsedPaths={collapsedPaths}
                    commentCounts={commentCounts}
                    onToggleFolder={onToggleFolder}
                  />
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </li>
    )
  }

  const routePath = withoutMarkdownExtension(node.path)
  const commentCount = commentCounts.get(routePath) ?? 0

  return (
    <li>
      <NavLink className="file-link" to={toProjectRoute(projectId, routePath)}>
        <span className="file-link__label">{node.title ?? node.name}</span>
        {commentCount > 0 ? (
          <span className="file-link__comment-count" aria-label={`Aktywne komentarze: ${commentCount}`}>
            {commentCount}
          </span>
        ) : null}
      </NavLink>
    </li>
  )
}

export function FileTree({ projectId, nodes }: FileTreeProps) {
  const [collapsedPaths, setCollapsedPaths] = useState<Set<string>>(() => new Set())
  const [comments, setComments] = useState(() => loadComments())

  const onToggleFolder = useCallback((path: string) => {
    setCollapsedPaths((prev) => {
      const next = new Set(prev)
      if (next.has(path)) next.delete(path)
      else next.add(path)
      return next
    })
  }, [])

  const refreshComments = useCallback(() => {
    setComments(loadComments())
  }, [])

  useEffect(() => {
    const unsubscribe = subscribeToComments(refreshComments)
    window.addEventListener('storage', refreshComments)

    return () => {
      unsubscribe()
      window.removeEventListener('storage', refreshComments)
    }
  }, [refreshComments])

  const commentCounts = useMemo(() => {
    const counts = new Map<string, number>()

    comments.forEach((comment) => {
      if (comment.projectId !== projectId || comment.resolved) return
      counts.set(comment.fileId, (counts.get(comment.fileId) ?? 0) + 1)
    })

    return counts
  }, [comments, projectId])

  if (nodes.length === 0) {
    return <p className="brand-subtitle">Nie znaleziono plików markdown.</p>
  }

  return (
    <ul className="file-tree">
      {nodes.map((node) => (
        <FileTreeItem
          key={`${node.kind}:${node.path}`}
          projectId={projectId}
          node={node}
          collapsedPaths={collapsedPaths}
          commentCounts={commentCounts}
          onToggleFolder={onToggleFolder}
        />
      ))}
    </ul>
  )
}
