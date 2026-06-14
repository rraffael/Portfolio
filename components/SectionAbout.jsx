export default function AboutSection({ t }) {
  return (
    <div className="section-content">
      <div>
        <h1>{t('about.title')}</h1>
        <p>{t('about.description')}</p>
      </div>
    </div>
  )
}
