// Small overlay on the home window that reflects the visitor's local weather.
// The weather is fetched once by the parent (via useWeather) and passed in, so
// the badge and the window background stay in sync from a single network call.
// It silently hides itself if both APIs fail, so the window never shows a broken
// badge.
export default function HomeWeatherBadge({ t, weather, status }) {
  if (status === 'error') return null

  if (status === 'loading' || !weather) {
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
      <span className="home-weather-icon" aria-hidden="true">
        {weather.icon}
      </span>
      <span className="home-weather-temp">{weather.temperature}°</span>
    </span>
  )
}
