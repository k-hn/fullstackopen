import weatherService from "../services/weather"
import { useState, useEffect } from "react"

const Weather = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    weatherService
      .fetchWeatherInfo(country)
      .then(result => setWeather(result))
  }, [country])

  if (weather === null) {
    return null
  }

  const weatherIconURL = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

  return (
    <div>
      <h1>Weather</h1>
      <div>temperature: {weatherService.convertFromKelvinToCelsius(weather.main.temp)} Celsius</div>
      <div>
        <img src={weatherIconURL} alt={`${weather.weather.description}`} />
      </div>
      <div>wind {weather.wind.speed} m/s</div>
    </div>
  )
}

export default Weather

