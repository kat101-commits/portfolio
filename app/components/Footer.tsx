import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Work" },
  { href: "/playground", label: "Playground" },
  { href: "/about", label: "About Me" },
  { href: "/resume", label: "Resume" },
];

const CONTACT_LINKS = [
  { href: "https://www.linkedin.com/", label: "LinkedIn" },
  { href: "mailto:zhangskath@gmail.com", label: "zhangskath@gmail.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-dashed border-black pt-8 pb-15 flex items-start justify-between text-body">
      <div className="flex flex-col gap-2 w-[273px] text-black">
        <p>Made with ✨ by Katherine Zhang</p>
        <p>2026</p>
      </div>

      <div className="flex gap-10 items-start">
        <FooterColumn heading="Navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-subtext text-gray-2 hover:text-black"
            >
              {link.label}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn heading="Let’s Chat">
          {CONTACT_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-subtext text-black"
            >
              {link.label}
            </Link>
          ))}
        </FooterColumn>
      </div>
    </footer>
  );
}

function FooterColumn({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 items-start">
      <p className="text-body text-black">{heading}</p>
      <div className="flex flex-col gap-2 items-start">{children}</div>
    </div>
  );
}
