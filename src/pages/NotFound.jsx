import { Link } from 'react-router-dom'
import VehicleDrawing from '../three/VehicleDrawing'
import { usePageTitle } from '../lib/usePageTitle'
import './pages.css'

export default function NotFound() {
  usePageTitle('404 — Team Agnishul')

  return (
    <section className="nf on-ink blueprint">
      <div className="shell nf__inner">
        <p className="eyebrow">OFF TRACK</p>
        <h1 className="display nf__code">404</h1>
        <p className="body-lg nf__body">
          No route filed under this address. The car is fine — the URL is not.
        </p>
        <Link to="/" className="btn btn--red">
          RETURN TO PIT LANE <span className="btn__arrow">→</span>
        </Link>
      </div>
      <div className="nf__draw" aria-hidden="true">
        <VehicleDrawing annotated={false} />
      </div>
    </section>
  )
}
