import pool from "../shared/pool"
import User from "../models/user"

(async () => {
  let user = await User.find(1)
  console.log(user.id)
  user.id = 2
  console.log(user._changes)

  pool.end()
})()