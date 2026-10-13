import Image from "next/image";

/* The band's wash / rules / accent primitives are the same ones the home
   band uses, so this imports them rather than adding a third copy of the
   same CSS. */
import styles from "../home.module.css";

/* Figma node 1185:358 — "Sandbox" (band from node 1099:107).

   The frame's canvas is a bordered box starting at y=142, which is inside
   the 416px band, so its white fill covers the lower part of the wash.
   Inside it, the work is scattered as tilted polaroid cards (node
   1185:358). */

const BAND_HEIGHT = 416;
const CANVAS_TOP = 142;
const CANVAS_RULE = "#a2acdb";

/* The canvas body's size in the frame (node 1185:389). Card positions
   below are in its coordinate space, so the collage scales with the
   canvas as one piece. */
const BODY_W = 1258;
const BODY_H = 1463;

/* Two kinds of card, listed bottom to top to match the frame's layer
   order where they overlap.

   A "baked" card is the frame's tilted polaroid exported at 2x with its
   tilt and drop shadow baked in, so `w`/`h` include the shadow's spill
   and x/y are the frame's card position less that spill.

   A "link" card is built here instead, because hovering it straightens
   it and raises an Explore tag (node 1192:311), which a baked tilt can't
   do. It's placed by its centre (the centre of the frame's tilted
   bounding box) and opens its site in a new tab. */
type BakedCard = {
  kind: "baked";
  src: string;
  alt: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

type LinkCard = {
  kind: "link";
  src: string;
  alt: string;
  href: string;
  label: string;
  cx: number;
  cy: number;
  /** Untilted card size. */
  w: number;
  h: number;
  /** The artwork inset 12px from the top and sides. */
  artH: number;
  artRadius: number;
  radius: number;
  shadow: string;
  tilt: number;
};

type Card = BakedCard | LinkCard;

const CARDS: Card[] = [
  {
    kind: "baked",
    src: "/images/playground/sandbox/painting.png",
    alt: "Oil painting of a still life: a dark bottle, a cut pumpkin, garlic and crumpled paper",
    x: 748,
    y: 471.15,
    w: 483.5,
    h: 545.5,
  },
  {
    kind: "link",
    src: "/images/playground/sandbox/lantern-art.jpg",
    alt: "Illustration of a glowing paper lantern with a flower drawn on it, beside a “Turn the lights on” toggle",
    href: "https://kat101-commits.github.io/lamp-shade-landing/index.html?lit=1",
    label: "Explore the lamp shade site",
    cx: 281.22,
    cy: 352.28,
    w: 454,
    h: 473,
    artH: 420,
    artRadius: 4,
    radius: 2,
    shadow: "-4px 4px 10px rgba(0, 0, 0, 0.1)",
    tilt: -7.58,
  },
  {
    kind: "baked",
    src: "/images/playground/sandbox/hoodie.png",
    alt: "Front and back of a white Generate hoodie with blue script graphics",
    x: 549.24,
    y: 17.5,
    w: 690,
    h: 464,
  },
  {
    kind: "baked",
    src: "/images/playground/sandbox/summit.png",
    alt: "Two green WISE Summit social posts, “(access)” and “(drive)”",
    x: 302.39,
    y: 450,
    w: 569,
    h: 413,
  },
  {
    kind: "link",
    src: "/images/playground/sandbox/book-cover.jpg",
    alt: "Thread-bound book cover for the Classical Gardens of Suzhou",
    href: "https://kat101-commits.github.io/suzhou-book/",
    label: "Explore the Suzhou book",
    cx: 236.61,
    cy: 968.37,
    w: 351,
    h: 363,
    artH: 327,
    artRadius: 2,
    radius: 4,
    shadow: "-4.35px 4.35px 5.43px rgba(0, 0, 0, 0.1)",
    tilt: -2.29,
  },
];

/* Link cards are sized in frame px times --u, the scale the card is
   drawn at (set by whichever layout it sits in). */
const u = (n: number) => `calc(${n} * var(--u))`;

export default function Playground() {
  return (
    <section className="relative">
      <Band />

      <div
        className="relative mx-auto w-full max-w-frame px-page pb-[120px] max-md:px-6 max-md:pb-16"
        style={{
          paddingTop: `calc(${CANVAS_TOP}px - var(--spacing-header))`,
        }}
      >
        <div
          className="border border-solid"
          style={{ borderColor: CANVAS_RULE }}
        >
          {/* Placeholder-styled title, in the same design-tool language the
              rest of the site uses. The frame reads "[insert title]";
              this says "[work in progress]". */}
          <div
            className="flex items-center justify-between whitespace-nowrap bg-white/50 px-6 py-3 font-sans text-[16px] italic leading-[1.35] max-md:px-4"
            style={{ color: CANVAS_RULE }}
          >
            <p>[work in progress]</p>
            <p>[[time]]</p>
          </div>

          <div
            className="border-t border-solid bg-white"
            style={{ borderColor: CANVAS_RULE }}
          >
            <Collage />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Band ─────────────────────────────────────────────────────────────── */

function Band() {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 ${styles.band}`}
      style={{
        // Inline, because styles.band sets position: relative and would
        // otherwise win over the utility class — which put this 416px
        // backdrop back into flow and pushed the canvas down by exactly
        // its height.
        position: "absolute",
        // Its own stacking context, so the progressive blur's z-index stays
        // inside the band instead of rising over the canvas and its cards.
        zIndex: 0,
        top: "calc(var(--spacing-header) * -1)",
        height: BAND_HEIGHT,
      }}
    >
      <div className={`${styles.wash} absolute inset-0`} />

      <div className={styles.bandRules}>
        <div className={styles.hRule} style={{ top: "var(--gy-nav-top)" }} />
        <div className={styles.hRule} style={{ top: "var(--gy-nav-bottom)" }} />

        {/* Verticals share the frame's coordinate space with the nav, so
            they sit in a frame-centred wrapper rather than spanning the
            viewport. */}
        <div className="absolute inset-y-0 left-1/2 w-full max-w-frame -translate-x-1/2">
          <div className={styles.rule} style={{ left: "var(--gutter)" }} />
          <div className={styles.rule} style={{ right: "var(--gutter)" }} />
          <div
            className={styles.rule}
            style={{ left: "var(--gx-wordmark-start)" }}
          />
          <div
            className={styles.rule}
            style={{ left: "var(--gx-wordmark-end)" }}
          />

          {[0, 1, 2, 3].map((i) => (
            <div
              key={`s${i}`}
              className={`${styles.rule} max-md:hidden`}
              style={{ left: `var(--gx-nav-${i}-start)` }}
            />
          ))}
          {[0, 1, 2, 3].map((i) => (
            <div
              key={`e${i}`}
              className={`${styles.rule} max-md:hidden`}
              style={{ left: `var(--gx-nav-${i}-end)` }}
            />
          ))}

          {/* The frame's two accents: one filling the wordmark's column,
              one spanning the nav's. */}
          <div
            className={`${styles.accent} max-md:hidden`}
            style={
              {
                left: "var(--gx-wordmark-start)",
                width:
                  "calc(var(--gx-wordmark-end) - var(--gx-wordmark-start))",
                top: "var(--gy-nav-bottom)",
                height: 363,
                "--from": 0.24,
                "--to": 0.08,
              } as React.CSSProperties
            }
          />
          <div
            className={`${styles.accent} max-md:hidden`}
            style={
              {
                left: "var(--gx-nav-0-start)",
                right: "var(--gutter)",
                top: "var(--gy-nav-bottom)",
                height: 270,
                "--from": 0.3,
                "--to": 0.1,
              } as React.CSSProperties
            }
          />
        </div>
      </div>

      <div className={styles.blur}>
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

/* ── Collage ──────────────────────────────────────────────────────────── */

function Collage() {
  return (
    <>
      {/* From md up the cards keep the frame's scatter, positioned as
          fractions of the canvas body so they scale with it; --u is one
          frame px at the canvas's current width. */}
      <div
        className="relative w-full [container-type:inline-size] max-md:hidden"
        style={
          {
            aspectRatio: `${BODY_W} / ${BODY_H}`,
            "--u": `calc(100cqw / ${BODY_W})`,
          } as React.CSSProperties
        }
      >
        {CARDS.map((card) =>
          card.kind === "baked" ? (
            <Image
              key={card.src}
              src={card.src}
              alt={card.alt}
              width={card.w}
              height={card.h}
              sizes={`(min-width: 1440px) ${card.w}px, ${((card.w / BODY_W) * 100).toFixed(1)}vw`}
              className="absolute h-auto max-w-none"
              style={{
                left: `${(card.x / BODY_W) * 100}%`,
                top: `${(card.y / BODY_H) * 100}%`,
                width: `${(card.w / BODY_W) * 100}%`,
              }}
            />
          ) : (
            <Polaroid
              key={card.src}
              card={card}
              sizes={`(min-width: 1440px) ${card.w}px, ${((card.w / BODY_W) * 100).toFixed(1)}vw`}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${(card.cx / BODY_W) * 100}%`,
                top: `${(card.cy / BODY_H) * 100}%`,
              }}
            />
          ),
        )}
      </div>

      {/* Too narrow to scatter: stack them, keeping each card's tilt and
          shrinking a card only when it's wider than the column. */}
      <div className="flex flex-col items-center gap-4 p-4 [container-type:inline-size] md:hidden">
        {CARDS.map((card) =>
          card.kind === "baked" ? (
            <Image
              key={card.src}
              src={card.src}
              alt={card.alt}
              width={card.w}
              height={card.h}
              sizes="90vw"
              className="h-auto w-full"
              style={{ maxWidth: card.w }}
            />
          ) : (
            <Polaroid
              key={card.src}
              card={card}
              sizes="90vw"
              className="relative my-3"
              style={
                {
                  "--u": `min(1px, calc(100cqw / ${card.w + 24}))`,
                } as React.CSSProperties
              }
            />
          ),
        )}
      </div>
    </>
  );
}

/* Hovering (or focusing) a link card straightens it, lifts it above its
   neighbours and raises the Explore tag over the artwork's bottom edge
   (node 1192:311). Without hover — touch screens — the tag just shows. */
function Polaroid({
  card,
  sizes,
  className,
  style,
}: {
  card: LinkCard;
  sizes: string;
  className: string;
  style: React.CSSProperties;
}) {
  return (
    <a
      href={card.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={card.label}
      className={`group block bg-white transition-[rotate] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] [rotate:var(--tilt)] hover:z-10 hover:[rotate:0deg] focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black focus-visible:[rotate:0deg] motion-reduce:transition-none ${className}`}
      style={
        {
          ...style,
          "--tilt": `${card.tilt}deg`,
          width: u(card.w),
          height: u(card.h),
          padding: `${u(12)} ${u(12)} 0`,
          borderRadius: u(card.radius),
          boxShadow: card.shadow,
        } as React.CSSProperties
      }
    >
      <Image
        src={card.src}
        alt={card.alt}
        width={card.w - 24}
        height={card.artH}
        sizes={sizes}
        className="block w-full object-cover"
        style={{ height: u(card.artH), borderRadius: u(card.artRadius) }}
      />

      <span
        aria-hidden
        className="absolute flex translate-y-1 items-center border border-solid border-[#a2acdb] bg-white font-sans leading-none text-[#455288] opacity-0 drop-shadow-[-4px_4px_5px_rgba(0,0,0,0.1)] transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100"
        style={{
          top: u(card.artH),
          right: u(37),
          gap: u(12),
          padding: `${u(6)} ${u(12)}`,
          borderRadius: u(2),
          fontSize: u(14),
        }}
      >
        Explore
        <svg
          viewBox="0 0 9.3 9.3"
          fill="none"
          style={{ width: u(8), height: u(8) }}
          className="overflow-visible"
        >
          <path
            d="M8.65 8.65V0.65H0.65M8.65 0.65L0.65 8.65"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </a>
  );
}
