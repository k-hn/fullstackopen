import { useState, useEffect } from 'react'
import countryService from "./services/country"
import CountryDetail from './components/CountryDetail'
import CountryList from './components/CountryList'


const App = () => {
  const [countries, setCountries] = useState([])
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    countryService
      .getAllCountries()
      .then((countries) => setCountries(countries))
  }, [])

  const onSearch = (event) => {
    const searchTerm = event.target.value
    setSearchResults(countries
      .filter(country => {
        return country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      }))
  }

  const handleShowClick = (country) => {
    setSearchResults([country])
  }

  const showCountryView = () => {
    const isSingleResult = searchResults.length === 1
    let result;
    if (isSingleResult) {
      result = <CountryDetail country={searchResults[0]} />
    } else {
      result = <CountryList countryList={searchResults} handleClick={handleShowClick} />
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
        {showCountryView(searchResults)}
      </div>
    </div>
  )
}

export default App
