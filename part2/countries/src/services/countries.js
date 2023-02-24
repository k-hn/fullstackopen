import axios from "axios"
const baseURL = "https://restcountries.com/v3.1" // name/{name}

const fetchCountryData = (name) => {
  return axios
    .get(`${baseURL}/name/${name}`)
    .then((response) => {
      return response.data
    })
}

const serviceExports = { fetchCountryData }
export default serviceExports