import { useEffect, useRef } from 'react'
import VehicleDrawing from './VehicleDrawing'
import './CarStage.css'

/**
 * The hero vehicle: a technical side elevation, parallaxed against the
 * headline.
 *
 * This used to host a WebGL scene rendering a .glb. The 3D car has been
 * removed, so the drawing — previously the fallback — is now the hero graphic
 * outright. It keeps the same stage box and the same restrained motion, so the
 * composition around it is unchanged.
 *
 * Pointer and scroll are written to CSS custom properties rather than React
 * state, so neither ever triggers a re-render.
 */
export default function CarStage({ progressTargetRef }) {
  const wrap = useRef(null)

  useEffect(() => {
    const el = wrap.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const target = progressTargetRef?.current ?? el
    let frame = 0
    const state = { px: 0, py: 0 }

    const paint = () => {
      frame = 0
      const rect = target.getBoundingClientRect()
      const span = rect.height || 1
      // 0 while the hero is in place, 1 once it has scrolled away.
      const p = Math.min(1, Math.max(0, -rect.top / span))
      el.style.setProperty('--px', state.px.toFixed(3))
      el.style.setProperty('--py', state.py.toFixed(3))
      el.style.setProperty('--sp', p.toFixed(3))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint)
    }

    const onMove = (e) => {
      state.px = (e.clientX / window.innerWidth) * 2 - 1
      state.py = (e.clientY / window.innerHeight) * 2 - 1
      schedule()
    }

    paint()
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [progressTargetRef])

  return (
    <div className="stage" ref={wrap} aria-hidden="true">
      <div className="stage__art">
        <VehicleDrawing />
      </div>
    </div>
  )
}
