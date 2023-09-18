import { useEffect, useState } from "react"
import weatherService from "../services/weather"

const WeatherDetail = ({ country }) => {
  const [weather, setWeather] = useState(null)

  const capital = country.capital[0]

  useEffect(() => {
    weatherService
      .getWeather(country)
      .then(weatherData => setWeather(weatherData))
  }, [])


  if (weather) {
    const [{ description, icon }] = weather.weather
    const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`

    return (
      <div>
        <h2>Weather in {capital}</h2>
        <div>temperature {weather.main.temp} Celsius</div>
        <img src={iconURL} alt={description} />
        <div>wind {weather.wind.speed} m/s</div>
      </div>
    )
  }
}

export default WeatherDetail