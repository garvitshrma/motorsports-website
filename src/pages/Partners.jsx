import { Link } from 'react-router-dom'
import PageHead from '../components/PageHead'
import { Reveal, Tbc } from '../components/ui'
import { sponsorTiers } from '../data/site'
import { usePageTitle } from '../lib/usePageTitle'
import './pages.css'

/**
 * Partners, grouped by tier. Tier weight is expressed through plate size —
 * title sponsors get the full-width slabs, supporting sponsors a dense strip.
 */
export default function Partners() {
  usePageTitle('PARTNERS — Team Agnishul')
  const total = sponsorTiers.reduce((n, t) => n + t.sponsors.length, 0)

  return (
    <>
      <PageHead
        index="03"
        kicker="SUPPORT STRUCTURE"
        rail="PARTNERS / PROCUREMENT"
        title={<>NOTHING GETS<br />BUILT ALONE.</>}
        lede="Together, we push the boundaries of motorsports engineering. Our sponsors provide the foundation for innovation and championship-winning performance."
        aside={
          <ul className="phead__stats">
            <li>
              <b className="display">{total}</b>
              <span className="mono-sm">ORGANISATIONS</span>
            </li>
            <li>
              <b className="display">{sponsorTiers.length}</b>
              <span className="mono-sm">TIERS</span>
            </li>
          </ul>
        }
      />

      <section className="sec sec--paper on-paper">
        <div className="shell">
          {sponsorTiers.map((tier, ti) => (
            <div className="ptier" key={tier.code}>
              <div className="ptier__head">
                <span className="tag tag--red">{tier.code}</span>
                <h2 className="display d-md">{tier.tier}</h2>
                <span className="mono-sm dim">
                  {String(tier.sponsors.length).padStart(2, '0')} LISTED
                </span>
              </div>

              <div className={`ptier__grid ptier__grid--${ti + 1}`}>
                {tier.sponsors.map((s, i) => (
                  <Reveal key={s.name} delay={i * 0.04}>
                    <div className="sponsor slab">
                      {/* Logo slot — a labelled plate rather than a stock mark. */}
                      <div className="sponsor__mark" aria-hidden="true">
                        LOGO
                      </div>
                      <p className="sponsor__name">
                        {s.name}
                        {s.tbc && <Tbc />}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}

          <div className="ptier__cta slab slab--ink">
            <div>
              <h3 className="display d-md">BACK THE BUILD.</h3>
              <p className="body" style={{ color: 'var(--grey-l)', marginTop: 12 }}>
                Sponsorship keeps the workshop running. Talk to us about partnering with the team.
              </p>
            </div>
            <Link to="/contact" className="btn btn--red">
              CONTACT US <span className="btn__arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
