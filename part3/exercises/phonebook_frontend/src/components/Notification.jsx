const Notification = ({ isSuccess, name }) => {
  const message = isSuccess
    ? `Added ${name}`
    : `Information of ${name} has already been removed from server`

  const result = isSuccess
    ? <SuccessNotification message={message} />
    : <ErrorNotification message={message} />

  return result
}

const SuccessNotification = ({ message }) => {
  const successStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  }

  return (
    <div style={successStyle}>{message}</div>
  )
}

const ErrorNotification = ({ message }) => {
  const errorStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  }

  return (
    <div style={errorStyle}>{message}</div>
  )
}

export default Notification