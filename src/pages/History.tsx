import { useRef } from 'react'
import { Seo } from '../components/Seo'
import { TypeHero } from '../components/PageHero'
import { Button } from '../components/ui'
import { Related } from '../components/Related'
import { HISTORY } from '../data/history'
import { gsap, useGSAP, MQ } from '../lib/gsap'

export default function History() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          '[data-line-fill]',
          { scaleY: 0 },
          { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '[data-timeline]', start: 'top 60%', end: 'bottom 60%', scrub: true } },
        )
        gsap.utils.toArray<HTMLElement>('[data-entry]').forEach((el) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 78%', once: true } })
          tl.from(el.querySelector('[data-dot]'), { scale: 0, duration: 0.6, ease: 'back.out(3)' })
            .from(el.querySelector('[data-year]'), { yPercent: 60, autoAlpha: 0, duration: 1.1, ease: 'expo.out' }, '<')
            .from(el.querySelectorAll('[data-body] > *'), { y: 20, autoAlpha: 0, stagger: 0.08, duration: 1, ease: 'expo.out' }, '<0.15')
        })
      })
    },
    { scope: root },
  )

  return (
    <>
      <Seo
        title="Our History"
        description="From the first farms of the Alder Valley to the cooperative, the Community Trust and Oakhaven."
      />
      <TypeHero
        eyebrow="Our Roots"
        crumbs={[{ label: 'Our Roots' }, { label: 'Our History' }]}
        title={
          <>
            A history of <span className="italic-accent text-ember">neighbours.</span>
          </>
        }
        intro="How a valley of family farms became a cooperative, then a community trust, and then the owner of Oakhaven."
        aside={
          <div className="mt-8">
            <Button to="/our-roots/principles" variant="outline-dark" magnetic={false}>
              Read the Seven Principles
            </Button>
          </div>
        }
      />

      <section ref={root} className="bg-paper pb-24 md:pb-36" aria-label="Timeline">
        <div className="shell">
          <div data-timeline className="relative">
            <div aria-hidden="true" className="absolute bottom-0 left-[7px] top-0 w-px bg-ink/15 md:left-1/2">
              <div data-line-fill className="h-full w-full origin-top bg-amber" />
            </div>
          <ol className="relative">
            {HISTORY.map((h, i) => {
              const right = i % 2 === 1
              return (
                <li key={h.year + h.title} data-entry className="relative grid py-10 pl-10 md:grid-cols-2 md:gap-16 md:py-14 md:pl-0">
                  <span
                    data-dot
                    aria-hidden="true"
                    className="absolute left-0 top-[3.4rem] size-[15px] rounded-full border-[3px] border-paper bg-amber md:left-1/2 md:top-[4.4rem] md:-translate-x-1/2"
                  />
                  <div className={`text-reveal ${right ? 'md:order-2' : 'md:text-right'}`}>
                    <p data-year className="t-num text-[clamp(3.5rem,8vw,7.5rem)] leading-none text-ink">
                      {h.year}
                    </p>
                  </div>
                  <div data-body className={`mt-4 max-w-lg md:mt-3 ${right ? 'md:order-1 md:justify-self-end md:text-right' : ''}`}>
                    <h2 className="t-h3">{h.title}</h2>
                    <p className="mt-3 text-ink/75">{h.text}</p>
                  </div>
                </li>
              )
            })}
          </ol>
          </div>
          <p className="mt-16 max-w-2xl text-sm text-stone">
            The cooperative’s minute books, member rolls and photographs are kept by the Trust and open to members by appointment.
          </p>
        </div>
      </section>

      <Related
        items={[
          { kicker: 'Our roots', label: 'Seven Principles', to: '/our-roots/principles' },
          { kicker: 'Since 2009', label: 'Who We Are', to: '/who-we-are' },
        ]}
      />
    </>
  )
}
