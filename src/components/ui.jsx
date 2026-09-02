import { useEffect, useRef, useState } from 'react'
import { animate, motion, useReducedMotion } from 'framer-motion'
import './ui.css'

/* -------------------------------------------------------------------------- */
/*  Reveal — the one scroll animation used across the site.                    */
/*  Blocks arrive from a single direction and stop. No stagger theatre.        */
/* -------------------------------------------------------------------------- */

export function Reveal({ children, delay = 0, y = 26, x = 0, className = '', as = 'div' }) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as] ?? motion.div

  if (reduced) return <div className={className}>{children}</div>

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}

/* -------------------------------------------------------------------------- */
/*  Counter — counts once, on entry. Only used where a number means something. */
/* -------------------------------------------------------------------------- */

export function Counter({ value, suffix = '', duration = 1.1 }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const [shown, setShown] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el || value == null) return

    if (reduced) {
      setShown(value)
      return
    }

    let controls
    const start = () => {
      controls = animate(0, value, {
        duration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => setShown(Math.round(v)),
      })
    }

    // Counters above the fold should not wait on an observer callback.
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      start()
      return () => controls?.stop()
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect() // count once
        start()
      },
      { threshold: 0.1 }
    )
    io.observe(el)

    return () => {
      io.disconnect()
      controls?.stop()
    }
  }, [value, duration, reduced])

  return (
    <span ref={ref}>
      {value == null ? '—' : shown}
      {value == null ? '' : suffix}
    </span>
  )
}

/* -------------------------------------------------------------------------- */
/*  SectionHead — every section is indexed like a document chapter.            */
/* -------------------------------------------------------------------------- */

export function SectionHead({ index, total, kicker, title, children }) {
  return (
    <header className="sechead">
      <div>
        {kicker && <p className="eyebrow">{kicker}</p>}
        <h2 className="display d-lg sechead__title">{title}</h2>
        {children}
      </div>
      <div className="sechead__idx">
        {index} / {total}
      </div>
    </header>
  )
}

/* -------------------------------------------------------------------------- */
/*  Marquee — a pit-wall information strip.                                    */
/* -------------------------------------------------------------------------- */

export function Marquee({ items, speed = 34, className = '' }) {
  const reduced = useReducedMotion()
  const run = [...items, ...items]

  return (
    <div className={`marquee ${className}`}>
      <div
        className="marquee__track"
        style={
          reduced
            ? { animation: 'none', transform: 'none' }
            : { animationDuration: `${speed}s` }
        }
      >
        {run.map((item, i) => (
          <span className="marquee__item mono" key={i} aria-hidden={i >= items.length}>
            {item}
            <i className="marquee__sep" />
          </span>
        ))}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Rail — the vertical technical label pinned to a section edge.              */
/* -------------------------------------------------------------------------- */

export function Rail({ children, side = 'left' }) {
  return (
    <div className={`rail rail--${side}`} aria-hidden="true">
      <span className="rail__text mono-sm">{children}</span>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  TBC — visible marker for data the team has not published yet.              */
/* -------------------------------------------------------------------------- */

export function Tbc({ label = 'TBC' }) {
  return (
    <span className="tbc" title="Awaiting confirmed data from the team">
      {label}
    </span>
  )
}

/** Renders a value, or a clearly identifiable blank if it has not been filled in. */
export function Field({ value, placeholder = 'NOT PUBLISHED' }) {
  if (value) return <>{value}</>
  return (
    <span className="field-empty">
      {placeholder}
      <Tbc />
    </span>
  )
}
