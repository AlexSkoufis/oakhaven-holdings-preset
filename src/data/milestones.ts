// Company milestones and headline figures. Demo content.

export type Milestone = { year: string; title: string; text: string; image?: string }

export const MILESTONES: Milestone[] = [
  {
    year: '2009',
    title: 'Oakhaven is formed',
    text: 'The Alder Valley Community Trust creates Oakhaven to grow its endowment beyond farmland and bonds, and to create work close to home.',
    image: 'heritage',
  },
  {
    year: '2011',
    title: 'A first building',
    text: 'A modest office building on Mill Road becomes the first property in the portfolio. It is still leased, and still paying rent, today.',
    image: 'prop-office',
  },
  {
    year: '2014',
    title: 'A home downtown',
    text: 'Oakhaven buys the Hartwell Building, restores it over two years and moves its offices to the second and third floors.',
    image: 'hq-exterior',
  },
  {
    year: '2015',
    title: 'The first operating company',
    text: 'Hollis Precision joins the family, followed a year later by Meridian Advisory. Oakhaven Federal Services is founded in 2017.',
    image: 'industrial-floor',
  },
  {
    year: '2019',
    title: 'Founders Tower',
    text: 'A joint purchase of the 18-storey Founders Tower with a partner foundation, the largest property deal in the region that year.',
    image: 'hero-skyline',
  },
  {
    year: '2021',
    title: 'Industrial growth',
    text: 'Full ownership of Brightline Circuits, the purchase of Northbound Freight, and a first minority investment in Lumen Diagnostics.',
    image: 'plant-floor',
  },
  {
    year: '2023',
    title: 'Alder Junction',
    text: 'The largest acquisition to date: 160 acres, nine buildings and Kestrel Logistics, which operates on the site.',
    image: 'industrial-park',
  },
  {
    year: '2025',
    title: 'Rail-ready land',
    text: 'A short-line rail spur reaches Alder Junction, opening the site to manufacturers who ship by rail.',
    image: 'rail',
  },
  {
    year: '2026',
    title: 'A thousand jobs',
    text: 'Employment across the portfolio passes one thousand people, more than a third of them living within 40 miles of the valley.',
  },
]

// Headline figures. The `source` line prints under each figure.
export const FACTS = [
  { value: '2009', label: 'Year established', source: 'Formed by the Trust' },
  { value: '24', label: 'Companies with full or majority ownership', source: 'As of June 2026' },
  { value: '1000+', label: 'People employed across the portfolio', source: 'As of June 2026' },
  { value: '100%', label: 'Owned by the Alder Valley Community Trust', source: 'For its 3,400 members' },
] as const
