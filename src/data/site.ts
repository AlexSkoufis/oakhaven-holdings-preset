// Organisation details. Oakhaven, its owners, companies, people and figures are
// fictional demo content: replace everything here with your own.

export const ORG = {
  name: 'Oakhaven',
  legalName: 'Oakhaven Holdings, LLC',
  tagline: 'Investing for Generations',
  owner: 'the Alder Valley Community Trust',
  ownerShort: 'the Trust',
  founded: '2009',
  email: 'hello@oakhaven.example',
  hrEmail: 'careers@oakhaven.example',
  phone: '+1 (555) 014-2090',
  building: 'The Hartwell Building',
  address: {
    line1: '214 Front Street',
    line2: 'Suite 300',
    city: 'Alder Falls',
    region: 'Michigan',
    postal: '49000',
  },
  // Point this at your own map listing.
  mapsUrl: 'https://www.google.com/maps',
  careerPortal: '/careers#openings',
  memberNetwork: '/contact',
  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'YouTube', href: 'https://www.youtube.com/' },
    { label: 'Facebook', href: 'https://www.facebook.com/' },
  ],
} as const

export type NavLink = { label: string; to: string; external?: boolean; note?: string }
export type NavGroup = { label: string; to: string; intro: string; links: NavLink[] }

export const NAV: NavGroup[] = [
  {
    label: 'Who We Are',
    to: '/who-we-are',
    intro: 'A holding company owned by the families of the Alder Valley, through their community trust.',
    links: [
      { label: 'Our Story', to: '/who-we-are' },
      { label: 'Leadership', to: '/who-we-are/leadership' },
      { label: 'The Hartwell Building', to: '/who-we-are/headquarters' },
    ],
  },
  {
    label: 'What We Do',
    to: '/what-we-do',
    intro: 'Three groups, one patient strategy of diversification.',
    links: [
      { label: 'Overview', to: '/what-we-do' },
      { label: 'Industrial Group', to: '/what-we-do/industrial-group' },
      { label: 'Federal Group', to: '/what-we-do/federal-group' },
      { label: 'Real Estate Group', to: '/what-we-do/real-estate-group' },
    ],
  },
  {
    label: 'Our Roots',
    to: '/our-roots/principles',
    intro: 'The principles and the history we inherited from the people who started it all.',
    links: [
      { label: 'Seven Principles', to: '/our-roots/principles' },
      { label: 'Our History', to: '/our-roots/history' },
    ],
  },
  {
    label: 'Insights',
    to: '/news',
    intro: 'News, episodes of The Long View, and our yearly account of impact.',
    links: [
      { label: 'News', to: '/news' },
      { label: 'Community Impact Report', to: '/impact-report' },
    ],
  },
  {
    label: 'Careers',
    to: '/careers',
    intro: 'Opportunities across Oakhaven and its family of companies.',
    links: [
      { label: 'Careers', to: '/careers' },
      { label: 'Member Opportunities', to: '/member-opportunities' },
    ],
  },
]
