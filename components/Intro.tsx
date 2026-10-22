"use client";

import { useEffect, useRef, useState } from "react";

const FIRST = "Vishwajeet";
const LAST = "Thakur";
const LOG = ["loading design system", "compiling components", "wordpress", "next.js", "shopify", "linking 11 live projects"];

const TYPE_START = 520;
const TYPE_STEP = 42;

/**
 * Entry sequence (first visit per session): a terminal types the name as code,
 * each glyph flips from monospace into the display serif, then a scan line
 * sweeps down and "compiles" the real page underneath. Pure CSS animations
 * triggered by class changes; skippable with a click or any key.
 */
export default function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const scan = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (!("intro" in root.dataset)) {
      setDone(true);
      return;
    }
    const el = ref.current!;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));

    const chars = el.querySelectorAll<HTMLElement>("[data-ch]");
    const typedEnd = TYPE_START + chars.length * TYPE_STEP;
    const revealAt = typedEnd + 1250;
    const pct = el.querySelector<HTMLElement>("[data-pct]")!;
    const bar = el.querySelector<HTMLElement>("[data-bar]")!;

    el.querySelectorAll("[data-log]").forEach((li, i) => at(120 + i * 105, () => li.classList.add("show")));
    chars.forEach((c, i) => at(TYPE_START + i * TYPE_STEP, () => c.classList.add("show")));
    at(typedEnd + 180, () => el.classList.add("morph"));

    const t0 = performance.now();
    let raf = 0;
    const count = () => {
      const p = Math.min(1, (performance.now() - t0) / revealAt);
      const eased = 1 - Math.pow(1 - p, 2);
      pct.textContent = String(Math.round(eased * 100)).padStart(3, "0");
      bar.style.transform = `scaleX(${eased})`;
      if (p < 1) raf = requestAnimationFrame(count);
    };
    raf = requestAnimationFrame(count);

    let revealed = false;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      timers.forEach(clearTimeout);
      el.classList.add("morph", "reveal");
      scan.current?.classList.add("reveal");
      delete root.dataset.intro;
      try {
        sessionStorage.setItem("vt-intro", "1");
      } catch {}
      window.setTimeout(() => setDone(true), 1000);
    };
    at(revealAt, reveal);

    const skip = () => reveal();
    window.addEventListener("keydown", skip, { once: true });
    el.addEventListener("click", skip, { once: true });

    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", skip);
    };
  }, []);

  if (done) return null;

  let k = 0;
  const glyphs = (text: string, cls = "") =>
    text.split("").map((c) => (
      <span key={k} data-ch className={`intro-ch ${cls}`} style={{ ["--k" as string]: k++ }}>
        {c === " " ? " " : c}
      </span>
    ));

  return (
    <>
      <div ref={ref} className="intro" aria-hidden>
        <div className="flex items-center justify-between font-mono text-[11px] tracking-wide text-[#6b7686]">
          <span className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3">~/vishwajeet/portfolio — build</span>
          </span>
          <span className="uppercase tracking-[0.2em] text-[#d7dde6]">Click to skip →</span>
        </div>

        <ul className="mt-10 space-y-1.5 font-mono text-xs md:text-sm">
          {LOG.map((l) => (
            <li key={l} data-log className="intro-log">
              <span className="text-[#ff6a3d]">›</span> {l} <span className="text-[#7ee787]">✓</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-1 items-center">
          <p className="intro-line text-[clamp(2.2rem,6.3vw,7.5rem)] leading-none text-[#eef1f5]">
            <span className="intro-tag text-[#7ee787]">{glyphs("<")}</span>
            {glyphs(FIRST)}
            {glyphs(" ")}
            {glyphs(LAST, "acc")}
            <span className="intro-tag text-[#7ee787]">{glyphs(" />")}</span>
            <span className="intro-caret" />
          </p>
        </div>

        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#6b7686]">
          <div className="flex items-end justify-between">
            <span>
              Compiling <span className="text-[#d7dde6]">code</span> → <span className="text-[#ff6a3d]">design</span>
            </span>
            <span className="text-3xl tracking-tight text-[#eef1f5] md:text-5xl">
              <span data-pct>000</span>%
            </span>
          </div>
          <div className="mt-4 h-px bg-white/10">
            <div data-bar className="h-full origin-left scale-x-0 bg-[#ff6a3d]" />
          </div>
        </div>
      </div>
      <div ref={scan} className="intro-scan" aria-hidden />
    </>
  );
}
