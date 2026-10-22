"use client";

import { useState } from "react";
import { profile } from "@/lib/data";

const types = ["WordPress website", "Next.js website", "Shopify store", "Landing page", "Redesign", "Speed / SEO fix"];
const budgets = ["< ₹25k", "₹25k – 50k", "₹50k – 1L", "₹1L +", "Not sure yet"];

/** No backend: composes the enquiry and opens the visitor's email app. */
export default function ContactForm() {
  const [picked, setPicked] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [copied, setCopied] = useState(false);

  const toggle = (t: string) => setPicked((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = [
      `Name: ${f.get("name")}`,
      `Email: ${f.get("email")}`,
      picked.length ? `Project: ${picked.join(", ")}` : "",
      budget ? `Budget: ${budget}` : "",
      "",
      String(f.get("message") ?? ""),
    ]
      .filter((l) => l !== null)
      .join("\n");
    const subject = `New project enquiry from ${f.get("name")}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const chip = (active: boolean) =>
    `rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${active ? "border-fg bg-fg text-bg" : "border-line hover:border-fg"}`;

  const field =
    "w-full border-b border-line bg-transparent py-4 text-xl outline-none transition-colors placeholder:text-muted/70 focus:border-accent md:text-2xl";

  return (
    <form onSubmit={submit} className="space-y-12">
      <div className="grid gap-8 md:grid-cols-2">
        <label className="block">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Your name *</span>
          <input name="name" required autoComplete="name" placeholder="Jane Doe" className={field} />
        </label>
        <label className="block">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Your email *</span>
          <input name="email" type="email" required autoComplete="email" placeholder="jane@company.com" className={field} />
        </label>
      </div>

      <fieldset>
        <legend className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">What do you need?</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {types.map((t) => (
            <button key={t} type="button" onClick={() => toggle(t)} aria-pressed={picked.includes(t)} className={chip(picked.includes(t))}>
              {t}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Budget</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {budgets.map((b) => (
            <button key={b} type="button" onClick={() => setBudget(b === budget ? "" : b)} aria-pressed={budget === b} className={chip(budget === b)}>
              {b}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="block">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Tell me about the project *</span>
        <textarea name="message" required rows={4} placeholder="A few lines about your business, goals and timeline…" className={`${field} resize-none`} />
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="group inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-white transition-transform duration-300 hover:scale-[1.03]"
        >
          Send enquiry
          <span className="inline-block transition-transform duration-300 group-hover:-rotate-45">→</span>
        </button>
        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(profile.email);
              setCopied(true);
              setTimeout(() => setCopied(false), 1800);
            } catch {}
          }}
          className="rounded-full border border-line px-6 py-4 text-sm transition-colors hover:border-fg"
        >
          {copied ? "Email copied ✓" : "Copy email instead"}
        </button>
      </div>
      <p className="text-sm text-muted">Sending opens your email app with everything filled in.</p>
    </form>
  );
}
