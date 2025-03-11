const express = require('express')
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid')

const app = express()
app.use(bodyParser.json())

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

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

// Read all users
app.get('/users', (req, res) => {
  res.json(Object.values(users)) // Convert hashmap values to an array
})

// Read a single user
app.get('/users/:id', (req, res) => {
  const user = users[req.params.id] // Lookup user by ID

  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  res.json(user)
})

// Update
app.put('/users/:id', (req, res) => {
  const user = users[req.params.id] // Lookup user by ID

  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  const { name, email, age } = req.body

  if (email && !isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email' })
  }

  // Update user fields if provided
  user.name = name || user.name
  user.email = email || user.email
  user.age = age || user.age

  res.json(user)
})

// Delete
app.delete('/users/:id', (req, res) => {
  const user = users[req.params.id] // Lookup user by ID

  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  delete users[req.params.id] // Delete user from the hashmap
  res.sendStatus(204)
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
