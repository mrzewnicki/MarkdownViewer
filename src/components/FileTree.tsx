import { NavLink } from 'react-router-dom'
import type { FileTreeNode } from '../types'
import { toProjectRoute, withoutMarkdownExtension } from '../lib/paths'

interface FileTreeProps {
  projectId: string
  nodes: FileTreeNode[]
}

function FileTreeItem({ projectId, node }: { projectId: string; node: FileTreeNode }) {
  if (node.kind === 'dir') {
    return (
      <li className="tree-folder">
        <span className="tree-folder-name">{node.name}</span>
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
    return <p className="brand-subtitle">No markdown files found.</p>
  }

  return (
    <ul className="file-tree">
      {nodes.map((node) => (
        <FileTreeItem key={`${node.kind}:${node.path}`} projectId={projectId} node={node} />
      ))}
    </ul>
  )
}
