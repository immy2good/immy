"use server"

import { headers } from "next/headers"
import { Resend } from "resend"
import { z } from "zod"

export type ContactFormState = {
  success: boolean
  message: string
}

const SUCCESS_MESSAGE = "Thank you for your message! I'll get back to you soon."
const FAILURE_MESSAGE = "Message not sent. Please try again later."
const NOT_CONFIGURED_MESSAGE = "Email service is not configured. Please try again later."

const WINDOW_MS = 10 * 60 * 1000
const MAX_ATTEMPTS = 5

const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

const contactSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().min(3).max(254).email().regex(EMAIL_PATTERN),
  subject: z.string().trim().min(1).max(200),
  message: z.string().trim().min(1).max(5000),
})

type Bucket = { count: number; resetAt: number }

const buckets = new Map<string, Bucket>()

function readEnv(name: string): string | undefined {
  const value = process.env[name]
  if (typeof value !== "string") return undefined
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function mailboxAddress(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed || /[\r\n]/.test(trimmed)) return null
  const angled = trimmed.match(/<([^>]+)>\s*$/)
  const email = (angled ? angled[1] : trimmed).trim()
  if (!EMAIL_PATTERN.test(email)) return null
  return trimmed
}

function clientAddress(headerList: Headers): string {
  const realIp = headerList.get("x-real-ip")?.trim()
  if (realIp) return realIp.slice(0, 128)
  const forwarded = headerList.get("x-forwarded-for")?.split(",")[0]?.trim()
  if (forwarded) return forwarded.slice(0, 128)
  return "unknown"
}

function isRateLimited(key: string): boolean {
  const now = Date.now()
  if (buckets.size > 5000) {
    for (const [ip, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(ip)
    }
  }

  const bucket = buckets.get(key)
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }

  bucket.count += 1
  return bucket.count > MAX_ATTEMPTS
}

function validationMessage(error: z.ZodError): string {
  const issue = error.issues[0]
  if (!issue) return "Please check the form and try again."
  if (issue.code === "too_big") return "Please shorten that field and try again."
  if (issue.path[0] === "email") return "Please enter a valid email address."
  return "Please fill in all fields."
}

function field(formData: FormData, name: string): string {
  const value = formData.get(name)
  return typeof value === "string" ? value : ""
}

export async function submitContactForm(
  _prevState: ContactFormState | null,
  formData: FormData,
): Promise<ContactFormState> {
  if (!formData) {
    return { success: false, message: "Form data is missing. Please try again." }
  }

  const headerList = await headers()
  if (isRateLimited(clientAddress(headerList))) {
    return {
      success: false,
      message: "Too many messages. Please wait a few minutes and try again.",
    }
  }

  // Bots that fill every input, including this hidden field, get a normal success
  // response and nothing is sent.
  if (field(formData, "hp_field").trim() !== "") {
    return { success: true, message: SUCCESS_MESSAGE }
  }

  const parsed = contactSchema.safeParse({
    firstName: field(formData, "firstName"),
    lastName: field(formData, "lastName"),
    email: field(formData, "email"),
    subject: field(formData, "subject"),
    message: field(formData, "message"),
  })

  if (!parsed.success) {
    return { success: false, message: validationMessage(parsed.error) }
  }

  const apiKey = readEnv("RESEND_API_KEY")
  const to = mailboxAddress(readEnv("CONTACT_TO_EMAIL") ?? "")
  const from = mailboxAddress(readEnv("CONTACT_FROM_EMAIL") ?? "")

  if (!apiKey || !to || !from) {
    console.error("Contact form email is not configured", {
      hasApiKey: Boolean(apiKey),
      hasTo: Boolean(to),
      hasFrom: Boolean(from),
    })
    return { success: false, message: NOT_CONFIGURED_MESSAGE }
  }

  const { firstName, lastName, email, subject, message } = parsed.data
  const safeSubject = subject.replace(/[\r\n]+/g, " ")

  try {
    const resend = new Resend(apiKey)
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `Portfolio Contact: ${safeSubject}`,
      text: [
        "New contact form submission",
        `Name: ${firstName} ${lastName}`,
        `Email: ${email}`,
        `Subject: ${safeSubject}`,
        "",
        message,
      ].join("\n"),
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(safeSubject)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    })

    if (error) {
      console.error("Failed to send contact email", error)
      return { success: false, message: FAILURE_MESSAGE }
    }

    console.log("Contact email sent", { id: data?.id })
    return { success: true, message: SUCCESS_MESSAGE }
  } catch (error) {
    console.error("Failed to send contact email", error)
    return { success: false, message: FAILURE_MESSAGE }
  }
}
