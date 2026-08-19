import Head from 'next/head'
import ProfessionalPage from '../components/ProfessionalPage'
import { useWorld } from '../lib/useWorld'

const siteUrl = 'https://rraffael.github.io/Portfolio/'
const title = 'Raffael Castro Rodrigues — Software Engineer'
const description =
  'Portfolio of Raffael Castro Rodrigues, a Lead Software Engineer who builds reliable software across the full life-cycle — from architecture to delivery.'
// Doesn't exist yet — add public/og-image.png (1200×630) to light this up;
// social crawlers need a raster image (PNG/JPG), not the SVG avatar.
const ogImage = `${siteUrl}og-image.png`

export default function Home({ locale, onLocaleChange, onManageCookies }) {
  useWorld('pro')

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="theme-color" content="#ffffff" />
        <link rel="canonical" href={siteUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Head>
      <ProfessionalPage
        locale={locale}
        onLocaleChange={onLocaleChange}
        onManageCookies={onManageCookies}
      />
    </>
  )
}
