import { Link } from 'react-router-dom'
import { Counter } from '../components/ui'
import { teamStats } from '../data/site'
import VehicleDrawing from '../three/VehicleDrawing'

/**
 * Recruitment. The closing statement of the page, so it gets the largest type
 * on the site after the hero and the only full-width red block.
 */
export default function Join() {
  return (
    <section className="sec sec--join on-ink" id="join">
      {/* The elevation drawing runs behind the type as a watermark. */}
      <div className="join__draw" aria-hidden="true">
        <VehicleDrawing annotated={false} />
      </div>

      <div className="shell join__inner">
        <p className="eyebrow">06 / 06 — RECRUITMENT</p>

        <h2 className="join__head display">
          ENGINEERED
          <br />
          <span className="d-outline">TO COMPETE.</span>
        </h2>

        <div className="join__grid">
          <p className="body-lg">
            Mechanical, electrical and software. If you want to put your name on something that
            actually gets driven, the workshop is open.
          </p>

          <ul className="join__stats">
            {teamStats.map((s) => (
              <li key={s.label}>
                <b className="display">
                  <Counter value={s.value} suffix={s.suffix} />
                </b>
                <span className="mono-sm">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="join__actions">
          <Link to="/contact" className="btn btn--red">
            GET IN TOUCH <span className="btn__arrow">→</span>
          </Link>
          <Link to="/team" className="btn btn--onink">
            MEET THE CREW
          </Link>
        </div>
      </div>
    </section>
  )
}
