import { useSelector, useDispatch } from 'react-redux'

import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const dispatch = useDispatch()

  const anecdotes = useSelector(state => {
    if ( state.filter === '' ) {
      return [...state.anecdotes]
    } else if ( state.filter !== '' ) {
      const searchString = state.filter.toLowerCase()
      return [...state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(searchString))]
    }
  })

  const vote = (id) => {
    console.log('vote', id)
    const votedAnecdote = anecdotes.find(anecdote => anecdote.id === id)
    dispatch(voteAnecdote(id, votedAnecdote))
    dispatch(setNotification(`anecdote '${votedAnecdote.content}' was voted`, 5))
  }

  return (
    <div>
      <h2>Anecdotes list</h2>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes} votes {' '}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )}
    </div>
  )
}

export default AnecdoteList