import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useMatch, useNavigate, useParams
} from 'react-router-dom'

import axios from 'axios'

import { useField } from './hooks/index.js'

const Menu = ({anecdotes, addNew, voteById, deleteById}) => {
  
  const padding = {
    paddingRight: 5
  }

    const match = useMatch('/anecdotes/:id')
    const anecdote = match
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null
  
  return (
      <div>
        <Link style={padding} to='/anecdotes'>anecdotes</Link>
        <Link style={padding} to='/createnew'>create new</Link>
        <Link style={padding} to='/about'>about</Link>
        <Routes>
          <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} voteById={voteById}/>} />
          <Route path="/anecdotes" element={<AnecdoteList anecdotes={anecdotes} deleteById={deleteById}/>} />
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes}/>} />
          <Route path="/createnew" element={<CreateNew addNew={addNew} />} />
          <Route path="/about" element={<About/>} />
        </Routes>
      </div>
  )
}

const Anecdote = ({ anecdote, voteById }) => {

  const { id } = useParams();

  const handleVote = () => {
    voteById(id);
  };

  return(
    <div>
      <h2>{anecdote?.content ?? " "} by <em>{anecdote?.author ?? " "}</em></h2>
      <p>for more info see: <a href={anecdote?.info ?? " "}>{anecdote?.info ?? " "}</a></p>
      <p>has {anecdote?.votes ?? 0} votes</p>
      <button onClick={handleVote}>vote</button>
    </div>
  )
}

const AnecdoteList = ({ anecdotes, deleteById }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id}><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content.value ? anecdote.content.value : anecdote.content}</Link>{" "}<button onClick={() => deleteById(anecdote.id)}>delete</button></li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
    
    navigate('/anecdotes')
  }

  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
          content:
          <input {...content} required={true} reset={undefined}/>
          <br/> 
          author:
          <input {...author} required={true} reset={undefined}/>
          <br/> 
          url for more info:
          <input {...info} required={true} reset={undefined}/>
          <br/> 
        <button>create</button>
        <button type="button" onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}

const Notification = ({notification}) => {
  const style = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  if (notification === '') {
    return (
      <div>
      </div>
    )
  } else {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
}

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
    anecdotes.find(a => a.id == id)

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
