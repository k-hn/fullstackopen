import { useState } from "react"

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState({})

  const getRandomNumber = (max) => {
    return Math.floor(Math.random() * max)
  }

  const nextAnecdote = () => {
    let randomNumber = getRandomNumber(anecdotes.length)
    setSelected(randomNumber)
  }

  const castVote = (anecdoteIndex) => {
    let voteCopy = { ...vote }

    if (anecdoteIndex in voteCopy) {
      voteCopy[anecdoteIndex] += 1
    } else {
      voteCopy[anecdoteIndex] = 1
    }

    setVote(voteCopy)
  }

  const getKeyByValue = (obj, value) => {
    return Object.keys(obj).find(key => obj[key] === value)
  }

  const mostVotedAnecdote = () => {
    let votesCopy = { ...vote }
    let topVote = Math.max(...Object.values(votesCopy))
    let topVoteIndex = getKeyByValue(votesCopy, topVote)
    return anecdotes[topVoteIndex]
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <Button handleClick={() => castVote(selected)} text="vote" />
      <Button handleClick={nextAnecdote} text="next anecdote" />

      <h1>Anecdote with most votes</h1>
      <div>{mostVotedAnecdote()}</div>
    </div>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

export default App;
