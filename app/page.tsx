import Link from "next/link";
import { Process, Stats } from "@/components/Blocks";
import IdCard from "@/components/IdCard";
import Marquee from "@/components/Marquee";
import ProjectCard from "@/components/ProjectCard";
import SplitShowcase from "@/components/SplitShowcase";
import { ArrowLink, Lines, SectionHead } from "@/components/ui";
import WorkList from "@/components/WorkList";
import { designServices, devServices, marquee, profile, projects, toolbox } from "@/lib/data";
import { delay } from "@/lib/style";

export default function Home() {
  const featured = projects.slice(0, 4);
  const more = projects.slice(4);

  return (
    <main>
      {/* ---------- Hero: name + hanging ID card ---------- */}
      <section className="relative mx-auto grid min-h-[100svh] max-w-[1400px] grid-cols-1 px-5 pt-28 md:grid-cols-12 md:px-10">
        <div className="relative z-10 flex flex-col justify-end pb-6 md:col-span-7 md:pb-16 lg:col-span-8">
          <div className="fade-up flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em]" style={delay(0.5)}>
            <span className="flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="ping absolute inset-0 rounded-full bg-[#3ddc84]" />
                <span className="relative size-2 rounded-full bg-[#3ddc84]" />
              </span>
              Available for projects
            </span>
            <span className="text-muted">Based in {profile.location}</span>
          </div>

          <h1 className="mt-6 font-display text-[clamp(4.2rem,18vw,9rem)] leading-[0.84] tracking-[-0.02em] md:text-[clamp(5rem,13.5vw,15rem)]">
            <span className="line">
              <span className="rise" style={delay(0.1)}>
                Vishwajeet
              </span>
            </span>
            <span className="line">
              <span className="rise pl-[10vw] italic text-accent md:pl-[8vw]" style={delay(0.22)}>
                Thakur
              </span>
            </span>
          </h1>

          <div className="fade-up mt-10 grid gap-8 md:grid-cols-2 md:items-end" style={delay(0.7)}>
            <p className="text-3xl leading-tight md:text-4xl">
              <span className="font-display italic">Designer</span> <span className="text-muted">&amp;</span>{" "}
              <span className="font-mono text-[0.72em] tracking-tight">Developer</span>
            </p>
            <div>
              <p className="max-w-md text-muted">{profile.intro}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ArrowLink href="/work">View work</ArrowLink>
                <Link href="/contact" className="inline-flex items-center rounded-full bg-accent px-6 py-3.5 text-sm text-white transition-opacity hover:opacity-85">
                  Hire me
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-[600px] md:col-span-5 md:h-auto lg:col-span-4">
          <div className="absolute inset-0 md:-top-28">
            <IdCard />
          </div>
          <p className="fade-up pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.2em] text-muted" style={delay(1.4)}>
            Drag the card · Click to flip
          </p>
        </div>
      </section>

      {/* ---------- Marquee ---------- */}
      <Marquee items={marquee} className="border-y border-line py-5 font-display text-5xl md:py-7 md:text-8xl" />

      {/* ---------- Introduction ---------- */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
        <SectionHead n="01" title="Introduction" aside="Who I am" />
        <div className="mt-12 grid gap-12 md:grid-cols-12">
          <Lines
            lines={["A designer who codes,", <span key="b" className="italic text-accent">a developer who designs.</span>]}
            className="font-display text-[clamp(2.6rem,6.2vw,6rem)] leading-[0.95] md:col-span-8"
          />
          <div data-reveal style={delay(0.2)} className="space-y-5 text-lg text-muted md:col-span-4 md:pt-4">
            <p>
              For 3+ years I&apos;ve been designing and building websites end-to-end at Caresort Solutions — from the first layout to a fast, live
              site.
            </p>
            <p>WordPress with Elementor and Divi, modern frontends with Next.js, and Shopify stores that sell.</p>
            <ArrowLink href="/about">More about me</ArrowLink>
          </div>
        </div>
        <div className="mt-20">
          <Stats />
        </div>
      </section>

      {/* ---------- Designer / developer split ---------- */}
      <section className="mx-auto max-w-[1400px] px-5 pb-24 md:px-10 md:pb-36">
        <SectionHead n="02" title="Design ⇄ Code" aside="Move your cursor across" />
        <Lines
          lines={["Two sides.", <span key="o" className="italic">One person.</span>]}
          className="mb-12 mt-10 font-display text-[clamp(2.6rem,6.2vw,6rem)] leading-[0.95]"
        />
        <SplitShowcase />
      </section>

      {/* ---------- Selected work ---------- */}
      <section className="mx-auto max-w-[1400px] px-5 pb-24 md:px-10 md:pb-36">
        <SectionHead n="03" title="Selected work" aside={`${featured.length} of ${projects.length}`} />
        <div className="mt-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Lines
            lines={["Websites that", <span key="w" className="italic text-accent">are live & working.</span>]}
            className="font-display text-[clamp(2.6rem,6.2vw,6rem)] leading-[0.95]"
          />
          <div data-reveal>
            <ArrowLink href="/work">All projects</ArrowLink>
          </div>
        </div>

        <div className="mt-16 space-y-24 md:space-y-32">
          <ProjectCard p={featured[0]} index={0} large />
          <div className="grid gap-24 md:grid-cols-2 md:gap-10">
            <ProjectCard p={featured[1]} index={1} />
            <div className="md:mt-40">
              <ProjectCard p={featured[2]} index={2} d={0.1} />
            </div>
          </div>
          <ProjectCard p={featured[3]} index={3} large />
        </div>

        <div className="mt-32">
          <p data-reveal className="mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            More projects — hover to preview
          </p>
          <WorkList items={more} startIndex={featured.length} />
        </div>
      </section>

      {/* ---------- Services ---------- */}
      <section className="bg-bg-2 py-24 md:py-36">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <SectionHead n="04" title="What I do" aside="Design + development" />
          <div className="mt-12 grid gap-16 md:grid-cols-2 md:gap-10">
            {[
              { label: "Design", glyph: "✦", items: designServices },
              { label: "Development", glyph: "</>", items: devServices },
            ].map((col, c) => (
              <div key={col.label}>
                <div data-reveal className="flex items-baseline justify-between">
                  <h3 className={`text-6xl md:text-7xl ${c === 0 ? "font-display italic" : "font-mono tracking-tighter"}`}>{col.label}</h3>
                  <span className="font-mono text-accent">{col.glyph}</span>
                </div>
                <ul className="mt-8">
                  {col.items.map((s, i) => (
                    <li key={s.title} data-reveal style={delay(i * 0.06)} className="group border-t border-line py-6">
                      <div className="flex items-baseline gap-5">
                        <span className="font-mono text-xs text-muted">0{i + 1}</span>
                        <div>
                          <h4 className="text-2xl transition-colors group-hover:text-accent">{s.title}</h4>
                          <p className="mt-2 text-muted">{s.desc}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div data-reveal className="mt-14">
            <ArrowLink href="/services">Explore services</ArrowLink>
          </div>
        </div>
      </section>

      <Process n="05" />

      {/* ---------- Toolbox ---------- */}
      <section className="pb-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <SectionHead n="06" title="Toolbox" aside={`${toolbox.length} tools`} />
        </div>
        <Marquee items={toolbox} reverse className="mt-10 font-mono text-2xl uppercase tracking-tight md:text-4xl" />
      </section>
    </main>
  );
}
