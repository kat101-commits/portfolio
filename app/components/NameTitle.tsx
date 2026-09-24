"use client";

import { useEffect, useState } from "react";

export default function NameTitle() {
  const [hovering, setHovering] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (!dragging) return;
    const stop = () => setDragging(false);
    window.addEventListener("mouseup", stop);
    return () => window.removeEventListener("mouseup", stop);
  }, [dragging]);

  const showDivider = hovering && !dragging;

  return (
    <div
      className="relative inline-block select-none"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onMouseDown={() => setDragging(true)}
    >
      <div
        className={`flex items-center whitespace-nowrap border border-solid font-serif font-normal text-[100px] leading-none text-black ${
          showDivider || dragging ? "border-[#6675ff]" : "border-transparent"
        } ${dragging ? "p-1" : ""}`}
      >
        <span
          className={`border-r border-dashed pr-6 ${
            showDivider ? "border-[#6675ff]" : "border-transparent"
          }`}
        >
          Katherine
        </span>
        <span className="pl-6">Zhang</span>
      </div>

      {dragging ? <CornerHandles /> : null}
    </div>
  );
}

const CORNERS = [
  { left: "0%", top: "0%" },
  { left: "100%", top: "0%" },
  { left: "0%", top: "100%" },
  { left: "100%", top: "100%" },
];

function CornerHandles() {
  return (
    <>
      {CORNERS.map(({ left, top }) => (
        <span
          key={`${left}-${top}`}
          className="absolute size-2 -translate-x-1/2 -translate-y-1/2 border border-solid border-[#6675ff] bg-white"
          style={{ left, top }}
        />
      ))}
    </>
  );
}
