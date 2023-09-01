// Hello component
const Hello = (props) => {
  const name = props.name ?? "Stranger";
  const age = props.age ?? "unknown";
  return (
    <div>
      <p>Hello {name}, you are {age} years old</p>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      greeting app created by mluukai
    </div>
  )
}

const App = () => {
  const name = "Peter"
  const age = 10
  const friends = [
    { name: "Peter", age: 4 },
    { name: "Maya", age: 10 }
  ];
  const friends2 = ["Peter", "Maya"];

  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
      <Hello />
      <Footer />
      <p>{friends[0].name} {friends[0].age}</p>
      <p>{friends}</p>
    </>
  )
}

export default App
