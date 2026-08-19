import { useCallback, useEffect, useState } from 'react'
import Head from 'next/head'
import '../styles/base.css'
import '../styles/pixel.css'
import '../styles/pro.css'
import WorldTransition from '../components/WorldTransition'
import CookieConsent from '../components/CookieConsent'
import { getMessage } from '../lib/locales'
import { loadConsent, saveConsent } from '../lib/consent'
import { useLocale } from '../lib/useLocale'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

// Site-wide <head> defaults that don't vary by route. Lives in _app so every
// route (including 404) inherits them. Title/description/canonical/OG/
// theme-color are route-specific (Phase 9) and live in pages/index.jsx and
// pages/pixel.jsx instead. Asset links use basePath manually because Next
// only auto-prefixes _next/* bundles, not the arbitrary hrefs of <link>/<meta>
// tags.
//
// Locale and cookie consent are also owned here rather than by each page.
// `/` and `/pixel` are separate page components that unmount/remount on every
// client-side navigation between them (see useWorld.ts), but this App shell
// does not — so reading the persisted consent decision here, instead of in
// each page, guarantees the banner is evaluated exactly once per visit no
// matter which world the visitor opens first.
export default function App({ Component, pageProps }) {
  const { locale, onLocaleChange } = useLocale()
  const t = (path) => getMessage(locale, path)

  const [consent, setConsent] = useState(null)
  const [isBannerOpen, setBannerOpen] = useState(false)

  useEffect(() => {
    const stored = loadConsent()
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setConsent(stored)
    } else {
      setBannerOpen(true)
    }
  }, [])

  const decideConsent = useCallback((weatherAllowed) => {
    setConsent(saveConsent(weatherAllowed))
    setBannerOpen(false)
  }, [])

  const weatherConsent = consent ? consent.weather : false

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Raffael Castro Rodrigues" />
        <link rel="icon" type="image/svg+xml" href={`${basePath}/favicon.svg`} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Raffael Castro Rodrigues" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="pt_PT" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Component
        {...pageProps}
        locale={locale}
        onLocaleChange={onLocaleChange}
        weatherConsent={weatherConsent}
        onManageCookies={() => setBannerOpen(true)}
      />
      <WorldTransition />

      {isBannerOpen && (
        <CookieConsent
          t={t}
          onAccept={() => decideConsent(true)}
          onReject={() => decideConsent(false)}
          onSave={(weatherAllowed) => decideConsent(weatherAllowed)}
        />
      )}
    </>
  )
}
