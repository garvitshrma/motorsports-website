import { team } from '../data/site'
import './RaceFlag.css'

/**
 * Chequered pennant carrying the club logo.
 *
 * The cloth is a single SVG path: filled white, then stroked with a chequer
 * pattern, which gives the banded border without having to hand-build an inset
 * outline. The whole cloth group runs through a turbulence displacement filter
 * whose frequency is animated, so it ripples rather than just swaying — and the
 * logo, being inside that group, ripples with it.
 */
export default function RaceFlag({ code = 'S1', label, className = '' }) {
  return (
    <figure className={`flag ${className}`}>
      <svg
        className="flag__svg"
        viewBox="0 0 660 470"
        role="img"
        aria-label={`${team.org} chequered flag`}
      >
        <defs>
          <pattern id="flag-checks" width="30" height="30" patternUnits="userSpaceOnUse">
            <rect width="30" height="30" fill="#f4f2ec" />
            <rect width="15" height="15" fill="#0b0b0b" />
            <rect x="15" y="15" width="15" height="15" fill="#0b0b0b" />
          </pattern>

          <linearGradient id="flag-pole" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#6d6f73" />
            <stop offset="0.35" stopColor="#d7d9dc" />
            <stop offset="0.7" stopColor="#8d9095" />
            <stop offset="1" stopColor="#55585c" />
          </linearGradient>

          {/* Cloth ripple. The animated frequency is what sells it as fabric. */}
          <filter id="flag-wave" x="-12%" y="-20%" width="130%" height="150%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.006 0.017"
              numOctaves="2"
              seed="7"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="11s"
                values="0.006 0.017; 0.010 0.026; 0.006 0.017"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="17"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>

        {/* pole */}
        <rect x="92" y="20" width="15" height="440" fill="url(#flag-pole)" />
        <circle cx="99.5" cy="17" r="13" fill="url(#flag-pole)" />

        <g className="flag__cloth">
          {/* soft ground shadow so the cloth does not float */}
          <path
            d="M108 58 C 250 44, 400 92, 618 272 C 428 304, 258 396, 108 410 Z"
            fill="rgba(0,0,0,0.55)"
            transform="translate(9 12)"
          />

          <path
            className="flag__field"
            d="M108 58 C 250 44, 400 92, 618 272 C 428 304, 258 396, 108 410 Z"
            fill="#f4f2ec"
            stroke="url(#flag-checks)"
            strokeWidth="29"
            strokeLinejoin="round"
          />

          <image
            href={team.logoLight}
            x="150"
            y="166"
            width="312"
            height="90"
            preserveAspectRatio="xMidYMid meet"
          />
        </g>
      </svg>

      {label && (
        <figcaption className="flag__cap">
          <span className="flag__code">{code}</span>
          <span className="flag__label mono">{label}</span>
        </figcaption>
      )}
    </figure>
  )
}
