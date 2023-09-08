import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const addName = (event) => {
    event.preventDefault()
    // Prevent addition of empty strings
    if (newName === "") {
      return
    }

    // Prevent addition of duplicates to phonebook
    if (isDuplicate(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject))
    setNewName("")
    setNewNumber("")
  }

  const isDuplicate = (name) => {
    const result = persons.some(person => person.name === name)
    return result
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase())
  }

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm)
  )


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input type="text" value={searchTerm} onChange={handleSearchTermChange} />
      </div>

      <h1>add a new</h1>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map(person =>
        <p key={person.name}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

export default App
