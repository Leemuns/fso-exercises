import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import { useAnecdotes } from './hooks/useAnecdotes'
import useNotification from './hooks/useNotification'

const App = () => {
  const { anecdotes, isPending, isError, voteAnecdote} = useAnecdotes()
  const { displayNotification } = useNotification()

  if (isPending) {
    return <div>Loading data...</div>
  }

  if (isError) {
    return <div>Anecdote service not available due to problems in server</div>
  }

  const handleVote = (anecdote) => {
    voteAnecdote(anecdote)
    displayNotification(`anecdote '${anecdote.content}' voted`)
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App