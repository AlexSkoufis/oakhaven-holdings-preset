# Oakhaven Holdings — Community-Owned Holding Company Preset

A complete, multi-page website for a **fictional** holding company owned by a community trust and investing for future generations: industrial, federal and real estate groups, a family of companies, leadership, principles, history, news and careers. Warm paper, deep ink and a single gold accent; Fraunces (optical sizes, italic accents) + Instrument Sans. The growth-ring mark drives the brand: one ring per generation.

React 19 · TypeScript · Vite 8 · Tailwind CSS 4 · React Router 7 · GSAP 3 (ScrollTrigger, SplitText, Flip) · Lenis · Lucide.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build into ./dist
npm run preview    # serve ./dist
npm run images     # rebuild photos, portraits, logos, report cover, hero film and og image
```

Requires Node 20+.

## Pages

| Route | Page | Highlights |
|---|---|---|
| `/` | Home | Hero film revealed through an expanding clip-path, pinned manifesto that inks in word by word, pinned three-group sequence with a rolling numeral, filterable portfolio, pinned seven-principles sequence with seasonal washes, count-ups and a horizontal milestone track, news with a cursor preview, closing CTA |
| `/who-we-are` | Our Story | Purpose and approach chapters, the seven principles, leadership teaser |
| `/who-we-are/leadership` | Leadership | Executive cards with hover bios; board roster with a velocity-tilted portrait preview |
| `/who-we-are/headquarters` | The Hartwell Building | Long-form story of the headquarters building |
| `/what-we-do` | What We Do | The groups, acquisition criteria, full portfolio |
| `/what-we-do/industrial-group` | Industrial Group | Approach, imagery, companies and minority investments, related news |
| `/what-we-do/federal-group` | Federal Group | Capabilities, client marquee, reasons to choose us, companies |
| `/what-we-do/real-estate-group` | Real Estate Group | Sticky photo stage that wipes to the property you hover or focus |
| `/our-roots/principles` | Seven Principles | The founding story, seven drifting chapters, the farming year |
| `/our-roots/history` | Our History | Scroll-drawn vertical timeline |
| `/news`, `/news/:slug` | News and articles | Category filter, editorial grid, article template with quotes and lists |
| `/impact-report` | Community Impact Report | Animated key figures, report cover, testimonials |
| `/careers` | Careers | Benefits, openings, member talent network, policies |
| `/member-opportunities` | Member Opportunities | Programmes for the owners and their families |
| `/contact` | Get in Touch | Topic chips; the form opens the visitor's email app (no backend needed) |
| `*` | 404 | |

## Re-skin

- **Company details and navigation**: `src/data/site.ts` (name, owner, address, emails, phone, social links, menus).
- **Content**: one file per subject in `src/data/`: `divisions.ts`, `companies.ts`, `people.ts`, `properties.ts`, `milestones.ts`, `history.ts`, `principles.ts` and `news.json`. Page-level copy lives in `src/pages/` and `src/sections/home/`. Page titles and descriptions are set per route with `<Seo>`; defaults are in `index.html`.
- **Logo**: `src/components/Logo.tsx` (rings + wordmark; `Rings` is the mark alone) and `public/favicon.svg`.
- **Colour & type**: tokens in `src/styles/index.css`; fonts are loaded in `index.html`.
- **Photos**: drop JPEGs into `assets-src/photo/`, add their credit to `assets-src/photo/meta.json`, run `npm run images`, and reference them by file name (without extension). Credits appear in the footer.
- **Portraits**: people without a photo get a generated monogram card. Add `p-<id>.jpg` / `b-<id>.jpg` to `assets-src/photo/` to use real portraits.
- **Company logos**: generated demo wordmarks in `public/media/logos/` (see `LOGOS` in `scripts/images.mjs`). Replace them with your own files.
- **Hero film**: `public/media/hero-film.mp4` is a slow push-in generated from `assets-src/photo/hero-skyline.jpg`. Replace it with real footage (1280px, H.264, no audio) and update `public/media/hero-poster.webp`.

## Imagery

Photographs are from Wikimedia Commons under public domain, CC0, CC BY or CC BY-SA licences. Every one is listed with its author, licence and source in `assets-src/photo/meta.json` and in the footer's "Photo credits", and is used as an illustration only. Keep the credits for any CC BY or BY-SA image you retain, or replace the photos with your own.

## Motion and accessibility

- All animation runs inside `useGSAP` / `gsap.matchMedia()` scopes and reverts on route change. Pinned sequences only run at 1024px and wider with motion allowed; otherwise content renders as normal stacked sections.
- `prefers-reduced-motion` is respected throughout, and the hero film does not autoplay under it.
- Content is visible in the DOM by default; animations start from hidden states only once JavaScript is running.
- Keyboard: skip link, focus-trapped mobile menu, mega-menus that close on Escape and return focus, a native `<dialog>` for company details.

## Deploy

`dist/` is a static single-page app. `vercel.json` includes the SPA rewrite; on other hosts, rewrite unknown paths to `/index.html`. The demo ships with `noindex` (in `index.html`, `vercel.json` and `public/robots.txt`); remove it when the site goes live.

## Demo content

Oakhaven Holdings, the Alder Valley Community Trust, Alder Falls, every company, property, person, quote, figure and news story are fictional. Email addresses use the `.example` domain and the phone number is a placeholder.
