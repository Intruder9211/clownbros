import type { Metadata } from "next";
import { Space_Grotesk, Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SocialSidebar from "@/components/SocialSidebar";
import GlobalClock from "@/components/GlobalClock";
import SmoothScroll from "@/components/SmoothScroll";
import { ThemeProvider } from "@/components/ThemeProvider";
import MobileBottomNav from "@/components/MobileBottomNav";
import Preloader from "@/components/Preloader";

const Chatbot = dynamic(() => import("@/components/Chatbot"));

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ClownBros — Creative Engineering Studio",
  description:
    "Playful brand. Serious engineering. Unconventional execution. We build digital products, powerful software, and intelligent systems.",
  keywords:
    "creative engineering studio, web development, mobile apps, UI UX design, cloud devops, AI solutions, SEO growth, Next.js",
  authors: [{ name: "ClownBros" }],
  icons: {
    icon: [
      { url: "/images/clownbros-mark.png", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/images/clownbros-mark.png",
    apple: "/images/clownbros-mark.png",
  },
  openGraph: {
    title: "ClownBros — We build what your business runs on.",
    description:
      "Digital products, powerful software and intelligent systems. Designed with purpose. Engineered for reality.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-[var(--bg-paper)] text-[var(--text-ink)] antialiased selection:bg-[var(--accent-orange)] selection:text-[#F2EFE7]">
        <ThemeProvider>
          <Preloader />
          <SmoothScroll>
            <Navigation />
            {children}
            <SocialSidebar />
            <Chatbot />
            <GlobalClock />
            <Footer />
            <MobileBottomNav />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
