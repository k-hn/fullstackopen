const CountryList = (props) => {
  const { searchResults } = props

  const countryList = searchResults.map((result) => <div>{result.name.common}</div>)

  return (
    <div>
      {countryList}
    </div>
  )
}

export default CountryList