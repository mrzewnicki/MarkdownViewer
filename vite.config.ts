import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub project Pages need base /<repo>/ (see .github/workflows/deploy-github-pages.yml).
// Empty string must fall back to '/' — `??` alone would keep '' and break asset URLs.
const pagesBase = process.env.VITE_PAGES_BASE?.trim()
const base = pagesBase && pagesBase !== '/' ? pagesBase.replace(/\/?$/, '/') : '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
})
