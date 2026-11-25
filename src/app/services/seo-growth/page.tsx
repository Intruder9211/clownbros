'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Search, Gauge, FileCode2, BarChart3 } from 'lucide-react';
import ContactModal from '@/components/ContactModal';
import StudioCTA from '@/components/StudioCTA';
import HeroAmbientBg from '@/components/HeroAmbientBg';

export default function SEOGrowthPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main>
      <ContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        preSelectedService="SEO & Growth"
      />

      <section
        style={{ backgroundColor: 'var(--bg-s1)' }}
        className="text-[var(--text-ink)] pt-[88px] sm:pt-[92px] pb-3 sm:pb-4 px-3 sm:px-5"
      >
        <div
          style={{
            background:
              'linear-gradient(135deg, var(--accent-orange) 0%, var(--accent-cobalt) 50%, var(--accent-orange) 100%)',
          }}
          className="w-full max-w-[1440px] mx-auto p-[2px] rounded-[26px] sm:rounded-[34px] shadow-sm"
        >
          <div
            style={{ backgroundColor: 'var(--bg-s1)' }}
            className="relative overflow-hidden w-full rounded-[24px] sm:rounded-[32px] px-5 sm:px-8 lg:px-12 py-10 sm:py-14 lg:py-16"
          >
            <HeroAmbientBg />
            <div className="relative z-10">
          <div className="flex items-center gap-2 font-mono-tech text-xs text-[#6B6A65] mb-6">
            <Link href="/services" className="hover:text-[#F15A3B]">Services</Link>
            <span>/</span>
            <span className="text-[#F15A3B]">SEO &amp; Growth</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.03]">
                Organic visibility engineered{' '}
                <span className="font-serif-editorial italic font-normal text-[#3154D9]">
                  into the codebase.
                </span>
              </h1>
            </div>
            <div className="lg:col-span-4 space-y-5">
              <p className="text-base text-[#6B6A65] leading-relaxed">
                Technical SEO, structured schema markup, Core Web Vitals optimization, and high-converting editorial funnels—without guesswork.
              </p>
              <button type="button" onClick={() => setModalOpen(true)} className="btn-studio-primary">
                <span>Request Technical Audit</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical SEO Audit & Schema Inspector */}
      <section
        style={{ backgroundColor: 'var(--bg-s5)' }}
        className="text-[var(--text-ink)] py-20 sm:py-24"
      >
        <div className="studio-container grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: Search,
                title: 'Technical & Structural SEO',
                desc: 'Clean URL hierarchies, canonical tags, dynamic XML sitemaps, robots directives, and crawl budget tuning.',
              },
              {
                icon: Gauge,
                title: 'Core Web Vitals Tuning',
                desc: 'Optimizing LCP, CLS, and INP through server rendering, asset preloading, and minimal client JS.',
              },
              {
                icon: FileCode2,
                title: 'Programmatic Schema.org',
                desc: 'Structured JSON-LD metadata for products, articles, FAQs, and organizations.',
              },
              {
                icon: BarChart3,
                title: 'Conversion & Attribution',
                desc: 'Clean event instrumentation, landing page clarity, and measurable funnel diagnostics.',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="p-7 rounded-2xl bg-[#F2EFE7] border border-[#171817]/12">
                  <Icon className="w-5 h-5 text-[#F15A3B] mb-4" />
                  <h2 className="font-display text-lg font-semibold">{item.title}</h2>
                  <p className="mt-2 text-sm text-[#6B6A65] leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-5 bg-[#171817] text-[#F2EFE7] rounded-3xl p-7 font-mono-tech text-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F2EFE7]/12">
              <span className="text-[#F15A3B]">TECHNICAL SEO CHECKLIST</span>
              <span className="text-[#9E9B93]">AUDIT SPEC</span>
            </div>
            {[
              'Semantic HTML5 landmarks & heading hierarchy',
              'Dynamic OpenGraph & canonical metadata',
              'JSON-LD Schema.org structured data',
              'Zero render-blocking scripts & font swap',
              'Accessible keyboard & alt-text coverage',
            ].map((line) => (
              <div key={line} className="p-3 rounded-xl bg-[#202120] border border-[#F2EFE7]/8 flex items-center gap-3">
                <span className="text-[#F15A3B]">✓</span>
                <span className="text-[#F2EFE7]/90">{line}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StudioCTA />
    </main>
  );
}
