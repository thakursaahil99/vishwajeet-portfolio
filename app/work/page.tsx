import type { Metadata } from "next";
import { Stats } from "@/components/Blocks";
import { Lines, SectionHead } from "@/components/ui";
import WorkGrid from "@/components/WorkGrid";
import WorkList from "@/components/WorkList";
import { projects } from "@/lib/data";
import { delay } from "@/lib/style";

export const metadata: Metadata = {
  title: "Work",
  description: "Live websites designed and built by Vishwajeet Thakur on WordPress, Elementor and Shopify.",
};

export default function WorkPage() {
  return (
    <main>
      <section className="mx-auto max-w-[1400px] px-5 pb-16 pt-36 md:px-10 md:pt-44">
        <p className="fade-up font-mono text-[11px] uppercase tracking-[0.18em] text-muted" style={delay(0.2)}>
          Portfolio · {projects.length} live projects
        </p>
        <h1 className="mt-6 font-display text-[clamp(4.5rem,16vw,15rem)] leading-[0.84] tracking-[-0.02em]">
          <span className="line">
            <span className="rise" style={delay(0.1)}>
              Selected
            </span>
          </span>
          <span className="line">
            <span className="rise pl-[12vw] italic text-accent" style={delay(0.22)}>
              work<sup className="ml-2 align-super font-mono text-[0.18em] not-italic text-fg">({projects.length})</sup>
            </span>
          </span>
        </h1>
        <div className="fade-up mt-12 grid gap-8 md:grid-cols-12" style={delay(0.6)}>
          <p className="text-xl leading-snug md:col-span-6 md:text-2xl">
            Corporate sites, landing pages, personal brands and online stores — each one designed and developed end-to-end, and live today.
          </p>
          <p className="text-muted md:col-span-4 md:col-start-9">
            Click any project for the full case study: desktop and mobile screenshots, the complete page, and what I worked on.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 pb-24 md:px-10">
        <WorkGrid />
      </section>

      <section className="mx-auto max-w-[1400px] px-5 pb-24 md:px-10 md:pb-32">
        <SectionHead n="02" title="Index" aside="Every project at a glance" />
        <Lines
          lines={["All projects,", <span key="i" className="italic">one list.</span>]}
          className="mb-12 mt-10 font-display text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.95]"
        />
        <WorkList items={projects} />
      </section>

      <section className="mx-auto max-w-[1400px] px-5 pb-24 md:px-10 md:pb-32">
        <SectionHead n="03" title="By the numbers" />
        <div className="mt-10">
          <Stats />
        </div>
      </section>
    </main>
  );
}
