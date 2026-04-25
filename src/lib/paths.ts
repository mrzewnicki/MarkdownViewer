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

export function resolveRelativePath(target: string, fromFilePath: string): string | null {
  if (!target || /^[a-z][a-z0-9+.-]*:/i.test(target) || target.startsWith('#')) return null
  const cleanTarget = target.split(/[?#]/)[0] ?? ''
  if (!cleanTarget) return null
  const base = normalizePath(fromFilePath).split('/').slice(0, -1)
  for (const segment of normalizePath(cleanTarget).split('/')) {
    if (!segment || segment === '.') continue
    if (segment === '..') base.pop()
    else base.push(segment)
  }
  return base.join('/')
}

export function basename(path: string): string {
  const parts = normalizePath(path).split('/')
  return parts[parts.length - 1] ?? path
}
