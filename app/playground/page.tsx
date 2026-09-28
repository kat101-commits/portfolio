import Image from "next/image";

/* The band's wash / rules / accent primitives are the same ones the home
   band uses, so this imports them rather than adding a third copy of the
   same CSS. */
import styles from "../home.module.css";

/* Figma node 1099:107 — "Sandbox".

   The frame's canvas is a bordered box starting at y=142, which is inside
   the 416px band, so its white fill covers the lower part of the wash.
   The frame leaves that canvas empty; the content below is laid out in it
   Pinterest-style, carried over unchanged from the previous scattered
   version of this page. */

const BAND_HEIGHT = 416;
const CANVAS_TOP = 142;
const CANVAS_RULE = "#a2acdb";

type Shot = { src: string; w: number; h: number };
type Item = { number: string; caption: string; shots: Shot[] };

const ITEMS: Item[] = [
  {
    number: "( 1 )",
    caption: "Generate Merch",
    shots: [
      { src: "/images/playground/el-1a.png", w: 168, h: 240 },
      { src: "/images/playground/el-1b.png", w: 219, h: 227 },
    ],
  },
  {
    number: "( 2 )",
    caption: "Oil Painting",
    shots: [{ src: "/images/playground/el-2.png", w: 167, h: 189 }],
  },
  {
    number: "( 3 )",
    caption: "Painting",
    shots: [{ src: "/images/playground/el-3.png", w: 306, h: 160 }],
  },
  {
    number: "( 4 )",
    caption: "Branding Exploration",
    shots: [{ src: "/images/playground/el-4.png", w: 316, h: 170 }],
  },
  {
    number: "( 5 )",
    caption: "Branding - Exploration",
    shots: [
      { src: "/images/playground/el-5a.png", w: 167, h: 209 },
      { src: "/images/playground/el-5b.png", w: 139, h: 209 },
    ],
  },
  {
    number: "( 6 )",
    caption: "Acrylic Painting",
    shots: [{ src: "/images/playground/el-6.png", w: 376, h: 188 }],
  },
  {
    number: "( 7 )",
    caption: "Dating App",
    shots: [{ src: "/images/playground/el-7.png", w: 165, h: 192 }],
  },
  {
    number: "( 8 )",
    caption: "Hoodie Exploration",
    shots: [{ src: "/images/playground/el-8.png", w: 451, h: 230 }],
  },
  {
    number: "( 9 )",
    caption: "A Campus Club based Social Media App",
    shots: [{ src: "/images/playground/el-9.png", w: 242, h: 247 }],
  },
  {
    number: "( 10 )",
    caption: "Oil Painting",
    shots: [{ src: "/images/playground/el-10.png", w: 155, h: 235 }],
  },
  {
    number: "( 11 )",
    caption: "Chinese New Year Illustration",
    shots: [{ src: "/images/playground/el-11.png", w: 191, h: 191 }],
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
          {/* The frame's own placeholder text, kept verbatim — it reads as
              an unfilled template field, which is the same design-tool
              language the rest of the site uses. */}
          <div
            className="flex items-center justify-between whitespace-nowrap bg-white/50 px-6 py-3 font-sans text-[16px] italic leading-[1.35] max-md:px-4"
            style={{ color: CANVAS_RULE }}
          >
            <p>[insert title]</p>
            <p>[[time]]</p>
          </div>

          <div
            className="border-t border-solid bg-white p-6 max-md:p-4"
            style={{ borderColor: CANVAS_RULE }}
          >
            <Masonry />
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

/* ── Masonry ──────────────────────────────────────────────────────────── */

function Masonry() {
  return (
    <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4">
      {ITEMS.map((item) => (
        <figure
          key={item.number}
          className="mb-6 break-inside-avoid-column last:mb-0"
        >
          <p className="font-sans text-subtext text-gray-2">{item.number}</p>

          {/* Side-by-side shots share a row; flex-grow proportional to each
              one's aspect ratio keeps their heights equal without
              distorting either. */}
          <div className="mt-2 flex items-start gap-2">
            {item.shots.map((shot) => (
              <Image
                key={shot.src}
                src={shot.src}
                alt=""
                width={shot.w}
                height={shot.h}
                sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 27vw, (min-width: 640px) 40vw, 90vw"
                className="h-auto w-full min-w-0"
                style={{ flex: `${shot.w / shot.h} 1 0%` }}
              />
            ))}
          </div>

          <figcaption className="mt-2 font-sans text-body text-black">
            {item.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
