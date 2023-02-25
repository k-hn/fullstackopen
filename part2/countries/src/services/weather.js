import axios from "axios";
const api_key = process.env.REACT_APP_API_KEY
const baseURL = `https://api.openweathermap.org/data/2.5/weather?appid=${api_key}`

const fetchWeatherInfo = (countryObj) => {
  const [lat, lng] = countryObj.latlng
  const url = `${baseURL}&lat=${lat}&lon=${lng}`
  return axios
    .get(url)
    .then(response => response.data)
}

const convertFromKelvinToCelsius = (kelvin) => {
  return Math.round((kelvin - 273.15) * 100) / 100
}

const weatherService = { fetchWeatherInfo, convertFromKelvinToCelsius }
export default weatherService