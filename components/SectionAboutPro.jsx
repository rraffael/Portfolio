export default function SectionAboutPro({ t }) {
  const education = t('about.education') || []
  const languages = t('about.languages') || []

  return (
    <>
      <h2>{t('about.title')}</h2>
      <p className="pro-placeholder-lead">{t('about.lead')}</p>

      <div className="pro-about-grid">
        <div className="pro-panel">
          <p className="pro-about-bio">{t('about.paragraph1')}</p>
          <p className="pro-placeholder-lead">{t('about.paragraph2')}</p>

          <div className="pro-stats">
            <div className="pro-stat">
              <span className="pro-stat-value">{t('about.stat1Value')}</span>
              <span className="pro-stat-label">{t('about.stat1Label')}</span>
            </div>
            <div className="pro-stat">
              <span className="pro-stat-value">{t('about.stat2Value')}</span>
              <span className="pro-stat-label">{t('about.stat2Label')}</span>
            </div>
            <div className="pro-stat">
              <span className="pro-stat-value">{t('about.stat3Value')}</span>
              <span className="pro-stat-label">{t('about.stat3Label')}</span>
            </div>
          </div>
        </div>

        <div className="pro-panel">
          <h3 className="pro-about-block-title">{t('about.educationTitle')}</h3>
          <ul className="pro-about-list">
            {education.map((item) => (
              <li key={item.degree}>
                <div className="pro-about-list-main">{item.degree}</div>
                <div className="pro-about-list-sub">
                  {item.school} · {item.period}
                </div>
              </li>
            ))}
          </ul>

          <h3 className="pro-about-block-title">{t('about.languagesTitle')}</h3>
          <ul className="pro-about-list">
            {languages.map((item) => (
              <li className="pro-about-lang-row" key={item.name}>
                <span className="pro-about-list-main">{item.name}</span>
                <span className="pro-chip">{item.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
