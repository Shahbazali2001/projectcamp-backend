import { ApiResponse } from "../utils/api-response.js"
import { ApiError } from "../utils/api-error.js"

const healthCheck = (req, res) => {
  try {
    return res
      .status(200)
      .json(new ApiResponse(200, { message: "OK!, Health Check Success" }))
  } catch (error) {
    return res.status(500).json(new ApiError(500, { message: error.message }))
  }
}

export { healthCheck }
