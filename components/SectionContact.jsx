export default function ContactSection({ t }) {
  const email = t('contact.email')

  return (
    <div className="section-content contact-content">
      <div className="section-head">
        <span className="section-kicker">[ 05 ]</span>
        <h2 className="section-title">{t('contact.title')}</h2>
        <p className="section-lead">{t('contact.lead')}</p>
      </div>

      <div className="contact-links">
        <a className="panel contact-link" href={`mailto:${email}`}>
          <span className="contact-link-label">✉ {t('contact.emailLabel')}</span>
          <span className="contact-link-value">{email}</span>
        </a>

        <a className="panel contact-link" href={t('contact.linkedin')} target="_blank" rel="noreferrer">
          <span className="contact-link-label">in {t('contact.linkedinLabel')}</span>
          <span className="contact-link-value">@raffael-castro-rodrigues</span>
        </a>

        <a className="panel contact-link" href={t('contact.github')} target="_blank" rel="noreferrer">
          <span className="contact-link-label">{'</>'} {t('contact.githubLabel')}</span>
          <span className="contact-link-value">@rraffael</span>
        </a>

        <div className="panel contact-link">
          <span className="contact-link-label">◈ {t('contact.locationLabel')}</span>
          <span className="contact-link-value">{t('contact.location')}</span>
        </div>
      </div>

      <a className="pixel-btn pixel-btn--mint" href={`mailto:${email}`}>
        {t('contact.button')}
      </a>
    </div>
  )
}
