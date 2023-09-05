import {useState} from "react"

const StatisticLine = ({text, value}) => {
    return (
	<tr>
	    <td>{text}</td>
	    <td>{value}</td>
	</tr>
    )
}

const Statistics = ({good, bad, neutral}) => {
    const all = good + bad + neutral
    const total_sentiment = (good * 1) + (neutral * 0) + (bad * -1)
    const average = total_sentiment / all
    const positive =`${(good / all) * 100} %`

    const noFeedback = good === 0 && neutral === 0 && bad === 0
    if (noFeedback) {
        return (
            <p>No feedback</p>
        )
    }
    
    return (
	<>
	    <h1>statistics</h1>
	    <table>
		<tbody>
		    <StatisticLine text="good" value={good}/>
		    <StatisticLine text="neutral" value={neutral} />
		    <StatisticLine text="bad" value={bad} />
		    <StatisticLine text="all" value={all} />
		    <StatisticLine text="average" value={average} />
		    <StatisticLine text="positive" value={positive} />
		</tbody>
	    </table>
	</>
    )
}

const Button = ({text, handleClick}) => {
    return (
	<button onClick={handleClick}>
	    {text}
	</button>
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
	    <Button handleClick={handleGood} text="good"/>
	    <Button handleClick={handleNeutral} text="neutral"/>
	    <Button handleClick={handleBad} text="bad"/>

	    <Statistics good={good} bad={bad} neutral={neutral} />
	</div>
    )
}
export default App
