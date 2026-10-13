"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

import BasedIn from "./components/BasedIn";
import NameTitle from "./components/NameTitle";
import ProjectCard from "./components/ProjectCard";
import VideoPlaceholder from "./components/VideoPlaceholder";
import styles from "./home.module.css";

export default function Home() {
  return (
    <>
      <MobileHero />
      <Hero />
      <ProjectGrid />
    </>
  );
}

type MobileMetrics = {
  aboutLeft: number;
  navTop: number;
  navBottom: number;
  nameTop: number;
  taglineTop: number;
  taglineBottom: number;
};

/* Figma node 1092:310 (iPhone 14/15 Pro Max, 430 wide). Same band system
   as desktop, but the frame's mobile layout differs in kind, not just in
   scale: the nav drops Resume, only two verticals are drawn (the content
   edge and the "About Me" edge), and the two accents split on that same
   "About Me" line. Rules land on the frame's 41 / 77 / 219 / 239 / 298. */
function MobileHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const [mm, setMm] = useState<MobileMetrics | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    function measure() {
      const section = sectionRef.current;
      const name = nameRef.current;
      const tagline = taglineRef.current;
      const nav = document.querySelector("[data-mobile-nav]");
      const about = document.querySelector("[data-nav-last]");
      if (!section || !nav || !about || !name || !tagline) return;

      const s = section.getBoundingClientRect();
      const n = nav.getBoundingClientRect();
      const a = about.getBoundingClientRect();
      const h = name.getBoundingClientRect();
      const t = tagline.getBoundingClientRect();

      const next: MobileMetrics = {
        aboutLeft: a.left - s.left,
        navTop: n.top - s.top,
        navBottom: n.bottom - s.top,
        nameTop: h.top - s.top,
        taglineTop: t.top - s.top,
        taglineBottom: t.bottom - s.top,
      };
      setMm((prev) =>
        prev &&
        prev.aboutLeft === next.aboutLeft &&
        prev.navTop === next.navTop &&
        prev.navBottom === next.navBottom &&
        prev.nameTop === next.nameTop &&
        prev.taglineTop === next.taglineTop &&
        prev.taglineBottom === next.taglineBottom
          ? prev
          : next,
      );
    }

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(section);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full overflow-hidden md:hidden tuck-under-header ${styles.band}`}
      style={{ "--name-size": "clamp(34px, 12.56vw, 54px)" } as React.CSSProperties}
    >
      <div className={`${styles.wash} absolute inset-0`} />

      <div className={styles.bandRules} aria-hidden>
        {mm && (
          <>
            <div className={styles.hRule} style={{ top: mm.navTop }} />
            <div className={styles.hRule} style={{ top: mm.navBottom }} />
            <div className={styles.hRule} style={{ top: mm.taglineTop }} />
            <div className={styles.hRule} style={{ top: mm.taglineBottom }} />
          </>
        )}
        <div className={styles.hRule} style={{ bottom: 0 }} />

        <div className={styles.rule} style={{ left: "var(--gutter)" }} />
        <div className={styles.rule} style={{ right: "var(--gutter)" }} />
        {mm && <div className={styles.rule} style={{ left: mm.aboutLeft }} />}

        {mm && (
          <>
            {/* Right of the "About Me" edge, up behind the nav. */}
            <Accent
              style={
                {
                  left: mm.aboutLeft,
                  right: 0,
                  top: 0,
                  height: mm.navBottom,
                  "--from": 0.18,
                  "--to": 0.06,
                } as React.CSSProperties
              }
            />
            {/* Left of it, filling the gap between the nav and the name. */}
            <Accent
              style={
                {
                  left: "var(--gutter)",
                  width: mm.aboutLeft - 24,
                  top: mm.navBottom,
                  height: Math.max(0, mm.nameTop - mm.navBottom),
                  "--from": 0.18,
                  "--to": 0.06,
                } as React.CSSProperties
              }
            />
          </>
        )}
      </div>

      <div className="relative z-10 px-6">
        <h1 ref={nameRef} className="pt-16">
          <NameTitle />
        </h1>

        <p
          ref={taglineRef}
          className="pt-[9px] font-sans text-[16px] leading-[1.35] text-black"
        >
          Product designer @ Solace
        </p>

        <p className="pb-[41px] text-right font-sans text-[12px] leading-[1.35] text-black">
          <BasedIn />
        </p>
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

const NAV_ITEM_COUNT = 4; // Work, Playground, About Me, Resume — see navLinks.ts

type Metrics = {
  nameRight: number;
  taglineRight: number;
  subRight: number;
  nameTop: number;
  nameBottom: number;
  taglineBottom: number;
};

function same(a: Metrics | null, b: Metrics) {
  return (
    a !== null &&
    a.nameRight === b.nameRight &&
    a.taglineRight === b.taglineRight &&
    a.subRight === b.subRight &&
    a.nameTop === b.nameTop &&
    a.nameBottom === b.nameBottom &&
    a.taglineBottom === b.taglineBottom
  );
}

function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const subtaglineRef = useRef<HTMLParagraphElement>(null);
  const [m, setM] = useState<Metrics | null>(null);

  // Every rule position is read off real rendered boxes rather than
  // hardcoded: x from the frame's left edge (verticals live in the
  // frame), y from the section's top (horizontals are full-bleed). The
  // 8 nav-item edges and the nav row's own top/bottom arrive separately
  // as CSS custom properties from Nav.tsx, which is the only component
  // that can see them.
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    function measure() {
      const section = sectionRef.current;
      const frame = frameRef.current;
      const name = nameRef.current;
      const tagline = taglineRef.current;
      const sub = subtaglineRef.current;
      if (!section || !frame || !name || !tagline || !sub) return;

      const sBox = section.getBoundingClientRect();
      const fLeft = frame.getBoundingClientRect().left;
      const n = name.getBoundingClientRect();
      const t = tagline.getBoundingClientRect();
      const b = sub.getBoundingClientRect();
      // The tagline's own text box, not its stretched grid cell — the
      // frame puts a rule at the end of the words themselves.
      const tText = (tagline.firstElementChild ?? tagline).getBoundingClientRect();

      const next: Metrics = {
        nameRight: n.right - fLeft,
        taglineRight: tText.right - fLeft,
        subRight: b.right - fLeft,
        nameTop: n.top - sBox.top,
        nameBottom: n.bottom - sBox.top,
        taglineBottom: t.bottom - sBox.top,
      };
      setM((prev) => (same(prev, next) ? prev : next));
    }

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(section);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, []);

  return (
    /* Figma's header band (node 983:2969). Full-bleed: the wash and the
       horizontal rules run the whole viewport width, while the content
       and the vertical rules stay on the 1440 frame — otherwise on a
       screen wider than the frame the band reads as a floating panel
       with blank margins beside it. Tucks up under the real <header>
       via -mt-header/pt-header so it runs behind the transparent nav. */
    <section
      ref={sectionRef}
      className={`relative w-full overflow-hidden tuck-under-header max-md:hidden ${styles.band}`}
    >
      <div className={`${styles.wash} absolute inset-0`} />

      <div className={styles.bandRules} aria-hidden>
        {/* Horizontals, full-bleed. The first two hug the nav row; the
            next two hug the name; then the tagline's baseline row and
            the bottom of the band. */}
        <div className={styles.hRule} style={{ top: "var(--gy-nav-top)" }} />
        <div className={styles.hRule} style={{ top: "var(--gy-nav-bottom)" }} />
        {m && (
          <>
            <div className={styles.hRule} style={{ top: m.nameTop }} />
            <div className={styles.hRule} style={{ top: m.nameBottom }} />
            <div className={styles.hRule} style={{ top: m.taglineBottom }} />
          </>
        )}
        <div className={styles.hRule} style={{ bottom: 0 }} />

        {/* Verticals + accents, held to the frame. */}
        <div className="absolute inset-y-0 left-1/2 w-full max-w-frame -translate-x-1/2">
          <div className={styles.rule} style={{ left: "var(--spacing-page)" }} />
          <div className={styles.rule} style={{ right: "var(--spacing-page)" }} />

          {/* Right of "Zhang", and the far side of the column that holds
              "Based in San Francisco" — both are real column edges of the
              content grid below, measured rather than guessed. */}
          {m && (
            <>
              <div className={styles.rule} style={{ left: m.taglineRight }} />
              <div className={styles.rule} style={{ left: m.nameRight }} />
              <div className={styles.rule} style={{ left: m.subRight }} />
            </>
          )}

          {Array.from({ length: NAV_ITEM_COUNT }, (_, i) => (
            <div key={`s${i}`} className={styles.rule} style={{ left: `var(--gx-nav-${i}-start)` }} />
          ))}
          {Array.from({ length: NAV_ITEM_COUNT }, (_, i) => (
            <div key={`e${i}`} className={styles.rule} style={{ left: `var(--gx-nav-${i}-end)` }} />
          ))}

          {/* The three accents fill whole columns of that same grid, the
              way they do in the frame. */}
          {m && (
            <>
              <Accent
                style={
                  {
                    left: m.nameRight,
                    width: m.subRight - m.nameRight,
                    top: "var(--gy-nav-bottom)",
                    height: Math.max(0, m.nameTop + 30 - 54),
                    "--from": 0.24,
                    "--to": 0.08,
                  } as React.CSSProperties
                }
              />
              <Accent
                style={
                  {
                    left: m.subRight,
                    right: `calc(100% - var(--gx-nav-0-start))`,
                    top: m.nameBottom,
                    bottom: 0,
                    "--from": 0.18,
                    "--to": 0.06,
                  } as React.CSSProperties
                }
              />
              <Accent
                style={
                  {
                    left: `var(--gx-nav-0-start)`,
                    right: "var(--spacing-page)",
                    top: "var(--gy-nav-bottom)",
                    height: m.taglineBottom - 54,
                    "--from": 0.3,
                    "--to": 0.1,
                  } as React.CSSProperties
                }
              />
            </>
          )}
        </div>
      </div>

      {/* Content. Three columns: the name sizes the first, the
          subtagline sizes the second, and the third takes the slack —
          so the rule after "Zhang" and the one after "San Francisco" are
          genuine column edges, and the subtagline sits in the section
          those edges create, directly right of the name. */}
      <div
        ref={frameRef}
        className="relative z-10 mx-auto grid w-full max-w-frame px-page"
        style={{
          gridTemplateColumns: "auto auto minmax(0, 1fr)",
          paddingTop: "clamp(56px, 6.53vw, 94px)",
        }}
      >
        <h1 ref={nameRef} className="col-start-1 row-start-1">
          <NameTitle />
        </h1>

        <p
          ref={taglineRef}
          className="col-start-1 row-start-2 font-sans text-[clamp(14px,1.39vw,20px)] leading-[1.35] text-black"
        >
          <span>Product designer @ Solace</span>
        </p>

        <p
          ref={subtaglineRef}
          className="col-start-2 row-start-3 whitespace-nowrap font-sans text-[clamp(12px,1.11vw,16px)] leading-[1.35] text-black"
        >
          <BasedIn />
        </p>

        <div className="col-span-full row-start-4 h-[clamp(60px,9.65vw,139px)]" />
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

function Accent({ style }: { style: React.CSSProperties }) {
  return <div aria-hidden className={styles.accent} style={style} />;
}

function ProjectGrid() {
  return (
    <section className="relative mx-auto w-full max-w-frame px-page pt-[40px] pb-[220px] -mt-[12px] max-md:px-6 max-md:pt-6 max-md:pb-12 max-md:mt-0">
      <div className="mx-auto grid w-full max-w-[1260px] grid-cols-1 gap-x-6 gap-y-[160px] max-md:gap-y-12 md:grid-cols-2">
        <ProjectCard
          title="BCG"
          tag="Internship 💻"
          dateRange="July 2025 - December 2025"
          description="Designed AI tools for 9,000+ consultants and led global research shaping BCG's GenAI product strategy."
          href="/bcg"
        >
          <VideoPlaceholder aspectRatio="618/460" src="/videos/bcg.mp4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/bcg-logo.svg.png"
              alt="BCG"
              className="pointer-events-none absolute left-1/2 top-1/2 w-[54%] -translate-x-1/2 -translate-y-1/2 object-contain"
            />
          </VideoPlaceholder>
        </ProjectCard>

        <ProjectCard
          title="SelfServe"
          tag="Product Design 🛎️"
          dateRange="Jan 2026 - April 2026"
          description="Designed a PMS for boutique hotels, unifying fragmented operations with AI-powered automation."
          href="/selfserve"
        >
          <VideoPlaceholder aspectRatio="618/460" src="/videos/selfserve.mp4" />
        </ProjectCard>

        <ProjectCard
          title="CineCircle"
          tag="Product Design 🎬"
          dateRange="Sept 2025  - Dec 2026"
          description="Built a community app for South Asian cinema fans, managing end-to-end design across 4 designers."
          href="/cinecircle"
          comingSoon={{ bg: "#fff7ef", fg: "#cc2c00" }}
        >
          <VideoPlaceholder aspectRatio="618/460" src="/videos/cinecircle.mp4" />
        </ProjectCard>

        <ProjectCard
          title="Apprenta"
          tag="Internship 🏥"
          dateRange="May 2024 - July 2024"
          description="Created admin tools managing scholarship distribution across hospitals and aspiring healthcare workers."
          href="/apprenta"
          comingSoon={{ bg: "#f7efff", fg: "#592d90" }}
        >
          <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: "618/460", backgroundColor: "#592d90" }}
          >
            <Image
              src="/images/home/apprenta-dashboard.png"
              alt="Apprenta dashboard"
              width={526}
              height={394}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="absolute"
              style={{
                left: "14.89%",
                top: "20.65%",
                width: "85.11%",
                height: "auto",
              }}
            />
          </div>
        </ProjectCard>
      </div>
    </section>
  );
}
