import { NavLink } from 'react-router-dom'
import type { FileTreeNode } from '../types'
import { toProjectRoute, withoutMarkdownExtension } from '../lib/paths'

function TreeFolderIcon() {
  return (
    <svg
      className="tree-folder-icon"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9l-1.42-1.9A2 2 0 0 0 7.43 2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

interface FileTreeProps {
  projectId: string
  nodes: FileTreeNode[]
}

function FileTreeItem({ projectId, node }: { projectId: string; node: FileTreeNode }) {
  if (node.kind === 'dir') {
    return (
      <li className="tree-folder">
        <span className="tree-folder-name">
          <TreeFolderIcon />
          {node.name}
        </span>
        {node.children && node.children.length > 0 ? (
          <ul className="file-tree file-tree-children">
            {node.children.map((child) => (
              <FileTreeItem key={`${child.kind}:${child.path}`} projectId={projectId} node={child} />
            ))}
          </ul>
        ) : null}
      </li>
    )
  }

  return (
    <li>
      <NavLink className="file-link" to={toProjectRoute(projectId, withoutMarkdownExtension(node.path))}>
        {node.title ?? node.name}
      </NavLink>
    </li>
  )
}

export function FileTree({ projectId, nodes }: FileTreeProps) {
  if (nodes.length === 0) {
    return <p className="brand-subtitle">Nie znaleziono plików markdown.</p>
  }

  return (
    <ul className="file-tree">
      {nodes.map((node) => (
        <FileTreeItem key={`${node.kind}:${node.path}`} projectId={projectId} node={node} />
      ))}
    </ul>
  )
}
