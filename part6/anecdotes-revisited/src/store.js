
import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    vote: async id => {
      const anecdote = get().anecdotes.find(a => a.id === id)
      const updated = {...anecdote, votes: anecdote.votes + 1}
      const saved = await anecdoteService.update(id, updated)
      set(state => ({
        anecdotes: state.anecdotes.map(a => a.id === id ? saved : a)
      }))
    },
    add: async content => {
      const newAnecdote = await anecdoteService.create({ content, id: getId(), votes: 0 })
      set(state => ({ anecdotes: state.anecdotes.concat(newAnecdote)}))
    },
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
