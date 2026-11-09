import { Link } from 'react-router-dom'
import { type Article, articleImage, formatDate } from '../data/news'
import { Img, hasMedia } from './Img'

type Props = {
  article: Article
  variant?: 'feature' | 'standard' | 'compact'
  headingLevel?: 'h2' | 'h3'
  sizes?: string
}

export function ArticleMeta({ article, light = false }: { article: Article; light?: boolean }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.78rem] font-semibold uppercase tracking-[0.14em] ${light ? 'text-paper/70' : 'text-stone'}`}>
      <span className={light ? 'text-gold' : 'text-ember'}>{article.category}</span>
      <span aria-hidden="true" className="h-3 w-px bg-current opacity-40" />
      <time dateTime={article.date}>{formatDate(article.date, 'short')}</time>
    </p>
  )
}

/** Editorial article card with image zoom and title underline on hover. */
export function ArticleCard({ article, variant = 'standard', headingLevel: H = 'h3', sizes }: Props) {
  const img = articleImage(article)
  const feature = variant === 'feature'
  return (
    <article className="group relative">
      {hasMedia(img) && variant !== 'compact' && (
        <div className={`overflow-hidden rounded-[4px] ${feature ? 'aspect-[16/10]' : 'aspect-[16/10]'}`}>
          <Img
            id={img}
            alt={article.imageAlt}
            sizes={sizes ?? (feature ? '(min-width:1024px) 58vw, 100vw' : '(min-width:1024px) 30vw, 100vw')}
            className="h-full w-full transition-transform duration-[1.4s] ease-[var(--ease-out)] group-hover:scale-[1.04]"
          />
        </div>
      )}
      <div className={variant === 'compact' ? '' : 'mt-6'}>
        <ArticleMeta article={article} />
        <H className={`mt-3 ${feature ? 't-h2' : 't-h3'} text-ink`}>
          <Link to={`/news/${article.slug}`} className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-700 ease-[var(--ease-out)] group-hover:bg-[length:100%_1px] after:absolute after:inset-0">
            {article.title}
          </Link>
        </H>
        {feature && <p className="mt-4 max-w-2xl text-ink/75 md:text-lg">{article.excerpt}</p>}
      </div>
    </article>
  )
}
