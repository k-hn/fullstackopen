import WeatherDetail from "./WeatherDetail"

const CountryDetail = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>

      <h2>languages:</h2>
      <ul>
        {Object.keys(country.languages).map(key => <li key={key}>{country.languages[key]}</li>)}
      </ul>

      <div>
        <img height={100} src={country.flags.svg} alt={country.flags.alt} />
      </div>

      <WeatherDetail country={country} />
    </>
  )
}


export default CountryDetail