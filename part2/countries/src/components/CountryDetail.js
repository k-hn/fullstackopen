import Weather from "./Weather"

const CountryDetail = ({ searchResults }) => {
  if (searchResults.length === 0) {
    return null
  }

  const country = searchResults[0]

  return (
    <>
      <div>
        <h1>{country.name.common}</h1>

        <div>capital {country.capital[0]}</div>
        <div>area {country.area}</div>

        <h2>languages:</h2>
        <ul>
          {
            Object.keys(country.languages).map((key) =>
              <li key={key}>
                {country.languages[key]}
              </li>
            )
          }
        </ul>

        <img className="flag" src={country.flags.svg} alt={country.flags.alt} />
      </div>
      <Weather country={country} />
    </>
  )
}

export default CountryDetail