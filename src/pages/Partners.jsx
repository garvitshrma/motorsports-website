import { Link } from 'react-router-dom'
import PageHead from '../components/PageHead'
import { Reveal } from '../components/ui'
import { sponsorTiers, sponsorsArePlaceholder } from '../data/site'
import { usePageTitle } from '../lib/usePageTitle'
import './pages.css'

/**
 * Partners, grouped by tier. Tier weight is expressed through plate size —
 * title sponsors get the full-width slabs, supporting sponsors a dense strip.
 */
export default function Partners() {
  usePageTitle('SPONSORS — Team Agnishul')
  const total = sponsorTiers.reduce((n, t) => n + t.sponsors.length, 0)

  return (
    <>
      <PageHead
        index="03"
        kicker="SPONSORS"
        title="WHO BACKS US."
        lede="Our sponsors pay for the parts, the tools and the travel."
        aside={
          <ul className="phead__stats">
            <li>
              <b className="display">{total}</b>
              <span className="mono-sm">SPONSORS</span>
            </li>
          </ul>
        }
      />

      <section className="sec sec--paper on-paper">
        <div className="shell">
          {sponsorsArePlaceholder && (
            <p className="tiers__note mono-sm">SPONSOR LIST TO BE CONFIRMED</p>
          )}

          {sponsorTiers.map((tier, ti) => (
            <div className="ptier" key={tier.tier}>
              <div className="ptier__head">
                <h2 className="display d-md">{tier.tier}</h2>
              </div>

              <div className={`ptier__grid ptier__grid--${ti + 1}`}>
                {tier.sponsors.map((s, i) => (
                  <Reveal key={s.name} delay={i * 0.04}>
                    <div className="sponsor slab">
                      {/* Logo slot — a labelled plate rather than a stock mark. */}
                      <div className="sponsor__mark" aria-hidden="true">
                        LOGO
                      </div>
                      <p className="sponsor__name">{s.name}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}

          <div className="ptier__cta slab slab--ink">
            <h3 className="display d-md">SPONSOR THE TEAM.</h3>
            <Link to="/contact" className="btn btn--red">
              CONTACT US <span className="btn__arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
