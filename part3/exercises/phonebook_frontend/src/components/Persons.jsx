const Persons = (props) => {
  const { filteredPersons, handlePersonDelete } = props

  return (
    <>
      {filteredPersons.map(person =>
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handlePersonDelete(person)}>delete</button>
        </p>
      )}
    </>
  )
}

export default Persons