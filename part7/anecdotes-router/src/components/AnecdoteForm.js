import {
    useNavigate
  } from 'react-router-dom'

import { useField } from '../hooks/index.js'

const AnecdoteForm = (props) => {
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

export default AnecdoteForm;