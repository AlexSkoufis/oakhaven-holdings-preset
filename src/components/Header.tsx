import { useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, ArrowUpRight } from 'lucide-react'
import { NAV, type NavGroup } from '../data/site'
import { Logo } from './Logo'
import { SmartLink, Magnetic, isExternal } from './ui'
import { useHeaderTheme } from './header-theme'
import { MobileMenu } from './MobileMenu'
import { gsap, useGSAP, MQ } from '../lib/gsap'

export function Header() {
  const { theme } = useHeaderTheme()
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [surface, setSurface] = useState<'light' | 'dark'>('light')
  const headerRef = useRef<HTMLElement>(null)

  // The header stays put while scrolling. At most once per frame it
  // checks whether it has left the top and what surface sits beneath it.
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      setScrolled(window.scrollY > 24)
      const bar = headerRef.current?.querySelector<HTMLElement>('[data-bar]')
      const probe = document.elementFromPoint(8, (bar?.getBoundingClientRect().bottom ?? 76) + 2)
      setSurface(probe?.closest('[data-surface="dark"]') ? 'dark' : 'light')
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [pathname])

  // Close menus on navigation.
  useEffect(() => {
    setOpen(null)
    setMenuOpen(false)
  }, [pathname])

  // Escape and outside click close the open dropdown.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const btn = headerRef.current?.querySelector<HTMLButtonElement>(`[data-group="${open}"]`)
        setOpen(null)
        btn?.focus()
      }
    }
    const onDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpen(null)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [open])

  // Entrance choreography: the logo rings grow in, then the nav items.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({ delay: 0.15 })
        tl.from('[data-rays] path', {
          scale: 0,
          transformOrigin: '50% 100%',
          stagger: 0.05,
          duration: 1,
          ease: 'expo.out',
        })
          .from('[data-word]', { autoAlpha: 0, x: -10, duration: 0.9 }, '<0.2')
          .from('[data-nav-item]', { y: -16, autoAlpha: 0, stagger: 0.05, duration: 0.9, clearProps: 'transform' }, '<0.1')
      })
    },
    { scope: headerRef },
  )

  const overHero = !scrolled && !open
  const onDark = !open && (overHero ? theme === 'dark' : surface === 'dark')
  const light = onDark // light text over dark imagery or sections
  const active = (g: NavGroup) =>
    g.links.some((l) => !isExternal(l.to) && (pathname === l.to || pathname.startsWith(l.to + '/'))) ||
    pathname.startsWith(g.to)

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,color] duration-500 ease-[var(--ease-out)] will-change-transform ${
          light ? 'text-paper' : 'text-ink'
        }`}
      >
        {/* Background layer fades instead of re-painting the blur on every change */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 bottom-0 -z-10 transition-opacity duration-500 ${
            onDark ? 'bg-ink/90 shadow-[0_1px_0_var(--line-light)]' : 'bg-paper/90 shadow-[0_1px_0_var(--line-dark)]'
          } backdrop-blur-md ${overHero ? 'opacity-0' : 'opacity-100'}`}
          style={{ top: 0 }}
        />
        <div data-bar className="shell flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link to="/" className="relative z-10 shrink-0" aria-label="Oakhaven home">
            <Logo className="h-[26px] w-auto md:h-[30px]" />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV.map((g) => (
                <li key={g.label} data-nav-item>
                  <DesktopGroup
                    group={g}
                    isOpen={open === g.label}
                    isActive={active(g)}
                    onToggle={(v) => setOpen(v ? g.label : null)}
                  />
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2" data-nav-item>
            <div className="hidden lg:block">
            <Magnetic strength={0.2}>
              <Link
                to="/contact"
                className={`inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors duration-500 ${
                  light ? 'bg-paper text-ink hover:bg-gold' : 'bg-ink text-paper hover:bg-gold hover:text-ink'
                }`}
              >
                Get in Touch
              </Link>
            </Magnetic>
            </div>
            <button
              type="button"
              className="relative grid size-12 place-items-center rounded-full lg:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(true)}
            >
              <span className="flex w-6 flex-col gap-[6px]" aria-hidden="true">
                <span className="h-[1.5px] w-full bg-current" />
                <span className="h-[1.5px] w-2/3 self-end bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}

function DesktopGroup({
  group,
  isOpen,
  isActive,
  onToggle,
}: {
  group: NavGroup
  isOpen: boolean
  isActive: boolean
  onToggle: (open: boolean) => void
}) {
  const id = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const hoverTimer = useRef<number | undefined>(undefined)

  useGSAP(
    () => {
      if (!isOpen || !panelRef.current) return
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        gsap.from(panelRef.current!.querySelectorAll('[data-menu-anim]'), {
          y: 18,
          autoAlpha: 0,
          stagger: 0.04,
          duration: 0.8,
          ease: 'expo.out',
        })
      })
    },
    { dependencies: [isOpen] },
  )

  const enter = () => {
    window.clearTimeout(hoverTimer.current)
    hoverTimer.current = window.setTimeout(() => onToggle(true), 90)
  }
  const leave = () => {
    window.clearTimeout(hoverTimer.current)
    hoverTimer.current = window.setTimeout(() => onToggle(false), 160)
  }

  return (
    <div onPointerEnter={(e) => e.pointerType === 'mouse' && enter()} onPointerLeave={(e) => e.pointerType === 'mouse' && leave()}>
      <button
        type="button"
        data-group={group.label}
        aria-expanded={isOpen}
        aria-controls={id}
        onClick={() => onToggle(!isOpen)}
        className="group relative flex h-11 items-center gap-1.5 rounded-full px-4 text-[0.92rem] font-medium"
      >
        <span className="relative">
          {group.label}
          <span
            aria-hidden="true"
            className={`absolute -bottom-1 left-0 h-px bg-current transition-all duration-500 ease-[var(--ease-out)] ${
              isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-60'
            }`}
          />
        </span>
        <ChevronDown
          className={`size-3.5 opacity-60 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      <div
        id={id}
        ref={panelRef}
        hidden={!isOpen}
        className="absolute inset-x-0 top-full border-t border-ink/10 bg-paper text-ink shadow-[0_30px_60px_-30px_rgb(20_24_26/0.35)]"
      >
        <div className="shell grid grid-cols-12 gap-8 py-12">
          <div className="col-span-4" data-menu-anim>
            <p className="t-eyebrow text-ember">{group.label}</p>
            <p className="t-h3 mt-4 max-w-[22ch] text-ink/80">{group.intro}</p>
          </div>
          <ul className="col-span-8 grid grid-cols-2 gap-x-10">
            {group.links.map((l) => (
              <li key={l.to} data-menu-anim className="border-b border-ink/10">
                {isExternal(l.to) ? (
                  <SmartLink
                    to={l.to}
                    className="group flex items-center justify-between py-4 font-display text-2xl tracking-tight transition-colors hover:text-ember"
                  >
                    <span>{l.label}</span>
                    <ArrowUpRight className="size-5 opacity-50 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </SmartLink>
                ) : (
                  <NavLink
                    to={l.to}
                    end
                    className={({ isActive }) =>
                      `group flex items-center justify-between py-4 font-display text-2xl tracking-tight transition-colors hover:text-ember ${
                        isActive ? 'text-ember' : ''
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span>{l.label}</span>
                        <span
                          aria-hidden="true"
                          className={`size-2 rounded-full bg-amber transition-transform duration-500 ${isActive ? 'scale-100' : 'scale-0 group-hover:scale-100'}`}
                        />
                      </>
                    )}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
