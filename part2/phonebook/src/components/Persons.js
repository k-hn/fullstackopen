import PersonRow from "./PersonRow"

const Persons = (props) => {
  const { persons, searchContact } = props

  const getFormattedContacts = (contacts) => {
    const filteredContacts = getFilteredContacts(contacts, searchContact)
    return filteredContacts.map(contact => <PersonRow key={contact.id} contact={contact} />
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