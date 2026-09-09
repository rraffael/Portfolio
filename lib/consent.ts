// Cookie / storage consent for the portfolio.
//
// The site is a static export with no server. Everything that stores something
// in the browser or talks to a third party is listed here, so the banner keeps
// exactly three categories:
//   - necessary : localStorage for the language choice and for this very consent
//                 record. Always on — the site cannot remember your preferences
//                 without it. Never sent anywhere.
//   - weather   : the home window shows the visitor's local weather, which needs
//                 a round-trip to third-party APIs (ipapi.co, open-meteo.com,
//                 wttr.in) that read the request IP to infer an approximate
//                 location. Optional — declining it just shows the default scene.
//   - analytics : Google Analytics 4 (gtag.js), which sets its own `_ga` cookies
//                 and reports anonymous visit stats to Google. Optional — with it
//                 declined the tag is never loaded at all (see components/
//                 Analytics.jsx).

export type ConsentCategory = 'necessary' | 'weather' | 'analytics'

export interface Consent {
  necessary: true
  weather: boolean
  analytics: boolean
  // ISO timestamp of the decision and a schema version, so the banner can be
  // re-shown later if the categories ever change.
  decidedAt: string
  version: number
}

// Bumped to 2 when the `analytics` category was added: an older record predates
// that choice, so it is discarded and the visitor is asked once more.
export const CONSENT_VERSION = 2
const STORAGE_KEY = 'portfolio-consent'

// Read the stored decision. Returns null when nothing was decided yet (banner
// should be shown) or when the stored record is from an older schema version.
export function loadConsent(): Consent | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<Consent> | null
    if (!parsed || parsed.version !== CONSENT_VERSION) return null
    return {
      necessary: true,
      weather: parsed.weather === true,
      analytics: parsed.analytics === true,
      decidedAt: typeof parsed.decidedAt === 'string' ? parsed.decidedAt : '',
      version: CONSENT_VERSION
    }
  } catch {
    // localStorage unavailable (private mode) or malformed JSON — treat as
    // "not decided" so the visitor is asked again next time.
    return null
  }
}

// Persist a decision. `weather` and `analytics` are the opt-in toggles;
// necessary is implied.
export function saveConsent(weather: boolean, analytics: boolean): Consent {
  const consent: Consent = {
    necessary: true,
    weather,
    analytics,
    decidedAt: new Date().toISOString(),
    version: CONSENT_VERSION
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent))
  } catch {
    // Ignore storage failures; the choice still applies for this session.
  }
  return consent
}
