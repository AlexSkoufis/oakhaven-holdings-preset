import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { SmoothScrollProvider } from './lib/smooth-scroll'
import { HeaderThemeProvider } from './components/header-theme'
import Home from './pages/Home'

const WhoWeAre = lazy(() => import('./pages/WhoWeAre'))
const Leadership = lazy(() => import('./pages/Leadership'))
const Headquarters = lazy(() => import('./pages/Headquarters'))
const WhatWeDo = lazy(() => import('./pages/WhatWeDo'))
const IndustrialGroup = lazy(() => import('./pages/IndustrialGroup'))
const FederalGroup = lazy(() => import('./pages/FederalGroup'))
const RealEstateGroup = lazy(() => import('./pages/RealEstateGroup'))
const Principles = lazy(() => import('./pages/Principles'))
const History = lazy(() => import('./pages/History'))
const News = lazy(() => import('./pages/News'))
const Article = lazy(() => import('./pages/Article'))
const ImpactReport = lazy(() => import('./pages/ImpactReport'))
const Careers = lazy(() => import('./pages/Careers'))
const MemberOpportunities = lazy(() => import('./pages/MemberOpportunities'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

export function App() {
  return (
    <BrowserRouter>
      <SmoothScrollProvider>
        <HeaderThemeProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="who-we-are" element={<WhoWeAre />} />
              <Route path="who-we-are/leadership" element={<Leadership />} />
              <Route path="who-we-are/headquarters" element={<Headquarters />} />
              <Route path="what-we-do" element={<WhatWeDo />} />
              <Route path="what-we-do/industrial-group" element={<IndustrialGroup />} />
              <Route path="what-we-do/federal-group" element={<FederalGroup />} />
              <Route path="what-we-do/real-estate-group" element={<RealEstateGroup />} />
              <Route path="our-roots/principles" element={<Principles />} />
              <Route path="our-roots/history" element={<History />} />
              <Route path="news" element={<News />} />
              <Route path="news/:slug" element={<Article />} />
              <Route path="impact-report" element={<ImpactReport />} />
              <Route path="careers" element={<Careers />} />
              <Route path="member-opportunities" element={<MemberOpportunities />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </HeaderThemeProvider>
      </SmoothScrollProvider>
    </BrowserRouter>
  )
}
