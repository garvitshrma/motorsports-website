import { Link } from 'react-router-dom'
import { Reveal, SectionHead } from '../components/ui'
import { pillars } from '../data/site'

/**
 * The three pillars the team publishes — cars, crew, mission.
 * Laid out as three slabs of deliberately unequal width and vertical offset,
 * so the block reads as a composition rather than a card grid.
 */
export default function About() {
  return (
    <section className="sec sec--paper on-paper blueprint" id="about">
      <div className="shell">
        <SectionHead index="01" total="02" kicker="WHO WE ARE" title="WHAT WE DO." />

        <div className="about__grid">
          {pillars.map((p, i) => (
            <Reveal key={p.key} delay={i * 0.07} className={`about__cell about__cell--${i + 1}`}>
              <article className="pillar slab">
                <div className="pillar__top">
                  <span className="pillar__idx display">{p.index}</span>
                  <h3 className="pillar__label mono">{p.label}</h3>
                </div>
                <p className="pillar__body body">{p.body}</p>
                <Link to={p.to} className="pillar__cta mono">
                  {p.cta} <span className="btn__arrow">→</span>
                </Link>
              </article>
            </Reveal>
          ))}

        </div>
      </div>
    </section>
  )
}
