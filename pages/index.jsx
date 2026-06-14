import { useEffect, useState } from 'react'

export default function Home() {
  const [apiData, setApiData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    if (!apiUrl) {
      setError('Missing NEXT_PUBLIC_API_URL in .env.local')
      return
    }

    async function loadData() {
      try {
        const response = await fetch(`${apiUrl}/your-endpoint`)
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }
        const json = await response.json()
        setApiData(json)
      } catch (err) {
        setError(err.message)
      }
    }

    loadData()
  }, [])

  return (
    <div className="page">
      <main className="container">
        <h1>Portfolio Starter</h1>
        <p>Front-end only Next.js site with API connection via environment variables.</p>

        <section>
          <h2>API Result</h2>
          {error ? (
            <pre>{error}</pre>
          ) : apiData ? (
            <pre>{JSON.stringify(apiData, null, 2)}</pre>
          ) : (
            <pre>Loading API data...</pre>
          )}
        </section>

        <section>
          <h2>How to connect</h2>
          <p>
            Add a <code>.env.local</code> file with <code>NEXT_PUBLIC_API_URL</code> set to your
            API base URL, then run <code>npm run dev</code>.
          </p>
        </section>
      </main>
    </div>
  )
}
