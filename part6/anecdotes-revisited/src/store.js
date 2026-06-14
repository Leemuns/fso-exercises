
import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const truncate = (content) => {
  return content.length <= 60 ? content : content.slice(0, 60) + '...'
}

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    vote: async id => {
      const anecdote = get().anecdotes.find(a => a.id === id)
      const updated = {...anecdote, votes: anecdote.votes + 1}
      const saved = await anecdoteService.update(id, updated)
      const { display } = useNotificationStore.getState().actions
      set(state => ({ anecdotes: state.anecdotes.map(a => a.id === id ? saved : a) }))
      display(`You voted "${truncate(anecdote.content)}".`)
    },
    add: async content => {
      const newAnecdote = await anecdoteService.create({ content, id: getId(), votes: 0 })
      const { display } = useNotificationStore.getState().actions
      set(state => ({ anecdotes: state.anecdotes.concat(newAnecdote)}))
      display(`You added "${truncate(newAnecdote.content)}".`)
    },
    remove: async id => {
      const removedAnecdote = await anecdoteService.remove(id)
      set(state => ({ anecdotes: state.anecdotes.filter(a => a.id !== id) }))
      const { display } = useNotificationStore.getState().actions
      display(`You removed "${truncate(removedAnecdote.content)}".`)
    },
    setFilter: value => set(() => ({ filter: value})),
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes }))
    }
  }
}))

// I have hated this notification thing since part 2
const useNotificationStore = create((set) => ({
  notification: null,
  actions: {
    display: message => {
      set(() => ({ notification: message}))
      setTimeout(() => set(() => ({ notification: null })), 5000)
    }
  }
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter).toLowerCase()
  return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
}
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
export const useNotification = () => useNotificationStore((state) => state.notification)