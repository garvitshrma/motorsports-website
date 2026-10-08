import PageHead from '../components/PageHead'
import { Reveal, Tbc } from '../components/ui'
import { cars } from '../data/site'
import { usePageTitle } from '../lib/usePageTitle'
import './pages.css'

/**
 * Vehicle registry. Each car is a record on a spec sheet, alternating sides so
 * the page reads as a document rather than a repeating grid of cards.
 */
export default function Vehicles() {
  usePageTitle('CARS — Team Agnishul')

  return (
    <>
      <PageHead
        index="01"
        kicker="CARS"
        title="WHAT WE RACE."
        aside={
          <ul className="phead__stats">
            <li>
              <b className="display">{cars.length}</b>
              <span className="mono-sm">CARS BUILT</span>
            </li>
          </ul>
        }
      />

      <section className="sec sec--paper on-paper">
        <div className="shell">
          {cars.map((car, i) => (
            <Reveal key={car.code}>
              <article className={`veh ${i % 2 ? 'veh--flip' : ''}`}>
                <div className="veh__id">
                  <span className="racenum">{car.no}</span>
                  <span className="tag tag--red">{car.powertrain}</span>
                </div>

                <div className="veh__main">
                  <div className="veh__titlerow">
                    <h2 className="display d-md">
                      {car.name}
                      {car.tbc && <Tbc label="NAME TBC" />}
                    </h2>
                  </div>

                  <p className="body veh__body">{car.body}</p>

                  <table className="spec">
                    <caption className="sr-only">Specification for {car.name}</caption>
                    <tbody>
                      {car.specs.map((s) => (
                        <tr key={s.k}>
                          <th scope="row" className="mono-sm">
                            {s.k}
                          </th>
                          <td>
                            {s.v}
                            {s.tbc && <Tbc />}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>
            </Reveal>
          ))}

        </div>
      </section>
    </>
  )
}
