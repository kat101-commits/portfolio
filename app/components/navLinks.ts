// Plain data + a pure function, deliberately kept out of Nav.tsx: that file
// is "use client" (for usePathname), and a "use client" module's exports
// aren't safe to import as plain values into a server component — only the
// component itself crosses that boundary reliably. Nav.tsx and any
// server-rendered nav (e.g. app/preview/about's mobile bar) both import
// from here instead.

export type NavLink = {
  href: string;
  label: string;
  alwaysMuted?: boolean;
  external?: boolean;
};

export const LINKS: NavLink[] = [
  { href: "/", label: "Work" },
  { href: "/playground", label: "Playground" },
  { href: "/about", label: "About Me" },
  {
    href: "https://drive.google.com/file/d/1COw_L9ivcYvUVRYFrXvN7N5sBB4-KJBy/view?usp=sharing",
    label: "Resume",
    alwaysMuted: true,
    external: true,
  },
];

// The /preview routes are Figma-fidelity ports of real pages living at a
// different URL (e.g. /preview/about is the /about redesign), so a plain
// path match would never highlight anything there. Stripping the prefix
// first lets the same active-state logic serve both.
export function isActive(pathname: string, href: string) {
  const path = pathname.startsWith("/preview")
    ? pathname.slice("/preview".length) || "/"
    : pathname;
  if (href === "/") return path === "/";
  return path === href || path.startsWith(`${href}/`);
}
