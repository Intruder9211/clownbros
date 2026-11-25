'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import StudioCTA from '@/components/StudioCTA';
import HeroFrame from '@/components/HeroFrame';

const VALUES = [
  {
    num: '01',
    title: 'Engineering Craftsmanship',
    desc: 'Type-safe, modular architectures and strict code standards—zero brittle templates or unmaintainable shortcuts.',
    img: '/images/about/craftsmanship.png',
    gradient: 'linear-gradient(155deg, var(--bg-s1) 0%, var(--bg-s2) 50%, var(--bg-s3) 100%)',
  },
  {
    num: '02',
    title: 'Complete Transparency',
    desc: 'Direct staging links, open GitHub repositories, daily commits, and clear milestone sign-offs at every step.',
    img: '/images/about/transparency.png',
    gradient: 'linear-gradient(155deg, var(--bg-s1) 0%, var(--bg-s4) 55%, var(--bg-s2) 100%)',
  },
  {
    num: '03',
    title: '100% Asset Ownership',
    desc: 'You own all source code, Figma design files, cloud accounts, and intellectual property from minute one.',
    img: '/images/about/ownership.png',
    gradient: 'linear-gradient(155deg, var(--bg-s1) 0%, var(--bg-s5) 55%, var(--bg-s4) 100%)',
  },
  {
    num: '04',
    title: 'Sub-Second Speed',
    desc: 'Core Web Vitals at the forefront—fast initial paint, edge caching, and responsive layouts across devices.',
    img: '/images/about/speed.png',
    gradient: 'linear-gradient(155deg, var(--bg-s1) 0%, var(--bg-s3) 55%, var(--bg-s6) 100%)',
  },
  {
    num: '05',
    title: 'Outcome-Driven Execution',
    desc: 'We measure success by software reliability, user adoption, and tangible business capability.',
    img: '/images/about/outcome.png',
    gradient: 'linear-gradient(155deg, var(--bg-s1) 0%, var(--bg-s6) 55%, var(--bg-s2) 100%)',
  },
  {
    num: '06',
    title: 'Dedicated Post-Launch Care',
    desc: 'Every launch includes a 30-day bug warranty, direct engineering communication, and clean documentation.',
    img: '/images/about/care.png',
    gradient: 'linear-gradient(155deg, var(--bg-s1) 0%, var(--bg-s4) 50%, var(--bg-s5) 100%)',
  },
];

const SECTORS = [
  'High-Growth Startups',
  'SaaS Platforms',
  'Headless E-Commerce',
  'FinTech & Tooling',
  'Healthcare & Telehealth',
  'Consulting & Studios',
  'Modern SMBs',
  'Direct-to-Consumer Brands',
  'Education Platforms',
  'Creator & Media Brands',
];

export default function AboutPage() {
  const [focusedNum, setFocusedNum] = useState<string | null>(null);

  return (
    <main>
      {/* Editorial Studio Hero */}
      <HeroFrame>
        <span className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[#F15A3B] block mb-4">
          About ClownBros
        </span>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.03]">
              Playful brand.{' '}
              <span className="font-serif-editorial italic font-normal text-[#F15A3B]">
                Serious engineering.
              </span>
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className="text-base text-[#6B6A65] leading-relaxed">
              We are an independent creative engineering studio built by builders, not salespeople. We eliminate agency bloat and ship software that lasts.
            </p>
          </div>
        </div>
      </HeroFrame>

      {/* Human-Centered Studio Manifesto */}
      <section className="bg-[#171817] text-[#F2EFE7] py-20 sm:py-28">
        <div className="studio-container grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <span className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[#F15A3B] block mb-3">
              Why ClownBros Exists
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold leading-[1.1]">
              Unconventional name. Uncompromising standards.
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-[#9E9B93] leading-relaxed">
            <p className="font-serif-editorial text-2xl sm:text-3xl text-[#F2EFE7] leading-snug">
              &ldquo;Most agencies take themselves too seriously in pitch decks and not seriously enough in the codebase. We flip that.&rdquo;
            </p>
            <p>
              We build our own proprietary products—The ClownFounder, ClownMart, ClownEaser, and ClownKosh—alongside client software. That means every architecture decision we recommend to a partner has already been battle-tested in our own lab.
            </p>
            <div className="pt-4 flex flex-wrap gap-3">
              <Link href="/case-studies" className="btn-studio-accent !py-2.5 !px-5 !text-xs">
                Inspect Our Products <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/process" className="btn-studio-outline-dark !py-2.5 !px-5 !text-xs">
                How We Deliver <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Core Values */}
      <section
        style={{ backgroundColor: 'var(--bg-s5)' }}
        className="text-[var(--text-ink)] py-20 sm:py-28 border-b border-[var(--border-hairline)]"
      >
        <div className="studio-container">
          <div className="mb-12">
            <span className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[#F15A3B] block mb-3">
              Operating Principles
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold">
              Six commitments on every engagement.
            </h2>
          </div>

          <div
            onMouseLeave={() => setFocusedNum(null)}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {VALUES.map((v) => {
              const isFocused = focusedNum === v.num;
              const isBlurred = focusedNum !== null && !isFocused;

              return (
                <div
                  key={v.num}
                  tabIndex={0}
                  onMouseEnter={() => setFocusedNum(v.num)}
                  onFocus={() => setFocusedNum(v.num)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                      setFocusedNum(null);
                    }
                  }}
                  onClick={() => setFocusedNum(isFocused ? null : v.num)}
                  style={{ background: v.gradient }}
                  className={`relative overflow-hidden p-8 rounded-[24px] border transition-all duration-300 ease-out focus:outline-none ${
                    isFocused
                      ? 'scale-[1.03] z-10 shadow-xl border-[var(--accent-orange)]/65'
                      : isBlurred
                      ? 'blur-[2.5px] opacity-60 scale-[0.985] border-[var(--border-hairline)]'
                      : 'border-[var(--border-hairline)] shadow-sm'
                  }`}
                >
                  {/* Hover/Tap-Only Full-Background Transparent PNG */}
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 transition-all duration-500 ease-out ${
                      isFocused ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                    }`}
                  >
                    <img
                      src={v.img}
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="relative z-10">
                    <span className="font-mono-tech text-xs text-[var(--accent-orange)]">{v.num}</span>
                    <h3 className="font-display text-xl font-semibold mt-3 text-[var(--text-ink)]">
                      {v.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-[var(--text-muted)] leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who We Partner With */}
      <section
        style={{ backgroundColor: 'var(--bg-s3)' }}
        className="text-[var(--text-ink)] py-16 sm:py-20"
      >
        <div className="studio-container">
          <span className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[#6B6A65] block mb-6">
            Teams We Build For
          </span>
          <div className="flex flex-wrap gap-2.5">
            {SECTORS.map((s) => (
              <span
                key={s}
                className="px-4 py-2 rounded-full bg-[#F2EFE7] border border-[#171817]/15 font-display text-sm font-medium"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      <StudioCTA />
    </main>
  );
}
