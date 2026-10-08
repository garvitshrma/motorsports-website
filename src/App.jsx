import { useCallback, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Loader from './components/Loader'
import Home from './pages/Home'
import Vehicles from './pages/Vehicles'
import Crew from './pages/Crew'
import Partners from './pages/Partners'
import Archive from './pages/Archive'
import Dispatch from './pages/Dispatch'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import './App.css'

/**
 * Wraps each routed page. Mounting is the moment the new page is actually
 * visible, so the scroll reset belongs here rather than on the location change
 * — otherwise the page would jump while the old one is still on screen.
 */
function Page({ children }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return children
}

function AnimatedRoutes() {
  const location = useLocation()
  const reduced = useReducedMotion()

  const routes = (
    <Routes location={location}>
      <Route path="/" element={<Home />} />
      <Route path="/cars" element={<Vehicles />} />
      <Route path="/team" element={<Crew />} />
      <Route path="/sponsors" element={<Partners />} />
      <Route path="/gallery" element={<Archive />} />
      <Route path="/news" element={<Dispatch />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )

  if (reduced) return <Page key={location.pathname}>{routes}</Page>

  return (
    <>
      {/* A red sweep across the top on every route change — the only chrome
          the transition needs. Re-keyed, so the animation replays. */}
      <span className="routebar" key={`bar-${location.pathname}`} aria-hidden="true" />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <Page>{routes}</Page>
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default function App() {
  const [booted, setBooted] = useState(false)
  const onDone = useCallback(() => setBooted(true), [])

  // Hold the page still behind the loading screen.
  useEffect(() => {
    document.body.style.overflow = booted ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [booted])

  return (
    <>
      {!booted && <Loader onDone={onDone} />}

      <a className="skip-link" href="#main">
        SKIP TO CONTENT
      </a>
      <Navbar />
      <main id="main">
        <AnimatedRoutes />
      </main>
      <Footer />
    </>
  )
}
