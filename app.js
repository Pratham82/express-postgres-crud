const express = require('express')
const pool = require('./db')
const app = express()

app.use(express.json())

// Routes

// Get All todos
app.get('/todos', async (_, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM todo;')
    res.json({
      rows,
    })
  } catch (err) {
    /* handle error */
    console.error(err.message)
  }
})

// Get  todo
app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params
    const todo = await pool.query('SELECT * FROM todo where todo_id  = $1', [
      id,
    ])
    res.json(todo.rows[0])
  } catch (err) {
    /* handle error */
    console.error(err.message)
  }
})

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
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { description } = req.body

    const updatedTodo = await pool.query(
      'UPDATE todo SET description = $1 WHERE todo_id = $2',
      [description, id]
    )

    res.json({
      updatedTodo,
    })
  } catch (err) {
    /* handle error */
  }
})

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params

    const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [
      id,
    ])

    res.json({
      deleteTodo,
    })
  } catch (err) {
    /* handle error */
  }
})

const PORT = 3000
app.listen(process.env.PORT || 3000, (_, res) =>
  console.log(`Server started on ${PORT}`)
)
