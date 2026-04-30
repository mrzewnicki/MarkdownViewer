import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { UpdateBanner } from './components/UpdateBanner'
import { getProject } from './content-loader'
import { DocumentPage } from './pages/DocumentPage'
import { HomePage } from './pages/HomePage'

function RoutedLayout() {
  const location = useLocation()
  const projectId = location.pathname.split('/').filter(Boolean)[0]
  const activeProject = getProject(projectId)

  return (
    <AppLayout activeProject={activeProject}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:project/*" element={<DocumentPage />} />
      </Routes>
    </AppLayout>
  )
}

function App() {
  return (
    <>
      <UpdateBanner />
      <HashRouter>
        <Routes>
          <Route path="/*" element={<RoutedLayout />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
