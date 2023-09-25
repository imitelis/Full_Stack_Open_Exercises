import { useMutation, useQueryClient } from 'react-query'

import { useDispatchValue } from '../NotificationContext'

import { createAnecdote } from '../requests'

const getId = () => (100000 * Math.random()).toFixed(0)

const AnecdoteForm = () => {

  const newAnecdoteMutation = useMutation(createAnecdote)
  const queryClient = useQueryClient()
  const notificationDispatch = useDispatchValue()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content: content, id: getId(), votes: 0 }, {
      onSuccess: () => {
        queryClient.invalidateQueries('anecdotes')
        notificationDispatch({ type: "GREEN_NOTIFICATION", payload: `new anecdote '${content}' was added`})
        console.log('new anecdote', content)
        setTimeout(() => {
          notificationDispatch({ type: "CLEAR_NOTIFICATION" })
        }, 5000)
      },
      onError: () => {
        notificationDispatch({ type: "RED_NOTIFICATION", payload: `new anecdote is too short '${content}', it must be 5 characters long or more`})
        console.log('too short', content)
        setTimeout(() => {
          notificationDispatch({ type: "CLEAR_NOTIFICATION" })
        }, 5000)
      }
    })
    
}

  return (
    <div>
     <h2>Create a new</h2>
      <form onSubmit={onCreate}>
        <div>content: <input name='anecdote' /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
