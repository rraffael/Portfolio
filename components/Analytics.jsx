import { useEffect } from 'react'
import Script from 'next/script'
import { GA_MEASUREMENT_ID, setAnalyticsDisabled } from '../lib/analytics'

// Google Analytics 4 tag, mounted by _app only while the visitor has granted the
// `analytics` consent category. Rendering nothing means gtag.js is never even
// requested, so a visitor who declines (or has not decided yet) makes no call to
// googletagmanager.com at all.
//
// Route changes between `/` and `/pixel` are client-side; GA4's enhanced
// measurement ("page changes based on browser history events", on by default)
// picks those up, so there is no manual pageview wiring here.
export default function Analytics({ enabled }) {
  useEffect(() => {
    // Covers the revoke-after-load case: the scripts below stay in the document
    // once loaded, so the kill switch is what actually stops the hits.
    setAnalyticsDisabled(!enabled)
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
      </Script>
    </>
  )
}
