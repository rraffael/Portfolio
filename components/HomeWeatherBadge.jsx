import { useEffect, useState } from 'react'
import { fetchWeather } from '../lib/weather'

// Small overlay on the home avatar that reflects the visitor's local weather.
// It self-fetches on mount and silently hides itself if both APIs fail, so the
// avatar never shows a broken badge.
export default function HomeWeatherBadge({ t }) {
  const [weather, setWeather] = useState(null)
  const [status, setStatus] = useState('loading') // 'loading' | 'ready' | 'error'

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

  if (status === 'error') return null

  if (status === 'loading') {
    return (
      <span className="home-weather home-weather--loading" aria-hidden="true">
        <span className="home-weather-icon">⏳</span>
      </span>
    )
  }

  const conditionLabel = t(`home.weather.${weather.condition}`)
  const title = weather.city
    ? `${conditionLabel} · ${weather.temperature}° · ${weather.city}`
    : `${conditionLabel} · ${weather.temperature}°`

  return (
    <span className="home-weather" title={title}>
      <span className="home-weather-icon" aria-hidden="true">{weather.icon}</span>
      <span className="home-weather-temp">{weather.temperature}°</span>
    </span>
  )
}
