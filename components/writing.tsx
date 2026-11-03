const items = [
  {
    kicker: "TradingView · 2014 →",
    title: "Published scripts + ideas",
    detail: "243 ideas, 11 scripts and 1.6K followers since December 2014",
    href: "https://www.tradingview.com/u/iTradeAIMS/",
    img: { src: "/images/tradingview-idea.webp", alt: "A published iTradeAIMS idea on TradingView", cls: "w-32 aspect-video" },
  },
  {
    kicker: "YouTube",
    title: "iTradeAIMS channel",
    detail: "539 videos, 4.67K subscribers. Most watched: How to Count Elliott Wave within 10 Seconds, 128K views",
    href: "https://www.youtube.com/@iTradeAIMS",
    img: { src: "/images/youtube-popular.webp", alt: "Most watched videos on the iTradeAIMS YouTube channel", cls: "w-32 aspect-video" },
  },
  {
    kicker: "Book · Amazon",
    title: "The 10 Seconds Elliott Wave",
    detail: "How to count Elliott Waves within 10 seconds or less. Kindle edition.",
    href: "https://www.amazon.co.uk/10-Seconds-Elliott-Wave-within-ebook/dp/B0C4FZZNX6",
    img: { src: "/images/book-cover.webp", alt: "The 10 Seconds Elliott Wave book cover", cls: "w-16 aspect-[938/1500]" },
  },
];

export function Writing() {
  return (
    <section id="writing" className="scroll-mt-[72px] border-t border-q-line">
      <div className="wrap flex flex-wrap gap-x-12 gap-y-6 py-[clamp(64px,8vw,104px)]">
        <h2 className="flex-[1_1_220px] text-[32px] font-bold tracking-[-0.03em]">Writing &amp; teaching</h2>
        <div className="flex-[3_1_560px]">
          {items.map((w) => (
            <a
              key={w.href}
              href={w.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-q-line py-[22px] text-q-fg"
            >
              <span className="flex-[0_0_180px] font-mono text-xs text-q-blue">{w.kicker}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={w.img.src}
                alt={w.img.alt}
                loading="lazy"
                className={`flex-none self-center rounded object-cover object-top shadow-[0_8px_24px_rgba(0,0,0,.5)] ${w.img.cls}`}
              />
              <div className="flex-[1_1_280px]">
                <div className="text-[22px] font-bold tracking-[-0.02em] group-hover:text-q-blue">{w.title}</div>
                <div className="mt-1 text-[15px] text-q-muted">{w.detail}</div>
              </div>
              <span className="text-xl text-q-muted" aria-hidden>
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
