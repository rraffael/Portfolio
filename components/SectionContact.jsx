import { useState } from 'react'

export default function ContactSection({ t }) {
  const email = t('contact.email')
  const [copied, setCopied] = useState(false)

  // mailto: only does something when the visitor has a default mail client set;
  // on many desktops it silently does nothing. So on click we also copy the
  // address to the clipboard (with feedback) — the mailto navigation still
  // proceeds for anyone who does have a client.
  const copyEmail = () => {
    if (!navigator.clipboard) return
    navigator.clipboard.writeText(email).then(
      () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
      },
      () => {}
    )
  }

  return (
    <div className="section-content contact-content">
      <div className="section-head">
        <span className="section-kicker">[ 05 ]</span>
        <h2 className="section-title">{t('contact.title')}</h2>
        <p className="section-lead">{t('contact.lead')}</p>
      </div>

      <div className="contact-links">
        <a className="panel contact-link" href={`mailto:${email}`} onClick={copyEmail}>
          <span className="contact-link-label">✉ {t('contact.emailLabel')}</span>
          <span className="contact-link-value">{email}</span>
        </a>

        <a
          className="panel contact-link"
          href={t('contact.linkedin')}
          target="_blank"
          rel="noreferrer"
        >
          <span className="contact-link-label">in {t('contact.linkedinLabel')}</span>
          <span className="contact-link-value">{t('contact.linkedinHandle')}</span>
        </a>

        <a
          className="panel contact-link"
          href={t('contact.github')}
          target="_blank"
          rel="noreferrer"
        >
          <span className="contact-link-label">
            {'</>'} {t('contact.githubLabel')}
          </span>
          <span className="contact-link-value">{t('contact.githubHandle')}</span>
        </a>

        <div className="panel contact-link">
          <span className="contact-link-label">◈ {t('contact.locationLabel')}</span>
          <span className="contact-link-value">{t('contact.location')}</span>
        </div>
      </div>

      <a className="pixel-btn pixel-btn--mint" href={`mailto:${email}`} onClick={copyEmail}>
        {copied ? t('contact.copied') : t('contact.button')}
      </a>
    </div>
  )
}
