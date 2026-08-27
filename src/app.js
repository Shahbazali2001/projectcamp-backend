import express from "express"
import cors from "cors"

// Routes Import
import healthCheckRouter from "./routes/healthCheck.routes.js"

// Initialize App
const app = express()

// Middlewares and Config
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use("/api/v1/healthcheck", healthCheckRouter)

// Cors Config
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
)

app.get("/", (req, res) => {
  res.send("Hello World")
})

app.get("/test", (req, res) => {
  res.send("Hello World Test")
})

export default app
