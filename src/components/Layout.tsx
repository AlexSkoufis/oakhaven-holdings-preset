import { Suspense, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { RouteScrollManager } from '../lib/smooth-scroll'
import { gsap, useGSAP } from '../lib/gsap'

function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    gsap.fromTo(
      ref.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: document.documentElement, start: 0, end: 'max', scrub: 0.3, invalidateOnRefresh: true },
      },
    )
  })
  return <div ref={ref} aria-hidden="true" className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gold" />
}

function PageFallback() {
  return <div className="min-h-[100svh] bg-paper" aria-busy="true" />
}

export function Layout() {
  return (
    <>
      <RouteScrollManager />
      <ScrollProgress />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
