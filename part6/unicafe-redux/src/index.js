import React from 'react'
import ReactDOM from 'react-dom/client'
import { legacy_createStore as createStore } from 'redux'

import reducer from './reducer'
import './index.css'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
    console.log(store.getState())
  }

  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
    console.log(store.getState())
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
    console.log(store.getState())
  }

  const reset = () => {
    store.dispatch({
      type: 'ZERO'
    })
    console.log(store.getState())
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
  const average = (good-bad)/(total)
  const positive = (good * 100)/(total)

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
      <StatisticLine text='average' value={average} add=''/>
      <StatisticLine text='positive' value={positive} add='%'/>
      </tbody>
    </table>
    </>
  )
}

  return (
    <div>
      <h1>Unicafe</h1>
      <h2>Give feedback</h2>
      <button onClick={good}>good</button> 
      <button onClick={ok}>ok</button> 
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <Statistics good={store.getState().good} neutral={store.getState().ok} bad={store.getState().bad}/>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
