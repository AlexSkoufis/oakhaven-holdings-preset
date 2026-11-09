import { useEffect, useRef } from 'react'
import { gsap, useGSAP, MQ, SplitText, prefersReducedMotion, SPLIT } from '../../lib/gsap'
import { Button } from '../../components/ui'
import { useSmoothScroll } from '../../lib/smooth-scroll'

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const { scrollTo } = useSmoothScroll()

  // Autoplay only when motion is welcome; pause while offscreen.
  useEffect(() => {
    const v = video.current
    if (!v) return
    if (prefersReducedMotion()) {
      v.removeAttribute('autoplay')
      v.pause()
      return
    }
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.05 })
    io.observe(v)
    return () => io.disconnect()
  }, [])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (ctx) => {
        const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean }
        if (!motion) return

        const split = SplitText.create('[data-hero-title] [data-line]', { ...SPLIT, type: 'words', mask: 'words' })

        const intro = gsap.timeline({ defaults: { ease: 'expo.out' } })
        intro
          .fromTo(
            '[data-hero-media]',
            { clipPath: desktop ? 'inset(16% 22% 16% 22% round 28px)' : 'inset(22% 8% 22% 8% round 20px)' },
            { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 2, ease: 'expo.inOut' },
          )
          .from('[data-hero-media] video, [data-hero-media] img', { scale: 1.35, duration: 2.4, ease: 'expo.inOut' }, 0)
          .from(split.words, { yPercent: 140, duration: 1.5, stagger: 0.07 }, 0.9)
          .from('[data-hero-fade]', { y: 24, autoAlpha: 0, stagger: 0.08, duration: 1.2 }, 1.35)
          .from('[data-hero-rule]', { scaleX: 0, transformOrigin: 'left center', duration: 1.6 }, 1.2)

        // Layered depth as the hero scrolls away
        const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true }
        gsap.to('[data-hero-media]', { yPercent: 18, ease: 'none', scrollTrigger: st })
        gsap.to('[data-hero-title]', { yPercent: -35, ease: 'none', scrollTrigger: st })
        gsap.to('[data-hero-aside]', { yPercent: -60, autoAlpha: 0, ease: 'none', scrollTrigger: st })
        gsap.to('[data-hero-shade]', { opacity: 0.85, ease: 'none', scrollTrigger: st })

        return () => split.revert()
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} data-surface="dark" className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink text-paper" aria-labelledby="hero-title">
      <div data-hero-media className="absolute inset-0 will-change-transform">
        <video
          ref={video}
          className="h-full w-full object-cover"
          src="/media/hero-film.mp4"
          poster="/media/hero-poster.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(20_24_26/0.55)_0%,rgb(20_24_26/0.05)_35%,rgb(20_24_26/0.25)_60%,rgb(20_24_26/0.9)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgb(241_181_67/0.22),transparent_55%)] mix-blend-soft-light" />
        <div data-hero-shade className="absolute inset-0 bg-ink opacity-0" />
      </div>

      <div className="shell relative flex h-full flex-col justify-end pb-10 pt-[calc(var(--header-h)+3rem)] md:pb-14">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <h1 id="hero-title" data-hero-title className="t-mega lg:col-span-8">
            <span data-line className="block">
              Investing
            </span>
            <span data-line className="block">
              for <span className="italic-accent text-gold">generations.</span>
            </span>
          </h1>

          <div data-hero-aside className="lg:col-span-4 lg:pb-4">
            <p data-hero-fade className="t-eyebrow mb-5 text-gold">
              Community owned. Built to be inherited.
            </p>
            <p data-hero-fade className="max-w-md text-[1.05rem] leading-relaxed text-paper/85 md:text-lg">
              Oakhaven is the holding company of the Alder Valley Community Trust. We invest in businesses and buildings so that the families
              who own us, and the towns where we work, have more to hand on than they were given.
            </p>
            <div data-hero-fade className="mt-8 flex flex-wrap gap-3">
              <Button to="/what-we-do" variant="gold">
                Explore What We Do
              </Button>
              <Button to="/who-we-are" variant="outline-light" magnetic={false}>
                Our Story
              </Button>
            </div>
          </div>
        </div>

        <div data-hero-rule className="mt-10 h-px bg-paper/25 md:mt-14" />
        <div className="mt-5 flex items-center justify-between text-xs font-medium tracking-[0.16em] text-paper/70 uppercase">
          <p data-hero-fade>Est. 2009 · Alder Falls, Michigan</p>
          <button
            data-hero-fade
            type="button"
            onClick={() => scrollTo('#manifesto', { offset: 0 })}
            className="group flex items-center gap-3 uppercase"
            aria-label="Scroll to the next section"
          >
            <span className="hidden sm:inline">Scroll</span>
            <span className="relative block h-10 w-px overflow-hidden bg-paper/25">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2.2s_var(--ease-in-out)_infinite] bg-gold" />
            </span>
          </button>
          <p data-hero-fade className="hidden md:block">
            Industrial · Federal · Real Estate
          </p>
        </div>
      </div>
    </section>
  )
}
