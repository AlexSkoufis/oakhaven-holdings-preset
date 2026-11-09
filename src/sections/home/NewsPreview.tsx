import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { ARTICLES, articleImage, formatDate } from '../../data/news'
import { ArticleCard } from '../../components/ArticleCard'
import { Button, Eyebrow, SplitReveal, FadeIn } from '../../components/ui'
import { mediaSrc, hasMedia } from '../../components/Img'
import { gsap, useGSAP, MQ } from '../../lib/gsap'

export function NewsPreview() {
  const root = useRef<HTMLElement>(null)
  const news = ARTICLES.filter((a) => a.category === 'News')
  const [feature, second, third, ...rest] = news
  const list = rest.slice(0, 4)

  // Cursor-following image preview for the headline list (fine pointers only).
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(`${MQ.finePointer} and ${MQ.motion}`, () => {
        const preview = root.current!.querySelector<HTMLElement>('[data-preview]')!
        const img = preview.querySelector('img')!
        const xTo = gsap.quickTo(preview, 'x', { duration: 0.6, ease: 'power3' })
        const yTo = gsap.quickTo(preview, 'y', { duration: 0.6, ease: 'power3' })
        const rows = gsap.utils.toArray<HTMLElement>('[data-row]')
        const list = root.current!.querySelector<HTMLElement>('[data-list]')!
        const move = (e: PointerEvent) => {
          xTo(e.clientX + 24)
          yTo(e.clientY - 120)
        }
        const enter = (e: Event) => {
          const src = (e.currentTarget as HTMLElement).dataset.img
          if (src) img.src = src
          gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'expo.out' })
        }
        const leave = () => gsap.to(preview, { autoAlpha: 0, scale: 0.85, duration: 0.4 })
        list.addEventListener('pointermove', move)
        rows.forEach((r) => r.addEventListener('pointerenter', enter))
        list.addEventListener('pointerleave', leave)
        return () => {
          list.removeEventListener('pointermove', move)
          rows.forEach((r) => r.removeEventListener('pointerenter', enter))
          list.removeEventListener('pointerleave', leave)
        }
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative bg-paper py-24 md:py-36" aria-labelledby="news-title">
      <div className="shell">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Eyebrow index="06" className="text-ember">
              News and Insights
            </Eyebrow>
            <SplitReveal id="news-title" className="t-display mt-8">
              The latest from Oakhaven.
            </SplitReveal>
          </div>
          <Button to="/news" variant="outline-dark" magnetic={false}>
            All News
          </Button>
        </div>

        <div className="mt-16 grid gap-x-10 gap-y-16 lg:grid-cols-12">
          <FadeIn className="lg:col-span-7">
            <ArticleCard article={feature} variant="feature" headingLevel="h3" />
          </FadeIn>
          <FadeIn className="grid content-start gap-14 lg:col-span-5" stagger={0.12}>
            <ArticleCard article={second} />
            <ArticleCard article={third} />
          </FadeIn>
        </div>

        <ul data-list className="mt-20 border-t border-ink/15">
          {list.map((a) => (
            <li
              key={a.slug}
              data-row
              data-img={hasMedia(articleImage(a)) ? mediaSrc(articleImage(a), 800) : undefined}
              className="group relative border-b border-ink/15"
            >
              <Link to={`/news/${a.slug}`} className="grid gap-2 py-6 transition-[padding] duration-500 ease-[var(--ease-out)] md:grid-cols-12 md:items-center md:gap-6 md:hover:pl-4">
                <time dateTime={a.date} className="text-sm text-stone md:col-span-2">
                  {formatDate(a.date, 'short')}
                </time>
                <span className="font-display text-xl leading-snug tracking-tight md:col-span-9 md:text-2xl">{a.title}</span>
                <ArrowUpRight
                  className="hidden size-6 justify-self-end text-ember transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 md:col-span-1 md:block"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div
        data-preview
        aria-hidden="true"
        className="pointer-events-none invisible fixed left-0 top-0 z-40 hidden w-[300px] scale-[0.85] overflow-hidden rounded-[4px] opacity-0 shadow-2xl md:block"
      >
        <img alt="" className="aspect-[4/3] w-full object-cover" />
      </div>
    </section>
  )
}
