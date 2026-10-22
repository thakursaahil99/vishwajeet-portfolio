import type { Metadata } from "next";
import Image from "next/image";
import { Process, Stats } from "@/components/Blocks";
import Marquee from "@/components/Marquee";
import { ArrowLink, Lines, SectionHead } from "@/components/ui";
import { education, experience, getProject, profile, shot, strengths, toolbox } from "@/lib/data";
import { delay } from "@/lib/style";

export const metadata: Metadata = {
  title: "About",
  description: "Vishwajeet Thakur — designer & developer from Chandigarh with 3+ years building websites on WordPress, Next.js and Shopify.",
};

const collage = ["arvid-lindblad", "wirehn", "liquid-carbon"].map((s) => getProject(s)!);

export default function AboutPage() {
  return (
    <main>
      {/* ---------- Hero ---------- */}
      <section className="mx-auto grid max-w-[1400px] gap-16 px-5 pb-24 pt-36 md:px-10 md:pt-44 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="fade-up font-mono text-[11px] uppercase tracking-[0.18em] text-muted" style={delay(0.2)}>
            About · {profile.role}
          </p>
          <h1 className="mt-6 font-display text-[clamp(4.2rem,13vw,12rem)] leading-[0.86] tracking-[-0.02em]">
            <span className="line">
              <span className="rise" style={delay(0.1)}>
                Hi, I&apos;m
              </span>
            </span>
            <span className="line">
              <span className="rise italic text-accent" style={delay(0.22)}>
                Vishwajeet.
              </span>
            </span>
          </h1>
          <p className="fade-up mt-10 max-w-xl text-2xl leading-snug md:text-3xl" style={delay(0.55)}>
            I design websites and then build them myself — so what you approve is exactly what goes live.
          </p>
          <div className="fade-up mt-10 flex flex-wrap gap-3" style={delay(0.7)}>
            <ArrowLink href="/work">See my work</ArrowLink>
            <ArrowLink href="/contact">Get in touch</ArrowLink>
          </div>
        </div>

        {/* screenshot collage */}
        <div className="relative mx-auto h-[420px] w-full max-w-[640px] sm:h-[560px] lg:col-span-5 lg:h-auto">
          {collage.map((p, i) => (
            <div
              key={p.slug}
              className="fade-up absolute w-[78%] overflow-hidden rounded-xl border border-line shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:z-10 hover:scale-105"
              style={{
                ...delay(0.5 + i * 0.15),
                top: `${8 + i * 22}%`,
                left: i === 1 ? "22%" : i === 2 ? "6%" : "0%",
                rotate: `${[-6, 4, -2][i]}deg`,
              }}
            >
              <Image src={shot(p, "desktop")} alt={`${p.name} website`} width={1440} height={900} sizes="(min-width: 768px) 32vw, 78vw" className="h-auto w-full" />
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Story ---------- */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <SectionHead n="01" title="My story" />
        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <Lines
            lines={["Websites are where", "design and code", <span key="m" className="italic text-accent">finally meet.</span>]}
            className="font-display text-[clamp(2.6rem,5.5vw,5rem)] leading-[0.95] lg:col-span-7"
          />
          <div className="max-w-2xl space-y-6 text-lg leading-relaxed text-muted lg:col-span-5">
            <p data-reveal>
              I started out designing pages and quickly realised I wanted control over how they were built too. Today I take a website from the
              first layout all the way to launch.
            </p>
            <p data-reveal style={delay(0.08)}>
              At Caresort Solutions I&apos;ve designed and developed 30+ websites since 2023 — healthcare brands, industrial manufacturers,
              agencies, a Formula 1 driver and online stores. Most are built with WordPress, Elementor and Divi; when a project needs more, I
              reach for Next.js or Shopify.
            </p>
            <p data-reveal style={delay(0.16)}>
              I care about the details people feel but rarely notice: spacing, motion, how a page loads on a slow phone. That&apos;s why I push
              every site toward a 90+ PageSpeed score.
            </p>
          </div>
        </div>
        <div className="mt-20">
          <Stats />
        </div>
      </section>

      <Marquee items={["Designer", "Developer", "Problem solver", "Detail-obsessed"]} className="border-y border-line py-6 font-display text-5xl md:text-8xl" />

      {/* ---------- Experience ---------- */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <SectionHead n="02" title="Experience" aside="Where I work" />
        {experience.map((job) => (
          <article key={job.company} className="mt-12 grid gap-10 lg:grid-cols-12">
            <div data-reveal className="lg:col-span-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{job.period}</p>
              <h2 className="mt-4 font-display text-5xl leading-none md:text-6xl">{job.role}</h2>
              <p className="mt-4 text-lg text-muted">{job.company}</p>
            </div>
            <div className="lg:col-span-8">
              <ul>
                {job.points.map((pt, k) => (
                  <li key={pt} data-reveal style={delay(k * 0.06)} className="flex gap-6 border-t border-line py-5 text-lg md:text-xl">
                    <span className="pt-1.5 font-mono text-xs text-muted">0{k + 1}</span>
                    {pt}
                  </li>
                ))}
              </ul>
              <div data-reveal className="mt-6 flex flex-wrap gap-2">
                {job.stack.map((s) => (
                  <span key={s} className="rounded-full bg-fg px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-bg">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* ---------- Education ---------- */}
      <section className="bg-bg-2 py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <SectionHead n="03" title="Education" />
          <div className="mt-12">
            {education.map((e, k) => (
              <div key={e.title} data-reveal style={delay(k * 0.08)} className="grid gap-2 border-t border-line py-8 md:grid-cols-12 md:items-baseline">
                <span className="font-mono text-sm text-accent md:col-span-2">{e.period}</span>
                <h3 className="font-display text-4xl md:col-span-5 md:text-5xl">{e.title}</h3>
                <p className="text-muted md:col-span-5 md:text-right">{e.place}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Strengths ---------- */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <SectionHead n="04" title="Strengths" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {strengths.map((s, k) => (
            <div
              key={s.title}
              data-reveal
              style={delay(k * 0.08)}
              className="group rounded-[22px] bg-card p-8 transition-colors duration-500 hover:bg-fg hover:text-bg"
            >
              <span className="font-display text-6xl italic text-accent">0{k + 1}</span>
              <h3 className="mt-10 text-2xl">{s.title}</h3>
              <p className="mt-3 text-muted transition-colors group-hover:text-bg/70">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Toolbox ---------- */}
      <section className="mx-auto max-w-[1400px] px-5 pb-8 md:px-10">
        <SectionHead n="05" title="Toolbox" aside={`${toolbox.length} tools`} />
        <div className="mt-12 flex flex-wrap gap-3">
          {toolbox.map((t, k) => (
            <span
              key={t}
              data-reveal="scale"
              style={delay(k * 0.03)}
              className="rounded-full border border-line px-6 py-3 text-lg transition-colors hover:border-accent hover:bg-accent hover:text-white md:text-2xl"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      <Process n="06" />
    </main>
  );
}
