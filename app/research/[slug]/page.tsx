import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { reports, getReport } from "@/lib/research";
import { bodies } from "@/content/research";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return reports.map((r) => ({ slug: r.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const report = getReport((await params).slug);
  if (!report) return {};
  const title = `${report.short} · Research · Immy Yousafzai`;
  return {
    title,
    description: report.summary,
    alternates: { canonical: `/research/${report.slug}` },
    openGraph: { title, description: report.summary, url: `/research/${report.slug}`, type: "article", publishedTime: report.date },
    twitter: { card: "summary_large_image", title, description: report.summary },
  };
}

export default async function ResearchPage({ params }: Props) {
  const report = getReport((await params).slug);
  const body = report && bodies[report.slug];
  if (!report || !body) notFound();
  const { Lede, Body, toc } = body;
  const date = new Date(report.date + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

  return (
    <>
      <Header />
      <main>
        <header className="mx-auto max-w-[880px] px-[clamp(20px,4vw,48px)] pb-12 pt-[clamp(40px,6vw,72px)]">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap gap-1.5 text-[13px] text-q-muted">
              <li><Link href="/">Home</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/research">Research</Link></li>
              <li aria-hidden>/</li>
              <li className="text-q-fg" aria-current="page">{report.short}</li>
            </ol>
          </nav>
          <p className="eyebrow mt-10 text-q-blue">{report.eyebrow}</p>
          <h1 className="mt-5 text-balance text-[clamp(36px,5.4vw,64px)] font-bold leading-[1] tracking-[-0.045em]">{report.title}</h1>
          <p className="mt-7 text-pretty text-[clamp(17px,1.6vw,19px)] leading-[1.6] text-q-body2">
            <Lede />
          </p>
          <p className="mt-6 font-mono text-[12px] text-q-muted">
            <time dateTime={report.date}>{date}</time> · Immy Yousafzai
          </p>
          <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-2">
            {toc.map((t) => (
              <a key={t.id} href={`#${t.id}`} className="rounded-full border border-q-edge2 px-3 py-1 text-[13px] text-q-body2">
                {t.label}
              </a>
            ))}
          </nav>
        </header>
        <Body />
      </main>
      <Footer />
    </>
  );
}
