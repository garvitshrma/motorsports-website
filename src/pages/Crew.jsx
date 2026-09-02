import PageHead from '../components/PageHead'
import { Counter, Field, Reveal } from '../components/ui'
import { coreTeam, pillars, subsystems, teamStats } from '../data/site'
import { usePageTitle } from '../lib/usePageTitle'
import './pages.css'

/**
 * The crew. The team publishes one confirmed name and three unfilled roles —
 * the roster reflects that honestly instead of padding it out.
 */
export default function Crew() {
  usePageTitle('CREW — Team Agnishul')
  const missionPillar = pillars.find((p) => p.key === 'crew')

  return (
    <>
      <PageHead
        index="02"
        kicker="TECHNICAL DIVISION"
        rail="CREW — 30+ ENGINEERS"
        title={<>THE PEOPLE<br />BEHIND IT.</>}
        lede={missionPillar?.body}
        aside={
          <ul className="phead__stats">
            {teamStats.map((s) => (
              <li key={s.label}>
                <b className="display">
                  <Counter value={s.value} suffix={s.suffix} />
                </b>
                <span className="mono-sm">{s.label}</span>
              </li>
            ))}
          </ul>
        }
      />

      <section className="sec sec--paper on-paper blueprint">
        <div className="shell">
          <div className="crew__head">
            <h2 className="display d-lg">CORE TEAM</h2>
            <span className="mono-sm">
              {String(coreTeam.length).padStart(2, '0')} POSITIONS
            </span>
          </div>

          <div className="crew__grid">
            {coreTeam.map((m, i) => (
              <Reveal key={m.no} delay={i * 0.05}>
                <article className={`crewcard slab ${m.tbc ? 'is-pending' : ''}`}>
                  {/* Portrait slot: a labelled plate until real photographs exist. */}
                  <div className="crewcard__portrait" aria-hidden="true">
                    <span className="crewcard__no display">{m.no}</span>
                    <span className="mono-sm">PORTRAIT PENDING</span>
                  </div>

                  <div className="crewcard__meta">
                    <h3 className="display d-sm">
                      <Field value={m.name} placeholder="POSITION OPEN" />
                    </h3>
                    <p className="mono-sm red">{m.role}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec--ink on-ink">
        <div className="shell">
          <div className="crew__head crew__head--ink">
            <h2 className="display d-lg">SUBSYSTEMS</h2>
            <span className="mono-sm dim">04 DIVISIONS</span>
          </div>

          <div className="subs__grid">
            {subsystems.map((s) => (
              <div className="subs__cell plate plate--flat" key={s.id}>
                <span className="subs__id mono-sm">{s.id}</span>
                <span className="subs__name">
                  <Field value={s.name} placeholder="AWAITING NAME" />
                </span>
              </div>
            ))}
          </div>

          <p className="body crew__note">
            The team publishes a count of four subsystems but has not yet named them. The slots
            above are structural — fill them in <code>src/data/site.js</code>.
          </p>
        </div>
      </section>
    </>
  )
}
