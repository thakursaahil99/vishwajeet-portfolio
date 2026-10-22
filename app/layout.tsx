import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Intro from "@/components/Intro";
import RevealObserver from "@/components/RevealObserver";
import "./globals.css";

const serif = Instrument_Serif({ subsets: ["latin"], variable: "--font-serif", weight: "400", style: ["normal", "italic"] });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: {
    default: "Vishwajeet Thakur — Designer & Developer",
    template: "%s — Vishwajeet Thakur",
  },
  description:
    "Vishwajeet Thakur is a designer and developer from Chandigarh building fast, responsive websites with WordPress, Next.js and Shopify.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3efe7" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0e0c" },
  ],
};

// Runs before paint: restores the saved theme (no flash) and enables reveal animations.
// Also decides whether to play the entry intro (first visit per session), with a failsafe timeout.
const boot = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('vt-theme');if(!t)t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';d.dataset.theme=t}catch(e){}d.classList.add('js');try{if(!sessionStorage.getItem('vt-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){d.dataset.intro='';setTimeout(function(){delete d.dataset.intro},7000)}}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${serif.variable} ${geist.variable} ${geistMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <Intro />
        <Header />
        {children}
        <Footer />
        <RevealObserver />
        <Cursor />
        <div className="scroll-progress" aria-hidden />
      </body>
    </html>
  );
}
