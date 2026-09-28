"use client";

import { useEffect, useRef, useState } from "react";

// Tile is rendered at SCALE inside a transform: scale(0.9) wrapper so the whole
// canvas reads ~10% smaller (zoom out). TILE_WIDTH/HEIGHT are the *visible*
// (scaled) dimensions used by the wrap math; NATURAL_TILE_* are the layout
// dimensions of the unscaled tile content.
const SCALE = 0.9;
const NATURAL_TILE_WIDTH = 1440;
const NATURAL_TILE_HEIGHT = 2253;
const TILE_WIDTH = NATURAL_TILE_WIDTH * SCALE;
const TILE_HEIGHT = NATURAL_TILE_HEIGHT * SCALE;

type Img = {
  src: string;
  x: number;
  y: number;
  w: number;
  h: number;
  rotation?: number;
};

type Element = {
  number: string;
  numberX: number;
  numberY: number;
  caption: string;
  captionX: number;
  captionY: number;
  images: Img[];
};

// All 11 elements at their Figma "Playground - Final" coords. Element 6's
// caption y is overridden (Figma reports 1346 which renders inside the image
// because the underlying rect is rotated 90°; 1540 puts it below the painting).
const ELEMENTS: Element[] = [
  // Element 1 — additional shift up 50 and left 100 (anchor for cumulative compression)
  {
    number: "( 1 )",
    numberX: -30,
    numberY: 116,
    caption: "Generate Merch",
    captionX: 1,
    captionY: 320,
    images: [
      { src: "/images/playground/el-1a.png", x: -6, y: 91, w: 167, h: 240 },
      { src: "/images/playground/el-1b.png", x: 172, y: 94, w: 218, h: 226 },
    ],
  },
  // Each subsequent element shifts an additional 10px UP relative to the prior
  // ones (cumulative −10 per Y-order position), so adjacent pairs in reading
  // order sit 10px closer than before.
  // Each subsequent element below the prior Y-rank shifts another -10.
  // Element 2 — Y -10
  {
    number: "( 2 )",
    numberX: 823,
    numberY: 298,
    caption: "Oil Painting",
    captionX: 867,
    captionY: 500,
    images: [{ src: "/images/playground/el-2.png", x: 867, y: 304, w: 166, h: 188 }],
  },
  // Element 3 — Y -20
  {
    number: "( 3 )",
    numberX: 350,
    numberY: 486,
    caption: "Painting",
    captionX: 350,
    captionY: 686,
    images: [{ src: "/images/playground/el-3.png", x: 350, y: 516, w: 305, h: 159 }],
  },
  // Element 5 — Y -30
  {
    number: "( 5 )",
    numberX: 1127,
    numberY: 606,
    caption: "Branding - Exploration",
    captionX: 1127,
    captionY: 852,
    images: [
      { src: "/images/playground/el-5a.png", x: 1127, y: 637, w: 167, h: 208 },
      { src: "/images/playground/el-5b.png", x: 1301, y: 637, w: 167, h: 208 },
    ],
  },
  // Element 4 — Y -40
  {
    number: "( 4 )",
    numberX: 171,
    numberY: 797,
    caption: "Branding Exploration",
    captionX: 214,
    captionY: 990,
    images: [{ src: "/images/playground/el-4.png", x: 214, y: 802, w: 316, h: 170 }],
  },
  // Element 6 — was up 100 (step 1), then Y -50 (cumulative)
  {
    number: "( 6 )",
    numberX: 712,
    numberY: 1060,
    caption: "Acrylic Painting",
    captionX: 712,
    captionY: 1295,
    images: [{ src: "/images/playground/el-6.png", x: 712, y: 1090, w: 375, h: 187 }],
  },
  // Element 7 — Y -60
  {
    number: "( 7 )",
    numberX: 2,
    numberY: 1239,
    caption: "Dating App",
    captionX: 53,
    captionY: 1458,
    images: [{ src: "/images/playground/el-7.png", x: 44, y: 1244, w: 164, h: 191 }],
  },
  // Element 8 — Y -70
  {
    number: "( 8 )",
    numberX: 509,
    numberY: 1409,
    caption: "Hoodie Exploration",
    captionX: 509,
    captionY: 1689,
    images: [{ src: "/images/playground/el-8.png", x: 509, y: 1436, w: 450, h: 229 }],
  },
  // Element 9 — Y -80
  {
    number: "( 9 )",
    numberX: 1198,
    numberY: 1643,
    caption: "A Campus Club based Social Media App",
    captionX: 1198,
    captionY: 1898,
    images: [{ src: "/images/playground/el-9.png", x: 1198, y: 1651, w: 253, h: 247 }],
  },
  // Element 10 — Y -90
  {
    number: "( 10 )",
    numberX: 181,
    numberY: 1690,
    caption: "Oil Painting",
    captionX: 181,
    captionY: 1969,
    images: [{ src: "/images/playground/el-10.png", x: 181, y: 1725, w: 155, h: 235 }],
  },
  // Element 11 — Y -100
  {
    number: "( 11 )",
    numberX: 628,
    numberY: 2002,
    caption: "Chinese New Year Illustration",
    captionX: 683,
    captionY: 2212,
    images: [{ src: "/images/playground/el-11.png", x: 683, y: 2008, w: 190, h: 190 }],
  },
];

const LERP = 0.12; // how aggressively current chases target — lower = more lag
const FRICTION = 0.93; // velocity decay per frame after release
const VELOCITY_STOP = 0.05;

export default function Playground() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Inputs land in `target`; render position smoothly lerps toward it.
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  // After a drag-release we keep applying this velocity (with friction) so the
  // canvas glides past where the cursor stopped — drag inertia.
  const velocityRef = useRef({ x: 0, y: 0 });

  const dragRef = useRef({
    active: false,
    lastX: 0,
    lastY: 0,
    lastTime: 0,
  });

  const [render, setRender] = useState({ x: 0, y: 0 });
  const [viewport, setViewport] = useState({ w: 1440, h: 900 });

  // Resize awareness — how many tiles to render to cover the viewport.
  useEffect(() => {
    const update = () =>
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // The animation loop: lerps current toward target every frame, then applies
  // residual velocity (with friction) so a fling keeps sliding briefly.
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      // Apply inertia if no active drag.
      if (!dragRef.current.active) {
        const vx = velocityRef.current.x;
        const vy = velocityRef.current.y;
        if (Math.abs(vx) > VELOCITY_STOP || Math.abs(vy) > VELOCITY_STOP) {
          targetRef.current.x += vx;
          targetRef.current.y += vy;
          velocityRef.current.x = vx * FRICTION;
          velocityRef.current.y = vy * FRICTION;
        } else {
          velocityRef.current.x = 0;
          velocityRef.current.y = 0;
        }
      }

      const cx = currentRef.current.x;
      const cy = currentRef.current.y;
      const tx = targetRef.current.x;
      const ty = targetRef.current.y;
      const nx = cx + (tx - cx) * LERP;
      const ny = cy + (ty - cy) * LERP;
      if (Math.abs(nx - cx) > 0.05 || Math.abs(ny - cy) > 0.05) {
        currentRef.current = { x: nx, y: ny };
        setRender({ x: nx, y: ny });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Wheel — adds to target (lerp will smooth the catch-up).
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      velocityRef.current.x = 0;
      velocityRef.current.y = 0;
      const dx = e.shiftKey && e.deltaX === 0 ? e.deltaY : e.deltaX;
      const dy = e.shiftKey && e.deltaX === 0 ? 0 : e.deltaY;
      targetRef.current.x += dx;
      targetRef.current.y += dy;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Drag — directly moves target during the drag, tracks velocity to fling after.
  const onPointerDown = (e: React.PointerEvent) => {
    velocityRef.current.x = 0;
    velocityRef.current.y = 0;
    dragRef.current = {
      active: true,
      lastX: e.clientX,
      lastY: e.clientY,
      lastTime: performance.now(),
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.active) return;
    const now = performance.now();
    const dx = e.clientX - dragRef.current.lastX;
    const dy = e.clientY - dragRef.current.lastY;
    const dt = Math.max(now - dragRef.current.lastTime, 1);
    // Each pixel of cursor movement moves the canvas one pixel in the opposite
    // direction; capture velocity in px/frame (~16ms) for the post-release fling.
    targetRef.current.x -= dx;
    targetRef.current.y -= dy;
    velocityRef.current.x = (-dx / dt) * 16;
    velocityRef.current.y = (-dy / dt) * 16;
    dragRef.current.lastX = e.clientX;
    dragRef.current.lastY = e.clientY;
    dragRef.current.lastTime = now;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    dragRef.current.active = false;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  // Number of tiles needed to cover viewport + 1 buffer for wrap.
  const tilesX = Math.ceil(viewport.w / TILE_WIDTH) + 1;
  const tilesY = Math.ceil(viewport.h / TILE_HEIGHT) + 1;

  const wrappedX = ((render.x % TILE_WIDTH) + TILE_WIDTH) % TILE_WIDTH;
  const wrappedY = ((render.y % TILE_HEIGHT) + TILE_HEIGHT) % TILE_HEIGHT;

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      className="fixed inset-0 overflow-hidden bg-white cursor-grab active:cursor-grabbing select-none touch-none"
      style={{ overscrollBehavior: "none" }}
    >
      <div
        className="absolute left-0 top-0 will-change-transform"
        style={{
          transform: `translate3d(${-wrappedX}px, ${-wrappedY}px, 0)`,
          width: TILE_WIDTH * tilesX,
          height: TILE_HEIGHT * tilesY,
        }}
      >
        {Array.from({ length: tilesY }).map((_, j) =>
          Array.from({ length: tilesX }).map((_, i) => (
            <Tile
              key={`${i}-${j}`}
              left={i * TILE_WIDTH}
              top={j * TILE_HEIGHT}
            />
          ))
        )}
      </div>

      <div className="pointer-events-none fixed bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-black/80 px-4 py-2 text-subtext text-white backdrop-blur-sm">
        Drag or scroll in any direction to explore
      </div>
    </div>
  );
}

function Tile({ left, top }: { left: number; top: number }) {
  return (
    <div
      className="absolute"
      style={{ left, top, width: TILE_WIDTH, height: TILE_HEIGHT }}
    >
      <div
        style={{
          transform: `scale(${SCALE})`,
          transformOrigin: "top left",
          width: NATURAL_TILE_WIDTH,
          height: NATURAL_TILE_HEIGHT,
        }}
      >
        {ELEMENTS.map((el) => (
          <ElementGroup key={el.number} element={el} />
        ))}
      </div>
    </div>
  );
}

function ElementGroup({ element }: { element: Element }) {
  return (
    <>
      {element.images.map((img, i) => (
        <div
          key={i}
          className="absolute overflow-hidden"
          style={{
            left: img.x,
            top: img.y,
            width: img.w,
            height: img.h,
            transform: img.rotation
              ? `rotate(${img.rotation}deg)`
              : undefined,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.src}
            alt=""
            draggable={false}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
      <p
        className="absolute font-sans text-subtext text-gray-2 select-none"
        style={{ left: element.numberX, top: element.numberY }}
      >
        {element.number}
      </p>
      <p
        className="absolute font-sans text-body text-black select-none whitespace-nowrap"
        style={{ left: element.captionX, top: element.captionY }}
      >
        {element.caption}
      </p>
    </>
  );
}
