const express = require('express')
const morgan = require('morgan')
const app = express()

morgan.token('content', (req, res) => {
  if (req.method === "POST") return JSON.stringify(req.body)
  else return ""
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

const phonebook = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]

app.get('/api/persons', (req, res) => {
  res.json(phonebook)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const i = phonebook.findIndex(itm => itm.id === id)
  if (i === -1) {
    res.status(404).end()
  } else {
    res.json(phonebook[i])
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const i = phonebook.findIndex(itm => itm.id === id)
  if (i === -1) {
    res.status(404).end()
  } else {
    phonebook.splice(i, 1)
    res.status(204).end()
  }
})

app.post('/api/persons', (req, res) => {
  if (!req.body) {
    return res.status(400).send({"error": "empty request"});
  } else if (!req.body.name || !req.body.number) {
    return res.status(400).send({"error": "Name or number not provided."})
  } else if (phonebook.findIndex(itm => itm.name === req.body.name) !== -1) {
    return res.status(400).send({"error": "Name must be unique."})
  }
  const item = {
    ...req.body,
    id: Math.floor(Math.random()*100000)
  }
  phonebook.push(item)
  res.json(item)
})

app.get('/info', (req, res) => {
  res.send(`The phonebook has ${phonebook.length} people.\n${new Date()}`)
})

app.listen(3001)