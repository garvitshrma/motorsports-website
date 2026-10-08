import { useEffect, useRef, useState } from 'react'
import { team } from '../data/site'
import { subscribe } from '../lib/boot'
import './Loader.css'

/** Shortest time the screen stays up, so it never flashes. */
const MIN_MS = 1600
/**
 * Longest it will ever hold the page. The car model can be large; past this
 * point the site is shown and the car arrives on its own in the hero.
 */
const MAX_MS = 5000

export default function Loader({ onDone }) {
  const [pct, setPct] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const startedAt = useRef(performance.now())

  useEffect(() => {
    let asset = 0
    let expects = null
    let finished = false
    let shown = 0 // high-water mark: the bar must never run backwards

    const unsub = subscribe((s) => {
      asset = s.assetProgress
      expects = s.expectsAssets
    })

    const windowLoaded = () => document.readyState === 'complete'

    const finish = () => {
      if (finished) return
      finished = true
      setPct(100)
      setLeaving(true)
      // Let the exit animation play before the hero takes over.
      setTimeout(onDone, 760)
    }

    const tick = () => {
      if (finished) return
      const elapsed = performance.now() - startedAt.current

      // A floor that always creeps forward, so the bar never looks stuck while
      // a big download is still negotiating.
      const floor = Math.min(92, (elapsed / MAX_MS) * 100)

      // Real signal: the document itself, plus the 3D asset when there is one.
      const docPart = windowLoaded() ? 100 : 55
      const real = expects === false ? docPart : Math.min(docPart, asset)

      // Everything may already be cached, in which case `real` is 100 on the
      // first tick. Cap by elapsed time so the number always counts up instead
      // of snapping, and so it can never reach 100 before MIN_MS.
      const ceiling = (elapsed / MIN_MS) * 100

      const value = Math.min(Math.max(floor, real), ceiling)
      // Monotonic, whatever the inputs do. `docPart` stepping 55 -> 100 and the
      // asset loader re-baselining both make `value` jumpy on its own.
      shown = Math.max(shown, Math.max(0, Math.min(100, value)))
      setPct(Math.round(shown))

      const ready =
        elapsed >= MIN_MS && (elapsed >= MAX_MS || (windowLoaded() && (expects === false || asset >= 100)))

      if (ready) finish()
    }

    /*
     * An interval rather than requestAnimationFrame: rAF is paused entirely
     * while the tab is in the background, which would leave someone who opened
     * the site in a background tab staring at a frozen loading screen when
     * they came back. Intervals still fire (throttled) when hidden, and the
     * timeout below is an absolute backstop either way.
     */
    const id = setInterval(tick, 60)
    const backstop = setTimeout(finish, MAX_MS + 250)
    tick()

    return () => {
      clearInterval(id)
      clearTimeout(backstop)
      unsub()
    }
  }, [onDone])

  return (
    <div className={`loader ${leaving ? 'is-leaving' : ''}`} role="status" aria-live="polite">
      {/* Four shutters that lift away like a garage door. */}
      <div className="loader__shutters" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>

      <div className="loader__inner">
        <div className="loader__stage">
          {/* Speed lines running under the car, so it reads as moving. */}
          <div className="loader__streaks" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </div>

          {/*
            The mark is assembled from three pieces: the logo with its wheels
            lifted out, plus each wheel as its own sprite so it can spin. The
            shade on top dims whatever has not loaded yet, so the logo lights
            up left to right as progress comes in.
          */}
          <div className="loader__logo">
            <img className="loader__logo-img" src={team.logoBase} alt={`${team.org} — loading`} />

            {team.logoWheels.map((w) => (
              <img
                key={w.src}
                className="loader__wheel"
                src={w.src}
                alt=""
                aria-hidden="true"
                style={{ left: `${w.left}%`, top: `${w.top}%`, width: `${w.width}%` }}
              />
            ))}

            <div
              className={`loader__shade ${pct >= 100 ? 'is-clear' : ''}`}
              style={{ left: `${pct}%` }}
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="loader__bar">
          <i style={{ transform: `scaleX(${pct / 100})` }} />
        </div>

        <div className="loader__foot">
          <span className="mono-sm">DESIGN → BUILD → TEST → RACE</span>
          <span className="loader__pct mono-sm">{String(pct).padStart(3, '0')}</span>
        </div>
      </div>
    </div>
  )
}
