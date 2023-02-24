const SearchCountry = (props) => {
  const { country, handleSearchTerm } = props

  return (
    <div>
      find countries
      <input value={country} onChange={handleSearchTerm} />
    </div>
  )
}

export default SearchCountry