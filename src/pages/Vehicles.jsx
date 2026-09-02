import PageHead from '../components/PageHead'
import VehicleDrawing from '../three/VehicleDrawing'
import { Counter, Reveal, Tbc } from '../components/ui'
import { carStats, cars } from '../data/site'
import { usePageTitle } from '../lib/usePageTitle'
import './pages.css'

/**
 * Vehicle registry. Each car is a record on a spec sheet, alternating sides so
 * the page reads as a document rather than a repeating grid of cards.
 */
export default function Vehicles() {
  usePageTitle('VEHICLES — Team Agnishul')

  return (
    <>
      <PageHead
        index="01"
        kicker="VEHICLE REGISTRY"
        rail="UNIT 01 — VEHICLE DEVELOPMENT"
        title={<>WHAT WE<br />PUT ON TRACK.</>}
        lede="Engineering excellence meets racing passion. Each vehicle represents years of innovation, testing, and dedication."
        aside={
          <ul className="phead__stats">
            {carStats.map((s) => (
              <li key={s.label}>
                <b className="display">
                  <Counter value={s.value} suffix={s.suffix} />
                </b>
                <span className="mono-sm">
                  {s.label}
                  {s.tbc && <Tbc />}
                </span>
              </li>
            ))}
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
                    <span className="mono-sm dim">REF. {car.code}</span>
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

          {/* One elevation drawing for the registry as a whole. */}
          <div className="veh__plate slab">
            <div className="veh__plate-head">
              <span className="mono-sm">GENERAL ARRANGEMENT — SIDE ELEVATION</span>
              <span className="mono-sm red">DWG. 01</span>
            </div>
            <VehicleDrawing />
          </div>
        </div>
      </section>
    </>
  )
}
