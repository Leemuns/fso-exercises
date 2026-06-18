import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import blogService from '../services/blogs'
import { useNotification } from './useNotification'

const useBlogs = () => {
  const queryClient = useQueryClient()
  const { displayNotification } = useNotification()

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const data = await blogService.getAll()
      return data.sort((a, b) => b.likes - a.likes)
    },
    refetchOnWindowFocus: false,
  })

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
      displayNotification(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
      )
    },
    onError: (error, variables) => {
      const { title, author } = variables
      displayNotification(
        `failed to add blog "${title}" by ${author}. Error: ${error}`,
        'error',
      )
    },
  })

  // const updateAnecdoteMutation = useMutation({
  //   mutationFn: updateAnecdote,
  //   onSuccess: (updatedAnecdote) => {
  //     const anecdotes = queryClient.getQueryData(['anecdotes'])
  //     queryClient.setQueryData(['anecdotes'], anecdotes.map(a => a.id === updatedAnecdote.id ? updatedAnecdote : a))
  //   }
  // })

  return {
    blogs: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addBlog: (newBlog) => newBlogMutation.mutate(newBlog),
    // voteAnecdote: (anecdote) => updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }
}

export default useBlogs
