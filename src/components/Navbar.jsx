import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { nav, team } from '../data/site'
import './Navbar.css'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])

  // Lock the page behind the mobile panel.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      {/* Thin operations strip above the bar — the site's standing header. */}
      <div className="opstrip">
        <span className="mono-sm">DESIGN → BUILD → TEST → RACE</span>
        <span className="mono-sm opstrip__right">
          {team.locale}
        </span>
      </div>

      <header className="nav">
        {/* The lockup already carries the org name, so no wordmark beside it. */}
        <NavLink to="/" className="nav__mark" aria-label={`${team.org} — home`}>
          <img className="nav__logo" src={team.logo} alt={team.org} width="1200" height="344" />
        </NavLink>

        <nav className="nav__links" aria-label="Primary">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}
            >
              <i className="nav__no mono-sm">{item.no}</i>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <NavLink to="/contact" className="nav__cta mono-sm">
          JOIN THE TEAM
        </NavLink>

        <button
          className="nav__burger"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <span className={`nav__burger-box ${open ? 'is-open' : ''}`}>
            <i />
            <i />
            <i />
          </span>
        </button>
      </header>

      {/* Mobile: a full-bleed index sheet, not a shrunken desktop bar. */}
      <div className={`sheet ${open ? 'is-open' : ''}`} role="dialog" aria-modal="true" aria-hidden={!open}>
        <div className="sheet__head">
          <span className="mono-sm">INDEX / NAVIGATION</span>
          <span className="mono-sm red">{String(nav.length).padStart(2, '0')} ROUTES</span>
        </div>
        <ul className="sheet__list">
          {nav.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `sheet__link ${isActive ? 'is-active' : ''}`}
                tabIndex={open ? 0 : -1}
              >
                <i className="mono-sm">{item.no}</i>
                <span className="display d-md">{item.label}</span>
                <b>→</b>
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="sheet__foot">
          <span className="mono-sm">{team.locale}</span>
          <span className="mono-sm">EST. {team.founded}</span>
        </div>
      </div>
    </>
  )
}
