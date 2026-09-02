import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { contact, nav, team } from '../data/site'
import { Tbc } from './ui'
import './Footer.css'

/** Local time readout — the one live number on the page. */
function Clock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const time = now.toLocaleTimeString('en-GB', { hour12: false })
  const date = now
    .toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })
    .toUpperCase()

  return (
    <div className="clock">
      <span className="clock__time display">{time}</span>
      <span className="mono-sm">{date} — LOCAL</span>
    </div>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="foot on-ink">
      <div className="foot__ruler ruler ruler--tall" aria-hidden="true" />

      <div className="shell foot__grid">
        <div className="foot__brand">
          <h2 className="display d-md">{team.name}</h2>
          <p className="body foot__blurb">{team.blurb}</p>
          <Clock />
        </div>

        <nav className="foot__col" aria-label="Footer">
          <h3 className="foot__h mono-sm">INDEX</h3>
          <ul>
            {nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="foot__link">
                  <i className="mono-sm">{item.no}</i> {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="foot__col">
          <h3 className="foot__h mono-sm">LOCATION</h3>
          <address className="foot__addr">
            {contact.address.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </address>

          <h3 className="foot__h mono-sm" style={{ marginTop: 26 }}>
            CONTACT
          </h3>
          <p className="foot__addr">
            <span>
              {contact.emailTeam.value}
              {contact.emailTeam.tbc && <Tbc />}
            </span>
            <span>
              {contact.phone.value}
              {contact.phone.tbc && <Tbc />}
            </span>
          </p>
        </div>

        <div className="foot__col">
          <h3 className="foot__h mono-sm">CHANNELS</h3>
          <ul className="foot__socials">
            {contact.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  className={`foot__social ${s.tbc ? 'is-pending' : ''}`}
                  aria-disabled={s.tbc || undefined}
                  title={s.tbc ? 'Handle not published yet' : s.label}
                >
                  <b className="mono-sm">{s.short}</b>
                  <span className="mono-sm">{s.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="foot__bar">
        <span className="mono-sm">
          © {year} {team.name} — {team.org}
        </span>
        <span className="mono-sm foot__bar-right">
          {team.locale} <i /> DESIGN → BUILD → TEST → RACE
        </span>
      </div>
    </footer>
  )
}
