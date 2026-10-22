"use client";

import { useEffect, useState } from "react";
import { projects } from "@/lib/data";
import ProjectCard from "./ProjectCard";

const filters = ["All", "WordPress", "Shopify", "Other"] as const;
type Filter = (typeof filters)[number];

export default function WorkGrid() {
  const [filter, setFilter] = useState<Filter>("All");
  const list = projects.filter((p) =>
    filter === "All" ? true : filter === "Other" ? p.platform === "Web" : p.platform === filter,
  );

  // Newly shown cards are not observed by the reveal observer, so reveal them directly.
  useEffect(() => {
    document.querySelectorAll("[data-workgrid] [data-reveal]").forEach((el) => el.classList.add("is-in"));
  }, [filter]);

  const count = (f: Filter) =>
    f === "All" ? projects.length : projects.filter((p) => (f === "Other" ? p.platform === "Web" : p.platform === f)).length;

  return (
    <div>
      <div className="sticky top-24 z-20 mb-14 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-full border px-5 py-2.5 text-sm transition-colors duration-300 ${
              filter === f ? "border-fg bg-fg text-bg" : "border-line bg-bg hover:border-fg"
            }`}
          >
            {f} <span className="ml-1 font-mono text-[10px] opacity-60">{count(f)}</span>
          </button>
        ))}
      </div>

      <div data-workgrid className="grid gap-x-10 gap-y-24 md:grid-cols-2">
        {list.map((p, i) => (
          <div key={p.slug} className={i % 2 === 1 ? "md:mt-32" : ""}>
            <ProjectCard p={p} index={projects.indexOf(p)} />
          </div>
        ))}
      </div>
    </div>
  );
}
