import PersonRow from "./PersonRow"

const Persons = (props) => {
  const { persons, searchContact, handleContactDelete } = props

  const getFormattedContacts = (contacts) => {
    const filteredContacts = getFilteredContacts(contacts, searchContact)
    return filteredContacts.map(contact =>

      <PersonRow key={contact.id} contact={contact} handleContactDelete={() => handleContactDelete(contact)} />


    )
  }

  const getFilteredContacts = (contacts, searchTerm) => {
    return contacts.filter(
      contact => contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  return (
    <table>
      <tbody>
        {getFormattedContacts(persons)}
      </tbody>
    </table>
  )
}



export default Persons