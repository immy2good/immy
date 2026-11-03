import Link from "next/link";

const homeLinks = [
  { href: "#work", label: "Work" },
  { href: "#case", label: "Case study" },
  { href: "#about", label: "About" },
  { href: "#stack", label: "Stack" },
  { href: "#writing", label: "Writing" },
  { href: "#contact", label: "Contact" },
];

const pageLinks = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#writing", label: "Writing" },
  { href: "/#contact", label: "Contact" },
];

// Sticky top bar. `home` uses in-page anchors; other pages link back to the home sections.
export function Header({ home = false }: { home?: boolean }) {
  const links = home ? homeLinks : pageLinks;
  return (
    <nav aria-label="Main" className="sticky top-0 z-10 border-b border-q-line bg-[rgba(8,9,11,.86)] backdrop-blur-[10px]">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-7 gap-y-3.5 py-5">
        <Link href={home ? "#top" : "/"} className="text-[17px] font-bold tracking-[-0.01em]">
          Immy Yousafzai
        </Link>
        <div className="flex flex-wrap gap-x-[26px] gap-y-2 text-sm text-q-muted">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-q-muted">
          <span className="anim-pulse h-[7px] w-[7px] rounded-full bg-q-live" aria-hidden />
          Available · UK remote
        </div>
      </div>
    </nav>
  );
}
