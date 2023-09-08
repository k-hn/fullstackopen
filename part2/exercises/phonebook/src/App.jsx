import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState("")

  const addName = (event) => {
    event.preventDefault()
    // Prevent addition of empty strings
    if (newName === "") {
      return
    }

    if (isDuplicate(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personsObject = {
      ...persons,
      name: newName
    }
    setPersons(persons.concat(personsObject))
    setNewName("")
  }

  const isDuplicate = (name) => {
    const personObject = { name }
    const result = persons.some(person => person.name === name)
    return result
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <li key={person.name}>{person.name}</li>)}
      </ul>
    </div>
  )
}

export default App
