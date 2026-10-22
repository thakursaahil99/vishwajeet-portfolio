"use client";

type DocWithVT = Document & { startViewTransition?: (cb: () => void) => { finished: Promise<void>; ready: Promise<void> } };

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    const apply = () => {
      root.dataset.theme = next;
      try {
        localStorage.setItem("vt-theme", next);
      } catch {}
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const doc = document as DocWithVT;
    if (reduce) return apply();

    const line = document.createElement("div");
    line.className = "theme-line";

    if (!doc.startViewTransition) {
      // Fallback: the line still sweeps, colours change instantly behind it.
      line.classList.add("run");
      document.body.append(line);
      apply();
      setTimeout(() => line.remove(), 1000);
      return;
    }

    const t = doc.startViewTransition(() => {
      apply();
      document.body.append(line);
    }) as { finished: Promise<void>; ready: Promise<void> };
    // Start the wipe and the line in the same frame so the line rides the edge.
    t.ready.then(() => {
      const timing = { duration: 950, easing: "cubic-bezier(0.76, 0, 0.24, 1)", fill: "both" as const };
      const root = document.documentElement;
      root.animate({ clipPath: ["inset(0 100% 0 0)", "inset(0 0 0 0)"] }, { ...timing, pseudoElement: "::view-transition-new(root)" });
      // `left` (not transform) keeps the line on the main thread, in lockstep with the clip-path wipe.
      root.animate(
        { left: ["-1px", `${window.innerWidth - 1}px`] },
        { ...timing, pseudoElement: "::view-transition-group(theme-line)" },
      );
    });
    t.finished.finally(() => line.remove());
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      className={`group relative flex size-9 items-center justify-center overflow-hidden rounded-full border border-current/20 transition-colors hover:border-current ${className}`}
    >
      {/* sun */}
      <svg
        viewBox="0 0 24 24"
        className="absolute size-[18px] transition-transform duration-500 dark:-translate-y-8 dark:rotate-90"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      {/* moon */}
      <svg
        viewBox="0 0 24 24"
        className="absolute size-[17px] translate-y-8 -rotate-90 transition-transform duration-500 dark:translate-y-0 dark:rotate-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
      </svg>
    </button>
  );
}
