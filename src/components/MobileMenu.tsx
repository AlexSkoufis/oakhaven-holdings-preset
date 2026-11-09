import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Plus, X, ArrowUpRight } from 'lucide-react'
import { NAV, ORG } from '../data/site'
import { Logo } from './Logo'
import { SmartLink, isExternal } from './ui'
import { gsap, prefersReducedMotion } from '../lib/gsap'
import { useSmoothScroll } from '../lib/smooth-scroll'

/**
 * Fullscreen mobile and tablet menu. Uses a dialog role, traps focus,
 * closes on Escape, and locks page scroll while open. Links work even
 * before the entrance animation finishes.
 */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)
  const { stop, start } = useSmoothScroll()
  const opener = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = prefersReducedMotion()
    if (open) {
      opener.current = document.activeElement as HTMLElement
      setVisible(true)
      stop()
      document.documentElement.style.overflow = 'hidden'
      const tl = gsap.timeline()
      tl.fromTo(el, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: reduced ? 0 : 0.9, ease: 'expo.inOut' })
      if (!reduced) {
        tl.from(el.querySelectorAll('[data-m-item]'), { yPercent: 100, autoAlpha: 0, stagger: 0.05, duration: 0.9, ease: 'expo.out' }, '-=0.35')
      }
      requestAnimationFrame(() => el.querySelector<HTMLElement>('[data-close]')?.focus())
      return () => {
        tl.kill()
      }
    } else if (visible) {
      start()
      document.documentElement.style.overflow = ''
      const tl = gsap.to(el, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: reduced ? 0 : 0.7,
        ease: 'expo.inOut',
        onComplete: () => setVisible(false),
      })
      opener.current?.focus?.()
      return () => {
        tl.kill()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && ref.current) {
        const f = ref.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(
    () => () => {
      document.documentElement.style.overflow = ''
    },
    [],
  )

  return (
    <div
      ref={ref}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      hidden={!visible && !open}
      className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ink text-paper lg:hidden"
      style={{ clipPath: 'inset(0% 0% 100% 0%)' }}
    >
      <div className="shell flex h-[var(--header-h)] shrink-0 items-center justify-between">
        <Logo className="h-[26px] w-auto text-paper" />
        <button
          type="button"
          data-close
          onClick={onClose}
          className="grid size-12 place-items-center rounded-full border border-paper/20"
          aria-label="Close menu"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>

      <nav aria-label="Mobile" className="shell flex-1 pb-10 pt-6">
        <ul>
          {NAV.map((g, i) => {
            const isOpen = expanded === g.label
            const panelId = `m-panel-${i}`
            return (
              <li key={g.label} className="overflow-hidden border-b border-paper/12">
                <div data-m-item>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between py-4 text-left font-display text-[clamp(2rem,8vw,3.25rem)] leading-none tracking-tight"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setExpanded(isOpen ? null : g.label)}
                  >
                    <span>
                      <span className="mr-3 align-top font-sans text-xs tracking-widest text-gold">0{i + 1}</span>
                      {g.label}
                    </span>
                    <Plus className={`size-6 shrink-0 transition-transform duration-500 ${isOpen ? 'rotate-45' : ''}`} aria-hidden="true" />
                  </button>
                  <div
                    id={panelId}
                    className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  >
                    <ul className="overflow-hidden" hidden={!isOpen}>
                      {g.links.map((l) => (
                        <li key={l.to}>
                          {isExternal(l.to) ? (
                            <SmartLink to={l.to} className="flex items-center gap-2 py-2.5 pl-9 text-lg text-paper/75 hover:text-gold" onClick={onClose}>
                              {l.label}
                              <ArrowUpRight className="size-4" aria-hidden="true" />
                            </SmartLink>
                          ) : (
                            <NavLink
                              to={l.to}
                              end
                              onClick={onClose}
                              className={({ isActive }) =>
                                `block py-2.5 pl-9 text-lg ${isActive ? 'text-gold' : 'text-paper/75 hover:text-gold'}`
                              }
                            >
                              {l.label}
                            </NavLink>
                          )}
                        </li>
                      ))}
                      <li className="h-4" aria-hidden="true" />
                    </ul>
                  </div>
                </div>
              </li>
            )
          })}
          <li className="overflow-hidden">
            <div data-m-item>
              <NavLink
                to="/contact"
                onClick={onClose}
                className="mt-8 inline-flex h-14 items-center rounded-full bg-gold px-7 text-lg font-semibold text-ink"
              >
                Get in Touch
              </NavLink>
            </div>
          </li>
        </ul>

        <div className="mt-12 grid gap-1 text-sm text-paper/60" data-m-item>
          <p>
            {ORG.address.line1}, {ORG.address.line2}
          </p>
          <p>
            {ORG.address.city}, {ORG.address.region} {ORG.address.postal}
          </p>
          <a href={`mailto:${ORG.email}`} className="mt-2 text-paper hover:text-gold">
            {ORG.email}
          </a>
        </div>
      </nav>
    </div>
  )
}
