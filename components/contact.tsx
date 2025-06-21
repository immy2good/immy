"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, MapPin, Phone } from "lucide-react"
// Use relative path for submitContactForm to ensure module resolution
import { submitContactForm } from "../lib/actions"
import { useActionState } from "react"

export function Contact() {
  const [state, formAction, isPending] = useActionState(submitContactForm, null)

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Get In Touch</h2>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              {/* Role-focused intro */}
              <h3 className="text-2xl font-semibold mb-6">Looking for a Product Manager or Software Engineer?</h3>
              <p className="text-lg text-muted-foreground mb-8">
                I specialize in both crafting strategic product roadmaps and rolling up my sleeves to build the underlying technology.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xl font-medium mb-4">As a Product Manager, I can help you:</h4>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Define clear product vision, strategy, and success metrics</li>
                    <li>Conduct customer and market research to prioritize features</li>
                    <li>Collaborate with design and engineering teams to deliver on-time</li>
                    <li>Launch and iterate products based on real-world feedback</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-medium mb-4">As a Software Engineer, I bring hands-on experience in:</h4>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>FinTech integrations (PineScript, MetaTrader 4/5, algorithmic trading)</li>
                    <li>E-commerce &amp; corporate websites (WordPress, Shopify, React, Node.js)</li>
                    <li>Custom platform development (APIs, microservices, cloud deployments)</li>
                  </ul>
                </div>
              </div>

              <p className="text-lg text-muted-foreground mb-8">
                Whether you need someone to own the end-to-end vision or to architect and code the solution, let’s connect and see how we can turn your ideas into reality.
              </p>

              {/* Contact details */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <a href="mailto:mr.imrankhan+portfoliowebsite@gmail.com" className="hover:text-primary">
                    info@imyousafzai.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>+44 121 400 2972</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Birmingham, England, UK</span>
                </div>
              </div>
 
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Send me a message</CardTitle>
                <CardDescription>
                  Interested in FinTech or Web Development or Financial Trading and Technical Analysis Consulting? Let's discuss your project.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form action={formAction} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" name="firstName" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" name="lastName" placeholder="Doe" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" name="subject" placeholder="FinTech Project Inquiry" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your FinTech or technical analysis project..."
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  {state && (
                    <div
                      className={`p-4 rounded-md ${state.success ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}
                    >
                      {state.message}
                    </div>
                  )}

                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
                       {/* Company solution suggestion */}
              <div className="mt-6 p-4 bg-black-50 border border-black-200 rounded-">
                <span className="block text-white-600 font-medium mb-1">
                  Are you a company looking for a solution?
                </span>
                <span className="text-orange-800">
                  Visit my company website at{" "}
                  <a
                    href="https://brumbyte.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-semibold hover:text-blue-600"
                  >
                    BrumByte.com
                  </a>{" "}
                  and get a free quotation!
                </span>
              </div>
        </div>
      </div>
    </section>
  )
}
