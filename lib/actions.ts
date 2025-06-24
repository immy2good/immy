"use server"

import { Resend } from "resend"

export async function submitContactForm(prevState: any, formData: FormData) {
  // Check if formData exists
  if (!formData) {
    return {
      success: false,
      message: "Form data is missing. Please try again.",
    }
  }

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
  }  // Check if API key is available
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    console.error("RESEND_API_KEY environment variable is not set")
    return {
      success: false,
      message: "Email service is not configured. Please try again later.",
    }
  }  try {
    // Use the API key from environment variables
    const resend = new Resend(apiKey);
    
    // Minimal logging for production
    console.log("Sending contact form submission email", {
      to: "mr.imrankhan@gmail.com",
      subject: `Portfolio Contact: ${subject}`,
      from: "Contact Form <onboarding@resend.dev>"
    });
      const response = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>", // Using Resend's verified sender
      to: ["mr.imrankhan@gmail.com"],
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
    })    // Log minimal info for security
    console.log("Email sent successfully:", response);

    return {
      success: true,
      message: "Thank you for your message! I'll get back to you soon.",
    }  } catch (error) {
    console.error("Failed to send email:", error)
    // Add more detailed error information
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      message: `Message not sent: ${errorMessage}. Please try again or contact me directly at mr.imrankhan+portfoliowebsite@gmail.com`,
    }
  }
}
