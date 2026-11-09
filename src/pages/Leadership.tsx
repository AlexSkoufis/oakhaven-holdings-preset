import { useRef } from 'react'
import { Seo } from '../components/Seo'
import { TypeHero } from '../components/PageHero'
import { Img, mediaSrc } from '../components/Img'
import { Eyebrow, FadeIn, SplitReveal } from '../components/ui'
import { Related } from '../components/Related'
import { TEAM, BOARD, type Person } from '../data/people'
import { gsap, useGSAP, MQ } from '../lib/gsap'

function TeamCard({ p }: { p: Person }) {
  return (
    <article className="group relative">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-paper-3">
        <Img
          id={p.image}
          alt={`Portrait of ${p.name}`}
          sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw"
          className="h-full w-full transition-transform duration-[1.2s] ease-[var(--ease-out)] group-hover:scale-[1.04]"
        />
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-ink/90 p-5 text-sm leading-relaxed text-paper/90 backdrop-blur transition-transform duration-700 ease-[var(--ease-out)] group-focus-within:translate-y-0 group-hover:translate-y-0">
          {p.bio}
        </div>
      </div>
      <h3 className="t-h3 mt-5">{p.name}</h3>
      <p className="mt-1 text-sm text-stone">{p.role}</p>
    </article>
  )
}

export default function Leadership() {
  const board = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(`${MQ.finePointer} and ${MQ.motion}`, () => {
        const preview = board.current!.querySelector<HTMLElement>('[data-preview]')!
        const img = preview.querySelector('img')!
        const xTo = gsap.quickTo(preview, 'x', { duration: 0.55, ease: 'power3' })
        const yTo = gsap.quickTo(preview, 'y', { duration: 0.55, ease: 'power3' })
        const rot = gsap.quickTo(preview, 'rotate', { duration: 0.8, ease: 'power3' })
        let lastX = 0
        const list = board.current!.querySelector<HTMLElement>('[data-list]')!
        const move = (e: PointerEvent) => {
          xTo(e.clientX - 110)
          yTo(e.clientY - 140)
          rot(gsap.utils.clamp(-8, 8, (e.clientX - lastX) * 0.6))
          lastX = e.clientX
        }
        const rows = gsap.utils.toArray<HTMLElement>('[data-row]')
        const enter = (e: Event) => {
          img.src = (e.currentTarget as HTMLElement).dataset.img ?? ''
          gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'expo.out' })
        }
        const leave = () => gsap.to(preview, { autoAlpha: 0, scale: 0.8, duration: 0.35 })
        list.addEventListener('pointermove', move)
        list.addEventListener('pointerleave', leave)
        rows.forEach((r) => r.addEventListener('pointerenter', enter))
        return () => {
          list.removeEventListener('pointermove', move)
          list.removeEventListener('pointerleave', leave)
          rows.forEach((r) => r.removeEventListener('pointerenter', enter))
        }
      })
    },
    { scope: board },
  )

  return (
    <>
      <Seo title="Leadership" description="Meet the Oakhaven executive team and Board of Directors." />
      <TypeHero
        eyebrow="Leadership"
        crumbs={[{ label: 'Who We Are', to: '/who-we-are' }, { label: 'Leadership' }]}
        title={
          <>
            Leadership with a <span className="italic-accent text-ember">long view.</span>
          </>
        }
        intro="A Board of Directors drawn mostly from the Trust’s members, and a small executive team that answers to it."
      />

      <section className="bg-paper pb-24 md:pb-36" aria-labelledby="team-title">
        <div className="shell">
          <div className="border-t border-ink/15 pt-12">
            <Eyebrow index="01" className="text-ember">
              Corporate Leadership
            </Eyebrow>
            <h2 id="team-title" className="sr-only">
              Corporate Leadership
            </h2>
          </div>
          <FadeIn className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {TEAM.map((p) => (
              <TeamCard key={p.id} p={p} />
            ))}
          </FadeIn>
        </div>
      </section>

      <section ref={board} data-surface="dark" className="bg-ink py-24 text-paper md:py-36" aria-labelledby="board-title">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow index="02" className="text-gold">
                Board of Directors
              </Eyebrow>
              <SplitReveal id="board-title" className="t-display mt-8">
                Governed by the people who own it.
              </SplitReveal>
            </div>
            <p className="text-paper/70 lg:col-span-4 lg:col-start-9">
              The Board brings together members of the Trust, independent expertise, and an ex officio seat for the Trust’s trustees.
            </p>
          </div>

          <ul data-list className="mt-16 border-t border-paper/15">
            {BOARD.map((p) => (
              <li key={p.id} data-row data-img={mediaSrc(p.image, 480)} className="group border-b border-paper/15">
                <div className="grid grid-cols-[64px_1fr] items-center gap-5 py-6 md:grid-cols-12 md:gap-6 md:py-8">
                  <span className="aspect-square overflow-hidden rounded-full md:hidden">
                    <Img id={p.image} alt="" sizes="64px" className="h-full w-full" />
                  </span>
                  <span className="md:col-span-5">
                    <span className="block font-display text-2xl tracking-tight transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">
                      {p.name}
                    </span>
                    <span className="mt-1 block text-sm text-gold md:hidden">{p.role}</span>
                  </span>
                  <span className="hidden text-sm font-semibold uppercase tracking-[0.14em] text-gold md:col-span-3 md:block">{p.role}</span>
                  <span className="col-span-2 text-sm text-paper/65 md:col-span-4">{p.bio}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div
          data-preview
          aria-hidden="true"
          className="pointer-events-none invisible fixed left-0 top-0 z-40 hidden w-[220px] scale-[0.8] overflow-hidden rounded-[4px] opacity-0 shadow-2xl md:block"
        >
          <img alt="" className="aspect-[4/5] w-full object-cover" />
        </div>
      </section>

      <Related
        items={[
          { kicker: 'Our story', label: 'Who We Are', to: '/who-we-are' },
          { kicker: 'Join us', label: 'Careers', to: '/careers' },
        ]}
      />
    </>
  )
}
