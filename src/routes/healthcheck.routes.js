import { Router } from "express"
import { healthCheck } from "../controllers/healthcheck.controllers.js"

const healthCheckRouter = Router()
healthCheckRouter.get("/healthcheck", healthCheck)

export default healthCheckRouter
