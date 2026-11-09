import { ARTICLES } from '../data/news'
import { ArticleCard } from './ArticleCard'
import { ArrowLink, Eyebrow, FadeIn } from './ui'

/** Latest news whose title or excerpt mention (whole word, case-sensitive) any of the given terms. */
export function RelatedNews({ terms, title = 'In the news' }: { terms: string[]; title?: string }) {
  const re = new RegExp(`(?<![A-Za-z])(${terms.join('|')})(?![A-Za-z])`)
  const items = ARTICLES.filter((a) => a.category === 'News' && (re.test(a.title) || re.test(a.excerpt))).slice(0, 3)
  if (!items.length) return null
  return (
    <section className="bg-paper py-24 md:py-32" aria-labelledby="related-news-title">
      <div className="shell">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow className="text-ember">News</Eyebrow>
            <h2 id="related-news-title" className="t-h1 mt-6">
              {title}
            </h2>
          </div>
          <ArrowLink to="/news" className="text-ink">
            All news
          </ArrowLink>
        </div>
        <FadeIn className="mt-14 grid gap-12 md:grid-cols-3" stagger={0.1}>
          {items.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </FadeIn>
      </div>
    </section>
  )
}
