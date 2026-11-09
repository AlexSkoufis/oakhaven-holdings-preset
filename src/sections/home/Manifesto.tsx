import { useRef } from 'react'
import { gsap, useGSAP, MQ, SplitText, SPLIT } from '../../lib/gsap'
import { ArrowLink, Eyebrow } from '../../components/ui'

const STATEMENT =
  'We are farmers’ grandchildren with balance sheets: operators and investors who still judge a decision by whether the people who inherit it will thank us.'

export function Manifesto() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
        const { desktop } = ctx.conditions as { desktop: boolean; mobile: boolean }
        const split = SplitText.create('[data-statement]', { ...SPLIT, type: 'words' })

        // Words ink in as the reader scrolls: a reading-pace reveal.
        const tl = gsap.timeline({
          scrollTrigger: desktop
            ? { trigger: '[data-pin]', start: 'top top', end: '+=140%', scrub: 0.6, pin: true, anticipatePin: 1 }
            : { trigger: '[data-statement]', start: 'top 80%', end: 'bottom 45%', scrub: 0.6 },
        })
        tl.fromTo(split.words, { opacity: 0.14 }, { opacity: 1, stagger: 0.12, ease: 'none', duration: 1 })
        tl.from('[data-coda]', { y: 40, autoAlpha: 0, duration: 2, ease: 'power3.out' }, '-=1.2')

        return () => split.revert()
      })
    },
    { scope: root },
  )

  return (
    <section id="manifesto" ref={root} className="relative bg-paper" aria-labelledby="manifesto-title">
      <div data-pin className="relative flex min-h-[100svh] items-center overflow-hidden py-24 lg:py-0">

        <div className="shell relative">
          <div className="mx-auto max-w-[1180px]">
            <Eyebrow index="01" className="text-ember">
              Who We Are
            </Eyebrow>
            <h2 id="manifesto-title" className="sr-only">
              Investing for generations
            </h2>
            <p data-statement className="t-h1 mt-10 !leading-[1.08] text-ink">
              {STATEMENT}
            </p>

            <div data-coda className="mt-14 grid gap-10 md:grid-cols-12 md:items-end">
              <p className="t-h3 italic-accent text-ember md:col-span-7">
                We are not building for the next quarter. We are building something worth inheriting.
              </p>
              <div className="md:col-span-5 md:justify-self-end">
                <p className="max-w-sm text-stone">
                  Formed in 2009 to grow and diversify the endowment of the Alder Valley Community Trust, and to create good work close to home.
                </p>
                <ArrowLink to="/who-we-are" className="mt-5 text-ink">
                  Read our story
                </ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
