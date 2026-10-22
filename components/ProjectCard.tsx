import Link from "next/link";
import type { Project } from "@/lib/data";
import { delay } from "@/lib/style";
import { BrowserFrame, PhoneFrame, Shot, Tag } from "./ui";

/** Large case-study card: desktop screenshot with the mobile view overlapping it. */
export default function ProjectCard({ p, index, large = false, d = 0 }: { p: Project; index: number; large?: boolean; d?: number }) {
  return (
    <Link href={`/work/${p.slug}`} className="group block" data-reveal style={delay(d)}>
      <div className="relative rounded-[24px] bg-bg-2 p-4 transition-colors duration-500 group-hover:bg-fg md:p-8">
        <div className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2 group-hover:scale-[1.01]">
          <BrowserFrame url={p.domain}>
            <div className={`relative overflow-hidden ${large ? "aspect-[16/10]" : "aspect-[16/10]"}`}>
              <Shot p={p} kind="desktop" sizes={large ? "(min-width: 768px) 70vw, 100vw" : "(min-width: 768px) 45vw, 100vw"} className="h-full object-cover object-top" />
            </div>
          </BrowserFrame>
        </div>
        {p.shots && (
          <div className="absolute -bottom-4 right-6 w-[22%] min-w-[84px] max-w-[170px] translate-y-3 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-4 group-hover:rotate-[-4deg] md:right-10">
            <PhoneFrame>
              <div className="aspect-[390/844] overflow-hidden">
                <Shot p={p} kind="mobile" sizes="170px" className="h-full object-cover object-top" />
              </div>
            </PhoneFrame>
          </div>
        )}
      </div>

      <div className="mt-8 flex items-start justify-between gap-6">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            {String(index + 1).padStart(2, "0")} — {p.category}
          </p>
          <h3 className={`mt-2 font-display leading-none transition-colors group-hover:text-accent ${large ? "text-5xl md:text-7xl" : "text-4xl md:text-5xl"}`}>
            {p.name}
          </h3>
          <p className="mt-3 max-w-md text-muted">{p.summary}</p>
        </div>
        <div className="hidden shrink-0 flex-wrap justify-end gap-2 sm:flex">
          {p.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      </div>
    </Link>
  );
}
