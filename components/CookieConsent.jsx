import { useState } from 'react'

// Subtle first-visit consent banner. Slides in from the corner and offers three
// paths — accept everything, reject everything non-essential, or customize each
// category with a plain-language explanation of what it stores/accesses and why.
// The parent owns persistence; this component only collects the decision.
export default function CookieConsent({ t, onAccept, onReject, onSave }) {
  const [showDetails, setShowDetails] = useState(false)
  // The only opt-in toggle; "necessary" is always on and cannot be disabled.
  const [weather, setWeather] = useState(true)

  return (
    <div
      className="cookie-consent"
      role="dialog"
      aria-modal="false"
      aria-label={t('cookies.title')}
    >
      <div className="cookie-inner">
        <div className="cookie-head">
          <span className="cookie-icon" aria-hidden="true">
            🍪
          </span>
          <div>
            <h2 className="cookie-title">{t('cookies.title')}</h2>
            <p className="cookie-text">{t('cookies.intro')}</p>
          </div>
        </div>

        {showDetails && (
          <div className="cookie-categories">
            <div className="cookie-cat">
              <div className="cookie-cat-head">
                <label className="cookie-switch cookie-switch--locked">
                  <input type="checkbox" checked disabled readOnly />
                  <span className="cookie-cat-name">{t('cookies.necessary.title')}</span>
                </label>
                <span className="cookie-badge">{t('cookies.always')}</span>
              </div>
              <p className="cookie-cat-desc">{t('cookies.necessary.desc')}</p>
              <ul className="cookie-cat-list">
                <li>{t('cookies.necessary.item1')}</li>
                <li>{t('cookies.necessary.item2')}</li>
              </ul>
            </div>

            <div className="cookie-cat">
              <div className="cookie-cat-head">
                <label className="cookie-switch">
                  <input
                    type="checkbox"
                    checked={weather}
                    onChange={(e) => setWeather(e.target.checked)}
                  />
                  <span className="cookie-cat-name">{t('cookies.weather.title')}</span>
                </label>
                <span className="cookie-badge cookie-badge--optional">{t('cookies.optional')}</span>
              </div>
              <p className="cookie-cat-desc">{t('cookies.weather.desc')}</p>
              <ul className="cookie-cat-list">
                <li>{t('cookies.weather.item1')}</li>
                <li>{t('cookies.weather.item2')}</li>
                <li>{t('cookies.weather.item3')}</li>
              </ul>
            </div>
          </div>
        )}

        <div className="cookie-actions">
          <div className="cookie-actions-row">
            <button
              type="button"
              className="cookie-btn cookie-btn--link"
              onClick={() => setShowDetails((open) => !open)}
              aria-expanded={showDetails}
            >
              {showDetails ? t('cookies.hide') : t('cookies.customize')}
            </button>
            {showDetails && (
              <button type="button" className="cookie-btn" onClick={() => onSave(weather)}>
                {t('cookies.save')}
              </button>
            )}
            <button type="button" className="cookie-btn" onClick={onReject}>
              {t('cookies.reject')}
            </button>
          </div>
          <button type="button" className="cookie-btn cookie-btn--primary" onClick={onAccept}>
            {t('cookies.accept')}
          </button>
        </div>
      </div>
    </div>
  )
}
