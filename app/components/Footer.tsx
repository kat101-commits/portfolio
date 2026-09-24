"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Work" },
  { href: "/playground", label: "Playground" },
  { href: "/about", label: "About Me" },
  {
    href: "https://drive.google.com/file/d/1COw_L9ivcYvUVRYFrXvN7N5sBB4-KJBy/view?usp=sharing",
    label: "Resume",
    external: true,
  },
];

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
    <footer className="w-full border-t border-dashed border-black md:-mt-6">
      <div className="flex flex-col gap-4 px-6 pb-10 pt-6 text-body md:mx-auto md:max-w-frame md:flex-row md:items-start md:justify-between md:gap-10 md:px-page md:pt-8 md:pb-15">
        <div className="flex flex-col gap-2 text-black md:w-[273px]">
          <p>Made with ✨ by Katherine Zhang</p>
          <p>2026</p>
        </div>

        {/* Mobile: just "Let's Chat", right-aligned — Navigation already
            lives in the mobile bottom nav, so it's omitted here. */}
        <div className="flex flex-col items-end gap-4 text-black md:hidden">
          <p>Let’s Chat</p>
          <div className="flex flex-col items-end gap-2 text-subtext">
            {CONTACT_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop: Navigation + Let's Chat side by side. */}
        <div className="hidden gap-10 md:flex md:items-start">
          <FooterColumn heading="Navigation">
            {NAV_LINKS.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-subtext text-gray-2 hover:text-black"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-subtext text-gray-2 hover:text-black"
                >
                  {link.label}
                </Link>
              ),
            )}
          </FooterColumn>

          <FooterColumn heading="Let’s Chat">
            {CONTACT_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-subtext text-black"
              >
                {link.label}
              </Link>
            ))}
          </FooterColumn>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 items-start">
      <p className="text-body text-black">{heading}</p>
      <div className="flex flex-col gap-2 items-start">{children}</div>
    </div>
  );
}
