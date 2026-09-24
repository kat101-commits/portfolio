"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

import { LINKS, isActive } from "./navLinks";

export default function Nav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);

  // Publishes each real nav item's left/right edge as a CSS custom property
  // on the document root — in pixels from the shared <header>/Hero frame's
  // own left edge, so any element elsewhere on the page (the Hero band's
  // vertical hairlines) can align to var(--gx-nav-N-start/end) in plain
  // CSS, with no direct coupling to this component. Measured rather than
  // hardcoded because the real labels ("Playground") aren't Figma's
  // ("Sandbox") — a line has to sit at whatever this nav actually renders,
  // not at a width borrowed from different text.
  useLayoutEffect(() => {
    const frame = navRef.current?.closest("header");
    if (!frame) return;

    function measure() {
      if (!frame) return;
      const frameBox = frame.getBoundingClientRect();
      const root = document.documentElement.style;

      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        root.setProperty(`--gx-nav-${i}-start`, `${r.left - frameBox.left}px`);
        root.setProperty(`--gx-nav-${i}-end`, `${r.right - frameBox.left}px`);
      });

      // The nav row's own top and bottom, for the two horizontal rules
      // that hug it. Measured off the row itself rather than the
      // header's padding box, so they sit on the type, not on the
      // padding — which is what the design shows.
      const row = navRef.current;
      if (row) {
        const rowBox = row.getBoundingClientRect();
        root.setProperty("--gy-nav-top", `${rowBox.top - frameBox.top}px`);
        root.setProperty("--gy-nav-bottom", `${rowBox.bottom - frameBox.top}px`);
      }
    }

    measure();
    // ResizeObserver rather than window's own resize event: it also fires
    // on layout shifts a plain viewport resize wouldn't cause — e.g. the
    // custom webfont swapping in after the fallback font already laid the
    // nav out, which changes exactly the widths these lines depend on.
    const ro = new ResizeObserver(measure);
    ro.observe(frame);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, []);

  return (
    <nav
      ref={navRef}
      /* py-1 gives the two rules that hug this row a few px of
         clearance, so the lower one reads as sitting below the nav
         rather than resting on the descenders. The frame itself is
         tighter than this (33/53 against text at 33-52). */
      className="flex items-center justify-between py-1"
    >
      <Link href="/" className="text-body text-black">
        <span className="font-sans">[ </span>
        <span className="font-display">张舒皿</span>
        <span className="font-sans"> ]</span>
      </Link>

      <ul className="flex items-center gap-10 text-subtext">
        {LINKS.map((link, i) => {
          const active = !link.alwaysMuted && isActive(pathname, link.href);
          const className = active
            ? "text-black font-medium italic"
            : "text-gray-2";
          return (
            <li key={link.href} ref={(el) => { itemRefs.current[i] = el; }}>
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
