// Google Analytics 4 (gtag.js), loaded only with the visitor's consent.
//
// The tag itself is injected by components/Analytics.jsx; this module keeps the
// measurement id and the runtime kill switch in one typed place. GA is a
// third-party tracker, so it hangs off the `analytics` consent category in
// lib/consent.ts and never runs before a decision is made.

export const GA_MEASUREMENT_ID = 'G-YGQ2BTMRPC'

// gtag.js reads `window['ga-disable-<id>']` before every hit, so flipping it is
// how a visitor who revokes consent mid-session stops being measured without a
// reload (the script stays loaded, but goes quiet).
const DISABLE_KEY = `ga-disable-${GA_MEASUREMENT_ID}`

export function setAnalyticsDisabled(disabled: boolean): void {
  if (typeof window === 'undefined') return
  ;(window as unknown as Record<string, boolean>)[DISABLE_KEY] = disabled
}
