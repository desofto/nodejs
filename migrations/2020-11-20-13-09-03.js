module.exports = async () => {
  const { createTable } = require("../cmds/db")
  
  await createTable(
    "users",
    {
      id: "SERIAL PRIMARY KEY", 
      email: "VARCHAR(30)",
      full_name: "VARCHAR(30)",
      created_at: "bigint", 
      expires_at: "bigint"
    }
  )
}