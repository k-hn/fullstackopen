import { useState } from "react";

const Display = ({ counter }) => {
  return (
    <div>{counter}</div>
  )
}

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const App = (props) => {
  const [counter, setCounter] = useState(0);
  console.log("rendering with couter values");;

  const increaseByOne = () => {
    console.log("increasing, value before", counter);
    setCounter(counter + 1);
  }

  const decreaseByOne = () => {
    console.log("decreasing, value before", counter);
    setCounter(counter - 1);
  }

  const setToZero = () => {
    console.log("resetting to zero, value before", counter);
    setCounter(0);
  }

  return (
    <div>
      <Display counter={counter} />
      <Button handleClick={increaseByOne} text="plus" />
      <Button handleClick={setToZero} text="zero" />
      <Button handleClick={decreaseByOne} text="minus" />
    </div>
  )
}

export default App;