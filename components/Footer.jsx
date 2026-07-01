export default function Footer({ t, onManageCookies }) {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="footer-text">{t('footer.text')}</p>
        <span className="footer-rights">
          © {year} · {t('footer.rights')}
          {onManageCookies && (
            <>
              {' · '}
              <button type="button" className="footer-cookies" onClick={onManageCookies}>
                🍪 {t('cookies.manage')}
              </button>
            </>
          )}
        </span>
      </div>
    </footer>
  )
}
