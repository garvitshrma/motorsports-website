import { useId } from 'react'
import { team } from '../data/site'
import './RaceFlag.css'

/**
 * Chequered flag with the club logo printed on the white field.
 *
 * The cloth is a single path: filled white, then *stroked* with a chequer
 * pattern, which produces the banded border without hand-building an inset
 * outline. The cloth group runs through a turbulence displacement filter whose
 * frequency is animated, so it ripples like fabric — and the logo, being inside
 * that group, ripples with it rather than sitting flat on top.
 *
 * Two geometries:
 *   banner  — shallow trapezoid, used as the navbar mark. The taper is gentle
 *             so most of the cloth is usable and the logo stays legible small.
 *   pennant — the classic tapered triangle, for use at display size.
 */
const SHAPES = {
  banner: {
    view: '0 0 400 130',
    pole: { x: 3, y: 2, w: 6, h: 126, cx: 6, cy: 3, r: 5 },
    // Shallow taper and a thin border, so the printed logo gets the most cloth
    // the shape allows — wrapping a 3.5:1 lockup in a flag costs about half the
    // width, and the mark still has to read at navbar size.
    cloth: 'M 11 8 L 390 40 L 390 90 L 11 122 Z',
    check: 12,
    stroke: 9,
    logo: { x: 28, y: 35, w: 212, h: 61 },
    shadow: 4,
  },
  pennant: {
    view: '0 0 660 470',
    pole: { x: 92, y: 20, w: 15, h: 440, cx: 99.5, cy: 17, r: 13 },
    cloth: 'M108 58 C 250 44, 400 92, 618 272 C 428 304, 258 396, 108 410 Z',
    check: 30,
    stroke: 29,
    logo: { x: 150, y: 166, w: 312, h: 90 },
    shadow: 10,
  },
}

export default function RaceFlag({ shape = 'pennant', code, label, className = '' }) {
  const uid = useId().replace(/:/g, '')
  const s = SHAPES[shape] ?? SHAPES.pennant
  const half = s.check / 2

  const checks = `checks-${uid}`
  const poleFill = `pole-${uid}`
  const wave = `wave-${uid}`

  return (
    <figure className={`flag flag--${shape} ${className}`}>
      <svg className="flag__svg" viewBox={s.view} role="img" aria-label={team.org}>
        <defs>
          <pattern id={checks} width={s.check} height={s.check} patternUnits="userSpaceOnUse">
            <rect width={s.check} height={s.check} fill="#f4f2ec" />
            <rect width={half} height={half} fill="#0b0b0b" />
            <rect x={half} y={half} width={half} height={half} fill="#0b0b0b" />
          </pattern>

          <linearGradient id={poleFill} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#6d6f73" />
            <stop offset="0.35" stopColor="#d7d9dc" />
            <stop offset="0.7" stopColor="#8d9095" />
            <stop offset="1" stopColor="#55585c" />
          </linearGradient>

          {/*
            The wave is a displacement map that *travels*. Animating the
            turbulence frequency on its own only makes the noise breathe in
            place, which reads as a shimmer; sliding the noise field sideways
            with feOffset is what sends a ripple down the cloth from pole to
            tip. The cloth, border and printed logo are all inside the filtered
            group, so they deform together rather than the logo floating flat
            on a moving cloth.
          */}
          <filter id={wave} x="-20%" y="-40%" width="150%" height="200%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={shape === 'banner' ? '0.012 0.028' : '0.006 0.017'}
              numOctaves="2"
              seed="7"
              result="noise"
            />
            <feOffset in="noise" dx="0" dy="0" result="rolling">
              <animate
                attributeName="dx"
                dur={shape === 'banner' ? '4.2s' : '6s'}
                values="0; -170; 0"
                calcMode="spline"
                keyTimes="0; 0.5; 1"
                keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
                repeatCount="indefinite"
              />
            </feOffset>
            <feDisplacementMap
              in="SourceGraphic"
              in2="rolling"
              scale={shape === 'banner' ? 11 : 24}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>

        <rect x={s.pole.x} y={s.pole.y} width={s.pole.w} height={s.pole.h} fill={`url(#${poleFill})`} />
        <circle cx={s.pole.cx} cy={s.pole.cy} r={s.pole.r} fill={`url(#${poleFill})`} />

        <g className="flag__cloth" style={{ filter: `url(#${wave})` }}>
          <path
            d={s.cloth}
            fill="rgba(0,0,0,0.5)"
            transform={`translate(${s.shadow} ${s.shadow * 1.3})`}
          />

          <path
            d={s.cloth}
            fill="#f4f2ec"
            stroke={`url(#${checks})`}
            strokeWidth={s.stroke}
            strokeLinejoin="round"
          />

          {/* The logo is printed on the cloth, inside the filtered group. */}
          <image
            href={team.logoLight}
            x={s.logo.x}
            y={s.logo.y}
            width={s.logo.w}
            height={s.logo.h}
            preserveAspectRatio="xMidYMid meet"
          />
        </g>
      </svg>

      {label && (
        <figcaption className="flag__cap">
          {code && <span className="flag__code">{code}</span>}
          <span className="flag__label mono">{label}</span>
        </figcaption>
      )}
    </figure>
  )
}
