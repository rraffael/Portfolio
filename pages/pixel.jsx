import Head from 'next/head'
import PortfolioPage from '../components/PortfolioPage'
import { useLocale } from '../lib/useLocale'
import { useWorld } from '../lib/useWorld'

const siteUrl = 'https://rraffael.github.io/Portfolio/pixel/'
const title = 'Raffael Castro Rodrigues — Pixel Portfolio'
const description =
  "The retro pixel-art edition of Raffael Castro Rodrigues' portfolio — a Lead Software Engineer's projects, skills and experience, presented as a nostalgic 8-bit world."
// Doesn't exist yet — add public/og-image.png (1200×630) to light this up;
// social crawlers need a raster image (PNG/JPG), not the SVG avatar.
const ogImage = 'https://rraffael.github.io/Portfolio/og-image.png'

export default function Pixel() {
  useWorld('pixel')
  const { locale, onLocaleChange } = useLocale()

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="theme-color" content="#11131f" />
        <link rel="canonical" href={siteUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Head>
      <PortfolioPage locale={locale} onLocaleChange={onLocaleChange} />
    </>
  )
}
