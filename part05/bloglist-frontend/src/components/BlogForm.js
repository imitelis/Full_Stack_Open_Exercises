import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')

  }

  return (
    <div className='blogform'>
      <h2>Create a new Blog</h2>
      <form onSubmit={addBlog}>
          title: <input
          value={newTitle}
          onChange={event => setNewTitle(event.target.value)}
          placeholder='Blog title...'
          id='blog-title'
        /> <br />
          author: <input
          value={newAuthor}
          onChange={event => setNewAuthor(event.target.value)}
          placeholder='Blog author...'
          id='blog-author'
        /> <br />
          url: <input
          value={newUrl}
          onChange={event => setNewUrl(event.target.value)}
          placeholder='Blog url...'
          id='blog-url'
        /> <br />
        <button type='submit' id='create-button'>create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm