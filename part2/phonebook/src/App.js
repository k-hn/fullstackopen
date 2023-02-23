import { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [searchContact, setSearchContact] = useState("")

  // Fetch persons data
  useEffect(() => {
    personsService
      .getAll()
      .then(personsData => {
        setPersons(personsData)
      })
      .catch(error => {
        alert(`There was an error. Error: ${error}`)
      })
  }, [])

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()

    const currentNameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    // Validate input
    if (!validInputLengths(newName, newNumber)) {
      alert(`Please enter values for both name and number inputs`)
      return
    }

    if (nameExists(persons, newName)) {
      if (window.confirm(`${newName} is already added to phoneboook, replace the old number with a new one?`)) {
        updateName(currentNameObject)
      }
      return
    }

    personsService
      .create(currentNameObject)
      .then(createdContact => {
        setPersons(persons.concat(createdContact))
        clearNewContactInputs()
      })
      .catch(error => {
        alert(`There was an error: ${error}`)
      })
  }

  const updateName = (newPersonObj) => {
    // Update an existing contact's information
    const existingContact = getContact(persons, newPersonObj.name)
    const updatedContact = {
      ...existingContact,
      number: newPersonObj.number
    }

    personsService
      .updatePerson(updatedContact)
      .then((receivedPerson) => {
        setPersons(persons.map(p => p.id === receivedPerson.id ? receivedPerson : p))
        clearNewContactInputs()
      })
      .catch(error => {
        alert(`An error occurred: ${error}`)
      })
  }

  const clearNewContactInputs = () => {
    // Clears the `name` and `number` inputs for adding a new person
    setNewName("")
    setNewNumber("")
  }

  const validInputLengths = (contactName, contactNumber) => {
    // Checks if name and number are provided when adding a new contact
    return contactName.length > 0 && contactNumber.length > 0
  }

  const nameExists = (contactsList, name) => {
    // Checks if the provided name exists in the provided contact list
    const contacts = contactsList.map(contactObj => contactObj.name)
    return contacts.includes(name)
  }

  const getContact = (contacts, name) => {
    // Returns the contact object that matches the provided name 
    return contacts.find((contact) => contact.name === name)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    const searchTerm = event.target.value
    setSearchContact(searchTerm)
  }

  const deleteContact = (contact) => {
    if (!window.confirm(`Delete ${contact.name}?`)) {
      return;
    }
    personsService
      .deletePerson(contact.id)
      .then(response => {
        setPersons(
          persons.filter((person) => person.id !== contact.id)
        )
      })
      .catch(error => {
        alert(`There was an error: ${error}`)
      })
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
      <Persons
        persons={persons}
        searchContact={searchContact}
        handleContactDelete={deleteContact}
      />

    </div>
  )
}

export default App