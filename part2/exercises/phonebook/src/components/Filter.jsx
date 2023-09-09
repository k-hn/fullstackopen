const Filter = (props) => {
  const { searchTerm, handleSearchTermChange } = props
  return (
    <div>
      filter shown with: <input type="text"
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
    </div>
  )
}

export default Filter