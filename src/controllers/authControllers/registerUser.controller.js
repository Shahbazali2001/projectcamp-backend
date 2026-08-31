import { User } from "../../models/user.models.js"
import { ApiResponse } from "../../utils/api-response.js"
import { ApiError } from "../../utils/api-error.js"
import { asyncHandler } from "../../utils/async-handler.js"
import { sendEmail, emailVerificationMailGenContent } from "../../utils/mail.js"

// Generate Access and Refresh Tokens
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const registeredUser = await User.findById(userId)
    const accessToken = registeredUser.generateAccessToken()
    const refreshToken = registeredUser.generateRefreshToken()

    registerUser.refreshToken = refreshToken
    await registeredUser.save({ validateBeforeSave: false })

    return { accessToken, refreshToken }
  } catch (error) {
    throw new ApiError(500, "Failed to generate tokens", [])
  }
}

// Register User
export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  })

  if (existingUser) {
    throw new ApiError(409, "User already exists", [])
  }

  const user = await User.create({
    username,
    email,
    password,
    isEmailVerified: false,
  })

  const { unHashedToken, hashedToken, tokenExpiry } =
    await user.generateTemporaryToken()

  user.emailVerificationToken = hashedToken
  user.emailVerificationExpiry = tokenExpiry

  await user.save({ validateBeforeSave: false })

  // Send Email
  await sendEmail({
    email: user?.email,
    subject: "Please Verify Your Email Address",
    MailgenContent: emailVerificationMailGenContent(
      user?.username,
      `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`,
    ),
  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
  )

  if (!createdUser) {
    throw new ApiError(500, "Failed to create user", [])
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        { user: createdUser },
        "User registered successfully and verification email sent.",
      ),
    )
})
