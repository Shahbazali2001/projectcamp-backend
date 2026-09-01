import { body } from "express-validator"

const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email address"),

    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLowercase()
      .withMessage("Username must be lowercase")
      .length({ min: 4, max: 14 })
      .withMessage("Username must be between 4 and 14 characters long"),

    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isStrongPassword()
      .withMessage("Password must be strong"),

    body("fullName")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Full name is required"),
  ]
}

export { userRegisterValidator }
