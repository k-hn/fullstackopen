const PersonRow = (props) => {
  const { contact } = props

  return (
    <tr>
      <td>{contact.name}</td>
      <td>{contact.number}</td>
    </tr>
  )
}

export default PersonRow