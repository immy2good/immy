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

export function getReport(slug: string) {
  return reports.find((r) => r.slug === slug);
}
