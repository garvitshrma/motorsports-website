import Hero from '../sections/Hero'
import About from '../sections/About'
import Engineering from '../sections/Engineering'
import Journey from '../sections/Journey'
import Achievements from '../sections/Achievements'
import PartnersStrip from '../sections/PartnersStrip'
import Join from '../sections/Join'
import { Marquee } from '../components/ui'
import { usePageTitle } from '../lib/usePageTitle'
import '../sections/sections.css'

const TICKER = [
  'DESIGN → BUILD → TEST → RACE',
  'TEAM AGNISHUL',
  'IIT BHILAI MOTORSPORTS',
  'BHILAI / INDIA',
  'VEHICLE DEVELOPMENT',
  'EST. 2010',
]

export default function Home() {
  usePageTitle('TEAM AGNISHUL — IIT Bhilai Motorsports')

  return (
    <>
      <Hero />

      {/* Pit-wall strip: the seam between the hero and the document. */}
      <div className="on-ink" style={{ color: 'var(--paper)' }}>
        <Marquee items={TICKER} speed={38} />
      </div>

      <About />
      <Engineering />
      <Journey />
      <Achievements />
      <PartnersStrip />
      <Join />
    </>
  )
}
