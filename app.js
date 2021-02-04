const express = require('express')
const pool = require('./db')
const app = express()

app.use(express.json())

// Routes

// Get All todos
app.get('/', (_, res) => res.send('Hello From express'))

// Get s todo

// Create a todo
app.post('/todos', async (req, res) => {
  try {
    const { id, description } = req.body

    // Create new TODO here
    const newTodo = await pool.query(
      'INSERT INTO todo (description) VALUES ($1) RETURNING *',
      [description]
    )

    res.json({
      newTodo,
    })
  } catch (err) {
    /* handle error */
    console.error(err.message)
  }
})

// Update a todo

// Delete a todo

const PORT = 3000
app.listen(process.env.PORT || 3000, (_, res) =>
  console.log(`Server started on ${PORT}`)
)
