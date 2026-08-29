import Mailgen from "mailgen"

const emailVerificationMailGenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to ProjectCamp! We're very excited to have you on board.",
      action: {
        instructions: "To get started with ProjectCamp, please click here:",
        button: {
          color: "#22BC66",
          text: "Confirm your email",
          link: verificationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  }
}

const forgotPasswordMailGenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "We received a password reset request for your account.",
      action: {
        instructions: "To reset your password, click here:",
        button: {
          color: "#0d3a9b",
          text: "Reset your password",
          link: passwordResetUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  }
}

export { emailVerificationMailGenContent, forgotPasswordMailGenContent }
