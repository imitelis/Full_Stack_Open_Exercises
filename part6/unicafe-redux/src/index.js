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

  return (
    <div>
      <h1>Unicafe</h1>
      <h2>Give feedback</h2>
      <button onClick={good}>good</button> 
      <button onClick={ok}>ok</button> 
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <h2>Statistics</h2>   
    <table>
      <thead></thead>
      <tbody>
      <StatisticLine text='good' value={store.getState().good} add=''/>
      <StatisticLine text='ok' value={store.getState().ok} add=''/>
      <StatisticLine text='bad' value={store.getState().bad} add=''/>
      </tbody>
    </table>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
