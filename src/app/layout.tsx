import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SocialSidebar from "@/components/SocialSidebar";

const Chatbot = dynamic(() => import("@/components/Chatbot"));

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ClownBros | Digital Transformation & Technology Agency",
  description: "ClownBros is a modern digital transformation and technology agency. We design and build premium websites, mobile applications, and automation ecosystems that drive business growth.",
  keywords: "digital transformation, web development, app development, UI UX design, branding, cloud automation, software engineering, ecommerce agency",
  authors: [{ name: "ClownBros" }],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: "ClownBros – From Idea to Impact",
    description: "Empowering startups and enterprises with world-class custom web, mobile, automation, and design solutions.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <Navigation />
        {children}
        <SocialSidebar />
        <Chatbot />
        <Footer />
      </body>
    </html>
  );
}
