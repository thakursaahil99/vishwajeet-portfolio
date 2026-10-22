"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/data";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
        <div
          className={`mx-auto flex max-w-[1400px] items-center justify-between rounded-full border px-3 py-2 pl-5 transition-all duration-500 md:pl-6 ${
            scrolled || open ? "border-line bg-bg text-fg shadow-[0_10px_40px_-20px_rgb(0_0_0/0.35)]" : "border-transparent text-fg"
          }`}
        >
          <Link href="/" className="font-display text-2xl leading-none tracking-tight">
            Vishwajeet<span className="text-accent">.</span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm md:flex">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} aria-current={isActive(n.href) ? "page" : undefined} className="u-link py-1">
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/contact"
              data-magnetic
              className="hidden rounded-full bg-fg px-5 py-2.5 text-sm text-bg transition-colors hover:bg-accent hover:text-white md:inline-flex"
            >
              Hire me
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label="Menu"
              className="flex size-9 flex-col items-center justify-center gap-1.5 rounded-full border border-current/20 md:hidden"
            >
              <span className={`h-px w-4 bg-current transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
              <span className={`h-px w-4 bg-current transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-bg px-6 pb-10 pt-28 transition-[clip-path] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] md:hidden ${
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <nav className="flex flex-col">
          {nav.map((n, i) => (
            <Link
              key={n.href}
              href={n.href}
              className="flex items-baseline justify-between border-b border-line py-4 font-display text-5xl"
              style={{ transitionDelay: open ? `${150 + i * 60}ms` : "0ms" }}
            >
              <span className={isActive(n.href) ? "italic text-accent" : ""}>{n.label}</span>
              <span className="font-mono text-xs text-muted">0{i + 1}</span>
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="rounded-full bg-accent py-4 text-center text-white">
          Start a project →
        </Link>
      </div>
    </>
  );
}
