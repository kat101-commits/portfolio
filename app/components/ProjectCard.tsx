import Link from "next/link";

type ProjectCardProps = {
  title: string;
  tag: string;
  dateRange: string;
  description: string;
  /** Visual content (video, image, etc). Should fill its container. */
  children: React.ReactNode;
  /** "light" = dark-tinted tag for light/gray backgrounds (default).
   *  "dark"  = white-tinted tag for dark/saturated backgrounds. */
  tagVariant?: "light" | "dark";
  /** Optional href — when set, the entire card becomes a link. */
  href?: string;
  /** When set, renders a "Coming Soon" pill on hover, anchored to the bottom-right
   *  of the visual content area. Use card-specific bg/border/text colors. */
  comingSoon?: { bg: string; fg: string };
};

export default function ProjectCard({
  title,
  tag,
  dateRange,
  description,
  children,
  tagVariant = "light",
  href,
  comingSoon,
}: ProjectCardProps) {
  const body = (
    <>
      <div className="relative w-full overflow-hidden rounded-[4px]">
        {children}
        <span
          className="absolute right-6 top-6 inline-flex items-center rounded-[3px] bg-black/40 px-4 py-2 text-[12px] text-white backdrop-blur-sm"
        >
          {tag}
        </span>
        {comingSoon ? (
          <span
            className="pointer-events-none absolute bottom-[29px] right-[37px] inline-flex items-center justify-center rounded-[4px] border px-4 py-2 text-[16px] font-medium italic leading-[1.35] whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            style={{
              backgroundColor: comingSoon.bg,
              borderColor: comingSoon.fg,
              color: comingSoon.fg,
            }}
          >
            Coming Soon
          </span>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 text-black">
        <div className="flex items-end justify-between gap-4">
          <h3 className="font-sans font-medium text-[24px] leading-none">
            {title}
          </h3>
          <span className="text-subtext whitespace-nowrap">{dateRange}</span>
        </div>
        <p className="text-body">{description}</p>
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-label={`${title} — ${tag}`}
        className="group flex w-full flex-col gap-[18px] transform-gpu transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
      >
        {body}
      </Link>
    );
  }

  return (
    <article className="group flex flex-col gap-[18px] w-full">{body}</article>
  );
}
