const Persons = (props) => {
  const { filteredPersons } = props

  return (
    <>
      {filteredPersons.map(person =>
        <p key={person.name}>{person.name} {person.number}</p>
      )}
    </>
  )
}

export default Persons