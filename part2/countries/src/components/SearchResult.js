import CountryDetail from "./CountryDetail"
import CountryList from "./CountryList"

const SearchResult = (props) => {
  const { searchResults } = props

  if (searchResults === null || searchResults.length === 0) {
    return null
  }

  let resultDisplay
  if (searchResults.length === 1) {
    resultDisplay = <CountryDetail searchResults={searchResults} />
  } else if (searchResults.length > 1 && searchResults.length <= 10) {
    resultDisplay = <CountryList searchResults={searchResults} />
  } else {
    resultDisplay = "Too many matches, specify another filter"
  }

  return (
    <div>
      {resultDisplay}
    </div>
  )
}

export default SearchResult