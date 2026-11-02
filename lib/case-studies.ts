export type Tone = "green" | "amber" | "blue" | "rose";

export type DiagramNode = {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub: string;
  tone: Tone;
  detail: string;
};

// A label sits at the path's midpoint unless `label` gives its own position.
export type DiagramEdge = {
  from: string;
  to: string;
  path: string;
  text?: string;
  label?: { x: number; y: number; anchor?: "start" | "middle" | "end" };
};

export type JourneyStep = { text: string; node: string; edges: string[] };

export type Diagram = {
  width: number;
  height: number;
  zoneTop: number;
  zoneHeight: number;
  zones: { x: number; w: number; label: string; tone: Tone }[];
  nodes: Record<string, DiagramNode>;
  edges: Record<string, DiagramEdge>;
  journeys: Record<string, JourneyStep[]>;
  footnote: { x: number; y: number; text: string };
};

export type Decision = { title: string; tag: string; decision: string; rejected: string };
export type Incident = { title: string; tag: string; symptom: string; diagnosis: string; fix: string };

export type CaseStudy = {
  slug: string;
  number: string;
  category: string;
  title: string;
  cardTitle: string;
  summary: string;
  metrics: { value: string; label: string }[];
  tags: string[];
  eyebrow: string;
  headline: string;
  lede: string;
  meta: { label: string; value: string }[];
  stats: { value: string; label: string }[];
  problem: { wrongTitle: string; wrong: string[]; neededTitle: string; needed: string[] };
  diagram: Diagram;
  decisions: Decision[];
  incidentsTitle: string;
  incidentsIntro: string;
  incidents: Incident[];
  method: string[];
  tech: string[];
  cta: { title: string; body: string[] };
  disclaimer: string;
  links?: { label: string; href: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "banana-ea",
    number: "01",
    category: "Flagship product · MT4 → MT5",
    title: "Rebuilding Banana EA, a trading robot customers have run since 2017, for MetaTrader 5",
    cardTitle: "Banana EA: rebuilding a flagship trading robot for MT5",
    summary:
      "An audit of the MT4 engine found 23 defects. The MT5 rebuild fixes each one behind a failing test first, explains every difference from the old version, and took its exit design from a customer's own research.",
    metrics: [
      { value: "23", label: "audited defects fixed" },
      { value: "1,416", label: "engine test assertions" },
      { value: "33", label: "merged pull requests" },
    ],
    tags: ["MQL5", "MQL4", "Python", "Strategy Tester", "ADRs"],
    eyebrow: "Case study · Trading software · Product engineering",
    headline: "Rebuilding Banana EA, a trading robot customers have run since 2017, for MetaTrader 5",
    lede:
      "Banana EA is the flagship of my trading-software business, iTradeAIMS: an automated expert advisor for the DAX index on 5-minute charts. Customers have run it on MetaTrader 4 since 2017. Moving it to MetaTrader 5 meant changing how a live product behaves for people who already trust it, so I didn't port the old code. I audited it, rebuilt the engine cleanly, and made every change from the old behaviour something I could name and test.",
    meta: [
      { label: "Role", value: "Owner, product lead, developer" },
      { label: "Timeline", value: "MT4 product since 2017 · MT5 rebuild Sep – Oct 2026" },
      { label: "Status", value: "MT4 6.6 sold to customers · MT5 7.0 in demo validation" },
      { label: "Customer reviews", value: "iTradeAIMS: 4.8/5 from 56 on Forex Peace Army, 4.3/5 from 17 on Trustpilot (read Aug 2026)" },
    ],
    stats: [
      { value: "122", label: "commits in the MT5 rebuild" },
      { value: "23", label: "defects found by the audit, all fixed" },
      { value: "1,416", label: "assertions in the headless engine suite" },
      { value: "4", label: "written architecture decisions" },
      { value: "6", label: "robustness stages before any release" },
    ],
    problem: {
      wrongTitle: "Why a straight port was the wrong move",
      wrong: [
        "The MT4 engine had grown around one 3,377-line class with no behaviour tests. Porting it would have carried its bugs to MT5.",
        "Some bugs only appeared after a restart: pending orders that never expired, partial closes that fired twice, risk limits that forgot the day's losses.",
        "Without a way to compare the two versions decision by decision, \"it trades the same\" would have been a guess.",
      ],
      neededTitle: "What customers and the business needed",
      needed: [
        "An MT5 version that behaves as well as 6.6 or better, with nothing changed by accident.",
        "Risk rules (daily drawdown, loss limits, lot caps) that hold on every tick and survive a restart.",
        "Proof gathered on demo accounts before any customer runs it.",
        "Licensing, so the MT5 build is protected like the rest of the range.",
      ],
    },
    diagram: {
      width: 950,
      height: 420,
      zoneTop: 20,
      zoneHeight: 360,
      zones: [
        { x: 15, w: 215, label: "Reference & research", tone: "blue" },
        { x: 260, w: 215, label: "Engine · pure MQL5", tone: "amber" },
        { x: 505, w: 215, label: "Guards & broker", tone: "rose" },
        { x: 750, w: 185, label: "Evidence", tone: "green" },
      ],
      nodes: {
        mt4: { x: 32, y: 70, w: 180, h: 60, title: "MT4 6.6 reference", sub: "the version customers run", tone: "blue", detail: "The behaviour reference, not the specification. An owner ruling says the MT5 build should be better, not identical: a difference is accepted when its cause and the evidence for it are written down. 6.6 also writes a decision trace, one CSV row per signal decision, so the two versions can be compared bar by bar." },
        mazi: { x: 32, y: 200, w: 180, h: 60, title: "Customer research", sub: "Mazi's guide and tests", tone: "blue", detail: "Mazi, a Banana EA customer, wrote a 19-page guide for the iTradeAIMS community on running prop-firm challenges with the EA and testing it properly: in-sample, out-of-sample and forward periods, realistic spreads, and reading drawdown as risk. Their research showed the old three-step profit ladder relied on rare, very large moves, and it shaped the new exit design." },
        eng: { x: 277, y: 70, w: 180, h: 60, title: "Signal engine", sub: "pure series math", tone: "amber", detail: "Finds Banana setups from raw price series, with zero indicator handles. MT5 indicator handles can report 'not ready' at the worst moment; one of the reproduced defects was a break-even that never fired because an indicator value was unavailable while the broker quote was fine. Entries are pending stop orders at the setup extreme, with a bar-count expiry." },
        tm: { x: 277, y: 200, w: 180, h: 60, title: "Trade manager", sub: "exit state machine", tone: "amber", detail: "Manages each open position as an explicit state machine: bank half at +1R, hold the structural stop, move to break-even at +3R, then trail the runner on ATR. Its state is keyed by the broker's position ID, so a restart can't make a partial close fire twice." },
        risk: { x: 522, y: 70, w: 180, h: 60, title: "Risk guards", sub: "drawdown · loss limits · lot cap", tone: "rose", detail: "Daily drawdown, a maximum of one full loss per day, progressive risk reduction and a lot-size cap. Guards are checked on every tick, against current equity. When a guard blocks trading it also cancels this EA's resting pending orders, so a blocked day can't be traded by an order placed earlier." },
        broker: { x: 522, y: 200, w: 180, h: 60, title: "Broker gateway", sub: "orders · fills · deals", tone: "rose", detail: "The only code that talks to the broker. It sits behind a port, so tests can swap in a fake broker, market, state store and deal ledger. 'Close everything' is a state held every tick until the account is flat, not a single request a requote can lose." },
        lic: { x: 522, y: 305, w: 180, h: 55, title: "Licence gate", sub: "server-checked serial", tone: "rose", detail: "The licensed build checks its serial with the iTradeAIMS licence server before trading. Server credentials and customer serials are kept out of source, logs and release ZIPs." },
        tests: { x: 765, y: 70, w: 155, h: 60, title: "Headless tests", sub: "fake broker adapters", tone: "green", detail: "A test EA runs the real engine against fake adapters inside the MT5 Strategy Tester. 1,416 assertions at the final run. Every defect fix started with a regression that failed first; the run IDs are recorded next to the fix." },
        parity: { x: 765, y: 200, w: 155, h: 60, title: "Parity diff", sub: "every divergence named", tone: "green", detail: "A Python tool joins the MT4 and MT5 decision traces on symbol, bar time and side, over a stated window. It passes only when every divergence has a named cause. A run that compared nothing fails, because a check that measured nothing proves nothing." },
        gate: { x: 765, y: 305, w: 155, h: 55, title: "Robustness gate", sub: "6 stages before release", tone: "green", detail: "No release or preset ships until it clears a written gate: walk-forward analysis, a blind 18-month out-of-sample period, Monte Carlo ruin limits, parameter-neighbourhood stability and higher-spread stress. The thresholds were fixed before the tests ran." },
      },
      edges: {
        ref: { from: "mt4", to: "eng", path: "M212,100 L277,100", text: "reference" },
        rules: { from: "mazi", to: "tm", path: "M212,230 L277,230", text: "exit rules" },
        setup: { from: "eng", to: "tm", path: "M367,130 L367,200", text: "position" },
        order: { from: "eng", to: "risk", path: "M457,100 L522,100", text: "order" },
        manage: { from: "tm", to: "broker", path: "M457,230 L522,230", text: "manage" },
        allow: { from: "risk", to: "broker", path: "M612,130 L612,200", text: "allowed?" },
        licensed: { from: "lic", to: "broker", path: "M612,305 L612,260", text: "licensed?" },
        fake: { from: "broker", to: "tests", path: "M702,215 C735,215 735,100 765,100", text: "fake adapters", label: { x: 742, y: 160, anchor: "middle" } },
        trace: { from: "broker", to: "parity", path: "M702,245 L765,245", text: "trace" },
        gated: { from: "parity", to: "gate", path: "M842,260 L842,305", text: "then" },
      },
      journeys: {
        "A trade": [
          { text: "The engine finds a setup on a closed 5-minute bar", node: "eng", edges: [] },
          { text: "Risk guards check today's drawdown, losses and the lot cap", node: "risk", edges: ["order"] },
          { text: "If allowed, a pending stop order goes to the broker", node: "broker", edges: ["allow"] },
          { text: "On fill, the trade manager takes over the position", node: "tm", edges: ["setup"] },
          { text: "It banks half, moves the stop and trails the runner", node: "broker", edges: ["manage"] },
        ],
        "A change": [
          { text: "A finding arrives: an audit defect or a customer's research", node: "mazi", edges: [] },
          { text: "The change is written into the trade manager's rules", node: "tm", edges: ["rules"] },
          { text: "A regression test fails first, then passes with the fix", node: "tests", edges: ["fake"] },
          { text: "The parity diff names the new divergence from MT4", node: "parity", edges: ["trace"] },
          { text: "Nothing ships until the robustness gate is cleared", node: "gate", edges: ["gated"] },
        ],
        Licence: [
          { text: "The licensed build starts on the customer's MT5", node: "lic", edges: [] },
          { text: "It checks its serial with the licence server before trading", node: "broker", edges: ["licensed"] },
        ],
      },
      footnote: { x: 30, y: 405, text: "Every development run trades demo accounts only. The scripts read the account type from MT5 itself before placing an order." },
    },
    decisions: [
      { title: "Rebuild clean, with MT4 as the reference", tag: "Architecture", decision: "The MT5 engine was written from scratch in modern MQL5. MT4 6.6 is the behaviour to beat, not the code to copy: a difference is fine when its cause and evidence are recorded.", rejected: "Rejected: a line-by-line port, which would have carried 23 known defects and a 3,377-line untested class into the new platform." },
      { title: "Every divergence needs a name", tag: "Verification", decision: "Both versions write the same decision-trace format. The parity diff joins them bar by bar and fails on any difference without a named cause, or on a run that compared nothing.", rejected: "Rejected: comparing end-of-test totals. Two versions can reach similar totals for different reasons, and totals can't show which decision changed." },
      { title: "A customer's research changed the exit design", tag: "Product", decision: "Mazi's research, backed by our own backtests across markets, showed the old ladder (partial closes at 3R, 10R and 15R) depended on rare, very large moves. The new design banks half at +1R, moves to break-even at +3R and trails the rest on ATR.", rejected: "Rejected: keeping the ladder for familiarity. Parity with a fragile design isn't a goal." },
      { title: "No indicator handles", tag: "Engineering", decision: "The engine computes everything it needs from raw price series, and one owner computes each value.", rejected: "Rejected: MT5 indicator handles. They can report 'not ready' mid-session, and in testing that stopped a break-even from firing on a valid quote." },
      { title: "Pre-register, then be willing to drop it", tag: "Method", decision: "A comparison of three order policies was frozen in writing before any results were read. When finishing it would have delayed the launch, I dropped it from the release and shipped the simplest policy, keeping the study as optional research.", rejected: "Rejected: reading results first and picking a winner afterwards, and also quietly treating the unfinished study as evidence." },
      { title: "Demo accounts only, checked by the code", tag: "Safety", decision: "Any script that can place an order reads the account type from MT5 and refuses anything but demo. Compile and test runs take a terminal lock so two runs can't collide.", rejected: "Rejected: trusting a config flag or the account name to say 'demo'." },
    ],
    incidentsTitle: "Defects found in the audit, and how the rebuild fixed them",
    incidentsIntro: "Each of these was found by reading the 6.6 code and then reproduced. In the rebuild, each fix began with a test that failed.",
    incidents: [
      { title: "Break-even moved by the wrong distance", tag: "Trade management", symptom: "Break-even and partial closes triggered at distances unrelated to the trade, and at zero after a restart.", diagnosis: "They read the stop size of the last signal the EA evaluated, not the position's own initial risk. After a restart that value was empty.", fix: "Break-even and partial closes read the position's own initial risk, stored against its position ID." },
      { title: "Lot sizes rounded down twice", tag: "Risk", symptom: "A third of tested sizes came out one step small, such as 0.3 lots becoming 0.2.", diagnosis: "The rounding function floored without a tolerance and ran twice. The same floor cut partial closes short.", fix: "One rounding step with a tolerance, covered by tests at the size boundaries." },
      { title: "Daily drawdown judged stale equity", tag: "Risk", symptom: "The daily drawdown limit could react late in a fast market.", diagnosis: "The check used an equity snapshot up to 30 seconds old.", fix: "The limit is evaluated on every tick against current equity." },
      { title: "Blocked days could still trade", tag: "Risk", symptom: "Pending orders filled during a loss-streak block, cooldown or profit lock.", diagnosis: "A block stopped new orders but left orders placed earlier resting at the broker.", fix: "A block now also cancels this EA's resting pending orders, on every tick it is active." },
      { title: "'Close everything' could leave a position open", tag: "Execution", symptom: "After the daily limit was hit, a position sometimes stayed open.", diagnosis: "Close-all sent its requests once. A single requote meant a close was lost and never retried.", fix: "Flattening is a held state: the EA keeps closing every tick until the account is flat." },
      { title: "Restarts made the EA forget", tag: "State", symptom: "After a restart, pending orders never expired and a partial close could fire again.", diagnosis: "Order plans, partial-close progress, loss streaks and the day's peak lived only in memory.", fix: "State is persisted per account and EA instance, and partial-close progress is keyed by the broker's position ID." },
    ],
    method: [
      "I audited 6.6 before writing any MT5 code. One automated triage pass was thrown away because it scored almost every defect between 0.6 and 0.85, which ranks nothing.",
      "Important choices are written as architecture decision records, including the owner rulings that changed them, so the reasons survive the change.",
      "Validation claims name the commands and test runs behind them, and every fix links its failing and passing runs.",
      "I used AI coding agents (Claude Code, Codex) under my direction. I set the rules, rulings and acceptance tests, then reviewed and verified the work.",
      "Customer feedback is evidence too. Mazi's community guide, written with their own testing, fed straight into the architecture.",
    ],
    tech: ["MQL5", "MQL4", "MT5 Strategy Tester", "Python (parity diff, checkers)", "PowerShell", "CSV decision traces", "Server-side licensing", "Architecture decision records"],
    cta: {
      title: "What this means for your project",
      body: [
        "If you have an EA that has grown hard to change, or you need to move one from MT4 to MT5 without changing how it trades by accident, I can audit it, rebuild it behind tests, and show you every difference.",
        "I also add risk guards that survive restarts, decision traces for comparing versions, and server-side licensing.",
      ],
    },
    disclaimer: "This page is about software engineering. It makes no claim about trading results: backtests are not live results, past performance does not predict future results, and most retail traders lose money. iTradeAIMS provides software and education, not financial advice. Mazi's guide and research are credited with their permission. The source code is proprietary; I'm happy to walk you through it on a call.",
    links: [
      { label: "iTradeAIMS on Trustpilot", href: "https://www.trustpilot.com/review/itradeaims.net" },
      { label: "iTradeAIMS on Forex Peace Army", href: "https://www.forexpeacearmy.com/forex-reviews/8009/www.itradeaims.net" },
    ],
  },
  {
    slug: "licensing",
    number: "02",
    category: "Security engineering · MT4/MT5",
    title: "Licensing that protects paid MetaTrader indicators, without making customers type a serial key",
    cardTitle: "EA and indicator licensing for MT4/MT5",
    summary:
      "A server-side licence system for my commercial MetaTrader products: one-click activation, per-install credentials and signed short-lived licences checked by a C++ library.",
    metrics: [
      { value: "243", label: "merged pull requests" },
      { value: "31", label: "design decisions" },
      { value: "15/15", label: "crypto test vectors" },
    ],
    tags: ["Laravel", "MQL5", "C++", "RSA-PSS", "HMAC"],
    eyebrow: "Case study · Trading software · Security engineering",
    headline: "Licensing that protects paid MetaTrader indicators, without making customers type a serial key",
    lede:
      "I designed and shipped a licence system for my own trading-software business, iTradeAIMS. The server decides who may run each product. The customer's computer only proves it is allowed. Customers activate with one click from their member dashboard.",
    meta: [
      { label: "Role", value: "Owner, architect, lead developer" },
      { label: "Timeline", value: "May 2026 – present" },
      { label: "Status", value: "Live with paying customers since June 2026" },
    ],
    stats: [
      { value: "841", label: "commits on the licence server" },
      { value: "31", label: "written design decisions" },
      { value: "170", label: "automated test files" },
      { value: "15/15", label: "crypto test vectors pass in CI" },
      { value: "2", label: "DLL builds: 64-bit MT5 and 32-bit MT4" },
    ],
    problem: {
      wrongTitle: "What was wrong with the usual approach",
      wrong: [
        "Serial keys get shared, pasted into forums, and lost by customers. They also create support tickets.",
        "Compiled MetaTrader code can be decompiled, so a check that lives only inside the indicator can be removed.",
        "Locking to \"this PC\" is weak: hardware hints can be faked and break when customers upgrade.",
      ],
      neededTitle: "What the business needed",
      needed: [
        "Only paying members can run a product, on a limited number of installs.",
        "Access can be revoked after refunds and cancellations.",
        "Activation simple enough that it doesn't flood support.",
        "Products keep working through short internet or server outages.",
      ],
    },
    diagram: {
      width: 880,
      height: 400,
      zoneTop: 20,
      zoneHeight: 345,
      zones: [
        { x: 15, w: 210, label: "Website", tone: "green" },
        { x: 315, w: 220, label: "Server · trusted", tone: "amber" },
        { x: 645, w: 220, label: "Customer PC · untrusted", tone: "rose" },
      ],
      nodes: {
        site: { x: 30, y: 70, w: 180, h: 60, title: "Member website", sub: "WordPress + memberships", tone: "green", detail: "Where customers buy and manage products. A logged-in member clicks Activate, and the website asks the licence server for a one-time activation file on the member's behalf. The website never decides who owns what; it only passes on signed events." },
        srv: { x: 330, y: 70, w: 190, h: 60, title: "Licence server", sub: "the single source of truth", tone: "amber", detail: "Owns every rule: who is entitled to which product, how many installs they may use, and whether a request is genuine. It checks each request's signature and timestamp, and rejects any request it has already seen." },
        db: { x: 330, y: 200, w: 190, h: 60, title: "Licence database", sub: "installs · credentials · audit", tone: "amber", detail: "Records each activated install, its secret credential, and a full audit trail. All tables are transactional, so a half-finished activation can't leave bad data behind." },
        file: { x: 660, y: 70, w: 190, h: 60, title: "Activation file", sub: "one-time, single-use", tone: "rose", detail: "A small installer that drops a one-time token into MetaTrader. Downloading it does nothing on its own. The token is spent the moment the indicator uses it, so a shared copy is worthless." },
        ind: { x: 660, y: 200, w: 190, h: 60, title: "Indicator in MetaTrader", sub: "customer's computer", tone: "rose", detail: "On first run it uses the activation token, receives its own install credential, then signs every request it sends. Between checks it runs on a signed licence that lasts 6 hours, so it never needs to call the server on every chart change." },
        dll: { x: 660, y: 290, w: 190, h: 60, title: "Signature-check DLL", sub: "C++ · 64 & 32-bit", tone: "rose", detail: "A small native library that checks the server's digital signature on each licence, using Windows' built-in cryptography. A forged or edited licence is rejected. It is tested against 15 fixed vectors on every build." },
      },
      edges: {
        buy: { from: "site", to: "srv", path: "M210,90 L330,90", text: "signed purchase event" },
        act: { from: "site", to: "srv", path: "M210,115 L330,115", text: "request activation" },
        rec: { from: "srv", to: "db", path: "M425,130 L425,200", text: "record" },
        dl: { from: "srv", to: "file", path: "M520,92 L660,92", text: "one-time file" },
        use: { from: "file", to: "ind", path: "M755,130 L755,200", text: "token" },
        auth: { from: "ind", to: "srv", path: "M660,222 C600,222 580,125 520,120", text: "signed request" },
        lease: { from: "srv", to: "ind", path: "M520,245 C580,252 620,252 660,248", text: "signed 6h licence" },
        ver: { from: "ind", to: "dll", path: "M755,260 L755,290", text: "verify" },
      },
      journeys: {
        Purchase: [
          { text: "Customer buys a membership on the website", node: "site", edges: [] },
          { text: "The website sends a signed purchase event to the licence server", node: "srv", edges: ["buy"] },
          { text: "The server maps the membership to products and records the entitlement", node: "db", edges: ["rec"] },
        ],
        Activation: [
          { text: "Logged-in member clicks Activate on their dashboard", node: "site", edges: [] },
          { text: "The website asks the server; the server checks the install limit", node: "srv", edges: ["act"] },
          { text: "The member downloads a one-time activation file", node: "file", edges: ["dl"] },
          { text: "The file places the token where MetaTrader can find it", node: "ind", edges: ["use"] },
          { text: "The indicator spends the token in a signed request; the install is bound", node: "srv", edges: ["auth"] },
          { text: "The server stores the install and its credential", node: "db", edges: ["rec"] },
        ],
        "Everyday use": [
          { text: "The indicator starts and checks its saved licence locally first", node: "ind", edges: [] },
          { text: "Only when that licence has expired does it send a signed check to the server", node: "srv", edges: ["auth"] },
          { text: "The server checks entitlement, the signature, and that the request isn't a replay", node: "db", edges: ["rec"] },
          { text: "The server returns a fresh signed licence, valid for 6 hours", node: "ind", edges: ["lease"] },
          { text: "The DLL verifies the signature; a forged licence is rejected", node: "dll", edges: ["ver"] },
        ],
      },
      footnote: { x: 30, y: 390, text: "Trust boundary: nothing on the customer's PC is trusted. It must prove itself to the server every time." },
    },
    decisions: [
      { title: "No serial keys: activation by one-time file", tag: "UX + security", decision: "Customers click Activate in their dashboard and open a small file. No key is shown or typed.", rejected: "Rejected: serial keys (a secret that sits in customers' hands forever and causes copy-paste support work); building a custom installer per customer (heavy infrastructure for little gain). A device-code flow is kept for the future." },
      { title: "The server decides, the client only proves", tag: "Architecture", decision: "Entitlement, install limits and revocation live only on the server. Each install gets its own credential and signs every request with it, including a timestamp and a single-use number so recorded requests can't be replayed.", rejected: "Rejected: trusting hardware fingerprints as identity, and relying on obfuscated code. Compiled MetaTrader code can be reversed, so the real protection is the server plus the signature chain." },
      { title: "Signature checks in a small C++ library", tag: "Engineering", decision: "A ~200-line C++ wrapper around Windows' built-in cryptography verifies licences, built in CI for both MT5 (64-bit) and MT4 (32-bit).", rejected: "Rejected: doing RSA maths in pure MQL5. I proved it could work, but it was hundreds of lines of custom big-number code, which is harder to audit than a thin wrapper over the operating system." },
      { title: "Single use is enforced when the token is spent, not when it's downloaded", tag: "Security", decision: "Downloading the activation file is harmless and can be retried, which helps customers with flaky downloads. The token is burned only when the indicator uses it, inside a signed request.", rejected: "Rejected: one-download links, which broke for real customers (browser quirks, retries) and added no security." },
      { title: "One delivery path, made reliable", tag: "Product", decision: "Activation happens only through the logged-in dashboard, because the login is the customer's identity. I chose to make that one path robust instead of adding an email path.", rejected: "Rejected: emailed activation links, an unauthenticated second channel that would not have fixed the real faults behind the 'activation doesn't work' reports (see the problems below)." },
      { title: "Merging to main deploys to production", tag: "Operations", decision: "Every merge is promoted automatically and stamped with its commit, so 'what is live?' always has an answer.", rejected: "Rejected: a manual production button. It was meant as a safety gate, but in practice it let staging and production drift apart without anyone noticing." },
    ],
    incidentsTitle: "Problems found in production, and how I fixed them",
    incidentsIntro: "The system went live, real customers used it, and real problems showed up. Each fix came from evidence: server audit logs, client logs, or reading the code.",
    incidents: [
      { title: "Request storms when traders changed timeframe", tag: "Performance", symptom: "Server logs showed bursts of licence checks every time a trader switched timeframe or chart template.", diagnosis: "MetaTrader restarts indicators on many purely cosmetic events, and the indicator was re-checking with the server each time, on every open chart at once, even though it already held a valid licence.", fix: "Licensing was decoupled from the chart lifecycle. The indicator checks its saved licence locally first, and licence lifetime was raised from 2 minutes to 6 hours, which safely removed almost all of the calls." },
      { title: "Genuine requests rejected as 'replays'", tag: "Security", symptom: "Some valid customers were refused with a duplicate-request error.", diagnosis: "The first idea was to make the server more lenient. Reading the client code showed it never reuses a request number. The real cause was two charts generating the same 'random' number in the same millisecond.", fix: "Fixed at the source: the number generator in the client. The server's replay protection stayed strict, and no security hole was opened." },
      { title: "Paying customers with nothing to activate", tag: "Data integrity", symptom: "Reports said 'activation doesn't work'.", diagnosis: "Investigation found several separate causes: some memberships were never mapped to a licence, browsers blocked the download pop-up, and the request storms above. The login requirement wasn't the problem.", fix: "Fixed each cause: provisioning mapped correctly, the download started inside the user's click with the right server headers, and clearer sign-in prompts added." },
      { title: "38 of 41 database tables were not transactional", tag: "Data integrity", symptom: "Code that relied on rollback and row locks wasn't really protected.", diagnosis: "The production database defaulted to MySQL's non-transactional engine. Only the 3 tables that explicitly asked for InnoDB were safe. MySQL accepts transaction commands on the others and silently ignores them.", fix: "Made InnoDB a standing rule, enforced in the code, and converted the affected tables." },
      { title: "The same product bundle defined in two systems", tag: "Consistency", symptom: "Bundle members were sometimes granted for life even when the parent membership was time-limited.", diagnosis: "The bundle existed both as a WordPress snippet and as a licence-server rule, with different lifecycles. They disagreed in production.", fix: "The licence server became the only owner of bundles. The WordPress side no longer grants entitlement." },
      { title: "Nobody could tell what version was live", tag: "Operations", symptom: "Production looked 'out of date', which was indistinguishable from a real bug.", diagnosis: "A build-identity endpoint already existed, but the pipeline never filled it in, so it always reported 'unstamped'.", fix: "Every build is now stamped with its commit and run, and production is deployed on merge." },
    ],
    method: [
      "Every important choice is a short written decision record, so the system can be explained and changed safely.",
      "Work moved through gates: design, test harness, staging with fake customers, then production. Each gate needed evidence before the next one opened.",
      "I used AI coding agents (Claude Code, Codex) under my direction. I wrote the specs, decisions and acceptance tests, then reviewed and verified the output. That let one person build what would normally take a small team.",
      "Merging to the main branch deploys to production, and every build records which commit it came from, so it's always clear what is running live.",
    ],
    tech: ["PHP / Laravel", "MySQL", "WordPress + Paid Memberships Pro", "MQL5 / MQL4", "C++ (Windows CNG)", "RSA-PSS-SHA256 signatures", "HMAC request signing", "Inno Setup installers", "GitHub Actions", "Docker", "PowerShell"],
    cta: {
      title: "What this means for your project",
      body: [
        "If you sell an EA or indicator, I can add server-side licensing to it: activation, install limits, revocation and offline grace. Or I can review the protection you already have.",
        "I also build MT4/MT5 EAs and indicators, and port TradingView scripts to MQL5 with tests that prove the two versions match.",
      ],
    },
    disclaimer: "This page describes the architecture only. Server addresses, secrets and customer data are deliberately left out. The source code is proprietary; I'm happy to walk you through the system live on a call.",
  },
  {
    slug: "confluence-pack",
    number: "03",
    category: "MQL5 · Trading software",
    title: "A five-in-one MetaTrader 5 indicator pack where every trading rule is tested without opening MetaTrader",
    cardTitle: "Confluence Pack for MT5",
    summary:
      "Four analysis indicators and a dashboard that reads them all, installed as one file. Every rule replays against recorded prices and is compared byte for byte with known-good output.",
    metrics: [
      { value: "1", label: "file to install" },
      { value: "6", label: "golden test suites" },
      { value: "< 5 min", label: "full check before merge" },
    ],
    tags: ["MQL5", "MetaTrader 5", "Golden-file testing", "Test fixtures"],
    eyebrow: "Case study · MQL5 · Trading software",
    headline: "A five-in-one MetaTrader 5 indicator pack where every trading rule is tested without opening MetaTrader",
    lede:
      "The Confluence Pack combines four analysis indicators and a dashboard that reads them all, then tells the trader where the market is and which signals agree. I rebuilt it so every rule can be replayed against recorded prices in seconds and compared to known-good output, and so customers install a single file.",
    meta: [
      { label: "Role", value: "Owner, architect, lead developer" },
      { label: "Timeline", value: "September – October 2026 in this codebase; version 6 under way" },
      { label: "Status", value: "Version 5.1.0 released 23 October 2026" },
    ],
    stats: [
      { value: "567", label: "commits in about four weeks" },
      { value: "15", label: "written design decisions" },
      { value: "6", label: "sets of byte-exact expected output (\"goldens\")" },
      { value: "< 5 min", label: "budget for the full check before any change reaches main" },
      { value: "1", label: "file for the customer to install" },
    ],
    problem: {
      wrongTitle: "What was wrong before",
      wrong: [
        "Behaviour could only be checked through MetaTrader's Strategy Tester: one terminal launch per check, 16 to 75 seconds each, and only with the terminal closed.",
        "Logic was spread across indicator files, so the same rule could behave differently in two products.",
        "Customers had to install and arrange five separate indicators.",
        "Some dashboard text described trading theory that no indicator actually measured, and on a real chart it got the direction wrong.",
      ],
      neededTitle: "What the product needed",
      needed: [
        "Every rule provable by a fast, repeatable test, so changes don't silently alter signals.",
        "A dashboard that only says what the indicators can show.",
        "A one-file install with a single licence key.",
        "Room to add AI features later without putting network access or trading inside the indicators.",
      ],
    },
    diagram: {
      width: 950,
      height: 420,
      zoneTop: 20,
      zoneHeight: 370,
      zones: [
        { x: 10, w: 200, label: "Price data", tone: "green" },
        { x: 250, w: 200, label: "Four analysis layers", tone: "amber" },
        { x: 490, w: 200, label: "Dashboard", tone: "blue" },
        { x: 730, w: 200, label: "Output & checks", tone: "rose" },
      ],
      nodes: {
        live: { x: 20, y: 70, w: 180, h: 60, title: "Live prices", sub: "from the MT5 terminal", tone: "green", detail: "In production, MetaTrader supplies the price bars. Each indicator reads them through a small data interface (a 'seam') instead of calling MetaTrader directly, so the same code can also run on recorded data." },
        rec: { x: 20, y: 200, w: 180, h: 60, title: "Recorded prices", sub: "CSV files, used in tests", tone: "green", detail: "Real market data recorded once and saved as files. In tests, it is fed to the indicators bar by bar, the same way MetaTrader would feed it. No terminal or Strategy Tester is needed." },
        banana: { x: 260, y: 60, w: 180, h: 58, title: "Banana", sub: "trend-entry signals", tone: "amber", detail: "One of the four analysis layers. All its logic lives in shared modules, and the indicator file itself is a thin entry point (a lint rule enforces that)." },
        box: { x: 260, y: 140, w: 180, h: 58, title: "Box", sub: "price ranges & breakouts", tone: "amber", detail: "Finds price ranges and breakouts, then publishes what it found as a structured fact." },
        wave: { x: 260, y: 220, w: 180, h: 58, title: "Elliott Wave", sub: "one wave count at a time", tone: "amber", detail: "Keeps exactly one wave count at a time, with written rules for when a count finishes, fails or goes stale." },
        bubble: { x: 260, y: 300, w: 180, h: 58, title: "Bubble", sub: "momentum signals", tone: "amber", detail: "The fourth analysis layer, with its own rule tests and recorded fixtures like the others." },
        bus: { x: 500, y: 70, w: 180, h: 60, title: "Signal bus", sub: "facts, not opinions", tone: "blue", detail: "Each layer publishes what it measured in a fixed format. The bus format has its own contract test with expected output for every object each product writes." },
        eng: { x: 500, y: 200, w: 180, h: 60, title: "Confluence engine", sub: "market regime first", tone: "blue", detail: "Reads the facts from all four layers. It decides the market regime first (trending, ranging or breaking out), then judges which signals agree. Every line it shows the customer names the fact it is based on." },
        lic: { x: 500, y: 320, w: 180, h: 60, title: "Licence check", sub: "release builds only", tone: "blue", detail: "One key unlocks the whole pack. The check is compiled only into release builds, so development builds and tests run without it." },
        chart: { x: 740, y: 70, w: 180, h: 60, title: "Customer's chart", sub: "dials, verdict, alerts", tone: "rose", detail: "What the trader sees: dials for trend and regime, a verdict, and alerts. From version 5 the Dashboard carries the other four indicators inside it, so the customer installs one file." },
        gold: { x: 740, y: 200, w: 180, h: 60, title: "Golden files", sub: "byte-exact expected output", tone: "rose", detail: "Saved output from a known-good run. A test passes only if the new output matches exactly. Updating a golden is allowed only for an intended behaviour change." },
        gate: { x: 740, y: 320, w: 180, h: 60, title: "Release gate", sub: "under 5 minutes", tone: "rose", detail: "One command compiles all five indicators and runs every rule test and golden comparison in a single terminal launch. It has a time budget: a new check must fit within it or replace an existing one." },
      },
      edges: {
        seam: { from: "live", to: "banana", path: "M200,90 L260,90", text: "data seam" },
        replay: { from: "rec", to: "wave", path: "M200,240 L260,240", text: "replay" },
        f1: { from: "banana", to: "bus", path: "M440,90 L500,90", text: "facts" },
        f2: { from: "box", to: "bus", path: "M440,170 C472,170 470,112 500,112" },
        f3: { from: "wave", to: "bus", path: "M440,250 C478,250 474,118 500,118" },
        f4: { from: "bubble", to: "bus", path: "M440,330 C484,330 478,124 500,124" },
        dec: { from: "bus", to: "eng", path: "M590,130 L590,200", text: "read facts" },
        unl: { from: "lic", to: "eng", path: "M590,320 L590,260", text: "unlock" },
        out: { from: "eng", to: "chart", path: "M680,215 C712,215 712,100 740,100", text: "verdict", label: { x: 712, y: 165 } },
        cmp: { from: "eng", to: "gold", path: "M680,235 L740,235", text: "compare" },
        pass: { from: "gold", to: "gate", path: "M830,260 L830,320", text: "exact match?" },
      },
      journeys: {
        "On a live chart": [
          { text: "MetaTrader delivers new price bars", node: "live", edges: [] },
          { text: "Each layer reads them through its data seam and applies its rules", node: "banana", edges: ["seam"] },
          { text: "The four layers publish what they measured on the bus", node: "bus", edges: ["f1", "f2", "f3", "f4"] },
          { text: "The engine reads the facts, decides the regime, then judges agreement", node: "eng", edges: ["dec"] },
          { text: "The release build's licence check has unlocked the pack", node: "lic", edges: ["unl"] },
          { text: "The trader sees the verdict, dials and alerts", node: "chart", edges: ["out"] },
        ],
        "Testing a change": [
          { text: "Recorded prices are replayed bar by bar, no terminal needed", node: "rec", edges: [] },
          { text: "The same layer code runs on the recorded data", node: "wave", edges: ["replay"] },
          { text: "Their facts go onto the bus, as in production", node: "bus", edges: ["f1", "f2", "f3", "f4"] },
          { text: "The engine produces its reading", node: "eng", edges: ["dec"] },
          { text: "The output is compared byte for byte with the golden files", node: "gold", edges: ["cmp"] },
          { text: "The gate passes only on an exact match, within its time budget", node: "gate", edges: ["pass"] },
        ],
        "Shipping a release": [
          { text: "The gate passes on a clean, committed tree", node: "gate", edges: [] },
          { text: "The licence check is compiled into the release build only", node: "lic", edges: [] },
          { text: "The Dashboard file carries all four layers inside it", node: "eng", edges: ["unl"] },
          { text: "The customer installs one file and enters one key", node: "chart", edges: ["out"] },
        ],
      },
      footnote: { x: 20, y: 412, text: "The same layer code runs on live and recorded prices, so a passing test describes what customers get." },
    },
    decisions: [
      { title: "Rules replay against recorded prices; the Strategy Tester is only a smoke test", tag: "Testing", decision: "Each product reads price data through a small interface. In production MetaTrader fills it; in tests a recorded CSV file does. All rule tests run in one terminal launch, with no tester settings to manage.", rejected: "Rejected: proving behaviour through the Strategy Tester, at 16 to 75 seconds per check with the terminal closed. That is the test pyramid upside down: slow end-to-end runs where fast logic tests belong." },
      { title: "Thin indicator files; all logic in shared modules", tag: "Architecture", decision: "Each indicator file only declares inputs and buffers and forwards events to one object. Logic lives in shared modules (market data, chart drawing, alerts, bus, licence) that every product uses.", rejected: "Rejected: logic inside the indicator files, where it can't be tested on its own and drifts between products. A lint rule now blocks it." },
      { title: "The dashboard only states what an indicator measured", tag: "Product", decision: "Every line of dashboard text names the published fact it rests on. If no indicator measures something, the dashboard doesn't say it until one does.", rejected: "Rejected: writing the owner's trading theory into customer text. It sounded insightful, but on a real chart it called a bullish move in a clear downtrend." },
      { title: "One wave count, not two", tag: "Trading logic", decision: "Elliott Wave keeps a single count, with written rules for when a count is complete, invalid, probably dead or stale, and when a new one may start.", rejected: "Rejected: holding a bullish and a bearish count at the same time. As I put it in the decision, a count is either right or wrong." },
      { title: "A time budget for the checks", tag: "Process", decision: "The full check must finish in under 5 minutes. A new check fits the budget or replaces an old one. An incident fixes its cause instead of adding a permanent guard.", rejected: "Rejected: adding a guard, and then a test for the guard, after every incident. That grew the checks to 31 and about 12 minutes." },
      { title: "The pack stays offline; network and trading go in a separate EA", tag: "Security", decision: "The indicators' only network use is the licence check. Future AI features that need the internet, and anything that places trades, go into a separate, opt-in Companion EA. No indicator ever trades.", rejected: "Rejected: putting web requests or trading into the indicators. MetaTrader blocks web requests in indicators, and trading needs the customer's explicit permission and its own risk controls." },
      { title: "Version 6: one indicator, one engine", tag: "Architecture", decision: "Version 5 runs the four layers as hidden indicators that talk to the dashboard through chart objects. Version 6 merges them into one engine that passes data in memory. It is being built in a new codebase, with this one frozen as a reference.", rejected: "Rejected: keeping the message-passing design. Its timing machinery (hidden hosts, staleness timers, heartbeats) was where the timing bugs lived. Speed was not the reason: it will be measured before and after, not claimed." },
    ],
    incidentsTitle: "Problems found, and how I fixed them",
    incidentsIntro: "Each fix came from evidence: a real chart, timings, or the commit history. Some of the problems were in the product and some were in how it was being built.",
    incidents: [
      { title: "The dashboard called a bullish wave in a clear downtrend", tag: "Product", symptom: "On a real chart, the dashboard's text described the setup as a bullish Wave 3 while the market was clearly falling.", diagnosis: "The text came from a trading theory written into the engine, not from anything an indicator measured.", fix: "Removed the theory from customer text. Every dashboard line now names the published fact it is based on." },
      { title: "Checks took 12 minutes, and much of the work was on the checks", tag: "Process", symptom: "The full check had grown to 31 steps and about 12 minutes. 47 of 255 commits in a month were work on the checks themselves.", diagnosis: "Every incident added a permanent guard, then a test of that guard. Most of it was policing the agents, not testing the product.", fix: "Set a 5-minute budget, deleted the checks that only tested other checks, and made incidents fix their cause." },
      { title: "Behaviour tests were slow and fragile", tag: "Testing", symptom: "Each behaviour check launched a MetaTrader terminal and the Strategy Tester, and couldn't run while the terminal was open.", diagnosis: "The indicator logic read prices straight from MetaTrader, so there was no way to feed it test data.", fix: "Added a data seam to each product, recorded real price data as fixtures, and moved all rule tests into one fast script run." },
      { title: "Process nobody had heard of", tag: "Process", symptom: "About 30 files carried warning banners, a lint rule policed what comments could say, and around ten commits went into rewording comments to satisfy it.", diagnosis: "These mechanisms had been invented along the way and matched no recognised engineering practice.", fix: "New rule: every process step must map to a published practice, or have its own written reason. The invented ones were removed." },
      { title: "Timing bugs between the dashboard and its layers", tag: "Reliability", symptom: "The dashboard sometimes worked from stale or missing facts.", diagnosis: "Each layer turned its data into text on the chart and the dashboard parsed it back, with timers and heartbeats to detect staleness. Most of the timing faults were in that round trip.", fix: "Version 6 removes the round trip: one indicator, one engine, data passed in memory. Only the bus golden changes; every layer's own tests stay." },
    ],
    method: [
      "The code and the tests are the specification. Changing behaviour means changing a test in the same commit, and any rule without a test is listed in one place until it gets one.",
      "Expected output is only re-approved when a behaviour change is intended, so an accidental change can't slip in as a \"new baseline\".",
      "Trading rules came from me as the domain owner, checked against hand-labelled chart snapshots.",
      "I used AI coding agents (Claude Code, Codex) under my direction. I wrote the specs, decisions and acceptance tests, then reviewed and verified the output.",
    ],
    tech: ["MQL5", "MetaTrader 5", "Object-oriented MQL5 modules", "Golden-file testing", "CSV market-data fixtures", "PowerShell build & test tooling", "JavaScript (rule twin for review sheets)", "ONNX (planned, offline models)"],
    cta: {
      title: "What this means for your project",
      body: [
        "If you have an MT4/MT5 indicator or EA that nobody dares change, I can put its rules under tests that replay recorded prices, so you can change it safely.",
        "I can also merge several indicators into one product, add licensing, or port a TradingView script to MQL5 with tests that prove the two versions agree.",
      ],
    },
    disclaimer: "This page describes how the software is built. It makes no claims about trading performance, and internal details are deliberately left out. The source code is proprietary; I'm happy to walk you through it live on a call.",
  },
  {
    slug: "agent-workflow",
    number: "04",
    category: "AI engineering · Software factory",
    title: "AIMStack: the software factory behind iTradeAIMS",
    cardTitle: "AIMStack: the software factory behind iTradeAIMS",
    summary:
      "The production line that built the other products on this page. A spec goes in; AI agents write and cross-review the code in isolated workspaces; nothing ships without evidence; I make every decision that matters.",
    metrics: [
      { value: "4", label: "AI coding tools, one production line" },
      { value: "33", label: "skills in 4 plugins" },
      { value: "15", label: "evidence rules" },
    ],
    tags: ["Claude Code", "Codex", "Cursor", "MCP", "Git worktrees"],
    eyebrow: "Case study · AI engineering · Software factory",
    headline: "AIMStack: the software factory behind iTradeAIMS",
    lede:
      "One person can't build and run a licence server, a range of MetaTrader products and a membership website by hand. So I built a factory to do it: a repeatable line where a written spec goes in, AI coding agents build and review the work under fixed rules, and tested, documented software comes out. The agents do the work. I decide what gets built, I read the evidence, and I merge every change.",
    meta: [
      { label: "Role", value: "Designer and operator of the factory" },
      { label: "Timeline", value: "October 2025 – present" },
      { label: "Built with it", value: "the licence server, Banana EA 7.0, the iTradeAIMS website" },
    ],
    stats: [
      { value: "15", label: "written rules every agent must follow, each tied to a real failure" },
      { value: "4", label: "AI coding tools fed from one source: Claude Code, Codex, Cursor, Antigravity" },
      { value: "33", label: "skills in 4 plugins: method, network, trading, delivery" },
      { value: "836", label: "commits on the factory itself" },
      { value: "1", label: "human who merges: me" },
    ],
    problem: {
      wrongTitle: "What goes wrong with AI agents by default",
      wrong: [
        "Agents report \"tests pass\" or \"it's deployed\" when it isn't true. They are confident whether or not they are right.",
        "Two agents editing the same files overwrite each other.",
        "An agent reviewing its own work, or work from the same model, tends to miss the same mistakes.",
        "When an agent runs out of credits or context, everything it knew is lost.",
      ],
      neededTitle: "What I needed",
      needed: [
        "Several agents working in parallel without getting in each other's way.",
        "Every claim backed by output I can check myself.",
        "Work that survives an agent stopping halfway.",
        "One set of instructions shared by every tool, so they don't drift apart.",
        "Decisions with real consequences, such as deploys, payments and merges, stay with me.",
      ],
    },
    diagram: {
      width: 880,
      height: 450,
      zoneTop: 20,
      zoneHeight: 380,
      zones: [
        { x: 15, w: 210, label: "Human · decides", tone: "green" },
        { x: 315, w: 220, label: "Production line", tone: "amber" },
        { x: 645, w: 220, label: "Workstations · isolated", tone: "blue" },
      ],
      nodes: {
        owner: { x: 30, y: 70, w: 180, h: 60, title: "You (the owner)", sub: "specs · decisions · merges", tone: "green", detail: "I decide what gets built and write it as an issue with acceptance tests. I read the evidence agents produce, and I am the only one who merges to main or approves anything with real-world consequences: deploys, payments, emails to customers." },
        issue: { x: 30, y: 200, w: 180, h: 60, title: "GitHub issues", sub: "the only work queue", tone: "green", detail: "Every piece of work is an issue I have assigned. Agents never pick up work on their own, so two agents never chase the same task and nobody builds something I didn't ask for." },
        orch: { x: 330, y: 70, w: 190, h: 60, title: "Orchestrator", sub: "plans · dispatches · routes", tone: "amber", detail: "A lead agent that breaks an issue into steps, picks which agent should do each one, and routes findings to whoever owns them. It reports back to me with evidence, not opinions." },
        sched: { x: 330, y: 200, w: 190, h: 60, title: "Scheduler", sub: "starts & watches agents", tone: "amber", detail: "Starts each agent in its own workspace, watches whether it is still alive, and starts a replacement if one stops. It is plain tooling; it doesn't make decisions." },
        ckpt: { x: 330, y: 320, w: 190, h: 60, title: "Checkpoint file", sub: "state lives outside agents", tone: "amber", detail: "After every work loop the agent writes down where it is: what's done, what's next, what it has proven. A fresh agent with no memory can pick up from this file." },
        writer: { x: 660, y: 70, w: 190, h: 60, title: "Writer agent", sub: "one per isolated workspace", tone: "blue", detail: "Writes the code in its own copy of the repository (a git worktree), so it can't collide with other agents. It commits work in progress so the reviewer reads exactly what was written." },
        rev: { x: 660, y: 200, w: 190, h: 60, title: "Reviewer agent", sub: "different model family", tone: "blue", detail: "Reads the committed work in a separate workspace and re-runs the checks itself. It comes from a different tool and model family than the writer, so it doesn't share the writer's blind spots. Review stops when a round finds nothing new." },
        gate: { x: 660, y: 320, w: 190, h: 60, title: "Evidence gate", sub: "no output, no merge", tone: "blue", detail: "A script that checks the work's receipt: the commands that were run, their real output, and the exact commit the review approved. A claim without pasted output is treated as a guess, and a sign-off on an older commit doesn't count." },
      },
      edges: {
        spec: { from: "owner", to: "issue", path: "M120,130 L120,200", text: "spec + tests" },
        report: { from: "orch", to: "owner", path: "M330,95 L210,95", text: "plan + evidence" },
        assign: { from: "issue", to: "orch", path: "M210,225 C275,225 265,125 330,120", text: "assigned", label: { x: 270, y: 170 } },
        disp: { from: "orch", to: "sched", path: "M425,130 L425,200", text: "dispatch" },
        launch: { from: "sched", to: "writer", path: "M520,212 C590,212 600,115 660,110", text: "start writer", label: { x: 596, y: 150 } },
        start2: { from: "sched", to: "rev", path: "M520,240 L660,240", text: "start reviewer" },
        wip: { from: "writer", to: "rev", path: "M712,130 L712,200", text: "commit" },
        find: { from: "rev", to: "writer", path: "M800,200 L800,130", text: "findings" },
        rcpt: { from: "rev", to: "gate", path: "M755,260 L755,320", text: "receipt" },
        save: { from: "writer", to: "ckpt", path: "M660,122 C620,160 600,330 520,350", text: "save each loop", label: { x: 592, y: 300 } },
        resume: { from: "ckpt", to: "sched", path: "M425,320 L425,260", text: "resume" },
        merge: { from: "gate", to: "owner", path: "M660,365 C580,365 560,415 440,415 L22,415 L22,100 L30,100", text: "verified work → you review and merge", label: { x: 240, y: 410 } },
      },
      journeys: {
        "One task, start to finish": [
          { text: "I write an issue with acceptance tests and assign it", node: "issue", edges: ["spec"] },
          { text: "The orchestrator plans the work and dispatches it", node: "orch", edges: ["assign", "disp"] },
          { text: "A writer agent starts in its own isolated workspace", node: "writer", edges: ["launch"] },
          { text: "It commits work in progress and saves a checkpoint", node: "ckpt", edges: ["save"] },
          { text: "A reviewer from a different model family checks that exact commit", node: "rev", edges: ["start2", "wip"] },
          { text: "Findings go back to the writer until a round finds nothing new", node: "writer", edges: ["find"] },
          { text: "The receipt goes through the evidence gate", node: "gate", edges: ["rcpt"] },
          { text: "I read the evidence and merge", node: "owner", edges: ["merge"] },
        ],
        "An agent stops halfway": [
          { text: "The writer saves a checkpoint after every work loop", node: "ckpt", edges: ["save"] },
          { text: "It runs out of credits or context and stops", node: "writer", edges: [] },
          { text: "The scheduler notices and starts a fresh agent", node: "sched", edges: [] },
          { text: "The new agent reads the checkpoint and carries on", node: "sched", edges: ["resume"] },
          { text: "It continues in the same workspace, without redoing finished work", node: "writer", edges: ["launch"] },
        ],
        "A false claim gets caught": [
          { text: "The writer reports 'all tests pass' without pasting the output", node: "writer", edges: [] },
          { text: "The reviewer re-runs the tests itself in its own workspace", node: "rev", edges: ["wip"] },
          { text: "It breaks the fix on purpose: a test that still passes isn't protecting anything", node: "rev", edges: [] },
          { text: "The finding goes back to the writer", node: "writer", edges: ["find"] },
          { text: "The gate refuses a receipt that has no real output", node: "gate", edges: ["rcpt"] },
          { text: "The orchestrator reports the problem to me with evidence", node: "owner", edges: ["report"] },
        ],
      },
      footnote: { x: 30, y: 442, text: "Rule: nothing reaches the main branch without output a person can check." },
    },
    decisions: [
      { title: "One writer per isolated workspace", tag: "Architecture", decision: "Each writing agent gets its own git worktree, a separate copy of the repository on its own branch. Work moves between agents only as commits.", rejected: "Rejected: a shared state file with locks that agents had to respect. Agents forgot to take or release locks, and one crash could block everyone. Replacing it needed a new decision record, which supersedes the old one." },
      { title: "The reviewer comes from a different model family", tag: "Quality", decision: "Code written by one tool is reviewed by another, for example Claude-written code reviewed by Codex or DeepSeek, in a separate workspace, against the exact commit.", rejected: "Rejected: self-review, and review by the same model, which tend to repeat the writer's assumptions. Also rejected: reviewing uncommitted files, because then nobody can say exactly what was approved." },
      { title: "A claim without output is a guess", tag: "Process", decision: "'Tests pass', 'it's deployed' and 'the endpoint is up' count only with the command output pasted. Sign-off is tied to a commit, so later changes need a new review.", rejected: "Rejected: trusting an agent's summary. Summaries were confidently wrong often enough that checking them stopped being optional." },
      { title: "State lives in files, not in an agent's head", tag: "Reliability", decision: "Each loop ends by writing a checkpoint, and agent memory is kept as plain files in git and loaded automatically at the start of a session. Any tool can read it, and any agent can take over.", rejected: "Rejected: relying on chat history or memory that only one tool can see. An agent that dies takes that knowledge with it." },
      { title: "Agents never assign themselves work", tag: "Control", decision: "Only issues I have assigned get worked on. Anything with consequences outside the repository, such as deploys, payments or customer email, needs my yes.", rejected: "Rejected: letting agents pick up whatever looks useful. That leads to duplicate work, work nobody asked for, and actions I didn't approve." },
      { title: "A factory, not an autopilot", tag: "Control", decision: "The factory makes the work repeatable: every job goes through the same spec, build, cross-review and evidence gate. The decisions stay human. I choose what is built, rule on trade-offs, and approve anything that touches customers, money or production.", rejected: "Rejected: letting agents run end to end unattended. The incidents below show what agents report when nobody checks." },
      { title: "One skill library, built for every tool", tag: "Engineering", decision: "Skills and instructions are written once and generated as plugins for Claude Code, Codex, Cursor and Antigravity. A skill stays only if a with/without test shows it changes behaviour.", rejected: "Rejected: copying prompts into each tool by hand, which drifts within weeks. Also rejected: keeping skills that sound useful but change nothing measurable. A 'skill diet' decision cut the library down." },
    ],
    incidentsTitle: "Failures that shaped the rules",
    incidentsIntro: "Each rule the agents follow exists because something went wrong in real work. These are some of them.",
    incidents: [
      { title: "\"Zero problems left\", but there were four", tag: "Evidence", symptom: "An agent reported that a cleanup was complete: zero of a banned pattern remained.", diagnosis: "An independent recount by a second agent found four. The first agent had reported what it expected to find, not what it measured.", fix: "Rule 1: a claim without command output is a guess. Reviewers recount instead of reading the summary." },
      { title: "A passing test guarding a button that no longer existed", tag: "Testing", symptom: "A test checking for three Activate buttons passed for weeks.", diagnosis: "The button it was meant to protect had been deleted. The count was being met by other buttons on the page. The suite stayed green the whole time.", fix: "Rule 2: before claiming a test protects something, break the code on purpose and watch the test fail, then restore it." },
      { title: "A test mode that made staging always pass", tag: "Testing", symptom: "Every activation test on the staging site passed for months.", diagnosis: "A test-mode switch returned fake success before any real call was made. Three separate production faults were invisible on staging because of it.", fix: "Rule 6: a fake that reports success is worse than an outage. Any pass claim must say which test switches were on." },
      { title: "The version number said one thing, the files said another", tag: "Deployment", symptom: "Production reported an old plugin version.", diagnosis: "Comparing the files showed that two of the three shipped files already matched the latest code. A deploy planned from the version number alone would have shipped the wrong thing.", fix: "Rule 5: compare files by checksum against committed content, never trust a version label." },
      { title: "Access granted when the answer was 'unknown'", tag: "Security", symptom: "Access checks let people in when a dependency was missing.", diagnosis: "The code treated anything other than an exact 'no' as 'yes', so an empty or missing value granted access.", fix: "Rule 7: security checks fail closed. Removing a check to stop an error is not a fix." },
      { title: "An agent 'fixed' something that was removed on purpose", tag: "Decisions", symptom: "An agent found a missing button, called it a regression and restored it.", diagnosis: "The button had been removed deliberately, but the old decision record still described the old design. In a diff, a deliberate deletion and an accidental one look the same.", fix: "Rules 3 and 4: check the history before calling something a regression, and update the decision record in the same change that reverses it." },
    ],
    method: [
      "The rules are a short written \"constitution\". Each rule names the incident that caused it, so agents and people can see why it exists.",
      "Every process step has to match a published engineering practice (for example Fowler, Feathers, Ousterhout, Nygard's decision records). If a step is made up, it needs its own written reason or it gets removed.",
      "Skills are tested by running the same task with and without the skill and comparing the results. A skill that doesn't change behaviour gets cut.",
      "I wrote the rules, the decisions and the acceptance tests. The agents wrote most of the code under that system, and I reviewed and merged it.",
      "The other case studies on this site came off this line. The Banana EA rebuild, for example, went from audit to tested MT5 engine in 122 commits and 33 merged pull requests over 24 days.",
    ],
    tech: ["Claude Code", "OpenAI Codex", "Cursor", "Google Antigravity", "Kimi", "DeepSeek", "Claude Code plugins & hooks", "MCP servers", "Git worktrees", "GitHub Issues & Actions", "TypeScript", "PowerShell", "Fly.io"],
    cta: {
      title: "What this means for your team",
      body: [
        "If your team uses AI coding tools and isn't sure it can trust the output, I can set up the same kind of software factory for you: shared skills and instructions, isolated workspaces, cross-model review, and checks that require evidence before a merge.",
        "I also build Claude Code plugins, skills and MCP servers, and I can review an existing AI-assisted codebase for false claims and weak tests.",
      ],
    },
    disclaimer: "This page describes how the factory works only. Internal hosts, credentials and customer data are deliberately left out. AIMStack itself is private; baton, the hand-off tool, is open source.",
    links: [{ label: "baton on GitHub", href: "https://github.com/immy2good/baton" }],
  },
  {
    slug: "docs-and-academy",
    number: "05",
    category: "Documentation · Course platform",
    title: "iTradeAIMS Docs & Academy: product documentation with a course platform built in",
    cardTitle: "iTradeAIMS Docs & Academy: product docs, chart lessons and a course platform",
    summary:
      "One site for every product manual and every course. 17 product docs, 8 courses with 106 lessons, and chart lessons that replay real candles and then ask the student to find the one that matters. A build gate stops any product from shipping without a docs decision.",
    metrics: [
      { value: "106", label: "lessons in 8 courses" },
      { value: "17", label: "product docs, one site" },
      { value: "196", label: "unit tests on every build" },
    ],
    tags: ["Docusaurus", "React", "Lightweight Charts", "Course platform", "Netlify"],
    eyebrow: "Case study · Documentation · Course platform",
    headline: "iTradeAIMS Docs & Academy: product documentation with a course platform built in",
    lede:
      "Customers need two things after they buy: a manual for the product, and a way to learn the method behind it. Those used to live in different places and drift apart. I built one site that holds both. The manuals are a Docusaurus site, and the Academy is a course platform I wrote inside it, so a lesson and the manual it teaches are reviewed, tested and shipped together.",
    meta: [
      { label: "Role", value: "Designer, developer and editor" },
      { label: "Timeline", value: "May 2026 – present" },
      { label: "Live", value: "docs.itradeaims.net" },
    ],
    stats: [
      { value: "17", label: "product docs on one site, for MT4, MT5 and TradingView" },
      { value: "8", label: "courses with 106 lessons, written and video" },
      { value: "6", label: "interactive tools that run inside lessons" },
      { value: "196", label: "unit tests, plus type, search and analytics checks on every build" },
      { value: "672", label: "commits since May 2026" },
    ],
    problem: {
      wrongTitle: "What went wrong before",
      wrong: [
        "Manuals, course videos and product pages lived in different places, so a lesson could teach a setting the product no longer had.",
        "Pages tried to sell and document at once. Purchase sidebars squeezed settings tables into narrow columns.",
        "A new product could go on sale with no documentation, and nothing would notice.",
        "Chart examples were screenshots. A student could look at them but not step through them.",
      ],
      neededTitle: "What I needed",
      needed: [
        "Manuals and courses in one repository, reviewed and released together.",
        "Courses a customer can start without an account, that remember where they stopped.",
        "Chart lessons a student can replay candle by candle and practise on.",
        "A build that fails when a product has no docs decision.",
        "Wording that stays inside advertising rules for financial products, checked by a script rather than by memory.",
      ],
    },
    diagram: {
      width: 880,
      height: 450,
      zoneTop: 20,
      zoneHeight: 380,
      zones: [
        { x: 15, w: 210, label: "Sources · in git", tone: "green" },
        { x: 315, w: 220, label: "Build · checked", tone: "amber" },
        { x: 645, w: 220, label: "Readers", tone: "blue" },
      ],
      nodes: {
        registry: { x: 30, y: 70, w: 180, h: 60, title: "Product registry", sub: "exported from the shop", tone: "green", detail: "The members site keeps the product catalogue. It is exported to a JSON file and copied into the docs repository, so the docs build can check it offline, with no network calls and no cross-repo credentials." },
        content: { x: 30, y: 200, w: 180, h: 60, title: "Manuals & courses", sub: "Markdown, MDX, course data", tone: "green", detail: "Product manuals are Markdown and MDX. Each course is a plain data module listing its lessons, video or written study, and any interactive tool the lesson uses. They are reviewed like code." },
        candles: { x: 30, y: 320, w: 180, h: 60, title: "Chart lesson data", sub: "candles + teaching labels", tone: "green", detail: "Each chart lesson is data: OHLC candles, labels, groups and a practice question. Candles are designed, generated from a fixed seed, or exported from real history with provider, timeframe, UTC range and a SHA-256 hash." },
        gate: { x: 330, y: 70, w: 190, h: 60, title: "Build gates", sub: "tests · types · drift · wording", tone: "amber", detail: "Before the site builds: unit tests, type checks, a search index check, an analytics check, a drift gate that every product has a docs decision, and a compliance scan for banned wording." },
        build: { x: 330, y: 200, w: 190, h: 60, title: "Static site build", sub: "Docusaurus 3", tone: "amber", detail: "Builds every product docs area, the course player and the chart lessons into static pages. Chart lessons render on the server with their description, provenance and candle data, and the chart itself starts in the browser." },
        llms: { x: 330, y: 320, w: 190, h: 60, title: "Machine-readable export", sub: "llms.txt · llms-full.txt", tone: "amber", detail: "After the build, scripts produce a plain-text export of the whole site, fix its links and verify it, so a customer's own AI tool can read the docs accurately." },
        docs: { x: 660, y: 70, w: 190, h: 60, title: "Product docs", sub: "17 manuals", tone: "blue", detail: "Technical manuals laid out like developer docs: left navigation, a table of contents on the right, settings tables at full width. Selling stays on the shop site." },
        player: { x: 660, y: 200, w: 190, h: 60, title: "Course player", sub: "8 courses · 106 lessons", tone: "blue", detail: "A React course player inside the docs: curriculum sidebar, a link for every lesson, theatre and fullscreen modes, keyboard shortcuts, and progress saved in the browser. Lessons can embed chart replays and interactive tools." },
        agents: { x: 660, y: 320, w: 190, h: 60, title: "AI tools", sub: "read the plain-text export", tone: "blue", detail: "A customer can point their own assistant at llms.txt and get answers grounded in the current docs." },
      },
      edges: {
        reg: { from: "registry", to: "gate", path: "M210,100 L330,100", text: "products.json" },
        src: { from: "content", to: "build", path: "M210,230 L330,230", text: "pages + courses" },
        candles: { from: "candles", to: "build", path: "M210,350 C275,350 265,255 330,250", text: "validated lesson", label: { x: 268, y: 318 } },
        pass: { from: "gate", to: "build", path: "M425,130 L425,200", text: "pass or stop" },
        todocs: { from: "build", to: "docs", path: "M520,212 C590,212 600,115 660,100", text: "manuals", label: { x: 596, y: 150 } },
        toplayer: { from: "build", to: "player", path: "M520,240 L660,240", text: "courses" },
        post: { from: "build", to: "llms", path: "M425,260 L425,320", text: "after build" },
        export: { from: "llms", to: "agents", path: "M520,350 L660,350", text: "plain text" },
        related: { from: "player", to: "docs", path: "M755,200 L755,130", text: "related manual" },
      },
      journeys: {
        "A student takes a course": [
          { text: "A course is written as a data module next to the manuals", node: "content", edges: [] },
          { text: "The build turns it into pages in the course player", node: "build", edges: ["src", "toplayer"] },
          { text: "The student opens the course; it resumes from progress saved in their browser", node: "player", edges: [] },
          { text: "A chart lesson replays the candles, then asks them to pick the candle that matters", node: "player", edges: [] },
          { text: "The lesson links to the manual for the product settings it uses", node: "docs", edges: ["related"] },
        ],
        "A new product goes on sale": [
          { text: "The product is added to the shop's registry", node: "registry", edges: [] },
          { text: "The registry is exported to products.json and copied into the docs repo", node: "gate", edges: ["reg"] },
          { text: "The drift gate stops the build until the product has a docs decision", node: "gate", edges: [] },
          { text: "A declared docs link must point at a page this build really produces", node: "build", edges: ["pass"] },
          { text: "The manual goes live with the rest of the docs", node: "docs", edges: ["todocs"] },
        ],
        "A chart lesson from real prices": [
          { text: "Candles are exported with provider, timeframe, UTC range and a SHA-256 hash", node: "candles", edges: [] },
          { text: "Labels record their own origin: drawn by me, scripted, or from a named indicator version", node: "candles", edges: [] },
          { text: "Validation rejects the lesson unless data rights and labels are both approved for public docs", node: "build", edges: ["candles"] },
          { text: "The lesson appears in the docs and inside courses", node: "player", edges: ["toplayer"] },
        ],
      },
      footnote: { x: 30, y: 442, text: "Rule: a lesson and the manual it teaches ship in the same build." },
    },
    decisions: [
      { title: "The course platform lives inside the docs", tag: "Architecture", decision: "I wrote the course player as React components in the docs site. Courses are data files in the same repository as the manuals, so a change to a product and the lesson about it go through one review and one build.", rejected: "Rejected: an LMS plugin on the shop's WordPress site. That means another login, another database, and lessons drifting away from the manuals they rely on." },
      { title: "Progress is saved in the browser", tag: "Product", decision: "Each course keeps its completed lessons and last position in the browser's local storage. If storage is missing or corrupt, the course starts fresh, and a failed save never breaks a lesson.", rejected: "Rejected: accounts and a progress database. That adds sign-up friction and personal data to look after, for a feature that is a convenience." },
      { title: "Chart lessons are drawn from data", tag: "Teaching", decision: "Lessons are data with a written contract, drawn with TradingView's Lightweight Charts library. Students can watch a guided replay, explore candles one by one, or answer a practice question. Every chart reuses one component.", rejected: "Rejected: screenshots and exported images. They can't be replayed or practised on, and they go stale when a product changes. Video production stays in its own repository." },
      { title: "Price data and teaching labels have separate origins", tag: "Integrity", decision: "A lesson records where its candles came from and, separately, who made each label and who approved it. Labels drawn to teach a concept are never presented as indicator output.", rejected: "Rejected: treating an annotated chart as one thing. A hand-drawn label could then pass for something a product detected." },
      { title: "Every product needs a docs decision", tag: "Quality", decision: "A drift gate compares the shop's product list with the docs. Each product needs either a docs page this build produces or a written reason for having none. The gate runs offline, and the shop's own CI checks that the export is current.", rejected: "Rejected: fetching the live catalogue during the build. That needs network access and credentials, and the build fails whenever the shop is down." },
      { title: "Documentation pages don't sell", tag: "Architecture", decision: "Manuals follow the layout of developer docs such as Stripe's and Tailwind's: navigation on the left, contents on the right, tables at full width. Selling stays on the shop site.", rejected: "Rejected: the earlier pages that mixed a sales showcase with the manual. Two decision records were replaced by one that says so." },
      { title: "I removed the AI chat assistant I'd built", tag: "Product", decision: "I built iMi, a docs assistant with its own knowledge base, a serverless backend and a rule never to give trading advice. Then I removed it. Search and the plain-text export answer the same questions, with no extra build steps, chat code in every page or backend to run.", rejected: "Rejected: keeping a feature because it took work to build." },
    ],
    incidentsTitle: "Problems found and fixed",
    incidentsIntro: "Each of these changed how the site is built.",
    incidents: [
      { title: "Settings tables squeezed by a purchase sidebar", tag: "Layout", symptom: "On product pages, settings tables and code blocks were cramped into a narrow column.", diagnosis: "Pages were doing two jobs. A sticky sales sidebar took the width the manual needed, and there was no table of contents.", fix: "A decision record split the jobs: the docs site documents, the shop sells. Product pages moved to a standard docs layout." },
      { title: "Wording that advertising rules don't allow", tag: "Compliance", symptom: "A review found words like 'bot', 'no repaint' guarantees and unhedged probability claims across the docs.", diagnosis: "Rules for financial advertising were applied by memory, page by page, and new pages kept bringing the words back.", fix: "A compliance scanner with its own tests now checks every public page for banned terms, with written exceptions such as robots.txt." },
      { title: "Every build changed a tracked file", tag: "Build", symptom: "Running the site locally left a modified file in git each time.", diagnosis: "The AI assistant's build step rewrote a tracked report on every run.", fix: "That step went when the assistant was removed, and builds now leave the working tree clean." },
      { title: "1,870 lines of CSS on a homepage that used 50", tag: "Hygiene", symptom: "The homepage showed two navigation systems for the same catalogue and squeezed the product grid.", diagnosis: "Styles for removed sidebars and old prototypes had piled up in one stylesheet.", fix: "The homepage became a single centred catalogue, and the stylesheet went from about 1,870 lines to about 50." },
      { title: "The hosted build ran out of memory", tag: "Build", symptom: "Adding another product docs area broke the build on Netlify.", diagnosis: "Each docs area is its own Docusaurus plugin, and the bundler needed more memory than the default.", fix: "The build memory limit was raised in config, with a comment saying why." },
    ],
    method: [
      "Terms are fixed in a glossary, for example 'setup' rather than 'signal' and 'trade-management software' rather than 'bot', and the compliance scanner enforces them.",
      "Larger changes start as a numbered spec with user stories and a list of the checks it must pass.",
      "Browser checks drive the chart lessons in a real browser: replay, practice, scenarios and light and dark themes.",
      "I write the specs and the teaching content, and every lesson that uses real prices needs my recorded approval before it can be published.",
    ],
    tech: ["Docusaurus 3", "React 18", "Lightweight Charts", "Tailwind CSS", "Radix UI", "MDX", "Local search", "llms.txt", "Node test runner", "Puppeteer", "Netlify", "Matomo"],
    cta: {
      title: "What this means for your product",
      body: [
        "If your documentation and your training live in different places and drift apart, I can put them in one site that builds and tests them together, with a course player that needs no separate LMS.",
        "I can also build interactive lessons and calculators into existing docs, and add build checks so a new product can't ship without documentation.",
      ],
    },
    disclaimer: "The courses and tools are educational. Nothing on the site, or on this page, is financial advice or a claim about trading results.",
    links: [
      { label: "Docs", href: "https://docs.itradeaims.net/" },
      { label: "Academy", href: "https://docs.itradeaims.net/courses" },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
