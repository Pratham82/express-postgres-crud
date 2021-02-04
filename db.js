const Pool = require('pg').Pool

const pool = new Pool({
  user: 'pratham82',
  password: 'GreatGatsby@545',
  database: 'todo_database',
  host: 'localhost',
  port: 5432,
})

module.exports = pool
