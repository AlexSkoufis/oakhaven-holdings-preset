// Builds every image the site uses. Run with: npm run images
//
// 1. Photos: each JPEG in assets-src/photo/ becomes responsive WebP files in
//    public/media/ (<key>-<width>.webp) plus a blurred placeholder, listed in
//    src/data/media.json. Reference a photo by its file name (without .jpg).
// 2. Portraits: a monogram card for every person in src/data/people.ts whose
//    `image` has no matching photo in assets-src/photo/.
// 3. The Impact Report cover, the demo company logos, the hero film (a slow
//    push-in made from assets-src/photo/hero-skyline.jpg) and og-image.jpg.
//
// Replace a generated image by dropping a JPEG with the same key into
// assets-src/photo/ and running the script again.

import fs from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import sharp from 'sharp'
import ffmpeg from 'ffmpeg-static'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const src = path.join(root, 'assets-src', 'photo')
const out = path.join(root, 'public', 'media')
const logosOut = path.join(out, 'logos')
const PHOTO = [960, 1600, 2400]
const SERIF = "Georgia, 'Times New Roman', serif"
const SANS = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"

const C = { ink: '#14181a', paper: '#f4efe6', paper2: '#ebe3d5', gold: '#f1b543', amber: '#e89a3f', ember: '#a5551d', stone: '#6b6a64' }
const RINGS = [
  [0, 7],
  [11, 16],
  [20, 25],
  [29, 32],
]
const ringPaths = (cx, cy, s = 1) =>
  RINGS.map(([a, b]) => {
    const r0 = a * s
    const r1 = b * s
    return r0 === 0
      ? `M${cx - r1},${cy} A${r1},${r1} 0 0 1 ${cx + r1},${cy} Z`
      : `M${cx - r1},${cy} A${r1},${r1} 0 0 1 ${cx + r1},${cy} L${cx + r0},${cy} A${r0},${r0} 0 0 0 ${cx - r0},${cy} Z`
  })

const media = {}

async function ladder(key, input, widths) {
  const img = sharp(input).rotate()
  const meta = await img.metadata()
  const ws = widths.filter((w) => w <= meta.width)
  if (!ws.length) ws.push(meta.width)
  for (const w of ws) {
    await sharp(input).rotate().resize({ width: w }).webp({ quality: 74 }).toFile(path.join(out, `${key}-${w}.webp`))
  }
  const lqip = await sharp(input).rotate().resize({ width: 24 }).blur(1).webp({ quality: 40 }).toBuffer()
  media[key] = { w: meta.width, h: meta.height, widths: ws, lqip: `data:image/webp;base64,${lqip.toString('base64')}` }
}

// ---------------------------------------------------------------- photos
async function photos() {
  const files = (await fs.readdir(src)).filter((f) => /\.jpe?g$/i.test(f))
  for (const f of files) await ladder(f.replace(/\.jpe?g$/i, ''), path.join(src, f), PHOTO)
  return files.length
}

// ---------------------------------------------------------------- portraits
async function portraits() {
  const people = await fs.readFile(path.join(root, 'src', 'data', 'people.ts'), 'utf8')
  const re = /name: '([^']+)',\s*role: '[^']*',\s*image: '([^']+)'/g
  let m
  let n = 0
  while ((m = re.exec(people))) {
    const [, name, key] = m
    if (media[key]) continue // a real photo exists
    const initials = name
      .split(/\s+/)
      .map((p) => p[0])
      .join('')
      .slice(0, 2)
    const dark = key.startsWith('b-')
    const bg = dark ? C.ink : C.paper2
    const fg = dark ? C.paper : C.ink
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="576" height="720" viewBox="0 0 576 720">
      <rect width="576" height="720" fill="${bg}"/>
      <g fill="${C.gold}" opacity="${dark ? 0.16 : 0.28}">${ringPaths(288, 720, 9).map((d) => `<path d="${d}"/>`).join('')}</g>
      <rect x="28" y="28" width="520" height="664" fill="none" stroke="${fg}" stroke-opacity="0.18"/>
      <text x="288" y="388" text-anchor="middle" font-family="${SERIF}" font-size="188" fill="${fg}" letter-spacing="-4">${initials}</text>
      <text x="288" y="462" text-anchor="middle" font-family="${SANS}" font-size="20" letter-spacing="6" fill="${fg}" fill-opacity="0.6">${name.toUpperCase()}</text>
    </svg>`
    await ladder(key, await sharp(Buffer.from(svg)).jpeg({ quality: 92 }).toBuffer(), [480])
    n++
  }
  return n
}

// ---------------------------------------------------------------- report cover
async function reportCover() {
  if (media['report-cover']) return
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="773" height="1000" viewBox="0 0 773 1000">
    <rect width="773" height="1000" fill="${C.ink}"/>
    <g fill="${C.gold}">${ringPaths(386, 1000, 11).map((d, i) => `<path d="${d}" opacity="${0.25 + i * 0.2}"/>`).join('')}</g>
    <g fill="${C.gold}" transform="translate(64 64) scale(0.75)">${ringPaths(32, 58).map((d) => `<path d="${d}"/>`).join('')}</g>
    <text x="128" y="106" font-family="${SERIF}" font-size="34" fill="${C.paper}">Oakhaven</text>
    <text x="64" y="300" font-family="${SANS}" font-size="20" letter-spacing="5" fill="${C.gold}">FISCAL YEAR 2025</text>
    <text x="64" y="384" font-family="${SERIF}" font-size="76" fill="${C.paper}">Community</text>
    <text x="64" y="466" font-family="${SERIF}" font-size="76" font-style="italic" fill="${C.gold}">Impact Report</text>
    <text x="64" y="530" font-family="${SANS}" font-size="22" fill="${C.paper}" fill-opacity="0.7">To the members of the Alder Valley Community Trust</text>
    <text x="64" y="940" font-family="${SANS}" font-size="18" letter-spacing="4" fill="${C.paper}" fill-opacity="0.6">2026</text>
  </svg>`
  await ladder('report-cover', await sharp(Buffer.from(svg)).jpeg({ quality: 92 }).toBuffer(), [640])
}

// ---------------------------------------------------------------- demo logos
// [file, name, style, accent]. Styles: ring, square, slash, wave, arch, dot.
const LOGOS = [
  ['hollis', 'Hollis Precision', 'square', '#8a3b12'],
  ['brightline', 'Brightline Circuits', 'slash', '#1f6f8b'],
  ['meridian', 'Meridian Advisory', 'ring', '#3b4a6b'],
  ['northbound', 'Northbound Freight', 'arch', '#2f5d3a'],
  ['kestrel', 'Kestrel Logistics', 'slash', '#a5551d'],
  ['forge-jv', 'Hollis–Arden Systems', 'square', '#4a4a4a'],
  ['oakhaven-federal', 'Oakhaven Federal Services', 'rings', '#b07a1a'],
  ['clearwater', 'Clearwater Environmental', 'wave', '#1d6f72'],
  ['signal', 'Signal Ridge Software', 'arch', '#5a3d7a'],
  ['harbor-it', 'Harbor IT Operations', 'dot', '#1f4e79'],
  ['summit-jv', 'Oakhaven Summit JV', 'rings', '#6b5a2a'],
  ['lakeshore-jv', 'Lakeshore Base Services', 'wave', '#2c5f8a'],
  ['cedar-row', 'Cedar Row Properties', 'square', '#2f5d3a'],
  ['lumen', 'Lumen Diagnostics', 'dot', '#c0392b'],
  ['riverstone', 'Riverstone Capital', 'ring', '#2d3e50'],
  ['group-industrial', 'Oakhaven Industrial Group', 'rings', '#b07a1a'],
]

function mark(style, c) {
  switch (style) {
    case 'square':
      return `<rect x="4" y="8" width="44" height="44" fill="${c}"/><rect x="16" y="20" width="20" height="20" fill="#fff"/>`
    case 'slash':
      return `<path d="M4 52 L28 8 L40 8 L16 52 Z" fill="${c}"/><path d="M24 52 L48 8 L52 8 L28 52 Z" fill="${c}" opacity="0.55"/>`
    case 'ring':
      return `<circle cx="26" cy="30" r="20" fill="none" stroke="${c}" stroke-width="7"/><circle cx="26" cy="30" r="5" fill="${c}"/>`
    case 'arch':
      return `<path d="M4 52 V30 A22 22 0 0 1 48 30 V52 H38 V30 A12 12 0 0 0 14 30 V52 Z" fill="${c}"/>`
    case 'wave':
      return `<path d="M2 26 q12 -12 24 0 t24 0" fill="none" stroke="${c}" stroke-width="6"/><path d="M2 42 q12 -12 24 0 t24 0" fill="none" stroke="${c}" stroke-width="6" opacity="0.55"/>`
    case 'dot':
      return `<circle cx="14" cy="30" r="10" fill="${c}"/><circle cx="38" cy="30" r="10" fill="${c}" opacity="0.5"/>`
    case 'rings':
    default:
      return `<g fill="${c}" transform="translate(-6 -6) scale(0.95)">${ringPaths(32, 58).map((d) => `<path d="${d}"/>`).join('')}</g>`
  }
}

async function logos() {
  await fs.mkdir(logosOut, { recursive: true })
  for (const [file, name, style, accent] of LOGOS) {
    const words = name.split(' ')
    const cut = words.length >= 3 ? words.length - 1 : 1
    const first = words.slice(0, cut).join(' ')
    const rest = words.slice(cut)
    const serif = ['ring', 'arch', 'rings'].includes(style)
    const w = 70 + Math.round(Math.max(first.length * (serif ? 13 : 12.5), rest.join(' ').length * 10.5))
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} 60" width="${w}" height="60">
  ${mark(style, accent)}
  <text x="62" y="30" font-family="${serif ? SERIF : SANS}" font-size="22" font-weight="700" fill="#14181a">${first}</text>
  <text x="62" y="51" font-family="${SANS}" font-size="13" letter-spacing="2.5" fill="#4b4f52">${rest.join(' ').toUpperCase()}</text>
</svg>
`
    await fs.writeFile(path.join(logosOut, `${file}.svg`), svg)
  }
}

// ---------------------------------------------------------------- hero film + og
async function heroFilm() {
  const still = path.join(src, 'hero-skyline.jpg')
  if (!existsSync(still)) return
  await sharp(still).resize({ width: 1600 }).webp({ quality: 72 }).toFile(path.join(out, 'hero-poster.webp'))
  const film = path.join(out, 'hero-film.mp4')
  // A slow 14 second push-in. Replace hero-film.mp4 with real footage if you have it.
  execFileSync(ffmpeg, [
    '-y', '-loop', '1', '-i', still,
    '-vf', "scale=2560:-2,crop=2560:1440,zoompan=z='min(zoom+0.0006,1.25)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=336:s=1280x720:fps=24,format=yuv420p",
    '-t', '14', '-c:v', 'libx264', '-preset', 'slow', '-crf', '26', '-movflags', '+faststart', '-an', film,
  ], { stdio: 'ignore' })

  const W = 1200
  const H = 630
  const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.ink}" stop-opacity="0.15"/><stop offset="1" stop-color="${C.ink}" stop-opacity="0.9"/></linearGradient></defs>
    <rect width="${W}" height="${H}" fill="url(#g)"/>
    <g fill="${C.gold}" transform="translate(72 430) scale(1.1)">${ringPaths(32, 58).map((d) => `<path d="${d}"/>`).join('')}</g>
    <text x="160" y="490" font-family="${SERIF}" font-size="64" fill="${C.paper}">Oakhaven</text>
    <text x="74" y="560" font-family="${SERIF}" font-size="34" font-style="italic" fill="${C.gold}">Investing for generations.</text>
  </svg>`
  await sharp(still)
    .resize(W, H, { fit: 'cover' })
    .composite([{ input: Buffer.from(overlay) }])
    .jpeg({ quality: 82 })
    .toFile(path.join(root, 'public', 'og-image.jpg'))
}

await fs.mkdir(out, { recursive: true })
const n = await photos()
const p = await portraits()
await reportCover()
await logos()
await heroFilm()
await fs.writeFile(path.join(root, 'src', 'data', 'media.json'), JSON.stringify(media, null, 1) + '\n')

// Photo credits for the footer, from assets-src/photo/meta.json.
const metaFile = path.join(src, 'meta.json')
const meta = existsSync(metaFile) ? JSON.parse(await fs.readFile(metaFile, 'utf8')) : {}
const credits = Object.entries(meta)
  .filter(([k]) => existsSync(path.join(src, `${k}.jpg`)))
  .map(([key, m]) => ({ key, title: m.title.replace(/^File:/, '').replace(/\.jpe?g$/i, ''), artist: m.artist, license: m.license, url: m.page }))
await fs.writeFile(path.join(root, 'src', 'data', 'credits.json'), JSON.stringify(credits, null, 1) + '\n')

console.log(`${n} photos, ${p} monogram portraits, ${LOGOS.length} logos, report cover, hero film and og image written.`)
