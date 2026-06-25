import Head from 'next/head'
import '../styles/globals.css'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
const siteUrl = 'https://rraffael.github.io/Portfolio/'
const title = 'Raffael Castro Rodrigues — Software Engineer'
const description =
  'Portfolio of Raffael Castro Rodrigues, a software engineer who builds reliable software across the full life-cycle — from architecture to pixel-perfect interfaces.'
const ogImage = `${siteUrl}avatar.svg`

// Site-wide <head> defaults. Lives in _app so every route (including 404)
// inherits the title, description, social cards and favicon. Asset links use
// basePath manually because Next only auto-prefixes _next/* bundles, not the
// arbitrary hrefs of <link>/<meta> tags.
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="author" content="Raffael Castro Rodrigues" />
        <meta name="theme-color" content="#11131f" />
        <link rel="canonical" href={siteUrl} />
        <link rel="icon" type="image/svg+xml" href={`${basePath}/favicon.svg`} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Raffael Castro Rodrigues" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="pt_PT" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
