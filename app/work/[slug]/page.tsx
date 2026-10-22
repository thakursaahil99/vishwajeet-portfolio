import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLink, BrowserFrame, Lines, PhoneFrame, ScrollShot, SectionHead, Shot, Tag } from "@/components/ui";
import { getProject, projects } from "@/lib/data";
import { delay } from "@/lib/style";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return { title: p.name, description: p.summary };
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug);
  if (!p) notFound();

  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length];

  const highlights = [
    { title: "Responsive", desc: "Designed and checked for mobile, tablet and desktop." },
    { title: "Performance", desc: "Optimised images and assets for fast loading." },
    { title: p.platform === "Shopify" ? "Built to sell" : "Easy to manage", desc: p.platform === "Shopify" ? "Clear product presentation and a simple path to checkout." : "A setup the client can update without a developer." },
  ];

  return (
    <main>
      {/* ---------- Intro ---------- */}
      <section className="mx-auto max-w-[1400px] px-5 pt-32 md:px-10 md:pt-40">
        <div className="fade-up flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em]" style={delay(0.1)}>
          <Link href="/work" className="u-link">
            ← All work
          </Link>
          <span className="text-muted">
            Project {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        <h1 className="mt-10 font-display text-[clamp(3.8rem,13vw,13rem)] leading-[0.86] tracking-[-0.02em]">
          <span className="line">
            <span className="rise" style={delay(0.15)}>
              {p.name}
            </span>
          </span>
        </h1>
        <p className="fade-up mt-6 max-w-2xl text-2xl leading-snug text-muted md:text-3xl" style={delay(0.45)}>
          {p.summary}
        </p>

        <dl className="fade-up mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8 lg:grid-cols-4" style={delay(0.6)}>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Industry</dt>
            <dd className="mt-2 text-lg">{p.industry}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Type</dt>
            <dd className="mt-2 text-lg">{p.category}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Built with</dt>
            <dd className="mt-2 text-lg">{p.stack.join(", ")}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Live site</dt>
            <dd className="mt-2 text-lg">
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="u-link text-accent">
                {p.domain} ↗
              </a>
            </dd>
          </div>
        </dl>
      </section>

      {/* ---------- Hero screenshot ---------- */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
        <div data-reveal="curtain" className="rounded-[28px] p-4 md:p-10" style={{ background: `linear-gradient(135deg, ${p.colors[0]}, ${p.colors[1]})` }}>
          <BrowserFrame url={p.domain}>
            <div className="aspect-[16/10] overflow-hidden">
              <Shot p={p} kind="desktop" priority sizes="(min-width: 1400px) 1300px, 100vw" className="parallax-img h-full object-cover object-top" />
            </div>
          </BrowserFrame>
        </div>
      </section>

      {/* ---------- Overview ---------- */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
        <SectionHead n="01" title="Overview" />
        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <Lines lines={["The brief"]} className="font-display text-5xl italic md:text-6xl lg:col-span-4" />
          <div className="lg:col-span-8">
            <p data-reveal className="text-2xl leading-snug md:text-3xl">
              {p.overview}
            </p>
            <h3 data-reveal className="mt-14 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              What I worked on
            </h3>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {p.scope.map((s, k) => (
                <li key={s} data-reveal style={delay(k * 0.05)} className="flex items-center gap-4 border-b border-line py-4 text-lg">
                  <span className="font-mono text-xs text-accent">0{k + 1}</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- Full page + mobile ---------- */}
      {p.shots && (
        <section className="bg-bg-2 py-24 md:py-32">
          <div className="mx-auto max-w-[1400px] px-5 md:px-10">
            <SectionHead n="02" title="The full page" aside="Desktop & mobile" />
            <Lines
              lines={["Every section,", <span key="e" className="italic text-accent">every screen.</span>]}
              className="mb-14 mt-10 font-display text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.95]"
            />
            <div className="grid items-start gap-10 lg:grid-cols-12">
              <div data-reveal className="lg:col-span-8">
                <BrowserFrame url={p.domain}>
                  <ScrollShot p={p} frameH={640} />
                </BrowserFrame>
              </div>
              <div data-reveal style={delay(0.15)} className="lg:sticky lg:top-28 lg:col-span-4">
                <PhoneFrame className="mx-auto max-w-[300px]">
                  <div className="aspect-[390/844] overflow-hidden">
                    <Shot p={p} kind="mobile" sizes="300px" className="h-full object-cover object-top" />
                  </div>
                </PhoneFrame>
                <p className="mt-6 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Mobile view · 390px</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------- Highlights ---------- */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <SectionHead n={p.shots ? "03" : "02"} title="Highlights" />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {highlights.map((h, k) => (
            <div key={h.title} data-reveal style={delay(k * 0.08)} className="rounded-[22px] border border-line bg-card p-8">
              <span className="font-display text-6xl italic text-accent">0{k + 1}</span>
              <h3 className="mt-8 text-2xl">{h.title}</h3>
              <p className="mt-2 text-muted">{h.desc}</p>
            </div>
          ))}
        </div>
        <div data-reveal className="mt-14 flex flex-wrap items-center gap-4">
          <ArrowLink href={p.url} external>
            Visit live site
          </ArrowLink>
          {p.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      </section>

      {/* ---------- Next project ---------- */}
      <section className="mx-auto max-w-[1400px] px-5 pb-24 md:px-10 md:pb-32">
        <Link href={`/work/${next.slug}`} data-cursor="Next" className="group block border-t border-line pt-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Next project</p>
          <div className="mt-6 grid items-center gap-10 md:grid-cols-2">
            <p className="font-display text-[clamp(3.5rem,9vw,8rem)] leading-[0.9] transition-colors group-hover:italic group-hover:text-accent">
              {next.name} <span className="inline-block transition-transform duration-500 group-hover:translate-x-3">→</span>
            </p>
            <div className="overflow-hidden rounded-2xl border border-line">
              <div className="aspect-[16/10] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
                <Shot p={next} kind="desktop" sizes="(min-width: 768px) 50vw, 100vw" className="h-full object-cover object-top" />
              </div>
            </div>
          </div>
        </Link>
      </section>
    </main>
  );
}
