import { useEffect, useState } from 'react'
import { fetchWeather } from '../lib/weather'

// Shared visitor-weather fetch. Resolves once on mount and is consumed by both
// the home window background and the weather badge so there is a single network
// call. Returns { weather, status } where status is 'loading' | 'ready' | 'error'.
export default function useWeather() {
  const [weather, setWeather] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let active = true
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
  }, [])

  return { weather, status }
}
