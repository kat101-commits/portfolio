import type { Metadata, Viewport } from "next";
import {
  Instrument_Sans,
  Instrument_Serif,
  Ma_Shan_Zheng,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import MobileNav from "./components/MobileNav";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const maShanZheng = Ma_Shan_Zheng({
  variable: "--font-ma-shan-zheng",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Katherine Zhang",
  description: "Portfolio of Katherine Zhang — designer, 2026.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${instrumentSerif.variable} ${maShanZheng.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <header className="relative z-50 mx-auto w-full max-w-frame px-page pt-8 pb-5 max-md:hidden">
          {/* Figma nav chrome: a hairline above and below the row, and a
              vertical tick struck through the wordmark. The tick's offset
              is a measured constant, not derived from the row's rendered
              width — that width also depends on the *other* labels
              ("Work", "Playground", …), which don't match the Figma
              mockup's text and would land the line somewhere the design
              never intended. Same value app/preview/about already
              committed to for this identical wordmark. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#d5ddff]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[#d5ddff]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute top-0 bottom-0 w-px bg-[#d5ddff]"
            style={{ left: "calc(var(--spacing-page) + 69px)" }}
          />
          <Nav />
        </header>
        <main className="flex-1 w-full max-md:pb-[200px]">{children}</main>
        <Footer />
        <MobileNav />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
