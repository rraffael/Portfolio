import { IconGithub, IconLinkedin, IconMail } from './SocialIcons'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

// First + last word initials (e.g. "Raffael de Castro Rodrigues" -> "RR").
// Same source string in both locales, so this never mismatches EN/PT.
function getInitials(name) {
  const parts = name.trim().split(/\s+/)
  const first = parts[0]?.[0] || ''
  const last = parts[parts.length - 1]?.[0] || ''
  return (first + last).toUpperCase()
}

export default function SectionHeroPro({ t, onNavigate }) {
  return (
    <div className="pro-section-inner pro-section-inner--wide pro-hero">
      {/* Placeholder until a real portrait is available — swap this div for an
          <img src={`${basePath}/portrait.jpg`}> once the file lands in public/. */}
      <div className="pro-hero-avatar" aria-hidden="true">
        {getInitials(t('home.name'))}
      </div>

      <span className="pro-chip">{t('home.greeting')}</span>
      <h1>{t('home.name')}</h1>
      <p className="pro-hero-role">{t('home.role')}</p>
      <p className="pro-placeholder-lead">{t('home.headline')}</p>

      <span className="pro-hero-status">
        <span className="pro-hero-status-dot" aria-hidden="true" />
        {t('home.status')}
      </span>

      <div className="pro-placeholder-actions">
        <button
          type="button"
          className="pro-btn pro-btn--primary"
          onClick={() => onNavigate('projects')}
        >
          {t('home.ctaProjects')}
        </button>
        <button
          type="button"
          className="pro-btn pro-btn--ghost"
          onClick={() => onNavigate('contact')}
        >
          {t('home.ctaContact')}
        </button>
        <a className="pro-btn pro-btn--ghost" href={`${basePath}/cv.pdf`} download>
          {t('home.ctaCv')}
        </a>
      </div>

      <div className="pro-social">
        <a
          className="pro-social-link"
          href={`mailto:${t('contact.email')}`}
          aria-label={t('contact.emailLabel')}
        >
          <IconMail />
        </a>
        <a
          className="pro-social-link"
          href={t('contact.linkedin')}
          target="_blank"
          rel="noreferrer"
          aria-label={t('contact.linkedinLabel')}
        >
          <IconLinkedin />
        </a>
        <a
          className="pro-social-link"
          href={t('contact.github')}
          target="_blank"
          rel="noreferrer"
          aria-label={t('contact.githubLabel')}
        >
          <IconGithub />
        </a>
      </div>
    </div>
  )
}
