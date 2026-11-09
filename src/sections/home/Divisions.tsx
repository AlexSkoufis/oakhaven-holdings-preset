import { useRef } from 'react'
import { DIVISIONS } from '../../data/divisions'
import { gsap, useGSAP, MQ, ScrollTrigger } from '../../lib/gsap'
import { Img } from '../../components/Img'
import { Button, Eyebrow } from '../../components/ui'
import { useSmoothScroll } from '../../lib/smooth-scroll'

/**
 * Desktop: a pinned, scroll-scrubbed sequence where each group wipes in
 * over the last. Mobile and reduced motion: three stacked full-height
 * panels in normal document flow.
 */
export function Divisions() {
  const root = useRef<HTMLElement>(null)
  const stRef = useRef<ScrollTrigger | null>(null)
  const { scrollTo } = useSmoothScroll()

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(MQ.desktop, () => {
        const panels = gsap.utils.toArray<HTMLElement>('[data-panel]')
        const dots = gsap.utils.toArray<HTMLElement>('[data-dot]')
        gsap.set('[data-stage]', { height: '100svh' })
        gsap.set(panels, { position: 'absolute', inset: 0, minHeight: 0 })
        gsap.set(panels.slice(1), { clipPath: 'inset(100% 0% 0% 0%)' })
        gsap.set('[data-numeral-rail]', { display: 'block' })

        const setActive = (i: number) =>
          dots.forEach((d, j) => {
            d.toggleAttribute('data-active', i === j)
            d.setAttribute('aria-current', i === j ? 'step' : 'false')
          })
        setActive(0)

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: '[data-stage]',
            start: 'top top',
            end: `+=${(panels.length - 1) * 100}%`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            snap: { snapTo: 'labels', duration: { min: 0.3, max: 0.9 }, ease: 'power2.inOut', delay: 0.05 },
            onUpdate: (self) => setActive(Math.round(self.progress * (panels.length - 1))),
          },
        })
        stRef.current = tl.scrollTrigger ?? null

        tl.addLabel('p0')
        panels.slice(1).forEach((panel, k) => {
          const prev = panels[k]
          const i = k + 1
          tl.to(prev.querySelectorAll('[data-anim]'), { yPercent: -40, autoAlpha: 0, stagger: 0.03, duration: 0.5 }, `p${k}+=0.1`)
            .to(prev.querySelector('[data-img]'), { yPercent: -12, scale: 1.08, duration: 1 }, `p${k}+=0.1`)
            .to(panel, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power2.inOut' }, `p${k}+=0.1`)
            .from(panel.querySelector('[data-img]'), { scale: 1.3, yPercent: 10, duration: 1, ease: 'power2.out' }, '<')
            .from(panel.querySelectorAll('[data-anim]'), { yPercent: 60, autoAlpha: 0, stagger: 0.05, duration: 0.6 }, '<0.45')
            .to('[data-numeral-rail]', { yPercent: (-100 / panels.length) * i, duration: 1, ease: 'power3.inOut' }, '<-0.45')
            .addLabel(`p${i}`, '+=0.15')
        })

        return () => {
          stRef.current = null
        }
      })

      mm.add(MQ.mobile, () => {
        gsap.utils.toArray<HTMLElement>('[data-panel]').forEach((panel) => {
          gsap.fromTo(
            panel.querySelector('[data-img]'),
            { yPercent: -8, scale: 1.15 },
            { yPercent: 8, ease: 'none', scrollTrigger: { trigger: panel, start: 'top bottom', end: 'bottom top', scrub: true } },
          )
          gsap.from(panel.querySelectorAll('[data-anim]'), {
            y: 30,
            autoAlpha: 0,
            stagger: 0.07,
            duration: 1.1,
            scrollTrigger: { trigger: panel, start: 'top 70%', once: true },
          })
        })
      })
    },
    { scope: root },
  )

  const goTo = (i: number) => {
    const st = stRef.current
    if (st) scrollTo(st.start + ((st.end - st.start) * i) / (DIVISIONS.length - 1) + 2)
    else document.getElementById(`division-${DIVISIONS[i].id}`)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={root} data-surface="dark" className="relative bg-ink text-paper" aria-labelledby="divisions-title">
      <div className="shell pb-10 pt-24 md:pt-32">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Eyebrow index="02" className="text-gold">
              What We Do
            </Eyebrow>
            <h2 id="divisions-title" className="t-display mt-8">
              Three groups. <span className="italic-accent text-gold">One</span> long view.
            </h2>
          </div>
          <p className="max-w-md text-paper/70 md:col-span-5 md:justify-self-end">
            We buy good businesses and sound buildings from people who care what happens to them next, and we keep them for the long run.
          </p>
        </div>
      </div>

      <div data-stage className="relative overflow-hidden">
        {DIVISIONS.map((d, i) => (
          <article
            key={d.id}
            id={`division-${d.id}`}
            data-panel
            className="relative flex min-h-[92svh] items-end overflow-hidden"
            style={{ zIndex: i + 1 }}
            aria-labelledby={`division-${d.id}-title`}
          >
            <div data-img className="absolute inset-0 will-change-transform">
              <Img id={d.image} alt={d.imageAlt} sizes="100vw" position={d.position} className="h-full w-full" />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(20_24_26/0.92)_0%,rgb(20_24_26/0.55)_45%,rgb(20_24_26/0.2)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgb(20_24_26/0.85)_0%,transparent_45%)]" />

            <div className="shell relative w-full pb-14 pt-28 lg:pb-20">
              <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
                {/* Mobile numeral (desktop uses the shared rolling rail) */}
                <p aria-hidden="true" data-anim className="t-num text-[5rem] leading-none text-gold lg:hidden">
                  {d.index}
                </p>
                <div className="lg:col-span-6 lg:col-start-4">
                  <p data-anim className="t-eyebrow text-gold">
                    {d.kicker}
                  </p>
                  <h3 id={`division-${d.id}-title`} data-anim className="t-display mt-5">
                    {d.name}
                  </h3>
                  <p data-anim className="t-lead mt-6 max-w-xl text-paper/85">
                    {d.summary}
                  </p>
                  <div data-anim className="mt-8">
                    <Button to={d.to} variant="paper">
                      Explore the {d.name}
                    </Button>
                  </div>
                </div>
                <ul data-anim className="hidden flex-col gap-2 lg:col-span-3 lg:flex" aria-label={`${d.name} companies`}>
                  {d.highlights.map((h) => (
                    <li key={h} className="border-b border-paper/15 pb-2 text-sm text-paper/75">
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}

        {/* Rolling numeral shared across panels (desktop) */}
        <div aria-hidden="true" className="pointer-events-none absolute bottom-12 left-[var(--gutter)] z-10 hidden h-[clamp(8rem,16vw,15rem)] overflow-hidden lg:block">
          <div data-numeral-rail className="hidden">
            {DIVISIONS.map((d) => (
              <p key={d.id} className="t-num h-[clamp(8rem,16vw,15rem)] text-[clamp(8rem,16vw,15rem)] leading-none text-gold">
                {d.index}
              </p>
            ))}
          </div>
        </div>

        {/* Progress navigation (desktop) */}
        <nav aria-label="Groups" className="absolute right-[var(--gutter)] top-1/2 z-10 hidden -translate-y-1/2 lg:block">
          <ol className="flex flex-col gap-4">
            {DIVISIONS.map((d, i) => (
              <li key={d.id}>
                <button
                  type="button"
                  data-dot
                  onClick={() => goTo(i)}
                  className="group flex items-center gap-3 text-right text-xs font-semibold uppercase tracking-[0.16em] text-paper/50 transition-colors data-[active]:text-paper"
                >
                  <span className="opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-data-[active]:opacity-100">{d.name}</span>
                  <span className="block h-px w-6 bg-current transition-all duration-500 group-data-[active]:w-12 group-data-[active]:bg-gold" />
                </button>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  )
}
