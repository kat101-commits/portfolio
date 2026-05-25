"use client";

import {
  Children,
  useEffect,
  useRef,
  useState,
} from "react";

type ImageCarouselProps = {
  children: React.ReactNode;
  className?: string;
  /** Render dot indicators below the slides. Defaults to true. */
  showDots?: boolean;
  /** Render a "Swipe to view" hint below the slides. */
  hint?: string;
};

export default function ImageCarousel({
  children,
  className,
  showDots = true,
  hint,
}: ImageCarouselProps) {
  const slides = Children.toArray(children);
  const [index, setIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    setDragOffset(0);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    setDragOffset(e.clientX - dragStartX.current);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    dragStartX.current = null;
    const threshold = Math.min(60, width * 0.15);
    if (delta < -threshold && index < slides.length - 1) {
      setIndex(index + 1);
    } else if (delta > threshold && index > 0) {
      setIndex(index - 1);
    }
    setDragOffset(0);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const translate = -index * width + dragOffset;

  return (
    <div className={`flex flex-col gap-3 ${className ?? ""}`}>
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden touch-pan-y"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="flex"
          style={{
            transform: `translate3d(${translate}px, 0, 0)`,
            transition:
              dragStartX.current === null
                ? "transform 320ms cubic-bezier(0.22,1,0.36,1)"
                : "none",
            width: `${slides.length * 100}%`,
          }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className="flex shrink-0 select-none items-center justify-center"
              style={{ width: width || "100%" }}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {showDots && slides.length > 1 ? (
        <div className="flex justify-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-4 bg-black" : "w-1.5 bg-gray-1"
              }`}
            />
          ))}
        </div>
      ) : null}

      {hint ? (
        <p className="text-center text-subtext text-gray-2">{hint}</p>
      ) : null}
    </div>
  );
}
