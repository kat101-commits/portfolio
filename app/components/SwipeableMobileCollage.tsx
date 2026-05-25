"use client";

import { useRef, useState } from "react";

import PolaroidPhoto from "./PolaroidPhoto";

// Polaroid + decorative-sticker positions inside the 393×340 container, lifted
// from Figma "Mobile Home" (707:7682). Each group renders polaroid + its
// stickers as one unit so a wrapper transform can move them together.
function Polaroid0() {
  return (
    <PolaroidPhoto
      src="/images/home/polaroid-0.png"
      alt=""
      width={180}
      height={228}
      rotation={16.43}
      className="absolute left-[138px] top-[26px]"
      imageStyle={{ width: "180%", height: "180%", left: "-3%", top: "-25%" }}
    />
  );
}

function Polaroid5() {
  return (
    <>
      <PolaroidPhoto
        src="/images/home/polaroid-5.png"
        alt=""
        width={188}
        height={239}
        rotation={15}
        className="absolute left-[152px] top-[45px]"
        imageStyle={{
          height: "115.94%",
          left: "-3.81%",
          top: "-10.41%",
          width: "110.19%",
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/home/sticker-near-5.png"
        alt=""
        className="absolute h-[38px] w-[64px]"
        style={{ left: 252, top: 270 }}
      />
    </>
  );
}

function Polaroid4() {
  return (
    <>
      <PolaroidPhoto
        src="/images/home/polaroid-4.png"
        alt=""
        width={173}
        height={219}
        rotation={-11.41}
        className="absolute left-[87px] top-[77px]"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/home/paperclip.png"
        alt=""
        className="absolute h-[63px] w-[101px] rotate-[-13.62deg]"
        style={{ left: 108, top: 24 }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/home/sticker-13.png"
        alt=""
        className="absolute h-[80px] w-[81px] rounded-[3px]"
        style={{ left: 212, top: 201 }}
      />
    </>
  );
}

function Polaroid1() {
  return (
    <>
      <PolaroidPhoto
        src="/images/home/polaroid-1.png"
        alt=""
        width={185}
        height={235}
        rotation={-10.63}
        className="absolute left-[74px] top-[89px]"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/home/sale-sticker.png"
        alt=""
        className="absolute h-[50px] w-[68px]"
        style={{ left: 82, top: 265 }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/home/sticker-17.png"
        alt=""
        className="absolute h-[74px] w-[74px] rotate-[-16.55deg]"
        style={{ left: 110, top: 36 }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/home/sticker-12.png"
        alt=""
        className="absolute h-[62px] w-[56px]"
        style={{ left: 227, top: 45 }}
      />
    </>
  );
}

function Polaroid3() {
  return (
    <>
      <PolaroidPhoto
        src="/images/home/polaroid-3.png"
        alt=""
        width={187}
        height={237}
        rotation={3.72}
        className="absolute left-[113px] top-[81px]"
        imageStyle={{
          height: "164.4%",
          left: "-32.05%",
          top: "-27.72%",
          width: "156.24%",
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/home/sticker-16.png"
        alt=""
        className="absolute h-[58px] w-[65px] rotate-[30deg]"
        style={{ left: 248, top: 278 }}
      />
    </>
  );
}

const GROUPS: { key: string; Render: () => React.ReactNode }[] = [
  { key: "p0", Render: Polaroid0 },
  { key: "p5", Render: Polaroid5 },
  { key: "p4", Render: Polaroid4 },
  { key: "p1", Render: Polaroid1 },
  { key: "p3", Render: Polaroid3 },
];

const SWIPE_THRESHOLD = 60;
const OFFSCREEN_DISTANCE = 480;

export default function SwipeableMobileCollage() {
  // `order` is rendered back-to-front, so the LAST entry is the top card.
  const [order, setOrder] = useState(() => GROUPS.map((_, i) => i));
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [flyingOff, setFlyingOff] = useState(false);
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);
  const claimedAxis = useRef<"x" | "y" | null>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (flyingOff) return;
    startX.current = e.clientX;
    startY.current = e.clientY;
    claimedAxis.current = null;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (startX.current === null || startY.current === null) return;
    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;
    if (claimedAxis.current === null) {
      if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
        claimedAxis.current = "x";
        setIsDragging(true);
      } else if (Math.abs(dy) > 8) {
        claimedAxis.current = "y";
        return;
      } else {
        return;
      }
    }
    if (claimedAxis.current !== "x") return;
    setDragX(dx);
  };

  const finishDrag = () => {
    startX.current = null;
    startY.current = null;
    claimedAxis.current = null;
    setIsDragging(false);
  };

  const handlePointerUp = () => {
    if (startX.current === null) return;
    const dx = dragX;
    if (Math.abs(dx) > SWIPE_THRESHOLD) {
      // Fling the top card off-screen, then cycle it to the back of the stack.
      setFlyingOff(true);
      setDragX(dx > 0 ? OFFSCREEN_DISTANCE : -OFFSCREEN_DISTANCE);
      finishDrag();
      window.setTimeout(() => {
        setOrder((prev) => {
          const next = [...prev];
          const top = next.pop();
          if (top !== undefined) next.unshift(top);
          return next;
        });
        setDragX(0);
        setFlyingOff(false);
      }, 220);
    } else {
      setDragX(0);
      finishDrag();
    }
  };

  return (
    <div
      className="relative -mx-6 h-[340px] w-[393px] self-center touch-pan-y select-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {order.map((groupIdx, i) => {
        const isTop = i === order.length - 1;
        const transform = isTop
          ? `translate3d(${dragX}px, 0, 0) rotate(${dragX * 0.05}deg)`
          : "none";
        const transition = isTop && !isDragging ? "transform 220ms ease-out" : "none";
        const { key, Render } = GROUPS[groupIdx];
        return (
          <div
            key={key}
            className="absolute inset-0"
            style={{
              transform,
              transition,
              willChange: isTop ? "transform" : undefined,
            }}
          >
            <Render />
          </div>
        );
      })}
    </div>
  );
}
