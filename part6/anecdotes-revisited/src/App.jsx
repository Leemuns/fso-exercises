import { useAnecdotes, useAnecdoteActions } from './store'

const App = () => {
  const anecdotes = useAnecdotes()
  const { incrementVotes, createAnecdote } = useAnecdoteActions()

  const vote = id => {
    incrementVotes(id)
  }

  const addAnecdote = event => {
    event.preventDefault()
    createAnecdote(event.target.anecdote.value)
    event.target.reset()
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
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

export default App