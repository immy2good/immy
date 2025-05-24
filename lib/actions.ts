"use server"

import { Resend } from "resend"

export async function submitContactForm(formData: FormData) {
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string

  // Basic validation
  if (!firstName || !lastName || !email || !subject || !message) {
    return {
      success: false,
      message: "Please fill in all fields.",
    }
  }

  // Check if API key is available
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error("RESEND_API_KEY environment variable is not set")
    return {
      success: false,
      message: "Email service is not configured. Please try again later.",
    }
  }

  try {
    const resend = new Resend(apiKey)

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // Use your verified domain
      to: ["mr.imrankhan+portfoliowebsite@gmail.com"],
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
      replyTo: email,
    })

    return {
      success: true,
      message: "Thank you for your message! I'll get back to you soon.",
    }
  } catch (error) {
    console.error("Failed to send email:", error)
    return {
      success: false,
      message: "Failed to send message. Please try again later.",
    }
  }
}
