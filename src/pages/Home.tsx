import { Seo } from '../components/Seo'
import { useHeroTheme } from '../components/header-theme'
import { Hero } from '../sections/home/Hero'
import { Manifesto } from '../sections/home/Manifesto'
import { Divisions } from '../sections/home/Divisions'
import { Family } from '../sections/home/Family'
import { PrinciplesSequence } from '../sections/home/PrinciplesSequence'
import { Impact } from '../sections/home/Impact'
import { NewsPreview } from '../sections/home/NewsPreview'
import { ClosingCta } from '../sections/home/ClosingCta'

export default function Home() {
  useHeroTheme('dark')
  return (
    <>
      <Seo
        title="Oakhaven"
        description="Oakhaven is a community-owned holding company investing across industrial, federal and real estate groups, for the families of the Alder Valley and the generations to come."
      />
      <Hero />
      <Manifesto />
      <Divisions />
      <Family />
      <PrinciplesSequence />
      <Impact />
      <NewsPreview />
      <ClosingCta />
    </>
  )
}
