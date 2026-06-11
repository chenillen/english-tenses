import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import PageTransition from './components/PageTransition'
import Home from './pages/Home'
import LessonDetail from './pages/LessonDetail'

export default function App() {
  return (
    <BrowserRouter basename="/english-tenses">
      <div className="min-h-screen bg-white dark:bg-zinc-950">
        <Header />
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lesson/:slug" element={<LessonDetail />} />
          </Routes>
        </PageTransition>
      </div>
    </BrowserRouter>
  )
}
