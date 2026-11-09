import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { TypeHero } from '../components/PageHero'
import { ArticleCard, ArticleMeta } from '../components/ArticleCard'
import { Img, hasMedia } from '../components/Img'
import { Button } from '../components/ui'
import { ARTICLES, articleImage, type Article } from '../data/news'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'

type Filter = 'All' | Article['category']
const FILTERS: Filter[] = ['All', 'News', 'Podcast']

export default function News() {
  const [filter, setFilter] = useState<Filter>('All')
  const grid = useRef<HTMLDivElement>(null)
  const items = ARTICLES.filter((a) => filter === 'All' || a.category === filter)
  const [lead, ...rest] = items

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from('[data-news-item]', { y: 40, autoAlpha: 0, stagger: 0.06, duration: 1, ease: 'expo.out', clearProps: 'all' })
    },
    { dependencies: [filter], scope: grid },
  )

  return (
    <>
      <Seo title="News" description="News, announcements and episodes of The Long View podcast from Oakhaven." />
      <TypeHero
        eyebrow="Insights"
        crumbs={[{ label: 'News' }]}
        title={
          <>
            News and <span className="italic-accent text-ember">insights.</span>
          </>
        }
        intro="Announcements, milestones and conversations on patient capital and community ownership."
      />

      <section className="bg-paper pb-24 md:pb-36" aria-label="Articles">
        <div className="shell">
          <div className="flex flex-wrap items-center justify-between gap-4 border-y border-ink/15 py-4">
            <div role="group" aria-label="Filter by category" className="flex gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                  className={`h-10 rounded-full px-4 text-sm font-semibold transition-colors ${
                    filter === f ? 'bg-ink text-paper' : 'text-ink hover:bg-paper-2'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <p className="text-sm text-stone" aria-live="polite">
              {items.length} articles
            </p>
          </div>

          <div ref={grid}>
            {lead && (
              <article data-news-item className="group relative mt-12 grid gap-8 lg:grid-cols-12 lg:items-center">
                {hasMedia(articleImage(lead)) && (
                  <div className="aspect-[16/10] overflow-hidden rounded-[4px] lg:col-span-7">
                    <Img
                      id={articleImage(lead)}
                      alt={lead.imageAlt}
                      sizes="(min-width:1024px) 58vw, 100vw"
                      priority
                      className="h-full w-full transition-transform duration-[1.4s] ease-[var(--ease-out)] group-hover:scale-[1.04]"
                    />
                  </div>
                )}
                <div className="lg:col-span-5">
                  <ArticleMeta article={lead} />
                  <h2 className="t-h1 mt-4">
                    <Link to={`/news/${lead.slug}`} className="after:absolute after:inset-0">
                      {lead.title}
                    </Link>
                  </h2>
                  <p className="mt-5 text-lg text-ink/75">{lead.excerpt}</p>
                </div>
              </article>
            )}

            <div className="mt-20 grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-12">
              {rest.map((a, i) => {
                // Editorial rhythm: rows alternate 7/5 and 5/7 columns
                const wide = i % 4 === 0 || i % 4 === 3
                return (
                  <div key={a.slug} data-news-item className={wide ? 'lg:col-span-7' : 'lg:col-span-5'}>
                    <ArticleCard article={a} sizes={wide ? '(min-width:1024px) 58vw, 50vw' : '(min-width:1024px) 42vw, 50vw'} />
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-24 grid gap-8 rounded-[6px] bg-ink p-8 text-paper md:grid-cols-12 md:items-center md:p-12" data-surface="dark">
            <div className="md:col-span-8">
              <p className="t-eyebrow text-gold">Media enquiries</p>
              <p className="t-h2 mt-4">Writing about Oakhaven, or want a guest for your podcast?</p>
            </div>
            <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
              <Button to="/contact" variant="paper" magnetic={false}>
                Contact our team
              </Button>
              <Button to="/impact-report" variant="outline-light" magnetic={false}>
                Impact Report
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
