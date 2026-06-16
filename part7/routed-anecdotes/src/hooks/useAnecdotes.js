import { useState, useEffect } from 'react'
import anecdoteService from '../services/anecdotes'

const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([])

  useEffect(() => {
    anecdoteService.getAll().then(data => setAnecdotes(data))
  }, [])

  const addAnecdote = async (newAnecdote) => {
    const added = await anecdoteService.createNew({ ...newAnecdote, id: Math.round(Math.random() * 10000) })
    setAnecdotes(anecdotes.concat(added))
  }

  const deleteAnecdote = async (anecdoteId) => {
    const removed = await anecdoteService.remove(anecdoteId)
    setAnecdotes(anecdotes.filter(a => a.id !== removed.id))
  }

  return {
    anecdotes,
    addAnecdote,
    deleteAnecdote
  }
}

export default useAnecdotes