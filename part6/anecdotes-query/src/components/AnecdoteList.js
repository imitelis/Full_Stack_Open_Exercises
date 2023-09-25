import { useQuery, useQueryClient, useMutation } from 'react-query'

import { useDispatchValue } from '../NotificationContext'

import { getAnecdotes, voteAnecdote } from '../requests'

const AnecdoteList = ({newSearch}) => {

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

  const anecdotes = newSearch === ''
  ? result.data
  : result.data.filter(anecdote => anecdote.content.toLowerCase().includes(newSearch.toLowerCase()))
  

  if ( result.isLoading || anecdotes === undefined ) {
    return (
        <div>
            <h2>Anecdotes list</h2>
            <em>Anecdote service not available due to problems in server...</em>
        </div>
    )
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
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList