import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const currentNameObject = {
      name: newName
    }
    setPersons(persons.concat(currentNameObject))
    setNewName("")
  }

  const getContactNames = () => {
    return persons.map(person => person.name)
  }

  const getFormattedContacts = () => {
    const contactNames = getContactNames()
    return contactNames.map(name => <div key={name}>{name}</div>)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {getFormattedContacts()}
    </div>
  )
}

export default App