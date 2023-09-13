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
      .getAllContacts()
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

    const personObject = {
      name: newName,
      number: newNumber
    }

    // Prevent addition of duplicates to phonebook
    let existingContact = null
    if (existingContact = isDuplicate(newName)) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        updateContactDetails(personObject, existingContact)
      }
      return
    }

    // Save to backend
    contactService
      .createContact(personObject)
      .then((newContact) => {
        setPersons(persons.concat(newContact))
        clearPersonFormInputs()
      })
  }

  const clearPersonFormInputs = () => {
    setNewName("")
    setNewNumber("")
  }

  const updateContactDetails = (personObject, existingContact) => {
    contactService
      .updateContact(personObject, existingContact.id)
      .then((updatedPerson) => {
        // update contact list
        setPersons(persons
          .filter(p => p.name !== personObject.name)
          .concat(updatedPerson))
        // const personsCopy = persons
        // const personIndex = personsCopy.indexOf(existingContact)
        // setPersons(personsCopy.toSpliced(personIndex, 1, updatedPerson))
        clearPersonFormInputs()
      })
  }

  const isDuplicate = (name) => {
    const result = persons.find(person => person.name === name)
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

  const handlePersonDelete = (contact) => {
    if (confirm(`Delete ${contact.name}`)) {
      contactService
        .deleteContact(contact.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== contact.id))
        })
    }
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
      <Persons
        filteredPersons={filteredPersons}
        handlePersonDelete={handlePersonDelete} />

    </div>
  )
}

export default App
