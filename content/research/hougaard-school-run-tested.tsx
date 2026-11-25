import raw from "./hougaard-school-run.json";
import { CategoryBars, YearBars } from "@/components/research/charts";
import { Bullets, Chips, Figure, Glossary, H3, IdeaCards, P, Section, Spec, StatsTable, Verdict, readingTerms } from "@/components/research/parts";

// The numbers come from the edge lab's hypotheses 101 (as corrected) and 102 (tools/school_run.py,
// school_run_fills.py and school_exits.py); the words are mine.
type Fixed = { form: string; stage1_r: number; stage1_t: number; holdout_r: number; holdout_t: number };
type Exit = { cell: string; trades: number; r: number; t: number; win: number };
const d = raw as unknown as {
  mark101: number;
  mark102: number;
  tries101: number;
  tries102: number;
  bugged: { stage1: { r: number; t: number }; holdout: { r: number; t: number } };
  second_trades: { stage1: number; holdout: number };
  first_trades: { stage1: number; holdout: number };
  impossible: { n: number; of: number };
  fixed: Fixed[];
  best_exits: Exit[];
  families: [string, number][];
  holdout_best: { days: number; r: number; t: number; years: Record<string, number> };
};
const sign = (x: number, k = 3) => (x > 0 ? "+" : x < 0 ? "−" : "") + Math.abs(x).toFixed(k);
const R = (x: number) => `${sign(x)}R`;
const tt = (x: number) => sign(x, 2).replace("+", "");
const hb = d.holdout_best;
const hyears = Object.keys(hb.years).map(Number);
const total = d.tries101 + d.tries102;

export const toc = [
  { id: "correction", label: "Correction" },
  { id: "who", label: "Who he is" },
  { id: "rules", label: "His written rules" },
  { id: "method", label: "How I tested" },
  { id: "entry", label: "The entry, with real fills" },
  { id: "exits", label: "480 exits" },
  { id: "claim", label: "The 10k to 50k claim" },
  { id: "takeaways", label: "What it teaches" },
];

export function Lede() {
  return (
    <>
      Tom Hougaard trades the DAX and FTSE in the London morning and the Dow and Nasdaq at the US open, and says he turned a £10,000
      account into many times that in 2025. His only written rules are breakouts of one bar soon after the open, with no exit rule. I
      tested them in {total} variations on ten years of tick data at Pepperstone&apos;s real spread: his stops, the exits he never gives,
      his overnight-range filter, his rule for adding to winners, and then 480 exits and ways of managing the trade. None of them has an
      edge. Whatever he makes, it isn&apos;t in the rules he has written down.
    </>
  );
}

export function Body() {
  return (
    <>
      <Section id="correction" title="A correction to the first version of this report">
        <P>
          This page first said one form passed: the DAX Advanced School Run with a fixed 0.33% stop and a 2R target, at{" "}
          {R(d.bugged.stage1.r)} a trade and t {d.bugged.stage1.t} on 2016 to 2022, and {R(d.bugged.holdout.r)} on 2023 to 2026. That
          was a bug in my backtest, found when I started building the version to run on a demo account.
        </P>
        <P>
          His rule places two stop orders, one above the bar and one below. When the first trade ended, my code filled the second order
          at its own price even when the market had already gone well past it. A long stopped out 0.33% down is already far below the
          sell stop, so that short could never have filled there. {d.impossible.n} of the {d.impossible.of.toLocaleString()} second
          trades began in a minute already past their level, and those trades carried the whole result: the first trades of the day made{" "}
          {R(d.first_trades.stage1)}, the second {R(d.second_trades.stage1)}. With the fill fixed, the pass is gone. A second, separate
          check of the code found the same bug.
        </P>
      </Section>

      <Section id="who" title="Who he is, and what he actually publishes">
        <P>
          Hougaard is a Danish trader based in the UK, the author of <em>Best Loser Wins</em> (2022), who streams his trading on YouTube and
          posts calls on Telegram. The book is about the trader&apos;s mind, not rules: assume you are wrong, never add to a loser, add to a
          winner, set no profit target. The concrete rules are in a few PDFs and slides of his own, and those are what I tested.
        </P>
      </Section>

      <Section id="rules" title="His written rules">
        <Bullets
          items={[
            <><strong>School Run (DAX, December 2022).</strong> Take the second 15-minute bar after the DAX cash open at 08:00 London: 08:15 to 08:30 London (09:15 to 09:30 Frankfurt, the same moment all year). Place a buy stop 2 points above its high and a sell stop 2 points below its low. Both can fill the same day. Stop: the other end of the bar, or a fixed 40 points. &quot;I do not have an exit rule!&quot;</>,
            <><strong>Advanced School Run (DAX, 2023).</strong> The same, on the fourth 5-minute bar, 08:15 to 08:20 London. The stop sits at the opposite order. &quot;This strategy does not operate with a target.&quot;</>,
            <><strong>Other markets (2025 slides).</strong> The School Run on the Dow and Nasdaq, and a &quot;1st bar&quot; setup on the FTSE&apos;s 5-minute chart, named but not defined.</>,
            <><strong>Adding to winners (2018 manual).</strong> Add at +75 points with the stop moved to entry, aiming for 225 points.</>,
            <><strong>The overnight filter (third parties only).</strong> If the bar sits above the 00:00 to 06:00 UK range, take longs only; below it, shorts only; inside it, fade. He shows research on it in his slides but never states the rule.</>,
          ]}
        />
      </Section>

      <Section id="method" title="How I tested">
        <Spec
          rows={[
            ["Data", "One-minute bars built from HistData and Dukascopy ticks: DAX, FTSE and Nasdaq from 2016. The Dow's ticks start in May 2024, too late to test fairly. The best exits were replayed on ten-second bars and agreed within 0.01R."],
            ["Costs", "Pepperstone's measured spread at those hours, charged on every lot: DAX 0.9 points, FTSE 1.2, Nasdaq 1.0."],
            ["Order", "Every variation and its pass mark written down and committed before any result was read."],
            ["Stages", "Everything scored on 2016 to 2022. Only the best candidate saw 2023 to October 2026."],
            ["The bar", `Beat entries at the same minute, side, stop and exit on the month's other days, by t above ${d.mark101} for the first ${d.tries101} variations and ${d.mark102} for the 480 exits: the lab's mark after about 1,800 ideas tried.`],
          ]}
        />
        <Glossary items={readingTerms.filter(([k]) => ["R", "t"].includes(k))} />
      </Section>

      <Section title="The verdict, at a glance">
        <Verdict
          items={[
            { k: "Variations tested", v: String(total), n: `${d.tries101} setups, stops, filters and adds, then 480 exits and ways of managing the trade on his DAX entry.` },
            { k: "Passed", v: "0", n: "The one early pass was a fill bug in my backtest. Fixed, it makes about nothing." },
            { k: "Best exit on unseen years", v: R(hb.r), n: `A trade after the spread, 2023 to October 2026, t ${tt(hb.t)} against random entries.` },
          ]}
        />
      </Section>

      <Section id="entry" title="The entry, with real fills">
        <Chips items={[{ label: `${d.tries101} variations`, tone: "plain" }, { label: "0 passed", tone: "fail" }]} />
        <P>
          The first round tried five setups (two DAX bars, two FTSE bars, the Nasdaq bar), his bar stop and a fixed 0.33% stop, three
          exits fixed in advance, his overnight filter both ways, and his adding rule. With his bar stop, his filter or his adding, nothing
          came near the bar even with the bug, and no FTSE form made money. The one apparent pass, on the DAX Advanced bar, looks like
          this with real fills, traded three ways:
        </P>
        <StatsTable
          table={{
            head: ["DAX Advanced School Run, 0.33% stop, 2R target", "2016 to 2022", "t", "2023 to 2026", "t"],
            rows: d.fixed.map((f) => [f.form, R(f.stage1_r), tt(f.stage1_t), R(f.holdout_r), tt(f.holdout_t)]),
          }}
        />
        <P>
          A few hundredths of an R a trade on the years it was chosen on, and nothing on the four years after. The overnight filter and the
          adding rule changed how results were spread, not their average.
        </P>
      </Section>

      <Section id="exits" title="480 ways to get out">
        <Chips items={[{ label: "480 exits", tone: "plain" }, { label: "0 passed", tone: "fail" }]} />
        <P>
          He gives an entry and no exit, so if he has an edge it may be in how he manages the trade. I kept his entry fixed (both DAX bars,
          the first fill only or both orders) and tried five stops, from his bar stop to ones sized by volatility, with 24 ways to manage
          each: fixed targets from 1R to 4R, break-even, trailing stops, bar trails, a chandelier, time exits, taking a half or thirds off,
          and adding once or twice.
        </P>
        <Figure title="Every way of managing the trade does about the same" sub={`Average t against random entries for each of the 24 managements, over its 20 cells, 2016 to 2022. The pass mark was ${d.mark102}.`}>
          <CategoryBars labels={d.families.map(([k]) => k)} values={d.families.map(([, v]) => v)} every={4} />
        </Figure>
        <P>
          The entry leans about 0.04R a trade above a random one under every exit, and no exit turns that lean into more. Exits change the
          shape: taking thirds off wins half the trades, a break-even stop one in seven. Adding raises the R a trade because it adds risk,
          and raises the random entries&apos; R just as much. The best five of 480:
        </P>
        <StatsTable
          table={{
            head: ["Best exits, 2016 to 2022", "Trades", "Per trade", "Win rate", "t against random"],
            rows: d.best_exits.map((e) => [e.cell, e.trades.toLocaleString(), R(e.r), `${Math.round(e.win * 100)}%`, e.t.toFixed(2)]),
          }}
        />
        <P>
          The best, t 3.09, is what luck gives the best of 480 tries. I still ran it once on 2023 to 2026, which it had never seen:{" "}
          {R(hb.r)} a trade over {hb.days} days.
        </P>
        <Figure title="The best exit on unseen years" sub="Thirds off at 1R, 2R and 3R on the DAX Advanced bar, first fill only. Average R a trade after the 0.9-point spread.">
          <YearBars Y={{ year: hyears, pnl: hyears.map((y) => hb.years[String(y)]), days: hyears.map(() => 0) }} unit="R" />
        </Figure>
      </Section>

      <Section id="claim" title="The 10k to 50k claim">
        <P>
          The challenge was real: a £10,000 account from 6 January 2025, traded partly on stream. His own figures, as one forum poster
          transcribed them, were about £42,000 including withdrawals by April, about £72,000 of value by June, and &quot;up 800%&quot; by July.
          I found no broker statement or audit, and the same poster counted most of the gains as made off stream. So the claim is his
          word, not evidence. If his results are real, they come from judgement this test can&apos;t copy: which days to trade, when to
          get out, when to flip.
        </P>
      </Section>

      <Section title="Every idea I tested">
        <IdeaCards
          items={[
            { title: "School Run as written (bar stop)", data: "DAX, 2016 to 2022", stats: [["Exits", "3 fixed"], ["Best t", "under 2.5"], ["Passed", "no"]], verdict: "Failed" },
            { title: "School Run, fixed stop", data: "DAX, 2016 to 2026", stats: [["Real fills", R(d.fixed[0].stage1_r)], ["Unseen years", R(d.fixed[0].holdout_r)], ["Passed", "no"]], verdict: "Failed" },
            { title: "FTSE first bar and 2nd bar", data: "FTSE, 2016 to 2022", stats: [["Variations", "12"], ["After spread", "about zero"], ["Passed", "0 of 12"]], verdict: "Failed" },
            { title: "Nasdaq School Run", data: "Nasdaq, 2016 to 2022", stats: [["Best, fixed", "+0.020R"], ["t", "1.90"], ["Passed", "no"]], verdict: "Failed" },
            { title: "Overnight-range filter", data: "DAX and FTSE, 2019 to 2022", stats: [["Variations", "48"], ["Fades", "lose"], ["Passed", "0 of 48"]], verdict: "Failed" },
            { title: "480 exits on his entry", data: "DAX, 2016 to 2026", stats: [["Best t", "3.09"], ["Unseen years", R(hb.r)], ["Passed", "0 of 480"]], verdict: "Failed" },
          ]}
        />
      </Section>

      <Section id="takeaways" title="What it teaches">
        <Bullets
          items={[
            <><strong>Test what a trader writes, not what he says.</strong> His public rules have no exit and no way to choose days. Written down and tested, the entry is close to a coin toss.</>,
            <><strong>An exit can&apos;t rescue an entry.</strong> 480 ways of getting out moved money between trades. None made the entry pay, because random entries managed the same way did as well.</>,
            <><strong>Check how every order fills.</strong> My one pass came from orders filled at prices the market had already left. A result that looks too good is a reason to check the fills before anything else.</>,
            <><strong>Count your tries.</strong> With {total} variations, a t of 3 is what luck gives. The bar rises with every try for that reason.</>,
          ]}
        />
        <p className="mt-2 border-t border-q-line pt-5 text-[13px] leading-[1.6] text-q-muted">
          Data: one-minute and ten-second bars built from HistData and Dukascopy ticks; costs from Pepperstone UK&apos;s recorded spreads.
          Hougaard&apos;s rules from his own published documents; the overnight filter from third parties. Every rule was written down before
          it was tested. Corrected on 25 November 2026. Research, not financial advice: past results don&apos;t promise future ones.
        </p>
      </Section>
    </>
  );
}
