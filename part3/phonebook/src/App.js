import { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from "./services/persons"
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [searchContact, setSearchContact] = useState("")
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  // Fetch persons data
  useEffect(() => {
    personsService
      .getAll()
      .then(personsData => {
        setPersons(personsData)
      })
      .catch(error => {
        showNotification(`There was an error: ${error}`, setErrorMessage)
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
      const message = `Please enter values for both name and number inputs`
      showNotification(message, setErrorMessage)
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
        showNotification(`Added ${createdContact.name}`, setNotificationMessage)
      })
      .catch(error => {
        const message = error.response.data.error
        showNotification(`${message}`, setErrorMessage)
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
        const message = `Updated ${receivedPerson.name}`
        showNotification(message, setNotificationMessage)
      })
      .catch(error => {
        const defaultMessage = `Information of ${updatedContact.name} has already been removed from server`
        const message = error.response?.data.error ?? defaultMessage
        showNotification(message, setErrorMessage)
        if (error instanceof TypeError) {
          setPersons(persons.filter(person => person.id !== updatedContact.id))
        }

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
        showNotification(`There was an error: ${error}`, setErrorMessage)
      })
  }

  const showNotification = (message, messageSetter, duration = 5000) => {
    // Show error message
    messageSetter(
      message
    )

    // Set message timeout
    setTimeout(() => {
      messageSetter(null)
    }, duration)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} />
      <ErrorNotification message={errorMessage} />
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