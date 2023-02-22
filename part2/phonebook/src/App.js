import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [searchContact, setSearchContact] = useState("")

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()

    // Validate input
    if (!validInputLengths(newName, newNumber)) {
      alert(`Please enter values for both name and number inputs`)
      return
    }

    if (nameExists(persons, newName)) {
      alert(`${newName} is already added to the phonebook`)
      return
    }

    const currentNameObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(currentNameObject))
    setNewName("")
    setNewNumber("")

  }

  const validInputLengths = (contactName, contactNumber) => {
    return contactName.length > 0 && contactNumber.length > 0
  }

  const getFormattedContacts = (contacts) => {
    const filteredContacts = getFilteredContacts(contacts, searchContact)
    return filteredContacts.map(contact => {
      return <tr key={contact.name}>
        <td>{contact.name}</td>
        <td>{contact.number}</td>
      </tr>
    })
  }

  const getFilteredContacts = (contacts, searchTerm) => {
    return contacts.filter(
      contact => contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const nameExists = (contactsList, name) => {
    const contacts = contactsList.map(contactObj => contactObj.name)
    return contacts.includes(name)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    const searchTerm = event.target.value
    setSearchContact(searchTerm)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        filter show with <input onChange={handleSearch} />
      </div>




      <h2>add a new</h2>
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