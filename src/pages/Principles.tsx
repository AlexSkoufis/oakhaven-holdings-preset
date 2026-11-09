import { useRef } from 'react'
import { Seo } from '../components/Seo'
import { Breadcrumbs } from '../components/PageHero'
import { useHeroTheme } from '../components/header-theme'
import { Eyebrow, FadeIn, SplitReveal } from '../components/ui'
import { Related } from '../components/Related'
import { PRINCIPLES, PRINCIPLES_STORY, SEASONS } from '../data/principles'
import { gsap, useGSAP, MQ, SplitText, SPLIT } from '../lib/gsap'

export default function Principles() {
  useHeroTheme('dark')
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        const split = SplitText.create('[data-tg-title]', { ...SPLIT, type: 'lines', mask: 'lines' })
        const tl = gsap.timeline({ delay: 0.15, defaults: { ease: 'expo.out' } })
        tl.from(split.lines, { yPercent: 140, stagger: 0.1, duration: 1.5 })
          .from('[data-tg-word]', { autoAlpha: 0, y: 20, stagger: 0.07, duration: 1 }, '<0.4')
          .from('[data-tg-fade]', { autoAlpha: 0, y: 20, duration: 1 }, '<0.2')

        // Each teaching's name drifts across the viewport as it is read.
        gsap.utils.toArray<HTMLElement>('[data-tg-giant]').forEach((el, i) => {
          gsap.fromTo(
            el,
            { xPercent: i % 2 ? -12 : 12 },
            {
              xPercent: i % 2 ? 4 : -4,
              ease: 'none',
              scrollTrigger: { trigger: el.closest('[data-tg-block]'), start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        })
        return () => split.revert()
      })
    },
    { scope: root },
  )

  return (
    <div ref={root}>
      <Seo
        title="Seven Principles"
        description="Patience, Stewardship, Candour, Courage, Thrift, Kinship and Humility: the seven principles that guide Oakhaven."
      />

      <section data-surface="dark" className="relative overflow-hidden bg-ink text-paper">
        <div className="grain absolute inset-0" />
        <div className="shell relative pb-20 pt-[calc(var(--header-h)+6rem)] md:pb-28 md:pt-[calc(var(--header-h)+8rem)]">
          <div data-tg-fade>
            <Breadcrumbs items={[{ label: 'Our Roots' }, { label: 'Seven Principles' }]} light />
          </div>
          <h1 data-tg-title className="t-mega mt-12 max-w-[11ch]">
            Seven <span className="italic-accent text-gold">Principles.</span>
          </h1>
          <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-3" aria-label="The seven principles">
            {PRINCIPLES.map((t) => (
              <li key={t.id} data-tg-word>
                <a href={`#${t.id}`} className="group inline-flex items-baseline gap-2 text-paper/70 hover:text-paper">
                  <span className="font-display text-2xl">{t.name}</span>
                  <span className="text-sm italic text-gold/70 group-hover:text-gold">{t.word}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The story */}
      <section className="bg-paper py-24 md:py-36" aria-labelledby="tg-story">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow className="text-ember">The story</Eyebrow>
            <h2 id="tg-story" className="t-h2 mt-8">
              Written on the back of a dairy ledger, in 1952.
            </h2>
          </div>
          <FadeIn className="space-y-6 text-lg leading-relaxed text-ink/85 lg:col-span-7 lg:col-start-6" stagger={0.1}>
            {PRINCIPLES_STORY.map((p, i) => (
              <p key={i} className={i === 0 ? 'first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-7xl first-letter:leading-[0.85] first-letter:text-ember' : ''}>
                {p}
              </p>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* Seven moments */}
      <div data-surface="dark" className="bg-ink text-paper">
        {PRINCIPLES.map((t, i) => {
          const season = SEASONS.find((s) => s.season === t.season)!
          return (
            <section
              key={t.id}
              id={t.id}
              data-tg-block
              className="relative overflow-hidden border-b border-paper/10 py-20 md:py-32"
              aria-labelledby={`${t.id}-title`}
            >
              <p
                data-tg-giant
                aria-hidden="true"
                className="pointer-events-none select-none whitespace-nowrap font-display text-[clamp(7rem,24vw,24rem)] font-light leading-none tracking-[-0.05em] text-paper/[0.05]"
              >
                {t.name}
              </p>
              <div className="shell relative -mt-[clamp(4rem,12vw,12rem)] grid gap-10 lg:grid-cols-12">
                <div className={`lg:col-span-5 ${i % 2 ? 'lg:col-start-8' : ''}`}>
                  <p className="t-eyebrow text-paper/55">
                    {String(i + 1).padStart(2, '0')} · {season.season} · {season.direction}
                  </p>
                  <p className="mt-6 font-display text-3xl italic text-gold">{t.word}</p>
                  <SplitReveal id={`${t.id}-title`} className="t-display mt-2">
                    {t.name}
                  </SplitReveal>
                  <FadeIn className="mt-8 space-y-5 text-lg text-paper/80" stagger={0.1}>
                    {t.text.map((p) => (
                      <p key={p.slice(0, 24)}>{p}</p>
                    ))}
                  </FadeIn>
                </div>
              </div>
            </section>
          )
        })}
      </div>

      {/* Seasons */}
      <section className="bg-paper-2 py-24 md:py-32" aria-labelledby="tg-seasons">
        <div className="shell">
          <Eyebrow className="text-ember">The farming year</Eyebrow>
          <SplitReveal id="tg-seasons" className="t-h1 mt-8 max-w-[22ch]">
            Each principle belongs to a season of the work.
          </SplitReveal>
          <FadeIn as="ul" className="mt-14 grid gap-px overflow-hidden rounded-[6px] border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {SEASONS.map((s) => (
              <li key={s.season} className="bg-paper p-7">
                <p className="t-eyebrow text-stone">{s.direction}</p>
                <p className="t-h2 mt-3">{s.season}</p>
                <p className="mt-4 text-sm text-ink/75">{s.honor}</p>
                <p className="mt-4 font-display italic text-ember">
                  {PRINCIPLES.filter((t) => t.season === s.season)
                    .map((t) => t.name)
                    .join(' and ')}
                </p>
              </li>
            ))}
          </FadeIn>
          <p className="mt-14 max-w-3xl text-sm text-stone">
            The original ledger is on display in the lobby of the Hartwell Building, open to visitors on weekdays.
          </p>
        </div>
      </section>

      <Related
        items={[
          { kicker: 'Our roots', label: 'Our History', to: '/our-roots/history' },
          { kicker: 'Our principles in practice', label: 'Who We Are', to: '/who-we-are' },
        ]}
      />
    </div>
  )
}
