import { Seo } from '../components/Seo'
import { useHeroTheme } from '../components/header-theme'
import { Button, ArrowLink } from '../components/ui'
import { Rings } from '../components/Logo'

export default function NotFound() {
  useHeroTheme('dark')
  return (
    <section data-surface="dark" className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink text-paper">
      <Seo title="Page not found" description="The page you were looking for could not be found." />
      <Rings className="pointer-events-none absolute -right-20 bottom-0 w-[60vw] max-w-[720px] text-gold/[0.06]" />
      <div className="shell relative py-40">
        <p className="t-eyebrow text-gold">404</p>
        <h1 className="t-mega mt-6 max-w-[12ch]">
          This path leads <span className="italic-accent text-gold">elsewhere.</span>
        </h1>
        <p className="t-lead mt-8 max-w-xl text-paper/75">The page you were looking for could not be found. It may have moved.</p>
        <div className="mt-12 flex flex-wrap items-center gap-8">
          <Button to="/" variant="gold">
            Back to home
          </Button>
          <ArrowLink to="/news" className="text-paper">
            Latest news
          </ArrowLink>
        </div>
      </div>
    </section>
  )
}
