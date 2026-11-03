"use client";

import { Component, type ReactNode, useActionState } from "react";
import { submitContactForm } from "../lib/actions";

const FORM_FAILURE_MESSAGE = "Message not sent. Please try again later.";

const field =
  "rounded-[10px] border border-q-edge bg-q-bg px-3.5 py-3 text-[15px] text-q-fg outline-none transition-colors focus:border-q-blue";
const label = "flex flex-col gap-1.5 text-[13px] text-q-body2";
const pill = "rounded-full border border-q-edge2 px-5 py-3 text-[15px]";

class ContactFormBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("Contact form crashed", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-1 flex-col gap-3.5 rounded-[14px] border border-q-line bg-q-card p-7">
          <div className="rounded-[10px] border border-q-rose px-3.5 py-3 text-sm text-q-rose">{FORM_FAILURE_MESSAGE}</div>
          <button type="button" className={pill} onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, null);

  return (
    <form
      action={formAction}
      className="relative flex flex-col gap-3.5 rounded-[14px] border border-q-line bg-q-card p-7"
    >
      <div className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="hp_field">Leave blank</label>
        <input id="hp_field" name="hp_field" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      <h3 className="text-xl font-bold tracking-[-0.01em]">Send me a message</h3>
      <p className="-mt-1.5 text-sm text-q-muted">
        Hiring, consulting or collaboration. Your email stays private; replies come from me.
      </p>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3.5">
        <label className={label}>
          First name
          <input name="firstName" required autoComplete="given-name" className={field} />
        </label>
        <label className={label}>
          Last name
          <input name="lastName" required autoComplete="family-name" className={field} />
        </label>
      </div>
      <label className={label}>
        Email
        <input name="email" type="email" required autoComplete="email" className={field} />
      </label>
      <label className={label}>
        Subject
        <input name="subject" required autoComplete="off" placeholder="EA, Pine Script, AI workflow or role" className={field} />
      </label>
      <label className={label}>
        Message
        <textarea
          name="message"
          required
          rows={5}
          autoComplete="off"
          placeholder="Tell me about the role, system or business problem…"
          className={`${field} resize-y leading-normal`}
        />
      </label>

      {state && (
        <div
          role="status"
          className={`rounded-[10px] border px-3.5 py-3 text-sm ${state.success ? "border-q-green text-q-green" : "border-q-rose text-q-rose"}`}
        >
          {state.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-q-blue p-[15px] text-base font-semibold text-white transition-opacity disabled:opacity-60"
      >
        {isPending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

const helpWith = [
  "MT4/MT5 Expert Advisors and indicators",
  "MT4 → MT5 and MQL → Pine Script",
  "Pine Script tools with reliable alerts",
  "EA licensing and code protection",
  "AI agent workflows and MCP",
];

const howIWork = [
  "Spec-driven, outcome focused",
  "TDD, code review, explicit guardrails",
  "Human approval for high-impact actions",
  "Plain code where it beats AI",
];

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-[72px] border-t border-q-line">
      <div className="wrap pb-10 pt-[clamp(80px,10vw,136px)]">
        <p className="eyebrow text-q-muted">UK remote roles · Freelance · Collaboration</p>
        <h2 className="mt-5 text-balance text-[clamp(52px,9.5vw,136px)] font-bold leading-[.92] tracking-[-0.055em]">
          Let&apos;s build something <span className="text-q-blue">useful.</span>
        </h2>
        <div className="mt-12 flex flex-wrap items-start gap-x-16 gap-y-12">
          <div className="flex flex-[1_1_380px] flex-col gap-7">
            <p className="text-pretty text-lg leading-[1.55] text-q-body2">
              Open to UK remote roles, full-time or part-time, in trading technology, AI automation and agentic
              systems, and to freelance projects. Tell me what you want to build and I&apos;ll tell you plainly whether
              and how I&apos;d do it.
            </p>
            <div className="flex flex-wrap gap-x-10 gap-y-6">
              {[
                { title: "I can help with", items: helpWith },
                { title: "How I work", items: howIWork },
              ].map((col) => (
                <div key={col.title} className="flex-[1_1_220px]">
                  <h3 className="text-[13px] font-semibold text-q-blue">{col.title}</h3>
                  <ul className="mt-3 flex flex-col gap-2 text-[15px] text-q-body">
                    {col.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2.5">
              {/* The CV is one maintained PDF. Its source lives in the itradeaims-job-hunt repo (cv/cv.html). */}
              <a href="/cv/cv.pdf" target="_blank" rel="noopener" download="Immy_Yousafzai_CV.pdf" className={pill}>
                Download CV ↓
              </a>
              <a href="https://github.com/immy2good" target="_blank" rel="noopener noreferrer" className={pill}>
                GitHub ↗
              </a>
              <a
                href="https://www.linkedin.com/in/immy-yousafzai/"
                target="_blank"
                rel="noopener noreferrer"
                className={pill}
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
          <div className="flex flex-[1_1_380px] flex-col">
            <ContactFormBoundary>
              <ContactForm />
            </ContactFormBoundary>
          </div>
        </div>
      </div>
    </section>
  );
}
