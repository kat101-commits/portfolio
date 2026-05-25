import Image from "next/image";

import ImageGallery from "./ImageGallery";

const TASKS = [
  "Led global user research across North America, Europe, and Asia — synthesizing insights into design principles and strategic recommendations presented to managing directors.",
  "Designed Deckster features used by 9,000+ monthly users, refining visual hierarchy and information architecture while improving internal search tools.",
  "Prototyped and tested new AI-powered features, presenting product recommendations that informed BCG's GenAI product decisions.",
];

const REFLECTIONS = [
  {
    number: "[ 1 ]",
    headline: "Research as foundation, not decoration.",
    detail:
      'At BCG, "Has research been done?" was asked constantly. Design decisions needed to be backed by user research, not assumptions—and approaching problems with validated direction changed how I think about what tools need to exist and whether there’s another way outside building a new app.',
  },
  {
    number: "[ 2 ]",
    headline: "Simplification is a skill.",
    detail:
      "Designing for consultants using AI tools meant learning to prioritize and simplify overwhelming amounts of information into digestible UI/UX. What truly matters in this workflow? What's noise? For something that seems easy to do, it's quite hard.",
  },
  {
    number: "[ 3 ]",
    headline: "Does everything need to be a dashboard?",
    detail:
      "This experience has me questioning: does everything need to be a new app? Can problems be solved through a feature or by expanding something that already exists? I think about the card-like components I've created this year and how many could have been something more engaging.",
  },
];

const TEAM_TESTIMONIALS = [
  {
    avatar: "/images/bcg/face-team-1.png",
    quote:
      '"Katherine is not afraid to voice her opinion and brings a detail-oriented approach to her work. She consistently produces thoughtful, well-considered designs."',
  },
  {
    avatar: "/images/bcg/face-team-2.png",
    quote:
      '"Her openness to feedback, thoughtful questions, and collaborative mindset make her great to work with. She iterates well and naturally seeks to understand the deeper \'why\' behind a problem.."',
  },
];

export default function BCG() {
  return (
    <div className="mx-auto w-full max-w-frame px-page pt-[60px] pb-[60px] text-black max-md:px-6 max-md:pt-10 max-md:pb-12">
      <div className="mx-auto flex w-full max-w-[1250px] flex-col gap-[93px] max-md:gap-12">
        <TitleAndHero />
        <OverviewAndGallery />
        <Reflections />
        <Testimonials />
      </div>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center border-b border-gray-1 pb-2">
      <p className="font-sans font-medium text-h3 whitespace-nowrap">
        {children}
      </p>
    </div>
  );
}

function TitleAndHero() {
  return (
    <section className="flex flex-col gap-10">
      <div className="flex w-full items-start justify-between gap-[92px] max-md:flex-col max-md:gap-6">
        <div className="flex flex-col gap-[19px]">
          <div className="relative h-[71px] w-[170px] overflow-hidden">
            <Image
              src="/images/bcg/logo.png"
              alt="BCG"
              width={329}
              height={185}
              priority
              className="absolute left-0 top-[-57px] max-w-none"
              style={{ width: "193.53%", height: "260.65%" }}
            />
          </div>
          <p className="w-[614px] font-medium text-[24px] leading-[1.35] max-md:w-full max-md:text-[20px]">
            Build AI products that automate busywork, freeing consultants for
            high-impact thinking.
          </p>
        </div>
        <div className="flex shrink-0 gap-2 pt-1 max-md:flex-wrap max-md:gap-4 max-md:pt-0">
          <InfoColumn title="My Role">UX Research &amp; Design</InfoColumn>
          <InfoColumn title="The Team">UX COE GenAI</InfoColumn>
          <InfoColumn title="Duration" width={141}>
            June 2025 - Dec 2025
          </InfoColumn>
        </div>
      </div>

      <div className="relative h-[612px] w-full overflow-hidden rounded-[4px] max-md:h-[260px]">
        <Image
          src="/images/bcg/hero.png"
          alt="BCG office building"
          fill
          sizes="1250px"
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
}

function InfoColumn({
  title,
  width = 191,
  children,
}: {
  title: string;
  width?: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex shrink-0 flex-col gap-2 text-subtext"
      style={{ width }}
    >
      <p className="text-gray-2">{title}</p>
      <p>{children}</p>
    </div>
  );
}

function OverviewAndGallery() {
  return (
    <section className="flex w-full items-start gap-[41px] max-md:flex-col max-md:gap-10">
      <div className="flex w-[707px] shrink-0 flex-col justify-between gap-[48px] self-stretch max-md:w-full">
        <div className="flex flex-col gap-2">
          <SectionHeading>Overview</SectionHeading>
          <p className="text-body">
            I was the design co-op on BCG&rsquo;s GenAI Experience team, where
            I helped shape how 9,000+ consultants use AI in their daily work.
            I led user research across three continents, designed features for
            Deckster (BCG&rsquo;s AI deck creation tool), and prototyped new
            product concepts that informed the team&rsquo;s roadmap and
            strategic recommendations to leadership. From research synthesis
            to final designs, I helped bridge what consultants needed with
            what AI could actually deliver.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <SectionHeading>What I worked on</SectionHeading>
          <div className="flex flex-col gap-6 pt-2">
            {TASKS.map((task, i) => (
              <div
                key={i}
                className="flex items-center justify-center px-6 py-4"
                style={{
                  backgroundColor: "#fafffb",
                  borderLeft: "3px solid #177b57",
                }}
              >
                <p className="flex-1 text-body">{task}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ImageGallery />
    </section>
  );
}

function Reflections() {
  return (
    <section className="flex flex-col gap-4">
      <SectionHeading>Reflections</SectionHeading>
      <div className="flex flex-wrap items-start gap-x-5 gap-y-8">
        {REFLECTIONS.map((r) => (
          <div
            key={r.headline}
            className="flex w-[615px] flex-col gap-3"
          >
            <p className="font-medium text-h3">{r.headline}</p>
            <div className="flex items-start gap-3">
              <p className="shrink-0 font-medium text-h3">{r.number}</p>
              <p className="w-[558px] text-body">{r.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="flex flex-col gap-6">
      <SectionHeading>Team Testimonials</SectionHeading>
      <div className="flex flex-col gap-8">
        <ManagerTestimonial />
        <TeamTestimonials />
      </div>
    </section>
  );
}

function ManagerTestimonial() {
  return (
    <div className="flex items-center gap-8 max-md:flex-col max-md:items-start max-md:gap-4">
      <div className="flex flex-col items-start justify-center shrink-0">
        <p className="text-subtext whitespace-nowrap">From my manager</p>
        <div className="relative size-[120px]">
          <Image
            src="/images/bcg/face-manager.png"
            alt="Manager"
            fill
            sizes="120px"
            className="object-cover"
          />
        </div>
      </div>
      <p className="w-[925px] text-body max-md:w-full">
        &ldquo;Katherine has continued to mature as a designer, demonstrating
        strong curiosity, thoughtful inquiry, and a strong capacity to break
        down assignments into user focused details. Her interest in research
        and understanding user needs has become a clear strength.&rdquo;
      </p>
    </div>
  );
}

function TeamTestimonials() {
  return (
    <div className="flex flex-col gap-0">
      <p className="text-subtext">From the team:</p>
      <div className="flex w-full items-start gap-6 pt-[19px] max-md:flex-col">
        {TEAM_TESTIMONIALS.map((t, i) => (
          <div key={i} className="flex flex-1 items-center gap-6 max-md:w-full">
            <div className="relative size-[120px] shrink-0">
              <Image
                src={t.avatar}
                alt=""
                fill
                sizes="120px"
                className="object-cover"
              />
            </div>
            <p className="flex-1 text-body">{t.quote}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
