import type { Metadata, Viewport } from "next";
import {
  Instrument_Sans,
  Instrument_Serif,
  Ma_Shan_Zheng,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import MobileTopNav from "./components/MobileTopNav";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

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
        {/* No hairlines drawn here anymore — the Hero band (app/page.tsx)
            now draws every line for the whole banner, including the ones
            that visually run past this header, so there is exactly one
            line at each position instead of this header and Hero each
            drawing their own copy where they used to meet. */}
        {/* Both navs live here so the row sits in the same place on every
            page — including ones with no band of their own. The bands
            tuck up under this via .tuck-under-header, so their wash and
            rules still run behind it. */}
        <header className="relative z-50 mx-auto w-full max-w-frame px-page pt-[29px] pb-4 max-md:px-6 max-md:pt-[41px] max-md:pb-0">
          <Nav />
          <MobileTopNav />
        </header>
        <main className="flex-1 w-full max-md:pb-[200px]">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
