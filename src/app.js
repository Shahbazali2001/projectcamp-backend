import express from "express"
import cors from "cors"

// Initialize App
const app = express()

// Middlewares and Config
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))

// Cors Config
app.use(cors())

app.get("/", (req, res) => {
  res.send("Hello World")
})

app.get("/test", (req, res) => {
  res.send("Hello World Test")
})

export default app
