import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import PageTransition from './components/PageTransition'
import IntroOverlay from './components/IntroOverlay'
import Home from './pages/Home'
import LessonDetail from './pages/LessonDetail'
import lessons from './data/lessons'

function AppContent() {
  const [showIntro, setShowIntro] = useState<boolean>(false)
  const location = useLocation()

  useEffect(() => {
    const skipped = localStorage.getItem('english-tenses-intro-skipped')
    if (!skipped) {
      setShowIntro(true)
    }
  }, [])

  const closeIntro = () => {
    localStorage.setItem('english-tenses-intro-skipped', 'true')
    setShowIntro(false)
  }

  return (
    <div className="min-h-screen bg-canvas dark:bg-[#0D0D0D]">
      {showIntro && (
        <IntroOverlay lessons={lessons} onClose={closeIntro} />
      )}
      <Header />
      <PageTransition key={location.pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lesson/:slug" element={<LessonDetail />} />
        </Routes>
      </PageTransition>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter basename="/english-tenses">
      <AppContent />
    </BrowserRouter>
  )
}
