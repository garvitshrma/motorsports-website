import { Link } from 'react-router-dom'
import { Reveal, SectionHead, Tbc } from '../components/ui'
import { sponsorTiers } from '../data/site'

/**
 * Partner acknowledgement. Names come straight from the current site, where
 * they are still template defaults — so each is marked TBC rather than
 * presented as a confirmed partnership.
 */
export default function PartnersStrip() {
  const total = sponsorTiers.reduce((n, t) => n + t.sponsors.length, 0)

  return (
    <section className="sec sec--paper on-paper" id="partners">
      <div className="shell">
        <SectionHead index="05" total="06" kicker="SUPPORT" title="WHO BACKS THE BUILD.">
          <p className="body" style={{ marginTop: 16 }}>
            {total} organisations listed across three tiers.
          </p>
        </SectionHead>

        <div className="tiers">
          {sponsorTiers.map((tier, i) => (
            <Reveal key={tier.code} delay={i * 0.06} className="tier">
              <div className="tier__label">
                <span className="tag tag--red">{tier.code}</span>
                <h3 className="mono">{tier.tier}</h3>
              </div>
              <ul className="tier__list">
                {tier.sponsors.map((s) => (
                  <li className="tier__item" key={s.name}>
                    <span>{s.name}</span>
                    {s.tbc && <Tbc />}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Link to="/sponsors" className="btn tiers__cta">
          PARTNERSHIP DETAILS <span className="btn__arrow">→</span>
        </Link>
      </div>
    </section>
  )
}
