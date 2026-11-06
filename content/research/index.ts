import type { ComponentType } from "react";
import * as threeStrategies from "./three-strategies-that-held-up";

// Each report's words and charts, by slug. Its listing details live in lib/research.ts.
export const bodies: Record<string, { Lede: ComponentType; Body: ComponentType; toc: { id: string; label: string }[] }> = {
  "three-strategies-that-held-up": threeStrategies,
};
