"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/data";

type Pt = { x: number; y: number; px: number; py: number };

const SEGMENTS = 9;
const GRAVITY = 0.55;
const DAMPING = 0.985;
const CARD_W = 280;
const CARD_H = 400;

/**
 * A lanyard ID badge with lightweight hand-written physics: a verlet rope
 * plus a pendulum card. Drag it, fling it, click it to flip. The loop
 * sleeps once everything is at rest, so it costs nothing when idle.
 */
export default function IdCard() {
  const wrap = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const strapRef = useRef<SVGPathElement>(null);
  const strapEdgeRef = useRef<SVGPathElement>(null);
  const textRef = useRef<SVGTextPathElement>(null);
  const kick = useRef<() => void>(() => {});
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const el = wrap.current!;
    const card = cardRef.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = el.clientWidth;
    let H = el.clientHeight;
    let anchorX = W / 2;
    const anchorY = -20;
    let segLen = Math.min(30, (H * 0.36) / SEGMENTS);

    // Start the strap flung out sideways so the card drops and swings in.
    const pts: Pt[] = Array.from({ length: SEGMENTS + 1 }, (_, i) => {
      const x = reduce ? anchorX : anchorX + i * segLen;
      const y = reduce ? anchorY + i * segLen : anchorY + i * 2;
      return { x, y, px: x, py: y };
    });

    let theta = reduce ? 0 : -0.6; // card angle (rad), CSS rotate convention
    let omega = 0;
    let prevVx = 0;
    let prevVy = 0;
    let dragging = false;
    let dragTarget = { x: 0, y: 0 };
    let still = 0;
    let raf = 0;
    let running = false;
    const pendulum = CARD_H * 0.5;

    const step = () => {
      const last = pts[SEGMENTS];

      for (let i = 1; i <= SEGMENTS; i++) {
        const p = pts[i];
        if (i === SEGMENTS && dragging) {
          p.px = p.x;
          p.py = p.y;
          p.x += (dragTarget.x - p.x) * 0.5;
          p.y += (dragTarget.y - p.y) * 0.5;
          continue;
        }
        const vx = Math.max(-38, Math.min(38, (p.x - p.px) * DAMPING));
        const vy = Math.max(-38, Math.min(38, (p.y - p.py) * DAMPING));
        p.px = p.x;
        p.py = p.y;
        p.x += vx;
        p.y += vy + GRAVITY;
      }

      // Inextensible strap: only correct when stretched. The card end is heavy.
      for (let k = 0; k < 14; k++) {
        pts[0].x = anchorX;
        pts[0].y = anchorY;
        for (let i = 0; i < SEGMENTS; i++) {
          const a = pts[i];
          const b = pts[i + 1];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d = Math.hypot(dx, dy) || 0.0001;
          if (d <= segLen) continue;
          const wa = i === 0 ? 0 : 1;
          const wb = i + 1 === SEGMENTS ? (dragging ? 0 : 0.25) : 1;
          const sum = wa + wb;
          if (!sum) continue;
          const diff = (d - segLen) / d / sum;
          a.x += dx * diff * wa;
          a.y += dy * diff * wa;
          b.x -= dx * diff * wb;
          b.y -= dy * diff * wb;
        }
      }

      // Keep the card inside the stage.
      const margin = Math.min(CARD_W / 2 + 8, W / 2);
      last.x = Math.min(W - margin, Math.max(margin, last.x));
      last.y = Math.max(segLen * 3, Math.min(H - 60, last.y));

      // Card pendulum driven by the pivot's acceleration.
      const vx = last.x - last.px;
      const vy = last.y - last.py;
      const ax = vx - prevVx;
      const ay = vy - prevVy;
      prevVx = vx;
      prevVy = vy;
      const alpha = (-(GRAVITY - ay) * Math.sin(theta) + ax * Math.cos(theta)) / pendulum;
      omega = (omega + alpha) * 0.965;
      theta += omega;

      return Math.abs(vx) + Math.abs(vy) + Math.abs(omega) * 40;
    };

    const render = () => {
      const last = pts[SEGMENTS];
      const vx = last.x - last.px;
      const vy = last.y - last.py;
      const tiltY = Math.max(-40, Math.min(40, vx * 2.2));
      const tiltX = Math.max(-20, Math.min(20, -vy * 1.2));
      card.style.transform = `translate3d(${last.x - CARD_W / 2}px, ${last.y - 6}px, 0) rotate(${theta}rad) rotateY(${tiltY}deg) rotateX(${tiltX}deg)`;

      let d = `M ${pts[0].x} ${pts[0].y}`;
      for (let i = 1; i < SEGMENTS; i++) {
        const mx = (pts[i].x + pts[i + 1].x) / 2;
        const my = (pts[i].y + pts[i + 1].y) / 2;
        d += ` Q ${pts[i].x} ${pts[i].y} ${mx} ${my}`;
      }
      d += ` L ${last.x} ${last.y}`;
      strapRef.current?.setAttribute("d", d);
      strapEdgeRef.current?.setAttribute("d", d);
    };

    const loop = () => {
      const energy = step();
      render();
      still = !dragging && energy < 0.02 ? still + 1 : 0;
      if (still > 90) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      still = 0;
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    kick.current = () => {
      omega += 0.04;
      start();
    };

    // Settle instantly for reduced motion, otherwise animate the drop-in.
    if (reduce) {
      for (let i = 0; i < 400; i++) step();
      render();
    } else {
      render();
    }
    card.style.opacity = "1";

    // Drop the card in once the entry intro (if any) hands over the page.
    const root = document.documentElement;
    let mo: MutationObserver | undefined;
    if (!reduce) {
      if ("intro" in root.dataset) {
        mo = new MutationObserver(() => {
          if ("intro" in root.dataset) return;
          mo?.disconnect();
          setTimeout(start, 250);
        });
        mo.observe(root, { attributes: true, attributeFilter: ["data-intro"] });
      } else {
        setTimeout(start, 350);
      }
    }

    // Dragging
    let downAt = { x: 0, y: 0 };
    let offset = { x: 0, y: 0 };
    let moved = false;
    const local = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onDown = (e: PointerEvent) => {
      const p = local(e);
      const last = pts[SEGMENTS];
      offset = { x: p.x - last.x, y: p.y - last.y };
      downAt = p;
      moved = false;
      dragging = true;
      dragTarget = { x: last.x, y: last.y };
      card.setPointerCapture(e.pointerId);
      start();
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const p = local(e);
      if (Math.hypot(p.x - downAt.x, p.y - downAt.y) > 6) moved = true;
      dragTarget = { x: p.x - offset.x, y: p.y - offset.y };
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      if (!moved) setFlipped((f) => !f);
      start();
    };

    card.addEventListener("pointerdown", onDown);
    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerup", onUp);
    card.addEventListener("pointercancel", onUp);

    const ro = new ResizeObserver(() => {
      W = el.clientWidth;
      H = el.clientHeight;
      anchorX = W / 2;
      segLen = Math.min(30, (H * 0.36) / SEGMENTS);
      start();
    });
    ro.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo?.disconnect();
      card.removeEventListener("pointerdown", onDown);
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerup", onUp);
      card.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <div ref={wrap} className="relative h-full w-full select-none [perspective:1200px]">
      <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        <defs>
          <path id="strap-path" ref={strapEdgeRef} d="M 0 0" />
        </defs>
        <path ref={strapRef} d="M 0 0" fill="none" stroke="var(--accent)" strokeWidth="18" strokeLinecap="round" />
        <text fill="#fff" fontSize="8.5" fontFamily="var(--font-geist-mono)" letterSpacing="2.2" dy="3">
          <textPath ref={textRef} href="#strap-path">
            VISHWAJEET ✦ DESIGNER & DEVELOPER ✦ VISHWAJEET ✦ DESIGNER & DEVELOPER ✦
          </textPath>
        </text>
      </svg>

      <div
        ref={cardRef}
        role="button"
        tabIndex={0}
        data-cursor="Drag"
        aria-label="ID card — drag to swing, click to flip"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setFlipped((f) => !f);
            kick.current();
          }
        }}
        className="absolute left-0 top-0 cursor-grab touch-none opacity-0 transition-opacity duration-500 [transform-origin:50%_6px] [transform-style:preserve-3d] will-change-transform active:cursor-grabbing"
        style={{ width: CARD_W, height: CARD_H }}
      >
        {/* metal clip */}
        <div className="absolute -top-3 left-1/2 z-10 h-7 w-12 -translate-x-1/2 rounded-md border border-black/20 bg-gradient-to-b from-zinc-200 to-zinc-400 shadow" />

        <div
          className="relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d]"
          style={{ transform: flipped ? "rotateY(180deg)" : "none" }}
        >
          {/* FRONT */}
          <div className="absolute inset-0 flex flex-col overflow-hidden rounded-[22px] bg-fg p-5 text-bg shadow-[0_30px_60px_-20px_rgb(0_0_0/0.5)] [backface-visibility:hidden]">
            <div className="mx-auto h-2 w-14 rounded-full bg-bg/25" />
            <div className="mt-4 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.2em] opacity-70">
              <span>Portfolio pass</span>
              <span>2026</span>
            </div>

            <div className="mt-4 flex items-end gap-4">
              <div className="relative flex size-[92px] shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-accent">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(255_255_255/0.45),transparent_60%)]" />
                <span className="relative font-display text-5xl italic text-white">VT</span>
              </div>
              <div className="pb-1 font-mono text-[9px] uppercase leading-relaxed tracking-[0.15em] opacity-70">
                ID · VT-2023
                <br />
                Exp · 3+ yrs
                <br />
                Sites · 30+
              </div>
            </div>

            <p className="mt-5 font-display text-[34px] leading-[0.95]">
              Vishwajeet
              <br />
              <span className="italic text-accent">Thakur</span>
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] opacity-80">Designer &amp; Developer</p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {["WordPress", "Next.js", "Shopify"].map((t) => (
                <span key={t} className="rounded-full border border-bg/25 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-auto flex items-end justify-between">
              <div
                className="h-9 w-32 opacity-80"
                style={{
                  background:
                    "repeating-linear-gradient(90deg, currentColor 0 2px, transparent 2px 4px, currentColor 4px 5px, transparent 5px 8px, currentColor 8px 11px, transparent 11px 12px)",
                }}
              />
              <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider">
                <span className="relative flex size-1.5">
                  <span className="ping absolute inset-0 rounded-full bg-[#3ddc84]" />
                  <span className="relative size-1.5 rounded-full bg-[#3ddc84]" />
                </span>
                Available
              </span>
            </div>
          </div>

          {/* BACK */}
          <div className="absolute inset-0 flex flex-col overflow-hidden rounded-[22px] bg-accent p-5 text-white shadow-[0_30px_60px_-20px_rgb(0_0_0/0.5)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div className="mx-auto h-2 w-14 rounded-full bg-white/30" />
            <p className="mt-6 font-display text-3xl leading-none">
              If found,
              <br />
              <span className="italic">hire me.</span>
            </p>
            <dl className="mt-6 space-y-3 font-mono text-[10px]">
              <div>
                <dt className="uppercase tracking-[0.2em] opacity-70">Email</dt>
                <dd className="mt-0.5 break-all">{profile.email}</dd>
              </div>
              <div>
                <dt className="uppercase tracking-[0.2em] opacity-70">Phone</dt>
                <dd className="mt-0.5">{profile.phone}</dd>
              </div>
              <div>
                <dt className="uppercase tracking-[0.2em] opacity-70">Based in</dt>
                <dd className="mt-0.5">{profile.location}</dd>
              </div>
            </dl>
            <div className="mt-auto flex items-end justify-between">
              <QrArt />
              <span className="font-mono text-[9px] uppercase tracking-wider opacity-80">Tap to flip ↺</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Decorative QR-style pattern (deterministic, not a real code). */
function QrArt() {
  const n = 11;
  const cells: [number, number][] = [];
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) {
      const finder = (x < 3 && y < 3) || (x > 7 && y < 3) || (x < 3 && y > 7);
      if (finder) continue;
      if (((x * 7 + y * 13 + x * y) % 5) < 2) cells.push([x, y]);
    }
  const Finder = ({ x, y }: { x: number; y: number }) => (
    <>
      <rect x={x} y={y} width="3" height="3" fill="none" stroke="currentColor" strokeWidth="0.6" />
      <rect x={x + 1} y={y + 1} width="1" height="1" fill="currentColor" />
    </>
  );
  return (
    <svg viewBox="-0.5 -0.5 12 12" className="size-16 rounded-md bg-white p-1 text-black">
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" />
      ))}
      <Finder x={0} y={0} />
      <Finder x={8} y={0} />
      <Finder x={0} y={8} />
    </svg>
  );
}
