const fs = require("fs")
const moment = require("moment")

const Template = `
module.exports = async () => {
  const { query } = require("../cmds/db")

  const sql = \`
  \`
  
  await query(sql)
}
`

fs.writeFile("./migrations/" + moment().format('YYYY-MM-DD-HH-mm-ss') + ".js", Template, function (err) {
  if (err) throw err
})