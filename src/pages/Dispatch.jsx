import PageHead from '../components/PageHead'
import { Reveal } from '../components/ui'
import { news } from '../data/site'
import { usePageTitle } from '../lib/usePageTitle'
import './pages.css'

/**
 * News. Set as a dated log — the most recent entry gets a full lead treatment,
 * the rest run as ruled records beneath it.
 */
export default function Dispatch() {
  usePageTitle('DISPATCH — Team Agnishul')
  const [lead, ...rest] = news

  return (
    <>
      <PageHead
        index="05"
        kicker="DISPATCH"
        rail="UPDATES / ANNOUNCEMENTS"
        title={<>LATEST FROM<br />THE PROGRAMME.</>}
        lede="Updates, achievements and announcements from the workshop and the paddock."
        aside={
          <ul className="phead__stats">
            <li>
              <b className="display">{String(news.length).padStart(2, '0')}</b>
              <span className="mono-sm">ENTRIES</span>
            </li>
          </ul>
        }
      />

      <section className="sec sec--paper on-paper">
        <div className="shell">
          {lead && (
            <Reveal>
              <article className="lead slab">
                <div className="lead__meta">
                  <span className="tag tag--red">{lead.tag}</span>
                  <time className="mono-sm" dateTime={lead.iso}>
                    {lead.date}
                  </time>
                  <span className="mono-sm dim">ENTRY {lead.no}</span>
                </div>
                <h2 className="display d-lg lead__title">{lead.title}</h2>
                <p className="body-lg">{lead.body}</p>
              </article>
            </Reveal>
          )}

          <ul className="records">
            {rest.map((item, i) => (
              <li key={item.no}>
                <Reveal delay={i * 0.05}>
                  <article className="record">
                    <span className="record__no display">{item.no}</span>
                    <div className="record__main">
                      <div className="record__meta">
                        <time className="mono-sm" dateTime={item.iso}>
                          {item.date}
                        </time>
                        <span className="tag tag--ghost">{item.tag}</span>
                      </div>
                      <h3 className="display d-sm">{item.title}</h3>
                      <p className="body">{item.body}</p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
