import en from '../locales/en.json'
import pt from '../locales/pt.json'

export const LOCALES = {
  en,
  pt
}

export const DEFAULT_LOCALE = 'en'

export function isSupportedLocale(code) {
  return Object.prototype.hasOwnProperty.call(LOCALES, code)
}

// Pick the best supported locale from a list of BCP-47 tags (e.g.
// navigator.languages: ['pt-BR', 'pt', 'en-US']). Falls back to DEFAULT_LOCALE.
export function resolvePreferredLocale(languages = []) {
  for (const tag of languages) {
    const base = String(tag).toLowerCase().split('-')[0]
    if (isSupportedLocale(base)) return base
  }
  return DEFAULT_LOCALE
}

const getNestedValue = (object, path) => {
  return path.split('.').reduce((current, key) => {
    if (current && typeof current === 'object') {
      return current[key]
    }
    return undefined
  }, object)
}

export function getMessage(locale, path) {
  const value = getNestedValue(LOCALES[locale] || LOCALES.en, path)
  if (value !== undefined) {
    return value
  }
  const fallback = getNestedValue(LOCALES.en, path)
  return fallback !== undefined ? fallback : path
}
