export interface ScanOptions {
  extensions?: string[]
  ignoreFolders?: string[]
  maxDepth?: number
}

export interface RpgRendererConfig {
  version: 1
  entityTypes: Record<
    string,
    {
      label: string
      color: string
      icon?: string
    }
  >
  icons: Record<string, string>
  calloutTypes: Record<
    string,
    {
      label: string
      color: string
      icon?: string
    }
  >
  paths: {
    configDir: string
    templatesDir: string
    themesDir: string
    indexFile: string
  }
  scan: ScanOptions
  preview: {
    syncScroll: boolean
    theme: 'light' | 'dark' | 'system'
  }
  renderer: {
    wikiLinks: boolean
    highlightCode: boolean
  }
}

export const DEFAULT_RPG_CONFIG: RpgRendererConfig = {
  version: 1,
  entityTypes: {
    npc: { label: 'NPC', color: '#6366f1', icon: 'user' },
    location: { label: 'Location', color: '#0ea5e9', icon: 'map-pin' },
    faction: { label: 'Faction', color: '#a855f7', icon: 'shield' },
    item: { label: 'Item', color: '#22c55e', icon: 'package' },
    beast: { label: 'Beast', color: '#f97316', icon: 'skull' },
    rule: { label: 'Rule', color: '#eab308', icon: 'scroll' },
    zombie: { label: 'Zombie', color: '#84cc16', icon: 'biohazard' },
    mutant: { label: 'Mutant', color: '#ec4899', icon: 'atom' },
  },
  icons: {
    user: '👤',
    'map-pin': '📍',
    shield: '🛡️',
    package: '📦',
    skull: '💀',
    scroll: '📜',
    biohazard: '☣️',
    atom: '⚛️',
    info: 'ℹ️',
    alert: '⚠️',
    flame: '🔥',
    book: '📖',
    flag: '🏁',
  },
  calloutTypes: {
    info: { label: 'Info', color: '#3b82f6', icon: 'info' },
    warning: { label: 'Warning', color: '#f59e0b', icon: 'alert' },
    danger: { label: 'Danger', color: '#ef4444', icon: 'flame' },
    lore: { label: 'Lore', color: '#8b5cf6', icon: 'book' },
    rule: { label: 'Rule', color: '#eab308', icon: 'scroll' },
    npc: { label: 'NPC', color: '#6366f1', icon: 'user' },
    location: { label: 'Location', color: '#0ea5e9', icon: 'map-pin' },
    faction: { label: 'Faction', color: '#a855f7', icon: 'shield' },
    quest: { label: 'Quest', color: '#14b8a6', icon: 'flag' },
  },
  paths: {
    configDir: '.rpg-renderer',
    templatesDir: '.rpg-renderer/templates',
    themesDir: '.rpg-renderer/themes',
    indexFile: '.rpg-renderer/index.json',
  },
  scan: {
    extensions: ['md', 'markdown', 'mdx', 'png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'bmp', 'ico'],
    ignoreFolders: ['.git', 'node_modules', '.rpg-renderer'],
    maxDepth: 0,
  },
  preview: {
    syncScroll: false,
    theme: 'dark',
  },
  renderer: {
    wikiLinks: true,
    highlightCode: true,
  },
}

export interface ContentFile {
  path: string
  routePath: string
  title: string
  content: string
}

export interface FileTreeNode {
  name: string
  path: string
  kind: 'file' | 'dir'
  title?: string
  children?: FileTreeNode[]
}

export interface ProjectContent {
  id: string
  title: string
  config: RpgRendererConfig
  files: ContentFile[]
  fileMap: Map<string, ContentFile>
  routeMap: Map<string, ContentFile>
  tree: FileTreeNode[]
  assets: Map<string, string>
}
