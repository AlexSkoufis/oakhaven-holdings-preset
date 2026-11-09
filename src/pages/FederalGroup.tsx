import { Seo } from '../components/Seo'
import { ImageHero } from '../components/PageHero'
import { CompanyIndex } from '../components/CompanyIndex'
import { Button, Eyebrow, FadeIn, SplitReveal } from '../components/ui'
import { RelatedNews } from '../components/RelatedNews'
import { Related } from '../components/Related'

// Federal Group capabilities, clients and reasons to choose us. Demo content.
const CAPABILITIES = [
  'Facilities Operations and Maintenance',
  'Environmental Assessment and Remediation',
  'Mission Software and Systems Integration',
  'IT Operations and Cybersecurity',
  'Program and Financial Management',
]

const AGENCIES = [
  'Research laboratories',
  'Defense installations',
  'Civilian agencies',
  'Environmental programmes',
  'Veterans’ services',
  'Federal lending programmes',
  'Space and aviation',
  'Public housing',
]

const ADVANTAGES = [
  {
    title: 'Small-business agility',
    text: 'Each Federal Group company is a small business with a single point of contact, quick decisions and leaders who answer their own phones.',
  },
  {
    title: 'A larger family behind us',
    text: 'Shared finance, HR, IT and security from Oakhaven mean our companies can take on work that would stretch a standalone firm.',
  },
  {
    title: 'People who stay',
    text: 'Staff retention above 90 percent across our contracts, so the people who learn a site are the people who keep running it.',
  },
  {
    title: 'Cleared and certified',
    text: 'Cleared personnel, an ISO 9001 quality system and CMMC-ready IT, maintained centrally across every company.',
  },
]

export default function FederalGroup() {
  return (
    <>
      <Seo
        title="Federal Group"
        description="Oakhaven's Federal Group delivers facilities operations, environmental services, software and IT to federal agencies nationwide."
      />
      <ImageHero
        eyebrow="02 · Federal Group"
        title={
          <>
            Trusted on site, <span className="italic-accent text-gold">year after year.</span>
          </>
        }
        intro="Small businesses with the depth of a larger family behind them, serving research sites, installations and civilian agencies across the country."
        image="prop-office"
        imageAlt="A brick civic office building on a street corner"
        crumbs={[{ label: 'What We Do', to: '/what-we-do' }, { label: 'Federal Group' }]}
      >
        <Button to="/contact" variant="paper">
          Talk to our federal team
        </Button>
      </ImageHero>

      <section className="bg-paper py-24 md:py-36" aria-labelledby="fed-cap">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow className="text-ember">What we do</Eyebrow>
            <SplitReveal id="fed-cap" className="t-h1 mt-8">
              From the boiler room to the server room.
            </SplitReveal>
            <FadeIn>
              <p className="mt-8 text-lg text-ink/80">
                Our companies keep federal sites running, clean them up, write the software they depend on and protect the networks
                underneath it.
              </p>
            </FadeIn>
          </div>
          <FadeIn as="ol" className="border-t border-ink/15 lg:col-span-6 lg:col-start-7" stagger={0.07}>
            {CAPABILITIES.map((c, i) => (
              <li key={c} className="group flex items-baseline gap-6 border-b border-ink/15 py-6">
                <span className="t-num text-lg text-ember">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-display text-2xl tracking-tight transition-transform duration-500 group-hover:translate-x-2 md:text-3xl">{c}</span>
              </li>
            ))}
          </FadeIn>
        </div>
      </section>

      <section data-surface="dark" className="overflow-hidden bg-ink py-20 text-paper md:py-28" aria-labelledby="fed-agencies">
        <div className="shell">
          <Eyebrow className="text-gold">Who we work with</Eyebrow>
          <h2 id="fed-agencies" className="sr-only">
            Agencies served by the Federal Group
          </h2>
          <ul className="sr-only">
            {AGENCIES.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
        <div aria-hidden="true" className="mt-10 flex w-max animate-[marquee_45s_linear_infinite] motion-reduce:animate-none">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center">
              {AGENCIES.map((a) => (
                <span key={a} className="flex items-center whitespace-nowrap font-display text-[clamp(2.5rem,6vw,5.5rem)] font-light tracking-tight">
                  {a}
                  <span className="mx-8 inline-block size-3 rounded-full bg-gold md:mx-12" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-paper-2 py-24 md:py-36" aria-labelledby="fed-8a">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow className="text-ember">Why agencies choose us</Eyebrow>
              <SplitReveal id="fed-8a" className="t-display mt-8">
                Small enough to care. Big enough to deliver.
              </SplitReveal>
            </div>
            <p className="text-ink/75 lg:col-span-4 lg:col-start-9">
              Contracting officers and program managers come back to us for the same few reasons.
            </p>
          </div>
          <FadeIn className="mt-16 grid gap-px overflow-hidden rounded-[6px] border border-ink/12 bg-ink/12 md:grid-cols-2" stagger={0.08}>
            {ADVANTAGES.map((a, i) => (
              <div key={a.title} className="bg-paper p-8 md:p-10">
                <p className="t-num text-sm text-ember">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="t-h2 mt-4">{a.title}</h3>
                <p className="mt-4 text-ink/75">{a.text}</p>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      <section className="bg-paper py-24 md:py-32" aria-labelledby="fed-cos">
        <div className="shell">
          <Eyebrow className="text-ember">Portfolio</Eyebrow>
          <h2 id="fed-cos" className="t-h1 mt-6">
            Federal Group companies and joint ventures
          </h2>
          <div className="mt-12">
            <CompanyIndex only={['federal']} showFilters={false} />
          </div>
        </div>
      </section>

      <RelatedNews terms={['Federal Services', 'Federal Group', 'Clearwater', 'Signal Ridge', 'Harbor IT']} title="Federal Group news" />

      <Related
        items={[
          { kicker: '01', label: 'Industrial Group', to: '/what-we-do/industrial-group' },
          { kicker: '03', label: 'Real Estate Group', to: '/what-we-do/real-estate-group' },
        ]}
      />
    </>
  )
}
