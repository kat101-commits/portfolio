import type { Metadata } from "next";
import {
  Instrument_Sans,
  Instrument_Serif,
  Ma_Shan_Zheng,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
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
      <body className="min-h-full flex flex-col">
        <header className="relative z-50 mx-auto w-full max-w-frame px-page pt-8">
          <Nav />
        </header>
        <main className="flex-1">{children}</main>
        <div className="mx-auto w-full max-w-frame px-page">
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
