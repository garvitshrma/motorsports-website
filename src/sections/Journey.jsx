import { Reveal, SectionHead } from '../components/ui'
import { timeline } from '../data/site'

/**
 * Programme history. Set as a vertical log with the year carried at full
 * display size — the years are the content, so they get the weight.
 */
export default function Journey() {
  return (
    <section className="sec sec--paper on-paper" id="journey">
      <div className="shell">
        <SectionHead index="02" total="02" kicker="TIMELINE" title="HOW WE GOT HERE." />

        <ol className="tl">
          {timeline.map((entry, i) => (
            <li key={entry.year}>
              <Reveal delay={i * 0.05} className="tl__row">
                <div className="tl__year">
                  <span className="display">{entry.year}</span>
                </div>

                <div className="tl__spine" aria-hidden="true">
                  <i className="tl__node" />
                </div>

                <div className="tl__body">
                  <span className="tl__seq mono-sm">
                    {String(i + 1).padStart(2, '0')} / {String(timeline.length).padStart(2, '0')}
                  </span>
                  <h3 className="tl__title display d-sm">{entry.title}</h3>
                  <p className="body">{entry.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
