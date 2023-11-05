const LoginForm = (props) => {
  return (
    <>
      <form onSubmit={props.handleLogin}>
        <div>
          username
          <input type="text" value={props.username} onChange={props.handleUsernameChange} />
        </div>

        <div>
          password
          <input type="password" value={props.password} onChange={props.handlePasswordChange} />
        </div>

        <button type="submit">login</button>
      </form>
    </>
  )
}

export default LoginForm
