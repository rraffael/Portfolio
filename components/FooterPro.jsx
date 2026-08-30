import { useState } from 'react'
import { IconGithub, IconLinkedin, IconMail } from './SocialIcons'

// Not translatable, not sensitive: a random Pix key (exposes no name/CPF/phone)
// and a public Wise payment link. Mirrors Footer.jsx (pixel world) — kept out
// of the locale files since neither value is copy.
const WISE_URL = 'https://wise.com/pay/me/raffaeld4'
const PIX_KEY = 'bb0669bb-53ea-486f-8516-8ed0066002b8'

export default function FooterPro({ t, onScrollTop, onManageCookies }) {
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
    <footer className="pro-footer">
      <div className="pro-footer-inner">
        <div className="pro-footer-about">
          <span>
            {t('footer.text')} © {year}
          </span>
          <span className="pro-footer-rights">{t('footer.rights')}</span>
        </div>

        <div className="pro-footer-actions">
          <div className="pro-social">
            <a
              className="pro-social-link"
              href={`mailto:${t('contact.email')}`}
              aria-label={t('contact.emailLabel')}
            >
              <IconMail size={16} />
            </a>
            <a
              className="pro-social-link"
              href={t('contact.linkedin')}
              target="_blank"
              rel="noreferrer"
              aria-label={t('contact.linkedinLabel')}
            >
              <IconLinkedin size={16} />
            </a>
            <a
              className="pro-social-link"
              href={t('contact.github')}
              target="_blank"
              rel="noreferrer"
              aria-label={t('contact.githubLabel')}
            >
              <IconGithub size={16} />
            </a>
          </div>

          <div className="pro-footer-support">
            <button
              type="button"
              className="pro-footer-tea"
              onClick={() => setTeaOpen((open) => !open)}
              aria-expanded={teaOpen}
              aria-haspopup="dialog"
            >
              <span aria-hidden="true">🍹</span> {t('support.button')}
            </button>

            {teaOpen && (
              <>
                <button
                  type="button"
                  className="pro-tea-backdrop"
                  aria-label={t('support.close')}
                  onClick={() => setTeaOpen(false)}
                />
                <div
                  className="pro-panel pro-tea-pop"
                  role="dialog"
                  aria-label={t('support.title')}
                >
                  <p className="pro-tea-pop-title">{t('support.title')}</p>

                  <a
                    className="pro-btn pro-btn--primary pro-tea-pop-wise"
                    href={WISE_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t('support.wise')} →
                  </a>

                  <div className="pro-tea-pop-pix">
                    <span className="pro-tea-pop-pix-label">{t('support.pixLabel')}</span>
                    <button type="button" className="pro-tea-pop-pix-copy" onClick={copyPix}>
                      <code>{PIX_KEY}</code>
                      <span className="pro-tea-pop-pix-action">
                        {copied ? t('support.copied') : t('support.copy')}
                      </span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <button type="button" className="pro-footer-cookies" onClick={onManageCookies}>
            🍪 {t('cookies.manage')}
          </button>

          <button type="button" className="pro-back-to-top" onClick={onScrollTop}>
            {t('menu.backToTop')} ↑
          </button>
        </div>
      </div>
    </footer>
  )
}
