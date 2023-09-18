import axios from "axios"

const getWeather = (country) => {
  const APIKey = import.meta.env.VITE_API_KEY
  const [lat, lon] = country.latlng
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`

  return axios
    .get(url)
    .then((response) => response.data)
}

export default { getWeather }