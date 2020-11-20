module.exports = async () => {
  const { query } = require("../cmds/db")

  const sql = `
    create table uuu(id SERIAL PRIMARY KEY, google_id VARCHAR(30), created_at bigint, expires_at bigint)
  `
  
  await query(sql)
}