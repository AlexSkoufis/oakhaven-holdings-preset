import raw from './news.json'

// News articles and podcast episodes live in news.json. Demo content.
// `image` is a key from src/data/media.json (see scripts/images.mjs).

export type ArticleBlock =
  | { type: 'p' | 'heading' | 'li'; text: string }
  | { type: 'quote'; text: string; author: string; role: string }

export type Article = {
  slug: string
  title: string
  date: string
  category: 'News' | 'Podcast'
  excerpt: string
  image: string
  imageAlt: string
  blocks: ArticleBlock[]
}

export const ARTICLES = raw as Article[]

export const articleImage = (a: Article) => a.image

export const formatDate = (iso: string, style: 'long' | 'short' = 'long') =>
  new Date(iso + 'T12:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: style === 'long' ? 'long' : 'short',
    day: 'numeric',
  })

export const findArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug)
