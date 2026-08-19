import { IconGithub, IconLinkedin, IconMail } from './SocialIcons'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function SectionHeroPro({ t, onNavigate }) {
  return (
    <div className="pro-section-inner pro-section-inner--wide pro-hero">
      <div className="pro-hero-top">
        <img className="pro-hero-avatar" src={`${basePath}/portrait.jpeg`} alt={t('home.name')} />
        <div className="pro-hero-intro">
          <span className="pro-chip">{t('home.greeting')}</span>
          <h1>{t('home.name')}</h1>
          <p className="pro-hero-role">{t('home.role')}</p>
        </div>
      </div>

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
        <a className="pro-btn pro-btn--ghost" href={`${basePath}/cv-en.pdf`} download>
          {t('home.ctaCvEn')}
        </a>
        <a className="pro-btn pro-btn--ghost" href={`${basePath}/cv-pt.pdf`} download>
          {t('home.ctaCvPt')}
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
