import { useAnecdoteActions } from '../store'

const AnecdoteForm = () => {
  const { createAnecdote } = useAnecdoteActions()

  const addAnecdote = event => {
    event.preventDefault()
    createAnecdote(event.target.anecdote.value)
    event.target.reset()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote"/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm