import Image from "next/image";

import NameTitle from "./components/NameTitle";
import ProjectCard from "./components/ProjectCard";
import SwipeableMobileCollage from "./components/SwipeableMobileCollage";
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

function MobileHero() {
  return (
    <section className="flex flex-col gap-6 px-6 pt-10 pb-6 md:hidden">
      <h1 className="w-full font-serif font-normal leading-[0.95] text-black text-[clamp(48px,14.4vw,67px)]">
        <span className="block text-left">Katherine</span>
        <span className="block text-right">Zhang</span>
      </h1>
      <SwipeableMobileCollage />
      <p className="text-center font-sans font-medium text-[14px] leading-[1.35] text-black">
        Product designer obsessed with digging deeper and asking &ldquo;Why&rdquo;?
      </p>
    </section>
  );
}

function Hero() {
  return (
    /* Figma's header band (node 983:2969), ported in full — the exact
       copy from the design (including its "Based in San Fransico"
       spelling), not a version trimmed down to only what the real site
       already said. Tucks up under the real <header> (via
       -mt-header/pt-header, using the shared token in globals.css) so its
       wash and hairlines run seamlessly behind the transparent nav, the
       same trick app/preview/about already uses for its own band. */
    <section
      className={`relative mx-auto w-full max-w-frame overflow-hidden md:-mt-header md:pt-header max-md:hidden ${styles.band}`}
    >
      <div className={`${styles.wash} absolute inset-0`} />

      <div className={styles.bandRules} aria-hidden>
        <div className={styles.hRule} style={{ top: "var(--spacing-header)" }} />
        <div className={styles.hRule} style={{ bottom: 0 }} />
        <div className={styles.rule} style={{ left: "var(--gutter)" }} />
        <div className={styles.rule} style={{ right: "var(--gutter)" }} />
      </div>

      {/* "Profile Icon" */}
      <Accent
        style={
          {
            left: "calc(42.86% + 72.86px)",
            top: "var(--spacing-header)",
            width: 162,
            height: 145,
            "--from": 0.24,
            "--to": 0.08,
          } as React.CSSProperties
        }
      />
      {/* "Profile Picture" */}
      <Accent
        style={
          {
            left: "calc(71.43% - 20.57px)",
            top: "var(--spacing-header)",
            width: 343,
            height: 270,
            "--from": 0.3,
            "--to": 0.1,
          } as React.CSSProperties
        }
      />
      {/* "Social Media Icon" — Figma's own top:298 was measured against
          its 53px header; offset by the same +245px from this site's
          taller (74px) one, via --spacing-header, so it tracks if that
          value ever changes again. */}
      <Accent
        style={
          {
            left: "calc(57.14% + 29.14px)",
            top: "calc(var(--spacing-header) + 245px)",
            width: 156,
            height: 213,
            "--from": 0.18,
            "--to": 0.06,
          } as React.CSSProperties
        }
      />

      <div
        className="relative z-10 px-page pb-20"
        style={{
          paddingTop: "calc(var(--spacing-header) + clamp(48px, 7.99vw, 115px))",
        }}
      >
        <h1>
          <NameTitle />
        </h1>
        <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <p className="font-sans text-[20px] leading-[1.35] text-black">
            Product designer @ Solace
          </p>
          <p className="font-sans text-[16px] leading-[1.35] text-black">
            Based in San Fransico
          </p>
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
