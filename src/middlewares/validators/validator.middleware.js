import { validationResult } from "express-validator"
import { ApiError } from "../../utils/api-error.js"

export const validate = (req, res, next) => {
  const error = validationResult(req)
  if (error.isEmpty()) {
    return next()
  } else {
    const extractedErrors = []
    error.array().map((err) => extractedErrors.push({ [err.path]: err.msg }))

    throw new ApiError(422, "Validation Error", extractedErrors)
  }
}
