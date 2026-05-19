import { useCallback, type KeyboardEvent, type ReactNode } from 'react'

export interface DialogProps {
  open: boolean
  onClose: () => void
  backdropClassName: string
  panelClassName: string
  ariaLabel?: string
  ariaLabelledBy?: string
  ariaDescribedBy?: string
  children: ReactNode
}

export function Dialog({
  open,
  onClose,
  backdropClassName,
  panelClassName,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  children,
}: DialogProps) {
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    },
    [onClose],
  )

  if (!open) return null

  return (
    <div className={backdropClassName} role="presentation" onClick={onClose} onKeyDown={onKeyDown}>
      <div
        className={panelClassName}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
