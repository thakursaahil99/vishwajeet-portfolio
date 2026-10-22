import type { Metadata } from "next";
import Image from "next/image";
import { Faq } from "@/components/Blocks";
import ContactForm from "@/components/ContactForm";
import LocalTime from "@/components/LocalTime";
import Marquee from "@/components/Marquee";
import { SectionHead } from "@/components/ui";
import { faqs, profile, projects, shot } from "@/lib/data";
import { delay } from "@/lib/style";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with Vishwajeet Thakur — website design and development on WordPress, Next.js and Shopify.",
};

export default function ContactPage() {
  const strip = projects.filter((p) => p.shots);

  return (
    <main>
      <section className="mx-auto max-w-[1400px] px-5 pb-16 pt-36 md:px-10 md:pt-44">
        <p className="fade-up flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em]" style={delay(0.2)}>
          <span className="relative flex size-2">
            <span className="ping absolute inset-0 rounded-full bg-[#3ddc84]" />
            <span className="relative size-2 rounded-full bg-[#3ddc84]" />
          </span>
          Currently taking new projects
        </p>
        <h1 className="mt-6 font-display text-[clamp(4.5rem,17vw,16rem)] leading-[0.84] tracking-[-0.02em]">
          <span className="line">
            <span className="rise" style={delay(0.1)}>
              Let&apos;s
            </span>
          </span>
          <span className="line">
            <span className="rise pl-[14vw] italic text-accent" style={delay(0.22)}>
              talk.
            </span>
          </span>
        </h1>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-16 px-5 pb-24 md:grid-cols-12 md:px-10 md:pb-32">
        <div data-reveal className="md:col-span-7">
          <ContactForm />
        </div>

        <aside className="space-y-10 md:col-span-4 md:col-start-9">
          {[
            { k: "Email", v: <a href={`mailto:${profile.email}`} className="u-link break-all">{profile.email}</a> },
            { k: "Phone", v: <a href={`tel:${profile.phoneHref}`} className="u-link">{profile.phone}</a> },
            { k: "Based in", v: profile.location },
            { k: "Local time", v: <LocalTime /> },
            { k: "Works with", v: "Startups, agencies, local businesses and personal brands — in India and abroad." },
          ].map((row, i) => (
            <div key={row.k} data-reveal style={delay(i * 0.06)} className="border-t border-line pt-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{row.k}</p>
              <div className="mt-2 text-xl">{row.v}</div>
            </div>
          ))}
        </aside>
      </section>

      {/* screenshot strip */}
      <section className="overflow-hidden pb-24">
        <div className="mx-auto mb-10 max-w-[1400px] px-5 md:px-10">
          <SectionHead n="02" title="Recent launches" aside="Your site could be next" />
        </div>
        <div className="marquee-track gap-6 [animation-duration:60s]">
          {[...strip, ...strip].map((p, i) => (
            <a
              key={`${p.slug}-${i}`}
              href={`/work/${p.slug}`}
              aria-hidden={i >= strip.length}
              tabIndex={i >= strip.length ? -1 : undefined}
              className="block w-[320px] shrink-0 overflow-hidden rounded-xl border border-line md:w-[460px]"
            >
              <Image src={shot(p, "desktop")} alt={`${p.name} website`} width={1440} height={900} sizes="460px" className="h-auto w-full" />
            </a>
          ))}
        </div>
      </section>

      <Marquee items={["Say hello", profile.email, "Let's build"]} className="border-y border-line py-6 font-display text-4xl md:text-7xl" />

      <Faq n="03" items={faqs.slice(0, 3)} />
    </main>
  );
}
