import raw from "./bill-williams-trading-chaos-tested.json";
import { CategoryBars, CumBand, YearBars, type Cum } from "@/components/research/charts";
import { Bullets, Chips, Figure, Glossary, H3, IdeaCards, P, Section, Spec, StatsTable, Steps, Verdict, readingTerms } from "@/components/research/parts";

// The numbers come from the edge lab's runs of hypotheses 77 and 78 (tools/fruit.py and tools/fruit_campaign.py there),
// exported by scripts/trading-chaos.py; the words are mine.
type Run = { n: number; days: number; mean: number; median: number; twin: number; t_own: number; t_vs_twin: number; median_nights: number;
  entries: Record<string, number>; ends: Record<string, number> };
type Years = { year: number[]; mean: number[]; days: number[] };
const d = raw as unknown as {
  h77: { variants: { name: string; n: number; hit_pct: number; mean: number; twin: number; t_own: number; t_vs_twin: number }[]; chosen: string };
  h78: {
    charts: Record<"H1" | "H4" | "D1", Run>;
    h4_out: Run & { by_pair: Record<string, number> };
    h4_by_entries: { entries: number; n: number; mean: number; total: number }[];
    h4_without_best: { drop: number; mean: number; t_vs_twin: number }[];
    h4_best: number[]; h4_total: number;
    h4_halves: { span: string; n: number; mean: number; t_vs_twin: number }[];
    h4_years: Years; h4_out_years: Years; h4_cum: Cum; h4_out_cum: Cum;
  };
};
const num = (v: number, k: number) => (v > 0 ? "+" : v < 0 ? "−" : "") + Math.abs(v).toFixed(k);
const R = (v: number, k = 3) => num(v, k) + "R";
const t = (v: number) => num(v, 2).replace("+", "");
const n0 = (v: number) => v.toLocaleString("en-US");
const { charts: ch, h4_out: out } = d.h78;
const h4 = ch.H4;
const v77 = d.h77.variants;
const variantName = (s: string) => (s.startsWith("golden") ? "Golden only, " : "Every signal, ") + s.split(" ")[1] + " target";
const best5 = d.h78.h4_best.reduce((a, b) => a + b, 0);
const w5 = d.h78.h4_without_best.find((w) => w.drop === 5)!;
const w10 = d.h78.h4_without_best.find((w) => w.drop === 10)!;
const five = d.h78.h4_by_entries.find((e) => e.entries === 5)!;
const two = d.h78.h4_by_entries.find((e) => e.entries === 2)!;
const [half1, half2] = d.h78.h4_halves;
const outLosingYears = d.h78.h4_out_years.mean.filter((v) => v < 0).length;
const outLosingPairs = Object.values(out.by_pair).filter((v) => v < 0).length;

export const toc = [
  { id: "why", label: "Why I tested it" },
  { id: "reading", label: "How to read it" },
  { id: "method-rules", label: "The method" },
  { id: "first-try", label: "The entry alone" },
  { id: "campaign", label: "The full campaign" },
  { id: "h4", label: "The one pass" },
  { id: "scope", label: "What it doesn't show" },
  { id: "takeaways", label: "What to take from it" },
];

export function Lede() {
  return (
    <>
      Bill Williams&apos; Trading Chaos gave MetaTrader its Alligator, its Awesome Oscillator and its fractals, and gave traders the three
      Wise Men: a reversal bar to get in, two signals to add on, and the Alligator&apos;s red line to get out. I wrote the whole method
      down as fixed rules and tested it on nine forex pairs, first as a simple entry and then as the full pyramided campaign, against
      random starts managed exactly the same way. It failed on every chart I tried.
    </>
  );
}

export function Body() {
  return (
    <>
      <Section id="why" title="Why I tested it">
        <P>
          Trading Chaos is a widely read trading book, and its tools ship with every copy of MetaTrader.
          The idea is appealing: markets move in chaotic waves, most of the time the Alligator sleeps, and when it wakes you get in early on a
          reversal bar, add as momentum and breakouts confirm, and ride the trend until price closes back through the red line. Small
          losses on the false starts, a few big trends to pay for them.
        </P>
        <P>
          That last sentence is what makes it hard to judge by eye. A method built to lose small and win big will always have a handful of
          spectacular charts to show. The question is whether the entries find those trends more often than chance would, or whether the
          money management alone produces them. So I tested the entry, then the full campaign, against random starts with the same
          management.
        </P>
      </Section>

      <Section id="reading" title="How to read this report">
        <Glossary
          items={[
            ...readingTerms.filter(([k]) => ["t"].includes(k)),
            ["R", "A trade's or campaign's profit divided by the first entry's risk at one lot. A campaign that adds 4 lots and is stopped out can lose 5R or more; one that rides a trend with all five entries can make 80R."],
            ["Campaign", "Everything from the first entry to the last exit: the first trade and every add-on, closed together."],
            ["Random twins", "For every real campaign, ten random ones in the same pair, month and hour, with the same side and stop distance, then managed by the very same rules: same add-ons, sizes, stops, trail and exits. If the real entries can't beat them, the Wise Man entry adds nothing."],
            ["In sample, out of sample", "Rules are scored first on one span of years. Only a rule that passes there is read, once, on later years it has never seen."],
          ]}
        />
      </Section>

      <Section title="At a glance">
        <Chips items={[{ label: "Failed", tone: "fail" }, { label: "Nine FX pairs, H1, H4 and D1, 2005 to 2026" }]} />
        <Verdict
          items={[
            { k: "Charts that passed", v: "0 of 3", n: "The full campaign on hourly, four-hour and daily charts. A pass needs beating random twins at t above 3 in sample, then again on unseen years." },
            { k: "Four-hour, unseen years", v: R(out.mean), n: `a campaign over ${n0(out.n)} campaigns, 2021 to 2026, t ${t(out.t_vs_twin)} against its twins. It had passed on 2005 to 2015.` },
            { k: "The entry alone", v: "0 of 4", n: `versions with a fixed target lost on the hourly chart, ${R(Math.max(...v77.map((v) => v.mean)))} to ${R(Math.min(...v77.map((v) => v.mean)))} a trade, and did worse than random entries.` },
          ]}
        />
      </Section>

      <Section id="method-rules" title="The method, as I coded it">
        <P>
          The rules come from Trading Chaos, 2nd edition, with the gaps filled from Williams&apos; earlier book New Trading Dimensions and
          clearly labelled choices where no source gives a number. Shorts are the mirror of longs.
        </P>
        <Spec
          rows={[
            ["1st Wise Man", "A bullish divergent bar: a lower low that closes in the top third of its range, a low at least as low as two bars back, wholly below the Alligator's three lines, the Awesome Oscillator falling, price falling more steeply than the Alligator's jaw, and the bar stretched at least 2 ATR below its 20-bar average. A buy stop 1 point above its high, standing 3 bars; the stop 1 point below its low."],
            ["2nd Wise Man", "After the first fill, the first three Awesome Oscillator bars of the trade's colour after a colour change. A buy stop 1 point above the third bar's high."],
            ["3rd Wise Man", "A five-bar up fractal above the red line (the Alligator's teeth). A buy stop 1 point above it; a newer fractal replaces it."],
            ["Sizes", "Entries in the order they fill: 1, 4, 3, 2 and 1 lots, five at most."],
            ["Stop", "One stop for the campaign, moved at each add-on to just beyond the latest opposite fractal, only ever in the trade's favour."],
            ["Trail", "Once a bar closes wholly beyond a 2.25 ATR band, the stop trails each bar's extreme and no more entries are added."],
            ["Exit", "Once the Alligator has opened in the trade's direction, the first close back beyond the red line closes everything. An opposite divergent bar that fills reverses the campaign."],
          ]}
        />
        <P>
          The divergent bar I tested is stricter than the book&apos;s, which asks only for a close in the top half: the extra filters pick
          the stretched, exhausted bars the method is meant to catch. I found no add-on sizes in the book; 1-4-3-2-1 is a commonly taught
          reverse pyramid. Angulation has no numeric rule in any source, so it is a fixed slope test, written down before any data was read.
        </P>
      </Section>

      <Section id="first-try" title="First try: the entry with a fixed target">
        <P>
          The simplest test of the 1st Wise Man is to take every divergent bar with its own stop and a fixed target of 1R or 2R. I ran
          four versions on hourly charts of the nine pairs, 2016 to 2020, on tick data at Pepperstone&apos;s recorded spreads and
          commission, each trade against ten random entries in the same hour and month with the same side, stop and target.
        </P>
        <StatsTable
          table={{
            head: ["Version", "Trades", "Target hit", "R per trade", "Random twins", "t vs twins"],
            rows: v77.map((v) => [variantName(v.name), n0(v.n), `${v.hit_pct.toFixed(1)}%`, num(v.mean, 3), num(v.twin, 3), t(v.t_vs_twin)]),
          }}
        />
        <P>
          Every version lost, in every year, on every pair, long and short. And every one did worse than random entries with the same
          stop and target. A 1R target needs to be hit more than half the time; the divergent bar&apos;s breakout hit it about 30% of the
          time. The reversal bar tends to break out and then turn back.
        </P>
        <P>
          The fair objection is that nobody trades Trading Chaos with a fixed target. The method is the campaign: small first entry, adding
          as the trend confirms, holding to the red line. So I tested that next, on years the first test had not read.
        </P>
      </Section>

      <Section id="campaign" title="The full campaign">
        <Steps
          items={[
            { title: "Write it down first", text: "The rules above, the sizes, the three charts and the pass mark were committed to my lab before any of these years were read." },
            { title: "Use years the entry test hadn't touched", text: "OANDA's recorded one-minute quotes for the nine pairs, 2005 to 2015 to score, and 2021 to September 2026 kept back. 2016 to 2020 was left out because the first test had used it." },
            { title: "Walk every order minute by minute", text: "Every stop order, add-on, trailing stop and red-line exit is followed through one-minute prices, so the order of events inside a bar is known. Where one minute reaches both a stop and an order, the stop counts first." },
            { title: "Charge a real broker's costs", text: "Pepperstone's median spread at the minute of each fill and exit, plus commission on every lot. No swap: the lab has no history of overnight rates, and four-hour campaigns hold about a night." },
            { title: "Give every campaign ten twins", text: "Each real campaign gets ten random starts, same pair, month, hour, side and stop distance, then run by exactly the same management. The t compares each day's campaigns with their twins." },
            { title: "Apply the bar", text: "To pass, a chart must make money and beat its twins at t above 3 in sample, then do it again on the unseen years, then on four pairs kept back for a final check." },
          ]}
        />
        <StatsTable
          table={{
            head: ["Chart", "Campaigns", "R per campaign", "Median", "Random twins", "t vs twins", "Nights held"],
            rows: [
              ...(["H1", "H4", "D1"] as const).map((k) => {
                const c = ch[k];
                return [`${k}, 2005 to 2015`, n0(c.n), num(c.mean, 3), num(c.median, 2), num(c.twin, 3), t(c.t_vs_twin), c.median_nights.toFixed(1)];
              }),
              ["H4, 2021 to 2026 (unseen)", n0(out.n), num(out.mean, 3), num(out.median, 2), num(out.twin, 3), t(out.t_vs_twin), out.median_nights.toFixed(1)],
            ],
          }}
        />
        <P>
          The typical campaign loses about 1R: the first lot is stopped out and nothing is added. The management itself is expensive, and
          the twins lose too. On the hourly and daily charts, the real campaigns lost money and their lead over random starts was well
          within luck (t {t(ch.H1.t_vs_twin)} and {t(ch.D1.t_vs_twin)}). Both failed at the first step, so their later years were never read.
        </P>
      </Section>

      <Section id="h4" title="The four-hour chart: one pass, carried by five trades">
        <H3>It passed in sample</H3>
        <P>
          On four-hour charts the campaign made <strong>{R(h4.mean)}</strong> a campaign from 2005 to 2015 and beat its twins at
          t <strong>{t(h4.t_vs_twin)}</strong>, above the bar. On paper, that is the pass Trading Chaos promises.
        </P>
        <Figure title="Four-hour campaigns, 2005 to 2015: running total in R" sub="The real campaigns against the average of their ten random twins, managed the same way."
          legend={[{ label: "The campaigns", kind: "s1line" }, { label: "Random twins, average", kind: "s2line" }]}>
          <CumBand D={d.h78.h4_cum} />
        </Figure>

        <H3>Look at where the money came from</H3>
        <P>
          Most campaigns never add. {n0(h4.entries["1"])} of {n0(h4.n)} ended with the first lot, mostly at its stop. Campaigns that took
          one add-on, the 4-lot one, lost {R(two.mean, 2)} on average: the biggest lot goes on second, and when the move fails it is
          stopped with the rest. The {n0(five.n)} campaigns that reached all five entries made {R(five.mean, 1)} each and carry the
          whole result.
        </P>
        <Figure title="Four-hour campaigns by entries reached, 2005 to 2015" sub="Average R per campaign, by how many of the five entries filled.">
          <CategoryBars
            labels={d.h78.h4_by_entries.map((e) => String(e.entries))}
            values={d.h78.h4_by_entries.map((e) => e.mean)}
            unit="R"
            highlight={d.h78.h4_by_entries.map((e, i) => (e.mean > 0 ? i : -1)).filter((i) => i >= 0)}
          />
        </Figure>
        <StatsTable
          table={{
            head: ["Entries reached", "Campaigns", "R each", "R in all"],
            rows: d.h78.h4_by_entries.map((e) => [String(e.entries), n0(e.n), num(e.mean, 2), num(e.total, 0)]),
          }}
        />
        <P>
          The best five campaigns of {n0(h4.n)} made {num(best5, 0)}R between them, more than the {num(d.h78.h4_total, 0)}R all of them
          made together. Take those five out and the campaign loses ({R(w5.mean)}); take out ten and its lead over the twins drops to
          t {t(w10.t_vs_twin)}, below the bar. It also faded with time: {R(half1.mean)} a campaign before mid-2010, {R(half2.mean)} after, with
          2011 to 2013 all losing.
        </P>
        <Figure title="Four-hour campaigns by calendar year, 2005 to 2015" sub="Average R per campaign.">
          <YearBars Y={{ year: d.h78.h4_years.year, pnl: d.h78.h4_years.mean, days: d.h78.h4_years.days }} unit="R" />
        </Figure>

        <H3>Then it failed on years it had never seen</H3>
        <P>
          A pass resting on five trends from before 2010 is exactly what the unseen years are for. On 2021 to September 2026, read once,
          the same campaign lost <strong>{R(out.mean)}</strong> a campaign, and its lead over the twins was t <strong>{t(out.t_vs_twin)}</strong>:
          noise. It lost in {outLosingYears} of {d.h78.h4_out_years.year.length} years and on {outLosingPairs} of 9 pairs. That is a fail, so
          the four pairs kept back for the final check were never read.
        </P>
        <Figure title="Four-hour campaigns, 2021 to September 2026: running total in R" sub="Unseen years. The real campaigns against the average of their ten random twins."
          legend={[{ label: "The campaigns", kind: "s1line" }, { label: "Random twins, average", kind: "s2line" }]}>
          <CumBand D={d.h78.h4_out_cum} />
        </Figure>
      </Section>

      <Section title="Every form I tested">
        <IdeaCards
          items={[
            { title: "Divergent bar, fixed 1R or 2R target", data: `Nine FX pairs, hourly, 2016 to 2020, four versions`, stats: [["R per trade", `${num(Math.max(...v77.map((v) => v.mean)), 2)} to ${num(Math.min(...v77.map((v) => v.mean)), 2)}`], ["t vs twins", `${t(Math.min(...v77.map((v) => v.t_vs_twin)))} to ${t(Math.max(...v77.map((v) => v.t_vs_twin)))}`], ["Target hit", `${Math.min(...v77.map((v) => v.hit_pct)).toFixed(0)}% to ${Math.max(...v77.map((v) => v.hit_pct)).toFixed(0)}%`]], verdict: "Failed" },
            { title: "Full campaign, hourly", data: `Nine FX pairs, 2005 to 2015, ${n0(ch.H1.n)} campaigns`, stats: [["R per campaign", num(ch.H1.mean, 3)], ["t vs twins", t(ch.H1.t_vs_twin)], ["Twins", num(ch.H1.twin, 3)]], verdict: "Failed" },
            { title: "Full campaign, four-hour", data: `Passed 2005 to 2015; failed 2021 to 2026, ${n0(out.n)} campaigns`, stats: [["R per campaign", num(out.mean, 3)], ["t vs twins", t(out.t_vs_twin)], ["Twins", num(out.twin, 3)]], verdict: "Failed" },
            { title: "Full campaign, daily", data: `Nine FX pairs, 2005 to 2015, ${n0(ch.D1.n)} campaigns`, stats: [["R per campaign", num(ch.D1.mean, 3)], ["t vs twins", t(ch.D1.t_vs_twin)], ["Twins", num(ch.D1.twin, 3)]], verdict: "Failed" },
          ]}
        />
      </Section>

      <Section id="scope" title="What this doesn't show">
        <P>
          A failed test kills the rules it tested, on the markets and years it read. It does not prove Trading Chaos can never work. What
          was tested, and what wasn&apos;t:
        </P>
        <Bullets
          items={[
            <><strong>Markets:</strong> nine forex pairs (EURUSD, GBPUSD, USDJPY, AUDUSD, USDCAD, USDCHF, NZDUSD, EURJPY, GBPJPY). Not indices, gold, commodities or stocks, where trends may run differently.</>,
            <><strong>Charts and years:</strong> the entry alone on hourly charts, 2016 to 2020; the campaign on hourly, four-hour and daily charts, 2005 to 2015, and four-hour again on 2021 to 2026.</>,
            <><strong>My reading of the book:</strong> a stricter divergent bar than the book&apos;s, a fixed angulation test, a 3-bar life for the first order, 1-4-3-2-1 sizes and the red-line exit. Williams also offers an optional squat-bar filter and a stop trailed under the last 3 to 5 bars, which I did not test.</>,
            <><strong>Costs:</strong> spread and commission are charged; overnight swap isn&apos;t. On four-hour charts a campaign holds about a night, so swap would move the result by a few hundredths of an R.</>,
          ]}
        />
        <P>
          What it does show is narrower and more useful: on forex, this way of getting in did no better than getting in at random and
          managing the trade the same way. Whatever the campaign makes in a good trend, it is the management and the trend doing it, not the
          Wise Man.
        </P>
      </Section>

      <Section id="takeaways" title="What to take from it">
        <Bullets
          items={[
            <><strong>Test the entry against random entries with the same management.</strong> A pyramid that holds to a trailing exit will catch big trends from almost any start. The only question is whether your entry beats random ones.</>,
            <><strong>Count how many trades carry the result.</strong> Five campaigns out of almost 3,000 made more than the whole test. A result like that is one lucky decade away from a loss.</>,
            <><strong>Big add-ons cut both ways.</strong> With 4 lots going on second, a failed second entry can cost up to five times the first loss, and most second entries fail.</>,
            <><strong>Keep years back.</strong> The four-hour pass looked real on 2005 to 2015. Only years it had never seen showed it wasn&apos;t.</>,
          ]}
        />
        <p className="mt-2 border-t border-q-line pt-5 text-[13px] leading-[1.6] text-q-muted">
          Data: HistData tick quotes, 2016 to 2020, for the entry test; OANDA&apos;s recorded one-minute quotes, 2005 to 2015 and 2021 to
          September 2026, for the campaign; costs from Pepperstone UK&apos;s recorded spreads and commission. Random twins use fixed seeds.
          Research, not financial advice: past results don&apos;t promise future ones.
        </p>
      </Section>
    </>
  );
}
