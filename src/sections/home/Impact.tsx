import { useRef } from 'react'
import { MILESTONES, FACTS } from '../../data/milestones'
import { gsap, useGSAP, MQ } from '../../lib/gsap'
import { Img } from '../../components/Img'
import { ArrowLink, Button, Eyebrow, SplitReveal } from '../../components/ui'
import { MotionImage } from '../../components/MotionImage'
import { Rings } from '../../components/Logo'

export function Impact() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Count-up for verified figures only. Final values are in the DOM already.
      mm.add(MQ.motion, () => {
        gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
          const target = Number(el.dataset.count)
          const suffix = el.dataset.suffix ?? ''
          const isYear = target > 1900
          const obj = { v: isYear ? target - 15 : 0 }
          gsap.to(obj, {
            v: target,
            duration: 2.2,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            onUpdate: () => {
              el.textContent = Math.round(obj.v) + suffix
            },
          })
        })
        gsap.from('[data-fact]', {
          y: 40,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 1.2,
          scrollTrigger: { trigger: '[data-facts]', start: 'top 85%', once: true },
        })
      })

      // Horizontal milestone track (desktop)
      mm.add(MQ.desktop, () => {
        const track = root.current!.querySelector<HTMLElement>('[data-track]')!
        const distance = () => track.scrollWidth - window.innerWidth
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-timeline]',
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        })
        gsap.to('[data-track-progress]', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: '[data-timeline]', start: 'top top', end: () => `+=${distance()}`, scrub: true, invalidateOnRefresh: true },
        })
        gsap.utils.toArray<HTMLElement>('[data-milestone] [data-ms-img] img').forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -8, scale: 1.18 },
            {
              xPercent: 8,
              ease: 'none',
              scrollTrigger: { trigger: img.closest('[data-milestone]'), containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
            },
          )
        })
      })

      mm.add(MQ.mobile, () => {
        gsap.utils.toArray<HTMLElement>('[data-milestone]').forEach((m) => {
          gsap.from(m, { y: 40, autoAlpha: 0, duration: 1.1, scrollTrigger: { trigger: m, start: 'top 88%', once: true } })
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative bg-paper-2" aria-labelledby="impact-title">
      <div className="shell py-24 md:py-36">
        <Eyebrow index="05" className="text-ember">
          Impact and Long-Term Vision
        </Eyebrow>

        <div className="mt-10 grid gap-12 lg:grid-cols-12">
          <figure className="lg:col-span-8">
            <SplitReveal as="blockquote" className="t-h1 text-ink" id="impact-title">
              “Markets turn and fashions change. A spread of good businesses, held patiently, is the best protection we know against both.”
            </SplitReveal>
            <figcaption className="mt-8 flex items-center gap-4 text-sm text-stone">
              <span className="h-px w-10 bg-current" aria-hidden="true" />
              <span>
                <span className="font-semibold text-ink">Thomas Hale</span>, Board Chair, Oakhaven Holdings
              </span>
            </figcaption>
          </figure>
          <div className="lg:col-span-4 lg:pt-3">
            <p className="text-lg text-ink/80">
              We exist to grow the Trust’s endowment, pay a reliable distribution to its members every year, and create good jobs within
              reach of the valley where it all began.
            </p>
          </div>
        </div>

        <dl data-facts className="mt-20 grid grid-cols-2 border-t border-ink/15 lg:grid-cols-4">
          {FACTS.map((f) => {
            const num = parseInt(f.value, 10)
            const suffix = f.value.replace(String(num), '')
            return (
              <div key={f.label} data-fact className="border-b border-ink/15 py-8 pr-6 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0">
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="t-num block text-[clamp(3.25rem,6vw,6rem)] leading-none text-ink" data-count={num} data-suffix={suffix}>
                    {f.value}
                  </span>
                  <span className="mt-4 block font-semibold text-ink">{f.label}</span>
                  <span className="mt-1 block text-xs text-stone">{f.source}</span>
                </dd>
              </div>
            )
          })}
        </dl>
      </div>

      {/* Milestones */}
      <div data-timeline data-surface="dark" className="relative overflow-hidden bg-ink text-paper lg:h-[100svh]">
        <div className="shell flex items-end justify-between gap-6 pt-20 lg:absolute lg:inset-x-0 lg:top-0 lg:pt-[calc(var(--header-h)+2.5rem)]">
          <h3 className="t-h2">
            Milestones, <span className="italic-accent text-gold">2009 to today</span>
          </h3>
          <p className="hidden text-sm text-paper/50 lg:block">Scroll to travel through time</p>
        </div>

        <ol data-track className="flex flex-col gap-14 px-[var(--gutter)] py-16 lg:h-full lg:w-max lg:flex-row lg:items-start lg:gap-[4vw] lg:pb-[14vh] lg:pt-[calc(var(--header-h)+8.5rem)]">
          {MILESTONES.map((m) => (
            <li key={m.year} data-milestone className="relative lg:w-[30vw] lg:max-w-[460px] lg:shrink-0">
              {m.image ? (
                <div data-ms-img className="mb-6 aspect-[4/3] overflow-hidden rounded-[4px] lg:aspect-[16/11]">
                  <Img id={m.image} alt="" sizes="(min-width:1024px) 30vw, 100vw" className="h-full w-full" />
                </div>
              ) : (
                <div aria-hidden="true" className="mb-6 hidden aspect-[16/11] place-items-center rounded-[4px] border border-paper/12 lg:grid">
                  <Rings className="w-1/3 text-gold/25" />
                </div>
              )}
              <p className="t-num text-[clamp(3.5rem,6vw,6.5rem)] leading-none text-gold">{m.year}</p>
              <h4 className="mt-4 font-display text-2xl">{m.title}</h4>
              <p className="mt-3 max-w-md text-paper/70">{m.text}</p>
            </li>
          ))}
          <li className="flex items-center lg:h-[60%] lg:w-[22vw] lg:shrink-0" aria-hidden="true">
            <p className="font-display text-[clamp(2rem,3vw,3rem)] italic leading-tight text-paper/40">And the generations still to come.</p>
          </li>
        </ol>
        <div className="absolute inset-x-[var(--gutter)] bottom-[8vh] hidden h-px bg-paper/15 lg:block">
          <div data-track-progress className="h-full origin-left scale-x-0 bg-gold" />
        </div>
      </div>

      {/* Economic Impact Study callout */}
      <div className="shell py-24 md:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <MotionImage id="report-cover" alt="Cover of the 2026 Oakhaven Community Impact Report" className="aspect-[773/1000] max-w-md rounded-[4px] shadow-[0_40px_80px_-40px_rgb(20_24_26/0.5)]" reveal="center" parallax={6} sizes="(min-width:1024px) 35vw, 90vw" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="t-eyebrow text-ember">Published every spring</p>
            <h3 className="t-h1 mt-6">The 2026 Community Impact Report</h3>
            <p className="mt-6 text-lg text-ink/80">
              Our yearly account to the Trust’s members: what the portfolio earned, what it paid out, and what it meant for the towns where
              our companies work. Last year that added up to $312 million in total economic impact.
            </p>
            <p className="mt-3 text-xs text-stone">
              Direct, indirect and induced effects across the portfolio, fiscal year 2025.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Button to="/impact-report" variant="ink">
                Read the Report
              </Button>
              <ArrowLink to="/news/community-impact-report-2026" className="text-ink">
                Read the news
              </ArrowLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
