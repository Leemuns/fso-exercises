const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, initialUsers } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    
    await request.post('http://localhost:3003/api/testing/reset')
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

    describe('One blog is added', () => {
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

      test.only('blog delete button can only be seen by the user who added it', async ({ page }) => {
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