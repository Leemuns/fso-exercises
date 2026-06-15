import { useAnecdotes } from '../hooks/useAnecdotes'
import useNotification from "../hooks/useNotification"

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdotes()
  const { displayNotification } = useNotification()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    addAnecdote(content)
    event.target.reset()
    displayNotification(`anecdote '${content}' added`)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm