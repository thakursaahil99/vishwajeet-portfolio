"use client";

import { useEffect, useRef } from "react";

/**
 * Desktop-only cursor: a dot that grows over links and shows a label over
 * [data-cursor] elements. [data-magnetic] elements lean toward the pointer.
 * The rAF loop only runs while the dot is catching up, then sleeps.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = dot.current!;
    const root = document.documentElement;
    root.classList.add("has-cursor");

    let x = -100;
    let y = -100;
    let cx = -100;
    let cy = -100;
    let raf = 0;
    let running = false;
    let magnet: HTMLElement | null = null;

    const loop = () => {
      cx += (x - cx) * 0.24;
      cy += (y - cy) * 0.24;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      if (Math.abs(x - cx) + Math.abs(y - cy) > 0.15) raf = requestAnimationFrame(loop);
      else running = false;
    };

    const release = () => {
      if (magnet) magnet.style.transform = "";
      magnet = null;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      el.classList.remove("is-hidden");
      if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
      if (magnet) {
        const r = magnet.getBoundingClientRect();
        magnet.style.transform = `translate(${(x - (r.left + r.width / 2)) * 0.22}px, ${(y - (r.top + r.height / 2)) * 0.3}px)`;
      }
    };

    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const labelled = t.closest<HTMLElement>("[data-cursor]");
      const interactive = t.closest("a, button, [role=button], summary, label");
      el.dataset.state = labelled ? "label" : interactive ? "link" : "";
      if (labelled) label.current!.textContent = labelled.dataset.cursor ?? "";
      const m = t.closest<HTMLElement>("[data-magnetic]");
      if (m !== magnet) {
        release();
        magnet = m;
      }
    };

    const onLeave = () => {
      el.classList.add("is-hidden");
      release();
    };
    const onDown = () => el.classList.add("is-down");
    const onUp = () => el.classList.remove("is-down");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    root.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      release();
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      root.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={dot} className="cursor is-hidden" aria-hidden>
      <span ref={label} />
    </div>
  );
}
