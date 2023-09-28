import {
    Link
  } from 'react-router-dom'

const AnecdoteList = ({ anecdotes, deleteById }) => (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => <li key={anecdote.id}><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content.value ? anecdote.content.value : anecdote.content}</Link>{" "}<button onClick={() => deleteById(anecdote.id)}>delete</button></li>)}
      </ul>
    </div>
  )

export default AnecdoteList;