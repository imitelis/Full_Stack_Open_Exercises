import { connect } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    // console.log('addAnecdote', content)
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.setNotification(`anecdote '${content}' was added`, 5)
  }

  return (
    <div>
      <h2>Create a new</h2>
      <form onSubmit={addAnecdote}>
        <div>content: <input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )   
}

const mapDispatchToProps = dispatch => {
  return {
    createAnecdote: content => {
      dispatch(createAnecdote(content))
    },
    setNotification: (content, time) => {
      dispatch(setNotification(content, time))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps)
  (AnecdoteForm)
