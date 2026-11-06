import raw from "./three-strategies.json";
import {
  CostChart, Dist, EquityChart, Fan, Histogram, ProfileChart, EdgeChart, YearBars,
  type CostCurve, type Edge, type Equity, type MonteCarlo, type Profile, type RandomRun, type Years,
} from "@/components/research/charts";
import { Bullets, Chips, Dumbbell, Figure, Glossary, H3, P, Pair, Section, Spec, StatsTable, Steps, Verdict, readingTerms } from "@/components/research/parts";

// The numbers come from the edge lab's runs (tools/mirror/report/build.py writes this json); the words are mine.
type Table = { head: string[]; rows: string[][] };
const d = raw as unknown as {
  facts: Record<string, string>;
  tables: Record<"gotobi" | "gotobi_pairs" | "noise" | "crosses" | "crosses_pairs", Table>;
  lookback: { looks: { name: string; seen: number; got: number }[] };
  data: {
    gotobi: { profile: Profile; random_usdjpy: RandomRun; random_crosses: RandomRun; cost_usdjpy: CostCurve & { charged: number };
      mc_usdjpy: MonteCarlo; usdjpy: { equity: Equity; by_year: Years } };
    noise: { random: RandomRun; equity: Equity; session_hist: MonteCarlo["dd_hist"]; by_year: Years; mc: MonteCarlo; cost_curve: CostCurve; cost_points: number };
    crosses: { edge_by_year: Edge; random_whole: RandomRun; equity: Equity; mc: MonteCarlo; cost_curve: CostCurve; fee_today: number };
  };
};
const f = d.facts;
const G = d.data.gotobi, N = d.data.noise, X = d.data.crosses;
const randLegend = [{ label: "Random histories", kind: "s2" as const }, { label: "The rule", kind: "s1line" as const }];
const eqLegend = [{ label: "Total", kind: "s1line" as const }, { label: "Below the last high", kind: "s2wash" as const }];

export const toc = [
  { id: "why", label: "Why I did this" },
  { id: "reading", label: "How to read it" },
  { id: "method", label: "How I tested them" },
  { id: "gotobi", label: "1. Gotobi" },
  { id: "noise-band", label: "2. The noise band" },
  { id: "cross-reversion", label: "3. Cross reversion" },
  { id: "look-back", label: "Short look backs" },
  { id: "next", label: "What's next" },
];

export function Lede() {
  return (
    <>
      Over the past months I&apos;ve put more than sixty trading ideas through the same strict test. Most of them failed, some very
      popular ones included. Three held up well enough to build and keep testing. This is what I did, how I did it and what I found.
      Every chart here comes straight from the test runs.
    </>
  );
}

export function Body() {
  return (
    <>
      <Section id="why" title="Why I did this">
        <P>
          I&apos;ve been building trading software and teaching traders since 2011. In that time I&apos;ve seen the same pattern again
          and again: a strategy looks brilliant on a chart or in a backtest, and then it falls apart with real money. Usually nothing was
          wrong with the code. The test was too kind. It left out the spread, it was tuned on the same data it was judged on, or it rode a
          rising market and called that an edge.
        </P>
        <P>
          So I built myself a small research lab with one job: to be hard on ideas before any money depends on them. Any idea can go in,
          whether it&apos;s from a paper, a YouTube video, my own indicators or a popular trading rule. Each one gets written down first,
          tested the same way, and given a verdict that stays on record, pass or fail.
        </P>
        <P>
          This report is the first I&apos;m publishing. It covers the three strategies that came through best, and I&apos;ve kept the
          weak spots in. One of them is real but no longer pays enough to trade, and I say so. The point isn&apos;t to sell a system.
          It&apos;s to show what holds up when you test honestly, and how you can test your own ideas the same way.
        </P>
      </Section>

      <Section id="reading" title="How to read this report">
        <P>A few terms come up throughout. You don&apos;t need a statistics background, just these:</P>
        <Glossary items={readingTerms.filter(([k]) => k !== "R")} />
      </Section>

      <Section title="The three, at a glance">
        <Verdict
          items={[
            { k: "1. Gotobi round trip", v: `t ${f.G_U_T}`, n: "USDJPY, 2016 to 2026, after Pepperstone's costs. Beat all 10,000 random runs, then passed again on four yen crosses I'd kept back." },
            { k: "2. Noise band, NAS100", v: `t ${f.N_T}`, n: "2016 to 2026 on OANDA's quotes; 2.99 and 2.53 on two other data feeds. Beat all 10,000 random runs." },
            { k: "3. Cross reversion", v: `t ${f.X_T}`, n: "AUDCAD, AUDNZD and NZDCAD since 2004. The edge is real, but since 2012 it barely covers the costs." },
          ]}
        />
      </Section>

      <Section id="method" title="How I tested them">
        <P>Every idea went through the same steps, and I don&apos;t change a rule once its test has started.</P>
        <Steps
          items={[
            { title: "I write the idea down first", text: "The exact rule and the result it needs to pass go into my lab's log before I run anything. That stops me tuning the rule to the data afterwards." },
            { title: "Recorded broker quotes and real costs", text: "I test on OANDA's recorded one-minute quotes going back to 2003 and 2004, and charge Pepperstone UK's own spread at the minute of each trade, taken from its recorded tick data, plus commission and overnight financing." },
            { title: "One unit for every market", text: "I measure each trade in “normal days”: its profit divided by the market's normal daily move. Size each trade so a normal day's move is 1% of the account, and +0.10 means +0.1% of the account. Every percentage on this page uses that sizing." },
            { title: "Monte Carlo test 1: random entries", text: "For each strategy I build 10,000 fake histories. Every real trade is swapped for a random one in the same market, month and direction, held the same way and charged the same costs. If the strategy doesn't beat at least 99% of them, its profit came from the market, not from its timing." },
            { title: "The bar is t above 3", text: "I try a lot of ideas. At t 2, about one idea in forty passes by luck alone; at t 3 it's about one in seven hundred." },
            { title: "Markets kept back", text: "Before testing I set aside markets I don't look at. A rule that passes gets exactly one try on them." },
            { title: "More than one data feed", text: "An edge that shows up on one feed only is usually a quirk of that feed. Where I can, I check on OANDA, HistData and Dukascopy." },
            { title: "Monte Carlo test 2: simulated years", text: "I resample each strategy's own trading days since 2016 into 10,000 simulated years: the range a year can bring, the chance of a losing year and how deep the drawdowns go." },
            { title: "The last two years, then the future", text: "I check whether each strategy still worked from October 2024 to September 2026. Nobody has looked at the months after that; they get traded on a demo account first." },
          ]}
        />
      </Section>

      <Section id="gotobi" title="1. Gotobi: the yen into the Tokyo fix">
        <Chips items={[{ label: "Passed every test", tone: "pass" }, { label: "USDJPY, EURJPY, GBPJPY, CHFJPY" }]} />
        <P>
          On the 5th, 10th, 15th, 20th and 25th and the last day of each month, Japanese companies settle their bills. Importers need
          dollars, and banks fill a lot of that demand at the Tokyo fix at 9:55. Traders call these gotobi days, and the old story is that
          USDJPY drifts up into the fix and gives some back after it. I tested it as a round trip: buy at 03:00 Tokyo time, switch to
          short at the 9:55 fix, and close at noon.
        </P>
        <Figure
          title="The average gotobi morning, 2016 to 2026"
          sub="USDJPY from 03:00 Tokyo in normal days, before costs. The band is the 95% range of the gotobi average."
          legend={[{ label: `Gotobi days (${f.G_PROF_DAYS})`, kind: "s1line" }, { label: `Other days (${f.G_PROF_ODAYS})`, kind: "s2line" }, { label: "95% range", kind: "s1wash" }]}
        >
          <ProfileChart P={G.profile} />
        </Figure>
        <P>
          On gotobi mornings USDJPY rose by <strong>{f.G_PROF_FIX}</strong> of a normal day from 03:00 to the fix, against{" "}
          <strong>{f.G_PROF_OTHER}</strong> on other mornings, and gave back about half of it by noon. The flow is there, and it keeps time.
        </P>
        <Spec
          rows={[
            ["Days", "The 5th, 10th, 15th, 20th and 25th and the last day of each month, Tokyo dates. When Tokyo is shut that day, the business day before. Tuesday to Friday only."],
            ["Trade", "Buy at 03:00 Tokyo (18:00 UTC the evening before). At 09:55 Tokyo (00:55 UTC), close the long and sell. Close the short at 12:00 Tokyo (03:00 UTC). No stop and no target."],
            ["Server time", "On a broker server at New York + 7 hours: 21:00, 03:55 and 06:00 in the US summer; 20:00, 02:55 and 05:00 in the US winter."],
            ["Costs", "Pepperstone's spread at those minutes, 0.007% commission per side, and one night's financing."],
          ]}
        />
        <H3>Monte Carlo test 1: is it the timing or the market?</H3>
        <P>
          On USDJPY from 2016 the round trip made <strong>{f.G_U_MEAN}</strong> of a normal day per trade after costs, t {f.G_U_T}. Its
          10,000 random twins, the same round trip at random times in the same months, averaged {f.G_U_RAND}, and not one of them did as
          well. I&apos;d kept four yen crosses back and never looked at them. Tested once, they made {f.G_C_MEAN} against {f.G_C_RAND} for
          random, and beat all 10,000 again.
        </P>
        <Figure title="The rule against 10,000 random histories" sub="Average per trade after costs, in normal days." legend={randLegend}>
          <Pair
            left={{ title: "USDJPY, 2016 to 2026", node: <Histogram R={G.random_usdjpy} label="USDJPY" /> }}
            right={{ title: "Four crosses kept back, 2005 to 2026", node: <Histogram R={G.random_crosses} label="Crosses" /> }}
          />
        </Figure>
        <H3>What it earned</H3>
        <StatsTable table={d.tables.gotobi} />
        <Figure title="USDJPY round trip, running total in % of the account" sub="Each trade sized so a normal day's move is 1% of the account; no compounding. The shaded part is the last two years." legend={eqLegend}>
          <EquityChart E={G.usdjpy.equity} />
        </Figure>
        <Figure title="USDJPY round trip by calendar year" sub="% of the account; 2026 runs to September.">
          <YearBars Y={G.usdjpy.by_year} />
        </Figure>
        <P>
          Ten of its eleven years made money. 2017, 2018 and 2022 were the strongest. 2023 lost a little, and since then it has made about{" "}
          {f.G_RECENT_YEAR} a year at this size, under half its earlier pace. The crosses did better than USDJPY over those same years.
        </P>
        <H3>Monte Carlo test 2: what one year can look like</H3>
        <P>
          I drew 10,000 years of {f.G_MC_N} gotobi days each, at random and with replacement, from USDJPY&apos;s days since 2016. The median
          year made <strong>{f.G_MC_MED}</strong>. Nine years in ten landed between {f.G_MC_P5} and {f.G_MC_P95}, and{" "}
          <strong>{f.G_MC_PLOSS}</strong> of them lost money. The deepest drawdown inside a year was typically {f.G_MC_DD50}, and one year
          in twenty went to {f.G_MC_DD5} or worse.
        </P>
        <Figure title="10,000 simulated years of the USDJPY round trip" sub="Left: the median year, the middle 50% and 90% of years, and 40 single years. Right: the deepest drawdown inside each simulated year.">
          <Pair
            left={{ title: "Running total, % of the account", node: <Fan M={G.mc_usdjpy} /> }}
            right={{ title: "Deepest drawdown in the year", node: <Dist H={G.mc_usdjpy.dd_hist} xlab="% of the account" /> }}
          />
        </Figure>
        <P>
          Trading all five yen pairs, each at a fifth of the size, gave a median year of {f.G_MCB_MED}, and {f.G_MCB_PLOSS} of years lost
          money. The weak pairs drag that basket down, so USDJPY on its own is the better reference.
        </P>
        <H3>How much cost it can carry</H3>
        <P>
          Pepperstone&apos;s all-in round trip on USDJPY is about <strong>{f.G_COST} pips</strong> today, most of it commission. Since 2016
          the round trip keeps t above 3 up to about {f.G_COST_T3} pips, and stays profitable up to about {f.G_COST_ZERO}. The crosses cost
          more, about 3.5 to 6 pips; the table shows what each pair can carry.
        </P>
        <Figure title="USDJPY: t as the round-trip cost rises" sub="Each trade's own Pepperstone cost scaled together, shown in pips at today's prices, 2016 to 2026.">
          <CostChart C={G.cost_usdjpy} unit="pips" marks={[{ x: G.cost_usdjpy.charged, label: `Pepperstone ${G.cost_usdjpy.charged.toFixed(1)}` }]} />
        </Figure>
        <StatsTable table={d.tables.gotobi_pairs} />
        <H3>What I found</H3>
        <Bullets
          items={[
            <><strong>It&apos;s real.</strong> Three data feeds agree on USDJPY (t 4.77 on OANDA, 4.63 on HistData, 4.34 on Dukascopy&apos;s recorded bid and ask), the crosses I&apos;d kept back passed, and the same hours on other days lose a little.</>,
            <><strong>It still works.</strong> In the last two years it made money on all five pairs, and CHFJPY alone cleared t 3 in those two years.</>,
            <><strong>The long into the fix does most of the work.</strong> Before costs it makes {f.G_LONG} of a normal day a trade, and the short after the fix {f.G_SHORT}.</>,
            <><strong>Costs decide it.</strong> My first version bought at 08:00 Tokyo. In winter that&apos;s an hour after the broker&apos;s daily rollover, when spreads are still wide, and the spread took most of the gain (t 2.93, short of the bar). Starting at 03:00 Tokyo avoids that hour and catches more of the move.</>,
            <><strong>NZDJPY is the weak pair.</strong> It barely covers its costs, so I&apos;d leave it out.</>,
          ]}
        />
      </Section>

      <Section id="noise-band" title="2. The noise band on NAS100">
        <Chips items={[{ label: "Just short of the bar on my main test" }, { label: "NAS100" }]} />
        <P>
          This one comes from Zarattini, Aziz and Barbon&apos;s 2024 paper “Beat the Market”, which traded SPY. Most of the day&apos;s
          movement is noise. When price breaks out of the range it normally moves in by that time of day, someone with size is pushing,
          and the move tends to run. You ride it with a trailing stop and close at the end of the day.
        </P>
        <Spec
          rows={[
            ["Session", "NYSE days, 09:30 to 16:00 New York (13:00 on early closes)."],
            ["Band", "For each minute of the session, sigma is the average absolute move from the open to that minute over the 14 sessions before. Upper band: the higher of today's open and yesterday's close, times (1 + sigma). Lower band: the lower of the two, times (1 − sigma)."],
            ["Entry", "At 10:00, 10:30 and every half hour to 15:30, when flat: above the upper band, buy; below the lower band, sell."],
            ["Exit", "At the same checks, close a long below the higher of the upper band and the session's VWAP, and a short above the lower of the lower band and the VWAP. It can re-enter at a later check. Flat at the close."],
            ["Costs", "1.8 points a round trip at today's prices, more than Pepperstone charges in US hours."],
          ]}
        />
        <H3>Monte Carlo test 1</H3>
        <P>
          From 2016 to September 2026 it made <strong>{f.N_MEAN}</strong> of a normal day per session it traded, t {f.N_T}. In the 10,000
          random histories each trade was replaced by one on the same side, entered at a random half-hour check of a random session in the
          same month and managed the same way. They averaged {f.N_RAND}, and the rule beat all of them.
        </P>
        <Figure title="The rule against 10,000 random histories" sub="Average per session after costs, in normal days." legend={randLegend}>
          <Histogram R={N.random} label="The noise band" />
        </Figure>
        <H3>What it earned</H3>
        <StatsTable table={d.tables.noise} />
        <Figure title="NAS100 noise band, running total in % of the account" sub="Each trade sized so a normal day's move is 1% of the account; no compounding. The shaded part is the last two years." legend={eqLegend}>
          <EquityChart E={N.equity} />
        </Figure>
        <Figure title="How single sessions turn out" sub="Each session's result in % of the account; the few above 3% are counted in the last bar.">
          <Dist H={N.session_hist} xlab="One session's result, % of the account" color="s1" digits={1} />
        </Figure>
        <P>
          This is a trend follower&apos;s payoff. Only {f.N_WIN} of sessions win, but the winners are bigger. The best tenth of sessions
          earned <strong>{f.N_TOP}</strong> of the total profit, so the other nine tenths lose a little on balance. You need the big trend
          days, and you can&apos;t know in advance which ones they&apos;ll be.
        </P>
        <Figure title="NAS100 noise band by calendar year" sub="% of the account; 2026 runs to September.">
          <YearBars Y={N.by_year} />
        </Figure>
        <P>2018 alone made {f.N_2018}, about a third of the total. Every year since 2020 made money; 2016, 2017 and 2019 were flat.</P>
        <H3>Monte Carlo test 2</H3>
        <P>
          Drawing 10,000 years of {f.N_MC_N} sessions from its sessions since 2016, the median year made <strong>{f.N_MC_MED}</strong>,
          nine in ten landed between {f.N_MC_P5} and {f.N_MC_P95}, and <strong>{f.N_MC_PLOSS}</strong> lost money. A drawdown of{" "}
          {f.N_MC_DD50} inside the year is typical, and one year in twenty goes to {f.N_MC_DD5} or worse.
        </P>
        <Figure title="10,000 simulated years of the noise band" sub="Left: median, middle 50% and 90% of years, and 40 single years. Right: the deepest drawdown inside each year.">
          <Pair
            left={{ title: "Running total, % of the account", node: <Fan M={N.mc} /> }}
            right={{ title: "Deepest drawdown in the year", node: <Dist H={N.mc.dd_hist} xlab="% of the account" /> }}
          />
        </Figure>
        <H3>How much cost it can carry</H3>
        <P>
          It keeps t above 3 up to about <strong>{f.N_T3} points</strong> a round trip and stays profitable up to about {f.N_ZERO}, at
          today&apos;s prices around {f.N_PRICE}. Pepperstone charges about 1 point in US hours, so cost is not its problem.
        </P>
        <Figure title="NAS100: t as the round-trip cost rises" sub="Cost as the same share of price in every year, shown in points at today's prices, 2016 to 2026.">
          <CostChart C={N.cost_curve} unit="points" marks={[{ x: 1.1, label: "Pepperstone about 1.1" }, { x: N.cost_points, label: `Charged here ${N.cost_points.toFixed(1)}`, row: 1 }]} />
        </Figure>
        <H3>What I found</H3>
        <Bullets
          items={[
            <><strong>Three data feeds agree it&apos;s there, all near the bar:</strong> t 2.99 on HistData (2016 to March 2025), 2.53 on Dukascopy (2021 to May 2026) and {f.N_T_BEFORE} on OANDA (2016 to September 2024).</>,
            <><strong>The test I wrote down first pooled NAS100 with US500, and it missed the bar</strong> (t 2.38). US500 on its own has lost money in the last two years. Picking NAS100 alone after seeing that is hindsight, so I count it as a strong candidate, not a pass.</>,
            <><strong>Last two years:</strong> {f.N_REC_MEAN} a session, t {f.N_REC_T}, ahead of {f.N_REC_BEATS} of random histories. Still positive, but weaker than before.</>,
            <><strong>Drawdowns are part of it:</strong> {f.N_MAXDD} at the worst point, and {f.N_LONGDD} days without a new high.</>,
          ]}
        />
      </Section>

      <Section id="cross-reversion" title="3. AUDCAD, AUDNZD and NZDCAD snapping back">
        <Chips items={[{ label: "Real, but too thin to trade now" }, { label: "AUDCAD, AUDNZD, NZDCAD" }]} />
        <P>
          These three crosses are built from currencies that move with the same commodities and the same appetite for risk, so when one
          stretches away from the others it tends to come back. It&apos;s the trade behind many of the popular grid systems. I tested it as
          a plain rule on hourly bars, with no grid and no martingale.
        </P>
        <Spec
          rows={[
            ["Bars", "One-hour bars in broker server time."],
            ["Entry", "At a bar's close above the 20-bar mean plus 2 standard deviations, with RSI(14) above 70: sell at the next bar's open. Below the mean less 2 standard deviations, with RSI below 30: buy. One trade open per pair."],
            ["Exit", "When price gets back to the 20-bar mean, or after 96 bars. No stop."],
            ["Blocked", "No new trades from 16:30 to 18:00 New York, around the rollover, or before 02:00 server time on a Monday."],
            ["Costs", "Pepperstone's spread at entry and exit, 0.007% commission per side, and today's swap."],
          ]}
        />
        <H3>The edge has shrunk</H3>
        <P>
          Before costs, a trade made {f.X_EARLY} pips on average from 2005 to 2011, and {f.X_LATE} since 2016. Pepperstone&apos;s spread and
          commission come to about {f.X_FEE_MEAN} pips a trade on average, more around the rollover.
        </P>
        <Figure title="Pips a trade before costs, and what the broker takes" sub="Average over the three crosses, by year of entry." legend={[{ label: "Before costs", kind: "s1" }, { label: "Spread, commission and swap", kind: "s2line" }]}>
          <EdgeChart Eg={X.edge_by_year} />
        </Figure>
        <H3>Monte Carlo test 1</H3>
        <P>
          The timing is still real. Over 2004 to 2026 the rule made {f.X_RULE} of a normal day against {f.X_RAND} for its 10,000 random
          histories, and since 2016 {f.X_RULE_D} against {f.X_RAND_D}; it beat every random run both times. At Pepperstone&apos;s costs and
          today&apos;s swap the full history scores t {f.X_T}, but since 2016 only t {f.X_T_D}.
        </P>
        <Figure title="The rule against 10,000 random histories, 2004 to 2026" sub="Average per day after the lab's standard costs, in normal days." legend={randLegend}>
          <Histogram R={X.random_whole} />
        </Figure>
        <H3>What it earned</H3>
        <StatsTable table={d.tables.crosses} />
        <Figure title="The three crosses, running total in % of the account" sub="Each pair's trades sized at a third of the 1%; no compounding. The shaded part is the last two years." legend={eqLegend}>
          <EquityChart E={X.equity} />
        </Figure>
        <P>
          The equity curve tells the story. It climbed until {f.X_GAP_START}, then went {f.X_GAP_YEARS} years without a new high. A good
          run in {f.X_GAP_END} lifted it past the old peak, and 2026 gave most of that back: from {f.X_GAP_START} to September 2026 it made{" "}
          {f.X_SINCE_PEAK}.
        </P>
        <H3>Monte Carlo test 2</H3>
        <P>
          Drawing 10,000 years from its days since 2016, the median year made <strong>{f.X_MC_MED}</strong>,{" "}
          <strong>{f.X_MC_PLOSS}</strong> of years lost money, and one year in twenty had a drawdown of {f.X_MC_DD5} or worse. That&apos;s
          close to a coin toss.
        </P>
        <Figure title="10,000 simulated years of the cross reversion" sub="Left: median, middle 50% and 90% of years, and 40 single years. Right: the deepest drawdown inside each year.">
          <Pair
            left={{ title: "Running total, % of the account", node: <Fan M={X.mc} /> }}
            right={{ title: "Deepest drawdown in the year", node: <Dist H={X.mc.dd_hist} xlab="% of the account" /> }}
          />
        </Figure>
        <H3>How much cost it can carry</H3>
        <P>
          Since 2016 it stays profitable only up to about <strong>{f.X_ZERO} pips</strong> a round trip, and keeps t above 3 only below
          about {f.X_T3}. Pepperstone&apos;s typical round trip is {f.X_FEE_TODAY} pips, and the trades near the rollover pay far more.
        </P>
        <Figure title="The three crosses: t as the round-trip cost rises, 2016 to 2026" sub="Each trade's own Pepperstone cost scaled together, shown in pips at today's typical round trip.">
          <CostChart C={X.cost_curve} unit="pips" marks={[{ x: X.fee_today, label: `Pepperstone typical ${X.fee_today.toFixed(1)}` }]} />
        </Figure>
        <StatsTable table={d.tables.crosses_pairs} />
        <H3>What I found</H3>
        <Bullets
          items={[
            <><strong>The reversion is real and the rule finds it,</strong> but since 2012 it has been about the size of the spread.</>,
            <><strong>AUDNZD is the only pair still above its costs since 2016</strong> (t {f.X_AUDNZD_T}). AUDCAD is flat and NZDCAD has lost money.</>,
            <><strong>In the last two years</strong> it made money in the first year and lost a little in the second.</>,
            <><strong>It only pays at the cheapest pricing:</strong> a raw-spread account, and no trades near the rollover.</>,
          ]}
        />
      </Section>

      <Section id="look-back" title="Does a short look back pick better day trades?">
        <P>
          I had a hunch that for day trading, looking too far back does more harm than good. So I tested that too, the same way. I took
          1,248 simple day trades on 13 markets: a fixed entry hour, a one- or four-hour hold, long or short, on OANDA&apos;s quotes from
          2004 at Pepperstone&apos;s costs. At the start of each year from 2015, I picked the 20 with the best record over the last 1, 2, 3,
          5 or 10 years and held them for the year.
        </P>
        <Figure
          title="What the past showed, and what came next"
          sub="Average per trade of the 20 rules picked each year, 2015 to September 2026, in normal days."
          legend={[{ label: "The 20 picked, over their look back", kind: "s1" }, { label: "The same 20, the year after", kind: "s2" }]}
        >
          <Dumbbell looks={d.lookback.looks} />
        </Figure>
        <P>
          The two-year picks did no better than the ten-year picks, and the one-year picks did worst of all. Whatever the look back, the top
          20 lost money the year after, and the shorter the look back, the bigger the gap between what it promised and what it delivered.
          My hunch was half right: plenty of rules are weaker now than they were. But two years is too little data to tell a real edge from
          a lucky run. So I find rules on the long history, and use the last two years to check they still work.
        </P>
      </Section>

      <Section title="What didn't make the cut">
        <Bullets
          items={[
            "The four-hour change of character from a popular YouTube video: worse than random entries over 23 years of US500 and NAS100.",
            "Round numbers in FX, as turning points and as breakouts: both lose after costs, far from the bar.",
            "Opening range breakouts on GER40 and NAS100: the spread eats them, and the NAS100 result changes from one data feed to the next.",
            "Bitcoin's evening rise: real before fees, gone at any normal exchange fee.",
            "Dollar carry, busy-day reversals, gold's Asian-range breakout, gold in Shanghai hours and an hourly fade on index CFDs: none of them passed after costs.",
          ]}
        />
      </Section>

      <Section id="next" title="What I'm doing next">
        <Bullets
          items={[
            "Gotobi goes onto a demo account first, on USDJPY and the yen crosses. The months from October 2026 are its real test.",
            "The noise band on NAS100 gets its own test, with a market kept back, written down before I run it.",
            "I'm sharing the rules with other traders to test on their own brokers. The cost charts show how much each one can afford.",
            "Nothing goes live until the demo matches the backtests.",
          ]}
        />
        <p className="mt-2 border-t border-q-line pt-5 text-[13px] leading-[1.6] text-q-muted">
          Data: OANDA&apos;s recorded one-minute quotes, 2003 to September 2026, with HistData and Dukascopy as second and third feeds;
          costs from Pepperstone UK&apos;s recorded spreads and swaps. Monte Carlo runs use 10,000 draws with seed 1. Research, not
          financial advice: past results don&apos;t promise future ones.
        </p>
      </Section>
    </>
  );
}
