import { useState, type FormEvent } from 'react'
import { Mail, MapPin, ArrowUpRight } from 'lucide-react'
import { Seo } from '../components/Seo'
import { TypeHero } from '../components/PageHero'
import { FadeIn, SmartLink } from '../components/ui'
import { MotionImage } from '../components/MotionImage'
import { ORG } from '../data/site'

const TOPICS = [
  { id: 'general', label: 'General inquiry', to: ORG.email },
  { id: 'acquisition', label: 'A business or asset to sell', to: ORG.email },
  { id: 'partnership', label: 'Partnership', to: ORG.email },
  { id: 'media', label: 'Media', to: ORG.email },
  { id: 'careers', label: 'Careers and applications', to: ORG.hrEmail },
]

const field =
  'mt-2 w-full rounded-none border-0 border-b border-ink/25 bg-transparent px-0 py-3 text-lg text-ink placeholder:text-stone-light focus:border-ink focus:outline-none focus:ring-0'

export default function Contact() {
  const [topic, setTopic] = useState(TOPICS[0].id)
  const [opened, setOpened] = useState(false)
  const current = TOPICS.find((t) => t.id === topic)!

  // Honest behaviour: compose an email in the visitor's own mail app.
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '')
    const org = String(data.get('organization') ?? '')
    const message = String(data.get('message') ?? '')
    const subject = `${current.label}${org ? `: ${org}` : ''}`
    const body = `${message}\n\n${name}${org ? `\n${org}` : ''}`
    window.location.href = `mailto:${current.to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setOpened(true)
  }

  return (
    <>
      <Seo title="Get in Touch" description={`Contact Oakhaven at ${ORG.address.line1}, ${ORG.address.line2}, ${ORG.address.city}, ${ORG.address.region}, or ${ORG.email}.`} />
      <TypeHero
        eyebrow="Contact"
        crumbs={[{ label: 'Get in Touch' }]}
        title={
          <>
            Get in <span className="italic-accent text-ember">touch.</span>
          </>
        }
        intro="Whether you have a business to sell, a partnership to explore, or a question about our work, we would like to hear from you."
      />

      <section className="bg-paper pb-24 md:pb-36">
        <div className="shell grid gap-16 lg:grid-cols-12">
          <FadeIn className="lg:col-span-7">
            <form onSubmit={submit} className="grid gap-10" aria-describedby="form-note">
              <fieldset>
                <legend className="t-eyebrow text-stone">I’m reaching out about</legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {TOPICS.map((t) => (
                    <label
                      key={t.id}
                      className={`cursor-pointer rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-amber ${
                        topic === t.id ? 'border-ink bg-ink text-paper' : 'border-ink/20 hover:border-ink'
                      }`}
                    >
                      <input type="radio" name="topic" value={t.id} checked={topic === t.id} onChange={() => setTopic(t.id)} className="sr-only" />
                      {t.label}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="grid gap-10 md:grid-cols-2">
                <label className="block">
                  <span className="t-eyebrow text-stone">Your name</span>
                  <input name="name" required autoComplete="name" className={field} />
                </label>
                <label className="block">
                  <span className="t-eyebrow text-stone">Organization (optional)</span>
                  <input name="organization" autoComplete="organization" className={field} />
                </label>
              </div>
              <label className="block">
                <span className="t-eyebrow text-stone">Message</span>
                <textarea name="message" required rows={5} className={`${field} resize-y`} />
              </label>
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <p id="form-note" className="max-w-md text-sm text-stone">
                  This opens your email app with a message addressed to <strong className="text-ink">{current.to}</strong>. Nothing is sent
                  from this page.
                </p>
                <button
                  type="submit"
                  className="inline-flex h-14 shrink-0 items-center gap-3 rounded-full bg-ink pl-7 pr-2 font-semibold text-paper transition-colors hover:bg-gold hover:text-ink"
                >
                  Compose email
                  <span className="grid size-10 place-items-center rounded-full bg-paper/10">
                    <Mail className="size-4" aria-hidden="true" />
                  </span>
                </button>
              </div>
              {opened && (
                <p role="status" className="rounded-[6px] bg-paper-2 p-4 text-sm">
                  Your email app should now be open with your message. If nothing happened, write to{' '}
                  <a className="u-link font-semibold" href={`mailto:${current.to}`}>
                    {current.to}
                  </a>{' '}
                  directly.
                </p>
              )}
            </form>
          </FadeIn>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="space-y-10 lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <MotionImage id="hq-exterior" alt="The Hartwell Building, home of Oakhaven" className="aspect-[4/3] rounded-[4px]" sizes="(min-width:1024px) 30vw, 100vw" position="50% 30%" />
              <div>
                <p className="t-eyebrow text-ember">Headquarters</p>
                <address className="mt-4 flex gap-3 not-italic text-lg leading-relaxed">
                  <MapPin className="mt-1.5 size-5 shrink-0 text-ember" aria-hidden="true" />
                  <span>
                    {ORG.name}
                    <br />
                    {ORG.address.line1}
                    <br />
                    {ORG.address.line2}
                    <br />
                    {ORG.address.city}, {ORG.address.region} {ORG.address.postal}
                  </span>
                </address>
                <SmartLink to={ORG.mapsUrl} className="mt-4 inline-flex items-center gap-1.5 font-semibold text-ember hover:underline">
                  Get directions <ArrowUpRight className="size-4" aria-hidden="true" />
                </SmartLink>
              </div>
              <div>
                <p className="t-eyebrow text-ember">Email</p>
                <a href={`mailto:${ORG.email}`} className="u-link mt-3 inline-block font-display text-2xl">
                  {ORG.email}
                </a>
                <p className="mt-2 text-sm text-stone">
                  Careers:{' '}
                  <a href={`mailto:${ORG.hrEmail}`} className="u-link text-ink">
                    {ORG.hrEmail}
                  </a>
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
