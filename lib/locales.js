import en from '../locales/en.json'
import pt from '../locales/pt.json'

export const LOCALES = {
  en,
  pt
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
