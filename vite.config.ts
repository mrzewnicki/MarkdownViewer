import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// GitHub project Pages need base /<repo>/ (see .github/workflows/deploy-github-pages.yml).
// Empty string must fall back to '/' — `??` alone would keep '' and break asset URLs.
const pagesBase = process.env.VITE_PAGES_BASE?.trim()
const base = pagesBase && pagesBase !== '/' ? pagesBase.replace(/\/?$/, '/') : '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // Service worker handles all navigation requests to serve the SPA shell.
      injectRegister: 'auto',
      workbox: {
        // Always revalidate the HTML shell — never serve it from SW cache without checking.
        navigateFallback: 'index.html',
        navigateFallbackDenylist: [/\/assets\//],
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /\/index\.html$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-cache',
              networkTimeoutSeconds: 3,
            },
          },
        ],
      },
      manifest: {
        name: 'MarkdownViewer',
        short_name: 'MDViewer',
        description: 'RPG Markdown notes viewer',
        theme_color: '#1a1a2e',
        background_color: '#1a1a2e',
        display: 'standalone',
        icons: [
          { src: 'pwa-64x64.png', sizes: '64x64', type: 'image/png' },
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
})
