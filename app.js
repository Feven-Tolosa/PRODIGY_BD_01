const express = require('express')
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid')

const app = express()
app.use(bodyParser.json())

// In-memory hashmap (object) to store users
const users = {}

app.get('/', (req, res) => {
  res.send('Hello World')
})
// Create
app.post('/users', (req, res) => {
  const { name, email, age } = req.body

  if (!name || !email || !age) {
    return res.status(400).json({ error: 'Missing fields' })
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email' })
  }

  const id = uuidv4() // Generate a unique UUID
  users[id] = { id, name, email, age } // Store user in the hashmap

  res.status(201).json(users[id])
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
