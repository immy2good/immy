"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, MapPin, Phone } from "lucide-react"
import { submitContactForm } from "@/lib/actions"
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
              <h3 className="text-2xl font-semibold mb-6">Let's Create A Solution</h3>
              <p className="text-lg text-muted-foreground mb-8">
                I'm always interested in FinTech and Web development opportunities, PineScript and MetaTrader 4/5
                algorithmic trading solutions. Whether you need eCommerce Websites, Company Websites, Trading Automation
                or Algorithmic Trading Programming, or custom FinTech platforms, let's discuss how we can bring your
                vision to life. Also, I can build you fully functional eCommerce Websites on various technologies.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <a href="mailto:mr.imrankhan+portfoliowebsite@gmail.com">info@imyousafzai.com</a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>+44 74272 49971</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Birmingham, England, UK</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-5 h-5 text-primary">📊</span>
                  <a
                    href="https://www.tradingview.com/u/iTradeAIMS/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                  >
                    TradingView Profile
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-5 h-5 text-primary">📚</span>
                  <a
                    href="https://amzn.eu/d/735UjWD"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                  >
                    Elliott Wave Book on Amazon
                  </a>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Send me a message</CardTitle>
                <CardDescription>
                  Interested in FinTech or Web development or technical analysis consulting? Let's discuss your project.
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
        </div>
      </div>
    </section>
  )
}
