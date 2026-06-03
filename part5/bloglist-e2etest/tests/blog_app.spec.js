const { test, expect, beforeEach, describe } = require('@playwright/test')
const { initialBlogs, initialUsers, loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')

    // using forEach is prob not a good idea since the order is random but I'm used to this and order doesn matter so I think its fine.
    initialUsers.forEach(async user => await request.post('http://localhost:3003/api/users', { data: user }))

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'root', 'root123')

      await expect(page.getByText('logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'fake user', 'wrong password')

      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('Invalid username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

      await expect(page.getByText('logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'root', 'root123')
    })

    test('a new blog can be created', async ({ page }) => {
      const blog = {
        title: 'test blog by playwright',
        author: 'test system',
        url: 'http://test.com'
      }

      await createBlog(page, blog)
      await expect(page.getByText('test blog by playwright test system')).toBeVisible()
    })

    test.only('blogs are ordered by likes in descending order', async ({ page, request }) => {
      await expect(page.getByText('logged in')).toBeVisible()

      const loggedUserJSON = await page.evaluate(() => localStorage.getItem('loggedUser'));
      const token = JSON.parse(loggedUserJSON).token
      console.log(token)
      
      for (const blog of initialBlogs) {
        await request.post('http://localhost:3003/api/blogs', { headers: { 'Authorization': `Bearer ${token}` }, data: blog })
      }
      await page.goto('http://localhost:5173')

      for (let i = 0; i < initialBlogs.length; i++ ) {
        await page.getByRole('button', { name: 'show' }).first().click()
      }

      const extractLikesFromBlog = async i => {
        const text = await page.locator('.blog').nth(i).getByText('likes').innerText()
        return text.match(/\d+/)[0]
      }

      let isDesc = true
      for (let i = 1; i < initialBlogs.length; i++ ) {
        const prevLikes = await extractLikesFromBlog(i-1)
        const curLikes = await extractLikesFromBlog(i)
        if (prevLikes < curLikes) {
          isDesc = false
          break
        }
      }
      expect(isDesc, true)
    })

    describe('One blog is added by user root', () => {
      beforeEach(async ({ page }) => {
        const blog = {
          title: 'test blog by playwright',
          author: 'test system',
          url: 'http://test.com'
        }

        await createBlog(page, blog)
      })

      test('blog can be liked to increase its amount of likes', async ({ page }) => {
        await page.getByRole('button', { name: 'show' }).click()
        await expect(page.getByText('likes 0')).toBeVisible()
        const likeButton = page.getByRole('button', { name: 'like' })
        await likeButton.click()
        await expect(page.getByText('likes 1')).toBeVisible()
        await likeButton.click()
        await expect(page.getByText('likes 2')).toBeVisible()
      })

      test('blog can be deleted by the user who added it', async ({ page }) => {
        await page.getByRole('button', { name: 'show' }).click()
        page.on('dialog', dialog => dialog.accept());
        await page.getByRole('button', { name: 'remove' }).click()
        await expect(page.getByText('test blog by playwright test system')).not.toBeVisible()
      })

      test('blog delete button can only be seen by the user who added it', async ({ page }) => {
        await page.getByRole('button', { name: 'show' }).click()
        await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()

        await page.getByRole('button', { name: 'Logout' }).click()
        await loginWith(page, 'second', 'second123')
        await page.getByRole('button', { name: 'show' }).click()
        await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
      })
    })
  })
})