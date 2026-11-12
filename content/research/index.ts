import type { ComponentType } from "react";
import * as threeStrategies from "./three-strategies-that-held-up";
import * as ict from "./ict-smart-money-concepts-tested";
import * as timing from "./market-timing-folklore";
import * as chaos from "./bill-williams-trading-chaos-tested";

// Each report's words and charts, by slug. Its listing details live in lib/research.ts.
export const bodies: Record<string, { Lede: ComponentType; Body: ComponentType; toc: { id: string; label: string }[] }> = {
  "three-strategies-that-held-up": threeStrategies,
  "ict-smart-money-concepts-tested": ict,
  "market-timing-folklore": timing,
  "bill-williams-trading-chaos-tested": chaos,
};
