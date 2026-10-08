import { Link } from 'react-router-dom'
import { contact, nav, team } from '../data/site'
import { Tbc } from './ui'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="foot on-ink">
      <div className="foot__ruler ruler ruler--tall" aria-hidden="true" />

      <div className="shell foot__grid">
        <div className="foot__brand">
          <h2 className="display d-md">{team.name}</h2>
          <p className="body foot__blurb">{team.blurb}</p>
        </div>

        <nav className="foot__col" aria-label="Footer">
          <h3 className="foot__h mono-sm">PAGES</h3>
          <ul>
            {nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="foot__link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="foot__col">
          <h3 className="foot__h mono-sm">FIND US</h3>
          <address className="foot__addr">
            {contact.address.map((line) => (
              <span key={line}>{line}</span>
            ))}
            <span>
              {contact.emailTeam.value}
              {contact.emailTeam.tbc && <Tbc />}
            </span>
          </address>

          <ul className="foot__socials">
            {contact.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  className={`foot__social ${s.tbc ? 'is-pending' : ''}`}
                  title={s.tbc ? 'Handle not published yet' : s.label}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="foot__bar">
        <span className="mono-sm">
          © {year} {team.name}
        </span>
        <span className="mono-sm">{team.locale}</span>
      </div>
    </footer>
  )
}
