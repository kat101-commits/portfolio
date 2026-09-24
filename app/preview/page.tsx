import Image from "next/image";
import Link from "next/link";

import ProjectCard from "../components/ProjectCard";
import VideoPlaceholder from "../components/VideoPlaceholder";
import NameTitle from "../components/NameTitle";

const GRID_LINES_X = [90, 720, 1350];

export default function PreviewHome() {
  return (
    <div className="relative mx-auto w-full max-w-frame max-md:hidden">
      <GridLines />
      <Hero />
      <ExperienceGrid />
      <PreviewFooter />
    </div>
  );
}

function GridLines() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {GRID_LINES_X.map((x) => (
        <div
          key={x}
          className="absolute top-0 bottom-0 w-px bg-[#d5ddff]"
          style={{ left: x }}
        />
      ))}
    </div>
  );
}

function Hero() {
  return (
    <section className="relative h-[492px] w-full overflow-hidden">
      <HeaderTexture />
      <GradientBlock
        style={{ left: "calc(42.86% + 72.86px)", top: 53, width: 162, height: 145 }}
        fromOpacity={0.24}
        toOpacity={0.08}
      />
      <GradientBlock
        style={{ left: "calc(71.43% - 20.57px)", top: 53, width: 343, height: 270 }}
        fromOpacity={0.3}
        toOpacity={0.1}
      />
      <GradientBlock
        style={{ left: "calc(57.14% + 29.14px)", top: 298, width: 156, height: 213 }}
        fromOpacity={0.18}
        toOpacity={0.06}
      />

      <h1 className="relative z-10 px-page pt-[130px]">
        <NameTitle />
      </h1>
      <p className="relative z-10 px-page pt-6 font-sans text-[20px] text-black">
        Product designer @ Solace
      </p>
      <p className="absolute left-[calc(53.57%-0.43px)] top-[321px] z-10 -translate-x-1/2 whitespace-nowrap font-sans font-medium text-[16px] text-black">
        Based in San Francisco
      </p>
    </section>
  );
}

function HeaderTexture() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        backgroundImage:
          "repeating-linear-gradient(to bottom, #d5ddff 0px, #d5ddff 1px, transparent 1px, transparent 82px)",
        opacity: 0.5,
      }}
    />
  );
}

function GradientBlock({
  style,
  fromOpacity,
  toOpacity,
}: {
  style: React.CSSProperties;
  fromOpacity: number;
  toOpacity: number;
}) {
  return (
    <div
      className="pointer-events-none absolute"
      style={{
        ...style,
        background: `linear-gradient(to bottom, rgba(243,33,117,${fromOpacity}) 7.2%, rgba(255,236,244,${toOpacity}))`,
      }}
    />
  );
}

function ExperienceGrid() {
  return (
    <section className="relative z-10 w-full px-page pb-20 pt-10">
      <div className="mx-auto grid w-full grid-cols-1 gap-x-8 gap-y-[40px] md:grid-cols-2">
        <ProjectCard
          title="BCG"
          tag="Internship 🌳"
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
          tag="Product Design 🌳"
          dateRange="Jan 2026 - April 2026"
          description="Designed a PMS for boutique hotels, unifying fragmented operations with AI-powered automation."
          href="/selfserve"
        >
          <VideoPlaceholder aspectRatio="618/460" src="/videos/selfserve.mp4" />
        </ProjectCard>

        <ProjectCard
          title="CineCircle"
          tag="Product Design 🌳"
          dateRange="Sept 2025 - Dec 2026"
          description="Built a community app for South Asian cinema fans, managing end-to-end design across 4 designers."
          href="/cinecircle"
          comingSoon={{ bg: "#fff7ef", fg: "#cc2c00" }}
        >
          <VideoPlaceholder aspectRatio="618/460" src="/videos/cinecircle.mp4" />
        </ProjectCard>

        <ProjectCard
          title="Apprenta"
          tag="Internship 🌳"
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

function PreviewFooter() {
  return (
    <footer
      className="relative z-10 flex w-full items-center justify-between border-t border-solid border-[#d5ddff] px-page py-8"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 90% 100% at 50% 0%, rgba(255,250,227,0.1), rgba(231,247,255,0.6))",
      }}
    >
      <div className="flex items-center gap-2">
        <p className="font-sans text-body text-black">Katherine Zhang</p>
        <Image
          src="/images/preview/dash-separator.svg"
          alt=""
          width={121}
          height={8}
          style={{ height: "auto" }}
        />
        <p className="font-sans text-body text-black">2026</p>
      </div>
      <div className="flex items-center gap-6 font-sans text-subtext text-black">
        <Link href="https://www.linkedin.com/">LinkedIn</Link>
        <Link href="mailto:zhangskath@gmail.com">zhangskath@gmail.com</Link>
      </div>
    </footer>
  );
}
