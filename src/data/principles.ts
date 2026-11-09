// The Seven Principles, written by the founding families of the Alder Valley
// Cooperative in 1952. Each principle belongs to a season of the farming year,
// which colours its panel in the home page sequence. Demo content.

export type Principle = {
  id: string
  name: string
  /** A short motto shown in italics above the name. */
  word: string
  season: 'Spring' | 'Summer' | 'Fall' | 'Winter'
  line: string
  text: string[]
}

export const PRINCIPLES: Principle[] = [
  {
    id: 'patience',
    name: 'Patience',
    word: 'Think in decades',
    season: 'Spring',
    line: 'Plant what you will not harvest yourself.',
    text: [
      'The founders bought a creamery they knew would take ten years to pay for itself. We still measure investments against the people who will inherit them, not the next quarter.',
      'Patience is not waiting. It is doing the slow work early, so that the good years have something to grow from.',
    ],
  },
  {
    id: 'stewardship',
    name: 'Stewardship',
    word: 'Leave it better',
    season: 'Spring',
    line: 'Everything we hold, we hold for someone else.',
    text: [
      'The land, the buildings and the companies in our care belong to every generation of the Trust. We are only the current keepers.',
      'So we maintain before we expand, we fix the roof before it leaks, and we hand things on in better shape than we received them.',
    ],
  },
  {
    id: 'candour',
    name: 'Candour',
    word: 'Say it plainly',
    season: 'Summer',
    line: 'Bad news travels first, and in person.',
    text: [
      'The first ledger was open to every member. Our reports still are: the Trust’s members see what we own, what it earns and what went wrong.',
      'We would rather have a hard conversation early than an easy one too late.',
    ],
  },
  {
    id: 'courage',
    name: 'Courage',
    word: 'Do the right thing',
    season: 'Summer',
    line: 'Stand by a decision when it is unpopular and right.',
    text: [
      'Selling the processing business in 1997 was the hardest vote the cooperative ever took. It was also the reason the Trust exists today.',
      'Courage means acting on our convictions with care, and being willing to change our minds when the facts change.',
    ],
  },
  {
    id: 'thrift',
    name: 'Thrift',
    word: 'Spend like it is ours',
    season: 'Fall',
    line: 'Every dollar is a member’s dollar.',
    text: [
      'We pay fair prices, and we do not overpay. We keep our own costs low so that more of every return reaches the Trust and the community.',
      'Thrift is not meanness. It is respect for the people who earned the money first.',
    ],
  },
  {
    id: 'kinship',
    name: 'Kinship',
    word: 'Look after your own',
    season: 'Fall',
    line: 'A company is only as strong as the people in it.',
    text: [
      'The founders shared tractors and labour through the hard years. We share knowledge, systems and opportunity across the family of companies.',
      'Kinship extends to the towns we work in. We hire locally, buy locally and show up when we are needed.',
    ],
  },
  {
    id: 'humility',
    name: 'Humility',
    word: 'Keep learning',
    season: 'Winter',
    line: 'Nobody in the valley ever outgrew the weather.',
    text: [
      'We are investors, not experts in everything. We listen to the people who run our companies and to the members who own them.',
      'Humility keeps us asking questions, admitting mistakes and learning from them before winter comes again.',
    ],
  },
]

export const PRINCIPLES_STORY = [
  'In the spring of 1952, eleven families met in the back room of the Alder Falls feed store to decide whether to buy the old creamery together. They had little money and no experience of running a business, only a shared conviction that they were stronger together.',
  'Before they signed, Ruth Ellery, the youngest of them, asked that they agree on how they would treat each other and the business. They wrote seven principles on the back page of the first ledger, and every member signed underneath.',
  'The ledger sits in a glass case in the Hartwell Building today. Its last line reads: “Each of these must be kept with the rest. None of them is enough alone.”',
  'Seventy years later the business looks very different. The principles have not changed, and every new employee at Oakhaven still signs the same page.',
]

// Each season of the farming year, the work it stands for, and what it asks of us.
export const SEASONS = [
  { season: 'Spring', direction: 'Planting', honor: 'Spring is for new ventures, first hires and the patience to let them root.' },
  { season: 'Summer', direction: 'Tending', honor: 'Summer is for honest work in the long days, and the courage to keep going.' },
  { season: 'Fall', direction: 'Harvest', honor: 'Fall is for gathering returns carefully and sharing them with the people who earned them.' },
  { season: 'Winter', direction: 'Rest', honor: 'Winter is for reflection, learning and getting ready for the year ahead.' },
] as const
