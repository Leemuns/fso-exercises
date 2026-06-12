import { useAnecdoteActions } from '../store'

const Filter = () => {
  const { setFilter } = useAnecdoteActions()
  return (
    <div>
      <p>filter <input onChange={(event) => { setFilter(event.target.value) }}/></p>
    </div>
  )
}

export default Filter