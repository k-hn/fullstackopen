import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import contactService from "./services/contacts"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  // Fetch data from server
  useEffect(() => {
    contactService
      .getAll()
      .then((contacts) => {
        setPersons(contacts)
      })
  }, [])

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
    // Save to backend
    contactService
      .create(personObject)
      .then((newContact) => {
        setPersons(persons.concat(newContact))
        setNewName("")
        setNewNumber("")
      })


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
      <Filter
        searchTerm={searchTerm}
        handleSearchTermChange={handleSearchTermChange}
      />

      <h1>add a new</h1>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />

    </div>
  )
}

export default App
