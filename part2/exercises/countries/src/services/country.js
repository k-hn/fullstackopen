import axios from "axios"

const getAllCountries = () => {
  return axios
    .get("https://studies.cs.helsinki.fi/restcountries/api/all")
    .then((response) => response.data)
}

export default { getAllCountries }