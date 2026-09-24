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
      const frameLeft = frame.getBoundingClientRect().left;
      const root = document.documentElement.style;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        root.setProperty(`--gx-nav-${i}-start`, `${r.left - frameLeft}px`);
        root.setProperty(`--gx-nav-${i}-end`, `${r.right - frameLeft}px`);
      });
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
    <nav ref={navRef} className="flex items-center justify-between">
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
