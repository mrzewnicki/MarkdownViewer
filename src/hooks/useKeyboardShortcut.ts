import { useEffect } from 'react'

export interface KeyboardShortcutOptions {
  key: string
  ctrlOrMeta?: boolean
  shift?: boolean
  alt?: boolean
  enabled?: boolean
}

export function useKeyboardShortcut(
  options: KeyboardShortcutOptions,
  handler: (event: KeyboardEvent) => void,
): void {
  const { key, ctrlOrMeta = false, shift = false, alt = false, enabled = true } = options

  useEffect(() => {
    if (!enabled) return

    const onKey = (event: KeyboardEvent) => {
      if (ctrlOrMeta && !event.ctrlKey && !event.metaKey) return
      if (!ctrlOrMeta && (event.ctrlKey || event.metaKey)) return
      if (shift && !event.shiftKey) return
      if (!shift && event.shiftKey) return
      if (alt && !event.altKey) return
      if (!alt && event.altKey) return
      if (event.key.toLowerCase() !== key.toLowerCase()) return
      handler(event)
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [alt, ctrlOrMeta, enabled, handler, key, shift])
}
