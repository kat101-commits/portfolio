import Image from "next/image";

import ImageCarousel from "../components/ImageCarousel";
import SnapshotCard from "../components/SnapshotCard";

export default function About() {
  return (
    <div className="mx-auto w-full max-w-frame px-page pt-[60px] pb-[60px] max-md:px-6 max-md:pt-10 max-md:pb-12">
      <div className="mx-auto flex w-full max-w-[1260px] flex-col gap-[130px] max-md:gap-12">
        <BioAndExperience />
        <SnapshotsSection />
      </div>
    </div>
  );
}

function BioAndExperience() {
  return (
    <div className="flex flex-col gap-[86px] max-md:gap-10">
      <BioRow />
      <ExperienceRow />
    </div>
  );
}

function BioRow() {
  return (
    <section className="flex flex-col items-start gap-10 md:flex-row md:items-center md:gap-10">
      <div className="relative w-full max-w-[496px] shrink-0 overflow-hidden rounded-[2px]" style={{ aspectRatio: "523/544" }}>
        <Image
          src="/images/about/profile.png"
          alt="Katherine speaking on stage"
          fill
          sizes="(min-width: 768px) 496px, 100vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="flex w-full flex-col gap-4 text-black">
        <h1 className="font-serif text-[36px] leading-none">
          Hello! I&rsquo;m Katherine{" "}
          <span aria-hidden="true">🙈</span>
        </h1>
        <div className="flex flex-col gap-5 text-body">
          <p>
            I&rsquo;m a designer who loves the messy, early stage of building
            products, where problem-solving meets creative solutions.
          </p>
          <p>
            I came to design from an unusual place: business strategy meets
            STEM meets creativity. Growing up with two STEM parents, I learned
            to question everything and dig deeper into the scientific
            explanation. But I also spent years painting and drawing. That
            intersection, analytical and creative, strategic and
            human-centered, is where I live as a designer.
          </p>
          <p>
            At BCG, I turned research into product decisions for AI tools. At
            Generate, I led 0→1 projects where there was no roadmap yet.
          </p>
          <p>
            When I&rsquo;m not designing, I&rsquo;m cafe hopping, finding the
            next it restaurant, oil painting, or attending concerts.{" "}
            <span aria-hidden="true">🧚</span>
          </p>
        </div>
      </div>
    </section>
  );
}

const EXPERIENCE = [
  {
    role: "Contracted Designer",
    company: "Judgment Labs",
    dates: "Jan 2026 - Feb 2026",
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

function ExperienceRow() {
  return (
    <section className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-10">
      <h2 className="font-serif text-[36px] leading-none text-black shrink-0">
        Experience
      </h2>

      <ul className="flex w-full max-w-[895px] flex-col gap-6">
        {EXPERIENCE.map((e) => (
          <li
            key={e.role}
            className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between md:gap-4"
          >
            <div className="flex flex-wrap items-center gap-4 text-black">
              <span className="font-sans font-medium text-body">{e.role}</span>
              <span aria-hidden className="inline-block size-2 rounded-full bg-black" />
              <span className="font-sans text-body">{e.company}</span>
            </div>
            <span className="font-sans text-body text-black whitespace-nowrap">
              {e.dates}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SnapshotsSection() {
  return (
    <section className="flex flex-col gap-8">
      <h2 className="font-serif text-[32px] leading-none text-black tracking-[0.64px] max-md:text-[28px]">
        Snapshots of my life
      </h2>
      <div className="flex flex-col gap-20 max-md:gap-10">
        <SnapshotSubsection
          title="Generate"
          subtitle="Creating communities while designing"
        >
          <div className="max-md:hidden">
            <GenerateSnapshots />
          </div>
          <div className="md:hidden">
            <GenerateSnapshotsMobile />
          </div>
        </SnapshotSubsection>
        <SnapshotSubsection
          title="Food"
          subtitle="Am always open to trying new places"
        >
          <div className="max-md:hidden">
            <FoodSnapshots />
          </div>
          <div className="md:hidden">
            <FoodSnapshotsMobile />
          </div>
        </SnapshotSubsection>
      </div>
    </section>
  );
}

const GENERATE_SNAPSHOTS: { src: string; rotation: number }[] = [
  { src: "/images/about/snap-0.png", rotation: 1.83 },
  { src: "/images/about/snap-1.png", rotation: -6 },
  { src: "/images/about/snap-2.png", rotation: 4 },
  { src: "/images/about/snap-3.png", rotation: -3 },
  { src: "/images/about/snap-4.png", rotation: 0 },
];

const FOOD_SNAPSHOTS: { src: string; rotation: number }[] = [
  { src: "/images/about/snap-5.png", rotation: 0 },
  { src: "/images/about/snap-7.png", rotation: 5 },
  { src: "/images/about/snap-8.png", rotation: -4 },
  { src: "/images/about/snap-10.png", rotation: 6 },
  { src: "/images/about/snap-9.png", rotation: -3 },
];

function GenerateSnapshotsMobile() {
  return (
    <ImageCarousel hint="Swipe to view">
      {GENERATE_SNAPSHOTS.map((s, i) => (
        <MobileSnapshot key={i} src={s.src} rotation={s.rotation} />
      ))}
    </ImageCarousel>
  );
}

function FoodSnapshotsMobile() {
  return (
    <ImageCarousel hint="Swipe to view">
      {FOOD_SNAPSHOTS.map((s, i) => (
        <MobileSnapshot key={i} src={s.src} rotation={s.rotation} />
      ))}
    </ImageCarousel>
  );
}

function MobileSnapshot({
  src,
  rotation,
}: {
  src: string;
  rotation: number;
}) {
  return (
    <div className="flex w-full justify-center py-6">
      <SnapshotCard
        width={260}
        height={260}
        rotation={rotation}
        padding={12}
        radius={4}
      >
        <div
          className="relative h-full w-full overflow-hidden"
          style={{ borderRadius: 2 }}
        >
          <Image src={src} alt="" fill sizes="260px" className="object-cover" />
        </div>
      </SnapshotCard>
    </div>
  );
}

function SnapshotSubsection({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center gap-6 text-body">
        <span className="font-sans font-medium text-black">{title}</span>
        <span className="font-sans text-gray-2">{subtitle}</span>
      </div>
      {children}
    </div>
  );
}

function GenerateSnapshots() {
  return (
    <div className="relative h-[261px] w-[1258px] overflow-visible">
      {/* Card 1 — wide landscape with butterfly */}
      <div
        className="absolute flex items-center justify-center"
        style={{ left: 0, top: 19.57, width: 332.984, height: 204.748 }}
      >
        <SnapshotCard width={326.938} height={194.385} rotation={1.83}>
          <div
            className="relative h-full w-full overflow-hidden"
            style={{ borderRadius: 2 }}
          >
            <Image
              src="/images/about/snap-0.png"
              alt=""
              fill
              sizes="327px"
              className="object-cover"
            />
          </div>
        </SnapshotCard>
        <Butterfly
          className="absolute"
          style={{ left: 96, top: -24, transform: "rotate(0deg)" }}
          width={56}
          height={106}
        />
      </div>

      {/* Card 2 — small portrait, tilted left */}
      <div
        className="absolute flex items-center justify-center"
        style={{ left: 322.51, top: -17.51, width: 230.751, height: 231.319 }}
      >
        <SnapshotCard width={193.882} height={194.623} rotation={-12.25}>
          <div
            className="relative h-full w-full overflow-hidden"
            style={{ borderRadius: 2 }}
          >
            <Image
              src="/images/about/snap-1.png"
              alt=""
              fill
              sizes="194px"
              className="object-cover"
            />
          </div>
        </SnapshotCard>
      </div>

      {/* Card 3 — portrait, tilted right */}
      <div
        className="absolute flex items-center justify-center"
        style={{ left: 486, top: 38, width: 222.387, height: 236.738 }}
      >
        <SnapshotCard width={172.973} height={194.61} rotation={17.03}>
          <div
            className="relative h-full w-full overflow-hidden"
            style={{ borderRadius: 2 }}
          >
            <Image
              src="/images/about/snap-2.png"
              alt=""
              fill
              sizes="173px"
              className="object-cover"
            />
          </div>
        </SnapshotCard>
      </div>

      {/* Card 4 — landscape, tilted left */}
      <div
        className="absolute flex items-center justify-center"
        style={{ left: 669, top: -29, width: 272.793, height: 222.743 }}
      >
        <SnapshotCard width={251.856} height={194.789} rotation={-6.68}>
          <div
            className="relative h-full w-full overflow-hidden"
            style={{ borderRadius: 2 }}
          >
            <Image
              src="/images/about/snap-3.png"
              alt=""
              fill
              sizes="252px"
              className="object-cover"
            />
          </div>
        </SnapshotCard>
      </div>

      {/* Card 5 — wide landscape, no rotation, with flipped butterfly */}
      <SnapshotCard
        width={327.888}
        height={194.87}
        rotation={0}
        className="absolute left-[930px] top-[29px]"
      >
        <div
          className="relative h-full w-full overflow-hidden"
          style={{ borderRadius: 2 }}
        >
          <Image
            src="/images/about/snap-4.png"
            alt=""
            fill
            sizes="328px"
            className="object-cover"
          />
        </div>
      </SnapshotCard>
      <Butterfly
        className="absolute"
        style={{ left: 1050, top: 1, transform: "scaleX(-1)" }}
        width={63}
        height={106}
      />
    </div>
  );
}

function FoodSnapshots() {
  return (
    <div className="relative h-[277px] w-[1258px] overflow-visible">
      {/* Card 1 — landscape with rotated photo + secondary photo overlap */}
      <SnapshotCard
        width={342.686}
        height={228.457}
        padding={10.133}
        radius={3.685}
        className="absolute left-[16px] top-[24px]"
      >
        <div
          className="relative h-full w-full overflow-hidden"
          style={{ borderRadius: 1 }}
        >
          <Image
            src="/images/about/snap-5.png"
            alt=""
            fill
            sizes="343px"
            className="object-cover"
          />
        </div>
      </SnapshotCard>
      {/* Secondary photo poking out top-left of Card 1 */}
      <div
        className="absolute overflow-hidden"
        style={{
          left: 16 - 38,
          top: 24 - 38,
          width: 127.187,
          height: 83.548,
        }}
      >
        <Image
          src="/images/about/snap-6.png"
          alt=""
          fill
          sizes="127px"
          className="object-cover"
        />
      </div>

      {/* Card 2 — portrait, tilted right */}
      <div
        className="absolute flex items-center justify-center"
        style={{ left: 338, top: -14, width: 228.817, height: 235.892 }}
      >
        <SnapshotCard width={186.915} height={196.616} radius={4.4} padding={11} rotation={13.96}>
          <div
            className="relative h-full w-full overflow-hidden"
            style={{ borderRadius: 2 }}
          >
            <Image
              src="/images/about/snap-7.png"
              alt=""
              fill
              sizes="165px"
              className="object-cover"
            />
          </div>
        </SnapshotCard>
      </div>

      {/* Card 3 — square-ish, tilted left */}
      <div
        className="absolute flex items-center justify-center"
        style={{ left: 525, top: 47, width: 235.758, height: 232.355 }}
      >
        <SnapshotCard width={209.2} height={205.2} radius={4.84} padding={12.1} rotation={-8.01}>
          <div
            className="relative h-full w-full overflow-hidden"
            style={{ borderRadius: 2 }}
          >
            <Image
              src="/images/about/snap-8.png"
              alt=""
              fill
              sizes="185px"
              className="object-cover"
            />
          </div>
        </SnapshotCard>
      </div>

      {/* Card 4 — tall portrait, tilted right, with butterfly */}
      <div
        className="absolute flex items-center justify-center"
        style={{ left: 728, top: -14, width: 226.684, height: 270.476 }}
      >
        <SnapshotCard width={177} height={236} radius={4.4} padding={11} rotation={13.34}>
          <div
            className="relative h-full w-full overflow-hidden"
            style={{ borderRadius: 2 }}
          >
            <Image
              src="/images/about/snap-10.png"
              alt=""
              fill
              sizes="155px"
              className="object-cover"
            />
          </div>
        </SnapshotCard>
        <Butterfly
          className="absolute"
          style={{ left: 100, top: -3, transform: "scaleX(-1) rotate(8deg)" }}
          width={37}
          height={63}
        />
      </div>

      {/* Card 5 — wide landscape, slight tilt left */}
      <div
        className="absolute flex items-center justify-center"
        style={{ left: 901, top: 24, width: 345.98, height: 246.713 }}
      >
        <SnapshotCard width={326} height={215} radius={4} padding={10} rotation={-5.78}>
          <div
            className="relative h-full w-full overflow-hidden"
            style={{ borderRadius: 2 }}
          >
            <Image
              src="/images/about/snap-9.png"
              alt=""
              fill
              sizes="306px"
              className="object-cover"
            />
          </div>
        </SnapshotCard>
      </div>
    </div>
  );
}

function Butterfly({
  className,
  style,
  width,
  height,
}: {
  className?: string;
  style?: React.CSSProperties;
  width: number;
  height: number;
}) {
  return (
    <div className={className} style={{ width, height, ...style }}>
      <Image
        src="/images/about/butterfly.png"
        alt=""
        width={width}
        height={height}
        sizes={`${width}px`}
        className="h-full w-full object-contain"
      />
    </div>
  );
}
