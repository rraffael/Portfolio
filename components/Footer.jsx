export default function Footer({ t }) {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="footer-text">{t('footer.text')}</p>
        <span className="footer-rights">© {year} · {t('footer.rights')}</span>
      </div>
    </footer>
  )
}
