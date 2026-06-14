import { useAnecdotes, useAnecdoteActions } from '../store'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { vote, remove } = useAnecdoteActions()

  const handleVote = id => {
    vote(id)
  }

  const handleRemove = id => {
    remove(id)
  }

  return (
    <div>
      {anecdotes.toSorted((a, b) => b.votes - a.votes)
          .map(anecdote => (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote.id)}>vote</button>
                {anecdote.votes === 0 && <button onClick={() => handleRemove(anecdote.id)}>remove</button>}
              </div>
            </div>
          ))
      }
    </div>
  )
}

export default AnecdoteList