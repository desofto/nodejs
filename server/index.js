import express from "express"
import "babel-polyfill"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(express.static(__dirname + "/../public"))

app.get("/apiql", async (req, res) => {
  res.status(200).sendFile("apiql.html", { root: __dirname + "/../public" })
})

app.post("/apiql", async (req, res) => {
  const { token } = req.headers
  if (!token) {
    return res.status(404).send("Not Found")
  }
  res.status(200).send("OK")
})

app.listen(process.env.PORT).on("listening", () => {
  console.log(`Started on port ${process.env.PORT}`)
})

/*
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
*/