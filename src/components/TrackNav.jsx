import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { nav } from '../data/site'
import './TrackNav.css'

/**
 * The circuit. Node positions are measured off this path at runtime, so the
 * shape can be redrawn freely without recalculating anything by hand.
 */
const TRACK =
  'M 182 24 C 182 94, 116 98, 112 152 C 108 208, 186 218, 188 274 ' +
  'C 190 332, 112 342, 110 400 C 108 458, 186 468, 186 526 C 186 582, 124 592, 124 638'

const VIEW = { w: 220, h: 660 }

export default function TrackNav() {
  const pathRef = useRef(null)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [points, setPoints] = useState([])
  const [marker, setMarker] = useState(null)

  const index = Math.max(
    0,
    nav.findIndex((n) => (n.to === '/' ? pathname === '/' : pathname.startsWith(n.to)))
  )

  /*
   * Nodes are drawn inside the SVG rather than as positioned HTML on top of it.
   * An HTML overlay has to convert path coordinates into percentages of the
   * container, which only agrees with the drawing while the container's aspect
   * ratio matches the viewBox — any other shape and preserveAspectRatio scales
   * and centres the artwork, leaving the nodes floating off the track.
   */
  useLayoutEffect(() => {
    const path = pathRef.current
    if (!path) return
    const total = path.getTotalLength()
    setPoints(
      nav.map((item, i) => {
        const p = path.getPointAtLength((total * i) / (nav.length - 1))
        return { ...item, x: p.x, y: p.y }
      })
    )
  }, [])

  // The marker runs from the current node toward the next as the page scrolls,
  // so the rail doubles as a progress read-out.
  useEffect(() => {
    const path = pathRef.current
    if (!path) return

    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      const step = 1 / (nav.length - 1)
      const t = Math.min(1, index * step + scrolled * step)
      const p = path.getPointAtLength(path.getTotalLength() * t)
      setMarker({ x: p.x, y: p.y })
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [index, pathname])

  const go = (to) => (e) => {
    // Leave modified clicks alone so "open in new tab" still works.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    navigate(to)
  }

  return (
    <nav className="track" aria-label="Circuit navigation">
      <svg className="track__svg" viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}>
        <defs>
          <pattern id="track-grid" width="9" height="9" patternUnits="userSpaceOnUse">
            <rect width="9" height="9" fill="#efece4" />
            <rect width="4.5" height="4.5" fill="#0b0b0b" />
            <rect x="4.5" y="4.5" width="4.5" height="4.5" fill="#0b0b0b" />
          </pattern>
        </defs>

        <g aria-hidden="true">
          {/* verge then tarmac — two tones, so it reads as a surface not a line */}
          <path d={TRACK} className="track__verge" />
          <path d={TRACK} className="track__road" ref={pathRef} />
          <path d={TRACK} className="track__line" />
          {/* start / finish */}
          <rect x="164" y="18" width="36" height="9" fill="url(#track-grid)" />
        </g>

        {marker && (
          <g aria-hidden="true" className="track__marker">
            <circle cx={marker.x} cy={marker.y} r="11" className="track__marker-halo" />
            <circle cx={marker.x} cy={marker.y} r="5" className="track__marker-dot" />
          </g>
        )}

        {points.map((p, i) => {
          const state = i === index ? 'is-on' : i < index ? 'is-done' : ''
          return (
            <a
              key={p.to}
              href={p.to}
              onClick={go(p.to)}
              className={`track__node ${state}`}
              aria-current={i === index ? 'page' : undefined}
            >
              <text className="track__label" x={p.x - 26} y={p.y + 4} textAnchor="end">
                {p.label}
              </text>
              {i === index && <circle className="track__pulse" cx={p.x} cy={p.y} r="15" />}
              <circle className="track__disc" cx={p.x} cy={p.y} r="14" />
              <text className="track__no" x={p.x} y={p.y + 4} textAnchor="middle">
                {i + 1}
              </text>
            </a>
          )
        })}
      </svg>
    </nav>
  )
}
