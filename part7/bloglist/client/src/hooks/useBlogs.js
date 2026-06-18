import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import blogsService from '../services/blogs'
import useNotification from './useNotification'

const useBlogs = () => {
  const queryClient = useQueryClient()
  const { displayNotification } = useNotification()
  const navigate = useNavigate()

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const data = await blogsService.getAll()
      return data.sort((a, b) => b.likes - a.likes)
    },
    refetchOnWindowFocus: false,
  })

  const newBlogMutation = useMutation({
    mutationFn: blogsService.create,
    onSuccess: (blog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(blog))
      displayNotification(`a new blog ${blog.title} by ${blog.author} added`)
      navigate('/')
    },
    onError: (error, variables) => {
      const { title, author } = variables
      displayNotification(
        `failed to add blog "${title}" by ${author}. Error: ${error}`,
        'error',
      )
    },
  })

  const newCommentMutation = useMutation({
    mutationFn: ({ blogId, comment }) =>
      blogsService.createComment(blogId, comment),
    onSuccess: (blog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((b) => (b.id === blog.id ? blog : b)),
      )
    },
  })

  const likeBlogMutation = useMutation({
    mutationFn: async (blog) => {
      const { id, ...blogWithoutId } = blog
      await blogsService.update(id, blogWithoutId)
      return blog
    },
    onSuccess: (blog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((b) => (b.id === blog.id ? blog : b)),
      )
    },
    onError: (error, variables) => {
      const { title, author } = variables
      displayNotification(
        `failed to like blog "${title}" by ${author}. Error: ${error}`,
        'error',
      )
    },
  })

  const removeBlogMutation = useMutation({
    mutationFn: async (blog) => {
      await blogsService.remove(blog.id)
      return blog
    },
    onSuccess: (blog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.filter((b) => b.id !== blog.id),
      )
      displayNotification(`Removed blog "${blog.title}" by ${blog.author}`)
    },
    onError: (error, variables) => {
      const { title, author } = variables
      displayNotification(
        `failed to remove blog "${title}" by ${author}. Error: ${error}`,
        'error',
      )
    },
  })

  return {
    blogs: result.data,
    isPending: result.isPending,
    isError: result.isError,
    getBlog: (blogId) => result.data?.find((b) => b.id === blogId),
    addBlog: (blog) => newBlogMutation.mutate(blog),
    addComment: (blogId, comment) =>
      newCommentMutation.mutate({ blogId, comment }),
    likeBlog: (blog) =>
      likeBlogMutation.mutate({ ...blog, likes: blog.likes + 1 }),
    removeBlog: (blog) => removeBlogMutation.mutate(blog),
  }
}

export default useBlogs
