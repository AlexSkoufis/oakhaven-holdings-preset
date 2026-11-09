import { useRef, type ReactNode, type ElementType, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { gsap, useGSAP, MQ, SplitText, SPLIT } from '../lib/gsap'

export const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href)

/* -------------------------------------------------------------- */
/* SmartLink: internal routes use the router, external links open  */
/* in a new tab with safe rel attributes.                          */
/* -------------------------------------------------------------- */
type SmartLinkProps = {
  to: string
  children: ReactNode
  className?: string
  ariaLabel?: string
  style?: CSSProperties
  onClick?: () => void
}
export function SmartLink({ to, children, className, ariaLabel, style, onClick }: SmartLinkProps) {
  if (isExternal(to)) {
    const newTab = !to.startsWith('mailto:') && !to.startsWith('tel:')
    return (
      <a
        href={to}
        className={className}
        aria-label={ariaLabel}
        style={style}
        onClick={onClick}
        {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
        {newTab && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    )
  }
  return (
    <Link to={to} className={className} aria-label={ariaLabel} style={style} onClick={onClick}>
      {children}
    </Link>
  )
}

/* -------------------------------------------------------------- */
/* Magnetic: element drifts toward the pointer on fine pointers.   */
/* -------------------------------------------------------------- */
export function Magnetic({ children, strength = 0.35, className = '' }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(`${MQ.finePointer} and ${MQ.motion}`, () => {
        const el = ref.current!
        const inner = el.firstElementChild as HTMLElement | null
        const xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })
        const yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })
        const ixTo = inner ? gsap.quickTo(inner, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.4)' }) : null
        const iyTo = inner ? gsap.quickTo(inner, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.4)' }) : null
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect()
          const dx = e.clientX - (r.left + r.width / 2)
          const dy = e.clientY - (r.top + r.height / 2)
          xTo(dx * strength)
          yTo(dy * strength)
          ixTo?.(dx * strength * 0.25)
          iyTo?.(dy * strength * 0.25)
        }
        const leave = () => {
          xTo(0)
          yTo(0)
          ixTo?.(0)
          iyTo?.(0)
        }
        el.addEventListener('pointermove', move)
        el.addEventListener('pointerleave', leave)
        return () => {
          el.removeEventListener('pointermove', move)
          el.removeEventListener('pointerleave', leave)
        }
      })
    },
    { scope: ref },
  )
  return (
    <div ref={ref} className={`inline-block will-change-transform ${className}`}>
      {children}
    </div>
  )
}

/* -------------------------------------------------------------- */
/* Buttons                                                         */
/* -------------------------------------------------------------- */
type ButtonProps = {
  to: string
  children: ReactNode
  variant?: 'gold' | 'ink' | 'outline-light' | 'outline-dark' | 'paper'
  size?: 'md' | 'lg'
  magnetic?: boolean
  className?: string
}

const VARIANT: Record<NonNullable<ButtonProps['variant']>, string> = {
  gold: 'bg-gold text-ink hover:bg-paper',
  ink: 'bg-ink text-paper hover:bg-ink-3',
  paper: 'bg-paper text-ink hover:bg-gold',
  'outline-light': 'border border-paper/35 text-paper hover:bg-paper hover:text-ink',
  'outline-dark': 'border border-ink/25 text-ink hover:bg-ink hover:text-paper',
}

export function Button({ to, children, variant = 'gold', size = 'md', magnetic = true, className = '' }: ButtonProps) {
  const ext = isExternal(to) && !to.startsWith('mailto:')
  const Icon = ext ? ArrowUpRight : ArrowRight
  const btn = (
    <SmartLink
      to={to}
      className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full font-semibold tracking-tight transition-colors duration-500 ${
        size === 'lg' ? 'h-14 pl-7 pr-2 text-base md:h-16 md:pl-8 md:text-lg' : 'h-12 pl-6 pr-1.5 text-[0.95rem]'
      } ${VARIANT[variant]} ${className}`}
    >
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-[var(--ease-out)] group-hover:-translate-y-full">{children}</span>
        <span aria-hidden="true" className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-y-0">
          {children}
        </span>
      </span>
      <span
        className={`grid place-items-center rounded-full bg-current/10 transition-transform duration-500 ease-[var(--ease-out)] group-hover:rotate-[-45deg] ${
          size === 'lg' ? 'size-10 md:size-12' : 'size-9'
        } ${ext ? 'group-hover:rotate-0' : ''}`}
      >
        <Icon className="size-4" aria-hidden="true" />
      </span>
    </SmartLink>
  )
  return magnetic ? <Magnetic strength={0.25}>{btn}</Magnetic> : btn
}

/** Text link with arrow and animated underline. */
export function ArrowLink({ to, children, className = '' }: { to: string; children: ReactNode; className?: string }) {
  const ext = isExternal(to) && !to.startsWith('mailto:')
  const Icon = ext ? ArrowUpRight : ArrowRight
  return (
    <SmartLink to={to} className={`group inline-flex items-center gap-2 font-semibold ${className}`}>
      <span className="u-link">{children}</span>
      <Icon
        className="size-4 transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-1 group-hover:-translate-y-px"
        aria-hidden="true"
      />
    </SmartLink>
  )
}

/* -------------------------------------------------------------- */
/* Eyebrow label                                                   */
/* -------------------------------------------------------------- */
export function Eyebrow({ children, className = '', index }: { children: ReactNode; className?: string; index?: string }) {
  return (
    <p className={`t-eyebrow flex items-center gap-3 ${className}`}>
      {index && <span className="t-num text-[0.85rem] tracking-normal opacity-60">{index}</span>}
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />
      <span>{children}</span>
    </p>
  )
}

/* -------------------------------------------------------------- */
/* SplitReveal: masked line-by-line reveal on scroll.              */
/* Text is fully visible if JS or motion is unavailable.           */
/* -------------------------------------------------------------- */
type SplitRevealProps = {
  as?: ElementType
  children: ReactNode
  className?: string
  delay?: number
  /** animate immediately instead of on scroll */
  immediate?: boolean
  id?: string
}
export function SplitReveal({ as: Tag = 'h2', children, className = '', delay = 0, immediate = false, id }: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        const split = SplitText.create(ref.current!, {
          ...SPLIT,
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.lines, {
              yPercent: 140,
              duration: 1.3,
              stagger: 0.08,
              delay,
              ease: 'expo.out',
              scrollTrigger: immediate ? undefined : { trigger: ref.current, start: 'top 88%', once: true },
            })
          },
        })
        return () => split.revert()
      })
    },
    { scope: ref },
  )
  return (
    <Tag ref={ref} className={className} id={id}>
      {children}
    </Tag>
  )
}

/* -------------------------------------------------------------- */
/* FadeIn: gentle rise for supporting content (used sparingly).   */
/* -------------------------------------------------------------- */
export function FadeIn({
  children,
  className = '',
  delay = 0,
  y = 28,
  as: Tag = 'div',
  stagger,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  as?: ElementType
  /** if set, children elements animate in sequence */
  stagger?: number
}) {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        const targets = stagger ? Array.from(ref.current!.children) : ref.current
        gsap.from(targets, {
          y,
          autoAlpha: 0,
          duration: 1.2,
          delay,
          stagger,
          ease: 'expo.out',
          scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
        })
      })
    },
    { scope: ref },
  )
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
