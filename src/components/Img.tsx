import { useState, type CSSProperties } from 'react'
import media from '../data/media.json'

type MediaEntry = { w: number; h: number; widths: number[]; lqip: string }
const MEDIA = media as Record<string, MediaEntry>

export const hasMedia = (key: string) => key in MEDIA
export const mediaSrc = (key: string, preferred = 1600) => {
  const m = MEDIA[key]
  if (!m) return ''
  const w = m.widths.reduce((best, cur) => (Math.abs(cur - preferred) < Math.abs(best - preferred) ? cur : best), m.widths[0])
  return `/media/${key}-${w}.webp`
}

type Props = {
  id: string
  alt: string
  className?: string
  imgClassName?: string
  sizes?: string
  priority?: boolean
  style?: CSSProperties
  imgStyle?: CSSProperties
  /** object-position for art direction */
  position?: string
}

/**
 * Responsive WebP image with a blurred low-quality placeholder.
 * The frame keeps its box so nothing shifts while loading.
 */
export function Img({ id, alt, className = '', imgClassName = '', sizes = '100vw', priority, style, imgStyle, position }: Props) {
  const m = MEDIA[id]
  const [loaded, setLoaded] = useState(false)
  if (!m) return null
  const srcSet = m.widths.map((w) => `/media/${id}-${w}.webp ${w}w`).join(', ')
  const fallback = `/media/${id}-${m.widths[Math.min(1, m.widths.length - 1)]}.webp`

  return (
    <div className={`img-frame ${className}`} style={style}>
      <img
        aria-hidden="true"
        alt=""
        src={m.lqip}
        className="img-blur"
        style={{ opacity: loaded ? 0 : 1, objectPosition: position }}
      />
      <img
        src={fallback}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width={m.w}
        height={m.h}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        ref={(el) => {
          if (el?.complete && el.naturalWidth && !loaded) setLoaded(true)
        }}
        className={`relative ${imgClassName}`}
        style={{ objectPosition: position, ...imgStyle }}
      />
    </div>
  )
}
