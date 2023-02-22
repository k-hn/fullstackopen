const Filter = (props) => {
  const { handleSearch } = props
  return (
    <div>
      filter show with <input onChange={handleSearch} />
    </div>
  )
}

export default Filter