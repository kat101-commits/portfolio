"use client";

import { useEffect, useRef, useState } from "react";

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

// Tuning constants.
const AXIS_CLAIM_PX = 6;
const FLING_DISTANCE_PX = 80;
const FLING_VELOCITY_PX_MS = 0.45;
const OFFSCREEN_TARGET_PX = 560;
const ROTATE_FACTOR = 0.06;
const SNAP_DURATION_MS = 420;
const SNAP_EASING = "cubic-bezier(0.22, 1.4, 0.5, 1)";
const FLING_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

export default function SwipeableMobileCollage() {
  // `order` is rendered back-to-front, so the LAST entry is the top card.
  const [order, setOrder] = useState(() => GROUPS.map((_, i) => i));

  // Per-key DOM refs so the gesture loop can mutate transforms imperatively
  // (no React re-renders per pointermove).
  const refsByKey = useRef<Record<string, HTMLDivElement | null>>({});
  const orderRef = useRef(order);
  useEffect(() => {
    orderRef.current = order;
  }, [order]);

  // Mutable drag state — refs only, never causes a render.
  const drag = useRef({
    active: false,
    pointerId: -1,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastT: 0,
    velocity: 0, // px/ms, smoothed
    dx: 0,
    axis: null as null | "x" | "y",
    flinging: false,
  });

  const getTopNode = () => {
    const ord = orderRef.current;
    if (ord.length === 0) return null;
    const topKey = GROUPS[ord[ord.length - 1]].key;
    return refsByKey.current[topKey] ?? null;
  };

  const setTransform = (node: HTMLElement, dx: number, transition: string) => {
    node.style.transition = transition;
    node.style.transform = `translate3d(${dx}px, 0, 0) rotate(${dx * ROTATE_FACTOR}deg)`;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (drag.current.flinging) return;
    const top = getTopNode();
    if (!top) return;
    const s = drag.current;
    s.active = true;
    s.pointerId = e.pointerId;
    s.startX = e.clientX;
    s.startY = e.clientY;
    s.lastX = e.clientX;
    s.lastT = e.timeStamp || performance.now();
    s.velocity = 0;
    s.dx = 0;
    s.axis = null;
    top.style.transition = "none";
    top.style.willChange = "transform";
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore — capture failures are non-fatal
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = drag.current;
    if (!s.active || e.pointerId !== s.pointerId) return;
    const dx = e.clientX - s.startX;
    const dy = e.clientY - s.startY;

    // Claim an axis on the first meaningful motion so vertical scroll can
    // win and we don't fight the browser.
    if (s.axis === null) {
      if (Math.abs(dx) > AXIS_CLAIM_PX && Math.abs(dx) > Math.abs(dy)) {
        s.axis = "x";
      } else if (Math.abs(dy) > AXIS_CLAIM_PX) {
        s.axis = "y";
        return;
      } else {
        return;
      }
    }
    if (s.axis !== "x") return;

    const now = e.timeStamp || performance.now();
    const dt = Math.max(1, now - s.lastT);
    const instantV = (e.clientX - s.lastX) / dt;
    // EMA smoothing — keeps velocity stable while still responsive.
    s.velocity = s.velocity * 0.7 + instantV * 0.3;
    s.lastX = e.clientX;
    s.lastT = now;
    s.dx = dx;

    const top = getTopNode();
    if (top) setTransform(top, dx, "none");
  };

  const finishDrag = () => {
    const s = drag.current;
    s.active = false;
    s.axis = null;
    s.pointerId = -1;
  };

  const cycleOrderAndReset = (flownNode: HTMLDivElement) => {
    // Hide the flown card visually BEFORE state update so there's no flash
    // of it on screen at its old (off-screen) transform.
    flownNode.style.transition = "none";
    flownNode.style.opacity = "0";
    setOrder((prev) => {
      if (prev.length === 0) return prev;
      const next = [...prev];
      const top = next.pop();
      if (top !== undefined) next.unshift(top);
      return next;
    });
    // After React commits the new order (this node is now at the back of
    // the z-stack and visually obscured by the new top), reset its
    // transform/opacity in the next frame. Two rAFs to be safe across
    // browsers that batch layout/paint.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        flownNode.style.transform = "translate3d(0, 0, 0)";
        flownNode.style.opacity = "1";
        flownNode.style.willChange = "auto";
        drag.current.flinging = false;
      });
    });
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = drag.current;
    if (!s.active) return;
    if (e.pointerId !== s.pointerId) {
      finishDrag();
      return;
    }
    const top = getTopNode();
    const dx = s.dx;
    const v = s.velocity;
    finishDrag();
    if (!top) return;

    // Decide: fling vs. snap back. Fling if dragged far OR thrown fast in
    // the same direction as the drag.
    const flungByDistance = Math.abs(dx) > FLING_DISTANCE_PX;
    const flungByVelocity =
      Math.abs(v) > FLING_VELOCITY_PX_MS &&
      (dx === 0 || Math.sign(v) === Math.sign(dx));

    if (s.axis !== "x" || !(flungByDistance || flungByVelocity)) {
      // Snap home with a small overshoot so it feels alive.
      setTransform(top, 0, `transform ${SNAP_DURATION_MS}ms ${SNAP_EASING}`);
      const onEnd = () => {
        top.style.willChange = "auto";
        top.removeEventListener("transitionend", onEnd);
      };
      top.addEventListener("transitionend", onEnd);
      return;
    }

    // Fling. Pick direction by velocity if it dominates, else by drag.
    const direction =
      Math.abs(v) > FLING_VELOCITY_PX_MS ? Math.sign(v) : Math.sign(dx) || 1;
    const target = direction * OFFSCREEN_TARGET_PX;
    const remaining = Math.abs(target - dx);
    // Higher velocity → shorter duration. Clamp so it always feels deliberate.
    const speed = Math.max(Math.abs(v), 0.6);
    const duration = Math.min(420, Math.max(200, remaining / speed));

    s.flinging = true;
    top.style.transition = `transform ${duration}ms ${FLING_EASING}`;
    top.style.transform = `translate3d(${target}px, 0, 0) rotate(${target * ROTATE_FACTOR}deg)`;

    let done = false;
    const finalize = () => {
      if (done) return;
      done = true;
      top.removeEventListener("transitionend", finalize);
      cycleOrderAndReset(top);
    };
    top.addEventListener("transitionend", finalize);
    // Belt-and-suspenders: if transitionend doesn't fire (e.g. element
    // hidden, browser quirk), fall through after the expected duration.
    window.setTimeout(finalize, duration + 60);
  };

  return (
    <div
      className="relative -mx-6 h-[340px] w-[393px] self-center touch-pan-y select-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {order.map((groupIdx) => {
        const { key, Render } = GROUPS[groupIdx];
        return (
          <div
            key={key}
            ref={(node) => {
              refsByKey.current[key] = node;
            }}
            className="absolute inset-0"
          >
            <Render />
          </div>
        );
      })}
    </div>
  );
}
