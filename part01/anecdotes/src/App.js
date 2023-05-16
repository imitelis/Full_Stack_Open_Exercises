import { useState } from 'react'

const FavAnecdote = ({anecdotes, mostIndex, votes, total}) => {
  if (total == 0) {
    return (
      <div>
      <h2>Anecdote with most votes</h2>
      <p>None yet!</p>
      </div>
    )
  }
  else {
    return (
      <div>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[mostIndex]}</p>
      <p>with {votes[mostIndex]} votes</p>
      </div>
    )
  }
}


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

  let initialVotes = [0, 0, 0, 0, 0, 0, 0, 0]
   
  const [selected, setSelected] = useState(0)

  const [votes, setCounters] = useState(initialVotes)

  const handleNext = () => {
    let newselected = (selected + Math.floor(Math.random() * anecdotes.length)) % anecdotes.length
    setSelected(newselected)
  }
  
  const handleVote = (index) => {
    const nextCounters = votes.map((c, i) => {
      if (i === index) {
        return c + 1
      } else {
        return c
      }
    });
    setCounters(nextCounters)
  }

  const mostVoted = (votes) => {
    let arr = Object.values(votes)
    let indexMax = arr.indexOf(Math.max(...arr))
    return indexMax
  }

  const AllVotes = (votes) => {
    let arr = Object.values(votes);
    let totalvotes = arr.reduce((sum, a) => sum + a, 0);
    return totalvotes
  }
  
  return (
    <div>
      <h1>Anecdotes</h1>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={handleNext}>next anecdote</button>
      <button onClick={() => handleVote(selected)}>vote</button>
      <FavAnecdote anecdotes={anecdotes} mostIndex={mostVoted(votes)} votes={votes} total={AllVotes(votes)}/>
    </div>
  )
}

export default App
