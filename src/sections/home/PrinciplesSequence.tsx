import { useRef } from 'react'
import { PRINCIPLES, SEASONS } from '../../data/principles'
import { gsap, useGSAP, MQ, SplitText, ScrollTrigger, SPLIT } from '../../lib/gsap'
import { ArrowLink, Eyebrow } from '../../components/ui'
import { useSmoothScroll } from '../../lib/smooth-scroll'

// Quiet seasonal washes, one per season of the farming year.
const WASH: Record<string, string> = {
  Spring: '#25301f',
  Summer: '#352a17',
  Fall: '#3a2116',
  Winter: '#1a222b',
}

const direction = (season: string) => SEASONS.find((s) => s.season === season)?.direction ?? ''

export function PrinciplesSequence() {
  const root = useRef<HTMLElement>(null)
  const stRef = useRef<ScrollTrigger | null>(null)
  const { scrollTo } = useSmoothScroll()

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(MQ.desktop, () => {
        const slides = gsap.utils.toArray<HTMLElement>('[data-t-slide]')
        const steps = gsap.utils.toArray<HTMLElement>('[data-t-step]')
        gsap.set('[data-t-stage]', { display: 'block' })
        // The list stays available to assistive technology while the visual sequence runs.
        const list = root.current!.querySelector('[data-t-list]')!
        list.classList.add('sr-only')
        const splits = slides.map((s) => SplitText.create(s.querySelector('[data-t-word]'), { ...SPLIT, type: 'chars', mask: 'chars' }))
        gsap.set(slides.slice(1), { autoAlpha: 0 })

        const mark = (i: number) =>
          steps.forEach((s, j) => {
            s.toggleAttribute('data-active', j === i)
            s.toggleAttribute('data-past', j < i)
          })
        mark(0)

        const tl = gsap.timeline({
          defaults: { ease: 'power3.inOut' },
          scrollTrigger: {
            trigger: '[data-t-stage]',
            start: 'top top',
            end: `+=${(slides.length - 1) * 55}%`,
            pin: true,
            scrub: 0.7,
            anticipatePin: 1,
            snap: { snapTo: 'labels', duration: { min: 0.25, max: 0.8 }, ease: 'power2.inOut', delay: 0.05 },
            onUpdate: (self) => mark(Math.round(self.progress * (slides.length - 1))),
          },
        })
        stRef.current = tl.scrollTrigger ?? null

        tl.addLabel('t0')
        slides.slice(1).forEach((slide, k) => {
          const prev = slides[k]
          const i = k + 1
          const at = `t${k}+=0.05`
          tl.to(splits[k].chars, { yPercent: -140, stagger: 0.02, duration: 0.5 }, at)
            .to(prev.querySelectorAll('[data-t-fade]'), { autoAlpha: 0, y: -20, duration: 0.35 }, at)
            .set(prev, { autoAlpha: 0 })
            .set(slide, { autoAlpha: 1 })
            .from(splits[i].chars, { yPercent: 140, stagger: 0.02, duration: 0.5 })
            .from(slide.querySelectorAll('[data-t-fade]'), { autoAlpha: 0, y: 24, stagger: 0.05, duration: 0.4 }, '<0.15')
            .to('[data-t-bg]', { backgroundColor: WASH[PRINCIPLES[i].season], duration: 0.6 }, at)
            .to('[data-t-progress]', { scaleX: i / (slides.length - 1), duration: 0.6, ease: 'none' }, at)
            .addLabel(`t${i}`, '+=0.1')
        })

        return () => {
          list.classList.remove('sr-only')
          splits.forEach((s) => s.revert())
          stRef.current = null
        }
      })

      mm.add(MQ.mobile, () => {
        gsap.utils.toArray<HTMLElement>('[data-t-item]').forEach((item) => {
          gsap.from(item.querySelectorAll('[data-t-in]'), {
            yPercent: 40,
            autoAlpha: 0,
            stagger: 0.06,
            duration: 1.2,
            scrollTrigger: { trigger: item, start: 'top 82%', once: true },
          })
        })
      })

      mm.add(MQ.motion, () => {
        gsap.from('[data-t-quote] > *', {
          y: 30,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 1.4,
          scrollTrigger: { trigger: '[data-t-quote]', start: 'top 80%', once: true },
        })
      })
    },
    { scope: root },
  )

  const goTo = (i: number) => {
    const st = stRef.current
    if (st) scrollTo(st.labelToScroll(`t${i}`) + 2)
  }

  return (
    <section ref={root} data-surface="dark" className="relative bg-ink text-paper" aria-labelledby="teachings-title">
      <div className="shell py-24 md:py-36">
        <div data-t-quote className="mx-auto max-w-5xl text-center">
          <Eyebrow index="04" className="justify-center text-gold">
            Seven Principles
          </Eyebrow>
          <h2 id="teachings-title" className="t-h1 mt-10">
            “Each of these must be kept with the rest.”
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-paper/70 md:text-lg">
            Patience, Stewardship, Candour, Courage, Thrift, Kinship and Humility. Written on the back of a dairy ledger in 1952, they still
            guide every decision we make.
          </p>
        </div>
      </div>

      {/* Desktop pinned sequence */}
      <div data-t-stage className="relative hidden h-[100svh] overflow-hidden" aria-hidden="true">
        <div data-t-bg className="absolute inset-0" style={{ backgroundColor: WASH.Spring }} />
        <div className="grain absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgb(20_24_26/0.75)_100%)]" />

        {PRINCIPLES.map((t, i) => (
          <div key={t.id} data-t-slide className="absolute inset-0 flex flex-col items-center justify-center px-[var(--gutter)] text-center">
            <p data-t-fade className="t-eyebrow text-paper/60">
              {String(i + 1).padStart(2, '0')} of 07 · {t.season} · {direction(t.season)}
            </p>
            <p data-t-fade className="mt-6 font-display text-[clamp(1.5rem,2.4vw,2.4rem)] italic text-gold">
              {t.word}
            </p>
            <p data-t-word className="t-mega mt-2 !text-[clamp(5rem,13vw,14rem)]">
              {t.name}
            </p>
            <p data-t-fade className="t-h3 mt-8 max-w-[34ch] text-paper/85">
              {t.line}
            </p>
          </div>
        ))}

        <div className="absolute inset-x-0 bottom-0 pb-8">
          <div className="shell">
            <div className="relative h-px bg-paper/15">
              <div data-t-progress className="absolute inset-0 origin-left scale-x-0 bg-gold" />
            </div>
            {/* Pointer shortcut between teachings; keyboard users scroll normally. */}
            <ol className="grid grid-cols-7 pt-4">
              {PRINCIPLES.map((t, i) => (
                <li key={t.id}>
                  <button
                    type="button"
                    tabIndex={-1}
                    data-t-step
                    onClick={() => goTo(i)}
                    className="group flex w-full flex-col items-start gap-1 text-left text-paper/45 transition-colors hover:text-paper data-[active]:text-paper data-[past]:text-paper/70"
                  >
                    <span className="t-num text-sm">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-sm font-semibold">{t.name}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Mobile, tablet, and reduced motion: an editorial list */}
      <ol data-t-list className="shell grid gap-px pb-24">
        {PRINCIPLES.map((t, i) => (
          <li
            key={t.id}
            data-t-item
            className="relative overflow-hidden border-t border-paper/12 py-12"
            style={{ background: `linear-gradient(180deg, ${WASH[t.season]}55, transparent)` }}
          >
            <div className="text-reveal">
              <p data-t-in className="t-eyebrow text-paper/55">
                {String(i + 1).padStart(2, '0')} · {t.season} · {direction(t.season)}
              </p>
            </div>
            <div className="text-reveal mt-4">
              <p data-t-in className="font-display text-xl italic text-gold">
                {t.word}
              </p>
            </div>
            <div className="text-reveal">
              <h3 data-t-in className="t-display">
                {t.name}
              </h3>
            </div>
            <p data-t-in className="mt-4 max-w-xl text-paper/80 md:text-lg">
              {t.line}
            </p>
          </li>
        ))}
      </ol>

      <div className="shell flex flex-col items-start justify-between gap-6 border-t border-paper/12 py-10 md:flex-row md:items-center">
        <p className="max-w-xl text-sm text-paper/60">
          Written by the eleven founding families of the Alder Valley Cooperative, 1952.
        </p>
        <ArrowLink to="/our-roots/principles" className="text-gold">
          Explore the Seven Principles
        </ArrowLink>
      </div>
    </section>
  )
}
