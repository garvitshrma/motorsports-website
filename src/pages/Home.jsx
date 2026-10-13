import Hero from '../sections/Hero'
import About from '../sections/About'
import Journey from '../sections/Journey'
import RaceFlag from '../components/RaceFlag'
import { Marquee } from '../components/ui'
import { team } from '../data/site'
import { usePageTitle } from '../lib/usePageTitle'
import '../sections/sections.css'

const TICKER = ['DESIGN → BUILD → RACE', 'TEAM AGNISHUL', 'IIT BHILAI']

export default function Home() {
  usePageTitle('TEAM AGNISHUL — IIT Bhilai Motorsports')

  return (
    <>
      <Hero />

      {/* Pit-wall strip: the seam between the hero and the document. */}
      <div className="on-ink" style={{ color: 'var(--paper)' }}>
        <Marquee items={TICKER} speed={38} />
      </div>

      <section className="flagband on-ink blueprint">
        <div className="shell flagband__inner">
          <RaceFlag code="S1" label={`${team.name} · ${team.shortOrg}`} />
        </div>
      </section>

      <About />
      <Journey />
    </>
  )
}
