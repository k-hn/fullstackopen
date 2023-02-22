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

    if (nameExists(persons, newName)) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      setPersons(persons.concat(currentNameObject))
      setNewName("")
    }
  }

  const getContactNames = (contacts) => {
    return contacts.map(contact => contact.name)
  }

  const getFormattedContacts = (contacts) => {
    const contactNames = getContactNames(contacts)
    return contactNames.map(name => <div key={name}>{name}</div>)
  }

  const nameExists = (contactsList, name) => {
    const contacts = contactsList.map(contactObj => contactObj.name)
    return contacts.includes(name)
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
      {getFormattedContacts(persons)}
    </div>
  )
}

export default App