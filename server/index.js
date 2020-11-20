import pool from "../shared/pool"
import User from "../models/user"

(async () => {
  let users = await User.where("email ilike $1", ["qwe"])
  console.log(users.length)

  let user = await User.find(4)
  if(user) {
    user.email = 'qwe'
    await user.save()
  } else {
    user = new User()
    user.email = "test@example.com"
    await user.save()
  }

  pool.end()
})()