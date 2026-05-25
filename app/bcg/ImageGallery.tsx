"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const IMAGES = [
  {
    src: "/images/bcg/badge.png",
    alt: "BCG work badge",
    width: 436,
    mobileWidth: 218,
    aspectRatio: "200/232",
    caption: "My work badge",
  },
  {
    src: "/images/bcg/team-1.png",
    alt: "BCG team",
    width: 676,
    mobileWidth: 338,
    aspectRatio: "2274/1706",
    caption: "Meet the team - TV tinted out for privacy reasons",
  },
  {
    src: "/images/bcg/team-2.png",
    alt: "Team dinner at Coquette",
    width: 674,
    mobileWidth: 337,
    aspectRatio: "1239/929",
    caption: "Team Dinner at Coquette!",
  },
];

export default function ImageGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      setCanScrollLeft(el.scrollLeft > 4);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction === "left" ? -el.clientWidth : el.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-[501px] shrink-0 max-md:w-[250px]">
      <div
        ref={scrollRef}
        className="overflow-x-auto scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex items-start gap-6 max-md:gap-3">
          {IMAGES.map((img) => (
            <figure
              key={img.src}
              className="flex shrink-0 snap-start flex-col gap-4 max-md:gap-2 max-md:!w-[var(--gallery-mobile-w)]"
              style={
                {
                  width: img.width,
                  "--gallery-mobile-w": `${img.mobileWidth}px`,
                } as React.CSSProperties
              }
            >
              <div
                className="relative w-full overflow-hidden rounded-[8px]"
                style={{ aspectRatio: img.aspectRatio }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes={`${img.width}px`}
                  className="object-cover"
                />
              </div>
              <figcaption className="text-subtext">{img.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <Arrow
        direction="left"
        disabled={!canScrollLeft}
        onClick={() => scroll("left")}
      />
      <Arrow
        direction="right"
        disabled={!canScrollRight}
        onClick={() => scroll("right")}
      />
    </div>
  );
}

function Arrow({
  direction,
  disabled,
  onClick,
}: {
  direction: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}) {
  const position = direction === "left" ? "left-3" : "right-3";
  const label = direction === "left" ? "Previous image" : "Next image";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`absolute ${position} top-[253px] z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black shadow-[0_2px_8px_rgba(0,0,0,0.15)] backdrop-blur-sm transition-all duration-200 hover:bg-white hover:scale-105 disabled:pointer-events-none disabled:opacity-0 max-md:top-[127px]`}
    >
      <svg
        viewBox="0 0 24 24"
        className="size-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {direction === "left" ? (
          <path d="M15 18l-6-6 6-6" />
        ) : (
          <path d="M9 18l6-6-6-6" />
        )}
      </svg>
    </button>
  );
}
