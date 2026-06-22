export default function SectionHome({ t }) {
  return (
    <div className="section-content home-wrap">
      <div className="home-card">
        <img className="home-avatar" src="/avatar.svg" alt={t('home.name')} width="150" height="150" />
        <p className="home-greeting">{t('home.greeting')}</p>
        <h1 className="home-name">{t('home.name')}</h1>
        <p className="home-role">{t('home.role')}</p>
        <p className="home-headline">{t('home.headline')}</p>

        <span className="home-status">
          <span className="status-dot" aria-hidden="true" />
          {t('home.status')}
        </span>

        <div className="home-cta">
          <a className="pixel-btn" href="#projects">
            {t('home.ctaProjects')}
          </a>
          <a className="pixel-btn pixel-btn--ghost" href="#contact">
            {t('home.ctaContact')}
          </a>
        </div>

        <div className="scroll-indicator" aria-hidden="true">{t('home.scrollHint')} ►</div>
      </div>
    </div>
  )
}
