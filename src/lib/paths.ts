export function normalizePath(path: string): string {
  return path.replace(/\\/g, '/').replace(/^\/+/, '')
}

export function withoutMarkdownExtension(path: string): string {
  return path.replace(/\.(md|markdown|mdx)$/i, '')
}

export function encodeRoutePath(path: string): string {
  return normalizePath(path)
    .split('/')
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join('/')
}

export function toProjectRoute(projectId: string, routePath?: string): string {
  const project = encodeURIComponent(projectId)
  const encodedRoute = routePath ? encodeRoutePath(routePath) : ''
  return encodedRoute ? `/${project}/${encodedRoute}` : `/${project}`
}

export function toProjectHref(projectId: string, routePath?: string): string {
  return `#${toProjectRoute(projectId, routePath)}`
}

export function decodeRoutePath(path: string | undefined): string {
  if (!path) return ''
  return normalizePath(path)
    .split('/')
    .filter(Boolean)
    .map((segment) => {
      try {
        return decodeURIComponent(segment)
      } catch {
        return segment
      }
    })
    .join('/')
}

/**
 * Resolves a markdown `src` or `href` to a project-relative key (no leading slash) for
 * the same tree as under `content/<projectId>/`.
 * - Skips `http:`, `mailto:`, and similar; `#` only; `//` protocol-relative URLs.
 * - Leading `/` means "from project root" (e.g. `![](/assets/x.png)`).
 * - Decodes `%20` and per-segment encoding the editor uses in dropped links
 *   (`encodeURIComponent` per path segment) so keys match `import.meta.glob` paths.
 */
export function resolveRelativePath(target: string, fromFilePath: string): string | null {
  if (!target || /^[a-z][a-z0-9+.-]*:/i.test(target) || target.startsWith('#')) return null
  const rawPath = (target.split(/[?#]/)[0] ?? '').trim()
  if (!rawPath || rawPath.startsWith('//')) return null
  const fromProjectRoot = rawPath.startsWith('/')
  let pathToWalk = fromProjectRoot ? rawPath.replace(/^\/+/, '') : rawPath
  try {
    pathToWalk = decodeURIComponent(pathToWalk.replace(/\+/g, ' '))
  } catch {
    /* keep pathToWalk */
  }
  if (!pathToWalk) return null
  const base = fromProjectRoot ? [] : normalizePath(fromFilePath).split('/').slice(0, -1)
  for (const segment of normalizePath(pathToWalk).split('/')) {
    if (!segment || segment === '.') continue
    if (segment === '..') {
      if (base.length > 0) base.pop()
    } else {
      base.push(segment)
    }
  }
  return base.join('/')
}

export function basename(path: string): string {
  const parts = normalizePath(path).split('/')
  return parts[parts.length - 1] ?? path
}
