const { test, expect, beforeEach, describe } = require('@playwright/test')
const { initialBlogs, initialUsers, loginWith, createBlog } = require('./helper')

beforeEach(async ({ page, request }) => {
  await request.post('http://localhost:3003/api/testing/reset')

  // using forEach is prob not a good idea since the order is random but I'm used to this and order doesn matter so I think its fine.
  initialUsers.forEach(async user => await request.post('http://localhost:3003/api/users', { data: user }))

  await page.goto('http://localhost:5173')
})

describe('Login', () => {
  test('succeeds with correct credentials', async ({ page }) => {
    await loginWith(page, 'root', 'root123')

    await expect(page.getByRole('Link', { name: 'new blog' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
  })

  test('fails with wrong credentials', async ({ page }) => {
    await loginWith(page, 'fake user', 'wrong password')

    const errorDiv = page.locator('.error')
    await expect(errorDiv).toContainText('Invalid username or password')
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

    await expect(page.getByRole('Link', { name: 'new blog' })).not.toBeVisible()
    await expect(page.getByRole('button', { name: 'logout' })).not.toBeVisible()
  })
})

describe('When logged in', () => {
  const blog = {
    title: 'test blog by playwright',
    author: 'test system',
    url: 'http://test.com'
  }

  beforeEach(async ({ page }) => {
    await loginWith(page, 'root', 'root123')
  })

  test('A logged-in user can create a blog', async ({ page }) => {
    await createBlog(page, blog)
    await expect(page.getByText(`${blog.title} ${blog.author}`)).toBeVisible()
  })

  test.only('blogs are ordered by likes in descending order', async ({ page, request }) => {
    await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
    const loggedUserJSON = await page.evaluate(() => localStorage.getItem('loggedUser'));
    const token = JSON.parse(loggedUserJSON).token
    
    for (const blog of initialBlogs) {
      await request.post('http://localhost:3003/api/blogs', { 
        headers: { 'Authorization': `Bearer ${token}` }, 
        data: blog 
      })
    }
    await page.goto('http://localhost:5173')

    const likesList = []
    for (const blog of initialBlogs) {
      await page.getByText(`${blog.title} ${blog.author}`).click()

      const likesText = page.getByText('likes').innerText()
      const likesNum = (await likesText).match(/\d+/)[0]
      likesList.push(likesNum)
      await page.getByRole('Link', { name: 'blogs' }).click()
    }

    expect(likesList.every((cur, i, arr) => i === 0 || arr[i-1] >= cur), true)
  })

  describe('One blog is added by user root', () => {
    beforeEach(async ({ page }) => {
      await createBlog(page, blog)
    })

    test('blog can be liked to increase its amount of likes', async ({ page }) => {
      await page.getByText(`${blog.title} ${blog.author}`).click()

      const likeButton = page.getByRole('button', { name: 'like' })
      await likeButton.click()
      await expect(page.getByText('likes 1')).toBeVisible()
      await likeButton.click()
      await expect(page.getByText('likes 2')).toBeVisible()
    })

    test('blog can be deleted by the user who added it', async ({ page }) => {
      await page.getByText(`${blog.title} ${blog.author}`).click()

      page.on('dialog', dialog => dialog.accept());
      await page.getByRole('button', { name: 'remove' }).click()
      await expect(page.getByText(`${blog.title} ${blog.author}`)).not.toBeVisible()
    })

    test('blog delete button can only be seen by the user who added it', async ({ page }) => {
      await page.getByText(`${blog.title} ${blog.author}`).click()

      await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()

      await page.getByRole('button', { name: 'Logout' }).click()
      await loginWith(page, 'second', 'second123')
      await page.getByText(`${blog.title} ${blog.author}`).click()
      await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })
  })
})