import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Feedback = (props) => {
  const incrementGood = () => {
    props.setGood(props.good + 1)
  }

  const incrementNeutral = () => {
    props.setNeutral(props.neutral + 1)
  }

  const incrementBad = () => {
    props.setBad(props.bad + 1)
  }

  return (
    <div>
      <Button handleClick={incrementGood} text="good" />
      <Button handleClick={incrementNeutral} text="neutral" />
      <Button handleClick={incrementBad} text="bad" />
    </div>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = () => {
    return good + neutral + bad
  }

  const average = () => {
    return (good + (0 - bad)) / total()
  }

  const positive = () => {
    return (good / total()) * 100
  }
  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>

      <p>all {total()}</p>
      <p>average {average() || 0}</p>
      <p>positive {positive() || 0} %</p>
    </div>
  )
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Feedback
        good={good}
        neutral={neutral}
        bad={bad}
        setGood={setGood}
        setNeutral={setNeutral}
        setBad={setBad}
      />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />


    </div>



  );
}

export default App;
