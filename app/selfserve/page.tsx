import Image from "next/image";

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
    <div className="mx-auto w-full max-w-frame px-page pt-[60px] pb-[60px] text-black max-md:px-6 max-md:pt-10 max-md:pb-12">
      <TitleSection />
      <Hero />
      <Body />
    </div>
  );
}

function TitleSection() {
  return (
    <section className="flex items-start justify-between gap-10 pb-[66px] max-md:flex-col max-md:gap-8 max-md:pb-10">
      <div className="flex w-[526px] flex-col gap-6 max-md:w-full">
        <div className="flex items-baseline gap-[15px]">
          <Image
            src="/images/selfserve/logo.png"
            alt=""
            width={39}
            height={81}
            className="h-[81px] w-auto max-md:h-[56px]"
          />
          <h1
            className="font-sans font-bold leading-none tracking-[0.01em] max-md:text-[56px]"
            style={{ fontSize: 83.25, color: COLORS.selfserveGreen }}
          >
            SelfServe
          </h1>
        </div>
        <p className="font-sans text-[24px] leading-[1.35] max-md:text-[18px]">
          Unify fragmented hotel operations into one intelligent, automated
          platform.
        </p>
      </div>

      <div className="flex shrink-0 items-start gap-4 pt-1 max-md:flex-wrap max-md:gap-4 max-md:pt-0">
        <InfoColumn title="My Role">
          <p>Design Lead</p>
        </InfoColumn>
        <InfoColumn title="The Team">
          <p>Generate</p>
          <p>(PM</p>
          <p>Engineers,</p>
          <p>Product Designers)</p>
        </InfoColumn>
        <InfoColumn title="Duration">
          <p>Jan 2026 - April 2026</p>
        </InfoColumn>
        <InfoColumn title="Skills">
          <p>AI Integration</p>
          <p>Systems Design</p>
          <p>Figma</p>
        </InfoColumn>
      </div>
    </section>
  );
}

function InfoColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-[140px] flex-col gap-2 text-subtext">
      <p className="text-gray-2">{title}</p>
      <div className="flex flex-col">{children}</div>
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

function Body() {
  return (
    <div className="mx-auto mt-[66px] w-full max-w-[1076px] flex flex-col max-md:mt-10">
      <Overview />
      <Problem />
      <CompetitiveAnalysis />
      <AIAdvantages />
      <AIFlowchart />
      <Vision />
      <Solution />
      <Lessons />
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center border-b border-gray-1 py-2">
      <p className="font-sans font-medium text-h3 whitespace-nowrap">{children}</p>
    </div>
  );
}

function Overview() {
  return (
    <section className="flex w-full flex-col items-end gap-4">
      <div className="flex w-full flex-col items-start">
        <SectionHeading>Overview</SectionHeading>
      </div>
      <div className="flex w-full flex-col gap-[54px]">
        <p className="text-body">
          SelfServe is a property management system built for boutique hotels.
          Generate partnered with SelfServe to design a platform that brings
          reservations, housekeeping, guest services, and billing into one
          place—with AI automation to handle the repetitive work.
        </p>
        <div className="flex w-full items-start gap-6">
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
    <div className="flex flex-1 flex-col gap-3">
      <div className="flex items-center gap-4 text-h3 font-medium whitespace-nowrap">
        <span>{number}</span>
        <span>{title}</span>
      </div>
      <p className="text-body">{children}</p>
    </div>
  );
}

function Problem() {
  return (
    <section className="mt-[150px] flex w-full flex-col items-center gap-12 pb-6">
      <div className="flex w-full flex-col items-start gap-4">
        <SectionHeading>The Problem</SectionHeading>
        <div className="flex w-full flex-col gap-2">
          <p className="text-body">
            The boutique hotel management landscape is{" "}
            <span className="font-semibold italic">fragmented</span>
          </p>
          <p className="text-body">
            Boutique hotels juggle 5+ disconnected platforms. One for
            reservations, another for housekeeping, another for billing etc.
            etc. Staff waste hours switching between tools, manually entering
            the same data repeatedly, and hunting for information across
            systems.
          </p>
        </div>
      </div>

      <ToolsCluster />
    </section>
  );
}

function ToolsCluster() {
  return (
    <div
      className="relative h-[405px] w-[671px] overflow-hidden rounded-lg"
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

function CompetitiveAnalysis() {
  const issues = [
    "No AI support for repetitive tasks",
    "Poor mobile experience for on-the-go staff",
    "Siloed systems that don't talk to each other",
    "Manual data entry required across platforms",
  ];
  return (
    <section className="mt-[150px] flex w-full flex-col items-center gap-8 pt-6 pb-[80px]">
      <div className="flex w-full flex-col items-start gap-4">
        <SectionHeading>Competitive Analysis</SectionHeading>
        <p className="text-body">
          I analyzed top property management systems (Opera, Maestro, RoomKey)
          and identified key gaps:
        </p>
      </div>
      <div className="flex h-[189px] w-[992px] items-start gap-4">
        {issues.map((issue) => (
          <div
            key={issue}
            className="flex h-full flex-1 items-end rounded-[4px] px-4 py-6"
            style={{
              backgroundColor: COLORS.mint,
              border: `1px solid ${COLORS.emerald}`,
            }}
          >
            <p className="font-medium text-body">{issue}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function AIAdvantages() {
  return (
    <section className="mt-[150px] flex items-center justify-center px-[10px] py-6">
      <p className="font-medium text-[28px] leading-[1.35] whitespace-nowrap">
        ✨ AI can turn manual busywork into automated workflows
      </p>
    </section>
  );
}

function AIFlowchart() {
  return (
    <section className="flex flex-col items-center gap-[120px] pb-16">
      <div className="flex items-start justify-center gap-[140px]">
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
      <div className="flex w-full flex-col gap-[1.35rem] text-body">
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
    </section>
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
      className="flex flex-col items-center gap-[50px]"
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
    <section className="mx-auto mt-[150px] flex w-[895px] flex-col gap-4 rounded-[4px] p-6"
      style={{ backgroundColor: COLORS.mint }}
    >
      <div className="inline-flex items-center border-b border-gray-1 py-2 self-start">
        <p className="font-medium text-h3 whitespace-nowrap">OUR VISION</p>
      </div>
      <p className="text-[20px] leading-[1.35]">
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
    },
  ];

  return (
    <section className="mt-[150px] flex w-full flex-col items-start gap-8">
      <SectionHeading>The Solution</SectionHeading>
      <div className="flex w-full flex-col gap-[310px] max-md:gap-16">
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
}: {
  title: string;
  description: string;
  videoOnRight: boolean;
  videoSrc?: string;
}) {
  const text = (
    <div className="flex w-[343px] shrink-0 flex-col gap-3 text-body max-md:w-full">
      <p className="font-medium">{title}</p>
      <p>{description}</p>
    </div>
  );
  const video = (
    <div className="relative w-[707px] shrink-0 max-md:w-full">
      <VideoPlaceholder aspectRatio="707/500" src={videoSrc} />
      {videoSrc ? null : (
        <p className="pointer-events-none absolute inset-0 flex items-center justify-center text-h3 font-medium">
          video demo goes here
        </p>
      )}
    </div>
  );
  return (
    <div className="flex w-full items-end gap-6 max-md:flex-col max-md:items-start max-md:gap-4">
      {videoOnRight ? (
        <>
          {text}
          {video}
        </>
      ) : (
        <>
          {video}
          {text}
        </>
      )}
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
    <section className="mt-[150px] flex w-full flex-col items-start gap-6">
      <SectionHeading>What I Learned</SectionHeading>
      <div className="flex w-full flex-col gap-10 text-body">
        {lessons.map((l, i) => (
          <div key={l.number} className="flex items-start gap-6">
            {/* Dot + connecting line column */}
            <div className="relative w-2 shrink-0 self-stretch pt-[7px]">
              <div className="size-2 rounded-full bg-black" />
              {i < lessons.length - 1 ? (
                <div
                  className="absolute left-1/2 w-px -translate-x-1/2 bg-black"
                  style={{ top: 15, bottom: -47 }}
                />
              ) : null}
            </div>
            {/* Lesson content */}
            <div className="flex flex-1 flex-col gap-4">
              <div className="flex items-center gap-4 font-medium">
                <span>{l.number}</span>
                <span>{l.headline}</span>
              </div>
              <p>{l.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
