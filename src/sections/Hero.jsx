import { useRef } from 'react'
import { Link } from 'react-router-dom'
import CarStage from '../components/CarStage'
import { team } from '../data/site'
import './Hero.css'

/**
 * The first viewport.
 *
 * Three stacked planes, back to front: the outlined AGNISHUL wordmark, the
 * car, then the headline. Nothing is centred and the car overlaps the type
 * on purpose.
 */
export default function Hero() {
  const hero = useRef(null)

  return (
    <section className="hero blueprint" ref={hero} id="hero">
      {/* plane 1 — the ghost wordmark */}
      <div className="hero__ghost" aria-hidden="true">
        <span className="display d-outline">AGNISHUL</span>
      </div>

      {/* plane 2 — the car */}
      <div className="hero__stage">
        <CarStage progressTargetRef={hero} />
      </div>

      {/* plane 3 — copy */}
      <div className="hero__copy">
        <p className="eyebrow">{team.name}</p>

        <h1 className="hero__head display">
          <span>DESIGN.</span>
          <span>BUILD.</span>
          <span className="hero__head-race">
            RACE.
            <i className="hero__head-bar" aria-hidden="true" />
          </span>
        </h1>

        <p className="hero__lede body-lg">
          A student team at IIT Bhilai building formula cars.
        </p>

        <div className="hero__actions">
          <Link to="/cars" className="btn btn--red">
            SEE THE CARS <span className="btn__arrow">→</span>
          </Link>
          <Link to="/contact" className="btn btn--onink">
            JOIN US
          </Link>
        </div>
      </div>

      {/* bottom strip — figures only, nothing to read */}
      <div className="hero__strip">
        <Fact k="FOUNDED" v={team.founded} />
        <Fact k="MEMBERS" v="30+" />
        <Fact k="CARS BUILT" v="03" />
        <Fact k="SUBSYSTEMS" v="04" accent />
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
