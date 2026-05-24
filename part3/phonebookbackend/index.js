const express = require('express')
const morgan = require('morgan')

const app = express()

let persons = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.use(express.json())
app.use(morgan('tiny'))

app.get('/', (req, res) => {
  res.end()
})

app.get('/info', (req, res) => {
  res.send(`
    <div>Phonebook has info for ${persons.length} people</div>
    <div>${Date()}</div>
  `)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const person = persons.find(person => person.id === req.params.id)
  
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

// tested with Postman
app.delete('/api/persons/:id', (req, res) => {
  persons = persons.filter(person => person.id !== req.params.id)
  res.status(204).end()
})

const generateId = () => {
  let id = 0
  const idList = persons.map(person => person.id)

  do {
    id = Math.floor(Math.random() * 1000)
  } while (idList.includes(id)) 

  return `${id}`
}

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({ 
      error: 'field "name" or "number" missing' 
    })
  } else if (persons.map(person => person.name).includes(body.name)) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)

  res.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})