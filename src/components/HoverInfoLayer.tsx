import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { parseHoverInfoAttr, type HoverInfo, type HoverInfoProvider } from '../lib/hoverInfo'

interface HoverInfoLayerProps {
  provider: HoverInfoProvider
  children: ReactNode
}

interface TipState {
  info: HoverInfo
  x: number
  y: number
  maxWidth: number
}

const VIEWPORT_PAD = 8
const TIP_GAP = 8

function positionTip(anchor: DOMRect, tipWidth: number, tipHeight: number): { x: number; y: number } {
  const vw = window.innerWidth
  const vh = window.innerHeight
  let x = anchor.left + anchor.width / 2 - tipWidth / 2
  x = Math.max(VIEWPORT_PAD, Math.min(x, vw - tipWidth - VIEWPORT_PAD))

  let y = anchor.bottom + TIP_GAP
  if (y + tipHeight + VIEWPORT_PAD > vh) {
    y = anchor.top - tipHeight - TIP_GAP
  }
  y = Math.max(VIEWPORT_PAD, Math.min(y, vh - tipHeight - VIEWPORT_PAD))
  return { x, y }
}

export function HoverInfoLayer({ provider, children }: HoverInfoLayerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const tipRef = useRef<HTMLDivElement>(null)
  const activeElRef = useRef<HTMLElement | null>(null)
  const savedTitleRef = useRef<string | null>(null)
  const [tip, setTip] = useState<TipState | null>(null)

  const clearTip = useCallback(() => {
    const el = activeElRef.current
    if (el && savedTitleRef.current != null) {
      el.setAttribute('title', savedTitleRef.current)
    }
    activeElRef.current = null
    savedTitleRef.current = null
    setTip(null)
  }, [])

  const showFor = useCallback(
    (el: HTMLElement) => {
      const key = parseHoverInfoAttr(el.getAttribute('data-hover-info'))
      if (!key) {
        clearTip()
        return
      }
      const info = provider.resolve(key)
      if (!info) {
        clearTip()
        return
      }

      if (activeElRef.current && activeElRef.current !== el && savedTitleRef.current != null) {
        activeElRef.current.setAttribute('title', savedTitleRef.current)
      }

      activeElRef.current = el
      savedTitleRef.current = el.getAttribute('title')
      el.removeAttribute('title')

      const rect = el.getBoundingClientRect()
      setTip({
        info,
        x: rect.left,
        y: rect.bottom + TIP_GAP,
        maxWidth: Math.min(320, window.innerWidth - VIEWPORT_PAD * 2),
      })
    },
    [clearTip, provider],
  )

  useEffect(() => {
    const root = wrapperRef.current
    if (!root) return

    const onPointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return
      const marked = target.closest<HTMLElement>('[data-hover-info]')
      if (!marked || !root.contains(marked)) return
      if (activeElRef.current === marked) return
      showFor(marked)
    }

    const onPointerOut = (e: PointerEvent) => {
      const related = e.relatedTarget as Node | null
      const active = activeElRef.current
      if (!active) return
      if (related && (active.contains(related) || tipRef.current?.contains(related))) return
      const leavingMarked = (e.target as HTMLElement | null)?.closest?.('[data-hover-info]')
      if (leavingMarked === active && (!related || !active.contains(related))) {
        clearTip()
      }
    }

    const onScroll = () => clearTip()
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') clearTip()
    }

    root.addEventListener('pointerover', onPointerOver)
    root.addEventListener('pointerout', onPointerOut)
    window.addEventListener('scroll', onScroll, true)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      root.removeEventListener('pointerover', onPointerOver)
      root.removeEventListener('pointerout', onPointerOut)
      window.removeEventListener('scroll', onScroll, true)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [clearTip, showFor])

  useEffect(() => {
    if (!tip || !tipRef.current || !activeElRef.current) return
    const tipEl = tipRef.current
    const anchor = activeElRef.current.getBoundingClientRect()
    const { width, height } = tipEl.getBoundingClientRect()
    const pos = positionTip(anchor, width, height)
    tipEl.style.left = `${pos.x}px`
    tipEl.style.top = `${pos.y}px`
  }, [tip])

  return (
    <div className="hover-info-layer" ref={wrapperRef}>
      {children}
      {tip ? (
        <div
          ref={tipRef}
          className="hover-info-tooltip"
          role="tooltip"
          style={{ left: tip.x, top: tip.y, maxWidth: tip.maxWidth }}
        >
          <div className="hover-info-tooltip-title">{tip.info.title}</div>
          <div className="hover-info-tooltip-body">{tip.info.body}</div>
        </div>
      ) : null}
    </div>
  )
}
