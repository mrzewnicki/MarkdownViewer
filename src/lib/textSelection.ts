import type { Comment, SelectionOffset } from '../types'

const TABLE_STRUCTURE_TAGS = new Set([
  'TABLE',
  'THEAD',
  'TBODY',
  'TFOOT',
  'TR',
  'COLGROUP',
  'COL',
])

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

function unwrapCommentMark(mark: Element): void {
  const parent = mark.parentNode
  if (!parent) return
  while (mark.firstChild) {
    parent.insertBefore(mark.firstChild, mark)
  }
  mark.remove()
}

function restoreCommentHighlights(root: HTMLElement): void {
  root.querySelectorAll('mark.comment-highlight').forEach((mark) => {
    unwrapCommentMark(mark)
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

function createCommentMark(comment: Comment): HTMLElement {
  const mark = document.createElement('mark')
  mark.className = 'comment-highlight'
  mark.dataset.commentId = comment.id
  mark.title = comment.text
  return mark
}

function isTableStructureParent(node: Node): boolean {
  const parent = node.parentElement
  return Boolean(parent && TABLE_STRUCTURE_TAGS.has(parent.tagName))
}

interface TextSlice {
  node: Text
  start: number
  end: number
}

function collectTextSlices(root: HTMLElement, start: number, end: number): TextSlice[] {
  const slices: TextSlice[] = []
  const nodes = walkTextNodes(root)
  let current = 0

  for (const node of nodes) {
    const length = node.textContent?.length ?? 0
    const next = current + length
    const overlapStart = Math.max(start, current)
    const overlapEnd = Math.min(end, next)

    if (overlapStart < overlapEnd && !isTableStructureParent(node)) {
      slices.push({
        node,
        start: overlapStart - current,
        end: overlapEnd - current,
      })
    }

    current = next
    if (current >= end) break
  }

  return slices
}

function wrapTextSlice(slice: TextSlice, comment: Comment): void {
  let textNode = slice.node
  const { start, end } = slice

  if (end < (textNode.textContent?.length ?? 0)) {
    textNode.splitText(end)
  }
  if (start > 0) {
    textNode = textNode.splitText(start)
  }

  const mark = createCommentMark(comment)
  textNode.parentNode?.insertBefore(mark, textNode)
  mark.append(textNode)
}

function applyCommentHighlight(comment: Comment, slices: TextSlice[]): void {
  // Wrap each intersecting text node separately so <mark> never becomes a
  // direct child of <tr>/<table> or a wrapper around <td>/<th>.
  for (let i = slices.length - 1; i >= 0; i -= 1) {
    wrapTextSlice(slices[i]!, comment)
  }
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

    const slices = collectTextSlices(root, start, end)
    if (slices.length === 0) return

    applyCommentHighlight(comment, slices)
    highlightedRanges.push(nextRange)
  })
}
