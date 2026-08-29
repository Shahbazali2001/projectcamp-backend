import Mailgen from "mailgen"
import nodemailer from "nodemailer"

const sendEmail = async (options) => {
  // Generate email template
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Project Camp",
      link: "https://localhost:3000",
    },
  })

  // Generate email text and html
  const emailTextual = mailGenerator.generatePlaintext(options.MailgenContent)
  const emailHtml = mailGenerator.generate(options.MailgenContent)

  //  Mail Transporter
  const mailTransporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  })

  // Mail Object
  const mail = {
    from: "mail.projectcamp@example.com",
    to: options.email,
    subject: options.subject,
    html: emailHtml,
    text: emailTextual,
  }

  // Send email
  try {
    await mailTransporter.sendMail(mail)
  } catch (error) {
    console.log(error)
  }
}

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

export {
  emailVerificationMailGenContent,
  forgotPasswordMailGenContent,
  sendEmail,
}
