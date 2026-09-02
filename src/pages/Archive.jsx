import { useMemo, useState } from 'react'
import PageHead from '../components/PageHead'
import { Reveal } from '../components/ui'
import { gallery, galleryFilters } from '../data/site'
import { usePageTitle } from '../lib/usePageTitle'
import './pages.css'

/**
 * Photographic archive.
 *
 * Every tile is a captioned contact-sheet frame. Until real photographs are
 * dropped in (set `src` in src/data/site.js) each frame renders as a labelled
 * plate — no stock imagery stands in for the team's own work.
 */
export default function Archive() {
  usePageTitle('ARCHIVE — Team Agnishul')
  const [filter, setFilter] = useState('ALL')

  const shown = useMemo(
    () => (filter === 'ALL' ? gallery : gallery.filter((g) => g.cat === filter)),
    [filter]
  )

  return (
    <>
      <PageHead
        index="04"
        kicker="PHOTOGRAPHIC ARCHIVE"
        rail="ARCHIVE / CONTACT SHEET"
        title={<>MOMENTS THAT<br />DEFINE THE RUN.</>}
        lede="From intense track battles to behind-the-scenes teamwork, the visual record of the programme."
        aside={
          <ul className="phead__stats">
            <li>
              <b className="display">{String(gallery.length).padStart(2, '0')}</b>
              <span className="mono-sm">FRAMES</span>
            </li>
          </ul>
        }
      />

      <section className="sec sec--paper on-paper">
        <div className="shell">
          <div className="filters" role="tablist" aria-label="Filter archive">
            {galleryFilters.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                className={`filter ${filter === f ? 'is-on' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
                <i className="mono-sm">
                  {f === 'ALL'
                    ? gallery.length
                    : gallery.filter((g) => g.cat === f).length}
                </i>
              </button>
            ))}
          </div>

          <div className="sheetgrid">
            {shown.map((g, i) => (
              <Reveal key={g.no} delay={Math.min(i, 6) * 0.04}>
                <figure className="frame">
                  <div className="frame__img">
                    {g.src ? (
                      <img src={g.src} alt={g.caption} loading="lazy" />
                    ) : (
                      <div className="frame__empty">
                        <span className="frame__cross" aria-hidden="true" />
                        <span className="mono-sm">IMAGE PENDING</span>
                      </div>
                    )}
                    <span className="frame__no mono-sm">{g.no}</span>
                  </div>
                  <figcaption className="frame__cap">
                    <span className="mono">{g.caption}</span>
                    <span className="mono-sm dim">{g.cat}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          {shown.length === 0 && (
            <p className="body" style={{ marginTop: 34 }}>
              No frames filed under this category yet.
            </p>
          )}
        </div>
      </section>
    </>
  )
}
