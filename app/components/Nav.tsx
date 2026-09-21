"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = {
  href: string;
  label: string;
  alwaysMuted?: boolean;
  external?: boolean;
};

const LINKS: NavLink[] = [
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

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between">
      <Link href="/" className="text-body text-black">
        <span className="font-sans">[ </span>
        <span className="font-display">张舒皿</span>
        <span className="font-sans"> ]</span>
      </Link>

      <ul className="flex items-center gap-10 text-subtext">
        {LINKS.map((link) => {
          const active = !link.alwaysMuted && isActive(pathname, link.href);
          const className = active ? "text-black font-medium" : "text-gray-2";
          return (
            <li key={link.href}>
              {link.external ? (
                <a
                  href={link.href}
                  className={className}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ) : (
                <Link href={link.href} className={className}>
                  {link.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
