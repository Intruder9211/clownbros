'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap';
import HeroPipeline from '@/components/home/HeroPipeline';
import HeroAmbientBg from '@/components/HeroAmbientBg';
import ProofSection from '@/components/home/ProofSection';
import SelectedWorks from '@/components/home/SelectedWorks';
import ServiceDirectory from '@/components/home/ServiceDirectory';
import BuildRoom from '@/components/home/BuildRoom';
import FaqSection from '@/components/home/FaqSection';
import StudioCTA from '@/components/StudioCTA';
import ContactModal from '@/components/ContactModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-mask-line', {
        yPercent: 105,
        duration: 0.85,
        stagger: 0.1,
      }).from(
        '.hero-fade-in',
        {
          y: 18,
          opacity: 0,
          duration: 0.65,
          stagger: 0.08,
        },
        '-=0.45'
      );
    },
    { scope: heroRef }
  );

  return (
    <main className="overflow-x-clip">
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* SECTION 02 — HERO (Full Viewport Box Layout, Theme s1) */}
      <section
        ref={heroRef}
        style={{ backgroundColor: 'var(--bg-s1)' }}
        className="text-[var(--text-ink)] pt-[88px] sm:pt-[92px] pb-3 sm:pb-4 px-3 sm:px-5 lg:h-[100dvh] flex flex-col"
      >
        <div
          style={{
            background:
              'linear-gradient(135deg, var(--accent-orange) 0%, var(--accent-cobalt) 50%, var(--accent-orange) 100%)',
          }}
          className="flex-1 w-full max-w-[1440px] mx-auto p-[2px] rounded-[26px] sm:rounded-[34px] flex flex-col shadow-sm"
        >
          <div
            style={{ backgroundColor: 'var(--bg-s1)' }}
            className="relative overflow-hidden flex-1 w-full rounded-[24px] sm:rounded-[32px] flex flex-col justify-between px-5 sm:px-8 lg:px-12 py-6 sm:py-8 lg:py-8"
          >
            <HeroAmbientBg />

          {/* Main Headline + Supporting Copy & CTAs */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-end my-auto">
            <div className="lg:col-span-8 min-w-0">
              <h1 className="font-display text-[clamp(2rem,4.9vw,4.35rem)] font-semibold tracking-tight leading-[0.98] text-[var(--text-ink)]">
                <span className="block overflow-hidden">
                  <span className="hero-mask-line block">We build what</span>
                </span>
                <span className="block overflow-hidden">
                  <span className="hero-mask-line block">
                    your business{' '}
                    <span className="font-serif-editorial italic font-normal text-[var(--accent-orange)]">
                      runs on.
                    </span>
                  </span>
                </span>
              </h1>
            </div>

            <div className="lg:col-span-4 space-y-4 min-w-0">
              <p className="hero-fade-in text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                Digital products, powerful software and intelligent systems. Designed with purpose. Engineered for reality.
              </p>
              <div className="hero-fade-in flex flex-wrap items-center gap-2.5">
                <a href="#selected-works" className="btn-studio-primary !py-3 !px-5 !text-xs sm:!text-sm">
                  <span>Explore Our Work</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="btn-studio-outline !py-3 !px-5 !text-xs sm:!text-sm"
                >
                  Start a Project
                </button>
              </div>
            </div>
          </div>

          {/* Interactive System Visualization + Scroll Indicator */}
          <div className="relative z-10 mt-5 lg:mt-4 space-y-3 sm:space-y-4">
            <div className="hero-fade-in">
              <HeroPipeline />
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono-tech text-[var(--text-muted)] pt-1">
              <a
                href="#proof"
                className="inline-flex items-center gap-2 hover:text-[var(--text-ink)] transition-colors"
              >
                <ArrowDown className="w-3.5 h-3.5 text-[var(--accent-orange)]" />
                <span>SCROLL TO INSPECT</span>
              </a>
              <span className="hidden sm:inline">NEXT.JS / TYPESCRIPT / AI SYSTEMS / CLOUD</span>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* SECTION 03 — PROOF, NOT PROMISES (Theme s2) */}
      <ProofSection />

      {/* SECTION 04 — SELECTED WORKS (Sticky Stack, Theme s3) */}
      <SelectedWorks />

      {/* SECTION 05 — WHAT WE ENGINEER (Theme s4) */}
      <ServiceDirectory />

      {/* SECTION 06 — INSIDE THE BUILD ROOM (Contrasting Dark Section) */}
      <BuildRoom />

      {/* SECTION 07 — STUDIO PHILOSOPHY (Theme s5) */}
      <section
        style={{ backgroundColor: 'var(--bg-s5)' }}
        className="text-[var(--text-ink)] py-20 sm:py-28"
      >
        <div className="studio-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-5">
              <span className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[var(--accent-orange)] block mb-3">
                07 — Studio Philosophy
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.06]">
                Serious engineering,{' '}
                <span className="font-serif-editorial italic font-normal text-[var(--accent-cobalt)]">
                  without the agency theater.
                </span>
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-8">
              <p className="font-serif-editorial text-2xl sm:text-3xl leading-snug text-[var(--text-ink)]">
                &ldquo;Software should feel effortless to the user and legible to the next engineer who opens the repository.&rdquo;
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[var(--border-hairline)]">
                <div>
                  <h3 className="font-display text-base font-semibold">Builders, Not Account Managers</h3>
                  <p className="mt-2 text-sm text-[var(--text-muted)] leading-relaxed">
                    You talk directly to the engineers and designers shipping your product. No telephone-game handoffs or inflated retainers.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold">Long-Term Partnerships</h3>
                  <p className="mt-2 text-sm text-[var(--text-muted)] leading-relaxed">
                    Whether we ship your MVP in 6 weeks or modernize a legacy stack, we leave behind clean architecture and full documentation.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link href="/about" className="btn-studio-outline !py-2.5 !px-5 !text-xs">
                  Read About Us <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <Link href="/trust" className="btn-studio-outline !py-2.5 !px-5 !text-xs">
                  Trust &amp; Security Center <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 08 — FAQs (Theme s6) */}
      <FaqSection />

      {/* SECTION 09 — FINAL CTA (Theme s2) */}
      <StudioCTA />
    </main>
  );
}
