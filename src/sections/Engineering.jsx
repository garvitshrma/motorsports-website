import { Reveal, SectionHead } from '../components/ui'
import { cycle } from '../data/site'

/**
 * The development cycle. This is the section that explains *how* the team
 * works, so it is built as a numbered process band rather than cards —
 * closer to a procedure sheet than a feature list.
 */
export default function Engineering() {
  return (
    <section className="sec sec--ink on-ink blueprint" id="engineering">
      <div className="shell">
        <SectionHead index="02" total="05" kicker="HOW WE WORK" title="FOUR STEPS." />

        <div className="cycle">
          {cycle.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.06} className="cycle__step">
              <div className="cycle__bar" aria-hidden="true">
                <i style={{ width: `${((i + 1) / cycle.length) * 100}%` }} />
              </div>
              <span className="cycle__no mono-sm">STEP {s.step}</span>
              <h3 className="cycle__name display d-md">{s.name}</h3>
              <p className="cycle__body body">{s.body}</p>
              {i < cycle.length - 1 && (
                <span className="cycle__arrow" aria-hidden="true">
                  →
                </span>
              )}
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}
