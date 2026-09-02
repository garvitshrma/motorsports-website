import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Vehicles from './pages/Vehicles'
import Crew from './pages/Crew'
import Partners from './pages/Partners'
import Archive from './pages/Archive'
import Dispatch from './pages/Dispatch'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

/** Routed pages should start at the top, not wherever the last one was. */
function ScrollReset() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        SKIP TO CONTENT
      </a>
      <ScrollReset />
      <Navbar />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Vehicles />} />
          <Route path="/team" element={<Crew />} />
          <Route path="/sponsors" element={<Partners />} />
          <Route path="/gallery" element={<Archive />} />
          <Route path="/news" element={<Dispatch />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
