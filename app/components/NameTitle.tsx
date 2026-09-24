"use client";

import { useState } from "react";

/* Figma node 988:3454 — two variants of the name.
   Default: just the type. Hover: the whole Figma selection chrome at
   once — a solid outline, a dashed rule down each side of the word gap,
   and the four corner handles. Everything is declared up front in a
   transparent colour so hovering only changes colour/opacity and the
   box never reflows. */

const CORNERS = [
  { left: "0%", top: "0%" },
  { left: "100%", top: "0%" },
  { left: "0%", top: "100%" },
  { left: "100%", top: "100%" },
];

export default function NameTitle() {
  const [hovering, setHovering] = useState(false);

  return (
    <span
      className="relative inline-block select-none"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <span
        className={`flex items-center whitespace-nowrap border border-solid font-serif font-normal leading-[1.3] text-black transition-colors duration-150 text-[clamp(48px,6.94vw,100px)] ${
          hovering ? "border-[#6675ff]" : "border-transparent"
        }`}
      >
        <span>Katherine</span>
        {/* The gap itself carries both dashed rules, inside its own width
            (border-box), so showing them shifts nothing. */}
        <span
          aria-hidden
          className={`h-full w-[0.48em] border-x border-dashed transition-colors duration-150 ${
            hovering ? "border-x-[#6675ff]" : "border-x-transparent"
          }`}
        />
        <span>Zhang</span>
      </span>

      {CORNERS.map(({ left, top }) => (
        <span
          key={`${left}-${top}`}
          aria-hidden
          className={`pointer-events-none absolute size-2 -translate-x-1/2 -translate-y-1/2 border border-solid border-[#6675ff] bg-white transition-opacity duration-150 ${
            hovering ? "opacity-100" : "opacity-0"
          }`}
          style={{ left, top }}
        />
      ))}
    </span>
  );
}
