import type { RpgRendererConfig } from '../types'

function resolveIcon(iconKey: string | undefined, cfg: RpgRendererConfig, fallback: string): string {
  if (!iconKey) return fallback
  return cfg.icons[iconKey] ?? iconKey ?? fallback
}

export function resolveEntityLabel(type: string, cfg: RpgRendererConfig): string {
  return cfg.entityTypes[type]?.label ?? type
}

export function resolveEntityIcon(type: string, cfg: RpgRendererConfig, fallback = ''): string {
  return resolveIcon(cfg.entityTypes[type]?.icon, cfg, fallback)
}

export function resolveCalloutLabel(type: string, cfg: RpgRendererConfig): string {
  return cfg.calloutTypes[type]?.label ?? type
}

export function resolveCalloutIcon(type: string, cfg: RpgRendererConfig, fallback = ''): string {
  return resolveIcon(cfg.calloutTypes[type]?.icon, cfg, fallback)
}
