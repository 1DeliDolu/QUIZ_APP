import './App.css'
import { Route, Routes } from 'react-router-dom'
import CmsPage from './pages/CmsPage'
import SectionPage from './pages/SectionPage'
import LoginPage from './pages/Auth/LoginPage'
import RegisterPage from './pages/Auth/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import DebugPage from './pages/DebugPage'
import QuizTestPage from './pages/QuizTestPage'
import AuthTestPage from './pages/AuthTestPage'
import { AppLayout } from './components/AppLayout'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      <AppLayout>
        <Routes>
          <Route path="/" element={<SectionPage title="Einführung" />} />
          <Route path="/einfuehrung-in-diesen-lehrplan" element={<SectionPage title="Einführung in diesen Lehrplan" />} />
          <Route path="/grundlagen-des-testens" element={<SectionPage title="Grundlagen des Testens" />} />
          <Route path="/softwareentwicklungslebenszyklus" element={<SectionPage title="Softwareentwicklungslebenszyklus" />} />
          <Route path="/statischer-test" element={<SectionPage title="Statischer Test" />} />
          <Route path="/management-der-testaktivitaete" element={<SectionPage title="Management der Testaktivitäte" />} />
          <Route path="/risikomanagement" element={<SectionPage title="Risikomanagement" />} />
          <Route path="/testueberwachung-teststeuerung-und-testabschluss" element={<SectionPage title="Testüberwachung, Teststeuerung und Testabschluss" />} />
          <Route path="/testwerkzeuge" element={<SectionPage title="Testwerkzeuge" />} />
          <Route path="/udemy" element={<SectionPage title="Udemy" />} />
          <Route path="/cms" element={<CmsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profil" element={<ProfilePage />} />
          <Route path="/debug" element={<DebugPage />} />
          <Route path="/quiz-test" element={<QuizTestPage />} />
          <Route path="/auth-test" element={<AuthTestPage />} />
        </Routes>
      </AppLayout>
    </AuthProvider>
  )
}

export default App
