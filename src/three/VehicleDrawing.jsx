/**
 * Side-elevation technical drawing of a formula-style vehicle.
 *
 * This is the graceful fallback for the hero: it renders when the .glb has not
 * been dropped in yet, when WebGL is unavailable, or when the scene errors. It
 * is deliberately a *drawing*, not a stand-in 3D object — an unfinished spec
 * sheet is honest, a generic 3D placeholder is not.
 *
 * Inherits `currentColor`, so it works on ink and on paper.
 */
export default function VehicleDrawing({ annotated = true, className = '' }) {
  return (
    <svg
      viewBox="0 0 1000 430"
      className={className}
      role="img"
      aria-label="Technical side elevation of a formula-style race car"
      style={{ width: '100%', height: 'auto', overflow: 'visible' }}
    >
      <defs>
        <marker id="vd-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,1 L9,5 L0,9 z" fill="#e10600" />
        </marker>
        <marker id="vd-arrow-r" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M10,1 L1,5 L10,9 z" fill="#e10600" />
        </marker>
      </defs>

      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.92"
      >
        {/* ---- ground ---------------------------------------------------- */}
        <line x1="0" y1="368" x2="1000" y2="368" strokeWidth="2.4" />
        <g opacity="0.4" strokeWidth="1.2">
          {Array.from({ length: 34 }, (_, i) => (
            <line key={i} x1={10 + i * 30} y1="368" x2={i * 30} y2="380" />
          ))}
        </g>

        {/* ---- front wing assembly --------------------------------------- */}
        <path d="M22 338 L150 344 L150 353 L22 351 Z" />
        <path d="M40 353 L146 358 L146 364 L40 361 Z" opacity="0.75" />
        <path d="M22 316 L34 316 L34 360 L22 360 Z" strokeWidth="2" />

        {/* ---- nose cone / monocoque ------------------------------------- */}
        <path d="M60 332 C 130 322, 220 306, 300 296 L 348 290" />
        <path d="M60 332 L 66 344 L 150 348" opacity="0.6" />
        <path d="M348 290 C 362 272, 382 264, 404 260" />

        {/* cockpit opening */}
        <path d="M404 260 L 418 282 L 470 280 L 486 256" />

        {/* roll hoop + halo */}
        <path d="M486 256 L 498 224 L 512 226 L 516 258" strokeWidth="2" />
        <path d="M406 266 C 430 234, 478 226, 506 232" strokeWidth="2.2" opacity="0.85" />
        <path d="M448 236 L 444 272" strokeWidth="1.4" opacity="0.7" />

        {/* ---- engine cover / rear bodywork ------------------------------ */}
        <path d="M516 258 C 590 250, 680 262, 754 280 L 820 292" />
        <path d="M820 292 L 862 300" opacity="0.7" />

        {/* ---- floor & sidepod ------------------------------------------- */}
        <path d="M348 290 L 352 336 L 760 336" opacity="0.85" />
        <path d="M474 300 C 520 288, 606 288, 668 300 C 706 308, 730 322, 736 336" />
        {/* sidepod inlet */}
        <path d="M474 300 L 470 330 L 500 332" opacity="0.8" />
        {/* cooling louvres */}
        <g opacity="0.5" strokeWidth="1.2">
          <line x1="560" y1="298" x2="600" y2="296" />
          <line x1="562" y1="308" x2="602" y2="306" />
          <line x1="564" y1="318" x2="604" y2="316" />
        </g>

        {/* ---- diffuser --------------------------------------------------- */}
        <path d="M760 336 L 852 318 L 852 340 L 762 348 Z" opacity="0.85" />

        {/* ---- rear wing --------------------------------------------------- */}
        <path d="M856 240 L 966 236 L 966 248 L 856 251 Z" />
        <path d="M864 262 L 958 258 L 958 267 L 864 270 Z" opacity="0.75" />
        <path d="M956 218 L 972 218 L 972 300 L 956 300 Z" strokeWidth="2" />
        <path d="M900 251 L 892 292" opacity="0.8" />
        <path d="M918 251 L 926 292" opacity="0.8" />

        {/* ---- wheels ------------------------------------------------------ */}
        <g>
          <circle cx="245" cy="306" r="62" strokeWidth="2.4" />
          <circle cx="245" cy="306" r="34" opacity="0.55" />
          <circle cx="245" cy="306" r="10" opacity="0.8" />
          <circle cx="775" cy="300" r="68" strokeWidth="2.4" />
          <circle cx="775" cy="300" r="38" opacity="0.55" />
          <circle cx="775" cy="300" r="11" opacity="0.8" />
        </g>

        {/* suspension */}
        <g opacity="0.6" strokeWidth="1.3">
          <line x1="300" y1="296" x2="245" y2="306" />
          <line x1="308" y1="322" x2="245" y2="306" />
          <line x1="740" y1="288" x2="775" y2="300" />
          <line x1="748" y1="326" x2="775" y2="300" />
        </g>

        {/* wheel centre crosshairs */}
        <g stroke="#e10600" strokeWidth="1.3" opacity="0.95">
          <line x1="219" y1="306" x2="271" y2="306" />
          <line x1="245" y1="280" x2="245" y2="332" />
          <line x1="747" y1="300" x2="803" y2="300" />
          <line x1="775" y1="272" x2="775" y2="328" />
        </g>
      </g>

      {annotated && (
        <g fontFamily="'JetBrains Mono', monospace" fontSize="11" letterSpacing="1.6">
          {/* wheelbase dimension */}
          <g stroke="#e10600" strokeWidth="1.2" fill="none" opacity="0.95">
            <line x1="245" y1="306" x2="245" y2="410" strokeDasharray="3 4" opacity="0.5" />
            <line x1="775" y1="300" x2="775" y2="410" strokeDasharray="3 4" opacity="0.5" />
            <line
              x1="245"
              y1="400"
              x2="775"
              y2="400"
              markerStart="url(#vd-arrow-r)"
              markerEnd="url(#vd-arrow)"
            />
          </g>
          <text x="510" y="392" fill="#e10600" textAnchor="middle">
            WHEELBASE — TBC
          </text>

          {/* callouts */}
          <g stroke="currentColor" strokeWidth="1" opacity="0.32" fill="none">
            <path d="M86 344 L 86 214 L 150 214" />
            <path d="M430 250 L 430 168 L 500 168" />
            <path d="M600 296 L 640 356" />
            <path d="M910 236 L 910 150 L 848 150" />
          </g>
          <g fill="currentColor" opacity="0.5">
            <text x="158" y="211">01 / FRONT WING</text>
            <text x="508" y="165">02 / SURVIVAL CELL + HALO</text>
            <text x="646" y="370">03 / SIDEPOD</text>
            <text x="844" y="147" textAnchor="end">
              04 / REAR WING
            </text>
          </g>
        </g>
      )}
    </svg>
  )
}
