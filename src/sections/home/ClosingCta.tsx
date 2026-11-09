import { useRef } from 'react'
import { gsap, useGSAP, MQ, SplitText, SPLIT } from '../../lib/gsap'
import { Img } from '../../components/Img'
import { ArrowLink, Button } from '../../components/ui'

export function ClosingCta({
  title = (
    <>
      Build what lasts <span className="italic-accent text-gold">with us.</span>
    </>
  ),
  body = 'We are always looking for established, profitable businesses and buildings to look after. If you are thinking about selling, or have a partnership in mind, we would like to hear from you.',
  image = 'skyline',
}: {
  title?: React.ReactNode
  body?: string
  image?: string
}) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        const split = SplitText.create('[data-cta-title]', { ...SPLIT, type: 'lines', mask: 'lines' })
        gsap.from(split.lines, {
          yPercent: 140,
          stagger: 0.1,
          duration: 1.4,
          scrollTrigger: { trigger: root.current, start: 'top 65%', once: true },
        })
        gsap.fromTo(
          '[data-cta-img]',
          { scale: 1.25, yPercent: -10 },
          { scale: 1, yPercent: 10, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } },
        )
        gsap.fromTo(
          '[data-cta-frame]',
          { clipPath: 'inset(8% 6% 8% 6% round 24px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 0px)',
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top 20%', scrub: true },
          },
        )
        return () => split.revert()
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} data-surface="dark" className="relative bg-ink text-paper" aria-labelledby="cta-title">
      <div data-cta-frame className="relative flex min-h-[100svh] items-center overflow-hidden">
        <div data-cta-img className="absolute inset-0">
          <Img id={image} alt="" sizes="100vw" className="h-full w-full" />
        </div>
        <div className="absolute inset-0 bg-ink/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_100%,rgb(232_154_63/0.28),transparent_60%)]" />

        <div className="shell relative py-32">
          <h2 id="cta-title" data-cta-title className="t-mega max-w-[12ch]">
            {title}
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-12 md:items-end">
            <p className="t-lead text-paper/85 md:col-span-6">{body}</p>
            <div className="flex flex-wrap items-center gap-6 md:col-span-5 md:col-start-8 md:justify-end">
              <Button to="/contact" variant="gold" size="lg">
                Get in Touch
              </Button>
              <ArrowLink to="/careers" className="text-paper">
                Explore careers
              </ArrowLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
