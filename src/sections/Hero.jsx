import { useRef } from 'react'
import { Link } from 'react-router-dom'
import CarStage from '../components/CarStage'
import { Rail } from '../components/ui'
import { team } from '../data/site'
import './Hero.css'

/**
 * The first viewport.
 *
 * Three stacked planes, back to front:
 *   1. the outlined AGNISHUL wordmark, oversized and clipped by the viewport
 *   2. the vehicle, breaking the right edge of the layout
 *   3. the copy block and technical annotations
 *
 * Nothing here is centred. The car overlaps the type on purpose.
 */
export default function Hero() {
  const hero = useRef(null)

  return (
    <section className="hero blueprint" ref={hero} id="hero">
      <Rail side="left">UNIT 01 — VEHICLE DEVELOPMENT</Rail>

      {/* plane 1 — the ghost wordmark */}
      <div className="hero__ghost" aria-hidden="true">
        <span className="display d-outline">AGNISHUL</span>
      </div>

      {/* plane 2 — the vehicle */}
      <div className="hero__stage">
        <CarStage progressTargetRef={hero} />
      </div>

      {/* plane 3 — copy */}
      <div className="hero__copy">
        <p className="eyebrow">{team.org}</p>

        <h1 className="hero__head display">
          <span>DESIGN.</span>
          <span>BUILD.</span>
          <span className="hero__head-race">
            RACE.
            <i className="hero__head-bar" aria-hidden="true" />
          </span>
        </h1>

        <p className="hero__lede body-lg">
          The student motorsports team of IIT Bhilai. We design, build and race formula-style
          vehicles — from internal combustion beginnings to electric powertrains.
        </p>

        <div className="hero__actions">
          <Link to="/cars" className="btn btn--red">
            VIEW THE VEHICLES <span className="btn__arrow">→</span>
          </Link>
          <Link to="/contact" className="btn btn--onink">
            JOIN THE TEAM
          </Link>
        </div>
      </div>

      {/* annotations pinned to the right, reading like margin notes on a drawing */}
      <aside className="hero__annot" aria-hidden="true">
        <p className="mono-sm">
          <i className="hero__annot-dot" />
          {team.tagline}
        </p>
        <p className="mono-sm">{team.locale}</p>
        <p className="mono-sm">R&amp;D / TECHNICAL DIVISION</p>
      </aside>

      {/* bottom data strip — only figures the team actually publishes */}
      <div className="hero__strip">
        <Fact k="SUBSYSTEMS" v="04" />
        <Fact k="ENGINEERS" v="30+" />
        <Fact k="VEHICLES" v="03" />
        <Fact k="ESTABLISHED" v={team.founded} accent />
        <div className="hero__scroll mono-sm">
          <span>SCROLL</span>
          <i />
        </div>
      </div>
    </section>
  )
}

function Fact({ k, v, accent = false }) {
  return (
    <div className={`fact ${accent ? 'fact--accent' : ''}`}>
      <b className="display">{v}</b>
      <span className="mono-sm">{k}</span>
    </div>
  )
}
