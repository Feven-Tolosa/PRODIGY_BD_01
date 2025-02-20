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

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
