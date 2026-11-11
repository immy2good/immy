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
const OWN_PRODUCTS = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 14, 15, 22, 67, 68, 69, 70, 72]);

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
    result: h.status === "testing" ? null : result(h.verdict),
    written: h.written ?? null,
    scored: h.scored ?? null,
  }))
  .sort((a, b) => b.n - a.n);

writeFileSync(new URL("../content/research/lab-log.json", import.meta.url), JSON.stringify(entries, null, 1) + "\n");
console.log(`${entries.length} entries`);
