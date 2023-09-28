import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router
} from 'react-router-dom'

import Notification from './components/Notification'
import Menu from './components/Menu'
import Footer from './components/Footer'

import axios from 'axios'

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios.get(baseUrl)
    .then(response => {
      setResources(response.data)
    })
    .catch(err => {
      setResources([])
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resources, setResources])
  // console.log(resources)

  const create = (resource) => {
    const request = axios.post(baseUrl, resource)
    return request.then((response) => {
      return response.data
    })
  }

  const update = (resource, id) => {
    const request = axios.put(`${baseUrl}/${id}`, resource)
    return request.then((response) => {
      return response.data
    })
  }

  const destroy = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then((response) => {
      return response.data
    })
  }

  const service = {
    create,
    update,
    destroy
  }

  return [
    resources, service
  ]
}

const App = () => {
  const [anecdotes, anecdotesService] = useResource('http://localhost:3003/anecdotes')

  /*
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])
  */

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    anecdotesService.create({ content: anecdote.content.value, author: anecdote.author.value, info: anecdote.info.value, votes: anecdote.votes, id: anecdote.id })
    // setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`anecdote '${anecdote.content.value}' was added`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const voteById = (id) => {
    const anecdote = anecdoteById(id)

    const votedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    // console.log(anecdote)
    anecdotesService.update(votedAnecdote, id)
  }

  /*
  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }
  */
  
  const deleteById = (id) => {
    if (window.confirm(`Remove this anecdote?`)) {
      anecdotesService.destroy(id)
      // Perform any necessary actions after deletion
    }
  };

  return (
    <div>
      <Router>
        <h1>Software anecdotes</h1>
        <Notification notification={notification}/>
        <Menu anecdotes={anecdotes} addNew={addNew} voteById={voteById} deleteById={deleteById}/>
        <Footer/>
      </Router>
    </div>
  )
}

export default App
