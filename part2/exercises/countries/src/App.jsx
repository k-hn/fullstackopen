import { useState, useEffect } from 'react'
import countryService from "./services/country"
import CountryDetail from './components/CountryDetail'
import CountryList from './components/CountryList'


const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    countryService
      .getAllCountries()
      .then((countries) => setCountries(countries))
  }, [])

  const onSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const countryList = countries
    .filter(country => {
      return country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    })

  const showCountryView = (countryList) => {
    const isSingleResult = countryList.length === 1
    let result;
    if (isSingleResult) {
      result = <CountryDetail country={countryList[0]} />
    } else {
      result = <CountryList countryList={countryList} />
    }
    return result
  }

  return (
    <div>
      <div>
        find countries:
        <input type="text" onChange={onSearch} placeholder='Enter your search term here..' />
      </div>

      {/* Country list */}
      <div>
        {showCountryView(countryList)}
      </div>
    </div>
  )
}

export default App
