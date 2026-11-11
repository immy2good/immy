import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import entries from "@/content/research/lab-log.json";

// Every idea the edge lab has logged, newest first, from content/research/lab-log.json
// (scripts/lab-log.mjs builds it from the lab's export). The result line is the lab's own verdict.
type Entry = { n: number; title: string; status: "pass" | "killed" | "watch" | "testing"; result: string | null; written: string | null; scored: string | null };

const description =
  "Every trading idea I have put through the lab, pass or fail: written down before the test, scored after real broker costs against 10,000 random-entry histories.";

export const metadata: Metadata = {
  title: "Lab log · Research · Immy Yousafzai",
  description,
  alternates: { canonical: "/research/log" },
  openGraph: { title: "Lab log · Research · Immy Yousafzai", description, url: "/research/log", type: "website" },
};

const STATUS: Record<Entry["status"], { label: string; tone: string }> = {
  pass: { label: "Passed", tone: "bg-[rgba(95,211,141,.12)] text-q-green" },
  watch: { label: "Watch list", tone: "bg-[rgba(242,184,75,.12)] text-q-amber" },
  killed: { label: "Failed", tone: "bg-[rgba(240,113,120,.12)] text-q-rose" },
  testing: { label: "Not scored yet", tone: "border border-q-edge2 text-q-muted" },
};

const day = (d: string) => new Date(d + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

export default function LabLog() {
  const log = entries as Entry[];
  const count = (s: Entry["status"]) => log.filter((e) => e.status === s).length;
  return (
    <>
      <Header />
      <main>
        <header className="wrap pb-10 pt-[clamp(40px,6vw,72px)]">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap gap-1.5 text-[13px] text-q-muted">
              <li><Link href="/">Home</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/research">Research</Link></li>
              <li aria-hidden>/</li>
              <li className="text-q-fg" aria-current="page">Lab log</li>
            </ol>
          </nav>
          <p className="eyebrow mt-10 text-q-blue">Strategy research · lab log</p>
          <h1 className="mt-5 max-w-[1000px] text-balance text-[clamp(38px,6vw,76px)] font-bold leading-[.98] tracking-[-0.045em]">
            Every idea tested, pass or fail
          </h1>
          <p className="mt-7 max-w-[760px] text-pretty text-[clamp(17px,1.6vw,19px)] leading-[1.6] text-q-body2">
            Each idea is written down with its pass mark before it is run, then scored after a real broker&apos;s costs against
            10,000 random entries with the same side, stop and target. A pass needs t above 3. The result line is the lab&apos;s
            verdict as it was logged. Numbers are the lab&apos;s own; tests of my own products are left out.
          </p>
          <p className="mt-6 font-mono text-[12px] text-q-muted">
            {log.length} ideas · {count("pass")} passed · {count("watch")} on the watch list · {count("killed")} failed · {count("testing")} not scored yet
          </p>
        </header>
        <section className="wrap pb-20">
          <ol>
            {log.map((e) => (
              <li key={e.n} id={`h${e.n}`} className="flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-q-line py-7">
                <div className="flex flex-[0_0_160px] flex-col gap-2">
                  <span className="font-mono text-xs text-q-faint">No. {e.n}</span>
                  <span className={`w-fit rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] ${STATUS[e.status].tone}`}>
                    {STATUS[e.status].label}
                  </span>
                </div>
                <div className="flex-[1_1_420px]">
                  <h2 className="text-[clamp(19px,2vw,23px)] font-bold leading-[1.25] tracking-[-0.02em] text-q-fg">{e.title}</h2>
                  {e.result && <p className="mt-2 max-w-[820px] text-pretty text-[15px] leading-[1.6] text-q-muted">{e.result}</p>}
                  <p className="mt-3 font-mono text-[11px] text-q-faint">
                    {e.written && <>Written {day(e.written)}</>}
                    {e.scored && <> · scored {day(e.scored)}</>}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </main>
      <Footer />
    </>
  );
}
