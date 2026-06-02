import { render, screen } from '@testing-library/react'
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

  test('blog\'s title and authored are rendered, while url and likes are hidden by default', () => {
    render(<Blog blog={blog} />)

    const blogElement = screen.getByText('Type wars Robert C. Martin')
    expect(blogElement).toBeDefined()

    const urlElement = screen.getByText('http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html')
    const likesElement = screen.getByText('likes 2')
    expect(urlElement).not.toBeVisible()
    expect(likesElement).not.toBeVisible()
  })

  test('blog\'s url and likes are rendered after clicking show button', async () => {
    const user = userEvent.setup()

    render(<Blog blog={blog} />)

    const showButton = screen.getByText('show')
    await user.click(showButton)

    const urlElement = screen.getByText('http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html')
    const likesElement = screen.getByText('likes 2')
    expect(urlElement).toBeVisible()
    expect(likesElement).toBeVisible()
  })

  test('call likeHandler function twice when clicking the like button two times', async () => {
    const mockLikeHandler = vi.fn()
    const user = userEvent.setup()

    render(<Blog blog={blog} handleLikeBlog={mockLikeHandler}/>)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })
})