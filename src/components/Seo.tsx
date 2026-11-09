import { useEffect } from 'react'

const SUFFIX = 'Oakhaven'
const DEFAULT_IMAGE = '/og-image.jpg'

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

/** Per-route title, description, and Open Graph metadata. */
export function Seo({ title, description, image }: { title: string; description: string; image?: string }) {
  useEffect(() => {
    const full = title === SUFFIX ? `${SUFFIX} | Investing for Generations` : `${title} | ${SUFFIX}`
    document.title = full
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', full)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:image', image ?? DEFAULT_IMAGE)
    setMeta('property', 'og:url', window.location.href)
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = window.location.origin + window.location.pathname
  }, [title, description, image])
  return null
}
