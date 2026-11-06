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
    slug: "market-timing-folklore",
    title: "Market timing folklore: 14 timing rules, tested",
    short: "Market timing folklore",
    date: "2026-08-07",
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
