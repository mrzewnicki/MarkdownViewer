import type { Comment, SelectionOffset } from '../types'

export function walkTextNodes(root: HTMLElement): Text[] {
  const nodes: Text[] = []
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement
      if (!parent) return NodeFilter.FILTER_REJECT
      if (parent.closest('script, style, textarea')) return NodeFilter.FILTER_REJECT
      return node.textContent ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
    },
  })

  while (walker.nextNode()) {
    nodes.push(walker.currentNode as Text)
  }

  return nodes
}

export function getSelectionOffset(root: HTMLElement, range: Range): SelectionOffset {
  const preRange = document.createRange()
  preRange.selectNodeContents(root)
  preRange.setEnd(range.startContainer, range.startOffset)

  const start = preRange.toString().length
  return { start, end: start + range.toString().length }
}

export function getSelectionAnchor(root: HTMLElement, range: Range): string {
  const fullText = root.textContent ?? ''
  const { start, end } = getSelectionOffset(root, range)
  return fullText.slice(Math.max(0, start - 60), Math.min(fullText.length, end + 60))
}

function rangesOverlap(first: SelectionOffset, second: SelectionOffset): boolean {
  return first.start < second.end && second.start < first.end
}

export function selectionIntersectsCommentHighlight(root: HTMLElement, range: Range): boolean {
  return Array.from(root.querySelectorAll('.comment-highlight')).some((highlight) =>
    range.intersectsNode(highlight),
  )
}

function restoreCommentHighlights(root: HTMLElement): void {
  root.querySelectorAll('mark.comment-highlight').forEach((mark) => {
    mark.replaceWith(document.createTextNode(mark.textContent ?? ''))
  })
  root.normalize()
}

function findQuoteOffset(root: HTMLElement, comment: Comment): number {
  const fullText = root.textContent ?? ''
  const anchorOffset = comment.anchor ? fullText.indexOf(comment.anchor) : -1

  if (anchorOffset >= 0) {
    const quoteOffset = comment.anchor.indexOf(comment.quote)
    if (quoteOffset >= 0) return anchorOffset + quoteOffset
  }

  return fullText.indexOf(comment.quote)
}

function getRangeFromOffsets(root: HTMLElement, start: number, end: number): Range | null {
  const nodes = walkTextNodes(root)
  const range = document.createRange()
  let current = 0
  let startSet = false

  for (const node of nodes) {
    const length = node.textContent?.length ?? 0
    const next = current + length

    if (!startSet && start <= next) {
      range.setStart(node, Math.max(0, start - current))
      startSet = true
    }

    if (startSet && end <= next) {
      range.setEnd(node, Math.max(0, end - current))
      return range
    }

    current = next
  }

  return null
}

export function restoreHighlightsFromComments(root: HTMLElement, comments: Comment[]): void {
  restoreCommentHighlights(root)
  const highlightedRanges: SelectionOffset[] = []

  comments.forEach((comment) => {
    const start = findQuoteOffset(root, comment)
    if (start < 0) return
    const end = start + comment.quote.length
    const nextRange: SelectionOffset = { start, end }
    if (highlightedRanges.some((highlightedRange) => rangesOverlap(highlightedRange, nextRange))) return

    const range = getRangeFromOffsets(root, start, end)
    if (!range || range.collapsed) return

    const mark = document.createElement('mark')
    mark.className = 'comment-highlight'
    mark.dataset.commentId = comment.id
    mark.title = comment.text

    const contents = range.extractContents()
    mark.append(contents)
    range.insertNode(mark)
    highlightedRanges.push(nextRange)
  })
}
