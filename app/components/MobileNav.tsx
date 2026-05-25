"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = {
  emoji: string;
  label: string;
  href: string;
  external?: boolean;
};

const ITEMS: Item[] = [
  { emoji: "🏠", label: "Home", href: "/" },
  { emoji: "🧚", label: "Playground", href: "/playground" },
  { emoji: "👩🏻", label: "About Me", href: "/about" },
  {
    emoji: "📄",
    label: "Resume",
    href: "https://drive.google.com/file/d/1umyV8uuN4-GCTKPkwx2jZ9MWmeC2iZ8s/view?usp=sharing",
    external: true,
  },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-[60px] left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#f3f3f3]/95 px-2 py-1 backdrop-blur-sm shadow-[0_4px_12px_rgba(0,0,0,0.08)] md:hidden">
      {ITEMS.map((item) => {
        const active = !item.external && isActive(pathname, item.href);
        const pillClass = `flex items-center gap-3 rounded-full px-3 py-2 transition-all ${
          active ? "bg-white" : "opacity-70"
        }`;
        const content = (
          <>
            <span className="text-[20px] leading-none">{item.emoji}</span>
            {active ? (
              <span className="font-sans font-medium text-[16px] leading-none whitespace-nowrap">
                {item.label}
              </span>
            ) : null}
          </>
        );

        if (item.external) {
          return (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={pillClass}
              aria-label={item.label}
            >
              {content}
            </a>
          );
        }
        return (
          <Link
            key={item.href}
            href={item.href}
            className={pillClass}
            aria-label={item.label}
          >
            {content}
          </Link>
        );
      })}
    </nav>
  );
}
