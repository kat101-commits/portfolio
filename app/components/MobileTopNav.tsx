"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LINKS, isActive } from "./navLinks";

/* The one mobile nav row. Every page that has one renders this, so the
   row is identical and — given each caller places it the same distance
   from the top of its band — lands in the same spot across the site.

   Resume is dropped the way the mobile frames drop it; it stays
   reachable from the desktop nav and the footer.

   data-mobile-nav / data-nav-last are read from outside: the mobile band
   draws one of its two verticals on the last item's left edge and two
   horizontals on this row's own top and bottom, and it can't reach in
   here for refs. */
export default function MobileTopNav() {
  const pathname = usePathname();
  const items = LINKS.filter((link) => !link.alwaysMuted);

  return (
    <nav
      data-mobile-nav
      className="flex items-center justify-between py-2 md:hidden"
    >
      <Link href="/" className="text-body text-black">
        <span className="font-sans">[ </span>
        <span className="font-display">张舒皿</span>
        <span className="font-sans"> ]</span>
      </Link>

      <ul className="flex items-center gap-5 text-subtext">
        {items.map((link, i) => (
          <li
            key={link.href}
            data-nav-last={i === items.length - 1 ? "" : undefined}
          >
            <Link
              href={link.href}
              className={
                isActive(pathname, link.href)
                  ? "font-medium italic text-black"
                  : "text-gray-2"
              }
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
