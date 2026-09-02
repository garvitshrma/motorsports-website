import { Link } from 'react-router-dom'
import { Reveal, SectionHead } from '../components/ui'
import { news } from '../data/site'

/**
 * Latest dispatches. A ruled index, not a card grid — each row behaves like
 * a line in a results sheet.
 */
export default function Achievements() {
  return (
    <section className="sec sec--ink on-ink" id="dispatch">
      <div className="shell">
        <SectionHead index="04" total="06" kicker="DISPATCH" title="FROM THE GARAGE." />

        <ul className="log">
          {news.map((item, i) => (
            <li key={item.no}>
              <Reveal delay={i * 0.05}>
                <Link to="/news" className="log__row">
                  <span className="log__no mono-sm">{item.no}</span>
                  <span className="log__date mono-sm">{item.date}</span>
                  <span className="tag tag--ghost log__tag">{item.tag}</span>
                  <h3 className="log__title display d-sm">{item.title}</h3>
                  <p className="log__body body">{item.body}</p>
                  <span className="log__go" aria-hidden="true">
                    →
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        <Link to="/news" className="btn btn--onink log__all">
          ALL DISPATCHES <span className="btn__arrow">→</span>
        </Link>
      </div>
    </section>
  )
}
