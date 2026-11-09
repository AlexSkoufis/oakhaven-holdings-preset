import { useRef, type CSSProperties } from 'react'
import { gsap, useGSAP, MQ } from '../lib/gsap'
import { Img } from './Img'

type Props = {
  id: string
  alt: string
  className?: string
  sizes?: string
  position?: string
  /** vertical drift in percent of the frame height */
  parallax?: number
  /** clip-path wipe as the image enters the viewport */
  reveal?: 'up' | 'left' | 'center' | false
  priority?: boolean
  style?: CSSProperties
}

/**
 * Image with optional clip-path entrance and scroll parallax.
 * Uses transforms and clip-path only, so layout never shifts.
 */
export function MotionImage({
  id,
  alt,
  className = '',
  sizes,
  position,
  parallax = 10,
  reveal = 'up',
  priority,
  style,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        const frame = ref.current!
        const img = frame.querySelectorAll('img')
        if (parallax) {
          gsap.set(img, { scale: 1 + parallax / 50 })
          gsap.fromTo(
            img,
            { yPercent: -parallax / 2 },
            {
              yPercent: parallax / 2,
              ease: 'none',
              scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        }
        if (reveal) {
          const from =
            reveal === 'left' ? 'inset(0% 100% 0% 0%)' : reveal === 'center' ? 'inset(18% 18% 18% 18%)' : 'inset(100% 0% 0% 0%)'
          gsap.fromTo(
            frame,
            { clipPath: from },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 1.6,
              ease: 'expo.inOut',
              scrollTrigger: { trigger: frame, start: 'top 85%', once: true },
              clearProps: 'clipPath',
            },
          )
        }
      })
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} style={style}>
      <Img id={id} alt={alt} sizes={sizes} position={position} priority={priority} className="absolute inset-0 h-full w-full" />
    </div>
  )
}
