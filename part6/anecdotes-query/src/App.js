import { useQuery, useQueryClient, useMutation } from 'react-query'

import { useDispatchValue } from './NotificationContext'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { getAnecdotes, voteAnecdote } from './requests'

const App = () => {

  const queryClient = useQueryClient()
  const voteAnecdoteMutation = useMutation(voteAnecdote)
  const notificationDispatch = useDispatchValue()

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 }, {
      onSuccess: () => {
        queryClient.invalidateQueries('anecdotes')
      }
    })
    notificationDispatch({ type: "GREEN_NOTIFICATION", payload: `anecdote '${anecdote.content}' was voted`})
    console.log('vote', anecdote.content)
    setTimeout(() => {
      notificationDispatch({ type: "CLEAR_NOTIFICATION" })
    }, 5000)
  }

  const result = useQuery(
    'anecdotes', getAnecdotes,
    {
      retry: 1
    }
  )

  if ( result.isLoading ) {
    return <div><em>Anecdote service not available due to problems in server...</em></div>
  }
  
  const anecdotes = result.data

  return (
    <div>
      <h1>Anecdotes</h1>
      <Notification />
      <AnecdoteForm />      
      <h2>Anecdotes list</h2>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} votes {' '}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
