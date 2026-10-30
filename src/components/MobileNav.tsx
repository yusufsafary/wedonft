import type { ReactNode } from "react";
import { useActiveSection } from "@/hooks";

const ITEMS: { id: string; label: string; href?: string; icon: ReactNode }[] = [
  {
    id: "top",
    label: "Home",
    icon: (
      <path d="M4 11.2 12 4l8 7.2V20a1 1 0 0 1-1 1h-5v-6.2h-4V21H5a1 1 0 0 1-1-1z" fill="currentColor" />
    ),
  },
  {
    id: "mint",
    label: "Mint",
    icon: (
      <g fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12Z" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="3.1" fill="currentColor" stroke="none" />
      </g>
    ),
  },
  {
    id: "market",
    label: "Market",
    href: "/market/",
    icon: (
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
        <path d="M4 7.5 6.2 3.8h11.6L20 7.5 18.9 9a2.6 2.6 0 0 1-4.9-.6A2.6 2.6 0 0 1 9.1 8.4 2.6 2.6 0 0 1 4.2 9z" />
        <path d="M5.5 11v9h13v-9" />
        <path d="M9.8 20v-5h4.4v5" />
      </g>
    ),
  },
  {
    id: "guide",
    label: "Guide",
    href: "/guide/",
    icon: (
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
        <path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.7A1.7 1.7 0 0 0 5 19.7z" />
        <path d="M5 17.5A1.5 1.5 0 0 1 6.5 16H19v4H6.5A1.5 1.5 0 0 1 5 18.5z" />
      </g>
    ),
  },
];

/** Navigasi bawah khusus mobile — jempol-ramah, indikator section aktif. */
export default function MobileNav() {
  const active = useActiveSection(ITEMS.map((i) => i.id));
  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 lg:hidden border-t border-steel/60 bg-ink/95 backdrop-blur-md"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Mobile"
    >
      <div className="grid grid-cols-4">
        {ITEMS.map((it) => (
          <a
            key={it.id}
            href={it.href ?? `#${it.id}`}
            className={`flex flex-col items-center gap-1 py-2.5 transition-colors ${active === it.id ? "text-volt" : "text-ash active:text-paper"}`}
          >
            <svg viewBox="0 0 24 24" className="size-[21px]" aria-hidden="true">{it.icon}</svg>
            <span className="label text-[9px] leading-none">{it.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
