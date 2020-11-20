const dotenv = require("dotenv")
dotenv.config()

const Pool = require("pg").Pool

const databaseConfig = { connectionString: process.env.DATABASE_URL }
const pool = new Pool(databaseConfig)

async function query(sql, params) {
  try {
    let { rows } = await pool.query(sql, params)
    return rows
  } catch (e) {
    console.log(e.message)
    throw e
  }
}

module.exports = {
  pool,
  query
}