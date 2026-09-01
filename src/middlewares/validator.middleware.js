import { validationResult } from "express-validator"
import { ApiError } from "../utils/api-error.js"
import { th } from "zod/locales"

export const validator = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }

  const extractedErrors = []
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }))

  throw new ApiError(402, "Received Invalid Data", extractedErrors)
}
