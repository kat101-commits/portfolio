import Image from "next/image";
import Link from "next/link";

import styles from "./about.module.css";

/* Figma: "About Me" — node 988:3562 (desktop) and 1109:551 (mobile).
   Laid out against the 1440 frame, so at `max-w-frame` a design pixel is a
   CSS pixel. The nav and the bottom dock come from the root layout; this
   page supplies the band, the body and its own Figma-matched footer. */

const CONTENT = 1260; // --spacing-content, i.e. the 1440 frame less both gutters
const HALF = CONTENT / 2;

export default function About() {
  return (
    <div className={styles.page}>
      {/* The two outermost rules carry past the header. They sit in a
          frame-centred wrapper because the gutter is measured from the
          1440 frame, not the viewport — outside it they'd drift once the
          window is wider than the frame. */}
      <div className="pointer-events-none absolute inset-y-0 left-1/2 w-full max-w-frame -translate-x-1/2">
        <div className={styles.rule} style={{ left: "var(--gutter)" }} />
        <div className={styles.rule} style={{ right: "var(--gutter)" }} />
      </div>

      <HeaderBand />
      <Experience />
      <Snapshots />
      <PageFooter />
    </div>
  );
}

/* ── Header band ──────────────────────────────────────────────────────── */

function HeaderBand() {
  return (
    /* Pulled up under the layout's nav so the wash reaches the top of the
       page the way the frame does. The nav sits at z-50, so it still paints
       over this. */
    <section
      className={`relative tuck-under-header ${styles.wash}`}
    >
      <div className={styles.bandRules} aria-hidden>
        {/* The nav's rules and the vertical on each of its item edges,
            read from the custom properties Nav.tsx publishes off its own
            rendered row — the same source the home band uses, so the two
            pages draw the identical chrome around the identical nav.
            These replaced hardcoded 33/53/69px values, which were
            measured against a 51px header and had been wrong since it
            grew to 74. */}
        <div
          className={`${styles.hRule} max-md:hidden`}
          style={{ top: "var(--gy-nav-top)" }}
        />
        <div
          className={`${styles.hRule} max-md:hidden`}
          style={{ top: "var(--gy-nav-bottom)" }}
        />
        <div className={styles.hRule} style={{ bottom: 0 }} />

        {/* Verticals share the frame's coordinate space with the nav. */}
        <div className="absolute inset-y-0 left-1/2 w-full max-w-frame -translate-x-1/2">
          {/* One on each side of the wordmark. */}
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
        </div>
      </div>

      <Accent
        className="max-md:hidden"
        style={{ left: "var(--gutter)", top: 54, width: 68, bottom: 7 }}
      />
      <Accent
        className="max-md:hidden"
        style={{ right: "calc(var(--gutter) + 2px)", top: 54, width: 154, height: 317 }}
      />
      {/* Mobile keeps a single block, sized to the frame's 341 × 41. */}
      <Accent
        className="md:hidden"
        style={{ left: "var(--gutter)", top: 0, right: 65, height: 41 }}
      />

      <div className="relative z-10 mx-auto w-full max-w-frame px-page max-md:px-6">
        {/* mt-[51px]: the gap from the frame top to the nav row (the
            accent block behind it occupies 0-41 independently). The old
            gap to the photo (29px) now lives on the nav itself instead of
            on the grid below, since the nav's real height stands in for
            Figma's fixed 36px. */}
        <div className="grid min-h-[479px] grid-cols-2 items-start max-md:min-h-0 max-md:grid-cols-1 max-md:gap-[41px] max-md:pb-8">
          <Portrait />
          <Bio />
        </div>
      </div>

      <div className={styles.blur} aria-hidden>
        <span />
        <span />
        <span />
        <span />
      </div>
    </section>
  );
}

function Accent({
  className = "",
  style,
}: {
  className?: string;
  style: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden
      className={`${styles.accent} ${className}`}
      style={style}
    />
  );
}

function Portrait() {
  return (
    <div className={`${styles.portrait} self-stretch max-md:self-auto`}>
      {/* Tilted and loosely placed on desktop; flat and full-width on
          mobile, where the frame also crops it tighter. */}
      <figure
        className={`${styles.snap} ${styles.desktopOnly}`}
        style={
          {
            "--base": HALF,
            "--l": 131,
            "--t": 49,
            "--w": 424.933,
            "--h": 458.649,
          } as React.CSSProperties
        }
      >
        <div
          className={styles.card}
          style={
            {
              "--rot": "-7.99deg",
              "--p": 12,
              "--r": 3.6,
              "--sx": -3.6,
              "--sy": 3.6,
              "--sb": 3.6,
              "--sa": 0.2,
              "--card": "#fffdf9",
            } as React.CSSProperties
          }
        >
          <PortraitPhoto
            vars={{
              "--pw": 347.392,
              "--ph": 387,
              "--pr": 3.6,
              "--il": -7.13,
              "--it": -10.02,
              "--iw": 120.18,
              "--ih": 110,
            }}
          />
        </div>
      </figure>

      <div className="relative md:hidden" style={{ aspectRatio: "382 / 323.273" }}>
        <figure
          className={`${styles.snap} ${styles.mobileOnly}`}
          style={
            {
              "--base": 382,
              "--l": 0,
              "--t": 0,
              "--w": 382,
              "--h": 323.273,
            } as React.CSSProperties
          }
        >
          <div
            className={styles.card}
            style={
              {
                "--rot": "0deg",
                "--p": 9.6,
                "--r": 2.88,
                "--sx": -1,
                "--sy": 1,
                "--sb": 3,
                "--sa": 0.1,
                "--card": "#fffdf9",
              } as React.CSSProperties
            }
          >
            <PortraitPhoto
              vars={{
                "--pw": 362.8,
                "--ph": 304.073,
                "--pr": 2.88,
                "--il": -3.38,
                "--it": -14.93,
                "--iw": 107.01,
                "--ih": 130.19,
              }}
            />
          </div>
        </figure>
      </div>
    </div>
  );
}

function PortraitPhoto({ vars }: { vars: Record<string, number> }) {
  return (
    <div className={styles.photo} style={vars as React.CSSProperties}>
      <Image
        src="/images/about/profile.png"
        alt="Katherine speaking on stage at a Generate showcase"
        width={1118}
        height={1140}
        sizes="(min-width: 768px) 360px, 100vw"
        priority
      />
    </div>
  );
}

function Bio() {
  return (
    <div className="flex max-w-[436px] flex-col gap-4 pt-[115px] text-black max-md:max-w-none max-md:pt-0">
      <h1 className="font-serif text-[24px] leading-normal max-md:text-[20px]">
        Welcome to my little corner of the internet!{" "}
        <span aria-hidden="true">🙈</span>
      </h1>
      <div className="flex flex-col gap-[1.45em] text-body leading-[1.45]">
        <p>
          I&rsquo;m Katherine, a designer who likes to get close to the
          problem. There&rsquo;s something satisfying about thinking in systems
          it&rsquo;s like solving a puzzle where the pieces are scattered until
          they start to click together.
        </p>
        <p>
          As recent graduated from Northeastern with a degree in Finance and
          Design. I enjoy thinking in both product and business strategy. On
          the side, I dabble in all types of design, and I&rsquo;m currently on
          a side quest to learn motion design.
        </p>
        <p>
          Outside of design, I&rsquo;m a craft hobbyist, cafe-hopper, and
          trying to staying up to date with politics
        </p>
      </div>
    </div>
  );
}

/* ── Experience ───────────────────────────────────────────────────────── */

const EXPERIENCE = [
  {
    role: "Associate Product Designer",
    company: "Solace",
    dates: "July 2026 - Present",
  },
  {
    role: "UX Research & Design Co-op",
    company: "Boston Consulting Group",
    dates: "July 2025 - Dec 2025",
  },
  {
    role: "Design Co-op",
    company: "Goodwin Procter",
    dates: "July 2024 - Dec 2024",
  },
  {
    role: "Product Design Intern",
    company: "Apprenta",
    dates: "May 2024 - July 2024",
  },
];

function Experience() {
  return (
    <>
      <div className="h-[138px] border-b border-[#d5ddff] max-md:h-[39px] max-md:border-b-0" />
      <section className="border-b border-[#d5ddff] max-md:border-b-0">
        <div className="mx-auto w-full max-w-frame px-page max-md:px-6">
          <div className="flex justify-between gap-10 max-lg:flex-col max-lg:gap-4">
            <h2 className="shrink-0 font-serif text-[36px] leading-normal text-black">
              Experience
            </h2>
            <ul className="flex w-full max-w-[895px] flex-col gap-4 max-md:gap-6">
              {EXPERIENCE.map((e) => (
                <li
                  key={e.role}
                  className="flex items-center justify-between gap-4 max-md:items-start"
                >
                  {/* The bullet separates role from company on one line;
                      mobile stacks them, so it is no longer load bearing. */}
                  <div className="flex min-w-0 items-center gap-4 text-black max-md:flex-col max-md:items-start max-md:gap-1">
                    <span className="whitespace-nowrap text-body max-md:whitespace-normal max-md:font-sans max-md:font-medium">
                      {e.role}
                    </span>
                    <span
                      aria-hidden
                      className="inline-block size-2 shrink-0 rounded-full bg-[#1e00ff] max-md:hidden"
                    />
                    <span className="whitespace-nowrap text-body max-md:whitespace-normal">
                      {e.company}
                    </span>
                  </div>
                  {/* Not --text-subtext: the frame asks for 12px / #747474,
                      which has no token yet. Worth adding one if this design
                      graduates out of the preview scaffold. */}
                  <span className="shrink-0 whitespace-nowrap font-sans text-[12px] text-[#747474]">
                    {e.dates}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Snapshots ────────────────────────────────────────────────────────────
   Two hand-tuned collages. Both were laid out against a 1260 canvas, so one
   `--base` covers them and only the canvas height differs. Not part of the
   mobile frame, which ends at Experience. */

type Snap = {
  src: string;
  alt: string;
  nat: [number, number];
  box: { l: number; t: number; w: number; h: number; rot?: number };
  card: { p: number; r: number; sx: number; sy: number; sb: number; ix: number; ib: number };
  photo: Record<string, number>;
  cover?: boolean;
  turn?: { tw: number; th: number };
};

const GENERATE: Snap[] = [
  {
    src: "/images/about/snap-0.png",
    alt: "A Generate showcase presentation on a lecture-hall screen",
    nat: [3024, 1702],
    box: { l: 0, t: 19.57, w: 332.984, h: 204.748, rot: 1.83 },
    card: { p: 11.88, r: 4.752, sx: 2.2, sy: 4.752, sb: 2.376, ix: 2.2, ib: 4.4 },
    photo: { "--pw": 303.178, "--ph": 170.63, "--pr": 4.752 },
    cover: true,
  },
  {
    src: "/images/about/snap-1.png",
    alt: "A teammate working at a laptop during a studio session",
    nat: [1376, 1834],
    box: { l: 322.51, t: -17.51, w: 230.751, h: 231.319, rot: -12.25 },
    card: { p: 11.88, r: 4.752, sx: 2.2, sy: 4.752, sb: 2.376, ix: 2.2, ib: 4.4 },
    photo: { "--pw": 170.122, "--ph": 170.863, "--pr": 4.752, "--il": 0, "--it": -8.03, "--iw": 100, "--ih": 132.71 },
  },
  {
    src: "/images/about/snap-2.png",
    alt: "Sticky notes and sketches pinned up during a working session",
    nat: [1376, 1834],
    box: { l: 482, t: 8, w: 222.387, h: 236.738, rot: 17.03 },
    card: { p: 11.88, r: 4.752, sx: 2.2, sy: 4.752, sb: 2.376, ix: 2.2, ib: 4.4 },
    photo: { "--pw": 149.213, "--ph": 170.85, "--pr": 4.752, "--il": -35.85, "--it": -75.82, "--iw": 183.46, "--ih": 213.55 },
  },
  {
    src: "/images/about/snap-3.png",
    alt: "A Generate poster wall covered in printed design artefacts",
    nat: [2446, 1834],
    box: { l: 669, t: -11, w: 272.793, h: 222.743, rot: -6.68 },
    card: { p: 11.88, r: 4.752, sx: 2.2, sy: 4.752, sb: 2.376, ix: 2.2, ib: 4.4 },
    photo: { "--pw": 228.096, "--ph": 171.01, "--pr": 4.752 },
    cover: true,
  },
  {
    src: "/images/about/snap-4.png",
    alt: "Friends sitting on coastal rocks on a clear day",
    nat: [2730, 1536],
    box: { l: 930, t: 29, w: 327.888, h: 194.874 },
    card: { p: 11.88, r: 4.752, sx: 2.2, sy: 4.752, sb: 2.376, ix: 2.2, ib: 4.4 },
    photo: { "--pw": 304.128, "--ph": 171.11, "--pr": 4.752 },
    cover: true,
  },
];

const FOOD: Snap[] = [
  {
    src: "/images/about/snap-5.png",
    alt: "A wooden table laid with small tasting glasses",
    nat: [1528, 2038],
    box: { l: 0, t: 24, w: 342.686, h: 228.457 },
    card: { p: 10.133, r: 3.685, sx: 2.027, sy: 4.378, sb: 2.189, ix: 2.027, ib: 4.053 },
    photo: { "--pw": 322.42, "--ph": 208.191, "--pr": 2.764, "--il": -11.5, "--it": -0.11, "--iw": 116.37, "--ih": 100.22 },
    turn: { tw: 208.191, th: 322.42 },
  },
  {
    src: "/images/about/snap-7.png",
    alt: "Two pizzas shared across a table",
    nat: [1528, 2038],
    box: { l: 306, t: 8, w: 228.817, h: 235.892, rot: 13.96 },
    card: { p: 11, r: 4.4, sx: 2.2, sy: 4.752, sb: 2.376, ix: 2.2, ib: 4.4 },
    photo: { "--pw": 164.915, "--ph": 174.616, "--il": 0, "--it": -19.75, "--iw": 99.87, "--ih": 125.8 },
  },
  {
    src: "/images/about/snap-8.png",
    alt: "A tray of sushi laid out in a row",
    nat: [1528, 2038],
    box: { l: 502, t: 39, w: 235.758, h: 232.355, rot: -8.01 },
    card: { p: 12.1, r: 4.84, sx: 2.42, sy: 5.227, sb: 2.614, ix: 2.42, ib: 4.84 },
    photo: { "--pw": 185, "--ph": 181, "--il": -0.07, "--it": -19.45, "--iw": 100.14, "--ih": 135.84 },
  },
  {
    src: "/images/about/snap-9.png",
    alt: "A plated dinner course beside a lit candle",
    nat: [1528, 2038],
    box: { l: 901, t: 24, w: 345.98, h: 246.713, rot: -5.78 },
    card: { p: 10, r: 4, sx: 2, sy: 4.32, sb: 2.16, ix: 2, ib: 4 },
    photo: { "--pw": 306, "--ph": 195, "--il": 0.07, "--it": -69.13, "--iw": 99.87, "--ih": 209.03 },
  },
  {
    src: "/images/about/snap-10.png",
    alt: "A steaming bowl of noodle soup on a restaurant table",
    nat: [1528, 2038],
    box: { l: 702, t: 3, w: 226.684, h: 270.476, rot: 13.34 },
    card: { p: 11, r: 4.4, sx: 2.2, sy: 4.752, sb: 2.376, ix: 2.2, ib: 4.4 },
    photo: { "--pw": 155, "--ph": 214, "--il": -29.79, "--it": -29.76, "--iw": 161.55, "--ih": 156.17 },
  },
];

function Snapshots() {
  return (
    <section className="max-md:h-[67px]">
      <div className="mx-auto w-full max-w-frame px-page max-md:px-6">
        <div className="flex flex-col gap-6 pt-[74px] pb-[89px] max-md:hidden">
          <h2 className="font-serif text-[32px] leading-normal tracking-[0.02em] text-black">
            Snapshots of my life
          </h2>
          <div className="flex flex-col gap-[50px]">
            <Collage
              label="Generate"
              caption="Creating communities while designing"
              photos={GENERATE}
              height={261}
            />
            <Collage
              label="Food"
              caption="Always open to trying new places"
              photos={FOOD}
              height={276.945}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Collage({
  label,
  caption,
  photos,
  height,
}: {
  label: string;
  caption: string;
  photos: Snap[];
  height: number;
}) {
  return (
    <div className="flex flex-col gap-6">
      <p className="flex items-center gap-4 text-body">
        <strong className="font-sans font-medium text-black">{label}</strong>
        <span className="text-gray-2">{caption}</span>
      </p>
      <div
        className={styles.stage}
        style={{ aspectRatio: `${CONTENT} / ${height}` }}
      >
        {photos.map((s) => (
          <Polaroid key={s.src} snap={s} />
        ))}
      </div>
    </div>
  );
}

function Polaroid({ snap }: { snap: Snap }) {
  const { box, card, photo, nat, turn, cover } = snap;
  const img = (
    <Image
      src={snap.src}
      alt={snap.alt}
      width={nat[0]}
      height={nat[1]}
      sizes="(min-width: 768px) 360px, 90vw"
      loading="lazy"
    />
  );

  return (
    <figure
      className={styles.snap}
      style={
        {
          "--base": CONTENT,
          "--l": box.l,
          "--t": box.t,
          "--w": box.w,
          "--h": box.h,
        } as React.CSSProperties
      }
    >
      <div
        className={styles.card}
        style={
          {
            "--rot": `${box.rot ?? 0}deg`,
            "--p": card.p,
            "--r": card.r,
            "--sx": card.sx,
            "--sy": card.sy,
            "--sb": card.sb,
            "--ix": card.ix,
            "--ib": card.ib,
          } as React.CSSProperties
        }
      >
        <div
          className={`${styles.photo} ${cover ? styles.cover : ""} ${turn ? styles.turned : ""}`}
          style={photo as React.CSSProperties}
        >
          {turn ? (
            <div
              className={styles.turn}
              style={{ "--tw": turn.tw, "--th": turn.th } as React.CSSProperties}
            >
              {img}
            </div>
          ) : (
            img
          )}
        </div>
      </div>
    </figure>
  );
}

/* ── Footer ───────────────────────────────────────────────────────────── */

function PageFooter() {
  return (
    <footer
      className={`relative z-10 w-full border-t border-solid border-[#d5ddff] ${styles.footerWash}`}
    >
      <div className="mx-auto flex w-full max-w-frame items-center justify-between px-page max-md:px-6 py-12 max-md:flex-col max-md:items-start max-md:gap-6 max-md:py-8">
        <div className="flex items-center gap-2">
          <p className="text-body text-black">Katherine Zhang</p>
          <Image
            src="/images/preview/dash-separator.svg"
            alt=""
            width={121}
            height={8}
            style={{ height: "auto" }}
          />
          <p className="text-body text-black">2026</p>
        </div>
        <div className="flex items-center gap-6 font-sans text-subtext text-black max-md:self-end">
          <Link href="https://www.linkedin.com/">LinkedIn</Link>
          <Link href="mailto:zhangskath@gmail.com">zhangskath@gmail.com</Link>
        </div>
      </div>
    </footer>
  );
}
