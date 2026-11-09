import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { TypeHero } from '../components/PageHero'
import { MotionImage } from '../components/MotionImage'
import { ArrowLink, Eyebrow, FadeIn, SplitReveal } from '../components/ui'
import { Related } from '../components/Related'
import { PRINCIPLES } from '../data/principles'
import { TEAM } from '../data/people'
import { Img } from '../components/Img'

const CHAPTERS = [
  {
    id: 'purpose',
    index: '01',
    label: 'Our Purpose',
    title: 'An endowment that works for the valley.',
    body: [
      'Oakhaven was formed in 2009 by the Alder Valley Community Trust, which holds the proceeds of the cooperative our members’ grandparents built, for every generation that follows.',
      'Our job is to grow that endowment and to make it useful along the way: a reliable distribution to the Trust each year, good jobs within reach of the valley, and buildings and businesses that make our towns stronger. We reinvest most of what we earn, and we never bet more than we can afford to lose.',
    ],
    image: 'valley',
    alt: 'Autumn sun over a quiet river valley',
    link: { to: '/our-roots/history', label: 'Explore our history' },
  },
  {
    id: 'how',
    index: '02',
    label: 'How We Work',
    title: 'Owners’ patience. Operators’ discipline.',
    body: [
      'A Board of Directors, most of them members of the Trust, sets our strategy and holds a small executive team to account for carrying it out.',
      'We buy established companies and buildings with steady earnings, room to grow and leaders we trust, and then we leave those leaders to lead. We help with capital, systems and introductions, and we stay out of the way of the people who know their business best.',
    ],
    image: 'hq-corner',
    alt: 'Restored brick buildings along a downtown street',
    link: { to: '/who-we-are/leadership', label: 'Meet our leadership' },
  },
]

export default function WhoWeAre() {
  return (
    <>
      <Seo
        title="Who We Are"
        description="Oakhaven was formed in 2009 to grow and diversify the endowment of the Alder Valley Community Trust, and to create good work close to home."
      />
      <TypeHero
        eyebrow="Who We Are"
        crumbs={[{ label: 'Who We Are' }]}
        title={
          <>
            Investing for <span className="italic-accent text-ember">generations.</span>
          </>
        }
        intro="We exist so that the families of the Alder Valley, and every town where our companies work, have more to hand on than they were given."
        image="hq-exterior"
        imageAlt="A row of restored brick commercial buildings downtown"
        position="50% 35%"
      />

      <section className="bg-paper py-24 md:py-36">
        <div className="shell">
          <div className="mx-auto max-w-5xl">
            <Eyebrow className="text-ember">Who we are</Eyebrow>
            <SplitReveal as="p" className="t-h1 mt-8">
              We are farmers’ grandchildren with balance sheets: operators and investors who still judge a decision by whether the people
              who inherit it will thank us.
            </SplitReveal>
            <FadeIn>
              <p className="t-h3 italic-accent mt-10 text-ember">
                At Oakhaven, we are not building for the next quarter. We are building something worth inheriting.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {CHAPTERS.map((c, i) => (
        <section key={c.id} id={c.id} className={i % 2 ? 'bg-paper-2' : 'bg-paper'} aria-labelledby={`${c.id}-title`}>
          <div className="shell grid items-center gap-12 py-24 md:py-32 lg:grid-cols-12">
            <div className={`lg:col-span-5 ${i % 2 ? 'lg:order-2 lg:col-start-8' : ''}`}>
              <MotionImage id={c.image} alt={c.alt} className="aspect-[4/5] rounded-[4px]" sizes="(min-width:1024px) 40vw, 100vw" reveal={i % 2 ? 'left' : 'up'} />
            </div>
            <div className={`lg:col-span-6 ${i % 2 ? 'lg:order-1' : 'lg:col-start-7'}`}>
              <Eyebrow index={c.index} className="text-ember">
                {c.label}
              </Eyebrow>
              <SplitReveal id={`${c.id}-title`} className="t-h1 mt-8">
                {c.title}
              </SplitReveal>
              <FadeIn className="mt-8 space-y-5 text-lg text-ink/80" stagger={0.1}>
                {c.body.map((p) => (
                  <p key={p.slice(0, 20)}>{p}</p>
                ))}
              </FadeIn>
              <ArrowLink to={c.link.to} className="mt-10 text-ink">
                {c.link.label}
              </ArrowLink>
            </div>
          </div>
        </section>
      ))}

      {/* The Oakhaven difference */}
      <section data-surface="dark" className="bg-ink py-24 text-paper md:py-36" aria-labelledby="difference-title">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow index="03" className="text-gold">
                The Oakhaven Difference
              </Eyebrow>
              <SplitReveal id="difference-title" className="t-h1 mt-8">
                Principles older than the business itself.
              </SplitReveal>
              <FadeIn>
                <p className="mt-8 text-lg text-paper/75">
                  The families who founded the Alder Valley Cooperative wrote seven principles on the back of their first ledger. We still
                  work by them, from how we choose an acquisition to how we treat the people who run it.
                </p>
              </FadeIn>
            </div>
            <FadeIn as="ol" className="lg:col-span-6 lg:col-start-7" stagger={0.06}>
              {PRINCIPLES.map((t, i) => (
                <li key={t.id} className="group border-b border-paper/12 first:border-t">
                  <Link
                    to={`/our-roots/principles#${t.id}`}
                    className="flex items-baseline justify-between gap-4 py-5 transition-colors hover:text-gold"
                  >
                    <span className="flex items-baseline gap-5">
                      <span className="t-num text-sm text-paper/40">{String(i + 1).padStart(2, '0')}</span>
                      <span className="font-display text-3xl tracking-tight transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">
                        {t.name}
                      </span>
                    </span>
                    <span className="font-display italic text-gold/80">{t.word}</span>
                  </Link>
                </li>
              ))}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Leadership teaser */}
      <section className="bg-paper py-24 md:py-32" aria-labelledby="lead-title">
        <div className="shell">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SplitReveal id="lead-title" className="t-display max-w-[14ch]">
              The people behind the portfolio.
            </SplitReveal>
            <ArrowLink to="/who-we-are/leadership" className="text-ink">
              Board and executive team
            </ArrowLink>
          </div>
          <FadeIn className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4" stagger={0.08}>
            {TEAM.slice(0, 4).map((p) => (
              <Link key={p.id} to="/who-we-are/leadership" className="group block">
                <div className="aspect-[4/5] overflow-hidden rounded-[4px]">
                  <Img id={p.image} alt={`Portrait of ${p.name}`} sizes="(min-width:768px) 25vw, 50vw" className="h-full w-full grayscale transition-all duration-700 group-hover:scale-[1.03] group-hover:grayscale-0" />
                </div>
                <p className="mt-4 font-display text-xl">{p.name}</p>
                <p className="text-sm text-stone">{p.role}</p>
              </Link>
            ))}
          </FadeIn>
        </div>
      </section>

      <Related
        items={[
          { kicker: 'Our home', label: 'The Hartwell Building', to: '/who-we-are/headquarters' },
          { kicker: 'Our roots', label: 'Our History', to: '/our-roots/history' },
          { kicker: 'Our work', label: 'What We Do', to: '/what-we-do' },
        ]}
      />
    </>
  )
}
