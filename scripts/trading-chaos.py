"""Builds content/research/bill-williams-trading-chaos-tested.json from the edge lab's runs of
hypotheses 77 and 78 (tools/fruit.py and tools/fruit_campaign.py there). It reads the lab's own
results and campaign files and re-derives only what the report draws: running totals, the split by
entries reached, and the result without the best campaigns. The t's are taken the lab's way, over
server days of (campaign R - its twins' mean R), and the script stops if it cannot reproduce the
lab's own figures.

    <edge-lab>/.venv/Scripts/python scripts/trading-chaos.py [ARTIFACTS_DIR]

ARTIFACTS_DIR defaults to the edge lab's artifacts beside this repo. Needs pandas and pyarrow.
"""
import json, sys
from pathlib import Path
import numpy as np, pandas as pd

art = Path(sys.argv[1] if len(sys.argv) > 1 else "D:/itrad/repos/itradeaims-edge-lab/artifacts")
out = Path(__file__).resolve().parent.parent / "content" / "research" / "bill-williams-trading-chaos-tested.json"

h77 = json.loads((art / "fruit_h77.json").read_text())
h78 = json.loads((art / "fruit_campaign_h78.json").read_text())


def tstat(x):
    x = np.asarray(x, float)
    return float(x.mean() / x.std(ddof=1) * np.sqrt(len(x)))


def t_vs_twins(df):
    return tstat((df.r - df.twin_r).groupby(df.t // 86400).sum())


def cum(df, points=320):
    df = df.sort_values("t")
    day = pd.to_datetime(df.t, unit="s").dt.strftime("%Y-%m-%d").to_numpy()
    rule, twin = df.r.cumsum().to_numpy(), df.twin_r.fillna(0).cumsum().to_numpy()
    keep = np.unique(np.linspace(0, len(df) - 1, points).round().astype(int))
    # The lab keeps each campaign's twins' mean, not each twin, so there is no band to draw: the
    # random line is the twins' average, campaign by campaign.
    tw = [round(float(v), 1) for v in twin[keep]]
    return {"date": day[keep].tolist(), "rule": [round(float(v), 1) for v in rule[keep]], "p5": tw, "p50": tw, "p95": tw}


def check(df, s, label):
    for k, got in (("mean", df.r.mean()), ("t_vs_twin", t_vs_twins(df))):
        if abs(got - s[k]) > 0.006:
            sys.exit(f"{label} {k}: lab {s[k]}, here {got:.4f}")


variants = [{"name": name, **{k: s[k] for k in ("n", "hit_pct", "mean", "twin", "t_own", "t_vs_twin", "by_year")}}
            for name, s in h77["in_sample"].items()]

charts = {}
for name in ("H1", "H4", "D1"):
    df = pd.read_parquet(art / f"fruit_campaign_h78_{name}.parquet")
    s = h78[name]["in_sample"]
    check(df, s, name)
    charts[name] = {k: s[k] for k in ("n", "days", "mean", "median", "twin", "t_own", "t_vs_twin", "median_nights", "by_year", "entries", "ends")}

h4 = pd.read_parquet(art / "fruit_campaign_h78_H4.parquet")
h4o = pd.read_parquet(art / "fruit_campaign_h78_H4_out.parquet")
so = h78["H4"]["out_sample"]
check(h4o, so, "H4 out")

by_entries = [{"entries": int(k), "n": int(len(g)), "mean": round(float(g.r.mean()), 3), "total": round(float(g.r.sum()), 1)}
              for k, g in h4.groupby("entries")]

ranked = h4.sort_values("r", ascending=False)
without = [{"drop": k, "mean": round(float(ranked.iloc[k:].r.mean()), 3), "t_vs_twin": round(t_vs_twins(ranked.iloc[k:]), 2)}
           for k in (0, 5, 10, 20)]

def years(df):
    y = pd.to_datetime(df.t, unit="s").dt.year
    g = df.assign(y=y, day=df.t // 86400).groupby("y")
    return {"year": [int(k) for k in g.groups], "mean": [round(float(v), 3) for v in g.r.mean()],
            "days": [int(v) for v in g.day.nunique()]}


when = pd.to_datetime(h4.t, unit="s")
halves = [{"span": span, "n": int(len(g)), "mean": round(float(g.r.mean()), 3), "t_vs_twin": round(t_vs_twins(g), 2)}
          for span, g in (("2005 to mid-2010", h4[when < "2010-07-01"]), ("mid-2010 to 2015", h4[when >= "2010-07-01"]))]

data = {
    "h77": {"variants": variants, "chosen": h77["chosen"]},
    "h78": {
        "charts": charts,
        "h4_out": {k: so[k] for k in ("n", "days", "mean", "median", "twin", "t_own", "t_vs_twin", "median_nights", "by_year", "by_pair", "entries", "ends")},
        "h4_by_entries": by_entries,
        "h4_without_best": without,
        "h4_best": [round(float(v), 1) for v in ranked.r.iloc[:5]],
        "h4_total": round(float(h4.r.sum()), 1),
        "h4_halves": halves,
        "h4_years": years(h4),
        "h4_out_years": years(h4o),
        "h4_cum": cum(h4),
        "h4_out_cum": cum(h4o),
    },
}
out.write_text(json.dumps(data, separators=(",", ":")) + "\n")
print(out, "written")
print(json.dumps({k: data["h78"][k] for k in ("h4_by_entries", "h4_without_best", "h4_best", "h4_total", "h4_halves")}, indent=1))
