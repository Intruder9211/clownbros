'use client';

import React, { useState, useRef } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { Flip } from '@/lib/gsap';
import StudioCTA from '@/components/StudioCTA';
import HeroFrame from '@/components/HeroFrame';
import TechStackFlow from '@/components/TechStackFlow';
import { useScrollLock } from '@/lib/useScrollLock';

const CARD_GRADIENTS = [
  'linear-gradient(155deg, var(--bg-s1) 0%, var(--bg-s2) 55%, var(--bg-s3) 100%)',
  'linear-gradient(155deg, var(--bg-s1) 0%, var(--bg-s4) 60%, var(--bg-s2) 100%)',
  'linear-gradient(155deg, var(--bg-s1) 0%, var(--bg-s5) 55%, var(--bg-s6) 100%)',
  'linear-gradient(155deg, var(--bg-s1) 0%, var(--bg-s6) 55%, var(--bg-s4) 100%)',
];

interface CaseStudy {
  id: string;
  origin: 'In-House Studio Product' | 'Client Engagement';
  title: string;
  category: string;
  highlight: string;
  summary: string;
  challenge: string;
  solution: string;
  outcomes: string[];
  techStack: string[];
  liveUrl: string;
  bgIllustration: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-1',
    origin: 'In-House Studio Product',
    title: 'The ClownFounder — Autonomous Company OS',
    category: 'AI',
    highlight: 'Multi-Agent AI OS',
    summary:
      'Autonomous AI Executive Team with founder-in-the-loop approvals across sales, engineering, QA, finance, and support.',
    challenge:
      'Solo founders lose high-leverage product hours to operational triage, billing reconciliations, and routine coordination.',
    solution:
      'Engineered an autonomous multi-agent execution pipeline that triages webhooks and drafts proposals with 1-tap founder approval.',
    outcomes: [
      'Parallel triage across Sales, Engineering, QA, and Finance units',
      'Morning Executive Brief workflow for fast founder review',
      'Linear, Stripe, and Resend integrations with strict approval gates',
    ],
    techStack: ['Next.js 15', 'TypeScript', 'Multi-Agent LLMs', 'Stripe API', 'Linear API'],
    liveUrl: 'https://theclownfounder.vercel.app/',
    bgIllustration: '/images/case-studies/clownfounder.png',
  },
  {
    id: 'cs-2',
    origin: 'In-House Studio Product',
    title: 'The ClownMart — Headless E-Commerce Engine',
    category: 'E-Commerce',
    highlight: 'Edge-Cached Storefront',
    summary:
      'High-velocity headless marketplace for retail footwear with instant faceted search and optimistic cart flows.',
    challenge:
      'Traditional storefronts suffer from heavy client scripts, slow filtering, and layout shifts that hurt checkout flow.',
    solution:
      'Built a headless Next.js 15 storefront using edge caching, optimistic cart state updates, and accessible keyboard navigation.',
    outcomes: [
      'Instant multi-filter faceted catalog search',
      'Optimistic client-side cart drawer synchronization',
      'Clean responsive layout across desktop and mobile',
    ],
    techStack: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'SSR', 'Edge Caching'],
    liveUrl: 'https://theclownmart.vercel.app/',
    bgIllustration: '/images/case-studies/clownmart.png',
  },
  {
    id: 'cs-3',
    origin: 'In-House Studio Product',
    title: 'ClownEaser — Design Token Extractor & AI CSS Studio',
    category: 'DevTools',
    highlight: '100% In-Memory AST',
    summary:
      'Headless computed CSS token parser and Elementor AI CSS Studio extracting typography, spacing, and colors into Elementor 3.x JSON.',
    challenge:
      'Design-to-CMS handoffs require tedious manual copying of CSS properties, hex values, and typography scales.',
    solution:
      'Constructed an ephemeral AST-based token extraction pipeline that maps HTML/ZIP styles directly into Elementor Global Kit 3.x schema.',
    outcomes: [
      'Instant conversion of HTML/ZIP packages into Elementor Global Kit 3.x JSON',
      'Natural-language AI CSS Studio for scoped animations',
      '100% ephemeral in-memory processing with zero server persistence',
    ],
    techStack: ['Next.js', 'Headless AST Parser', 'Elementor 3.x', 'AI Prompt Engine'],
    liveUrl: 'https://clowneaser.vercel.app/',
    bgIllustration: '/images/case-studies/clowneaser.png',
  },
  {
    id: 'cs-4',
    origin: 'In-House Studio Product',
    title: 'ClownKosh — Offline PDF Library & Reader PWA',
    category: 'PWA',
    highlight: 'Offline IndexedDB',
    summary:
      'Distraction-free personal digital library and PDF reader Progressive Web App with client-side indexing and shelf management.',
    challenge:
      'Conventional PDF readers often require heavy desktop installs, mandatory cloud sign-ins, or cluttered reading UIs.',
    solution:
      'Engineered an offline-first PWA powered by PDF.js and IndexedDB that stores and indexes documents locally in the browser.',
    outcomes: [
      'Installable offline PWA across iOS, Android, and Desktop',
      'Zero server uploads — 100% local IndexedDB document storage',
      'Clean dark reader view with custom zoom and shelf organization',
    ],
    techStack: ['React', 'PDF.js', 'PWA', 'IndexedDB', 'Service Workers'],
    liveUrl: 'https://clownkosh.vercel.app/',
    bgIllustration: '/images/case-studies/clownkosh.png',
  },
];

const CATEGORIES = ['All', 'AI', 'E-Commerce', 'DevTools', 'PWA'];

export default function CaseStudiesPage() {
  const [selectedCat, setSelectedCat] = useState('All');
  const [activeStudy, setActiveStudy] = useState<CaseStudy | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  useScrollLock(activeStudy !== null);

  const handleFilter = (cat: string) => {
    if (!gridRef.current) {
      setSelectedCat(cat);
      return;
    }
    const state = Flip.getState(gridRef.current.querySelectorAll('.case-card'));
    setSelectedCat(cat);
    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.45,
        ease: 'power2.out',
        stagger: 0.04,
      });
    });
  };

  const filtered =
    selectedCat === 'All'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((c) => c.category === selectedCat);

  return (
    <main>
      <HeroFrame>
        <span className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[#F15A3B] block mb-4">
          Selected Portfolio
        </span>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.03]">
              Live systems,{' '}
              <span className="font-serif-editorial italic font-normal text-[#F15A3B]">
                shipped &amp; verifiable.
              </span>
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className="text-base text-[#6B6A65] leading-relaxed">
              Every flagship product below is a live in-house system built by ClownBros—inspect the architecture or launch the live deployment.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-nowrap md:flex-wrap overflow-x-auto no-scrollbar gap-2 -mx-1 px-1 pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleFilter(cat)}
              className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-full font-display text-xs font-medium border transition-colors ${
                selectedCat === cat
                  ? 'bg-[#171817] text-[#F2EFE7] border-[#171817]'
                  : 'bg-transparent text-[#171817] border-[#171817]/20 hover:border-[#171817]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </HeroFrame>

      <section
        style={{ backgroundColor: 'var(--bg-s3)' }}
        className="text-[var(--text-ink)] py-16 sm:py-24"
      >
        <div
          ref={gridRef}
          onMouseLeave={() => setHoveredCardId(null)}
          className="studio-container grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          {filtered.map((study, cardIdx) => {
            const isCardActive = hoveredCardId === study.id;
            return (
            <article
              key={study.id}
              tabIndex={0}
              onMouseEnter={() => setHoveredCardId(study.id)}
              onFocus={() => setHoveredCardId(study.id)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setHoveredCardId(null);
                }
              }}
              onClick={() => setHoveredCardId(isCardActive ? null : study.id)}
              style={{ background: CARD_GRADIENTS[cardIdx % CARD_GRADIENTS.length] }}
              className={`group case-card relative overflow-hidden p-6 sm:p-10 rounded-[26px] border shadow-sm transition-all duration-300 ease-out focus:outline-none flex flex-col justify-between gap-8 ${
                isCardActive
                  ? '-translate-y-1 shadow-xl border-[var(--accent-orange)]/55'
                  : 'border-[var(--border-hairline)]'
              }`}
            >
              {/* Hover / Tap-Only Transparent Background PNG */}
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 transition-all duration-500 ease-out ${
                  isCardActive ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                }`}
              >
                <img
                  src={study.bgIllustration}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-white/35" />
              </div>

              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                  <span className="font-mono-tech text-[11px] uppercase tracking-widest text-[var(--accent-orange)]">
                    {study.category} {'//'} {study.highlight}
                  </span>
                  <span className="font-mono-tech text-[10px] px-2.5 py-0.5 rounded-full bg-white/60 border border-[var(--border-hairline)] text-[var(--text-muted)]">
                    {study.origin}
                  </span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold leading-tight text-[var(--text-ink)]">
                  {study.title}
                </h2>
                <p className="mt-3 text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                  {study.summary}
                </p>
              </div>

              <div className="relative z-10 space-y-6">
                <TechStackFlow label="Architecture Stack" items={study.techStack} />
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[var(--border-hairline)]">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveStudy(study);
                    }}
                    className="btn-studio-primary !py-2.5 !px-5 !text-xs"
                  >
                    Read Architecture
                  </button>
                  <a
                    href={study.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="btn-studio-outline !py-2.5 !px-5 !text-xs"
                  >
                    <span>Live Product</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </article>
            );
          })}
        </div>
      </section>

      {/* Case Study Detail Modal */}
      {activeStudy && (
        <div
          className="fixed inset-0 z-[90] bg-[#171817]/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setActiveStudy(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            data-lenis-prevent
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-[#F2EFE7] text-[#171817] border border-[#171817]/15 rounded-3xl p-6 sm:p-10 shadow-2xl my-auto max-h-[90vh] overflow-y-auto"
          >
            <button
              type="button"
              onClick={() => setActiveStudy(null)}
              aria-label="Close case study"
              className="absolute top-5 right-5 w-9 h-9 rounded-full border border-[#171817]/15 flex items-center justify-center hover:bg-[#171817] hover:text-[#F2EFE7] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="font-mono-tech text-xs uppercase tracking-widest text-[#F15A3B]">
              {activeStudy.origin} {'//'} {activeStudy.category}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold mt-2 pr-8">
              {activeStudy.title}
            </h2>

            <div className="mt-6 space-y-5 text-sm sm:text-base">
              <div>
                <h3 className="font-mono-tech text-xs uppercase tracking-widest text-[#6B6A65] mb-1.5">
                  The Challenge
                </h3>
                <p className="text-[#171817] leading-relaxed">{activeStudy.challenge}</p>
              </div>
              <div>
                <h3 className="font-mono-tech text-xs uppercase tracking-widest text-[#6B6A65] mb-1.5">
                  Engineering Solution
                </h3>
                <p className="text-[#171817] leading-relaxed">{activeStudy.solution}</p>
              </div>
              <div>
                <h3 className="font-mono-tech text-xs uppercase tracking-widest text-[#6B6A65] mb-2">
                  Verified Capabilities
                </h3>
                <ul className="space-y-1.5">
                  {activeStudy.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-2 text-sm text-[#171817]">
                      <span className="text-[#F15A3B]">✓</span>
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-[#171817]/12 flex justify-end">
              <a
                href={activeStudy.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-studio-primary !py-2.5 !px-5 !text-xs"
              >
                Launch Live Deployment <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      <StudioCTA />
    </main>
  );
}
