export default function AboutSection({ t }) {
  const education = t('about.education') || []
  const languages = t('about.languages') || []

  return (
    <div className="section-content">
      <div className="section-head">
        <span className="section-kicker">[ 01 ]</span>
        <h2 className="section-title">{t('about.title')}</h2>
        <p className="section-lead">{t('about.lead')}</p>
      </div>

      <div className="about-grid">
        <div className="panel">
          <p className="about-lead">{t('about.paragraph1')}</p>
          <p>{t('about.paragraph2')}</p>

          <div className="about-stats">
            <div className="stat">
              <span className="stat-value">{t('about.stat1Value')}</span>
              <span className="stat-label">{t('about.stat1Label')}</span>
            </div>
            <div className="stat">
              <span className="stat-value">{t('about.stat2Value')}</span>
              <span className="stat-label">{t('about.stat2Label')}</span>
            </div>
            <div className="stat">
              <span className="stat-value">{t('about.stat3Value')}</span>
              <span className="stat-label">{t('about.stat3Label')}</span>
            </div>
          </div>
        </div>

        <div className="panel">
          <h3 className="about-block-title">{t('about.educationTitle')}</h3>
          <ul className="about-list">
            {education.map((item) => (
              <li className="about-list-item" key={item.degree}>
                <div className="ali-main">{item.degree}</div>
                <div className="ali-sub">{item.school} · {item.period}</div>
              </li>
            ))}
          </ul>

          <h3 className="about-block-title">{t('about.languagesTitle')}</h3>
          <ul className="about-list">
            {languages.map((item) => (
              <li className="about-list-item lang-row" key={item.name}>
                <span className="ali-main">{item.name}</span>
                <span className="lang-badge">{item.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
