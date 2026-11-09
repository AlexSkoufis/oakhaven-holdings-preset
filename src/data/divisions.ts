// The three groups. Demo content: rename, re-order or add groups freely;
// the home page sequence and the What We Do page follow this list.

export type Division = {
  id: 'industrial' | 'federal' | 'real-estate'
  index: string
  name: string
  kicker: string
  summary: string
  body: string
  image: string
  imageAlt: string
  position?: string
  to: string
  highlights: string[]
}

export const DIVISIONS: Division[] = [
  {
    id: 'industrial',
    index: '01',
    name: 'Industrial Group',
    kicker: 'Manufacturing, logistics and advisory',
    summary: 'Operating companies chosen so that, between them, some are always doing well, whatever the economy is doing.',
    body: 'We build the Industrial Group the way a careful farmer plants a field: a spread of crops, so a bad season for one is a good season for another. Its companies make precision parts and electronics, move freight across the region, and advise owner-led businesses.',
    image: 'industrial-floor',
    imageAlt: 'A machinist at work on a lathe',
    position: '55% 50%',
    to: '/what-we-do/industrial-group',
    highlights: ['Hollis Precision', 'Brightline Circuits', 'Meridian Advisory', 'Northbound Freight', 'Kestrel Logistics'],
  },
  {
    id: 'federal',
    index: '02',
    name: 'Federal Group',
    kicker: 'Services to agencies nationwide',
    summary: 'Facilities operations, environmental programmes, software and IT for federal agencies across the country.',
    body: 'The Federal Group serves research sites, installations and civilian agencies with people who stay for the length of a contract and beyond. Its companies are small businesses with the depth of a larger family behind them.',
    image: 'prop-office',
    imageAlt: 'A brick civic office building on a street corner',
    position: '50% 50%',
    to: '/what-we-do/federal-group',
    highlights: ['Oakhaven Federal Services', 'Clearwater Environmental', 'Signal Ridge Software', 'Harbor IT Operations'],
  },
  {
    id: 'real-estate',
    index: '03',
    name: 'Real Estate Group',
    kicker: 'Industrial, commercial and mixed use',
    summary: 'Buildings and land that pay steady rent today and are worth more to the people who inherit them.',
    body: 'Cedar Row Properties holds Oakhaven’s real estate: a downtown tower, the historic building we call home, warehouses, a distribution centre, manufacturing space and 160 acres of rail-served land.',
    image: 'hq-exterior',
    imageAlt: 'A row of restored brick commercial buildings downtown',
    position: '50% 40%',
    to: '/what-we-do/real-estate-group',
    highlights: ['Alder Junction', 'The Hartwell Building', 'Founders Tower', 'Millrace Works'],
  },
]
