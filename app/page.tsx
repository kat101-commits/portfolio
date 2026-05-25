import Image from "next/image";

import PolaroidPhoto from "./components/PolaroidPhoto";
import ProjectCard from "./components/ProjectCard";
import SwipeableMobileCollage from "./components/SwipeableMobileCollage";
import VideoPlaceholder from "./components/VideoPlaceholder";

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
      <p className="text-center font-sans font-medium text-[16px] leading-[1.35] text-black">
        Product designer obsessed with digging deeper and asking &ldquo;Why&rdquo;?
      </p>
    </section>
  );
}

function Hero() {
  return (
    <section className="relative mx-auto w-full max-w-frame overflow-hidden min-h-[720px] max-md:hidden">
      {/* Title — "Katherine" anchored left, "Zhang" anchored right inside 1170px row */}
      <h1 className="relative z-0 mx-auto flex w-full max-w-[1170px] justify-between pt-[50px] font-serif font-normal leading-normal text-black text-[clamp(72px,10.235vw,147.392px)]">
        <span>Katherine</span>
        <span>Zhang</span>
      </h1>

      {/* Collage — full-width 1440 wrapper so calc(%) positions match Figma exactly */}
      <Collage />

      {/* Subtitle */}
      <p className="absolute inset-x-0 top-[627px] z-20 text-center font-sans font-medium text-[24px] text-black">
        Product designer obsessed with digging deeper and asking &ldquo;Why&rdquo;?
      </p>
    </section>
  );
}

function Collage() {
  // Each polaroid + its decorative stickers live inside ONE group wrapper so
  // they scale together on hover. Tooltip sits outside the scaling div so it
  // stays a fixed size next to the (now larger) polaroid.
  //
  // Wrapper positions match each Figma "group" bbox (offset from collage top
  // by subtracting 263 = the home-y where Group 27 starts). Child offsets
  // inside each group are pixels relative to the group wrapper's top-left.
  return (
    <div className="absolute inset-x-0 top-[161px] z-10 mx-auto h-[440px] w-[1440px] min-w-[1440px]">
      {/* — LAYER 1 (back) — Polaroid 0 (Painting), no stickers */}
      <PolaroidGroup
        left="calc(21.43% + 55.43px)"
        top={35}
        width={282.212}
        height={320.838}
        tooltip={{
          icon: "🎨",
          title: "Painting",
          body: "In another life I’d be a Painting major",
          rounded: 12,
          offsetX: 185,
          offsetY: 228,
        }}
      >
        <FlexCenter left={0} top={0} width={282.212} height={320.838}>
          <PolaroidPhoto
            src="/images/home/polaroid-0.png"
            alt=""
            width={214.201}
            height={271.322}
            rotation={16.43}
            imageStyle={{
              width: "180%",
              height: "180%",
              left: "-3%",
              top: "-25%",
            }}
          />
        </FlexCenter>
      </PolaroidGroup>

      {/* — LAYER 2 — Polaroid 5 (El Lissitzky) + sticker-near-5 */}
      <PolaroidGroup
        left="calc(71.43% - 44.57px)"
        top={60}
        width={290.208}
        height={332.505}
        tooltip={{
          icon: "🔻",
          iconRotation: 37,
          title: "El Lissitzky",
          body: "One of my favorite classes is “History of Graphic Design”",
          rounded: 16,
          offsetX: -300,
          offsetY: 218,
        }}
      >
        <FlexCenter left={0} top={0} width={290.208} height={332.505}>
          <PolaroidPhoto
            src="/images/home/polaroid-5.png"
            alt=""
            width={224.313}
            height={284.13}
            rotation={15}
            imageStyle={{
              height: "115.94%",
              left: "-3.81%",
              top: "-10.41%",
              width: "110.19%",
            }}
          />
        </FlexCenter>
        <Image
          src="/images/home/sticker-near-5.png"
          alt=""
          width={76}
          height={45}
          className="absolute"
          style={{ left: 192.78, top: 267.85 }}
        />
      </PolaroidGroup>

      {/* — LAYER 3 — Polaroid 4 (Fred Again) + paperclip + sticker-13 */}
      <PolaroidGroup
        left="calc(50% + 72px)"
        top={0}
        width={253.5}
        height={347.33}
        tooltip={{
          icon: "🎤",
          title: "Fred Again | Jan 4, 2026",
          body: "I love going to concerts and listening to music Live",
          rounded: 16,
          offsetX: -271,
          offsetY: 263,
        }}
      >
        <FlexCenter left={0} top={50.86} width={253.5} height={296.47}>
          <PolaroidPhoto
            src="/images/home/polaroid-4.png"
            alt=""
            width={205.963}
            height={260.886}
            rotation={-11.41}
          />
        </FlexCenter>
        <FlexCenter left={25.43} top={0} width={134.424} height={101.163}>
          <Image
            src="/images/home/paperclip.png"
            alt=""
            width={120}
            height={75}
            className="rotate-[-13.62deg]"
          />
        </FlexCenter>
        <Image
          src="/images/home/sticker-13.png"
          alt=""
          width={97}
          height={95}
          className="absolute rounded-[3px]"
          style={{ left: 149.39, top: 238.8 }}
        />
      </PolaroidGroup>

      {/* — LAYER 4 — Polaroid 1 (Foodie) + sale-sticker + sticker-17 + sticker-12 */}
      <PolaroidGroup
        left="calc(7.14% + 62.14px)"
        top={35}
        width={268.4}
        height={362.26}
        tooltip={{
          icon: "🍛",
          title: "Foodie",
          body: "Part-time foodie I love trying new foods and bonding over dinner",
          rounded: 16,
          offsetX: 208,
          offsetY: 190,
        }}
      >
        <FlexCenter left={0} top={46.88} width={268.4} height={315.37}>
          <PolaroidPhoto
            src="/images/home/polaroid-1.png"
            alt=""
            width={220.627}
            height={279.462}
            rotation={-10.63}
          />
        </FlexCenter>
        <Image
          src="/images/home/sale-sticker.png"
          alt=""
          width={81}
          height={60}
          className="absolute"
          style={{ left: 9.16, top: 297.85 }}
        />
        <FlexCenter left={42.25} top={0} width={109.731} height={109.731}>
          <Image
            src="/images/home/sticker-17.png"
            alt=""
            width={88}
            height={88}
            className="rotate-[-16.55deg]"
          />
        </FlexCenter>
        <Image
          src="/images/home/sticker-12.png"
          alt=""
          width={66}
          height={74}
          className="absolute"
          style={{ left: 182.04, top: 35.85 }}
        />
      </PolaroidGroup>

      {/* — LAYER 5 (front) — Polaroid 3 (Matcha) + sticker-16 */}
      <PolaroidGroup
        left={598}
        top={101}
        width={247.15}
        height={332.13}
        tooltip={{
          icon: "🍵",
          title: "Matcha",
          body: "Location: Lisbon, Portugal",
          rounded: 12,
          offsetX: 165,
          offsetY: 190,
        }}
      >
        <FlexCenter left={0} top={0} width={240.274} height={295.613}>
          <PolaroidPhoto
            src="/images/home/polaroid-3.png"
            alt=""
            width={222.44}
            height={281.757}
            rotation={3.72}
            imageStyle={{
              height: "164.4%",
              left: "-32.05%",
              top: "-27.72%",
              width: "156.24%",
            }}
          />
        </FlexCenter>
        <FlexCenter left={145.33} top={233.61} width={101.829} height={98.519}>
          <Image
            src="/images/home/sticker-16.png"
            alt=""
            width={78}
            height={69}
            className="rotate-[30deg]"
          />
        </FlexCenter>
      </PolaroidGroup>
    </div>
  );
}

function PolaroidGroup({
  left,
  top,
  width,
  height,
  tooltip,
  children,
}: {
  left: string | number;
  top: number;
  width: number;
  height: number;
  tooltip: TooltipProps;
  children: React.ReactNode;
}) {
  return (
    <div
      className="group absolute hover:z-30"
      style={{ left, top, width, height }}
    >
      <div className="relative h-full w-full origin-center transition-transform duration-300 ease-out group-hover:scale-[1.15]">
        {children}
      </div>
      <Tooltip {...tooltip} />
    </div>
  );
}

function FlexCenter({
  left,
  top,
  width,
  height,
  children,
}: {
  left: number;
  top: number;
  width: number;
  height: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className="absolute flex items-center justify-center"
      style={{ left, top, width, height }}
    >
      {children}
    </div>
  );
}

type TooltipProps = {
  icon: string;
  iconRotation?: number;
  title: string;
  body: string;
  rounded: number;
  /** Tooltip top-left position in px, relative to the polaroid wrapper. */
  offsetX: number;
  offsetY: number;
};

function Tooltip({
  icon,
  iconRotation,
  title,
  body,
  rounded,
  offsetX,
  offsetY,
}: TooltipProps) {
  return (
    <div
      className="pointer-events-none absolute z-40 w-[370px] translate-y-2 opacity-0 transition-[opacity,transform] duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100"
      style={{ left: offsetX, top: offsetY }}
      role="tooltip"
    >
      <div
        className="relative flex items-center gap-[21px] bg-[rgba(245,245,245,0.92)] px-4 py-3 backdrop-blur-[20px]"
        style={{
          borderRadius: rounded,
          boxShadow:
            "0px 8px 6px 0px rgba(0,0,0,0.06), inset 0px -1px 2px 0px rgba(255,255,255,0.15), inset 0px 1.5px 1.5px 0px rgba(255,255,255,0.3)",
        }}
      >
        <div
          className="flex size-10 shrink-0 items-center justify-center bg-[#fffcf1]"
          style={{ borderRadius: 3.36 }}
        >
          <span
            className="text-[24px] leading-none"
            style={
              iconRotation
                ? { transform: `rotate(${iconRotation}deg)` }
                : undefined
            }
          >
            {icon}
          </span>
        </div>
        <div className="flex min-w-0 flex-1 flex-col text-black">
          <div className="flex items-center justify-between gap-2 whitespace-nowrap">
            <p className="font-sans font-medium text-[16px] leading-[1.35]">
              {title}
            </p>
            <p className="font-sans text-[12px]">now</p>
          </div>
          <p className="font-sans text-[14px] leading-[1.35]">{body}</p>
        </div>
      </div>
    </div>
  );
}

function ProjectGrid() {
  return (
    <section className="mx-auto w-full max-w-frame px-page pt-[90px] pb-[220px] max-md:px-6 max-md:pt-6 max-md:pb-12">
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
          tagVariant="dark"
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
