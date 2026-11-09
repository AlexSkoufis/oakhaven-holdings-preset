import { useRef } from 'react'
import { Seo } from '../components/Seo'
import { TypeHero } from '../components/PageHero'
import { MotionImage } from '../components/MotionImage'
import { Button, Eyebrow, FadeIn, SplitReveal, ArrowLink } from '../components/ui'
import { Related } from '../components/Related'
import { gsap, useGSAP, MQ } from '../lib/gsap'

// Headline figures from the yearly Community Impact Report. Demo content.
const FINDINGS = [
  { value: 312, prefix: '$', suffix: 'M', label: 'Total economic impact in fiscal 2025, including direct, indirect and induced effects' },
  { value: 24, label: 'Companies with full or majority ownership' },
  { value: 268, prefix: '$', suffix: 'M', label: 'Combined revenue across the portfolio' },
  { value: 1042, label: 'People employed directly', comma: true },
  { value: 9.6, prefix: '$', suffix: 'M', decimals: 1, label: 'Distributed to the Trust for its members' },
  { value: 14, suffix: ' yrs', label: 'Consecutive years of distributions' },
]

const fmt = (v: number, f: (typeof FINDINGS)[number]) =>
  (f.prefix ?? '') + (f.comma ? Math.round(v).toLocaleString('en-US') : v.toFixed(f.decimals ?? 0)) + (f.suffix ?? '')

export default function ImpactReport() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        gsap.utils.toArray<HTMLElement>('[data-finding]').forEach((el, i) => {
          const f = FINDINGS[i]
          const num = el.querySelector('[data-num]')!
          const o = { v: 0 }
          gsap.to(o, {
            v: f.value,
            duration: 2,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            onUpdate: () => {
              num.textContent = fmt(o.v, f)
            },
          })
          gsap.from(el, { y: 40, autoAlpha: 0, duration: 1.1, delay: (i % 3) * 0.08, scrollTrigger: { trigger: el, start: 'top 90%', once: true } })
        })
      })
    },
    { scope: root },
  )

  return (
    <>
      <Seo
        title="Community Impact Report"
        description="Oakhaven's yearly account to the members of the Alder Valley Community Trust: what the portfolio earned, paid out and meant for our towns."
      />
      <TypeHero
        eyebrow="Research"
        crumbs={[{ label: 'Insights', to: '/news' }, { label: 'Community Impact Report' }]}
        title={
          <>
            Counting what <span className="italic-accent text-ember">matters.</span>
          </>
        }
        intro="Every spring we report to the Trust’s members on what the portfolio earned, what it paid out, and what it meant for the towns where our companies work."
        aside={
          <div className="mt-8">
            <Button to="/contact" variant="ink">
              Request the full report
            </Button>
          </div>
        }
      />

      <section ref={root} data-surface="dark" className="bg-ink py-24 text-paper md:py-32" aria-labelledby="eis-findings">
        <div className="shell">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Eyebrow className="text-gold">Key figures, fiscal 2025</Eyebrow>
              <h2 id="eis-findings" className="t-h1 mt-6">
                One portfolio, many towns.
              </h2>
            </div>
            <p className="text-sm text-paper/60 md:col-span-4 md:col-start-9">
              Figures cover Oakhaven and every company it owns outright or in majority, for the year to December 31, 2025.
            </p>
          </div>
          <dl className="mt-16 grid border-t border-paper/15 sm:grid-cols-2 lg:grid-cols-3">
            {FINDINGS.map((f) => (
              <div key={f.label} data-finding className="border-b border-paper/15 py-10 sm:pr-8">
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span data-num className="t-num block text-[clamp(3.5rem,7vw,6.5rem)] leading-none text-gold">
                    {fmt(f.value, f)}
                  </span>
                  <span className="mt-4 block max-w-xs text-paper/75">{f.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-paper py-24 md:py-36" aria-labelledby="eis-about">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <MotionImage id="report-cover" alt="Cover of the 2026 Oakhaven Community Impact Report" className="aspect-[773/1000] max-w-md rounded-[4px] shadow-[0_40px_80px_-40px_rgb(20_24_26/0.5)]" reveal="center" sizes="(min-width:1024px) 35vw, 90vw" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Eyebrow className="text-ember">About the report</Eyebrow>
            <SplitReveal id="eis-about" className="t-h1 mt-8">
              An honest account, every year.
            </SplitReveal>
            <FadeIn className="mt-8 space-y-5 text-lg text-ink/80" stagger={0.1}>
              <p>
                The first report, in 2013, was four typed pages handed out at the Trust’s annual meeting. It has grown since, but its purpose
                has not: to show the owners exactly what their money is doing.
              </p>
              <p>
                The report covers every company and property in the portfolio, the distribution paid to the Trust, wages and local spending,
                and the mistakes we made and what we learned from them.
              </p>
              <p>
                The economic impact figures are prepared each year by an independent analyst using a standard input-output model, and the
                financial statements are audited.
              </p>
            </FadeIn>
            <ArrowLink to="/news/community-impact-report-2026" className="mt-10 text-ink">
              Read the announcement
            </ArrowLink>
          </div>
        </div>
      </section>

      <section className="bg-paper-2 py-24 md:py-32" aria-label="Voices">
        <div className="shell grid gap-16 lg:grid-cols-2">
          <FadeIn as="figure">
            <blockquote className="t-h2">
              “The Trust paid for my first year of college. Now I work at one of the companies it owns, a few miles from the farm I grew up on.”
            </blockquote>
            <figcaption className="mt-6 text-sm">
              <span className="font-semibold">Jenna Holloway</span>
              <span className="text-stone">, Trust member and quality engineer, Hollis Precision</span>
            </figcaption>
          </FadeIn>
          <FadeIn as="figure" delay={0.15}>
            <blockquote className="t-h2">
              “Our grandparents could have split the money in 1998. They chose to keep it working for us instead.”
            </blockquote>
            <figcaption className="mt-6 text-sm">
              <span className="font-semibold">Thomas Hale</span>
              <span className="text-stone">, Board Chair, Oakhaven Holdings</span>
            </figcaption>
          </FadeIn>
        </div>
      </section>

      <Related
        items={[
          { kicker: 'Learn', label: 'Member Opportunities', to: '/member-opportunities' },
          { kicker: 'Insights', label: 'News', to: '/news' },
        ]}
      />
    </>
  )
}
