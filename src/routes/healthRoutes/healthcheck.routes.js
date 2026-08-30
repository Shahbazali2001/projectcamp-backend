import { Router } from "express"
import { healthCheck } from "../../controllers/healthCheck/healthcheck.controllers.js"

const healthCheckRouter = Router()
// healthCheckRouter.get("/healthcheck", healthCheck)
healthCheckRouter.route("/").get(healthCheck)

export default healthCheckRouter
