import { useState } from 'react'
import PageHead from '../components/PageHead'
import { Tbc } from '../components/ui'
import { contact } from '../data/site'
import { usePageTitle } from '../lib/usePageTitle'
import './pages.css'

/**
 * Contact.
 *
 * There is no backend in this project. Set FORM_ENDPOINT to a form service or
 * API route and the form POSTs to it; until then it composes a mail message in
 * the visitor's own client, and says so plainly rather than pretending to send.
 */
const FORM_ENDPOINT = null

const FIELDS = [
  { name: 'name', label: 'YOUR NAME', type: 'text', autoComplete: 'name' },
  { name: 'email', label: 'YOUR EMAIL', type: 'email', autoComplete: 'email' },
  { name: 'subject', label: 'SUBJECT', type: 'text', autoComplete: 'off' },
]

export default function Contact() {
  usePageTitle('CONTACT — Team Agnishul')
  const [status, setStatus] = useState(null)
  const [sending, setSending] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))

    if (!FORM_ENDPOINT) {
      const body = `${data.message}\n\n— ${data.name} (${data.email})`
      window.location.href = `mailto:${contact.emailTeam.value}?subject=${encodeURIComponent(
        data.subject
      )}&body=${encodeURIComponent(body)}`
      setStatus('MAIL APP OPENED')
      return
    }

    setSending(true)
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      setStatus(res.ok ? 'MESSAGE SENT' : 'COULD NOT SEND — TRY AGAIN')
      if (res.ok) e.target.reset()
    } catch {
      setStatus('COULD NOT SEND — TRY AGAIN')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <PageHead
        index="06"
        kicker="CONTACT"
        title="TALK TO US."
        lede="Sponsorship, collaboration, or joining the team."
      />

      <section className="sec sec--paper on-paper blueprint">
        <div className="shell contact">
          {/* --- channels ---------------------------------------------------- */}
          <div className="contact__info">
            <h2 className="display d-md">WHERE TO FIND US</h2>

            <dl className="info">
              <div className="info__row">
                <dt className="mono-sm">EMAIL</dt>
                <dd>
                  <a href={`mailto:${contact.emailTeam.value}`}>{contact.emailTeam.value}</a>
                  {contact.emailTeam.tbc && <Tbc />}
                </dd>
              </div>
              <div className="info__row">
                <dt className="mono-sm">ALT. EMAIL</dt>
                <dd>
                  <a href={`mailto:${contact.emailGeneral.value}`}>{contact.emailGeneral.value}</a>
                  {contact.emailGeneral.tbc && <Tbc />}
                </dd>
              </div>
              <div className="info__row">
                <dt className="mono-sm">PHONE</dt>
                <dd>
                  {contact.phone.value}
                  {contact.phone.tbc && <Tbc />}
                </dd>
              </div>
              <div className="info__row">
                <dt className="mono-sm">ADDRESS</dt>
                <dd>
                  {contact.address.map((l) => (
                    <span key={l} className="info__line">
                      {l}
                    </span>
                  ))}
                </dd>
              </div>
              <div className="info__row">
                <dt className="mono-sm">CHANNELS</dt>
                <dd className="info__socials">
                  {contact.socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      className={`tag ${s.tbc ? 'tag--ghost' : ''}`}
                      title={s.tbc ? 'Handle not published yet' : s.label}
                    >
                      {s.label}
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
          </div>

          {/* --- form -------------------------------------------------------- */}
          <form className="cform slab" onSubmit={onSubmit}>
            <div className="cform__head">
              <h2 className="display d-sm">SEND A MESSAGE</h2>
            </div>

            {FIELDS.map((f) => (
              <label className="cfield" key={f.name}>
                <span className="mono-sm">
                  {f.label} <i>*</i>
                </span>
                <input
                  type={f.type}
                  name={f.name}
                  required
                  autoComplete={f.autoComplete}
                  placeholder="—"
                />
              </label>
            ))}

            <label className="cfield">
              <span className="mono-sm">
                MESSAGE <i>*</i>
              </span>
              <textarea name="message" rows={6} required placeholder="—" />
            </label>

            <div className="cform__foot">
              <button type="submit" className="btn btn--red" disabled={sending}>
                {sending ? 'SENDING…' : 'SEND MESSAGE'} <span className="btn__arrow">→</span>
              </button>
              {!FORM_ENDPOINT && (
                <span className="mono-sm cform__note">
                  OPENS YOUR MAIL APP
                </span>
              )}
            </div>

            {status && (
              <p className="cform__status mono-sm" role="status">
                {status}
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  )
}
