import { useLayoutEffect, useRef, useState } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import { COMPANIES, GROUP_LABEL, type Company, type GroupId } from '../data/companies'
import { gsap, Flip, prefersReducedMotion, useGSAP, MQ } from '../lib/gsap'
import { SmartLink, isExternal } from './ui'
import { useSmoothScroll } from '../lib/smooth-scroll'

type Filter = 'all' | GroupId

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'industrial', label: 'Industrial' },
  { id: 'federal', label: 'Federal' },
  { id: 'real-estate', label: 'Real Estate' },
  { id: 'investment', label: 'Investments' },
]

/**
 * Filterable index of the Oakhaven family of companies.
 * Filtering animates with GSAP Flip; each tile opens a detail dialog.
 */
export function CompanyIndex({ initial = 'all', showFilters = true, only }: { initial?: Filter; showFilters?: boolean; only?: GroupId[] }) {
  const [filter, setFilter] = useState<Filter>(initial)
  const [active, setActive] = useState<Company | null>(null)
  const grid = useRef<HTMLUListElement>(null)
  const flipState = useRef<Flip.FlipState | null>(null)
  const list = only ? COMPANIES.filter((c) => only.includes(c.group)) : COMPANIES

  const change = (f: Filter) => {
    if (f === filter) return
    if (!prefersReducedMotion() && grid.current) flipState.current = Flip.getState(grid.current.querySelectorAll('[data-tile]'))
    setFilter(f)
  }

  useLayoutEffect(() => {
    const state = flipState.current
    if (!state || !grid.current) return
    flipState.current = null
    const tween = Flip.from(state, {
      duration: 0.8,
      ease: 'expo.inOut',
      absolute: true,
      stagger: 0.015,
      onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, scale: 0.85 }, { autoAlpha: 1, scale: 1, duration: 0.6, delay: 0.25 }),
      onLeave: (els) => gsap.to(els, { autoAlpha: 0, scale: 0.85, duration: 0.4 }),
    })
    return () => {
      tween.kill()
    }
  }, [filter])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        gsap.from('[data-tile]', {
          y: 40,
          autoAlpha: 0,
          stagger: { each: 0.03, from: 'start' },
          duration: 1,
          scrollTrigger: { trigger: grid.current, start: 'top 85%', once: true },
        })
      })
    },
    { scope: grid },
  )

  const count = list.filter((c) => filter === 'all' || c.group === filter).length

  return (
    <div>
      {showFilters && (
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div role="group" aria-label="Filter companies by group" className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                onClick={() => change(f.id)}
                className={`h-10 rounded-full border px-4 text-sm font-semibold transition-colors duration-300 ${
                  filter === f.id ? 'border-ink bg-ink text-paper' : 'border-ink/20 text-ink hover:border-ink'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <p className="text-sm text-stone" aria-live="polite">
            Showing {count} {count === 1 ? 'company' : 'companies'}
          </p>
        </div>
      )}

      <ul ref={grid} className="mt-8 grid grid-cols-2 border-l border-t border-ink/12 sm:grid-cols-3 lg:grid-cols-4">
        {list.map((c) => {
          const visible = filter === 'all' || c.group === filter
          return (
            <li key={c.id} data-tile data-flip-id={c.id} className={visible ? 'border-b border-r border-ink/12 bg-paper' : 'hidden'}>
              <button
                type="button"
                onClick={() => setActive(c)}
                className="group relative flex aspect-[4/3] w-full lg:aspect-[16/11] flex-col justify-between p-4 text-left transition-colors duration-500 hover:bg-white md:p-6"
                aria-haspopup="dialog"
              >
                <span className="flex items-start justify-between gap-2">
                  <span className="t-eyebrow text-[0.62rem] text-stone">{c.kind}</span>
                  <ArrowUpRight
                    className="size-4 text-ember opacity-0 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </span>
                <span className="grid flex-1 place-items-center px-2 py-3">
                  <img
                    src={c.logo}
                    alt=""
                    loading="lazy"
                    className="max-h-14 w-auto max-w-[85%] object-contain grayscale transition-[filter,transform] duration-700 group-hover:scale-105 group-hover:grayscale-0 md:max-h-16"
                  />
                </span>
                <span className="text-sm font-semibold leading-tight text-ink">{c.name}</span>
              </button>
            </li>
          )
        })}
      </ul>

      <CompanyDialog company={active} onClose={() => setActive(null)} />
    </div>
  )
}

function CompanyDialog({ company, onClose }: { company: Company | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const { stop, start } = useSmoothScroll()

  useLayoutEffect(() => {
    const d = ref.current
    if (!d) return
    if (company && !d.open) {
      d.showModal()
      stop()
      if (!prefersReducedMotion()) {
        gsap.fromTo(d, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, ease: 'expo.out' })
        gsap.fromTo(d.querySelectorAll('[data-d-anim]'), { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.05, delay: 0.1, duration: 0.8 })
      }
    }
    if (!company && d.open) {
      d.close()
      start()
    }
  }, [company, stop, start])

  return (
    <dialog
      ref={ref}
      onClose={() => {
        start()
        onClose()
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose()
      }}
      className="m-auto w-[min(640px,calc(100vw-2rem))] max-h-[calc(100svh-2rem)] overflow-y-auto rounded-[10px] bg-paper p-0 text-ink shadow-2xl backdrop:bg-ink/60 backdrop:backdrop-blur-sm"
      aria-labelledby="company-dialog-title"
    >
      {company && (
        <div className="p-6 md:p-10">
          <div className="flex items-start justify-between gap-6">
            <p data-d-anim className="t-eyebrow text-ember">
              {GROUP_LABEL[company.group]} · {company.kind}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="-mr-2 -mt-2 grid size-11 shrink-0 place-items-center rounded-full border border-ink/15 hover:bg-ink hover:text-paper"
              aria-label="Close"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
          <div data-d-anim className="mt-6 grid h-36 place-items-center rounded-[6px] bg-white p-6">
            <img src={company.logo} alt={`${company.name} logo`} className="max-h-20 w-auto max-w-[80%] object-contain" />
          </div>
          <h3 id="company-dialog-title" data-d-anim className="t-h2 mt-8">
            {company.name}
          </h3>
          <p data-d-anim className="mt-4 text-lg leading-relaxed text-ink/80">
            {company.summary}
          </p>
          <p data-d-anim className="mt-6 text-xs text-stone">
            {company.source}
          </p>
          <div data-d-anim className="mt-8">
            <SmartLink
              to={company.url}
              onClick={isExternal(company.url) ? undefined : onClose}
              className="inline-flex h-12 items-center gap-3 rounded-full bg-ink pl-6 pr-2 font-semibold text-paper transition-colors hover:bg-gold hover:text-ink"
            >
              {isExternal(company.url) ? 'Visit website' : company.url === '/contact' ? 'Ask about this company' : `View the ${GROUP_LABEL[company.group]}`}
              <span className="grid size-9 place-items-center rounded-full bg-paper/10">
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </span>
            </SmartLink>
          </div>
        </div>
      )}
    </dialog>
  )
}
