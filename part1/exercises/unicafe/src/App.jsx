import {useState} from "react"

const Statistics = ({good, bad, neutral}) => {
    const all = good + bad + neutral
    const total_sentiment = (good * 1) + (neutral * 0) + (bad * -1)
    const average = total_sentiment / all
    const positive = (good / all) * 100

    return (
	<>
	    <h1>statistics</h1>
	    <p>good {good}</p>
	    <p>neutral {neutral}</p>
	    <p>bad {bad}</p>
	    <p>all {all}</p>
	    <p>average {average}</p>
	    <p>positive {positive} %</p>
	</>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGood = () => {
	setGood(good + 1)
    }

    const handleNeutral = () => {
	setNeutral(neutral + 1)
    }

    const handleBad = () => {
	setBad(bad + 1)
    }

    return (
	<div>
	    <h1>give feedback</h1>
	    <button onClick={handleGood}>good</button>
	    <button onClick={handleNeutral}>neutral</button>
	    <button onClick={handleBad}>bad</button>

	    <Statistics good={good} bad={bad} neutral={neutral} />
	</div>
    )
}
export default App
