import { useRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { gsap, useGSAP, MQ, SplitText, SPLIT } from '../lib/gsap'
import { Img } from './Img'
import { useHeroTheme } from './header-theme'

export type Crumb = { label: string; to?: string }

export function Breadcrumbs({ items, light = false }: { items: Crumb[]; light?: boolean }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={`flex flex-wrap items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] ${light ? 'text-paper/65' : 'text-stone'}`}>
        <li>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </li>
        {items.map((c, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight className="size-3 opacity-60" aria-hidden="true" />
            {c.to ? (
              <Link to={c.to} className="hover:underline">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className={light ? 'text-paper' : 'text-ink'}>
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

function useHeroIntro(root: React.RefObject<HTMLElement | null>, opts: { image?: boolean }) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        const split = SplitText.create(root.current!.querySelector('[data-ph-title]'), { ...SPLIT, type: 'lines', mask: 'lines' })
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.1 })
        if (opts.image) {
          tl.fromTo('[data-ph-media]', { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut' }, 0)
          tl.from('[data-ph-media] img', { scale: 1.3, duration: 2.2, ease: 'expo.out' }, 0.2)
        }
        tl.from(split.lines, { yPercent: 140, stagger: 0.09, duration: 1.4 }, opts.image ? 0.6 : 0.1)
        tl.from('[data-ph-fade]', { y: 24, autoAlpha: 0, stagger: 0.08, duration: 1.2 }, '<0.3')

        if (opts.image) {
          gsap.to('[data-ph-media] > div', {
            yPercent: 15,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
          })
        }
        return () => split.revert()
      })
    },
    { scope: root },
  )
}

/** Cinematic dark hero with a full-bleed photograph. */
export function ImageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  position,
  crumbs,
  children,
  tall = true,
}: {
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  image: string
  imageAlt: string
  position?: string
  crumbs: Crumb[]
  children?: ReactNode
  tall?: boolean
}) {
  useHeroTheme('dark')
  const root = useRef<HTMLElement>(null)
  useHeroIntro(root, { image: true })
  return (
    <section
      ref={root}
      data-surface="dark"
      className={`relative flex items-end overflow-hidden bg-ink text-paper ${tall ? 'min-h-[100svh]' : 'min-h-[82svh]'}`}
    >
      <div data-ph-media className="absolute inset-0">
        <Img id={image} alt={imageAlt} sizes="100vw" priority position={position} className="h-full w-full" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(20_24_26/0.6)_0%,rgb(20_24_26/0.15)_35%,rgb(20_24_26/0.92)_100%)]" />
      </div>
      <div className="shell relative w-full pb-14 pt-40 md:pb-20">
        <div data-ph-fade>
          <Breadcrumbs items={crumbs} light />
        </div>
        <p data-ph-fade className="t-eyebrow mt-10 text-gold">
          {eyebrow}
        </p>
        <h1 data-ph-title className="t-display mt-6 max-w-[16ch]">
          {title}
        </h1>
        <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
          {intro && (
            <div data-ph-fade className="t-lead text-paper/85 md:col-span-7">
              {intro}
            </div>
          )}
          {children && (
            <div data-ph-fade className="md:col-span-5 md:justify-self-end">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

/** Editorial light hero led by typography, with an optional image band. */
export function TypeHero({
  eyebrow,
  title,
  intro,
  crumbs,
  image,
  imageAlt = '',
  position,
  aside,
}: {
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  crumbs: Crumb[]
  image?: string
  imageAlt?: string
  position?: string
  aside?: ReactNode
}) {
  useHeroTheme('light')
  const root = useRef<HTMLElement>(null)
  useHeroIntro(root, { image: !!image })
  return (
    <section ref={root} className="relative bg-paper">
      <div className="shell pb-14 pt-[calc(var(--header-h)+6rem)] md:pb-20 md:pt-[calc(var(--header-h)+8rem)]">
        <div data-ph-fade>
          <Breadcrumbs items={crumbs} />
        </div>
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p data-ph-fade className="t-eyebrow text-ember">
              {eyebrow}
            </p>
            <h1 data-ph-title className="t-mega mt-6">
              {title}
            </h1>
          </div>
          {(intro || aside) && (
            <div data-ph-fade className="lg:col-span-4 lg:pb-4">
              {intro && <div className="t-lead text-ink/80">{intro}</div>}
              {aside}
            </div>
          )}
        </div>
      </div>
      {image && (
        <div className="shell">
          <div data-ph-media className="relative aspect-[4/3] overflow-hidden rounded-[4px] md:aspect-[21/9]">
            <div className="absolute inset-0">
              <Img id={image} alt={imageAlt} sizes="100vw" priority position={position} className="h-[115%] w-full" />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
