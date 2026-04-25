import type { ContentFile, ProjectContent } from '../types'
import { basename } from './paths'

export interface ProjectSearchHit {
  file: ContentFile
  snippet?: string
}

function norm(s: string): string {
  return s.toLowerCase()
}

function stripFrontmatter(content: string): string {
  return content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '')
}

function snippetAround(text: string, query: string, before = 48, after = 72): string {
  const lower = text.toLowerCase()
  const q = query.toLowerCase()
  const idx = lower.indexOf(q)
  if (idx < 0) return ''
  const start = Math.max(0, idx - before)
  const end = Math.min(text.length, idx + query.length + after)
  let s = text.slice(start, end).replace(/\s+/g, ' ').trim()
  if (start > 0) s = '…' + s
  if (end < text.length) s = s + '…'
  return s
}

const sortByTitle = (a: ProjectSearchHit, b: ProjectSearchHit) =>
  a.file.title.localeCompare(b.file.title, 'pl', { sensitivity: 'base' }) ||
  a.file.path.localeCompare(b.file.path, 'pl')

export function searchProject(
  project: ProjectContent,
  query: string
): { filenames: ProjectSearchHit[]; tags: ProjectSearchHit[]; content: ProjectSearchHit[] } {
  const q = query.trim()
  if (!q) {
    return { filenames: [], tags: [], content: [] }
  }
  const nq = norm(q)

  const filenameHits: ProjectSearchHit[] = []
  const tagHits: ProjectSearchHit[] = []
  const contentHits: ProjectSearchHit[] = []
  const seenInNames = new Set<string>()
  const seenInTags = new Set<string>()
  const seenInContent = new Set<string>()

  for (const file of project.files) {
    const base = basename(file.path)
    if (norm(file.path).includes(nq) || norm(base).includes(nq) || norm(file.title).includes(nq)) {
      if (!seenInNames.has(file.path)) {
        seenInNames.add(file.path)
        filenameHits.push({ file })
      }
    }

    const tagMatch = file.tags.some((tag) => norm(tag).includes(nq))
    if (tagMatch && !seenInTags.has(file.path)) {
      seenInTags.add(file.path)
      tagHits.push({ file })
    }

    const body = stripFrontmatter(file.content)
    if (norm(body).includes(nq) && !seenInContent.has(file.path)) {
      seenInContent.add(file.path)
      contentHits.push({ file, snippet: snippetAround(body, q) })
    }
  }

  filenameHits.sort(sortByTitle)
  tagHits.sort(sortByTitle)
  contentHits.sort(sortByTitle)

  return { filenames: filenameHits, tags: tagHits, content: contentHits }
}
