import SearchCountry from "./components/SearchCountry";
import { useState, useEffect } from "react";
import SearchResult from "./components/SearchResult";
import countriesService from "./services/countries"

const App = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [country, setCountry] = useState("")
  const [searchResults, setSearchResults] = useState(null)

  useEffect(() => {

    if (country !== "") {
      countriesService
        .fetchCountryData(country)
        .then(response => setSearchResults(response))
        .catch(error => alert("Fetching data failed"))
    } else {
      // Do not display any results when no search results are received
      setSearchResults(null)
    }
  }, [country])

  const handleSearchTerm = (event) => {
    setCountry(event.target.value)
  }

  return (
    <div>
      <SearchCountry
        country={country}
        setSearchTerm={setSearchTerm}
        handleSearchTerm={handleSearchTerm}
      />
      <SearchResult searchResults={searchResults} />
    </div>
  )
}

export default App;
