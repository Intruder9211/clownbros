/**
 * Homepage — Server Component (no 'use client').
 *
 * FIX: Removed 'use client' that was added for a single useState modal.
 * Client interactivity (modal + GSAP hero animation) is now isolated
 * in <HomeHero> so SSR works for SEO on the main page.
 */
import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import HomeHero from '@/components/home/HomeHero';
import ProofSection from '@/components/home/ProofSection';
import SelectedWorks from '@/components/home/SelectedWorks';
import ServiceDirectory from '@/components/home/ServiceDirectory';
import BuildRoom from '@/components/home/BuildRoom';
import FaqSection from '@/components/home/FaqSection';
import StudioCTA from '@/components/StudioCTA';

export default function Home() {
  return (
    <main className="overflow-x-clip">
      {/* SECTION 01 — HERO (client shell with modal + animation) */}
      <HomeHero />

      {/* SECTION 02 — PROOF, NOT PROMISES (Theme s2) */}
      <ProofSection />

      {/* SECTION 03 — SELECTED WORKS (Sticky Stack, Theme s3) */}
      <SelectedWorks />

      {/* SECTION 04 — WHAT WE ENGINEER (Theme s4) */}
      <ServiceDirectory />

      {/* SECTION 05 — INSIDE THE BUILD ROOM (Contrasting Dark Section) */}
      <BuildRoom />

      {/* SECTION 06 — STUDIO PHILOSOPHY (Theme s5) */}
      <section
        style={{ backgroundColor: 'var(--bg-s5)' }}
        className="text-[var(--text-ink)] py-20 sm:py-28"
      >
        <div className="studio-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-5">
              <span className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[var(--accent-orange)] block mb-3">
                06 — Studio Philosophy
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

      {/* SECTION 07 — FAQs (Theme s6) */}
      <FaqSection />

      {/* SECTION 08 — FINAL CTA (Theme s2) */}
      <StudioCTA />
    </main>
  );
}

