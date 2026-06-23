import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

export const metadata: Metadata = {
  title: "ClownBros | Digital Transformation & Technology Agency",
  description: "ClownBros is a modern digital transformation and technology agency. We design and build premium websites, mobile applications, and automation ecosystems that drive business growth.",
  keywords: "digital transformation, web development, app development, UI UX design, branding, cloud automation, software engineering, ecommerce agency",
  authors: [{ name: "ClownBros" }],
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
    <html lang="en">
      <body>
        <Navigation />
        {children}
        <Chatbot />
        <Footer />
      </body>
    </html>
  );
}
