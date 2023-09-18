const CountryList = ({ countryList }) => {
  if (countryList.length > 10) {
    return (<p>Too many matches, specify another filter</p>)
  }

  const countryListItems = countryList.map((country) => {
    return <li key={country.cca3}>{country.name.common}</li>
  })

  return (
    <>
      <ul>{countryListItems}</ul>
    </>
  )
}

export default CountryList