import { useState } from 'react'

import Notification from './components/Notification'
import Filter from './components/Filter'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  const [newSearch, setNewSearch] = useState('');  

  return (
    <div>
      <h1>Anecdotes</h1>
      <Notification />
      <Filter setNewSearch={setNewSearch}/>
      <AnecdoteForm />
      <AnecdoteList newSearch={newSearch} />
    </div>
  )
}

export default App
