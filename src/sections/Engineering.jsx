import { Reveal, SectionHead, Tbc } from '../components/ui'
import { cycle, subsystems } from '../data/site'

/**
 * The development cycle. This is the section that explains *how* the team
 * works, so it is built as a numbered process band rather than cards —
 * closer to a procedure sheet than a feature list.
 */
export default function Engineering() {
  return (
    <section className="sec sec--ink on-ink blueprint" id="engineering">
      <div className="shell">
        <SectionHead
          index="02"
          total="06"
          kicker="R&D / PROCESS"
          title={<>THE LOOP<br />NEVER CLOSES.</>}
        />

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

        {/* Subsystems: the team publishes the count, not the names. The slots
            exist and are visibly unfilled rather than invented. */}
        <div className="subs">
          <div className="subs__head">
            <h3 className="mono">SUBSYSTEM BREAKDOWN</h3>
            <span className="mono-sm dim">04 DIVISIONS</span>
          </div>
          <div className="subs__grid">
            {subsystems.map((s) => (
              <div className="subs__cell plate plate--flat" key={s.id}>
                <span className="subs__id mono-sm">{s.id}</span>
                <span className="subs__name">
                  {s.name ?? (
                    <>
                      <span className="field-empty">AWAITING NAME</span>
                      <Tbc />
                    </>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
