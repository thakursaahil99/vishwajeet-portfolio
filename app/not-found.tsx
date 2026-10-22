import { ArrowLink } from "@/components/ui";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[80svh] max-w-[1400px] flex-col justify-center px-5 pt-32 md:px-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Error 404</p>
      <h1 className="mt-6 font-display text-[clamp(4rem,14vw,12rem)] leading-[0.86]">
        Page not <span className="italic text-accent">found.</span>
      </h1>
      <div className="mt-10">
        <ArrowLink href="/">Back home</ArrowLink>
      </div>
    </main>
  );
}
