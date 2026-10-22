"use client";

import { useRef } from "react";

/**
 * Same content rendered twice — as design and as code. The divider follows
 * the pointer; all motion is a single CSS custom property (--split).
 */
export default function SplitShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const move = (clientX: number) => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const pct = Math.min(97, Math.max(3, ((clientX - r.left) / r.width) * 100));
      el.dataset.touched = "";
      el.style.setProperty("--split", `${pct}%`);
    });
  };

  return (
    <div
      ref={ref}
      data-reveal="fade"
      data-cursor="Move"
      className="split h-[78svh] min-h-[560px] rounded-[28px] border border-line md:h-[86svh]"
      onPointerMove={(e) => {
        if (e.pointerType === "mouse" || e.buttons) move(e.clientX);
      }}
      onPointerDown={(e) => move(e.clientX)}
    >
      {/* DESIGN */}
      <div className="split-layer split-design">
        <div className="flex h-full flex-col justify-between p-6 md:p-12">
          <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            <span>Design view</span>
            <span>01 / Landing hero</span>
          </div>
          <div>
            <p className="font-display text-[clamp(3rem,9vw,9.5rem)] leading-[0.88] tracking-tight">
              Ideas into
              <br />
              <span className="italic text-accent">interfaces</span>
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-fg px-6 py-3 text-sm text-bg">Start a project</span>
              <span className="rounded-full border border-fg px-6 py-3 text-sm">See the work</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 md:gap-5">
            {["#ff4d1c", "#16140f", "#e9e3d8"].map((c, i) => (
              <div key={c} className="flex items-center gap-3">
                <span className="size-8 shrink-0 rounded-full border border-line md:size-10" style={{ background: c }} />
                <span className="hidden font-mono text-[10px] uppercase tracking-widest text-muted sm:inline">
                  {["Accent", "Ink", "Paper"][i]} · {c}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CODE */}
      <div className="split-layer split-code" aria-hidden>
        <div className="flex h-full flex-col justify-between p-6 font-mono md:p-12">
          <div className="flex justify-between text-[11px] uppercase tracking-[0.18em] tk-dim">
            <span>Code view</span>
            <span>hero.tsx</span>
          </div>
          <pre className="overflow-hidden text-[clamp(0.7rem,1.35vw,1.15rem)] leading-[1.75]">
            <span className="tk-kw">export default function</span> <span className="tk-key">Hero</span>() {"{"}
            {"\n"}  <span className="tk-kw">return</span> (
            {"\n"}    <span className="tk-tag">&lt;section</span> <span className="tk-key">className</span>=<span className="tk-str">&quot;hero&quot;</span><span className="tk-tag">&gt;</span>
            {"\n"}      <span className="tk-tag">&lt;h1&gt;</span>Ideas into <span className="tk-tag">&lt;em&gt;</span>interfaces<span className="tk-tag">&lt;/em&gt;&lt;/h1&gt;</span>
            {"\n"}      <span className="tk-tag">&lt;Button</span> <span className="tk-key">variant</span>=<span className="tk-str">&quot;solid&quot;</span><span className="tk-tag">&gt;</span>Start a project<span className="tk-tag">&lt;/Button&gt;</span>
            {"\n"}      <span className="tk-tag">&lt;Button</span> <span className="tk-key">variant</span>=<span className="tk-str">&quot;outline&quot;</span><span className="tk-tag">&gt;</span>See the work<span className="tk-tag">&lt;/Button&gt;</span>
            {"\n"}    <span className="tk-tag">&lt;/section&gt;</span>
            {"\n"}  );
            {"\n"}{"}"}
            {"\n"}
            {"\n"}<span className="tk-dim">{"// "}Lighthouse → performance 90+ · fully responsive</span>
          </pre>
          <div className="grid grid-cols-3 gap-3 text-[10px] uppercase tracking-widest md:gap-5">
            <span><span className="tk-key">--accent</span>: <span className="tk-str">#ff4d1c</span></span>
            <span><span className="tk-key">--ink</span>: <span className="tk-str">#16140f</span></span>
            <span><span className="tk-key">--paper</span>: <span className="tk-str">#e9e3d8</span></span>
          </div>
        </div>
      </div>

      <div className="split-divider" aria-hidden>
        <span className="split-handle">
          ← Design <span className="opacity-60">|</span> Code →
        </span>
      </div>
    </div>
  );
}
