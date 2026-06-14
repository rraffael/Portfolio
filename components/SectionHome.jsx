export default function SectionHome({ t }) {
  return (
    <div className="section-content">
      <div>
        <h1>{t('home.title')}</h1>
        <p>{t('home.subtitle')}</p>
        <p>{t('home.description')}</p>
      </div>
    </div>
  )
}
