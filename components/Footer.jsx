import { useState } from 'react'

// Not translatable, not sensitive: a random Pix key (exposes no name/CPF/phone)
// and a public Wise payment link. Kept here so the locale files stay copy-only.
const WISE_URL = 'https://wise.com/pay/me/raffaeld4'
const PIX_KEY = '31c0efa1-5a33-43e7-8f46-6ff436dca0ff'

export default function Footer({ t, onManageCookies }) {
  const year = new Date().getFullYear()
  const [teaOpen, setTeaOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyPix = () => {
    if (!navigator.clipboard) return
    navigator.clipboard.writeText(PIX_KEY).then(
      () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      },
      () => {}
    )
  }

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-support">
          <button
            type="button"
            className="footer-tea"
            onClick={() => setTeaOpen((open) => !open)}
            aria-expanded={teaOpen}
            aria-haspopup="dialog"
          >
            <span aria-hidden="true">🍹</span>
            <span className="footer-tea-label">{t('support.button')}</span>
          </button>

          {teaOpen && (
            <>
              <button
                type="button"
                className="tea-pop-backdrop"
                aria-label={t('support.close')}
                onClick={() => setTeaOpen(false)}
              />
              <div className="tea-pop panel" role="dialog" aria-label={t('support.title')}>
                <p className="tea-pop-title">{t('support.title')}</p>

                <a
                  className="pixel-btn pixel-btn--mint tea-pop-wise"
                  href={WISE_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t('support.wise')} →
                </a>

                <div className="tea-pop-pix">
                  <span className="tea-pop-pix-label">{t('support.pixLabel')}</span>
                  <button type="button" className="tea-pop-pix-copy" onClick={copyPix}>
                    <code>{PIX_KEY}</code>
                    <span className="tea-pop-pix-action">
                      {copied ? t('support.copied') : t('support.copy')}
                    </span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

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
