import { render, screen } from '@testing-library/react'
import { MemoryRouter as Router } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

describe('Blog component', () => {
  const blog = {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    user: {
      username: 'root',
      name: 'Root User',
      id: '6a1961fed3c5812e7ef8c518'
    }
  }

  test('without login, blog\'s title, author, url, likes, and user are rendered while buttons are not shown', () => {
    render(<Router><Blog blog={blog} /></Router>)

    const blogElement = screen.getByText('Type wars Robert C. Martin')
    expect(blogElement).toBeDefined()

    const urlElement = screen.getByText('http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html')
    const likesElement = screen.getByText('likes 2')
    const userNameElement = screen.getByText('Root User')
    expect(urlElement).toBeVisible()
    expect(likesElement).toBeVisible()
    expect(userNameElement).toBeVisible()

    const likeButton = screen.getByText('like')
    const removeButton = screen.getByText('remove')
    expect(likeButton).not.toBeVisible()
    expect(removeButton).not.toBeVisible()
  })

  test('authenticated users who are not the creator are also shown the like button', () => {
    render(<Router>
      <Blog blog={blog} userId='6a1961fed3c5812e7ef8fake' />
    </Router>)

    const blogElement = screen.getByText('Type wars Robert C. Martin')
    expect(blogElement).toBeDefined()

    const urlElement = screen.getByText('http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html')
    const likesElement = screen.getByText('likes 2')
    const userNameElement = screen.getByText('Root User')
    const likeButton = screen.getByText('like')
    expect(urlElement).toBeVisible()
    expect(likesElement).toBeVisible()
    expect(userNameElement).toBeVisible()
    expect(likeButton).toBeVisible()

    const removeButton = screen.getByText('remove')
    expect(removeButton).not.toBeVisible()
  })

  test('blog’s creator is shown the delete button', () => {
    render(<Router>
      <Blog blog={blog} userId={blog.user.id} />
    </Router>)

    const blogElement = screen.getByText('Type wars Robert C. Martin')
    expect(blogElement).toBeDefined()

    const urlElement = screen.getByText('http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html')
    const likesElement = screen.getByText('likes 2')
    const userNameElement = screen.getByText('Root User')
    const likeButton = screen.getByText('like')
    const removeButton = screen.getByText('remove')
    expect(urlElement).toBeVisible()
    expect(likesElement).toBeVisible()
    expect(userNameElement).toBeVisible()
    expect(likeButton).toBeVisible()
    expect(removeButton).toBeVisible()
  })

  test('call likeHandler function twice when clicking the like button two times', async () => {
    const mockLikeBlog = vi.fn()
    const user = userEvent.setup()

    render(<Router>
      <Blog blog={blog} userId={blog.user.id} likeBlog={mockLikeBlog} />
    </Router>)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockLikeBlog.mock.calls).toHaveLength(2)
  })
})