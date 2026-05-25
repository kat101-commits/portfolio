import type { Metadata, Viewport } from "next";
import {
  Instrument_Sans,
  Instrument_Serif,
  Ma_Shan_Zheng,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import MobileNav from "./components/MobileNav";
import MobileFooter from "./components/MobileFooter";

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
        <header className="relative z-50 mx-auto w-full max-w-frame px-page pt-8 max-md:hidden">
          <Nav />
        </header>
        <main className="flex-1 w-full max-md:pb-[200px]">{children}</main>
        <div className="mx-auto w-full max-w-frame px-page max-md:hidden">
          <Footer />
        </div>
        <div className="md:hidden">
          <MobileFooter />
        </div>
        <MobileNav />
        <Analytics />
      </body>
    </html>
  );
}
