import { useRef, useState } from 'react'
import { Plus } from 'lucide-react'
import { Seo } from '../components/Seo'
import { ImageHero } from '../components/PageHero'
import { Img } from '../components/Img'
import { Eyebrow, FadeIn, SplitReveal } from '../components/ui'
import { RelatedNews } from '../components/RelatedNews'
import { Related } from '../components/Related'
import { PROPERTIES } from '../data/properties'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'

export default function RealEstateGroup() {
  const [hovered, setHovered] = useState(0)
  const [open, setOpen] = useState<string | null>(PROPERTIES[0].id)
  const stage = useRef<HTMLDivElement>(null)

  // Wipe the newly selected photograph in over the previous one.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const el = stage.current?.querySelector(`[data-stage-img="${hovered}"]`)
      if (!el) return
      gsap.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'expo.out' })
      gsap.fromTo(el.querySelector('img:last-child'), { scale: 1.15 }, { scale: 1, duration: 1.4, ease: 'expo.out' })
    },
    { dependencies: [hovered], scope: stage },
  )

  return (
    <>
      <Seo
        title="Real Estate Group"
        description="Cedar Row Properties holds Oakhaven's industrial, commercial and mixed-use real estate."
      />
      <ImageHero
        eyebrow="03 · Real Estate Group"
        title={
          <>
            Assets that build value <span className="italic-accent text-gold">over time.</span>
          </>
        }
        intro="Real estate is the steadiest part of the portfolio: buildings and land that pay rent every month and are worth more to the people who inherit them."
        image="industrial-park"
        imageAlt="Aerial view of an industrial park with warehouses and open land"
        crumbs={[{ label: 'What We Do', to: '/what-we-do' }, { label: 'Real Estate Group' }]}
      >
        <img src="/media/logos/cedar-row.svg" alt="Cedar Row Properties" className="h-12 w-auto rounded bg-paper px-3 py-2" />
      </ImageHero>

      <section className="bg-paper py-24 md:py-32" aria-labelledby="re-intro">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow className="text-ember">Cedar Row Properties, LLC</Eyebrow>
            <SplitReveal id="re-intro" className="t-h1 mt-8">
              Seven properties, from a downtown tower to 160 acres of rail-served land.
            </SplitReveal>
          </div>
          <FadeIn className="text-lg text-ink/80 lg:col-span-4 lg:col-start-9 lg:pt-14">
            <p>
              Cedar Row is Oakhaven’s wholly owned property company. It leases office, retail, residential, warehouse and manufacturing
              space, much of it to our own companies, and the rest to long-term tenants we know well.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-paper pb-24 md:pb-36" aria-labelledby="re-props">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <h2 id="re-props" className="sr-only">
            Properties
          </h2>
          {/* Sticky photograph stage (desktop) */}
          <div className="hidden lg:col-span-5 lg:block">
            <div ref={stage} className="sticky top-[calc(var(--header-h)+2rem)] aspect-[4/5] overflow-hidden rounded-[4px] bg-paper-3">
              {PROPERTIES.map((p, i) =>
                p.image ? (
                  <div
                    key={p.id}
                    data-stage-img={i}
                    className="absolute inset-0"
                    style={{ zIndex: i === hovered ? 2 : 1, visibility: i === hovered ? 'visible' : 'hidden' }}
                  >
                    <Img id={p.image} alt={`${p.name}, ${p.location}`} sizes="40vw" className="h-full w-full" />
                  </div>
                ) : null,
              )}
              <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-ink/80 to-transparent p-6 text-paper">
                <p className="t-eyebrow text-gold">{PROPERTIES[hovered].location}</p>
                <p className="t-h3 mt-2">{PROPERTIES[hovered].name}</p>
              </div>
            </div>
          </div>

          <ul className="border-t border-ink/15 lg:col-span-7">
            {PROPERTIES.map((p, i) => {
              const isOpen = open === p.id
              return (
                <li key={p.id} className="border-b border-ink/15" onPointerEnter={() => setHovered(i)}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`prop-${p.id}`}
                      onFocus={() => setHovered(i)}
                      onClick={() => {
                        setOpen(isOpen ? null : p.id)
                        setHovered(i)
                      }}
                      className="group grid w-full grid-cols-[1fr_auto] items-center gap-4 py-6 text-left md:grid-cols-12 md:py-7"
                    >
                      <span className="md:col-span-7">
                        <span className="t-h2 block transition-colors group-hover:text-ember">{p.name}</span>
                      </span>
                      <span className="hidden text-sm text-stone md:col-span-4 md:block">
                        {p.location} · {p.acquired}
                      </span>
                      <span className="grid size-10 place-items-center rounded-full border border-ink/20 md:col-span-1 md:justify-self-end">
                        <Plus className={`size-4 transition-transform duration-500 ${isOpen ? 'rotate-45' : ''}`} aria-hidden="true" />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`prop-${p.id}`}
                    className={`grid transition-[grid-template-rows] duration-700 ease-[var(--ease-out)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  >
                    <div className="overflow-hidden" hidden={!isOpen}>
                      <div className="pb-10">
                        {p.image && (
                          <div className="mb-6 aspect-[16/10] overflow-hidden rounded-[4px] lg:hidden">
                            <Img id={p.image} alt={`${p.name}, ${p.location}`} sizes="100vw" className="h-full w-full" />
                          </div>
                        )}
                        <dl className="grid grid-cols-3 gap-4 border-y border-ink/10 py-5 text-sm">
                          <div>
                            <dt className="t-eyebrow text-[0.65rem] text-stone">Location</dt>
                            <dd className="mt-1 font-semibold">{p.location}</dd>
                          </div>
                          <div>
                            <dt className="t-eyebrow text-[0.65rem] text-stone">Acquired</dt>
                            <dd className="mt-1 font-semibold">{p.acquired}</dd>
                          </div>
                          <div>
                            <dt className="t-eyebrow text-[0.65rem] text-stone">Ownership</dt>
                            <dd className="mt-1 font-semibold">{p.ownership}</dd>
                          </div>
                        </dl>
                        <p className="mt-6 max-w-2xl text-lg text-ink/80">{p.description}</p>
                        <ul className="mt-5 flex flex-wrap gap-2">
                          {p.facts.map((f) => (
                            <li key={f} className="rounded-full bg-paper-2 px-3 py-1.5 text-sm">
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <RelatedNews terms={['Alder Junction', 'Founders Tower', 'Hartwell', 'Property', 'Acres', 'Rail']} title="Real Estate Group news" />

      <Related
        items={[
          { kicker: 'Our headquarters', label: 'The Hartwell Building', to: '/who-we-are/headquarters' },
          { kicker: '01', label: 'Industrial Group', to: '/what-we-do/industrial-group' },
        ]}
      />
    </>
  )
}
