// Weather lookup for the home avatar badge.
//
// Two independent public APIs are used, both keyless and CORS-enabled so they
// work from the static GitHub Pages build:
//   1. Primary  — ipapi.co (IP → lat/lon/city) + Open-Meteo (lat/lon → weather)
//   2. Backup   — wttr.in (IP → city + weather in a single call)
// If the primary chain throws or times out, the backup is tried before giving up.

export type Condition = 'clear' | 'partly' | 'cloudy' | 'fog' | 'rain' | 'snow' | 'storm'

export interface Weather {
  condition: Condition
  icon: string
  temperature: number
  city: string
  source: string
}

// Shared weather "buckets" the badge knows how to render. Each API maps its own
// numeric codes onto one of these so the UI only deals with a small, stable set.
export const CONDITION_ICONS: Record<Condition, string> = {
  clear: '☀️',
  partly: '⛅',
  cloudy: '☁️',
  fog: '🌫️',
  rain: '🌧️',
  snow: '❄️',
  storm: '⛈️'
}

// Stable display order of every condition the API can resolve to. Used by the UI
// (window scenes, dev mock picker) so the list stays in sync with this module.
export const CONDITIONS: Condition[] = ['clear', 'partly', 'cloudy', 'fog', 'rain', 'snow', 'storm']

// WMO weather codes used by Open-Meteo → condition bucket.
function wmoToCondition(code: number): Condition {
  if (code === 0) return 'clear'
  if (code === 1 || code === 2) return 'partly'
  if (code === 3) return 'cloudy'
  if (code === 45 || code === 48) return 'fog'
  if (code >= 71 && code <= 77) return 'snow'
  if (code >= 85 && code <= 86) return 'snow'
  if (code >= 95) return 'storm'
  if (code >= 51) return 'rain'
  return 'cloudy'
}

// WWO weather codes used by wttr.in → condition bucket.
function wwoToCondition(code: number): Condition {
  if (code === 113) return 'clear'
  if (code === 116) return 'partly'
  if (code === 119 || code === 122) return 'cloudy'
  if (code === 143 || code === 248 || code === 260) return 'fog'
  if (code >= 200 && code <= 230) return 'storm'
  if ([386, 389, 392, 395].includes(code)) return 'storm'
  if (
    [
      179, 182, 185, 227, 230, 281, 284, 311, 314, 317, 320, 323, 326, 329, 332, 335, 338, 350, 362,
      365, 368, 371, 374, 377
    ].includes(code)
  ) {
    return 'snow'
  }
  return 'rain'
}

// Abort a fetch that hangs so we can fall through to the backup quickly.
async function fetchJson(url: string, timeoutMs = 6000): Promise<any> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, { signal: controller.signal })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } finally {
    clearTimeout(timer)
  }
}

async function fetchPrimary(): Promise<Weather> {
  const loc = await fetchJson('https://ipapi.co/json/')
  if (loc == null || loc.latitude == null || loc.longitude == null) {
    throw new Error('ipapi: no coordinates')
  }
  const weather = await fetchJson(
    `https://api.open-meteo.com/v1/forecast?latitude=${loc.latitude}&longitude=${loc.longitude}&current_weather=true`
  )
  const current = weather && weather.current_weather
  if (!current) throw new Error('open-meteo: no current_weather')
  const condition = wmoToCondition(current.weathercode)
  return {
    condition,
    icon: CONDITION_ICONS[condition],
    temperature: Math.round(current.temperature),
    city: loc.city || '',
    source: 'open-meteo'
  }
}

async function fetchBackup(): Promise<Weather> {
  const data = await fetchJson('https://wttr.in/?format=j1')
  const current = data && data.current_condition && data.current_condition[0]
  if (!current) throw new Error('wttr.in: no current_condition')
  const condition = wwoToCondition(Number(current.weatherCode))
  const area = data.nearest_area && data.nearest_area[0]
  const city = area && area.areaName && area.areaName[0] ? area.areaName[0].value : ''
  return {
    condition,
    icon: CONDITION_ICONS[condition],
    temperature: Math.round(Number(current.temp_C)),
    city,
    source: 'wttr.in'
  }
}

// Resolve to a normalized weather object, trying the primary chain first and
// transparently falling back to the backup. Rejects only if both fail.
export async function fetchWeather(): Promise<Weather> {
  try {
    return await fetchPrimary()
  } catch (primaryError) {
    try {
      return await fetchBackup()
    } catch (backupError) {
      const primaryMessage =
        primaryError instanceof Error ? primaryError.message : String(primaryError)
      const backupMessage = backupError instanceof Error ? backupError.message : String(backupError)
      throw new Error(`weather unavailable (primary: ${primaryMessage}; backup: ${backupMessage})`)
    }
  }
}
