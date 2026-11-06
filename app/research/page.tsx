import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { reports } from "@/lib/research";

export const metadata: Metadata = {
  title: "Strategy research · Immy Yousafzai",
  description:
    "Trading ideas put through one strict test: written down first, real broker costs, random-entry Monte Carlo and t above 3. What held up, what didn't, and why.",
  alternates: { canonical: "/research" },
};

export default function ResearchIndex() {
  return (
    <>
      <Header />
      <main>
        <header className="wrap pb-10 pt-[clamp(40px,6vw,72px)]">
          <p className="eyebrow text-q-blue">Strategy research</p>
          <h1 className="mt-5 max-w-[1000px] text-balance text-[clamp(38px,6vw,76px)] font-bold leading-[.98] tracking-[-0.045em]">
            Trading ideas, tested the hard way
          </h1>
          <p className="mt-7 max-w-[760px] text-pretty text-[clamp(17px,1.6vw,19px)] leading-[1.6] text-q-body2">
            Every idea is written down before it&apos;s tested, run on recorded broker quotes at real costs, and set against 10,000
            random-entry histories. I publish what fails as well as what holds up.
          </p>
        </header>
        <section className="wrap pb-20">
          {reports.map((r) => (
            <Link key={r.slug} href={`/research/${r.slug}`} className="group flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-q-line py-7 text-q-fg">
              <span className="flex-[0_0_160px] font-mono text-xs text-q-blue">{r.date}</span>
              <div className="flex-[1_1_420px]">
                <div className="text-[clamp(22px,2.4vw,28px)] font-bold tracking-[-0.02em] group-hover:text-q-blue">{r.title}</div>
                <p className="mt-2 max-w-[760px] text-[15px] leading-[1.6] text-q-muted">{r.summary}</p>
              </div>
              <span className="text-xl text-q-muted" aria-hidden>→</span>
            </Link>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
