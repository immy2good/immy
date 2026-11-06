import raw from "./market-timing-folklore.json";
import gotobi from "./three-strategies.json";
import { CategoryBars, ProfileChart, YearBars, type Profile } from "@/components/research/charts";
import { Bullets, Chips, Figure, Glossary, H3, IdeaCards, P, Section, Verdict, readingTerms } from "@/components/research/parts";

// The numbers come from the edge lab's runs (tools/mirror/report/clock.py, and its records for each hypothesis); the words are mine.
const d = raw as unknown as {
  crypto_hours: { hour: number; mean: number; t: number }[];
  overnight: { by_year: Record<string, number>; mean: number; t: number; halves: number[] };
};
const profile = (gotobi as unknown as { data: { gotobi: { profile: Profile } } }).data.gotobi.profile;
const years = Object.keys(d.overnight.by_year).map(Number);

export const toc = [
  { id: "why", label: "Why I tested them" },
  { id: "reading", label: "How to read it" },
  { id: "fixes", label: "The fixes" },
  { id: "night-and-day", label: "Night and day" },
  { id: "calendar", label: "The calendar" },
  { id: "clocks", label: "Asian hours and crypto" },
  { id: "takeaways", label: "What it teaches" },
];

export function Lede() {
  return (
    <>
      Buy before the London fix. Indices make their money overnight. Gold rises while Shanghai trades. Bitcoin pumps in the evening.
      Markets drift up into Fed days and at the turn of the month. Every one of these timing rules has a paper, a forum thread or a
      video behind it. I tested fourteen of them on years of recorded quotes at a real broker&apos;s costs. Most of the patterns are
      real. Almost none of them pays.
    </>
  );
}

export function Body() {
  return (
    <>
      <Section id="why" title="Why I tested them">
        <P>
          Timing rules are the most tempting kind of trading idea. There is no indicator to tune and no chart to read: you buy at a
          set time and sell at another. Many come from respected research, and the reasons sound solid: a fix where banks must trade,
          a time zone where a big market is open, a calendar date when funds rebalance.
        </P>
        <P>
          That also makes them easy to test honestly. A timing rule has nowhere to hide: either the market moves at that hour, by more
          than the spread, more often than at random hours, or it doesn&apos;t. I wrote each one down before testing it and scored it the
          same way as everything else.
        </P>
      </Section>

      <Section id="reading" title="How to read this report">
        <Glossary items={readingTerms.filter(([k]) => ["Normal day", "R", "t", "Random histories"].includes(k))} />
      </Section>

      <Section title="The verdict, at a glance">
        <Verdict
          items={[
            { k: "Timing rules tested", v: "14", n: "Fixes, overnight, the Fed's calendar, the turn of the month, Shanghai's hours and crypto's clock." },
            { k: "Passed as first written", v: "0", n: "Some patterns are real before costs. After a real broker's spread, none cleared the bar as first written." },
            { k: "Rescued, or passed then faded", v: "2", n: "Gotobi, by moving the entry away from the rollover; and the overnight bounce, which passed at real costs but has made nothing since 2021." },
          ]}
        />
      </Section>

      <Section id="fixes" title="The fixes: London's 4pm and Tokyo's 9:55">
        <Chips items={[{ label: "3 failed", tone: "fail" }, { label: "1 rescued", tone: "pass" }]} />
        <P>
          A fix is a short window when banks price large currency orders for their clients, so a lot of money changes hands at a known
          time. The theory is that you can trade ahead of it, or fade it afterwards.
        </P>
        <Bullets
          items={[
            <><strong>The London 4pm fix:</strong> 20 versions on nine pairs, all failed. Before any spread, fading the fix made at most half a pip a trade; the spread alone is about twice that. The run into the fix even had the wrong sign on every pair.</>,
            <><strong>The month-end fix, on the side equity hedgers must trade:</strong> t 0.28. The dollar did weaken at month ends, but whichever way stocks had moved, so it wasn&apos;t the hedging story, and 119 month ends can&apos;t carry it.</>,
            <><strong>The dollar after the London fix:</strong> it still falls a little in New York&apos;s afternoon, but by an eighth of what the original research found for 1999 to 2019, and the spread takes all of it.</>,
          ]}
        />
        <H3>Gotobi: the one I got wrong, then right</H3>
        <P>
          On the 5th, 10th, 15th, 20th and 25th and the last day of each month, Japanese importers buy dollars at the Tokyo fix at 9:55.
          My first test bought USDJPY at 08:00 Tokyo and scored t 2.93: just short of the bar. The flow was clearly there, but in winter
          08:00 Tokyo is an hour after the broker&apos;s daily rollover, when spreads are still wide, and the spread took most of the gain.
        </P>
        <P>
          So I wrote a new hypothesis before testing it: start at 03:00 Tokyo instead, well clear of the rollover. It passed on twelve
          years I had never looked at, then on two more data feeds and on four yen crosses kept back. It is now the strongest result in
          the lab. The lesson is about costs as much as timing: a real flow can be killed by the hour you choose to pay the spread.
        </P>
        <Figure title="The average gotobi morning, 2016 to 2026" sub="USDJPY from 03:00 Tokyo in normal days, before costs. The band is the 95% range of the gotobi average."
          legend={[{ label: `Gotobi days (${profile.gotobi.days})`, kind: "s1line" }, { label: `Other days (${profile.other.days})`, kind: "s2line" }, { label: "95% range", kind: "s1wash" }]}>
          <ProfileChart P={profile} />
        </Figure>
        <P>The full gotobi results are in my report <a className="text-q-blue" href="/research/three-strategies-that-held-up">Three strategies that held up</a>.</P>
      </Section>

      <Section id="night-and-day" title="Night and day">
        <Chips items={[{ label: "3 failed", tone: "fail" }, { label: "1 passed, then faded" }]} />
        <Bullets
          items={[
            <><strong>“Indices earn their return overnight.”</strong> Before costs, the night does carry most of the US indices&apos; gains. But random stretches of the same length earn as much: the night beat random in only 4.9% of runs. It&apos;s the market&apos;s drift falling in the hours that hold most of it, not a premium for holding overnight. After costs it scores t 1.23.</>,
            <><strong>The intraday momentum of the first half hour:</strong> gone. Before any cost it made between −0.005R and +0.003R on NAS100, US500 and GER40.</>,
            <><strong>“The day&apos;s move carries into the last half hour”:</strong> not in the US indices in these years, and in gold and oil it is worth less than one spread.</>,
          ]}
        />
        <H3>The overnight bounce after a sell-off</H3>
        <P>
          A newer paper found that after the US indices fall into the close, they rise at Europe&apos;s open. At Pepperstone&apos;s real night
          spread it passed every test I set, t {d.overnight.t.toFixed(2)} on US500 and NAS100 since 2003, and again on US30, which I&apos;d
          kept back. But look at its years. The gain sits almost entirely before 2016, and since 2021, after the paper, it has made about
          nothing. A pass that has already faded is a reason not to trade, not a reason to.
        </P>
        <Figure title="Overnight after a sell-off, by year" sub="Average per night after Pepperstone's spread, in normal days; 2026 is a part year.">
          <YearBars Y={{ year: years, pnl: years.map((y) => d.overnight.by_year[String(y)]), days: years.map(() => 0) }} unit="" />
        </Figure>
      </Section>

      <Section id="calendar" title="The calendar">
        <Chips items={[{ label: "4 failed", tone: "fail" }]} />
        <Bullets
          items={[
            <><strong>The turn of the month:</strong> NAS100 made +0.019R in the turn-of-month window, while random four-day longs in the same months made +0.048R. The drift is there; the calendar adds nothing to it.</>,
            <><strong>Buying the day before a Fed statement:</strong> t 2.11 pooled over US500 and NAS100. That&apos;s the best of the published flows, but it would take about 150 statements to reach t 3.</>,
            <><strong>Stocks rise in the even weeks of the Fed&apos;s cycle:</strong> even weeks earned less than random holdings of the same length, and odd weeks did better than even ones. The cycle the paper found in 1994 to 2016 isn&apos;t in these years.</>,
            <><strong>The dollar falls on Fed days:</strong> it did, at t 2.40, from 2016 to 2025. But it did nothing in the forty statements before 2016, and went the other way in nine of the eleven since May 2025. Nine years of a pattern with nothing either side is a run of years, not a flow.</>,
          ]}
        />
      </Section>

      <Section id="clocks" title="Asian hours and crypto's clock">
        <Chips items={[{ label: "3 failed", tone: "fail" }]} />
        <Bullets
          items={[
            <><strong>Gold rises in Shanghai&apos;s hours:</strong> it does, a little, and falls in the same hours when Shanghai is shut, which is the cause the claim gives. But the long earns a sixtieth of a day&apos;s move at a retail spread: t 1.59.</>,
            <><strong>Bitcoin&apos;s first half hour predicts its last:</strong> it doesn&apos;t, before fees or after.</>,
          ]}
        />
        <H3>Bitcoin&apos;s evening: real, and still unprofitable</H3>
        <P>
          Bitcoin and ether do rise from 21:00 to 23:00 UTC. They rise more in those two hours than in any other hours of the day, in eight
          of nine full years, before fees at t 5.06. But the gain is about a tenth of a percent a day, and a round trip pays the fee twice.
          At Binance&apos;s standard 0.10% a side it loses 0.11% a day, and at a typical UK exchange&apos;s 0.40% it loses 0.71%. Only a
          venue charging about 0.02% a side or less, a futures maker&apos;s rate, would leave it standing.
        </P>
        <Figure title="Bitcoin and ether: the average move in each UTC hour, 2017 to 2026" sub="Before fees, in % of price. The two blue hours are the rule; a round trip at 0.10% a side costs 0.20%, four times the bars.">
          <CategoryBars
            labels={d.crypto_hours.map((h) => String(h.hour).padStart(2, "0"))}
            values={d.crypto_hours.map((h) => h.mean)}
            unit="%"
            highlight={[21, 22]}
            every={2}
          />
        </Figure>
      </Section>

      <Section title="Every timing rule I tested">
        <IdeaCards
          items={[
            { title: "London 4pm fix, before and after", data: "Nine FX pairs, 20 versions", stats: [["Best before costs", "+0.005R"], ["Spread", "0.009R"], ["Passed", "0 of 20"]], verdict: "Failed" },
            { title: "Month-end fix, hedgers' side", data: "FX majors, 119 month ends", stats: [["Per trade", "+0.009"], ["t", "0.28"], ["Twice costs", "t −0.24"]], verdict: "Failed" },
            { title: "Dollar after the London fix", data: "FX majors, 2016 to 2025", stats: [["Before costs", "+0.005"], ["Vs. 1999–2019", "an eighth"], ["After costs", "below 0"]], verdict: "Failed" },
            { title: "Gotobi, entered at 08:00 Tokyo", data: "USDJPY, 695 days", stats: [["Per day", "+0.032"], ["t", "2.93"], ["Twice costs", "t 0.65"]], verdict: "Rescued at 03:00", pass: true },
            { title: "Indices earn their return overnight", data: "US500 and NAS100, 2,423 nights", stats: [["Per night", "+0.015"], ["t", "1.23"], ["Beat random", "4.9%"]], verdict: "Failed" },
            { title: "Overnight bounce after a sell-off", data: "US500 and NAS100 since 2003", stats: [["Per night", `+${d.overnight.mean.toFixed(3)}`], ["t", d.overnight.t.toFixed(2)], ["Since 2021", "about 0"]], verdict: "Passed, faded", pass: true },
            { title: "First half hour predicts the last", data: "NAS100, US500, GER40", stats: [["Before costs", "−0.005R to +0.003R"], ["t", "near 0"], ["Days", "1,400 to 2,400"]], verdict: "Failed" },
            { title: "Last half hour follows the day", data: "US indices; gold, oil, silver", stats: [["Indices", "nothing"], ["Commodities", "t 2.21 before costs"], ["After costs", "below 0"]], verdict: "Failed" },
            { title: "Turn of the month", data: "NAS100, US500, GER40", stats: [["NAS100", "+0.019R"], ["Random longs", "+0.048R"], ["Adds", "nothing"]], verdict: "Failed" },
            { title: "Long before a Fed statement", data: "US500 and NAS100", stats: [["t", "2.11"], ["Needed for t 3", "~150 meetings"], ["Status", "watch list"]], verdict: "Below the bar", pass: true },
            { title: "Even weeks of the Fed cycle", data: "US indices", stats: [["Beat random", "41.4%"], ["Odd weeks", "did better"], ["Paper's years", "1994–2016"]], verdict: "Failed" },
            { title: "Dollar falls on Fed days", data: "FX majors, 2016 to 2025", stats: [["t", "2.40"], ["Before 2016", "nothing"], ["Since May 2025", "2 of 11 up"]], verdict: "Failed" },
            { title: "Gold rises in Shanghai's hours", data: "XAUUSD, 2016 to 2025", stats: [["Per day", "+0.017"], ["t", "1.59"], ["Twice costs", "nothing"]], verdict: "Failed" },
            { title: "Bitcoin's evening, 21:00 to 23:00 UTC", data: "BTC and ETH, 2017 to 2026", stats: [["Before fees", "+0.09%"], ["t before fees", "5.06"], ["At 0.10% a side", "−0.11%"]], verdict: "Failed on fees" },
          ]}
        />
      </Section>

      <Section id="takeaways" title="What it teaches">
        <Bullets
          items={[
            <><strong>Most timing patterns are real, and most are tiny.</strong> The flows behind them exist, but they move price by less than the spread you pay to trade them.</>,
            <><strong>The hour you pay the spread matters as much as the hour you trade.</strong> Near the daily rollover, spreads widen several times over. Gotobi failed at 08:00 Tokyo and passed at 03:00 for exactly that reason.</>,
            <><strong>Compare with random holds of the same length.</strong> “Indices make their money overnight” is true, and still no edge: any long hold in a rising market makes money.</>,
            <><strong>Published patterns fade.</strong> The overnight bounce, the Fed-cycle weeks and the dollar after the fix were all strong in the paper&apos;s years and much weaker after.</>,
            <><strong>A run of good years isn&apos;t a flow.</strong> Check the years before and after; the Fed-day dollar pattern held for nine years and then reversed.</>,
          ]}
        />
        <p className="mt-2 border-t border-q-line pt-5 text-[13px] leading-[1.6] text-q-muted">
          Data: OANDA&apos;s recorded one-minute quotes, HistData and the lab&apos;s Pepperstone history for FX, indices and metals;
          Binance spot candles for crypto; costs from Pepperstone UK&apos;s recorded spreads and Binance&apos;s fee schedule. Research, not
          financial advice: past results don&apos;t promise future ones.
        </p>
      </Section>
    </>
  );
}
