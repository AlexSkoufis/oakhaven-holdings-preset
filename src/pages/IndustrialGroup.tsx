import { Seo } from '../components/Seo'
import { ImageHero } from '../components/PageHero'
import { CompanyIndex } from '../components/CompanyIndex'
import { MotionImage } from '../components/MotionImage'
import { Eyebrow, FadeIn, SplitReveal } from '../components/ui'
import { RelatedNews } from '../components/RelatedNews'
import { Related } from '../components/Related'

export default function IndustrialGroup() {
  return (
    <>
      <Seo
        title="Industrial Group"
        description="Oakhaven's Industrial Group: operating companies in precision manufacturing, electronics, freight, logistics and advisory services."
      />
      <ImageHero
        eyebrow="01 · Industrial Group"
        title={
          <>
            Built for every <span className="italic-accent text-gold">cycle.</span>
          </>
        }
        intro="Companies that make precision parts and electronics, move freight across the region, and advise owner-led businesses."
        image="industrial-floor"
        imageAlt="A machinist at work on a lathe"
        position="55% 50%"
        crumbs={[{ label: 'What We Do', to: '/what-we-do' }, { label: 'Industrial Group' }]}
      >
        <img src="/media/logos/group-industrial.svg" alt="Oakhaven Industrial Group" className="h-14 w-auto rounded bg-paper px-4 py-2" />
      </ImageHero>

      <section className="bg-paper py-24 md:py-36" aria-labelledby="ind-approach">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow className="text-ember">Our approach</Eyebrow>
            <SplitReveal id="ind-approach" className="t-h1 mt-8">
              Plant more than one crop. Some businesses thrive when the economy grows; others hold steady when it shrinks.
            </SplitReveal>
          </div>
          <FadeIn className="space-y-6 text-lg text-ink/80 lg:col-span-4 lg:col-start-9 lg:pt-16">
            <p>
              No company can step outside the economy it works in. So instead of looking for the one business that does well in every year, we
              look for a group of businesses that do well in different years.
            </p>
            <p>
              Before every acquisition we ask where it will be strongest in the cycle, and we add companies that balance the ones we already
              own.
            </p>
          </FadeIn>
        </div>
        <div className="shell mt-20 grid gap-4 md:grid-cols-12">
          <MotionImage id="plant-floor" alt="A machine shop floor with lathes in rows" className="aspect-[16/10] rounded-[4px] md:col-span-7" sizes="(min-width:768px) 58vw, 100vw" />
          <MotionImage id="plant-aerial" alt="Aerial view of a modern manufacturing plant" className="aspect-[16/10] rounded-[4px] md:col-span-5 md:mt-24" sizes="(min-width:768px) 42vw, 100vw" reveal="left" />
        </div>
      </section>

      <section className="bg-paper-2 py-24 md:py-32" aria-labelledby="ind-subs">
        <div className="shell">
          <Eyebrow className="text-ember">Subsidiaries and joint ventures</Eyebrow>
          <h2 id="ind-subs" className="t-h1 mt-6">
            Industrial companies
          </h2>
          <div className="mt-12">
            <CompanyIndex only={['industrial']} showFilters={false} />
          </div>
          <h2 className="t-h2 mt-24">Minority investments</h2>
          <div className="mt-8">
            <CompanyIndex only={['investment']} showFilters={false} />
          </div>
        </div>
      </section>

      <RelatedNews terms={['Hollis', 'Brightline', 'Northbound', 'Kestrel', 'Lumen', 'Riverstone']} title="Industrial Group news" />

      <Related
        items={[
          { kicker: '02', label: 'Federal Group', to: '/what-we-do/federal-group' },
          { kicker: '03', label: 'Real Estate Group', to: '/what-we-do/real-estate-group' },
        ]}
      />
    </>
  )
}
