import { useEffect, useState } from 'react'
import PortfolioPage from '../components/PortfolioPage'
import { DEFAULT_LOCALE, isSupportedLocale, resolvePreferredLocale } from '../lib/locales'

const STORAGE_KEY = 'portfolio-locale'

// Resolve the visitor's locale from the persisted choice, then the browser's
// preferred languages. Runs only on the client (reads localStorage/navigator).
function readClientLocale() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored && isSupportedLocale(stored)) return stored
  } catch {
    // localStorage may be unavailable (private mode); fall through to navigator.
  }
  const languages = window.navigator.languages || [window.navigator.language]
  return resolvePreferredLocale(languages)
}

export default function Home() {
  // Start from the static-export default so the server-rendered HTML and the
  // first client render match. The stored choice (or the browser's preferred
  // language) is applied after mount to avoid a hydration mismatch.
  const [locale, setLocale] = useState(DEFAULT_LOCALE)

  useEffect(() => {
    const preferred = readClientLocale()
    if (preferred !== DEFAULT_LOCALE) {
      // One-time sync from an external system (localStorage / navigator) after
      // hydration; the static HTML always renders DEFAULT_LOCALE first.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocale(preferred)
    }
  }, [])

  const handleLocaleChange = (code) => {
    setLocale(code)
    try {
      window.localStorage.setItem(STORAGE_KEY, code)
    } catch {
      // Ignore storage failures so the language switch still works in-session.
    }
  }

  return <PortfolioPage locale={locale} onLocaleChange={handleLocaleChange} />
}
