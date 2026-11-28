'use client';

import React, { useState, useRef } from 'react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap';
import ContactModal from '@/components/ContactModal';
import HeroAmbientBg from '@/components/HeroAmbientBg';
import HeroPipeline from '@/components/home/HeroPipeline';

/**
 * HomeHero — client shell for the hero section only.
 * Keeps useState + GSAP animation isolated so the parent page.tsx
 * can remain a Server Component (restoring SSR for SEO).
 */
export default function HomeHero() {
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
    <section
      ref={heroRef}
      style={{ backgroundColor: 'var(--bg-s1)' }}
      className="text-[var(--text-ink)] pt-[88px] sm:pt-[92px] pb-3 sm:pb-4 px-3 sm:px-5 lg:h-[100dvh] flex flex-col"
    >
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

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
  );
}
