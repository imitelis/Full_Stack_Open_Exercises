import { useState } from 'react'

const Button = ({handleClicks, choice}) => {
  return (
    <button onClick={handleClicks[choice]}>
    {choice.toLowerCase()}
  </button>
  )
}

const StatisticLine = ({text, value, add}) => {
  return (
    <>
    <tr>
    <td>{text}</td>
    <td>{value} {add}</td>
    </tr>
    </>
  )
}

const Statistics = ({good, neutral, bad}) => {
  
  if (good + neutral + bad === 0) {
    return (
      <>
      <h2>statistics</h2>
      <p>No feedback given</p>
      </>
    )
  }

  const total = good + neutral + bad

  return(
    <>
    <h2>Statistics</h2>    
    <table>
      <thead></thead>
      <tbody>
      <StatisticLine text='good' value={good} add=''/>
      <StatisticLine text='neutral' value={neutral} add=''/>
      <StatisticLine text='bad' value={bad} add=''/>
      <StatisticLine text='all' value={total} add=''/>
      <StatisticLine text='average' value={(good-bad)/(total)} add=''/>
      <StatisticLine text='positive' value={(good * 100)/(total)} add='%'/>
      </tbody>
    </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClicks = {
    Good: () => setGood(good + 1),
    Neutral: () => setNeutral(neutral + 1),
    Bad: () => setBad(bad + 1),
  };

  return (
    <>
      <h1>Unicafe</h1>
      <h2>Give feedback</h2>
      <Button handleClicks={handleClicks} choice='Good'/>
      <Button handleClicks={handleClicks} choice='Neutral'/>
      <Button handleClicks={handleClicks} choice='Bad'/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App
