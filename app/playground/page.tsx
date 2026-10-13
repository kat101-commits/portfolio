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

/* Each card is the frame's tilted polaroid exported at 2x with its tilt
   and drop shadow baked in, so `w`/`h` include the shadow's spill and
   x/y are the frame's card position less that spill. Listed bottom to
   top, matching the frame's layer order where the cards overlap. Cards
   with an `href` open that project's site. */
type Card = {
  src: string;
  alt: string;
  x: number;
  y: number;
  w: number;
  h: number;
  href?: string;
};

const CARDS: Card[] = [
  {
    src: "/images/playground/sandbox/painting.png",
    alt: "Oil painting of a still life: a dark bottle, a cut pumpkin, garlic and crumpled paper",
    x: 748,
    y: 471.15,
    w: 483.5,
    h: 545.5,
  },
  {
    src: "/images/playground/sandbox/lantern.png",
    alt: "Illustration of a glowing paper lantern with a flower drawn on it, beside a “Turn the lights on” toggle",
    x: 11,
    y: 81.9,
    w: 532,
    h: 548.5,
    href: "https://kat101-commits.github.io/lamp-shade-landing/index.html?lit=1",
  },
  {
    src: "/images/playground/sandbox/hoodie.png",
    alt: "Front and back of a white Generate hoodie with blue script graphics",
    x: 549.24,
    y: 17.5,
    w: 690,
    h: 464,
  },
  {
    src: "/images/playground/sandbox/summit.png",
    alt: "Two green WISE Summit social posts, “(access)” and “(drive)”",
    x: 302.39,
    y: 450,
    w: 569,
    h: 413,
  },
  {
    src: "/images/playground/sandbox/book.png",
    alt: "Thread-bound book cover for the Classical Gardens of Suzhou",
    x: 38.5,
    y: 773.5,
    w: 387,
    h: 398.5,
    href: "https://kat101-commits.github.io/suzhou-book/",
  },
];

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
          fractions of the canvas body so they scale with it. */}
      <div
        className="relative w-full max-md:hidden"
        style={{ aspectRatio: `${BODY_W} / ${BODY_H}` }}
      >
        {CARDS.map((card) => (
          <CardFrame
            key={card.src}
            card={card}
            sizes={`(min-width: 1440px) ${card.w}px, ${((card.w / BODY_W) * 100).toFixed(1)}vw`}
            className="absolute"
            style={{
              left: `${(card.x / BODY_W) * 100}%`,
              top: `${(card.y / BODY_H) * 100}%`,
              width: `${(card.w / BODY_W) * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Too narrow to scatter: stack them, keeping each card's tilt. */}
      <div className="flex flex-col items-center gap-4 p-4 md:hidden">
        {CARDS.map((card) => (
          <CardFrame
            key={card.src}
            card={card}
            sizes="90vw"
            className="w-full"
            style={{ maxWidth: card.w }}
          />
        ))}
      </div>
    </>
  );
}

/* A linked card opens its site in a new tab, like the nav's external
   links, with the same press-in hover as the work cards. */
function CardFrame({
  card,
  sizes,
  className,
  style,
}: {
  card: Card;
  sizes: string;
  className: string;
  style: React.CSSProperties;
}) {
  const image = (
    <Image
      src={card.src}
      alt={card.alt}
      width={card.w}
      height={card.h}
      sizes={sizes}
      className="block h-auto w-full"
    />
  );

  if (!card.href) {
    return (
      <div className={className} style={style}>
        {image}
      </div>
    );
  }

  return (
    <a
      href={card.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} block transform-gpu transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[0.975] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black motion-reduce:transition-none`}
      style={style}
    >
      {image}
    </a>
  );
}
