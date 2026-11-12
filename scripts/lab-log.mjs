// Builds content/research/lab-log.json from the edge lab's export (tools/export.py writes one
// h<N>.json a hypothesis). The site shows each idea's status and the first lines of its verdict as
// the lab wrote them; nothing here rewords a result.
//
//   node scripts/lab-log.mjs [EXPORT_DIR]
//
// EXPORT_DIR defaults to the edge lab's artifacts/export beside this repo.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dir = process.argv[2] ?? "D:/itrad/repos/itradeaims-edge-lab/artifacts/export";

// Tests of the owner's own products stay in the lab's log and off the public page; other people's
// named products are published.
const OWN_PRODUCTS = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 14, 15, 22, 67, 68, 69, 70, 72, 73, 74, 75, 76]);

// Where the verdict's opening words contradict the status a reader sees, the page carries a plain
// summary instead, with the verdict's own figures. The watch list (the lab's ADR 0005) is a status
// no verdict line carries, so those verdicts open "Killed"; others open with what held before what failed.
const SUMMARY = {
  59: "Failed on cost. The reversion is real: in three feeds before costs (t 10.5), in every year from 2005 to 2011, and at t 5.89 in years no test had seen. But a trade's gross fell from 9.6 pips before 2010 to 2.3 from 2020, so after costs it has made about nothing since 2015, and the holdout was already lost on hypothesis 57.",
  58: "Failed on cost. The day's score clears t 3, but NZDCAD loses, so it is not robust, and per trade it makes t 1.98 and nothing since 2025-04. The stretch does revert (t 9.3 before costs); at the broker's spread a trade keeps about half a pip.",
  25: "Over the bar, not robust, so on the watch list. Long or flat on the 4-week trend makes +1.310% a week, t 3.42, beating every random run, but only t 1.94 without its best ten weeks. It is kept to be judged on the months to come.",
  24: "Below the bar, so on the watch list. The 12-month trend makes +0.627% a month, t 2.28, and beats 95.0% of random runs, but loses from 2012 on. It is kept to be judged on the months to come.",
  19: "Below the bar, so on the watch list. Intraday momentum makes nothing, and the turn of the month adds nothing to the index's drift. The pre-FOMC drift is the one with a sign: NAS100 and US500 long into a scheduled statement make +0.051R pooled, t 2.11, beating 94.6% of random runs. It is kept to be judged on the statements to come.",
  23: "Failed at the first step, so never scored: the replay does not match the account. Only 58.1% of trades replay within 1 pip of the ledger, against the 80% required; the gap is the feeds' spread, not the entries' timing.",
};

// The verdict's opening sentences, up to about 320 characters, without the lab's list dashes or
// pointers into its own files, which a reader of the site cannot open.
function result(verdict) {
  if (!verdict) return null;
  const text = verdict
    .replace(/\s+-\s+/g, " ")
    .replace(/^killed\b/, "Killed")
    .replace(/^Corrected verdict:\s*/, "")
    .replace(/\s*\((?:artifacts|tools|docs)\/[^)]*\)/g, "")
    .replace(/^\d+ killed\b/, "Killed")
    .replace(/goal\.md's/g, "the lab's")
    .replace(/ADR \d+'s/g, "the lab's")
    .replace(/\s*\(goal\.md\)/g, "")
    .trim();
  const sentences = text.split(/(?<=[.;:])\s+(?=[A-Z])/);
  let out = "";
  for (const s of sentences) {
    if (out && out.length + s.length + 1 > 320) break;
    out += (out ? " " : "") + s;
  }
  return out.charAt(0).toUpperCase() + out.slice(1);
}

const entries = readdirSync(dir)
  .filter((f) => /^h\d+\.json$/.test(f))
  .map((f) => JSON.parse(readFileSync(join(dir, f), "utf8")))
  .filter((h) => !OWN_PRODUCTS.has(h.hypothesis))
  .map((h) => ({
    n: h.hypothesis,
    title: h.title,
    status: h.status,
    result: h.status === "testing" ? null : (SUMMARY[h.hypothesis] ?? result(h.verdict)),
    written: h.written ?? null,
    scored: h.scored ?? null,
  }))
  .sort((a, b) => b.n - a.n);

writeFileSync(new URL("../content/research/lab-log.json", import.meta.url), JSON.stringify(entries, null, 1) + "\n");
console.log(`${entries.length} entries`);
