import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: "39-44-5323523" }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const currentNameObject = {
      name: newName,
      number: newNumber
    }

    if (nameExists(persons, newName)) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      setPersons(persons.concat(currentNameObject))
      setNewName("")
      setNewNumber("")
    }
  }

  const getFormattedContacts = (contacts) => {
    return contacts.map(contact => {
      return <tr key={contact.name}>
        <td>{contact.name}</td>
        <td>{contact.number}</td>
      </tr>
    })
  }

  const nameExists = (contactsList, name) => {
    const contacts = contactsList.map(contactObj => contactObj.name)
    return contacts.includes(name)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>

        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>

      </form>
      <h2>Numbers</h2>
      <table>
        <tbody>
          {getFormattedContacts(persons)}
        </tbody>
      </table>

    </div>
  )
}

export default App