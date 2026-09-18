import { User } from "../../models/user.models.js"
import { ApiResponse } from "../../utils/api-response.js"
import { ApiError } from "../../utils/api-error.js"
import { asyncHandler } from "../../utils/async-handler.js"

const loginUser = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body

  if (!email) {
    throw new ApiError(400, "Email is required", [])
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw new ApiError(404, "User not found", [])
  }
})

export { loginUser }
