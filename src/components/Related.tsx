import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { FadeIn } from './ui'

export type RelatedItem = { label: string; to: string; kicker: string }

/** Large typographic next-step links that close internal pages. */
export function Related({ items, title = 'Continue exploring' }: { items: RelatedItem[]; title?: string }) {
  return (
    <section className="bg-paper-2 py-20 md:py-28" aria-labelledby="related-title">
      <div className="shell">
        <h2 id="related-title" className="t-eyebrow text-ember">
          {title}
        </h2>
        <FadeIn as="ul" className="mt-8 border-t border-ink/15" stagger={0.08}>
          {items.map((it) => (
            <li key={it.to} className="border-b border-ink/15">
              <Link to={it.to} className="group flex items-center justify-between gap-6 py-7 md:py-9">
                <span>
                  <span className="t-eyebrow block text-stone">{it.kicker}</span>
                  <span className="t-h1 mt-2 block transition-transform duration-700 ease-[var(--ease-out)] group-hover:translate-x-3">
                    {it.label}
                  </span>
                </span>
                <span className="grid size-14 shrink-0 place-items-center rounded-full border border-ink/20 transition-all duration-500 group-hover:-rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-paper md:size-20">
                  <ArrowRight className="size-5 md:size-6" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </FadeIn>
      </div>
    </section>
  )
}
