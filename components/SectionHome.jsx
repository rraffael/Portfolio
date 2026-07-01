import { useState } from 'react'
import HomeWeatherBadge from './HomeWeatherBadge'
import useWeather from './useWeather'
import { CONDITIONS, iconFor } from '../lib/weather'

// The dev-only weather mock picker is rendered only outside production builds.
// In the static export NODE_ENV is inlined as 'production', so the control (and
// its markup) never ships to GitHub Pages.
const IS_DEV = process.env.NODE_ENV !== 'production'

export default function SectionHome({ t, weatherConsent = false }) {
  // The weather round-trip only happens once the visitor has opted in via the
  // cookie banner; until then the window shows the default avatar scene.
  const { weather, status } = useWeather(weatherConsent)
  // Local-only overrides so you can preview every window scene from `npm run dev`.
  const [mockCondition, setMockCondition] = useState(null)
  const [mockNight, setMockNight] = useState(false)
  const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

  // Real condition from the API once it resolves (and in the static export's
  // initial HTML it's null, so server and client first render match).
  const realCondition =
    status === 'ready' && weather && CONDITIONS.includes(weather.condition)
      ? weather.condition
      : null

  // Day vs night: the API reports it (Open-Meteo `is_day`); a dev mock overrides
  // it. Defaults to daytime when unknown.
  const realIsDay = weather && typeof weather.isDay === 'boolean' ? weather.isDay : true
  const isDay = mockCondition ? !mockNight : realIsDay

  // A dev mock wins over the live weather; otherwise show the real condition.
  const condition = mockCondition || realCondition
  const suffix = isDay ? '' : '-night'
  const windowSrc = condition ? `${base}/window/${condition}${suffix}.svg` : `${base}/avatar.svg`

  // Keep the badge in sync with whatever the window is showing. While mocking we
  // synthesize a weather object so the badge reflects the chosen condition too.
  const badgeWeather = mockCondition
    ? {
        condition: mockCondition,
        icon: iconFor(mockCondition, isDay),
        temperature: weather ? weather.temperature : 21,
        city: weather ? weather.city : ''
      }
    : weather
  const badgeStatus = mockCondition ? 'ready' : status

  return (
    <div className="section-content home-wrap">
      <div className="home-card">
        <div className="home-avatar-frame">
          <img
            className="home-avatar"
            src={windowSrc}
            alt={t('home.name')}
            width="384"
            height="256"
          />
          <HomeWeatherBadge t={t} weather={badgeWeather} status={badgeStatus} />
        </div>

        {IS_DEV && (
          <div className="weather-mock" role="group" aria-label="Dev weather preview">
            <span className="weather-mock-label">dev · weather</span>
            <button
              type="button"
              className={`weather-mock-btn${mockCondition === null ? ' is-active' : ''}`}
              onClick={() => setMockCondition(null)}
              title="Use the real weather API"
            >
              auto
            </button>
            <button
              type="button"
              className={`weather-mock-btn${mockNight ? ' is-active' : ''}`}
              onClick={() => setMockNight((night) => !night)}
              title="Preview the night variant"
            >
              <span aria-hidden="true">{mockNight ? '🌙' : '☀️'}</span>
              <span className="weather-mock-name">{mockNight ? 'night' : 'day'}</span>
            </button>
            {CONDITIONS.map((c) => (
              <button
                key={c}
                type="button"
                className={`weather-mock-btn${mockCondition === c ? ' is-active' : ''}`}
                onClick={() => setMockCondition(c)}
                title={t(`home.weather.${c}`)}
              >
                <span aria-hidden="true">{iconFor(c, !mockNight)}</span>
                <span className="weather-mock-name">{t(`home.weather.${c}`)}</span>
              </button>
            ))}
          </div>
        )}

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

        <div className="scroll-indicator" aria-hidden="true">
          {t('home.scrollHint')} ►
        </div>
      </div>
    </div>
  )
}
