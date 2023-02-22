import { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [searchContact, setSearchContact] = useState("")

  // Fetch persons data
  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        setPersons(response.data)
      })
  }, [])

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
      number: newNumber,
      id: persons.length + 1
    }
    setPersons(persons.concat(currentNameObject))
    setNewName("")
    setNewNumber("")

  }

  const validInputLengths = (contactName, contactNumber) => {
    return contactName.length > 0 && contactNumber.length > 0
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
      <Filter handleSearch={handleSearch} />


      <h2>Add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />


      <h2>Numbers</h2>
      <Persons persons={persons} searchContact={searchContact} />

    </div>
  )
}

export default App