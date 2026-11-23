import raw from "./scalping-tested.json";
import { CategoryBars, YearBars } from "@/components/research/charts";
import { Bullets, Chips, Figure, Glossary, H3, IdeaCards, P, Section, Spec, StatsTable, Verdict, readingTerms } from "@/components/research/parts";

// The numbers come from the edge lab's runs (tools/scalp.py, scalp2.py and scalp3.py, exported by
// tools/mirror/report/scalp.py); the words are mine.
type Variant = { id: string; name: string; trades: number; net_bps: number; gross_pts: number; t_twins: number; t_own: number };
type Pooled = { hold: string; trades: number; gross_bps: number; net_bps: number; t_twins: number; long_bps: number; short_bps: number };
const d = raw as unknown as {
  variants: Variant[];
  europe_open: Record<"after_fall" | "every_day" | "after_rise", { trades: number; net_bps: number; t_twins: number }>;
  europe_open_years: Record<string, number>;
  pooled: Pooled[];
  costs: { market: string; spread: number; move30: number; move2h: number; cost30_pct: number; cost2h_pct: number }[];
};
const v = Object.fromEntries(d.variants.map((x) => [x.id, x])) as Record<string, Variant>;
const years = Object.keys(d.europe_open_years).map(Number);
const eo = d.europe_open;
const [p30, p2h] = d.pooled;
const sign = (x: number, k = 2) => (x > 0 ? "+" : x < 0 ? "−" : "") + Math.abs(x).toFixed(k);

export const toc = [
  { id: "why", label: "Why scalping" },
  { id: "method", label: "How I tested" },
  { id: "round-one", label: "Four fades" },
  { id: "round-two", label: "A flow and two models" },
  { id: "round-three", label: "Other markets" },
  { id: "why-it-failed", label: "Why nothing paid" },
  { id: "takeaways", label: "What it teaches" },
];

export function Lede() {
  return (
    <>
      Scalping promises many small wins a day. I set out to find two or three scalping rules on the DAX that make money after a real
      broker&apos;s costs, with no attachment to any indicator, using ten years of five-minute bars built from tick data. I wrote every rule
      down before testing it, charged the real spread, and kept the last two years aside to check any winner once. Twenty-one tries
      later, nothing had earned its spread. This is what I tested, and why it failed.
    </>
  );
}

export function Body() {
  return (
    <>
      <Section id="why" title="Why scalping, and why the DAX">
        <P>
          The DAX is a favourite of scalpers: it moves fast, trades for most of the day, and a retail broker such as Pepperstone quotes it
          at 0.9 points from 08:00 to 22:00 Frankfurt time. That is about one basis point (a hundredth of a percent) of the index. If any
          market should leave a scalper something, it is this one.
        </P>
        <P>
          I didn&apos;t start from chart patterns. Each idea had a reason someone else must trade at a known moment and pay to do it
          quickly: the opening and closing auctions, the overnight gap, a sudden large bar, dealers&apos; inventory after the US close. Those
          are the places where a short-term edge has come from in published research.
        </P>
      </Section>

      <Section id="method" title="How I tested">
        <Spec
          rows={[
            ["Data", "DAX five-minute bars built from tick data, 2016 to October 2026: about 664,000 bars. Gold, NAS100 and US500 from 2020 for the last round."],
            ["Costs", "1.2 points a round trip on the DAX: Pepperstone's measured 0.9-point spread plus 0.3 for slippage. Each market's own spread and commission elsewhere."],
            ["Order", "Every rule and its pass mark written down and committed before any result was read."],
            ["Stages", "Ideas were scored on 2016 to 2022. Only a survivor would see 2023 and 2024, and only after that the 2025 to 2026 holdout, once."],
            ["The bar", "Beat random entries at the same clock time, side and exit, by a margin that allows for how many ideas I tried: t above 3.45 for the first 16 tries, rising as the count grew."],
          ]}
        />
        <P>
          The last rule matters most. Try enough variations and one will look good by luck. So each test counts against the total, and
          the bar rises with every try. Because nothing passed the first stage, the 2023 to 2026 data is still untouched for every one of
          these ideas.
        </P>
        <Glossary
          items={[
            ["Basis point (bps)", "A hundredth of a percent of the price. On a DAX of 24,000, one point is about 0.4 bps."],
            ...readingTerms.filter(([k]) => ["t", "Random histories", "Breaks even at"].includes(k)),
          ]}
        />
      </Section>

      <Section title="The verdict, at a glance">
        <Verdict
          items={[
            { k: "Scalping variants tested", v: "21", n: "Eight ideas: four fades, a published flow, a seasonal procedure and two machine-learning models." },
            { k: "Passed", v: "0", n: "None beat random entries by enough, and most lost money before any spread was paid." },
            { k: "Best gross edge", v: `${v["83_after_fall"].gross_pts.toFixed(1)} pts`, n: "Per trade, before costs: long the DAX's first hour after a fall into the US close. Still short of the bar." },
          ]}
        />
      </Section>

      <Section id="round-one" title="Round one: four fades">
        <Chips items={[{ label: "16 variants", tone: "plain" }, { label: "16 failed", tone: "fail" }]} />
        <P>Each fade bets that a burst of one-sided trading overshoots and partly comes back. Four bursts, each in four variants:</P>
        <Bullets
          items={[
            <><strong>The first 15 minutes of Xetra.</strong> Research on S&amp;P futures found a big opening move tends to reverse. On the DAX it didn&apos;t: big opening moves kept going. The strongest version lost {Math.abs(v["79c"].net_bps).toFixed(1)} bps a trade. That&apos;s no reason to trade the other way either. One of sixteen tries looking that strong is what luck gives.</>,
            <><strong>The overnight gap.</strong> Fade the gap between yesterday&apos;s 17:30 close and today&apos;s 09:00 open, aiming for the close, with a stop one gap away. It lost in all four versions, and none beat random entries.</>,
            <><strong>An extreme five-minute bar.</strong> A bar three or four times the usual size, faded for 15 or 30 minutes. It did come back a little, but by half a point at best, under half the spread.</>,
            <><strong>The closing auction.</strong> Index funds trade at the 17:30 auction; the idea was that their push reverses afterwards. On big days it came back about a point. The spread is 1.2.</>,
          ]}
        />
        <Figure title="What each variant earned before costs" sub="Average DAX points per trade, 2016 to 2022, before any spread. Only the blue bar, the best idea of the whole study (from round two), clears the 1.2-point round trip.">
          <CategoryBars
            labels={d.variants.map((x) => (x.id === "83_after_fall" ? "83" : x.id))}
            values={d.variants.map((x) => x.gross_pts)}
            unit=""
            highlight={[d.variants.findIndex((x) => x.id === "83_after_fall")]}
          />
        </Figure>
        <P>
          The 1.2-point cost doesn&apos;t fit on the chart&apos;s scale for the opening fades, which lost far more than that. The rest sit between
          about −2 and +1 point, while the spread is 1.2. One bar clears it (labelled 83, from round two), and even that isn&apos;t enough, as below.
        </P>
      </Section>

      <Section id="round-two" title="Round two: a known flow and two procedures">
        <Chips items={[{ label: "3 failed", tone: "fail" }, { label: "1 lead, below the bar" }]} />
        <H3>The DAX&apos;s first hour after a fall into the US close</H3>
        <P>
          A 2023 study of S&amp;P 500 futures found the index&apos;s best hour is Europe&apos;s open, and mostly after the US market has fallen
          into its close: dealers are left holding stock, and are paid for it when Europe arrives. I tested it on the DAX itself: long from
          08:00 to 09:00 Frankfurt whenever the DAX fell in the last US hour the day before.
        </P>
        <StatsTable
          table={{
            head: ["The DAX, 08:00 to 09:00", "Days", "Per trade after costs", "t against random"],
            rows: [
              ["After a fall into the US close (the rule)", eo.after_fall.trades, `${sign(eo.after_fall.net_bps)} bps`, eo.after_fall.t_twins.toFixed(2)],
              ["Every day", eo.every_day.trades, `${sign(eo.every_day.net_bps)} bps`, eo.every_day.t_twins.toFixed(2)],
              ["After a rise", eo.after_rise.trades, `${sign(eo.after_rise.net_bps)} bps`, eo.after_rise.t_twins.toFixed(2)],
            ],
          }}
        />
        <P>
          The DAX shows the study&apos;s pattern: up after a fall, down after a rise, flat over every day. After costs it makes money in five of
          seven years. But t {eo.after_fall.t_twins.toFixed(2)} is far short of the bar, and at twice the cost almost nothing is left. It is the
          closest thing to an edge in this study, and not one I would trade.
        </P>
        <Figure title="Long the first hour after a US-close fall, by year" sub="Average per trade after a 1.2-point round trip, in basis points, 2016 to 2022.">
          <YearBars Y={{ year: years, pnl: years.map((y) => d.europe_open_years[String(y)]), days: years.map(() => 0) }} unit="" />
        </Figure>
        <H3>Two procedures that learn only from the past</H3>
        <Bullets
          items={[
            <><strong>Time-of-day seasonality.</strong> Each year, trade any half hour of the DAX day whose direction, after the spread, had held up in every earlier year. From 2019 to 2022 it never found one to trade. The DAX has no clock pattern that survives a one-point spread.</>,
            <><strong>A machine-learning model.</strong> A gradient-boosted classifier on fourteen features of recent price, volatility and tick activity, retrained each year on the years before, predicting the next 30 minutes. It leaned the right way (t {v["85"].t_twins.toFixed(2)} against random) but was worth {v["85"].gross_pts.toFixed(2)} points a trade, under a quarter of the spread.</>,
          ]}
        />
      </Section>

      <Section id="round-three" title="Round three: other markets, longer holds">
        <Chips items={[{ label: "2 failed", tone: "fail" }]} />
        <P>
          If the DAX&apos;s spread is the problem, maybe another market is cheaper. I measured each spread against the size of a typical move
          over the hold:
        </P>
        <StatsTable
          table={{
            head: ["Market", "Spread", "Typical 30-min move", "Spread as % of it", "As % of a 2-hour move"],
            rows: d.costs.map((c) => [c.market === "XAUUSD" ? "Gold" : c.market, c.spread, c.move30.toFixed(1), `${c.cost30_pct}%`, `${c.cost2h_pct}%`]),
          }}
        />
        <P>
          The DAX is already the cheapest. Forex is worse once commission is added. So a cheaper market doesn&apos;t help; only a longer hold
          shrinks the cost against the move. I trained one model on all four markets together and tested it on 2023 and 2024, years it had
          never seen.
        </P>
        <StatsTable
          table={{
            head: ["Pooled model, 2023 to 2024", "Trades", "Before costs", "After costs", "t against random"],
            rows: [
              ["30-minute holds", p30.trades, `${sign(p30.gross_bps)} bps`, `${sign(p30.net_bps)} bps`, p30.t_twins.toFixed(2)],
              ["2-hour holds", p2h.trades, `${sign(p2h.gross_bps)} bps`, `${sign(p2h.net_bps)} bps`, p2h.t_twins.toFixed(2)],
            ],
          }}
        />
        <P>
          At 30 minutes it lost before costs. At two hours it made a little, but its longs made {sign(p2h.long_bps)} bps and its shorts{" "}
          {sign(p2h.short_bps)}: the gain was the markets&apos; rise over those two years, not a forecast.
        </P>
      </Section>

      <Section title="Every idea I tested">
        <IdeaCards
          items={[
            { title: "Fade a big first 15 minutes of Xetra", data: "DAX, 2016 to 2022, 4 variants", stats: [["Best per trade", `${sign(v["79a"].net_bps)} bps`], ["Big moves", "kept going"], ["Passed", "0 of 4"]], verdict: "Failed" },
            { title: "Fill the overnight gap at the open", data: "DAX, 2016 to 2022, 4 variants", stats: [["Best per trade", `${sign(v["80d"].net_bps)} bps`], ["Best t vs random", v["80d"].t_twins.toFixed(2)], ["Passed", "0 of 4"]], verdict: "Failed" },
            { title: "Fade an extreme five-minute bar", data: "DAX, 2016 to 2022, 4 variants", stats: [["Best before costs", `${sign(v["81d"].gross_pts)} pts`], ["Spread", "1.2 pts"], ["Passed", "0 of 4"]], verdict: "Failed" },
            { title: "Fade the closing auction", data: "DAX, 2016 to 2022, 4 variants", stats: [["Best before costs", `${sign(v["82c"].gross_pts)} pts`], ["Spread", "1.2 pts"], ["Passed", "0 of 4"]], verdict: "Failed" },
            { title: "Long the first hour after a US-close fall", data: "DAX, 2016 to 2022", stats: [["Per trade", `${sign(eo.after_fall.net_bps)} bps`], ["t vs random", eo.after_fall.t_twins.toFixed(2)], ["Twice costs", "t 0.58"]], verdict: "Below the bar", pass: true },
            { title: "Half-hour seasonality, walk-forward", data: "DAX, 2019 to 2022", stats: [["Half hours found", "0"], ["Trades", "0"], ["Passed", "no"]], verdict: "Failed" },
            { title: "Machine-learning model, 30 minutes", data: "DAX, 2019 to 2022", stats: [["Before costs", `${sign(v["85"].gross_pts)} pts`], ["t vs random", v["85"].t_twins.toFixed(2)], ["After costs", `${sign(v["85"].net_bps)} bps`]], verdict: "Failed" },
            { title: "Pooled model, four markets", data: "DAX, NAS100, US500, gold, 2023 to 2024", stats: [["30-min holds", `${sign(p30.gross_bps)} bps gross`], ["2-hour holds", `${sign(p2h.net_bps)} bps net`], ["t vs random", p2h.t_twins.toFixed(2)]], verdict: "Failed" },
          ]}
        />
      </Section>

      <Section id="why-it-failed" title="Why nothing paid">
        <P>
          Over 5 to 60 minutes, the best of these ideas moved price by 0 to 2 points a trade in their favour, and most by less than nothing.
          The round trip costs 1.2. On a typical 30-minute DAX move of about 17 points, the spread takes 5%. So a scalp has to be right
          noticeably more often than a coin toss just to break even, and none of these signals was.
        </P>
        <P>
          The problem isn&apos;t a lack of clever signals. Five-minute prices and tick counts are what every trader and every algorithm sees.
          Whatever they once predicted has been traded away down to less than the spread. A short-term edge needs information others
          don&apos;t have, or costs others can&apos;t get.
        </P>
      </Section>

      <Section id="takeaways" title="What it teaches">
        <Bullets
          items={[
            <><strong>Work out the cost against the move before the signal.</strong> At one basis point a trade, a five-minute scalp needs a hit rate few signals have. Do this sum before building anything.</>,
            <><strong>A burst of trading rarely overshoots by more than the spread.</strong> Big bars, opening moves and auction pushes did not come back by enough to pay.</>,
            <><strong>Machine learning doesn&apos;t make an edge where there is none.</strong> Two models, retrained on the past only, found a lean too small to trade.</>,
            <><strong>Count your tries.</strong> One variant out of sixteen looked like a real effect (big opening moves running on). Allowing for how many I tried, it was luck.</>,
            <><strong>Where to look next:</strong> data most traders don&apos;t use, such as real buy-and-sell order flow, how far news releases land from forecasts, and options positions around expiry. The 2023 to 2026 data is still clean for that work.</>,
          ]}
        />
        <p className="mt-2 border-t border-q-line pt-5 text-[13px] leading-[1.6] text-q-muted">
          Data: DAX five-minute bars built from HistData and Dukascopy ticks; Pepperstone&apos;s recorded five-minute bars for NAS100, US500 and
          gold; costs from Pepperstone UK&apos;s recorded spreads. Every rule was written down before it was tested. Research, not financial
          advice: past results don&apos;t promise future ones.
        </p>
      </Section>
    </>
  );
}
