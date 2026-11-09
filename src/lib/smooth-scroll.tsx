import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap'

type ScrollApi = {
  lenis: Lenis | null
  scrollTo: (target: number | string | HTMLElement, opts?: { immediate?: boolean; offset?: number }) => void
  stop: () => void
  start: () => void
}

const ScrollContext = createContext<ScrollApi>({
  lenis: null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
})

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Native touch scrolling feels best on phones and tablets.
      syncTouch: false,
    })
    lenisRef.current = instance
    setLenis(instance)

    instance.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      instance.destroy()
      lenisRef.current = null
      setLenis(null)
    }
  }, [])

  const api: ScrollApi = {
    lenis,
    scrollTo: (target, opts) => {
      const l = lenisRef.current
      if (l) l.scrollTo(target as never, { immediate: opts?.immediate, offset: opts?.offset ?? 0 })
      else if (typeof target === 'number') window.scrollTo({ top: target, behavior: opts?.immediate ? 'auto' : 'smooth' })
      else {
        const el = typeof target === 'string' ? document.querySelector(target) : target
        el?.scrollIntoView({ behavior: opts?.immediate ? 'auto' : 'smooth' })
      }
    },
    stop: () => lenisRef.current?.stop(),
    start: () => lenisRef.current?.start(),
  }

  return <ScrollContext.Provider value={api}>{children}</ScrollContext.Provider>
}

export const useSmoothScroll = () => useContext(ScrollContext)

/** Resets scroll on navigation and refreshes ScrollTrigger once the new route has painted. */
export function RouteScrollManager() {
  const { pathname, hash } = useLocation()
  const { scrollTo } = useSmoothScroll()

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (el) scrollTo(el, { immediate: true, offset: -80 })
      })
    } else {
      scrollTo(0, { immediate: true })
      window.scrollTo(0, 0)
    }
    // Wait for fonts and images to settle before measuring triggers.
    const t1 = window.setTimeout(() => ScrollTrigger.refresh(), 120)
    const t2 = window.setTimeout(() => ScrollTrigger.refresh(), 900)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, hash])

  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, [])

  return null
}
