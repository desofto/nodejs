const { query, pool } = require("./db")

async function migrate(hash, migration) {
  let rows = await query("select count(*) from migrations where hash = $1", [hash])
  if (rows[0].count > 0) return

  await migration()

  await query("insert into migrations(hash) values($1)", [hash])
}

; (async () => {
  let res = await query("select count(*) from migrations", [])
  if (!res) {
    await query("create table migrations(hash text PRIMARY KEY)")
  }

  const fs = require("fs")

  let files = fs.readdirSync("./migrations/").sort()

  let promises = []

  files.forEach(file => {
    promises.push(migrate(file, async () => {
      await require("../migrations/" + file)()
    }))
  })

  await Promise.all(promises)

  pool.end()
})()