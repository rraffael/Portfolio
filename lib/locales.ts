import en from '../locales/en.json'
import pt from '../locales/pt.json'

export const LOCALES: Record<string, unknown> = {
  en,
  pt
}

export const DEFAULT_LOCALE = 'en'

export function isSupportedLocale(code: string): boolean {
  return Object.prototype.hasOwnProperty.call(LOCALES, code)
}

// Pick the best supported locale from a list of BCP-47 tags (e.g.
// navigator.languages: ['pt-BR', 'pt', 'en-US']). Falls back to DEFAULT_LOCALE.
export function resolvePreferredLocale(languages: readonly string[] = []): string {
  for (const tag of languages) {
    const base = String(tag).toLowerCase().split('-')[0]
    if (isSupportedLocale(base)) return base
  }
  return DEFAULT_LOCALE
}

function getNestedValue(object: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((current, key) => {
    if (current && typeof current === 'object') {
      return (current as Record<string, unknown>)[key]
    }
    return undefined
  }, object)
}

// Resolve a dot-path against the active locale, falling back to English, then to
// the raw path string. Returns the raw JSON value (string, array or object), so
// callers can render strings or map over lists.
export function getMessage(locale: string, path: string): unknown {
  const value = getNestedValue(LOCALES[locale] || LOCALES.en, path)
  if (value !== undefined) {
    return value
  }
  const fallback = getNestedValue(LOCALES.en, path)
  return fallback !== undefined ? fallback : path
}
