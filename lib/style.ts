import type { CSSProperties } from "react";

/** Sets the `--d` (delay, seconds) custom property used by reveal/rise animations. */
export const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export const vars = (v: Record<string, string | number>) => v as CSSProperties;
