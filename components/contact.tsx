"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";
import { submitContactForm } from "../lib/actions";
import { useActionState } from "react";

export function Contact() {
  const [state, formAction, isPending] = useActionState(submitContactForm, null);

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Let&apos;s build something useful
          </h2>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">
                Need an EA, a Pine Script tool or an AI workflow that actually works?
              </h3>
              <p className="text-lg text-muted-foreground mb-8">
                I&apos;m open to UK remote roles, full-time or part-time, in trading technology, AI automation and agentic systems, and to freelance projects. Occasional travel is fine. Tell me what you want to build and I&apos;ll tell you plainly whether and how I&apos;d do it.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xl font-medium mb-4">I can help with</h4>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>MT4/MT5 Expert Advisors and indicators</li>
                    <li>MT4 to MT5 and MQL to Pine Script conversions</li>
                    <li>TradingView Pine Script tools with reliable alerts</li>
                    <li>EA licensing and code protection</li>
                    <li>AI agent workflows and MCP integrations</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-medium mb-4">My working style</h4>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Specification-driven and outcome focused</li>
                    <li>TDD, code review and explicit guardrails</li>
                    <li>Human approval for high-impact actions</li>
                    <li>Pragmatic: deterministic code where it is better than AI</li>
                  </ul>
                </div>
              </div>

              <p className="text-lg text-muted-foreground mb-8">
                Trading is my deepest domain, but not my only one. The common thread is solving real business problems with tested software and AI under human control.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Birmingham, England, UK · Remote</span>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Send me a message</CardTitle>
                <CardDescription>
                  Hiring, consulting or collaboration - tell me what you are trying to build or automate.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form action={formAction} className="relative space-y-4">
                  <div
                    className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden"
                    aria-hidden="true"
                  >
                    <label htmlFor="hp_field">Leave blank</label>
                    <input
                      id="hp_field"
                      name="hp_field"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      defaultValue=""
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" name="firstName" placeholder="John" required autoComplete="given-name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" name="lastName" placeholder="Doe" required autoComplete="family-name" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="john@example.com" required autoComplete="email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" name="subject" placeholder="EA, Pine Script, AI workflow or role" required autoComplete="off" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about the role, system or business problem..."
                      className="min-h-[120px]"
                      required
                      autoComplete="off"
                    />
                  </div>

                  {state && (
                    <div className={`p-4 rounded-md ${state.success ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}>
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
  );
}
