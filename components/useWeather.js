import { useEffect, useState } from 'react'
import { fetchWeather } from '../lib/weather'

// Shared visitor-weather fetch. Resolves once on mount and is consumed by both
// the home window background and the weather badge so there is a single network
// call. Returns { weather, status } where status is
// 'idle' | 'loading' | 'ready' | 'error'.
//
// `enabled` gates the third-party API calls behind the visitor's cookie
// consent: while it is false no request is made and the status stays 'idle'.
// Once consent is granted it flips to true and the fetch runs.
export default function useWeather(enabled = true) {
  const [weather, setWeather] = useState(null)
  const [status, setStatus] = useState(enabled ? 'loading' : 'idle')

  useEffect(() => {
    if (!enabled) {
      // Reset to idle when consent is withdrawn / not yet given.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStatus('idle')
      return undefined
    }
    let active = true
    setStatus('loading')
    fetchWeather()
      .then((data) => {
        if (!active) return
        setWeather(data)
        setStatus('ready')
      })
      .catch(() => {
        if (active) setStatus('error')
      })
    return () => {
      active = false
    }
  }, [enabled])

  return { weather, status }
}
