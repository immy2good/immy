import raw from "./hougaard-school-run.json";
import { YearBars } from "@/components/research/charts";
import { Bullets, Chips, Figure, Glossary, H3, IdeaCards, P, Section, Spec, StatsTable, Verdict, readingTerms } from "@/components/research/parts";

// The numbers come from the edge lab's hypothesis 101 (tools/school_run.py); the words are mine.
type Cell = { trades: number; days: number; r_net: number; t_twins: number; t_net: number; win: number };
const d = raw as unknown as {
  cells: Record<string, Cell & { years: Record<string, number> }>;
  best_years: Record<string, number>;
  holdout: Cell;
  second_feed: { trades: number; r_net: number; t_twins: number; same_days_main: { r_net: number; t_twins: number } };
  neighbours: { name: string; r_net: number; t_twins: number }[];
  holdout_slip: { r_net: number; t_net: number };
  mark: number;
  tries: number;
};
const c = d.cells;
const best = c["DAX ASR P T"];
const ho = d.holdout;
const sign = (x: number, k = 3) => (x > 0 ? "+" : x < 0 ? "−" : "") + Math.abs(x).toFixed(k);
const R = (x: number) => `${sign(x)}R`;
const years = Object.keys(d.best_years).map(Number);

const SETUPS: [string, string][] = [
  ["DAX SR", "DAX School Run (2nd 15-min bar)"],
  ["DAX ASR", "DAX Advanced School Run (4th 5-min bar)"],
  ["FTSE FB", "FTSE first 5-min bar"],
  ["FTSE SR", "FTSE 2nd 15-min bar"],
  ["NAS SR", "Nasdaq 2nd 15-min bar"],
];

export const toc = [
  { id: "who", label: "Who he is" },
  { id: "rules", label: "His written rules" },
  { id: "method", label: "How I tested" },
  { id: "grid", label: "82 variations" },
  { id: "winner", label: "The one that passed" },
  { id: "checks", label: "Trying to break it" },
  { id: "claim", label: "The 10k to 50k claim" },
  { id: "takeaways", label: "What it teaches" },
];

export function Lede() {
  return (
    <>
      Tom Hougaard trades the DAX and FTSE in the London morning and the Dow and Nasdaq at the US open, and says he turned a £10,000
      account into many times that in 2025. His only written rules are breakouts of one bar soon after the open, with no exit rule. I wrote
      them down as fixed rules, added the exits he never gives, his overnight-range filter and his rule for adding to winners, and tested
      82 variations on ten years of tick data at Pepperstone&apos;s real spread. Most failed. One passed, and kept passing on four years it had
      never seen.
    </>
  );
}

export function Body() {
  return (
    <>
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
            ["Data", "One-minute bars built from HistData and Dukascopy ticks: DAX and FTSE from 2016, Nasdaq from 2016. The Dow's ticks start in May 2024, too late to test fairly, so it is left out."],
            ["Costs", "Pepperstone's measured spread at those hours, charged once a round trip: DAX 0.9 points, FTSE 1.2, Nasdaq 1.0."],
            ["Exits", "He gives none, so I fixed three before testing: out at the session's close; a target at twice the risk (2R); or the stop to break-even at +1R."],
            ["Stops", "Bar: at the opposite order, his Advanced rule. Fixed: 0.33% of price, his 40 points when the DAX was at 12,000."],
            ["Order", "Every variation and the pass mark written down and committed before any result was read."],
            ["Stages", "All 82 scored on 2016 to 2022. Only a pass would see 2023 to October 2026, and only once."],
            ["The bar", `Beat entries at the same minute, side, stop and exit on the month's other days, by t above ${d.mark}: the lab's mark after about 1,300 ideas tried.`],
          ]}
        />
        <Glossary items={readingTerms.filter(([k]) => ["R", "t"].includes(k))} />
      </Section>

      <Section title="The verdict, at a glance">
        <Verdict
          items={[
            { k: "Variations tested", v: String(d.tries), n: "Five setups, two stops, three exits, the overnight filter two ways, and his adding rule." },
            { k: "Passed", v: "1", n: "The DAX Advanced School Run with a fixed 0.33% stop and a 2R target." },
            { k: "On unseen years", v: R(ho.r_net), n: `A trade after the spread, 2023 to October 2026, t ${ho.t_twins.toFixed(2)} against random entries.` },
          ]}
        />
      </Section>

      <Section id="grid" title="82 variations: what failed, and why">
        <Chips items={[{ label: "81 below the bar", tone: "fail" }, { label: "1 passed", tone: "pass" }]} />
        <P>Each cell is the average R a trade after the spread, then t against random entries, on 2016 to 2022. The bar-stop forms with a 2R target did no better than those shown.</P>
        <StatsTable
          table={{
            head: ["Setup", "Bar stop, out at close", "Fixed stop, out at close", "Fixed stop, 2R", "Fixed stop, break-even"],
            rows: SETUPS.map(([k, name]) => [
              name,
              ...["B E", "P E", "P T", "P BE"].map((m) => `${sign(c[`${k} ${m}`].r_net)} · ${c[`${k} ${m}`].t_twins.toFixed(2)}`),
            ]),
          }}
        />
        <Bullets
          items={[
            <><strong>The School Run as he writes it fails.</strong> With the stop at the other end of the bar, 15 to 30 points on the DAX, the noise after the open stops it out too often. The best bar-stop form makes {R(c["DAX ASR B BE"].r_net)} at t {c["DAX ASR B BE"].t_twins.toFixed(2)}.</>,
            <><strong>The FTSE has nothing.</strong> Every FTSE form is near zero or below after its 1.2-point spread.</>,
            <><strong>The overnight filter adds nothing.</strong> Trading only with the range&apos;s side keeps a sixth of the trades and no form reaches t 2. Fading inside the range loses in every form with a target: inside the range the breakout runs on too.</>,
            <><strong>Adding to winners adds nothing.</strong> One more lot at +0.625% with the stop at entry changes how results are spread, not their average (DAX Advanced {R(c["DAX ASR B E add"].r_net)}, t {c["DAX ASR B E add"].t_twins.toFixed(2)}). The lab found the same when it pyramided another strategy&apos;s trades.</>,
            <><strong>The fixed stop is what matters.</strong> Every DAX and Nasdaq form with the 0.33% stop is positive. Only one clears the bar.</>,
          ]}
        />
      </Section>

      <Section id="winner" title="The one that passed">
        <Chips items={[{ label: "First stage passed", tone: "pass" }, { label: "Holdout passed", tone: "pass" }]} />
        <H3>The rule</H3>
        <Bullets
          items={[
            <>At 08:20 London, take the 08:15 to 08:20 five-minute DAX bar (09:15 to 09:20 in Frankfurt; the two clocks change on the same dates, so it is the same bar all year).</>,
            <>Buy stop 2 points above its high, sell stop 2 points below its low. Both can fill the same day, one after the other.</>,
            <>Stop 0.33% of price from entry (about 80 points at 24,000). Target twice that. Otherwise out at 16:29 London, as the DAX cash session closes.</>,
          ]}
        />
        <StatsTable
          table={{
            head: ["DAX Advanced School Run, fixed stop, 2R", "Trades", "Per trade after spread", "Win rate", "t against random"],
            rows: [
              ["2016 to 2022 (tested on)", best.trades, R(best.r_net), `${Math.round(best.win * 100)}%`, best.t_twins.toFixed(2)],
              ["2023 to Oct 2026 (unseen, read once)", ho.trades, R(ho.r_net), `${Math.round(ho.win * 100)}%`, ho.t_twins.toFixed(2)],
            ],
          }}
        />
        <Figure title="Per trade by year" sub="Average R a trade after a 0.9-point spread. 2016 to 2022 were tested on; 2023 to 2026 were unseen until the rule was fixed.">
          <YearBars Y={{ year: years, pnl: years.map((y) => d.best_years[String(y)]), days: years.map(() => 0) }} unit="R" />
        </Figure>
        <P>
          Every one of the eleven years is above zero, and the four unseen years are better than the seven it was chosen on. That&apos;s rare.
          Most rules that clear a first test fade on new data.
        </P>
      </Section>

      <Section id="checks" title="Trying to break it">
        <Bullets
          items={[
            <><strong>A second version of the code.</strong> I wrote the rule again as a plain loop, separately. Same {best.trades.toLocaleString()} trades, same {R(best.r_net)}.</>,
            <><strong>The broker&apos;s own prices.</strong> On Pepperstone&apos;s recorded GER40 one-minute bars, January 2025 to October 2026: {d.second_feed.trades} trades, {R(d.second_feed.r_net)}, t {d.second_feed.t_twins.toFixed(2)}. Our tick data on the same days: {R(d.second_feed.same_days_main.r_net)}.</>,
            <><strong>Slippage.</strong> A stop order at the open can fill worse than its level. Charging 2 extra points a trade leaves {R(d.holdout_slip.r_net)} on the unseen years.</>,
            <><strong>Nearby settings.</strong> It is not one lucky number: {d.neighbours.slice(0, 4).map((n) => `${n.name.toLowerCase()} ${R(n.r_net)}`).join(", ")}, all positive with t above 4.7.</>,
          ]}
        />
        <P>
          What I can&apos;t yet measure from one-minute bars is how a real stop order fills in the first minutes of the DAX. The next step is
          a forward run on a demo account, which the lab asks of every pass before real money.
        </P>
      </Section>

      <Section id="claim" title="The 10k to 50k claim">
        <P>
          The challenge was real: a £10,000 account from 6 January 2025, traded partly on stream. His own figures, as one forum poster
          transcribed them, were about £42,000 including withdrawals by April, about £72,000 of value by June, and &quot;up 800%&quot; by July.
          I found no broker statement or audit, and the same poster counted most of the gains as made off stream. So the claim is his
          word, not evidence. The test above doesn&apos;t rest on it.
        </P>
      </Section>

      <Section title="Every idea I tested">
        <IdeaCards
          items={[
            { title: "School Run as written (bar stop)", data: "DAX, 2016 to 2022, 6 variations", stats: [["Best per trade", R(c["DAX ASR B BE"].r_net)], ["Best t", c["DAX ASR B BE"].t_twins.toFixed(2)], ["Passed", "0 of 6"]], verdict: "Failed" },
            { title: "School Run, fixed stop", data: "DAX, 2016 to 2022, 6 variations", stats: [["Best per trade", R(best.r_net)], ["Best t", best.t_twins.toFixed(2)], ["Passed", "1 of 6"]], verdict: "Passed", pass: true },
            { title: "FTSE first bar and 2nd bar", data: "FTSE, 2016 to 2022, 12 variations", stats: [["Best per trade", R(c["FTSE FB P BE"].r_net)], ["Best t", c["FTSE FB P BE"].t_twins.toFixed(2)], ["Passed", "0 of 12"]], verdict: "Failed" },
            { title: "Nasdaq School Run", data: "Nasdaq, 2016 to 2022, 6 variations", stats: [["Best per trade", R(c["NAS SR P E"].r_net)], ["Best t", c["NAS SR P T"].t_twins.toFixed(2)], ["Passed", "0 of 6"]], verdict: "Below the bar" },
            { title: "Overnight-range filter", data: "DAX and FTSE, 2019 to 2022, 48 variations", stats: [["Best t", c["DAX ASR P BE F1"].t_twins.toFixed(2)], ["Fades", "lose"], ["Passed", "0 of 48"]], verdict: "Failed" },
            { title: "Adding to winners", data: "DAX, 2016 to 2022, 4 variations", stats: [["Best t", c["DAX ASR B E add"].t_twins.toFixed(2)], ["Effect", "shape only"], ["Passed", "0 of 4"]], verdict: "Failed" },
          ]}
        />
      </Section>

      <Section id="takeaways" title="What it teaches">
        <Bullets
          items={[
            <><strong>Test what a trader writes, not what he says.</strong> His public rules have no exit, so his own results can&apos;t be copied. Fixing simple exits in advance made them testable.</>,
            <><strong>The stop can matter more than the entry.</strong> The same entry lost with a tight stop and paid with a wide one. Noise after the open kills tight stops.</>,
            <><strong>Filters and adding rarely make an edge.</strong> His overnight filter and his pyramid changed nothing that the plain rule didn&apos;t already do.</>,
            <><strong>Count your tries.</strong> With 82 variations, a t of 3 means little. This one cleared 4.97 and then held up on four unseen years, which is why I take it seriously.</>,
          ]}
        />
        <p className="mt-2 border-t border-q-line pt-5 text-[13px] leading-[1.6] text-q-muted">
          Data: one-minute bars built from HistData and Dukascopy ticks; Pepperstone&apos;s recorded GER40 bars for the second check; costs
          from Pepperstone UK&apos;s recorded spreads. Hougaard&apos;s rules from his own published documents; the overnight filter from third
          parties. Every rule was written down before it was tested. Research, not financial advice: past results don&apos;t promise future
          ones.
        </p>
      </Section>
    </>
  );
}
