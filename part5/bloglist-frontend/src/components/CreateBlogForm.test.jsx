import { render, screen } from '@testing-library/react'
import { MemoryRouter as Router } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

import CreateBlogForm from './CreateBlogForm'

describe('CreateBlogForm component', () => {
  test('call handleCreateBlog with the correct details when clicking create button', async () => {
    const mockCreateBlog = vi.fn()
    const user = userEvent.setup()
    const newBlog = {
      title: 'test name',
      author: 'test author',
      url: 'test url'
    }

    render(
      <Router>
        <CreateBlogForm createBlog={mockCreateBlog} />
      </Router>
    )

    const createButton = screen.getByText('create')
    const titleInput = screen.getByLabelText('title')
    const authorInput = screen.getByLabelText('author')
    const urlInput = screen.getByLabelText('url')

    await user.type(titleInput, newBlog.title)
    await user.type(authorInput, newBlog.author)
    await user.type(urlInput, newBlog.url)
    await user.click(createButton)

    expect(mockCreateBlog.mock.calls).toHaveLength(1)
    expect(mockCreateBlog.mock.calls[0][0]).toStrictEqual(newBlog)
  })
})