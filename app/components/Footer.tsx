"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CONTACT_LINKS = [
  { href: "https://www.linkedin.com/", label: "LinkedIn" },
  { href: "mailto:zhangskath@gmail.com", label: "zhangskath@gmail.com" },
];

export default function Footer() {
  // The /preview routes render their own Figma-matched footer, so skip the
  // site-wide one there.
  const pathname = usePathname();
  if (pathname === "/preview" || pathname.startsWith("/preview/")) return null;

  return (
    <footer
      className="w-full border-t border-solid border-[#d5ddff]"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 90% 100% at 50% 0%, rgba(255,250,227,0.1), rgba(231,247,255,0.6))",
      }}
    >
      <div className="mx-auto flex w-full max-w-frame flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-page">
        <div className="flex items-center gap-2">
          <p className="font-sans text-body text-black">Katherine Zhang</p>
          <Image
            src="/images/preview/dash-separator.svg"
            alt=""
            width={121}
            height={8}
            style={{ height: "auto" }}
          />
          <p className="font-sans text-body text-black">2026</p>
        </div>

        <div className="flex items-center justify-end gap-6 font-sans text-subtext text-black">
          {CONTACT_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
