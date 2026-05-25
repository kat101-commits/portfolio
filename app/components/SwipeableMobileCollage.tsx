"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import PolaroidPhoto from "./PolaroidPhoto";

// Polaroid + sticker positions inside the 393×340 container, lifted from
// Figma "Mobile Home" (707:7682). Each group renders polaroid + its stickers
// as one unit so a wrapper transform can move them together.
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
        draggable={false}
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
        draggable={false}
        className="absolute h-[63px] w-[101px] rotate-[-13.62deg]"
        style={{ left: 108, top: 24 }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/home/sticker-13.png"
        alt=""
        draggable={false}
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
        draggable={false}
        className="absolute h-[50px] w-[68px]"
        style={{ left: 82, top: 265 }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/home/sticker-17.png"
        alt=""
        draggable={false}
        className="absolute h-[74px] w-[74px] rotate-[-16.55deg]"
        style={{ left: 110, top: 36 }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/home/sticker-12.png"
        alt=""
        draggable={false}
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
        draggable={false}
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

const AXIS_CLAIM_PX = 5;
const FLING_DISTANCE_PX = 70;
const FLING_VELOCITY_PX_MS = 0.35;
const OFFSCREEN_PX = 560;
const ROTATE_FACTOR = 0.06;
const SNAP_EASE = "cubic-bezier(0.22, 1.4, 0.5, 1)";
const FLING_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export default function SwipeableMobileCollage() {
  const [order, setOrder] = useState(() => GROUPS.map((_, i) => i));
  const containerRef = useRef<HTMLDivElement>(null);
  // Index = group index (stable). Value = the wrapper DOM node for that group.
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const orderRef = useRef(order);
  useEffect(() => {
    orderRef.current = order;
  }, [order]);

  // Stable ref callbacks per group so React doesn't detach/reattach on each
  // render (which would otherwise leave the ref momentarily null during a
  // re-render and break gestures that race with state updates).
  const refSetters = useMemo(
    () =>
      GROUPS.map((_, i) => (node: HTMLDivElement | null) => {
        cardsRef.current[i] = node;
      }),
    [],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const drag = {
      active: false,
      startX: 0,
      startY: 0,
      lastX: 0,
      lastT: 0,
      velocity: 0,
      dx: 0,
      axis: null as null | "x" | "y",
      flinging: false,
      // Suppress emulated mouse events for a short window after a touch ends.
      lastTouchEndAt: 0,
    };

    const getTopCard = (): HTMLDivElement | null => {
      const ord = orderRef.current;
      if (ord.length === 0) return null;
      return cardsRef.current[ord[ord.length - 1]] ?? null;
    };

    const beginDrag = (clientX: number, clientY: number, ts: number) => {
      if (drag.active || drag.flinging) return false;
      const top = getTopCard();
      if (!top) return false;
      drag.active = true;
      drag.startX = clientX;
      drag.startY = clientY;
      drag.lastX = clientX;
      drag.lastT = ts;
      drag.velocity = 0;
      drag.dx = 0;
      drag.axis = null;
      top.style.transition = "none";
      top.style.willChange = "transform";
      return true;
    };

    /** Returns true once the gesture has been claimed for horizontal swipe. */
    const updateDrag = (clientX: number, clientY: number, ts: number) => {
      if (!drag.active) return false;
      const dx = clientX - drag.startX;
      const dy = clientY - drag.startY;
      if (drag.axis === null) {
        if (Math.abs(dx) > AXIS_CLAIM_PX && Math.abs(dx) > Math.abs(dy)) {
          drag.axis = "x";
        } else if (Math.abs(dy) > AXIS_CLAIM_PX) {
          drag.axis = "y";
          return false;
        } else {
          return false;
        }
      }
      if (drag.axis !== "x") return false;
      const dt = Math.max(1, ts - drag.lastT);
      const instantV = (clientX - drag.lastX) / dt;
      drag.velocity = drag.velocity * 0.7 + instantV * 0.3;
      drag.lastX = clientX;
      drag.lastT = ts;
      drag.dx = dx;
      const top = getTopCard();
      if (top) {
        top.style.transform = `translate3d(${dx}px, 0, 0) rotate(${dx * ROTATE_FACTOR}deg)`;
      }
      return true;
    };

    const endDrag = () => {
      if (!drag.active) return;
      const claimedX = drag.axis === "x";
      const dx = drag.dx;
      const v = drag.velocity;
      drag.active = false;
      drag.axis = null;
      const top = getTopCard();
      if (!top) return;

      const flungByDistance = Math.abs(dx) > FLING_DISTANCE_PX;
      const flungByVelocity =
        Math.abs(v) > FLING_VELOCITY_PX_MS &&
        (dx === 0 || Math.sign(v) === Math.sign(dx));

      if (!claimedX || !(flungByDistance || flungByVelocity)) {
        // Snap back home with a little overshoot.
        top.style.transition = `transform 420ms ${SNAP_EASE}`;
        top.style.transform = "translate3d(0, 0, 0) rotate(0deg)";
        const cleanup = () => {
          top.style.willChange = "auto";
          top.removeEventListener("transitionend", cleanup);
        };
        top.addEventListener("transitionend", cleanup);
        return;
      }

      const direction =
        Math.abs(v) > FLING_VELOCITY_PX_MS
          ? Math.sign(v)
          : Math.sign(dx) || 1;
      const target = direction * OFFSCREEN_PX;
      const remaining = Math.abs(target - dx);
      const speed = Math.max(Math.abs(v), 0.6);
      const duration = Math.min(420, Math.max(200, remaining / speed));

      drag.flinging = true;
      top.style.transition = `transform ${duration}ms ${FLING_EASE}`;
      top.style.transform = `translate3d(${target}px, 0, 0) rotate(${target * ROTATE_FACTOR}deg)`;

      let done = false;
      const finalize = () => {
        if (done) return;
        done = true;
        top.removeEventListener("transitionend", finalize);
        // Hide before reordering so we never flash the off-screen position.
        top.style.transition = "none";
        top.style.opacity = "0";
        setOrder((prev) => {
          if (prev.length === 0) return prev;
          const next = [...prev];
          const head = next.pop();
          if (head !== undefined) next.unshift(head);
          return next;
        });
        // Two rAFs: one for React commit, one for paint after reorder.
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            top.style.transform = "translate3d(0, 0, 0) rotate(0deg)";
            top.style.opacity = "1";
            top.style.willChange = "auto";
            drag.flinging = false;
          });
        });
      };
      top.addEventListener("transitionend", finalize);
      window.setTimeout(finalize, duration + 100);
    };

    // ---- Touch handlers ----
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      beginDrag(t.clientX, t.clientY, e.timeStamp);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      const claimed = updateDrag(t.clientX, t.clientY, e.timeStamp);
      if (claimed && e.cancelable) {
        // Once we've claimed the horizontal axis, prevent the browser from
        // treating this as a scroll or edge-back-swipe.
        e.preventDefault();
      }
    };

    const onTouchEnd = () => {
      drag.lastTouchEndAt = Date.now();
      endDrag();
    };

    // ---- Mouse handlers (desktop/dev tools) ----
    const onMouseDown = (e: MouseEvent) => {
      // Suppress mouse events emulated after a touch.
      if (Date.now() - drag.lastTouchEndAt < 500) return;
      beginDrag(e.clientX, e.clientY, e.timeStamp);
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!drag.active) return;
      updateDrag(e.clientX, e.clientY, e.timeStamp);
    };
    const onMouseUp = () => {
      endDrag();
    };

    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    container.addEventListener("touchend", onTouchEnd);
    container.addEventListener("touchcancel", onTouchEnd);
    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
      container.removeEventListener("touchcancel", onTouchEnd);
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative -mx-6 h-[340px] w-[393px] cursor-grab select-none self-center active:cursor-grabbing"
      style={{
        touchAction: "pan-y",
        WebkitUserSelect: "none",
        WebkitTouchCallout: "none",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {order.map((groupIdx) => {
        const { key, Render } = GROUPS[groupIdx];
        return (
          <div
            key={key}
            ref={refSetters[groupIdx]}
            className="absolute inset-0"
            style={{ touchAction: "pan-y" }}
          >
            <Render />
          </div>
        );
      })}
    </div>
  );
}
