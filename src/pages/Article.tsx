import { useState, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Link2, Check } from 'lucide-react'
import { Seo } from '../components/Seo'
import { Breadcrumbs } from '../components/PageHero'
import { useHeroTheme } from '../components/header-theme'
import { Img, hasMedia, mediaSrc } from '../components/Img'
import { ArticleCard } from '../components/ArticleCard'
import { Button, FadeIn, SplitReveal } from '../components/ui'
import { ARTICLES, articleImage, findArticle, formatDate, type ArticleBlock } from '../data/news'
import NotFound from './NotFound'

function Body({ blocks }: { blocks: ArticleBlock[] }) {
  const out: ReactNode[] = []
  let list: string[] = []
  const flush = (key: string) => {
    if (list.length) {
      out.push(
        <ul key={key} className="my-6 space-y-2 pl-1">
          {list.map((t) => (
            <li key={t} className="flex gap-3">
              <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-amber" />
              <span>{t}</span>
            </li>
          ))}
        </ul>,
      )
      list = []
    }
  }
  blocks.forEach((b, i) => {
    if (b.type === 'li') {
      list.push(b.text)
      return
    }
    flush(`l${i}`)
    if (b.type === 'heading') out.push(<h2 key={i} className="t-h3 mb-4 mt-12">{b.text}</h2>)
    else if (b.type === 'quote')
      out.push(
        <figure key={i} className="my-12 border-l-2 border-amber pl-6 md:-ml-8 md:pl-8">
          <blockquote className="font-display text-[1.6rem] leading-snug tracking-tight text-ink md:text-[1.9rem]">{b.text}</blockquote>
          {b.author && (
            <figcaption className="mt-5 text-sm">
              <span className="font-semibold">{b.author}</span>
              {b.role && <span className="text-stone">, {b.role}</span>}
            </figcaption>
          )}
        </figure>,
      )
    else out.push(<p key={i} className="mb-6">{b.text}</p>)
  })
  flush('end')
  return <>{out}</>
}

export default function Article() {
  const { slug = '' } = useParams()
  return <ArticleView key={slug} slug={slug} />
}

function ArticleView({ slug }: { slug: string }) {
  const article = findArticle(slug)
  useHeroTheme('light')
  const [copied, setCopied] = useState(false)

  if (!article) return <NotFound />

  const idx = ARTICLES.indexOf(article)
  const related = ARTICLES.filter((a) => a.slug !== slug && a.category === article.category).slice(0, 3)
  const next = ARTICLES[idx + 1]
  const img = articleImage(article)
  const isPodcast = article.category === 'Podcast'

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <>
      <Seo title={article.title} description={article.excerpt} image={hasMedia(img) ? mediaSrc(img, 1600) : undefined} />
      <article className="bg-paper">
        <header className="shell pt-[calc(var(--header-h)+5rem)] md:pt-[calc(var(--header-h)+7rem)]">
          <Breadcrumbs items={[{ label: 'News', to: '/news' }, { label: article.category === 'News' ? 'Article' : article.category }]} />
          <div className="mt-10 max-w-5xl">
            <p className="flex flex-wrap items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-stone">
              <span className="text-ember">{article.category}</span>
              <span aria-hidden="true" className="h-3 w-px bg-current opacity-40" />
              <time dateTime={article.date}>{formatDate(article.date)}</time>
            </p>
            <SplitReveal as="h1" immediate className="t-h1 mt-6">
              {article.title}
            </SplitReveal>
            <FadeIn delay={0.3}>
              <p className="t-lead mt-8 max-w-3xl text-ink/75">{article.excerpt}</p>
            </FadeIn>
          </div>
        </header>

        {hasMedia(img) && (
          <div className="shell mt-14">
            <div className="aspect-[16/9] overflow-hidden rounded-[4px]">
              <Img id={img} alt={article.imageAlt} sizes="100vw" priority className="h-full w-full" />
            </div>
          </div>
        )}

        <div className="shell grid gap-12 py-16 md:py-24 lg:grid-cols-12">
          <aside className="order-2 lg:order-1 lg:col-span-3">
            <div className="space-y-6 lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <Link to="/news" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-ember">
                <ArrowLeft className="size-4" aria-hidden="true" /> All news
              </Link>
              <div className="border-t border-ink/15 pt-6">
                <button type="button" onClick={copy} className="inline-flex h-10 items-center gap-2 rounded-full border border-ink/20 px-4 text-sm font-semibold hover:bg-ink hover:text-paper">
                  {copied ? <Check className="size-4" aria-hidden="true" /> : <Link2 className="size-4" aria-hidden="true" />}
                  <span aria-live="polite">{copied ? 'Link copied' : 'Copy link'}</span>
                </button>
              </div>
            </div>
          </aside>

          <div className="order-1 text-[1.12rem] leading-[1.75] text-ink/85 lg:order-2 lg:col-span-7 lg:col-start-5">
            <Body blocks={article.blocks} />
            {isPodcast && (
              <div className="mt-10 rounded-[6px] bg-paper-2 p-8">
                <p className="t-h3">Listen to the full episode</p>
                <p className="mt-2 text-ink/70">The Long View is available wherever you get your podcasts. Link your own player or embed here.</p>
                <div className="mt-6">
                  <Button to="/contact" variant="ink" magnetic={false}>
                    Suggest a guest
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      {next && (
        <Link to={`/news/${next.slug}`} data-surface="dark" className="group block bg-ink text-paper">
          <div className="shell grid gap-6 py-16 md:grid-cols-12 md:items-center md:py-24">
            <p className="t-eyebrow text-gold md:col-span-2">Next story</p>
            <p className="t-h1 transition-transform duration-700 ease-[var(--ease-out)] group-hover:translate-x-3 md:col-span-9">{next.title}</p>
          </div>
        </Link>
      )}

      {related.length > 0 && (
        <section className="bg-paper py-20 md:py-28" aria-labelledby="more-title">
          <div className="shell">
            <h2 id="more-title" className="t-h2">
              More {article.category === 'Podcast' ? 'episodes' : 'news'}
            </h2>
            <FadeIn className="mt-12 grid gap-12 md:grid-cols-3" stagger={0.1}>
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </FadeIn>
          </div>
        </section>
      )}
    </>
  )
}
