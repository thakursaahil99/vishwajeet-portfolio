import Link from "next/link";
import { nav, profile, projects } from "@/lib/data";
import LocalTime from "./LocalTime";
import { Lines } from "./ui";

export default function Footer() {
  return (
    <footer className="relative mt-10 overflow-hidden rounded-t-[36px] bg-fg px-5 pt-24 text-bg md:mx-3 md:px-12 md:pt-32">
      <div className="mx-auto max-w-[1400px]">
        <p data-reveal="fade" className="font-mono text-[11px] uppercase tracking-[0.18em] opacity-60">
          Have a project in mind?
        </p>
        <Lines
          lines={["Let’s make", <span key="s" className="italic text-accent">something good.</span>]}
          className="mt-6 font-display text-[clamp(3.2rem,10vw,10.5rem)] leading-[0.88] tracking-tight"
        />

        <div className="mt-14 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <a href={`mailto:${profile.email}`} className="u-link break-all font-display text-3xl md:text-5xl">
            {profile.email}
          </a>
          <Link
            href="/contact"
            className="group flex size-36 shrink-0 items-center justify-center rounded-full bg-accent text-center text-white transition-transform duration-500 hover:scale-105 md:size-44"
          >
            <span className="text-sm">
              Start a<br />
              project <span className="inline-block transition-transform group-hover:-rotate-45">→</span>
            </span>
          </Link>
        </div>

        <div className="mt-20 grid gap-10 border-t border-bg/15 pt-10 text-sm sm:grid-cols-2 md:grid-cols-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] opacity-50">Pages</p>
            <ul className="mt-4 space-y-2">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="u-link">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] opacity-50">Recent work</p>
            <ul className="mt-4 space-y-2">
              {projects.slice(0, 5).map((p) => (
                <li key={p.slug}>
                  <Link href={`/work/${p.slug}`} className="u-link">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] opacity-50">Contact</p>
            <ul className="mt-4 space-y-2">
              <li>
                <a href={`mailto:${profile.email}`} className="u-link break-all">
                  {profile.email}
                </a>
              </li>
              <li>
                <a href={`tel:${profile.phoneHref}`} className="u-link">
                  {profile.phone}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] opacity-50">Local time</p>
            <p className="mt-4">
              {profile.location}
              <br />
              <LocalTime />
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-bg/15 py-6 font-mono text-[11px] uppercase tracking-[0.18em] opacity-60 md:flex-row">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>Designed & developed by Vishwajeet</span>
          <a href="#" className="u-link">
            Back to top ↑
          </a>
        </div>
      </div>

      <div aria-hidden data-reveal className="mx-auto max-w-[1400px] border-t border-bg/15 pb-[3vw] pt-[2vw]">
        <p className="select-none whitespace-nowrap text-center font-display text-[11.5vw] leading-[1.05] tracking-[-0.02em] min-[1400px]:text-[10.5rem]">
          Vishwajeet <span className="italic text-accent">Thakur</span>
        </p>
      </div>
    </footer>
  );
}
