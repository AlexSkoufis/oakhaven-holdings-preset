import { Seo } from '../components/Seo'
import { TypeHero } from '../components/PageHero'
import { Button, Eyebrow, FadeIn, SplitReveal } from '../components/ui'
import { Related } from '../components/Related'
import { ORG } from '../data/site'

// Programmes for members of the owning Trust and their families. Demo content.

const ROOTS_TOPICS = [
  'How a community endowment works, and why it is invested',
  'How the Trust, the Oakhaven board and management share responsibility',
  'How we find, judge and buy a company',
  'How a property earns its keep',
  'Reading a balance sheet without fear',
  'How we measure performance, and what we pay out',
  'How today’s decisions reach the next generation',
]

const FELLOWS_TOPICS = [
  'Paid placements',
  'A mentor at every company',
  'Plant and site visits',
  'Board meeting observer seat',
  'Finance fundamentals',
  'Leadership workshops',
  'Cohort projects',
  'Networking',
]

export default function MemberOpportunities() {
  return (
    <>
      <Seo
        title="Member Opportunities"
        description="Roots Weekend, the Oakhaven Fellows programme and the Member Talent Network: ways for members of the Trust to learn the business and build a career."
      />
      <TypeHero
        eyebrow="Member Opportunities"
        crumbs={[{ label: 'Careers', to: '/careers' }, { label: 'Member Opportunities' }]}
        title={
          <>
            Learn the business <span className="italic-accent text-ember">you own.</span>
          </>
        }
        intro="Programmes that give members of the Alder Valley Community Trust, and their families, a first-hand look at how their endowment is invested."
      />

      {/* Roots Weekend */}
      <section data-surface="dark" className="bg-ink py-24 text-paper md:py-36" aria-labelledby="roots-title">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow index="01" className="text-gold">
              Roots Weekend
            </Eyebrow>
            <SplitReveal id="roots-title" className="t-h1 mt-8">
              Two days inside the companies your family owns.
            </SplitReveal>
            <FadeIn className="mt-8 space-y-5 text-lg text-paper/75" stagger={0.1}>
              <p>
                Roots Weekend brings members of the Trust together with Oakhaven’s leaders for two days of plant tours, conversations and plain
                explanations of how the portfolio works.
              </p>
              <p>
                No finance background is needed. You will leave knowing what the Trust owns, why, and how a decision made in the boardroom
                reaches your family.
              </p>
            </FadeIn>
            <div className="mt-10 rounded-[6px] border border-gold/40 p-6">
              <p className="font-semibold text-gold">Applications for the next Roots Weekend open in spring 2027.</p>
              <p className="mt-2 text-sm text-paper/65">
                Open to members of the Trust aged 16 and over, and their spouses. Lodging, meals and travel within 200 miles are covered.
              </p>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="t-eyebrow text-paper/55">What participants explore</p>
            <FadeIn as="ol" className="mt-6 border-t border-paper/12" stagger={0.06}>
              {ROOTS_TOPICS.map((t, i) => (
                <li key={t} className="flex gap-6 border-b border-paper/12 py-5">
                  <span className="t-num text-gold">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-display text-xl tracking-tight md:text-2xl">{t}</span>
                </li>
              ))}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Fellows */}
      <section className="bg-paper py-24 md:py-36" aria-labelledby="fellows-title">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Eyebrow index="02" className="text-ember">
              Oakhaven Fellows
            </Eyebrow>
            <SplitReveal id="fellows-title" className="t-h1 mt-8">
              A paid year across the family of companies.
            </SplitReveal>
            <FadeIn>
              <p className="mt-8 text-lg text-ink/80">
                Fellows spend twelve months in three placements across our companies, with a mentor at each, a seat as an observer at board
                meetings, and a cohort of members going through the same year.
              </p>
              <p className="mt-6 text-sm font-semibold text-ember">Applications for the 2026 cohort are now closed.</p>
            </FadeIn>
          </div>
          <FadeIn as="ul" className="flex flex-wrap content-start gap-3 lg:col-span-5 lg:col-start-8 lg:pt-20" stagger={0.04}>
            {FELLOWS_TOPICS.map((t) => (
              <li key={t} className="rounded-full border border-ink/20 px-5 py-3 font-display text-lg">
                {t}
              </li>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* Member Talent Network */}
      <section className="bg-paper-2 py-24 md:py-32" aria-labelledby="mtn-title">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow index="03" className="text-ember">
              Member Talent Network
            </Eyebrow>
            <h2 id="mtn-title" className="t-h1 mt-8">
              Be the first to hear about openings, internships and programmes.
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-ink/80">
              Tell us about your experience, skills and interests and we will let you know when a role, internship or programme comes up that
              fits, anywhere in the family of companies.
            </p>
          </div>
          <div className="flex flex-col items-start gap-4 lg:col-span-4 lg:col-start-9">
            <Button to={ORG.memberNetwork} variant="ink">
              Share your details
            </Button>
          </div>
        </div>
      </section>

      <Related
        items={[
          { kicker: 'Join us', label: 'Careers', to: '/careers' },
          { kicker: 'Research', label: 'Community Impact Report', to: '/impact-report' },
        ]}
      />
    </>
  )
}
