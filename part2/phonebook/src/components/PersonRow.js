const PersonRow = (props) => {
  const { contact, handleContactDelete } = props

  return (
    <tr>
      <td>{contact.name}</td>
      <td>{contact.number}</td>
      <td><button onClick={handleContactDelete}>delete</button></td>
    </tr>
  )
}

export default PersonRow