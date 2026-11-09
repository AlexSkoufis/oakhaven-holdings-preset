import { Seo } from '../components/Seo'
import { ImageHero } from '../components/PageHero'
import { MotionImage } from '../components/MotionImage'
import { Eyebrow, FadeIn, SplitReveal, SmartLink } from '../components/ui'
import { Related } from '../components/Related'
import { ORG } from '../data/site'

// The story of the headquarters building. Demo content: the building, its
// history and the people named here are fictional; the photographs are
// illustrative (see the credits in assets-src/photo/meta.json).

export default function Headquarters() {
  return (
    <>
      <Seo
        title={ORG.building}
        description={`The history and restoration of ${ORG.building} at ${ORG.address.line1}, home of Oakhaven in downtown ${ORG.address.city}.`}
      />
      <ImageHero
        eyebrow={`${ORG.address.line1}, ${ORG.address.city}`}
        title={
          <>
            The Hartwell <span className="italic-accent text-gold">Building.</span>
          </>
        }
        intro="Home to Oakhaven, eight apartments and a ground-floor restaurant, on the corner of Front Street and Market Street in the heart of Alder Falls."
        image="hq-exterior"
        imageAlt="A row of restored brick commercial buildings on a sunny downtown street"
        position="50% 30%"
        crumbs={[{ label: 'Who We Are', to: '/who-we-are' }, { label: ORG.building }]}
      />

      <article className="bg-paper">
        {/* Chapter 1: origins */}
        <section className="shell grid gap-12 py-24 md:py-36 lg:grid-cols-12" aria-labelledby="k-origins">
          <div className="lg:col-span-5">
            <Eyebrow index="1889" className="text-ember">
              Origins
            </Eyebrow>
            <SplitReveal id="k-origins" className="t-h1 mt-8">
              Built for a merchant who believed in the town.
            </SplitReveal>
          </div>
          <FadeIn className="space-y-6 text-lg text-ink/80 lg:col-span-6 lg:col-start-7" stagger={0.1}>
            <p>
              Samuel Hartwell arrived in Alder Falls in 1871 with a wagon of hardware and a loan from his brother. Within twenty years he owned
              the largest dry goods store in the county, and in 1889 he built a five-storey home for it on the busiest corner in town.
            </p>
            <p>
              Red brick, two shopfronts, tall arched windows and the family name cut into a sandstone panel above the door: it was the first
              building in Alder Falls taller than the mill.
            </p>
          </FadeIn>
        </section>

        <div className="shell">
          <MotionImage
            id="hq-archival"
            alt="A black and white photograph of a brick commercial building on a quiet street corner"
            className="aspect-[4/3] rounded-[4px] grayscale md:aspect-[16/9]"
            sizes="100vw"
            reveal="center"
          />
          <p className="mt-3 text-sm text-stone">Downtown, archival photograph (illustrative).</p>
        </div>

        {/* Chapter 2: vacancy */}
        <section className="shell grid gap-12 py-24 md:py-36 lg:grid-cols-12" aria-labelledby="k-vacancy">
          <div className="grid grid-cols-2 gap-4 lg:col-span-6">
            <MotionImage id="hq-before-1" alt="An empty interior with bare walls and debris before restoration" className="aspect-[3/4] rounded-[4px]" sizes="25vw" />
            <MotionImage id="hq-before-2" alt="A long, water-damaged floor with columns before restoration" className="mt-16 aspect-[3/4] rounded-[4px]" sizes="25vw" reveal="left" />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Eyebrow index="2014" className="text-ember">
              Revival
            </Eyebrow>
            <SplitReveal id="k-vacancy" className="t-h1 mt-8">
              Empty for a generation, then a second life.
            </SplitReveal>
            <FadeIn className="mt-8 space-y-6 text-lg text-ink/80" stagger={0.1}>
              <p>
                The store closed in 1986 and the upper floors stood empty for almost thirty years. By the time Oakhaven bought the building in
                2014, pigeons had the top floor and the roof was close to failing.
              </p>
              <p>
                We spent two years and $4.2 million bringing it back, working with a local builder and architect, and finished on time and a
                little under budget.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Chapter 3: craft */}
        <section data-surface="dark" className="bg-ink py-24 text-paper md:py-36" aria-labelledby="k-craft">
          <div className="shell grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <Eyebrow className="text-gold">Restored with care</Eyebrow>
              <SplitReveal id="k-craft" className="t-h1 mt-8">
                Old beams, the original stair, the terrazzo floor.
              </SplitReveal>
              <FadeIn className="mt-8 space-y-6 text-lg text-paper/75" stagger={0.1}>
                <p>
                  The crew stripped the interior back to brick, added a steel frame and an elevator core, and fitted new windows, floors and
                  services throughout.
                </p>
                <p>
                  Timber from a cooperative barn in the valley, taken down board by board, became the floors and tables of our offices. The
                  terrazzo entrance and the original stair were kept and repaired.
                </p>
              </FadeIn>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <MotionImage id="heritage" alt="A red brick building of the kind the restoration team worked on" className="aspect-[4/3] rounded-[4px]" sizes="(min-width:1024px) 50vw, 100vw" reveal="left" />
            </div>
          </div>
        </section>

        {/* Chapter 4: today */}
        <section className="shell grid gap-12 py-24 md:py-36 lg:grid-cols-12 lg:items-end" aria-labelledby="k-today">
          <div className="lg:col-span-7">
            <MotionImage id="hq-corner" alt="Restored brick buildings along a downtown street in the morning" className="aspect-[4/3] rounded-[4px]" sizes="(min-width:1024px) 58vw, 100vw" />
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Eyebrow index="2016" className="text-ember">
              Today
            </Eyebrow>
            <SplitReveal id="k-today" className="t-h2 mt-8">
              Apartments upstairs, and the home of Oakhaven.
            </SplitReveal>
            <FadeIn className="mt-6 space-y-4 text-ink/80">
              <p>
                A restaurant fills the ground floor, our offices the second and third, and eight apartments the floors above, with a shared roof
                terrace for every tenant. The founders’ ledger sits in a glass case by the stair.
              </p>
              <p className="text-sm text-stone">
                {ORG.address.line1}, {ORG.address.line2}, {ORG.address.city}, {ORG.address.region} {ORG.address.postal}
              </p>
              <SmartLink to={ORG.mapsUrl} className="u-link inline-block font-semibold text-ink">
                Get directions
              </SmartLink>
            </FadeIn>
          </div>
        </section>
      </article>

      <Related
        items={[
          { kicker: 'Real Estate Group', label: 'Our property portfolio', to: '/what-we-do/real-estate-group' },
          { kicker: 'Visit us', label: 'Get in Touch', to: '/contact' },
        ]}
      />
    </>
  )
}
