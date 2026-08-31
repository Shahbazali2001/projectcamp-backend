import { Router } from "express"
import { registerUser } from "../../controllers/authControllers/registerUser.controller.js"

const authRouter = Router()

authRouter.post("/register", registerUser)

export default authRouter
