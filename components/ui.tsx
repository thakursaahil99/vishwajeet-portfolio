import Image from "next/image";
import Link from "next/link";
import { type Project, shot } from "@/lib/data";
import { delay } from "@/lib/style";

export function SectionHead({ n, title, aside }: { n: string; title: string; aside?: React.ReactNode }) {
  return (
    <div data-reveal="fade" className="flex items-baseline justify-between gap-6 border-t border-line pt-5 font-mono text-[11px] uppercase tracking-[0.18em]">
      <span>
        <span className="text-accent">({n})</span> {title}
      </span>
      {aside && <span className="text-right text-muted">{aside}</span>}
    </div>
  );
}

/** Heading whose lines slide up from a mask when scrolled into view. */
export function Lines({
  lines,
  as: Tag = "h2",
  className = "",
  d = 0,
}: {
  lines: React.ReactNode[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  d?: number;
}) {
  return (
    <Tag data-reveal="lines" className={className} style={delay(d)}>
      {lines.map((l, i) => (
        <span key={i} className="line">
          <span style={{ ["--i" as string]: i }}>{l}</span>
        </span>
      ))}
    </Tag>
  );
}

/** Letters that reveal their "code" glyph underneath on hover (desktop). */
export function MorphWord({ text }: { text: string }) {
  return (
    <>
      {text.split("").map((c, i) => (
        <span key={i} data-ch={c} className="morph-ch">
          {c}
        </span>
      ))}
    </>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-current/20 px-3 py-1 font-mono text-[10px] uppercase tracking-widest">
      {children}
    </span>
  );
}

export function ArrowLink({ href, children, external = false }: { href: string; children: React.ReactNode; external?: boolean }) {
  const cls =
    "group inline-flex items-center gap-3 rounded-full border border-fg px-6 py-3.5 text-sm transition-colors duration-300 hover:bg-fg hover:text-bg";
  const inner = (
    <>
      {children}
      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-rotate-45">→</span>
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" data-magnetic className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} data-magnetic className={cls}>
      {inner}
    </Link>
  );
}

/** Generated artwork for projects without screenshots. */
export function ProjectArt({ p, className = "" }: { p: Project; className?: string }) {
  const [c1, c2] = p.colors;
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: `radial-gradient(60% 70% at 25% 20%, ${c1}, transparent 70%), radial-gradient(60% 60% at 85% 85%, ${c2}, transparent 70%), #111` }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.07)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.07)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <span className="relative font-display text-[clamp(3rem,9vw,8rem)] italic text-white">{p.name}</span>
    </div>
  );
}

export function Shot({
  p,
  kind,
  sizes,
  className = "",
  priority = false,
}: {
  p: Project;
  kind: "desktop" | "mobile" | "full";
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  if (!p.shots) return <ProjectArt p={p} className={`h-full w-full ${className}`} />;
  const [w, h] = kind === "desktop" ? [1440, 900] : kind === "mobile" ? [780, 1688] : [1440, p.fullHeight];
  return (
    <Image
      src={shot(p, kind)}
      alt={`${p.name} website — ${kind} view`}
      width={w}
      height={h}
      sizes={sizes}
      priority={priority}
      className={`block h-auto w-full ${className}`}
    />
  );
}

export function BrowserFrame({ url, children, className = "" }: { url: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-line bg-card shadow-[0_40px_80px_-40px_rgb(0_0_0/0.35)] ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 flex-1 truncate rounded-md bg-bg-2 px-3 py-1 text-center font-mono text-[10px] text-muted">{url}</span>
      </div>
      {children}
    </div>
  );
}

export function PhoneFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[2.2rem] border-[7px] border-fg bg-fg shadow-[0_40px_80px_-30px_rgb(0_0_0/0.45)] ${className}`}>
      <div className="absolute left-1/2 top-2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-fg" />
      <div className="overflow-hidden rounded-[1.7rem]">{children}</div>
    </div>
  );
}

/** A full-page screenshot inside a fixed frame that scrolls through the page on hover. */
export function ScrollShot({ p, frameH = 560, className = "" }: { p: Project; frameH?: number; className?: string }) {
  if (!p.shots) return <ProjectArt p={p} className={`rounded-b-xl ${className}`} />;
  const seconds = Math.max(4, Math.round((p.fullHeight / 900) * 1.6));
  return (
    <div
      className={`scroll-shot relative overflow-hidden ${className}`}
      style={{ height: frameH, ["--frame-h" as string]: `${frameH}px`, ["--scroll-dur" as string]: `${seconds}s` }}
    >
      <Shot p={p} kind="full" sizes="(min-width: 1024px) 60vw, 100vw" />
      <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-fg/85 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-bg">
        Hover to scroll the page ↓
      </span>
    </div>
  );
}
