import { Link } from 'react-router-dom'
import { Reveal, SectionHead } from '../components/ui'
import { sponsorTiers, sponsorsArePlaceholder } from '../data/site'

/**
 * Partner acknowledgement. Names come straight from the current site, where
 * they are still template defaults — so each is marked TBC rather than
 * presented as a confirmed partnership.
 */
export default function PartnersStrip() {
  return (
    <section className="sec sec--paper on-paper" id="partners">
      <div className="shell">
        <SectionHead index="05" total="05" kicker="SPONSORS" title="WHO BACKS US." />

        <div className="tiers">
          {sponsorTiers.map((tier, i) => (
            <Reveal key={tier.tier} delay={i * 0.06} className="tier">
              <div className="tier__label">
                <h3 className="mono">{tier.tier}</h3>
              </div>
              <ul className="tier__list">
                {tier.sponsors.map((s) => (
                  <li className="tier__item" key={s.name}>
                    {s.name}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        {sponsorsArePlaceholder && (
          <p className="tiers__note mono-sm">SPONSOR LIST TO BE CONFIRMED</p>
        )}

        <Link to="/sponsors" className="btn tiers__cta">
          SPONSOR US <span className="btn__arrow">→</span>
        </Link>
      </div>
    </section>
  )
}
