import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { Flip } from 'gsap/Flip'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText, Flip, useGSAP)

gsap.defaults({ ease: 'expo.out', duration: 1.2 })
ScrollTrigger.config({ ignoreMobileResize: true })

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Breakpoint conditions shared by every gsap.matchMedia() call. */
export const MQ = {
  desktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
  mobile: '(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)',
  motion: '(prefers-reduced-motion: no-preference)',
  reduced: '(prefers-reduced-motion: reduce)',
  finePointer: '(hover: hover) and (pointer: fine)',
} as const

/**
 * Class names for SplitText pieces. SplitText names each mask wrapper
 * "<class>-mask", which index.css pads so ascenders, accents, and
 * descenders are never clipped.
 */
export const SPLIT = { linesClass: 'sl', wordsClass: 'sw', charsClass: 'sc' } as const

export { gsap, ScrollTrigger, SplitText, Flip, useGSAP }
