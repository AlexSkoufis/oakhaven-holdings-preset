// Real Estate Group properties held through Cedar Row Properties. Demo content.

export type Property = {
  id: string
  name: string
  location: string
  acquired: string
  ownership: string
  use: string
  image: string | null
  description: string
  facts: string[]
}

export const PROPERTIES: Property[] = [
  {
    id: 'alder-junction',
    name: 'Alder Junction',
    location: 'Alder Falls, MI',
    acquired: 'March 2023',
    ownership: '100%',
    use: 'Industrial land and buildings',
    image: 'industrial-park',
    description:
      'Our largest single acquisition: an industrial campus on the edge of town. Kestrel Logistics and Northbound Freight both operate here, and a new rail spur serves the undeveloped acres.',
    facts: ['Nine buildings', 'About 410,000 sq ft', '160 acres', 'Rail served since 2025'],
  },
  {
    id: 'founders-tower',
    name: 'Founders Tower',
    location: 'Downtown, Alder Falls',
    acquired: 'May 2019',
    ownership: '50%',
    use: 'Office and mixed use',
    image: 'hero-skyline',
    description:
      'An 18-storey landmark owned jointly with a partner foundation. Offices fill the tower, with shops at street level and an event space on the top floor.',
    facts: ['18 storeys', 'Co-owned with a partner foundation'],
  },
  {
    id: 'hartwell',
    name: 'The Hartwell Building',
    location: 'Downtown, Alder Falls',
    acquired: 'June 2014',
    ownership: '100%',
    use: 'Mixed use and headquarters',
    image: 'hq-exterior',
    description:
      'Our home on Front Street. A restaurant on the ground floor, Oakhaven’s offices on the second and third floors, and eight apartments above.',
    facts: ['Five storeys', '13,000 sq ft leasable'],
  },
  {
    id: 'millrace',
    name: 'Millrace Works',
    location: 'Alder Falls, MI',
    acquired: 'September 2021',
    ownership: '100%',
    use: 'Manufacturing',
    image: 'plant-aerial',
    description:
      'A climate-controlled manufacturing plant fitted out for Brightline Circuits, with room on the site to double the building if the business needs it.',
    facts: ['112,000 sq ft', '9 acres'],
  },
  {
    id: 'eastgate',
    name: 'Eastgate Distribution',
    location: 'Harlow, MI',
    acquired: 'October 2018',
    ownership: '100%',
    use: 'Distribution',
    image: 'prop-distribution',
    description:
      'A distribution centre minutes from the interstate, with offices, cold storage and twelve loading doors, on a long-term lease to a national grocer.',
    facts: ['37,500 sq ft', '8 acres'],
  },
  {
    id: 'stonebridge',
    name: 'Stonebridge Warehouse',
    location: 'Alder Falls, MI',
    acquired: 'June 2016',
    ownership: '100%',
    use: 'Warehouse',
    image: 'prop-warehouse',
    description: 'A high-bay warehouse near the regional airport, leased long term to a Fortune 500 manufacturer.',
    facts: ['187,000 sq ft'],
  },
  {
    id: 'mill-road',
    name: '40 Mill Road',
    location: 'Alder Falls, MI',
    acquired: 'November 2011',
    ownership: '100%',
    use: 'Office',
    image: 'prop-office',
    description:
      'Our first property, bought two years after Oakhaven was formed. It is leased to a community health non-profit and has never stood empty.',
    facts: ['First property', 'Fully leased since 2011'],
  },
]
