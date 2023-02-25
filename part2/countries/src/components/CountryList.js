const CountryList = (props) => {
  const { searchResults, handleShowCountry } = props

  const countryList = searchResults.map(
    (result) =>
      <div key={result.name.common}>
        {result.name.common}
        <button onClick={() => handleShowCountry(result)}>show</button>
      </div>
  )

  return (
    <div>
      {countryList}
    </div>
  )
}

export default CountryList