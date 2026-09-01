import { Router } from "express"
import { registerUser } from "../../controllers/authControllers/registerUser.controller.js"
import { userRegisterValidator } from "../../validators/index.js"
import { validator } from "../../middlewares/validator.middleware.js"

const authRouter = Router()

authRouter.post("/register", userRegisterValidator(), validator, registerUser)

export default authRouter
