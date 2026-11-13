import type { CSSProperties } from "react";
import type { Accent } from "@/content";

/** Per-element data colour, consumed in CSS as var(--c). */
export const tint = (c: Accent | "acc"): CSSProperties => ({ "--c": c === "acc" ? "var(--accent)" : `var(--ctp-${c})` }) as CSSProperties;
