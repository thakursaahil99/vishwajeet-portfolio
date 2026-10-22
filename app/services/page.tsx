import type { Metadata } from "next";
import Image from "next/image";
import { Faq, Process } from "@/components/Blocks";
import { ArrowLink, Lines, SectionHead, Tag } from "@/components/ui";
import { type Service, designServices, devServices, getProject, shot } from "@/lib/data";
import { delay } from "@/lib/style";

export const metadata: Metadata = {
  title: "Services",
  description: "Website design and development services: UI/UX, landing pages, WordPress, Next.js, Shopify, performance and SEO.",
};

// Which live project illustrates each service.
const examples: Record<string, string | undefined> = {
  "UI / UX Design": "liquid-carbon",
  "Landing Pages": "innovious",
  "Visual Systems": "codech",
  "WordPress Development": "sbppl",
  "Shopify Stores": "wirehn",
  "Performance & SEO": "arvid-lindblad",
};

function CodeCard() {
  return (
    <div className="flex aspect-[16/10] flex-col justify-center rounded-xl bg-[var(--code-bg)] p-6 font-mono text-[clamp(0.65rem,1.1vw,0.95rem)] leading-7 text-[var(--code-fg)]">
      <span>
        <span className="tk-kw">import</span> Link <span className="tk-kw">from</span> <span className="tk-str">&quot;next/link&quot;</span>;
      </span>
      <span className="mt-3">
        <span className="tk-kw">export default function</span> <span className="tk-key">Page</span>() {"{"}
      </span>
      <span>
        {"  "}
        <span className="tk-kw">return</span> <span className="tk-tag">&lt;main&gt;</span>…<span className="tk-tag">&lt;/main&gt;</span>;
      </span>
      <span>{"}"}</span>
      <span className="mt-3 tk-dim">{"// "}static · fast · SEO-friendly</span>
    </div>
  );
}

function ServiceRow({ s, i, offset }: { s: Service; i: number; offset: number }) {
  const ex = examples[s.title] ? getProject(examples[s.title]!) : undefined;
  return (
    <article data-reveal className="grid gap-8 border-t border-line py-14 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-5">
        <span className="font-mono text-xs text-accent">{String(offset + i + 1).padStart(2, "0")}</span>
        <h3 className="mt-4 font-display text-5xl leading-none md:text-6xl">{s.title}</h3>
        <p className="mt-5 text-lg text-muted">{s.desc}</p>
        {s.points && (
          <ul className="mt-8 space-y-3">
            {s.points.map((pt) => (
              <li key={pt} className="flex items-center gap-3">
                <span className="h-px w-5 bg-accent" />
                {pt}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-8 flex flex-wrap gap-2">
          {s.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </div>
      <div className="lg:col-span-7">
        {ex ? (
          <a href={`/work/${ex.slug}`} data-cursor="View" className="group block">
            <div className="overflow-hidden rounded-xl border border-line">
              <Image
                src={shot(ex, "desktop")}
                alt={`${ex.name} website`}
                width={1440}
                height={900}
                sizes="(min-width: 768px) 55vw, 100vw"
                className="h-auto w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
            </div>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              Example — <span className="u-link text-fg">{ex.name}</span> →
            </p>
          </a>
        ) : (
          <CodeCard />
        )}
      </div>
    </article>
  );
}

export default function ServicesPage() {
  return (
    <main>
      <section className="mx-auto max-w-[1400px] px-5 pb-20 pt-36 md:px-10 md:pt-44">
        <p className="fade-up font-mono text-[11px] uppercase tracking-[0.18em] text-muted" style={delay(0.2)}>
          Services
        </p>
        <h1 className="mt-6 font-display text-[clamp(4rem,13vw,12.5rem)] leading-[0.86] tracking-[-0.02em]">
          <span className="line">
            <span className="rise" style={delay(0.1)}>
              Design <span className="italic text-accent">&amp;</span>
            </span>
          </span>
          <span className="line">
            <span className="rise font-mono text-[0.62em] tracking-tighter" style={delay(0.22)}>
              development
            </span>
          </span>
        </h1>
        <div className="fade-up mt-12 grid gap-8 md:grid-cols-12" style={delay(0.6)}>
          <p className="text-xl leading-snug md:col-span-6 md:text-2xl">
            One person for the whole website — the look, the build, the speed and the launch. No hand-offs, nothing lost in translation.
          </p>
          <div className="flex gap-3 md:col-span-4 md:col-start-9 md:justify-end">
            <ArrowLink href="/contact">Start a project</ArrowLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10">
        <SectionHead n="01" title="Design" aside={`${designServices.length} services`} />
        <Lines lines={[<span key="d" className="italic">Design</span>]} className="mt-10 font-display text-[clamp(3rem,8vw,7rem)] leading-none" />
        {designServices.map((s, i) => (
          <ServiceRow key={s.title} s={s} i={i} offset={0} />
        ))}
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10">
        <SectionHead n="02" title="Development" aside={`${devServices.length} services`} />
        <Lines lines={[<span key="d" className="font-mono tracking-tighter">Development</span>]} className="mt-10 text-[clamp(2.4rem,7vw,6rem)] leading-none" />
        {devServices.map((s, i) => (
          <ServiceRow key={s.title} s={s} i={i} offset={designServices.length} />
        ))}
      </section>

      <Process n="03" />
      <Faq n="04" />
    </main>
  );
}
