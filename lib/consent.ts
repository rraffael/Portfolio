// Cookie / storage consent for the portfolio.
//
// The site is a static export with no server and no tracking. Only two kinds of
// browser storage / third-party access exist, so the banner keeps exactly two
// categories:
//   - necessary : localStorage for the language choice and for this very consent
//                 record. Always on — the site cannot remember your preferences
//                 without it. Never sent anywhere.
//   - weather   : the home window shows the visitor's local weather, which needs
//                 a round-trip to third-party APIs (ipapi.co, open-meteo.com,
//                 wttr.in) that read the request IP to infer an approximate
//                 location. Optional — declining it just shows the default scene.

export type ConsentCategory = 'necessary' | 'weather'

export interface Consent {
  necessary: true
  weather: boolean
  // ISO timestamp of the decision and a schema version, so the banner can be
  // re-shown later if the categories ever change.
  decidedAt: string
  version: number
}

export const CONSENT_VERSION = 1
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
      decidedAt: typeof parsed.decidedAt === 'string' ? parsed.decidedAt : '',
      version: CONSENT_VERSION
    }
  } catch {
    // localStorage unavailable (private mode) or malformed JSON — treat as
    // "not decided" so the visitor is asked again next time.
    return null
  }
}

// Persist a decision. `weather` is the only opt-in toggle; necessary is implied.
export function saveConsent(weather: boolean): Consent {
  const consent: Consent = {
    necessary: true,
    weather,
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
