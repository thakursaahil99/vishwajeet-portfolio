"use client";

import { usePathname } from "next/navigation";
import { getProject, nav } from "@/lib/data";

function labelFor(path: string) {
  if (path.startsWith("/work/")) return getProject(path.split("/")[2])?.name ?? "Work";
  return nav.find((n) => n.href === path)?.label ?? "Vishwajeet";
}

/** Re-mounts on every navigation: a curtain carrying the page name lifts away on a line. */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      <div className="route-curtain" aria-hidden>
        <span className="route-label font-display italic">{labelFor(pathname)}</span>
      </div>
      <div className="page-enter">{children}</div>
    </>
  );
}
