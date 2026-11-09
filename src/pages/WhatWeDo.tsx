import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Seo } from '../components/Seo'
import { TypeHero } from '../components/PageHero'
import { Img } from '../components/Img'
import { Button, Eyebrow, FadeIn, SplitReveal } from '../components/ui'
import { DIVISIONS } from '../data/divisions'
import { CompanyIndex } from '../components/CompanyIndex'

// Acquisition criteria. Demo content: set your own.
const CRITERIA = [
  {
    label: 'A. Target industries',
    items: ['Precision manufacturing', 'Business and federal services', 'Industrial real estate'],
    note: 'We look at good businesses in other industries too.',
  },
  {
    label: 'B. Locations',
    items: ['Industrial: the Great Lakes states', 'Federal: nationwide'],
  },
  {
    label: 'C. Other',
    items: [
      'EBITDA of $2M to $12M',
      'A good name with customers',
      'Leaders who want to stay',
      'Values that fit our seven principles',
    ],
    note: 'We do not make speculative bets, and we pass on businesses that harm the land or the people around them.',
  },
]

export default function WhatWeDo() {
  return (
    <>
      <Seo
        title="What We Do"
        description="Oakhaven's Industrial, Federal and Real Estate groups, and what we look for in an acquisition."
      />
      <TypeHero
        eyebrow="What We Do"
        crumbs={[{ label: 'What We Do' }]}
        title={
          <>
            Diversified by <span className="italic-accent text-ember">design.</span>
          </>
        }
        intro="We buy established, profitable businesses and buildings at a fair price, and we keep them. Spreading the Trust’s capital across three groups is how we protect it."
      />

      <section className="bg-paper pb-24 md:pb-36" aria-label="Groups">
        <div className="shell">
          <ul className="border-t border-ink/15">
            {DIVISIONS.map((d) => (
              <li key={d.id} className="border-b border-ink/15">
                <Link to={d.to} className="group grid items-center gap-6 py-8 md:grid-cols-12 md:py-10">
                  <span className="t-num text-5xl text-ember md:col-span-1 md:text-6xl">{d.index}</span>
                  <span className="md:col-span-5">
                    <span className="t-h1 block transition-transform duration-700 ease-[var(--ease-out)] group-hover:translate-x-3">{d.name}</span>
                    <span className="mt-2 block text-stone">{d.kicker}</span>
                  </span>
                  <span className="relative hidden aspect-[16/10] overflow-hidden rounded-[4px] md:col-span-3 md:block">
                    <Img
                      id={d.image}
                      alt=""
                      sizes="25vw"
                      position={d.position}
                      className="h-full w-full scale-110 grayscale transition-all duration-[1.2s] ease-[var(--ease-out)] [clip-path:inset(12%_12%_12%_12%)] group-hover:scale-100 group-hover:grayscale-0 group-hover:[clip-path:inset(0%_0%_0%_0%)]"
                    />
                  </span>
                  <span className="flex items-center justify-between gap-6 md:col-span-3 md:justify-end">
                    <span className="max-w-xs text-sm text-ink/70 md:hidden">{d.summary}</span>
                    <span className="grid size-14 shrink-0 place-items-center rounded-full border border-ink/20 transition-all duration-500 group-hover:-rotate-45 group-hover:bg-ink group-hover:text-paper md:size-16">
                      <ArrowRight className="size-5" aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section data-surface="dark" className="bg-ink py-24 text-paper md:py-36" aria-labelledby="criteria-title">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow className="text-gold">Selling a business?</Eyebrow>
            <SplitReveal id="criteria-title" className="t-h1 mt-8">
              We would like to hear from you.
            </SplitReveal>
            <FadeIn>
              <p className="mt-8 text-lg text-paper/75">
                Tell us about the business or property you are thinking of selling and we will tell you, quickly and plainly, whether it fits.
                This is what we look for.
              </p>
              <div className="mt-10">
                <Button to="/contact" variant="gold">
                  Get in Touch
                </Button>
              </div>
            </FadeIn>
          </div>
          <FadeIn className="grid gap-px overflow-hidden rounded-[6px] bg-paper/10 lg:col-span-6 lg:col-start-7" stagger={0.1}>
            {CRITERIA.map((c) => (
              <div key={c.label} className="bg-ink-2 p-7 md:p-9">
                <h3 className="t-eyebrow text-gold">{c.label}</h3>
                <ul className="mt-5 space-y-2">
                  {c.items.map((it) => (
                    <li key={it} className="flex items-baseline gap-3 font-display text-2xl tracking-tight">
                      <span aria-hidden="true" className="size-1.5 shrink-0 translate-y-[-0.2em] rounded-full bg-amber" />
                      {it}
                    </li>
                  ))}
                </ul>
                {c.note && <p className="mt-5 text-sm text-paper/60">{c.note}</p>}
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      <section className="bg-paper py-24 md:py-36" aria-labelledby="portfolio-title">
        <div className="shell">
          <Eyebrow className="text-ember">Explore the portfolio</Eyebrow>
          <SplitReveal id="portfolio-title" className="t-display mt-8 max-w-[16ch]">
            The family of companies.
          </SplitReveal>
          <div className="mt-14">
            <CompanyIndex />
          </div>
        </div>
      </section>
    </>
  )
}
