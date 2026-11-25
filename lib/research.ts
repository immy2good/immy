// Strategy research reports. Each one's numbers come from the edge lab's runs, exported to
// content/research/<slug>.json; its words live in content/research/<slug>.tsx.
export type Report = {
  slug: string;
  title: string;
  short: string;
  date: string;
  summary: string;
  eyebrow: string;
  metrics: { value: string; label: string }[];
};

export const reports: Report[] = [
  {
    slug: "hougaard-school-run-tested",
    title: "Tom Hougaard's School Run, tested: 82 variations, one that held up",
    short: "Tom Hougaard's School Run, tested",
    date: "2026-11-25",
    summary:
      "The breakout rules a well-known DAX trader publishes, with the exits he never gives, his overnight-range filter and his rule for adding to winners, tested in 82 variations on ten years of tick data at Pepperstone's real spread. His rules as written fail, and the filter and the adding add nothing. One form passed: his Advanced School Run on the DAX with a fixed 0.33% stop and a 2R target, which then held up on four years it had never seen.",
    eyebrow: "Strategy research · trader rules tested",
    metrics: [
      { value: "82", label: "variations tested" },
      { value: "1", label: "passed, and held up unseen" },
      { value: "+0.19R", label: "a trade on 2023 to 2026" },
    ],
  },
  {
    slug: "scalping-strategies-tested",
    title: "Scalping the DAX: 21 tries, no edge after costs",
    short: "Scalping the DAX, tested",
    date: "2026-11-22",
    summary:
      "Four fades of the DAX's busiest moments, a published flow after the US close, a seasonal procedure and two machine-learning models, on ten years of five-minute bars at Pepperstone's real spread. Every rule was written down first and the last two years kept aside. None earned its spread: the best idea made 3 points a trade before costs and still fell short of the bar.",
    eyebrow: "Strategy research · scalping",
    metrics: [
      { value: "21", label: "scalping variants tested" },
      { value: "0", label: "passed" },
      { value: "5%", label: "of a 30-minute DAX move goes on the spread" },
    ],
  },
  {
    slug: "bill-williams-trading-chaos-tested",
    title: "Bill Williams' Trading Chaos, tested on forex",
    short: "Trading Chaos, tested",
    date: "2026-11-12",
    summary:
      "The three Wise Men, written as fixed rules: the divergent bar to get in, the Awesome Oscillator and fractals to add on in a 1-4-3-2-1 pyramid, the Alligator's red line to get out. Tested on nine forex pairs on hourly, four-hour and daily charts against random starts managed the same way. It failed on all three; its one pass rested on five trades and was gone in later years.",
    eyebrow: "Strategy research · myth busting",
    metrics: [
      { value: "0 of 3", label: "charts passed" },
      { value: "5 of 2,949", label: "campaigns carried the one pass" },
      { value: "−0.349R", label: "a campaign on unseen years" },
    ],
  },
  {
    slug: "market-timing-folklore",
    title: "Market timing folklore: 14 timing rules, tested",
    short: "Market timing folklore",
    date: "2026-09-30",
    summary:
      "The London fix, the overnight drift, the Fed's calendar, the turn of the month, Shanghai's gold hours and bitcoin's evening, each written as a fixed rule and tested at a real broker's costs. Most of the patterns are real. Almost none of them pays, and one only worked once I changed the hour I paid the spread.",
    eyebrow: "Strategy research · myth busting",
    metrics: [
      { value: "14", label: "timing rules tested" },
      { value: "0", label: "passed as first written" },
      { value: "t 5.06", label: "bitcoin's evening, before fees" },
    ],
  },
  {
    slug: "ict-smart-money-concepts-tested",
    title: "ICT and Smart Money Concepts, tested on 23 years of data",
    short: "ICT and Smart Money Concepts, tested",
    date: "2026-10-07",
    summary:
      "Changes of character, liquidity sweeps, order blocks and fair value gaps, written as fixed rules and set against 10,000 random-entry histories at a real broker's costs. Including the four-hour change of character a viral video called the best of 100,000 strategies. None of them passed.",
    eyebrow: "Strategy research · myth busting",
    metrics: [
      { value: "86%", label: "of random runs beat the CHoCH" },
      { value: "23 yrs", label: "of US500 and NAS100" },
      { value: "0 of 6", label: "ICT ideas passed" },
    ],
  },
  {
    slug: "three-strategies-that-held-up",
    title: "Three strategies that held up in my testing",
    short: "Three strategies that held up",
    date: "2026-11-06",
    summary:
      "Over sixty trading ideas through one strict test: written down first, real broker costs, 10,000 random-entry Monte Carlo runs and t above 3. Gotobi on the yen, the NAS100 noise band and the commodity-cross reversion are what held up.",
    eyebrow: "Strategy research · data to September 2026",
    metrics: [
      { value: "60+", label: "ideas tested" },
      { value: "t 4.77", label: "gotobi on USDJPY" },
      { value: "10,000", label: "random runs each" },
    ],
  },
];

// Newest first, wherever the list is shown.
reports.sort((a, b) => b.date.localeCompare(a.date));

export function getReport(slug: string) {
  return reports.find((r) => r.slug === slug);
}
