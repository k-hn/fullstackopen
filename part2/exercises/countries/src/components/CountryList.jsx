const CountryList = ({ countryList, handleClick }) => {
  if (countryList.length > 10) {
    return (<p>Too many matches, specify another filter</p>)
  }

  const countryListItems = countryList.map((country) => {
    return (
      <li key={country.cca3}>
        {country.name.common}
        <button onClick={() => handleClick(country)}>click me</button>
      </li>)
  })

  return (
    <>
      <ul>{countryListItems}</ul>
    </>
  )
}

export default CountryList