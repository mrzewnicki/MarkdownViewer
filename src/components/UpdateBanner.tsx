import { useRegisterSW } from 'virtual:pwa-register/react'

export function UpdateBanner() {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW()

  if (!needRefresh) return null

  return (
    <div className="update-banner" role="status" aria-live="polite">
      <span>Dostępna nowa wersja aplikacji.</span>
      <button type="button" onClick={() => updateServiceWorker(true)}>
        Odśwież
      </button>
    </div>
  )
}
