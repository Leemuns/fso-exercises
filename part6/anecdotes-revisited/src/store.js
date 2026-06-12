
import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const useAnecdoteStore = create(set => ({
  anecdotes: [],
  filter: '',
  actions: {
    incrementVotes: anecdoteId => set(state => {
      return { anecdotes: state.anecdotes.map(anecdote => 
        anecdote.id === anecdoteId 
        ? { ...anecdote, votes: anecdote.votes + 1 } 
        : anecdote
      )}
    }),
    createAnecdote: anecdoteContent => set(state => {
      return { anecdotes: state.anecdotes.concat({ content: anecdoteContent, id: getId(), votes: 0 })}
    }),
    setFilter: value => set(() => ({ filter: value})),
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes }))
    }
  },
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter).toLowerCase()
  return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
}
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
