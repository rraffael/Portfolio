import { useEffect, useState } from 'react'

export default function ContactSection({ t }) {
  const [apiResponse, setApiResponse] = useState(null)
  const [apiError, setApiError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function fetchApi() {
      try {
        const response = await fetch('http://localhost:8000')
        const contentType = response.headers.get('content-type') || ''
        const data = contentType.includes('application/json') ? await response.json() : await response.text()

        if (!active) {
          return
        }

        if (!response.ok) {
          throw new Error(`${response.status}`)
        }

        setApiResponse(data)
      } catch (error) {
        if (active) {
          setApiError(error.message)
        }
      } finally {
        if (active) {
          setIsLoading(false)
        }
      }
    }

    fetchApi()

    return () => {
      active = false
    }
  }, [])

  return (
    <div className="section-content">
      <div>
        <h1>{t('contact.title')}</h1>
        <button className="primary-button" type="button">
          {t('contact.button')}
        </button>

        <div className="api-card">
          <h2>{t('contact.apiTitle')}</h2>
          {isLoading ? (
            <p>{t('contact.apiLoading')}</p>
          ) : apiError ? (
            <p className="api-error">{t('contact.apiError')}</p>
          ) : (
            <div>
              <p>{t('contact.apiSuccess')}</p>
              <pre>{apiResponse ? JSON.stringify(apiResponse, null, 2) : t('contact.apiEmpty')}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
