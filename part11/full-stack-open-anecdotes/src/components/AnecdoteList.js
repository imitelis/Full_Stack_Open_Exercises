import { connect } from 'react-redux'

import { voteAnecdote, deleteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const anecdotes = props.anecdotes

  const vote = (id) => {
    // console.log('vote', id)
    const votedAnecdote = anecdotes.find(anecdote => anecdote.id === id)
    props.voteAnecdote(id, votedAnecdote)
    props.setNotification(`anecdote '${votedAnecdote.content}' was voted`, 5)
  }

  const remove = (id) => {
    // console.log('delete', id)
    props.deleteAnecdote(id)
    props.setNotification(`anecdote was deleted`, 5)
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
          {' '}
          <button onClick={() => remove(anecdote.id)}>delete</button>
        </div>
      </div>
    )}
    </div>
  )
}

const mapStateToProps = (state) => {
  if ( state.filter === '' ) {
    return {
      anecdotes: [...state.anecdotes]
    }
  } else if ( state.filter !== '' ) {
    const searchString = state.filter.toLowerCase()
    return {
      anecdotes: [...state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(searchString))]
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    voteAnecdote: (id, anecdote) => {
      dispatch(voteAnecdote(id, anecdote))
    },
    deleteAnecdote: (id, anecdote) => {
      dispatch(deleteAnecdote(id, anecdote))
    },
    setNotification: (content, time) => {
      dispatch(setNotification(content, time))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (AnecdoteList)
