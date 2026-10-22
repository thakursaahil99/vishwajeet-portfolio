"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { type Project, shot } from "@/lib/data";
import { ProjectArt } from "./ui";

/** Editorial project index; a screenshot preview trails the cursor on hover. */
export default function WorkList({ items, startIndex = 0 }: { items: Project[]; startIndex?: number }) {
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const raf = useRef(0);
  const hovering = useRef(false);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const loop = () => {
    const p = pos.current;
    p.x += (p.tx - p.x) * 0.14;
    p.y += (p.ty - p.y) * 0.14;
    if (preview.current) preview.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`;
    if (hovering.current || Math.abs(p.tx - p.x) + Math.abs(p.ty - p.y) > 0.5) raf.current = requestAnimationFrame(loop);
  };

  return (
    <div
      className="relative"
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        hovering.current = true;
        pos.current = { x: e.clientX, y: e.clientY, tx: e.clientX, ty: e.clientY };
        cancelAnimationFrame(raf.current);
        raf.current = requestAnimationFrame(loop);
      }}
      onPointerMove={(e) => {
        pos.current.tx = e.clientX;
        pos.current.ty = e.clientY;
      }}
      onPointerLeave={() => {
        hovering.current = false;
        setActive(null);
      }}
    >
      <ul className="border-b border-line">
        {items.map((p, i) => (
          <li key={p.slug} data-reveal style={{ ["--d" as string]: `${(i % 6) * 0.05}s` }}>
            <Link
              href={`/work/${p.slug}`}
              onPointerEnter={() => setActive(i)}
              className="work-row grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-t border-line px-2 py-6 transition-colors duration-500 md:grid-cols-[4rem_1.5fr_1fr_1fr_3rem] md:px-4 md:py-8"
            >
              <span className="font-mono text-xs text-muted">{String(startIndex + i + 1).padStart(2, "0")}</span>
              <span className="font-display text-3xl leading-none transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:text-6xl [.work-row:hover_&]:translate-x-3 [.work-row:hover_&]:italic">
                {p.name}
              </span>
              <span className="hidden text-sm md:block">{p.industry}</span>
              <span className="hidden font-mono text-[11px] uppercase tracking-widest md:block">{p.stack.join(" · ")}</span>
              <span className="justify-self-end text-xl transition-transform duration-500 [.work-row:hover_&]:-rotate-45">→</span>
            </Link>
          </li>
        ))}
      </ul>

      <div
        ref={preview}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-30 hidden h-[260px] w-[400px] overflow-hidden rounded-xl shadow-2xl transition-[opacity,scale] duration-300 lg:block ${
          active === null ? "scale-75 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <div
          className="h-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateY(-${(active ?? 0) * 100}%)` }}
        >
          {items.map((p) => (
            <div key={p.slug} className="h-full w-full">
              {p.shots ? (
                <Image src={shot(p, "desktop")} alt="" width={800} height={500} sizes="400px" className="h-full w-full object-cover object-top" />
              ) : (
                <ProjectArt p={p} className="h-full w-full [&_span]:!text-5xl" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
