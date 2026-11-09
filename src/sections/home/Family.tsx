import { CompanyIndex } from '../../components/CompanyIndex'
import { Eyebrow, SplitReveal, FadeIn } from '../../components/ui'

export function Family() {
  return (
    <section className="relative bg-paper py-24 md:py-36" aria-labelledby="family-title">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow index="03" className="text-ember">
              Portfolio
            </Eyebrow>
            <SplitReveal id="family-title" className="t-display mt-8">
              The Oakhaven family of companies.
            </SplitReveal>
          </div>
          <FadeIn className="lg:col-span-5 lg:pb-3">
            <p className="t-lead text-ink/80">
              Full or majority ownership of 24 companies, employing more than a thousand people in eleven states.
            </p>
            <p className="mt-3 text-xs text-stone">As of June 2026.</p>
          </FadeIn>
        </div>
        <div className="mt-14 md:mt-20">
          <CompanyIndex />
        </div>
      </div>
    </section>
  )
}
