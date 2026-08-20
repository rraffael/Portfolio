import { useState } from 'react'
import { IconGithub, IconLinkedin, IconLocation, IconMail } from './SocialIcons'

export default function SectionContactPro({ t }) {
  const email = t('contact.email')
  const [emailUser, emailDomain] = email.split('@')
  const [copied, setCopied] = useState(false)

  // mailto: only does something when the visitor has a default mail client set;
  // on many desktops it silently does nothing. So on click we also copy the
  // address to the clipboard (with feedback) — the mailto navigation still
  // proceeds for anyone who does have a client. Mirrors SectionContact.jsx.
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
    <>
      <h2>{t('contact.title')}</h2>
      <p className="pro-placeholder-lead">{t('contact.lead')}</p>

      <div className="pro-contact-grid">
        <a
          className="pro-panel pro-contact-link pro-contact-link--email"
          href={`mailto:${email}`}
          onClick={copyEmail}
        >
          <span className="pro-contact-icon">
            <IconMail />
          </span>
          <span className="pro-contact-text">
            <span className="pro-contact-label">{t('contact.emailLabel')}</span>
            {/* <wbr> after "@" so a wrap (if needed) happens at the natural
                email break point instead of overflow-wrap picking an
                arbitrary spot mid-word. */}
            <span className="pro-contact-value">
              {emailUser}@<wbr />
              {emailDomain}
            </span>
          </span>
        </a>

        <a
          className="pro-panel pro-contact-link"
          href={t('contact.linkedin')}
          target="_blank"
          rel="noreferrer"
        >
          <span className="pro-contact-icon">
            <IconLinkedin />
          </span>
          <span className="pro-contact-text">
            <span className="pro-contact-label">{t('contact.linkedinLabel')}</span>
            <span className="pro-contact-value">{t('contact.linkedinHandle')}</span>
          </span>
        </a>

        <a
          className="pro-panel pro-contact-link"
          href={t('contact.github')}
          target="_blank"
          rel="noreferrer"
        >
          <span className="pro-contact-icon">
            <IconGithub />
          </span>
          <span className="pro-contact-text">
            <span className="pro-contact-label">{t('contact.githubLabel')}</span>
            <span className="pro-contact-value">{t('contact.githubHandle')}</span>
          </span>
        </a>

        <div className="pro-panel pro-contact-link pro-contact-link--static">
          <span className="pro-contact-icon">
            <IconLocation />
          </span>
          <span className="pro-contact-text">
            <span className="pro-contact-label">{t('contact.locationLabel')}</span>
            <span className="pro-contact-value">{t('contact.location')}</span>
          </span>
        </div>
      </div>

      <div className="pro-placeholder-actions">
        <a className="pro-btn pro-btn--primary" href={`mailto:${email}`} onClick={copyEmail}>
          {copied ? t('contact.copied') : t('contact.button')}
        </a>
      </div>
    </>
  )
}
