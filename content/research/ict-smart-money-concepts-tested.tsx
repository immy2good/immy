import raw from "./ict-smart-money-concepts-tested.json";
import { CumBand, Dist, Histogram, SideBars, YearBars, type Cum, type RandomRun, type Sides } from "@/components/research/charts";
import { Bullets, Chips, Figure, Glossary, H3, IdeaCards, P, Section, Spec, StatsTable, Steps, Verdict, readingTerms } from "@/components/research/parts";

// The numbers come from the edge lab's runs of hypothesis 65 (tools/mirror/report/choch.py); the words are mine.
const d = raw as unknown as {
  rule_mean: number; rule_t: number; days: number; trades: number; random_mean: number; share_random_better: number;
  random: RandomRun; cum: Cum; sides: Sides;
  years: { year: number[]; mean: number[]; days: number[] };
  nq_2024_2025: { trades: number; rule_usd: number; random_mean_usd: number; random_p5_usd: number; random_p95_usd: number;
    share_random_better: number; buy_hold_usd: number; longs: number; shorts: number };
  luck: Record<"zero edge" | "small loss after costs", { share_above_0_5?: number; "share_above_0.5": number }>;
  luck_hist: { edges: number[]; counts: number[] };
};
const num = (v: number, k: number) => (v > 0 ? "+" : v < 0 ? "−" : "") + Math.abs(v).toFixed(k);
const R = (v: number, k = 3) => num(v, k) + "R";
const usd = (v: number) => (v >= 0 ? "+$" : "−$") + (Math.round(Math.abs(v) / 100) * 100).toLocaleString("en-US");
const share = (v: number) => `${(v * 100).toFixed(1)}%`;
const nq = d.nq_2024_2025;

export const toc = [
  { id: "why", label: "Why I tested it" },
  { id: "reading", label: "How to read it" },
  { id: "claim", label: "The claim" },
  { id: "method", label: "How I tested it" },
  { id: "results", label: "What I found" },
  { id: "why-it-looked-good", label: "Why it looked good" },
  { id: "other-smc", label: "Other ICT ideas" },
  { id: "takeaways", label: "What to take from it" },
];

export function Lede() {
  return (
    <>
      ICT and Smart Money Concepts are the most popular way to read a chart right now: changes of character, liquidity sweeps, order
      blocks, fair value gaps. A widely shared video even claimed an AI tested 100,000 price-action strategies and found the four-hour
      change of character on top. I turned these ideas into fixed rules and put them through the same test as everything else: decades
      of data, a real broker&apos;s costs, and 10,000 sets of random trades shaped exactly like them. None of them passed.
    </>
  );
}

export function Body() {
  return (
    <>
      <Section id="why" title="Why I tested it">
        <P>
          ICT (the Inner Circle Trader) and the Smart Money Concepts built on it are everywhere: in every trading group I&apos;m in, on
          most chart setups people send me, and in TradingView&apos;s most popular free script. The story is appealing: big players hunt
          the stops above highs and below lows, leave footprints in order blocks and gaps, and you can follow them. Charts full of
          perfect examples make it look obvious.
        </P>
        <P>
          A chart of examples is not a test. So I took the core ideas, wrote each one down as a fixed rule before looking at the data, and
          scored it the way I score everything. Most of this report is the change of character, because a popular video claimed an AI had
          found it to be the best price-action strategy of 100,000. The other ideas are summed up after it.
        </P>
        <P>
          I&apos;m not out to knock anyone. Some of these ideas describe real market behaviour, and the video&apos;s method gets several
          things right. But a backtest that looks good and an edge that is real are different things, and these are clear examples of how
          to tell them apart.
        </P>
      </Section>

      <Section id="reading" title="How to read this report">
        <Glossary items={readingTerms.filter(([k]) => ["R", "t", "Random histories", "Drawdown"].includes(k))} />
      </Section>

      <Section title="The change of character, at a glance">
        <Chips items={[{ label: "Failed", tone: "fail" }, { label: "Change of character, US500 and NAS100, 2003 to 2026" }]} />
        <Verdict
          items={[
            { k: "Random did better", v: share(d.share_random_better), n: "of 10,000 random histories beat the rule. A pass needs the rule to beat 99% of them." },
            { k: "Average after costs", v: R(d.rule_mean), n: `a day, t ${d.rule_t.toFixed(2)}. A pass needs t above 3.` },
            { k: "History tested", v: "23 years", n: `${d.trades.toLocaleString("en-US")} trades on US500 and NAS100, March 2003 to September 2026.` },
          ]}
        />
      </Section>

      <Section id="claim" title="The claim">
        <P>
          The video, from the AI Pathways channel, turned price-action ideas into adjustable rules and swept about 100,000 versions over
          roughly five years of one-minute NQ and ES futures, with costs, keeping the last two years back. About 24,000 versions made money
          after costs and 8,310 cleared a Sharpe ratio of 0.5. One setup passed both the early years and the kept-back years on both
          markets: <strong>the four-hour change of character</strong>. It reportedly made about $62,000 on one NQ contract and $39,000 on
          ES in the kept-back years, and 39 of its 48 nearby versions were profitable.
        </P>
        <P>
          The video gives the rule in words, not numbers, and reports no t-statistic. Its markets also rose strongly over those years, so a
          rule that leans long can make money without any edge.
        </P>
      </Section>

      <Section id="method" title="How I tested it">
        <Steps
          items={[
            { title: "Fix the rule before looking at any data", text: "I wrote the setup down from the video's own description and committed it to my lab before reading a single price. Nothing was tuned afterwards." },
            { title: "Use 23 years, not 5", text: "OANDA's recorded one-minute quotes for US500 and NAS100, the CFDs that track ES and NQ, from March 2003 to September 2026. Months with missing days or broken quotes were dropped by the lab's standard check." },
            { title: "Simulate every trade", text: "Each signal became a trade, one open at a time per market, followed hour by hour. When one hour touched both stop and target, the stop counted first, the same cautious rule the video used. A gap through the stop filled at the worse price." },
            { title: "Charge a real broker's costs", text: "Pepperstone's own median spread at the minute of entry and exit (0.4 points on US500, about 1.4 on NAS100), plus 2.5% a year financing for each night held." },
            { title: "Build a yardstick for luck", text: "For every real trade, a random one in the same market and month, with the same side, the same stop distance and the same 1R target, entered at a random four-hour bar and costed the same way. Repeated 10,000 times." },
            { title: "Apply the bar", text: "To pass, the rule has to beat at least 99% of those random histories, reach t above 3, and then hold on markets kept back. FRA40, EU50, JPN225 and AUS200 were set aside for that last step and never needed." },
          ]}
        />
        <Spec
          rows={[
            ["Bars", "Four-hour bars in broker server time, built from one-minute quotes."],
            ["Swings", "A swing high is a bar higher than the two bars on each side (a five-bar fractal), known two bars after it forms. Swing lows likewise."],
            ["Trend", "A close above the last unbroken swing high makes the trend up; a close below the last unbroken swing low makes it down."],
            ["Signal", "The close that flips the trend is the change of character: long when down turns up, short when up turns down."],
            ["Trade", "Enter at the next bar's open. Stop at the last swing. Target 1R. No sweep, session or trend filter."],
          ]}
        />
      </Section>

      <Section id="results" title="What I found">
        <H3>Worse than random</H3>
        <P>
          The rule averaged <strong>{R(d.rule_mean)}</strong> a day after costs. The random histories averaged {R(d.random_mean)}, because
          they pay the same costs. <strong>{share(d.share_random_better)}</strong> of them did better than the rule: its timing takes
          value away.
        </P>
        <Figure title="The rule against 10,000 random histories" sub="Average R per day after costs. Each bar counts random histories in that range."
          legend={[{ label: "Random histories", kind: "s2" }, { label: "The rule", kind: "s1line" }]}>
          <Histogram R={d.random} />
        </Figure>

        <H3>Where its money comes from</H3>
        <P>
          Split by side, the picture is clear. Random longs make money because the indices rose over these 23 years, and random shorts lose
          for the same reason. The rule&apos;s longs do a little better than random longs, within luck. Its shorts lose far more than random
          shorts: a bearish change of character bets against a rising index and keeps losing that bet.
        </P>
        <Figure title="Average R per trade, by side" sub="The rule against random trades with the same side, stop distance and 1R target."
          legend={[{ label: "The rule", kind: "s1" }, { label: "Random, same side, stop and target", kind: "s2" }]}>
          <SideBars S={d.sides} />
        </Figure>

        <H3>Over 23 years, and in the video&apos;s years</H3>
        <P>
          Added up trade by trade, the rule spends most of the 23 years below the middle of the random histories and finishes below it. In
          2021 to 2026, the video&apos;s own period, it made −0.025R a day; NAS100 alone made +0.036R a trade at t 0.56, which is noise.
        </P>
        <Figure title="Running total in R, trade by trade" sub="The shaded band holds the middle 90% of the 10,000 random histories."
          legend={[{ label: "The rule", kind: "s1line" }, { label: "Random, median", kind: "s2line" }, { label: "Random, middle 90%", kind: "s2wash" }]}>
          <CumBand D={d.cum} />
        </Figure>
        <Figure title="The rule by calendar year" sub="Average R per trading day; 2026 runs to September.">
          <YearBars Y={{ year: d.years.year, pnl: d.years.mean, days: d.years.days }} unit="R" />
        </Figure>
      </Section>

      <Section id="why-it-looked-good" title="Why it looked good in the video">
        <H3>A two-year window can look like an edge</H3>
        <P>
          On NAS100 in 2024 and 2025 alone, this exact rule took {nq.trades} trades ({nq.longs} long, {nq.shorts} short) and made{" "}
          <strong>{usd(nq.rule_usd)}</strong> on one NQ contract at $20 a point. That beat about {share(1 - nq.share_random_better)} of
          random histories in those two years. But random trades with the same sides averaged {usd(nq.random_mean_usd)}, and 90% of them
          landed between {usd(nq.random_p5_usd)} and {usd(nq.random_p95_usd)}. Simply buying and holding one NQ contract over the same
          two years made {usd(nq.buy_hold_usd)}.
        </P>
        <P>
          Two years is about 80 trades, and with a 1R stop and target, 80 trades swing by tens of thousands of dollars on luck alone. The
          kept-back years in the video were a short window in a strong bull market. Over 23 years, the same rule loses to random.
        </P>

        <H3>Trying 100,000 versions finds lucky ones</H3>
        <P>
          Over three years, a strategy with no edge at all still shows a Sharpe ratio scattered around zero, with a spread of about ±0.58.
          About <strong>{Math.round(d.luck["zero edge"]["share_above_0.5"] * 100)}%</strong> of such strategies clear 0.5 by luck alone,
          and about {Math.round(d.luck["small loss after costs"]["share_above_0.5"] * 100)}% if costs leave them slightly negative. The
          video&apos;s funnel had 8,310 of about 88,000 graded versions clear 0.5, roughly 9%. That&apos;s about what luck would produce.
        </P>
        <Figure title="Sharpe ratios of 100,000 strategies with no edge, over three years" sub="Simulated daily returns with a true Sharpe of zero. The shaded side is the video's bar.">
          <Dist H={d.luck_hist} xlab="Sharpe ratio measured over three years" digits={1} suffix=""
            mark={{ x: 0.5, label: `${Math.round(d.luck["zero edge"]["share_above_0.5"] * 100)}% clear 0.5 with no edge` }} />
        </Figure>

        <H3>Two markets that move together are close to one test</H3>
        <P>
          ES and NQ are both large US index futures and move together most of the time, so a rule that rides the US rise works on both at
          once. And the 39 profitable versions out of 48 are neighbours of the same rule with slightly different settings: one result, not
          39.
        </P>
      </Section>

      <Section title="Every variant I ran">
        <P>None of the video&apos;s filters rescue it, and neither do other swing sizes or timeframes.</P>
        <StatsTable
          table={{
            head: ["Version", "Trades", "R per day", "t", "R per trade"],
            rows: [
              ["The rule, four-hour bars", "1,460", "−0.056", "−1.98", "−0.059"],
              ["2021 to 2026-09, the video's years", "475", "−0.025", "−0.49", "−0.029"],
              ["Twice the costs", "1,460", "−0.077", "−2.69", "−0.079"],
              ["Longs only", "721", "+0.023", "0.57", "+0.046"],
              ["Shorts only", "739", "−0.157", "−3.99", "−0.161"],
              ["New York 08:00 to 16:00 entries only", "761", "0.000", "0.00", "+0.007"],
              ["Skipping trades with the last 3 days' run", "926", "−0.029", "−0.80", "−0.031"],
              ["Three-bar fractal swings", "2,300", "−0.063", "−2.68", "−0.088"],
              ["Seven-bar fractal swings", "1,143", "−0.064", "−2.03", "−0.060"],
              ["Hourly bars", "5,911", "−0.037", "−2.43", "−0.113"],
              ["Daily bars", "306", "+0.062", "1.11", "+0.053"],
            ],
          }}
        />
        <p className="text-[13px] text-q-muted">R per day averages each day&apos;s trades into one value. The random comparison and the 99% bar apply to the main rule; the variants are shown for completeness.</p>
      </Section>

      <Section id="other-smc" title="The other ICT and Smart Money ideas I tested">
        <P>
          The change of character isn&apos;t the only Smart Money idea I&apos;ve put through the lab. Each of these was written down first,
          tested on years of recorded quotes at a real broker&apos;s costs, and set against random trades with the same side, stop and
          target.
        </P>
        <IdeaCards
          items={[
            { title: "Liquidity sweep of the prior day's high or low", data: "Nine FX pairs, 2016 to 2026, 8,671 trades", stats: [["R per trade", "−0.108"], ["t", "−7.79"], ["Beat random", "65.7%"]], verdict: "Failed" },
            { title: "LuxAlgo SMC: swing break of structure and CHoCH", data: "GER40, 5-minute to hourly bars", stats: [["R per trade", "−0.03 to −0.24"], ["t", "−0.9 to −2.6"], ["Beat random", "5% to 62%"]], verdict: "Failed" },
            { title: "LuxAlgo SMC: internal break of structure", data: "GER40, 5-minute to hourly bars", stats: [["R per trade", "0.00 to −0.04"], ["t", "−0.1 to −3.4"], ["Beat random", "54% to 99%"]], verdict: "Failed" },
            { title: "LuxAlgo SMC: order block retest", data: "GER40, 5-minute to hourly bars", stats: [["R per trade", "−0.08 to −0.23"], ["t", "−2.1 to −20.7"], ["Beat random", "67% to 75%"]], verdict: "Failed" },
            { title: "Fair value gap on gold, entered at its midpoint", data: "XAUUSD 15-minute, 2016 to 2025, 1,071 trades", stats: [["R per trade", "+0.095"], ["t", "2.47"], ["Beat random", "100%"]], verdict: "Below the bar", pass: true },
            { title: "Four-hour change of character (above)", data: "US500 and NAS100, 2003 to 2026, 1,460 trades", stats: [["R per trade", "−0.059"], ["t", "−1.98"], ["Beat random", "13.6%"]], verdict: "Failed" },
          ]}
        />
        <Bullets
          items={[
            <><strong>Liquidity sweeps:</strong> a swept prior-day high or low turns back no more often than a random minute of the same session with the same trade. It lost on every pair and in every year.</>,
            <><strong>LuxAlgo&apos;s Smart Money Concepts,</strong> TradingView&apos;s most popular free script, traded the way its users are taught: all nine combinations lost after costs. A 2R target needs a 33% win rate; its signals won 29% to 35%, and the spread took the rest. Order blocks were the worst: price comes back through a block about as often as it turns there.</>,
            <><strong>Fair value gaps on gold</strong> came closest of any ICT idea. Entering at a gap&apos;s midpoint beat random entries on both sides, but it reached only t 2.47, its second half earned a third of its first, and at twice the spread it loses. A small effect that the costs mostly eat.</>,
          ]}
        />
      </Section>

      <Section id="takeaways" title="What to take from it">
        <Bullets
          items={[
            <><strong>Credit where it&apos;s due.</strong> Turning a discretionary idea into explicit settings, counting how many versions were tried, testing levels against random lines, and finding that slower charts survive costs better are all good practice. I use them too.</>,
            <><strong>Compare with random trades of the same shape.</strong> Keep each trade&apos;s side, stop and target, or a rising market will make any long-leaning rule look like an edge.</>,
            <><strong>Test on far more history than you tuned on.</strong> Two kept-back years in a bull market can&apos;t separate an edge from the trend.</>,
            <><strong>Count your attempts.</strong> With 100,000 versions, thousands will look good by luck. The bar has to rise with the number of tries: I use t above 3.</>,
          ]}
        />
        <p className="mt-2 border-t border-q-line pt-5 text-[13px] leading-[1.6] text-q-muted">
          Data: OANDA&apos;s recorded one-minute quotes for US500 and NAS100, March 2003 to September 2026; costs from Pepperstone
          UK&apos;s recorded spreads. Random runs use 10,000 draws with fixed seeds. Research, not financial advice: past results
          don&apos;t promise future ones.
        </p>
      </Section>
    </>
  );
}
