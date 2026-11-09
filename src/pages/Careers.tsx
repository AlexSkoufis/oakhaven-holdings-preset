import { Seo } from '../components/Seo'
import { ImageHero } from '../components/PageHero'
import { Button, Eyebrow, FadeIn, SplitReveal, ArrowLink } from '../components/ui'
import { Related } from '../components/Related'
import { ORG } from '../data/site'

// Careers content. Demo content.
const BENEFITS = [
  'Medical, dental and vision cover',
  'A 401(k) with a generous match',
  'Paid time off from day one',
  'Twelve paid holidays',
  'Paid family and caregiver leave',
  'Tuition support for further study',
]

export default function Careers() {
  return (
    <>
      <Seo
        title="Careers"
        description="Careers at Oakhaven and its family of companies, in manufacturing, logistics, federal services, real estate and investment."
      />
      <ImageHero
        eyebrow="Careers"
        title={
          <>
            Work that stays <span className="italic-accent text-gold">close to home.</span>
          </>
        }
        intro="More than a thousand people work across our companies. We are always looking for good people who want to build something that lasts."
        image="plant-floor"
        imageAlt="A machine shop floor with lathes in rows"
        crumbs={[{ label: 'Careers' }]}
        tall={false}
      >
        <Button to={ORG.careerPortal} variant="gold">
          See open positions
        </Button>
      </ImageHero>

      <section className="bg-paper py-24 md:py-36" aria-labelledby="c-about">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Eyebrow className="text-ember">Careers at Oakhaven and its companies</Eyebrow>
            <SplitReveal id="c-about" className="t-h1 mt-8">
              A career with an owner that is not going anywhere.
            </SplitReveal>
          </div>
          <FadeIn className="space-y-5 text-lg text-ink/80 lg:col-span-5 lg:col-start-8" stagger={0.1}>
            <p>
              Oakhaven is owned by a community trust, not by a fund that needs to sell in five years. That means steady investment in our
              companies, in their equipment and, above all, in their people.
            </p>
            <p className="font-semibold text-ink">
              Members of the Alder Valley Community Trust and their families are especially encouraged to apply.
            </p>
          </FadeIn>
        </div>
      </section>

      <section data-surface="dark" className="bg-ink py-24 text-paper md:py-32" aria-labelledby="c-benefits">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow className="text-gold">Benefits</Eyebrow>
            <h2 id="c-benefits" className="t-h1 mt-8">
              A complete benefits package.
            </h2>
            <p className="mt-6 text-paper/70">As well as a competitive salary, every Oakhaven company offers:</p>
          </div>
          <FadeIn as="ul" className="grid gap-px overflow-hidden rounded-[6px] bg-paper/10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6" stagger={0.06}>
            {BENEFITS.map((b, i) => (
              <li key={b} className="flex min-h-36 flex-col justify-between bg-ink-2 p-6">
                <span className="t-num text-sm text-gold">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-display text-2xl tracking-tight">{b}</span>
              </li>
            ))}
          </FadeIn>
        </div>
      </section>

      <section id="openings" className="scroll-mt-[var(--header-h)] bg-paper py-24 md:py-32" aria-labelledby="c-open">
        <div className="shell grid gap-6 md:grid-cols-2">
          <div className="rounded-[6px] bg-paper-2 p-8 md:p-12">
            <p className="t-eyebrow text-ember">Current openings</p>
            <h2 id="c-open" className="t-h2 mt-4">
              Find open positions across the family of companies.
            </h2>
            <p className="mt-4 text-ink/75">
              Roles are posted as they open, so please check back often. To apply, or to ask about a role, email{' '}
              <a href={`mailto:${ORG.hrEmail}`} className="u-link font-semibold text-ink">
                {ORG.hrEmail}
              </a>
              .
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Button to={`mailto:${ORG.hrEmail}`} variant="ink" magnetic={false}>
                Email our people team
              </Button>
            </div>
          </div>
          <div className="rounded-[6px] bg-gold p-8 text-ink md:p-12">
            <p className="t-eyebrow">Member Talent Network</p>
            <h2 className="t-h2 mt-4">Share your experience, talents, and skills.</h2>
            <p className="mt-4 text-ink/80">
              If you are a member of the Trust, or a member’s spouse or child, and would like to hear about roles and programmes across
              Oakhaven, join the Member Talent Network and we will be in touch when something fits.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Button to={ORG.memberNetwork} variant="ink" magnetic={false}>
                Share your details
              </Button>
              <ArrowLink to="/member-opportunities" className="text-ink">
                Member opportunities
              </ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper pb-24" aria-labelledby="c-legal">
        <div className="shell">
          <h2 id="c-legal" className="t-eyebrow border-t border-ink/15 pt-8 text-stone">
            Policies
          </h2>
          <div className="mt-6 grid gap-8 text-sm text-ink/70 md:grid-cols-3">
            <p>
              <strong className="text-ink">Member and veteran preference.</strong> Where candidates are equally qualified, we give preference
              to members of the Trust and to veterans. Every hiring decision is made on merit.
            </p>
            <p>
              <strong className="text-ink">Equal opportunity.</strong> We are proud to be an Equal Opportunity Employer making decisions
              without regard to race, color, religion, sex, sexual orientation, gender, gender identity, national origin, age, disability,
              genetic information, citizenship, marital status, height or weight, veteran status, or any other legally protected category.
            </p>
            <p>
              <strong className="text-ink">Reasonable accommodations.</strong> Need accommodations to apply online? Email{' '}
              <a href={`mailto:${ORG.hrEmail}`} className="u-link text-ink">
                {ORG.hrEmail}
              </a>
              . Oakhaven participates in E-Verify.
            </p>
          </div>
        </div>
      </section>

      <Related
        items={[
          { kicker: 'Programmes', label: 'Member Opportunities', to: '/member-opportunities' },
          { kicker: 'Our people', label: 'Leadership', to: '/who-we-are/leadership' },
        ]}
      />
    </>
  )
}
