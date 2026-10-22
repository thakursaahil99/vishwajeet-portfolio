import { faqs, process, stats } from "@/lib/data";
import { delay } from "@/lib/style";
import { Lines, SectionHead } from "./ui";

export function Stats() {
  return (
    <div className="grid grid-cols-2 border-l border-t border-line md:grid-cols-4">
      {stats.map((s, i) => (
        <div key={s.label} data-reveal style={delay(i * 0.08)} className="border-b border-r border-line p-6 md:p-8">
          <p className="font-display text-6xl leading-none md:text-8xl">
            {s.value.replace(/\+$/, "")}
            {s.value.endsWith("+") && <span className="italic text-accent">+</span>}
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

export function Process({ n }: { n: string }) {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
      <SectionHead n={n} title="Process" aside="How a project moves" />
      <Lines
        lines={["From first idea", <span key="l" className="italic">to live website.</span>]}
        className="mt-10 max-w-4xl font-display text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.95]"
      />
      <ol className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {process.map((step, i) => (
          <li
            key={step.title}
            data-reveal
            style={delay(i * 0.08)}
            className="group relative overflow-hidden rounded-[22px] border border-line bg-card p-7 transition-colors duration-500 hover:border-transparent"
          >
            <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
            <span className="font-display text-7xl italic text-accent">0{i + 1}</span>
            <h3 className="mt-10 text-2xl font-medium">{step.title}</h3>
            <p className="mt-3 text-muted">{step.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Faq({ n, items = faqs }: { n: string; items?: typeof faqs }) {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
      <SectionHead n={n} title="FAQ" aside="Good questions" />
      <div className="mt-12 grid gap-10 md:grid-cols-12">
        <Lines
          lines={["Questions,", <span key="a" className="italic text-accent">answered.</span>]}
          className="font-display text-[clamp(2.6rem,5vw,4.5rem)] leading-[0.95] md:col-span-4"
        />
        <div className="md:col-span-8">
          {items.map((f, i) => (
            <details key={f.q} data-reveal style={delay(i * 0.05)} className="group border-t border-line py-6 last:border-b">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-xl md:text-2xl">
                {f.q}
                <span className="faq-icon flex size-9 shrink-0 items-center justify-center rounded-full border border-line text-xl transition-transform duration-300">
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-2xl text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
