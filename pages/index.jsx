import { useState } from 'react'
import PortfolioPage from '../components/PortfolioPage'

export default function Home() {
  const [locale, setLocale] = useState('en')

  return <PortfolioPage locale={locale} onLocaleChange={setLocale} />
}
