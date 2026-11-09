import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUp, ArrowRight } from 'lucide-react'
import { NAV, ORG } from '../data/site'
import CREDITS from '../data/credits.json'
import { Logo, Rings } from './Logo'
import { SmartLink } from './ui'
import { gsap, useGSAP, MQ } from '../lib/gsap'
import { useSmoothScroll } from '../lib/smooth-scroll'

export function Footer() {
  const ref = useRef<HTMLElement>(null)
  const { scrollTo } = useSmoothScroll()

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        gsap.from('[data-footer-word] svg', {
          yPercent: 100,
          duration: 1.4,
          ease: 'expo.out',
          scrollTrigger: { trigger: '[data-footer-word]', start: 'top 98%', once: true },
        })
        gsap.from('[data-footer-fan]', {
          rotate: -35,
          scale: 0.6,
          autoAlpha: 0,
          duration: 1.8,
          ease: 'expo.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
        })
      })
    },
    { scope: ref },
  )

  const year = new Date().getFullYear()

  return (
    <footer ref={ref} data-surface="dark" className="relative overflow-hidden bg-ink text-paper" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">
        Site footer
      </h2>
      <Rings className="pointer-events-none absolute -right-24 -top-10 w-[520px] text-paper/[0.035]" data-footer-fan />

      <div className="shell relative pt-20 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" aria-label="Oakhaven home" className="inline-block">
              <Logo className="h-8 w-auto text-paper" />
            </Link>
            <p className="mt-8 max-w-sm text-paper/70">
              Oakhaven is a Michigan holding company owned by the families of the Alder Valley, through their community trust.
            </p>
            <Link
              to="/our-roots/history"
              className="mt-8 inline-flex items-center gap-4 rounded-2xl bg-paper p-3 pr-5 text-ink transition-colors hover:bg-gold"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-ink text-gold">
                <Rings className="w-8" />
              </span>
              <span className="text-sm font-semibold leading-tight">
                Owned by the Alder Valley
                <br />
                Community Trust
              </span>
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-5">
            {NAV.map((g) => (
              <div key={g.label}>
                <p className="t-eyebrow text-gold">{g.label}</p>
                <ul className="mt-4 space-y-2.5">
                  {g.links.map((l) => (
                    <li key={l.to}>
                      <SmartLink to={l.to} className="u-link text-[0.95rem] text-paper/75 transition-colors hover:text-paper">
                        {l.label}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="lg:col-span-3">
            <p className="t-eyebrow text-gold">Headquarters</p>
            <address className="mt-4 not-italic leading-relaxed text-paper/75">
              {ORG.address.line1}
              <br />
              {ORG.address.line2}
              <br />
              {ORG.address.city}, {ORG.address.region} {ORG.address.postal}
            </address>
            <div className="mt-4 flex flex-col items-start gap-2">
              <a href={`mailto:${ORG.email}`} className="u-link text-paper">
                {ORG.email}
              </a>
              <SmartLink to={ORG.mapsUrl} className="u-link text-paper/75 hover:text-paper">
                Get directions
              </SmartLink>
            </div>
            <p className="t-eyebrow mt-10 text-gold">Follow</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {ORG.social.map((s) => (
                <li key={s.label}>
                  <SmartLink
                    to={s.href}
                    className="inline-flex h-10 items-center rounded-full border border-paper/20 px-4 text-sm transition-colors hover:border-gold hover:bg-gold hover:text-ink"
                  >
                    {s.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div aria-hidden="true" data-footer-word className="mt-20 select-none overflow-hidden md:mt-28">
          <svg viewBox="0 -12 1000 268" className="block w-full text-paper/90">
            <text
              x="0"
              y="178"
              textLength="1000"
              lengthAdjust="spacingAndGlyphs"
              fill="currentColor"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 232, letterSpacing: '-0.04em' }}
            >
              Oakhaven
            </text>
          </svg>
        </div>

        <div className="mt-10 flex flex-col gap-6 border-t border-paper/12 py-8 text-sm text-paper/60 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p>
              © {year} {ORG.legalName}. All rights reserved.
            </p>
            <p>
              <a href={`tel:${ORG.phone.replace(/[^+\d]/g, '')}`} className="u-link text-paper/85">
                {ORG.phone}
              </a>
            </p>
            {CREDITS.length > 0 && (
              <details>
                <summary className="cursor-pointer list-none text-paper/60 hover:text-paper [&::-webkit-details-marker]:hidden">
                  Photo credits
                </summary>
                <ul className="mt-3 max-w-3xl space-y-1 text-xs text-paper/55">
                  {CREDITS.map((c) => (
                    <li key={c.key}>
                      <a href={c.url} target="_blank" rel="noopener noreferrer" className="u-link">
                        {c.title}
                      </a>
                      {c.artist ? `, ${c.artist}` : ''} ({c.license}). Illustrative photograph.
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </div>
          <div className="flex items-center gap-6">
            
            <button
              type="button"
              onClick={() => scrollTo(0)}
              className="grid size-11 place-items-center rounded-full border border-paper/20 text-paper transition-colors hover:bg-gold hover:text-ink"
              aria-label="Back to top"
            >
              <ArrowUp className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
