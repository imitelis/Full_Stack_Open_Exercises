import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog component', () => {

  const blog = {
    title: 'my blog',
    author: 'adming',
    url: 'admin.net',
    likes: 0,
    user: { username: 'adming', name: 'Ad Min' }
  }

  const user = {
    username: 'wrong-adming'
  }

  test('blog renders the blog\'s title and author, but does not render its URL or number of likes', () => {

    const { container } = render(<Blog blog={blog} user={user}/>)

    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent('my blog')
    expect(div).toHaveTextContent('adming')
    expect(div).not.toHaveTextContent('url:')
    expect(div).not.toHaveTextContent('admin.net')
    expect(div).not.toHaveTextContent('likes:')
    expect(div.textContent).not.toMatch(/\d+/)

  })

  test('the blog\'s URL and number of likes are shown when the button controlling the shown details has been clicked', async () => {

    const { container } = render(<Blog blog={blog} user={user}/>)

    const userSession = userEvent.setup()
    const button = screen.getByText('show')
    await userSession.click(button)

    const div = container.querySelector('.blog')

    expect(div).not.toHaveTextContent('show')

    expect(div).toHaveTextContent('my blog')
    expect(div).toHaveTextContent('adming')
    expect(div).toHaveTextContent('url:')
    expect(div).toHaveTextContent('admin.net')
    expect(div).toHaveTextContent('likes:')
    expect(div).toHaveTextContent('0')

  })

  test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {

    const mockLikesHandler = jest.fn()

    const { container } = render(<Blog blog={blog} user={user} likeBlog={mockLikesHandler} />)

    const userSession = userEvent.setup()
    const showButton = screen.getByText('show')
    await userSession.click(showButton)

    const likeButton = screen.getByText('like')
    await userSession.click(likeButton)
    setTimeout(async () => {
      await userSession.click(likeButton)
      setTimeout(() => {
        expect(mockLikesHandler.mock.calls).toHaveLength(2)
        const div = container.querySelector('.blog')
        expect(div).not.toHaveTextContent('show')
        expect(div).toHaveTextContent('my blog')
        expect(div).toHaveTextContent('adming')
        expect(div).toHaveTextContent('url:')
        expect(div).toHaveTextContent('admin.net')
        expect(div).toHaveTextContent('likes:')
        expect(div).toHaveTextContent('2')
        screen.debug(div)

      }, 1000)
    }, 1000)

  })

})