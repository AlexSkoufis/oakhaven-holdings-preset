import type { SVGProps } from 'react'

// The Oakhaven mark: growth rings cut along the ground line, one band per
// generation. The rings keep the brand gold; the wordmark follows the
// surrounding text colour (ink on light, paper on dark).

// Concentric half-ring bands centred on (32, 58). Each is [inner radius, outer radius];
// an inner radius of 0 draws the solid heartwood.
const BANDS: [number, number][] = [
  [0, 7],
  [11, 16],
  [20, 25],
  [29, 32],
]
const CX = 32
const CY = 58

const band = ([r0, r1]: [number, number]) =>
  r0 === 0
    ? `M${CX - r1},${CY} A${r1},${r1} 0 0 1 ${CX + r1},${CY} Z`
    : `M${CX - r1},${CY} A${r1},${r1} 0 0 1 ${CX + r1},${CY} L${CX + r0},${CY} A${r0},${r0} 0 0 0 ${CX - r0},${CY} Z`

export const RING_PATHS = BANDS.map(band)

export function Logo({ className = '', title = 'Oakhaven' }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 268 60" className={className} role="img" aria-label={title}>
      <g fill="var(--gold)" data-rays>
        {RING_PATHS.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <g fill="currentColor" data-word>
        <text
          x="78"
          y="47"
          textLength="186"
          lengthAdjust="spacingAndGlyphs"
          style={{ fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 420, letterSpacing: '-0.01em' }}
        >
          Oakhaven
        </text>
      </g>
    </svg>
  )
}

/** Just the rings, used as a quiet brand device. */
export function Rings({ className = '', ...rest }: SVGProps<SVGSVGElement> & Record<`data-${string}`, unknown>) {
  return (
    <svg viewBox="0 0 64 60" className={className} aria-hidden="true" {...rest}>
      <g fill="currentColor">
        {RING_PATHS.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  )
}
