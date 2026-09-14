import Image from "next/image";

import InfoColumn from "../components/InfoColumn";
import SectionHeading from "../components/SectionHeading";
import VideoPlaceholder from "../components/VideoPlaceholder";

const COLORS = {
  selfserveGreen: "#0e361e",
  mint: "#eafbe1",
  emerald: "#009516",
  beigeBg: "#e6ded6",
  beigeBorder: "#5d5a54",
  greenBg: "#e5f2db",
  greenBorder: "#27452e",
  toolsBg: "#fafafa",
};

export default function SelfServe() {
  return (
    <div className="mx-auto w-full max-w-frame px-page pt-[60px] pb-[180px] text-black max-md:px-6 max-md:pt-10 max-md:pb-12">
      <div className="mx-auto w-full max-w-[1076px]">
        <Hero />
      </div>
      <div className="mx-auto mt-[89px] flex w-full max-w-[1076px] flex-col gap-[200px] max-md:mt-10 max-md:gap-16">
        <div className="flex flex-col gap-[140px] max-md:gap-12">
          <div className="flex flex-col gap-[80px] max-md:gap-8">
            <TitleSection />
            <Overview />
          </div>
          <Problem />
          <CompetitiveAndAI />
        </div>
        <Vision />
        <Solution />
        <Lessons />
      </div>
    </div>
  );
}

function Hero() {
  return (
    <VideoPlaceholder
      aspectRatio="1260/678"
      className="rounded-[2px]"
      src="/videos/selfserve-hero.mp4"
    />
  );
}

function TitleSection() {
  return (
    <section className="flex items-start justify-between gap-10 max-md:flex-col max-md:gap-8">
      <div className="flex w-[526px] flex-col items-start gap-6 max-md:w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/SelfServe_Logo.svg"
          alt="SelfServe"
          className="h-[81px] w-auto self-start max-md:h-[56px]"
        />
        <p className="font-sans text-left text-[24px] leading-[1.35] max-md:text-[18px]">
          Unify fragmented hotel operations into one intelligent, automated
          platform.
        </p>
      </div>

      <div className="flex shrink-0 items-start gap-4 pt-1 max-md:flex-wrap max-md:gap-4 max-md:pt-0">
        <InfoColumn title="My Role" width={140}>
          <p>Design Lead</p>
        </InfoColumn>
        <InfoColumn title="The Team" width={140}>
          <p>Generate</p>
          <p>(PM</p>
          <p>Engineers,</p>
          <p>Product Designers)</p>
        </InfoColumn>
        <InfoColumn title="Duration" width={140}>
          <p>Jan 2026 - April 2026</p>
        </InfoColumn>
        <InfoColumn title="Skills" width={140}>
          <p>AI Integration</p>
          <p>Systems Design</p>
          <p>Figma</p>
        </InfoColumn>
      </div>
    </section>
  );
}

function Overview() {
  return (
    <section className="flex w-full flex-col items-end gap-4">
      <div className="flex w-full flex-col items-start">
        <SectionHeading>Overview</SectionHeading>
      </div>
      <div className="flex w-full flex-col gap-[48px]">
        <p className="text-body">
          SelfServe is a property management system built for boutique hotels.
          Generate partnered with SelfServe to design a platform that brings
          reservations, housekeeping, guest services, and billing into one
          place—with AI automation to handle the repetitive work.
        </p>
        <div className="flex w-full items-start gap-[54px] max-md:flex-col max-md:gap-8">
          <OverviewPoint number="[ 1 ]" title="Design">
            Designed web and mobile experiences focused on helping hotel staff
            manage tasks seamlessly
          </OverviewPoint>
          <OverviewPoint number="[ 2 ]" title="Leadership & Balance">
            Led design on the largest team I&rsquo;ve worked with (15 people
            total, 5 designers) and delivered both a web app and mobile app in
            4 months.
          </OverviewPoint>
          <OverviewPoint number="[ 3 ]" title="Cross Functional Work">
            Partnered closely with engineers and PM to balance technical
            feasibility with user needs, ensuring designs could actually ship
            within our timeline.
          </OverviewPoint>
        </div>
      </div>
    </section>
  );
}

function OverviewPoint({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <div className="flex items-center gap-4 text-body font-medium whitespace-nowrap">
        <span>{number}</span>
        <span>{title}</span>
      </div>
      <p className="text-body text-gray-2">{children}</p>
    </div>
  );
}

function Problem() {
  return (
    <section className="flex w-full flex-col items-center gap-4">
      <div className="flex w-full flex-col items-start">
        <SectionHeading>The Problem</SectionHeading>
      </div>
      <div className="flex w-full items-center gap-[80px] max-md:flex-col max-md:gap-8">
        <div className="flex flex-1 flex-col gap-[40px] text-body">
          <p>
            The boutique hotel management landscape is{" "}
            <span className="font-semibold italic">fragmented</span>
          </p>
          <p>
            Boutique hotels juggle 5+ disconnected platforms. One for
            reservations, another for housekeeping, another for billing etc.
            etc. Staff waste hours switching between tools, manually entering
            the same data repeatedly, and hunting for information across
            systems.
          </p>
        </div>
        <ToolsCluster />
      </div>
      <MobileToolsList />
    </section>
  );
}

// On mobile, the tools "wheel" turns into a simple vertical list so the
// content still reads. Hidden on desktop where <ToolsCluster /> renders.
function MobileToolsList() {
  const tools = [
    { name: "Reservations", product: "BookingTool Pro" },
    { name: "Billing", product: "PaymentFlow" },
    { name: "Housekeeping", product: "CleanTrack" },
    { name: "Guest Services", product: "GuestHub" },
    { name: "Maintenance", product: "FixIt Manager" },
    { name: "Food & Bev", product: "RestaurantOS" },
  ];
  return (
    <div className="hidden w-full flex-col gap-3 max-md:flex">
      {tools.map((t) => (
        <div
          key={t.name}
          className="flex flex-col items-center gap-1 rounded-[4px] px-4 py-3"
          style={{
            backgroundColor: COLORS.mint,
            border: `0.5px solid ${COLORS.emerald}`,
          }}
        >
          <p className="text-body font-medium">{t.name}</p>
          <p className="text-subtext">{t.product}</p>
        </div>
      ))}
    </div>
  );
}

function ToolsCluster() {
  return (
    <div
      className="relative h-[405px] w-[671px] shrink-0 overflow-hidden rounded-lg max-md:hidden"
      style={{ backgroundColor: COLORS.toolsBg }}
    >
      <div className="absolute left-[270px] top-[137px] size-[132px]">
        <Image
          src="/images/selfserve/face.png"
          alt=""
          fill
          sizes="132px"
          className="object-cover"
        />
      </div>
      <ToolBox name="Reservations" product="BookingTool Pro" className="absolute left-[115px] top-[56px]" />
      <ToolBox name="Billing" product="PaymentFlow" className="absolute left-[417px] top-[55px]" />
      <ToolBox name="Housekeeping" product="CleanTrack" className="absolute left-[34px] top-[167px]" />
      <ToolBox name="Guest Services" product="GuestHub" className="absolute left-[482px] top-[167px]" />
      <ToolBox name="Maintenance" product="FixIt Manager" className="absolute left-[125px] top-[295px]" />
      <ToolBox name="Food & Bev" product="RestaurantOS" className="absolute left-[417px] top-[295px]" />
    </div>
  );
}

function ToolBox({
  name,
  product,
  className,
}: {
  name: string;
  product: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center gap-1 rounded-[4px] px-4 py-2 ${className ?? ""}`}
      style={{
        backgroundColor: COLORS.mint,
        border: `0.5px solid ${COLORS.emerald}`,
      }}
    >
      <p className="text-body font-medium whitespace-nowrap">{name}</p>
      <p className="text-subtext whitespace-nowrap">{product}</p>
    </div>
  );
}

// Competitive analysis, the AI-advantage headline, and the before/after
// flowchart all share one continuous 100px rhythm in the redesign, rather
// than each being its own section with independent margins.
function CompetitiveAndAI() {
  return (
    <section className="flex w-full flex-col items-center gap-[100px]">
      <CompetitiveAnalysis />
      <AIAdvantageHeadline />
      <AIFlowchart />
    </section>
  );
}

function CompetitiveAnalysis() {
  const issues = [
    "No AI support for repetitive tasks",
    "Poor mobile experience for on-the-go staff",
    "Siloed systems that don't talk to each other",
    "Manual data entry required across platforms",
  ];
  return (
    <>
      <div className="flex w-full flex-col items-start gap-4">
        <SectionHeading>Competitive Analysis</SectionHeading>
        <p className="text-body">
          I analyzed top property management systems (Opera, Maestro, RoomKey)
          and identified key gaps:
        </p>
      </div>
      <div className="flex h-[189px] w-[992px] items-start gap-[40px] max-md:h-auto max-md:w-full max-md:flex-col">
        {issues.map((issue) => (
          <div
            key={issue}
            className="flex h-full flex-1 items-end rounded-[4px] px-4 py-6 max-md:h-auto max-md:w-full"
            style={{
              backgroundColor: COLORS.mint,
              border: `1px solid ${COLORS.emerald}`,
            }}
          >
            <p className="font-medium text-body">{issue}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function AIAdvantageHeadline() {
  return (
    <p className="text-center font-medium text-[24px] leading-[1.35] whitespace-nowrap max-md:whitespace-normal max-md:text-[20px]">
      ✨ AI can turn manual busywork into automated workflows
    </p>
  );
}

function AIFlowchart() {
  return (
    <>
      <div className="flex items-start justify-center gap-[140px] max-md:flex-col max-md:items-center max-md:gap-12">
        <FlowchartColumn
          title="Before: Manual entry"
          variant="before"
          steps={[
            { description: "Guest calls front desk", detail: "“Room 304 needs towels”" },
            { description: "Staff writes it down", detail: "On paper or in notes" },
            { description: "Task gets lost", detail: "Cluttered amongst everything else" },
          ]}
          finalLabel="Gets forgotten or forever to be assigned"
          width={288}
        />
        <FlowchartColumn
          title="After: AI automation"
          variant="after"
          steps={[
            { description: "Guest calls front desk", detail: "“Room 304 needs towels”" },
            { description: "Staff types it in SelfServe", detail: "On web or mobile" },
            { description: "AI creates task", detail: "Auto-fills & assigns a person" },
          ]}
          finalLabel="Task logged & tracked"
          width={239}
        />
      </div>
      <div className="flex w-[667px] max-w-full flex-col gap-[1.35rem] text-body">
        <p>
          Hotel staff spend 40% of their time on repetitive admin
          tasks—updating reservation statuses, logging housekeeping notes,
          reconciling bills.
        </p>
        <p>
          These tasks follow predictable patterns, making them perfect
          candidates for AI automation.
        </p>
      </div>
    </>
  );
}

function FlowchartColumn({
  title,
  variant,
  steps,
  finalLabel,
  width,
}: {
  title: string;
  variant: "before" | "after";
  steps: { description: string; detail: string }[];
  finalLabel: string;
  width: number;
}) {
  const bg = variant === "before" ? COLORS.beigeBg : COLORS.greenBg;
  const border =
    variant === "before" ? COLORS.beigeBorder : COLORS.greenBorder;
  return (
    <div
      className="flex flex-col items-center gap-[48px]"
      style={{ width }}
    >
      <p className="text-center font-medium text-body">{title}</p>
      <div className="flex w-full flex-col items-center gap-[10px]">
        {steps.map((step, idx) => (
          <div key={step.description} className="contents">
            <div
              className="flex w-full flex-col items-center justify-center gap-1 rounded-[4px] px-4 py-3 text-center"
              style={{ backgroundColor: bg, border: `1px solid ${border}` }}
            >
              <p className="font-medium text-body">{step.description}</p>
              <p className="text-body">{step.detail}</p>
            </div>
            {idx < steps.length - 1 ? <FlowchartArrow /> : null}
          </div>
        ))}
        <FlowchartArrow />
        <p className="text-center font-semibold text-body">{finalLabel}</p>
      </div>
    </div>
  );
}

function FlowchartArrow() {
  return (
    <Image
      src="/images/selfserve/arrow.svg"
      alt=""
      width={15}
      height={51}
      className="h-[49px] w-[15px]"
    />
  );
}

function Vision() {
  return (
    <section
      className="mx-auto flex w-[895px] flex-col gap-4 rounded-[4px] p-6 max-md:w-full"
      style={{ backgroundColor: COLORS.mint }}
    >
      <div className="inline-flex items-center border-b border-gray-1 py-2 self-start">
        <p className="font-medium text-h3 whitespace-nowrap">OUR VISION</p>
      </div>
      <p className="text-[20px] leading-[1.35] max-md:text-[16px]">
        A unified platform that instead of another tool hotels have to manage,
        SelfServe becomes the single source of truth—automatically updating
        reservations, triggering housekeeping tasks, and syncing billing in
        real time.
      </p>
    </section>
  );
}

function Solution() {
  const features = [
    {
      title: "Feature 1: AI-Powered Task Creation",
      description:
        'Staff type plain-language requests like "Room 304 needs towels restocked" and SelfServe automatically creates the task',
      videoOnRight: true,
      videoSrc: "/videos/selfserve-feature-1.mp4",
    },
    {
      title: "Feature 2: Room Management at a Glance",
      description:
        "View all rooms, their status, and active tasks in one organized list. Filter by availability, occupancy, or urgent tasks. Staff can quickly see which rooms need attention, who's assigned, and what's pending—no hunting through multiple screens.",
      videoOnRight: false,
      videoSrc: "/videos/selfserve-feature-2.mp4",
    },
    {
      title: "Feature 3: Mobile-First for On-the-Go Staff",
      description:
        "Housekeeping and maintenance staff can manage tasks, update room statuses, and communicate with front desk—all from their phones while moving through the property.",
      videoOnRight: true,
      videoSrc: "/videos/selfserve-feature-3.mp4",
      videoFit: "contain" as const,
    },
  ];

  return (
    <section className="flex w-full flex-col items-start gap-8">
      <SectionHeading>The Solution</SectionHeading>
      <div className="flex w-full flex-col gap-[334px] max-md:gap-16">
        {features.map((f) => (
          <FeatureRow key={f.title} {...f} />
        ))}
      </div>
    </section>
  );
}

function FeatureRow({
  title,
  description,
  videoOnRight,
  videoSrc,
  videoFit = "cover",
  videoAspectRatio = "707/500",
  videoWidthClass = "w-[707px]",
}: {
  title: string;
  description: string;
  videoOnRight: boolean;
  videoSrc?: string;
  videoFit?: "cover" | "contain";
  videoAspectRatio?: string;
  videoWidthClass?: string;
}) {
  // DOM order is always [video, text] so on mobile (flex-col) the video
  // appears above its caption. On desktop, flex `order` reverses the row
  // when the design wants the video on the right.
  const textOrder = videoOnRight ? "md:order-1" : "md:order-2";
  const videoOrder = videoOnRight ? "md:order-2" : "md:order-1";
  const text = (
    <div
      className={`flex w-[343px] shrink-0 flex-col gap-3 text-body max-md:w-full ${textOrder}`}
    >
      <p className="font-medium">{title}</p>
      <p className="text-gray-2">{description}</p>
    </div>
  );
  const video = (
    <div
      className={`relative shrink-0 max-md:w-full ${videoWidthClass} ${videoOrder}`}
    >
      <VideoPlaceholder
        aspectRatio={videoAspectRatio}
        src={videoSrc}
        videoFit={videoFit}
      />
      {videoSrc ? null : (
        <p className="pointer-events-none absolute inset-0 flex items-center justify-center text-h3 font-medium">
          video demo goes here
        </p>
      )}
    </div>
  );
  return (
    <div className="flex w-full items-end gap-6 max-md:flex-col max-md:items-start max-md:gap-4">
      {video}
      {text}
    </div>
  );
}

function Lessons() {
  const lessons = [
    {
      number: "[ 1 ]",
      headline: "Engineering collaboration needs to happen earlier than you think",
      detail:
        "Working closely with engineers was critical, but we still discovered constraints too late—features we'd designed weren't feasible within our timeline. Starting technical conversations during research, not just at handoff, would have saved us from rebuilding work we'd already invested in.",
    },
    {
      number: "[ 2 ]",
      headline: "Domain knowledge gaps require extra upfront alignment",
      detail:
        'None of us had hotel management experience. We spent significant time aligning on terminology and workflows—what does "turnover" mean? How does housekeeping communicate with front desk? For complex domains, building shared understanding across the team is as important as understanding the user.',
    },
    {
      number: "[ 3 ]",
      headline: "Leading a large team means constant prioritization",
      detail:
        "As design lead for 5 designers building web and mobile in 4 months, not everything could ship in v1. Balancing feature scope, team capacity, and client expectations required constant trade-offs. Learning to make those calls—and communicate them clearly—was as much a part of the role as the design work itself.",
    },
  ];

  return (
    <section className="mt-[24px] flex w-full flex-col items-start gap-6">
      <SectionHeading>What I Learned</SectionHeading>
      <div className="grid w-full grid-cols-2 gap-x-[40px] gap-y-[40px] max-md:grid-cols-1">
        {lessons.map((l) => (
          <div key={l.number} className="flex flex-col gap-2">
            <div className="flex items-center gap-4 font-medium">
              <span>{l.number}</span>
              <span>{l.headline}</span>
            </div>
            <p className="text-subtext text-gray-2">{l.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
