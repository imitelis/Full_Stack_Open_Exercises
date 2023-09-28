import {
    Routes, Route, Link, useMatch
  } from 'react-router-dom'

import AnecdoteView from './AnecdoteView'
import AnecdoteList from './AnecdoteList'
import AnecdoteForm from './AnecdoteForm'
import About from './About'

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
            <Route path="/anecdotes/:id" element={<AnecdoteView anecdote={anecdote} voteById={voteById}/>} />
            <Route path="/anecdotes" element={<AnecdoteList anecdotes={anecdotes} deleteById={deleteById}/>} />
            <Route path="/" element={<AnecdoteList anecdotes={anecdotes}/>} />
            <Route path="/createnew" element={<AnecdoteForm addNew={addNew} />} />
            <Route path="/about" element={<About/>} />
          </Routes>
        </div>
    )
  }

export default Menu;