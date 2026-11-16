import type { ToolcraftState } from "@/toolcraft/runtime";

import type { KomorebiOptions } from "./komorebi-engine";

export const komorebiDefaults: KomorebiOptions = {
  mode: "dapple", leafShape: "pointed", blend: "plus-lighter", invert: true, color: "#8fa8d8",
  presence: 55, blur: 3, reach: 90, wind: 90, size: 100, density: 100, thick: 150, angle: 158,
  ox: 102, oy: 12, count: 3, gust: 60, speed: 100, vary: 50, falloff: 40, spread: 120,
  lightAngle: 140, stretch: 120, parallax: 20, seed: 2026, respectReduced: false,
};

function colorValue(value: unknown, fallback: string): string {
  if (typeof value === "string" && value) return value;
  if (typeof value === "object" && value !== null && "hex" in value) {
    const hex = (value as { hex?: unknown }).hex;
    if (typeof hex === "string" && hex) return hex;
  }
  return fallback;
}

export function readKomorebiOptions(values: ToolcraftState["values"]): KomorebiOptions {
  const out: Record<string, unknown> = { ...komorebiDefaults };
  for (const key of Object.keys(komorebiDefaults)) {
    const raw = values[`komorebi.${key}`];
    if (raw === undefined) continue;
    const fallback = (komorebiDefaults as Record<string, unknown>)[key];
    if (key === "color") out[key] = colorValue(raw, String(fallback));
    else if (typeof fallback === "number") out[key] = Number.isFinite(Number(raw)) ? Number(raw) : fallback;
    else if (typeof fallback === "boolean") out[key] = Boolean(raw);
    else out[key] = String(raw);
  }
  return out as KomorebiOptions;
}
