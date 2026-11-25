'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Terminal, ShoppingBag, Code2, BookOpen } from 'lucide-react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap';

interface ProjectItem {
  id: string;
  num: string;
  category: string;
  badge: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  ctaLabel: string;
  cardBg: string;
  cardText: string;
  mutedText: string;
  accentColor: string;
  isDark: boolean;
  bgImage: string;
  previewType: 'terminal' | 'commerce' | 'code' | 'reader';
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'clownfounder',
    num: '01',
    category: 'Autonomous AI OS',
    badge: 'In-House Product',
    title: 'The ClownFounder',
    description:
      'Autonomous AI Executive Team with founder-in-the-loop approvals. Parallel sales, engineering, QA, finance, and support units delivering morning executive briefs.',
    tags: ['Next.js 15', 'TypeScript', 'Multi-Agent LLMs', 'Stripe', 'Linear'],
    liveUrl: 'https://theclownfounder.vercel.app/',
    ctaLabel: 'Launch Live Product',
    cardBg: '#171817',
    cardText: '#F2EFE7',
    mutedText: '#9E9B93',
    accentColor: '#F15A3B',
    isDark: true,
    bgImage: '/images/works/clownfounder-bg.jpg',
    previewType: 'terminal',
  },
  {
    id: 'clownmart',
    num: '02',
    category: 'Headless Commerce',
    badge: 'In-House Product',
    title: 'ClownMart',
    description:
      'High-velocity headless commerce marketplace for retail footwear. Engineered with sub-second catalog search, optimistic cart state, and edge-cached pages.',
    tags: ['Next.js 15', 'Edge Caching', 'Cart Architecture', 'TypeScript'],
    liveUrl: 'https://theclownmart.vercel.app/',
    ctaLabel: 'Explore ClownMart',
    cardBg: '#F8F6F1',
    cardText: '#171817',
    mutedText: '#6B6A65',
    accentColor: '#3154D9',
    isDark: false,
    bgImage: '/images/works/clownmart-bg.jpg',
    previewType: 'commerce',
  },
  {
    id: 'clowneaser',
    num: '03',
    category: 'Dev Tooling & CSS',
    badge: 'In-House Product',
    title: 'ClownEaser',
    description:
      'Headless computed CSS token parser and Elementor CSS Studio. Extracts typography scales, spacing, and palette tokens into Elementor Global Kit 3.x JSON in memory.',
    tags: ['AST Parser', 'Elementor 3.x', 'In-Memory Engine', 'TypeScript'],
    liveUrl: 'https://clowneaser.vercel.app/',
    ctaLabel: 'Open ClownEaser',
    cardBg: '#FFFFFF',
    cardText: '#171817',
    mutedText: '#6B6A65',
    accentColor: '#F15A3B',
    isDark: false,
    bgImage: '/images/works/clowneaser-bg.jpg',
    previewType: 'code',
  },
  {
    id: 'clownkosh',
    num: '04',
    category: 'Offline PWA',
    badge: 'In-House Product',
    title: 'ClownKosh',
    description:
      'Distraction-free personal digital library and PDF reader PWA. Client-side indexing, IndexedDB offline storage, and clean shelf management with zero cloud uploads.',
    tags: ['PWA', 'PDF.js', 'IndexedDB', 'Service Workers'],
    liveUrl: 'https://clownkosh.vercel.app/',
    ctaLabel: 'Open ClownKosh',
    cardBg: '#3154D9',
    cardText: '#F2EFE7',
    mutedText: 'rgba(242, 239, 231, 0.82)',
    accentColor: '#F2EFE7',
    isDark: true,
    bgImage: '/images/works/clownkosh-bg.jpg',
    previewType: 'reader',
  },
];

export default function SelectedWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();

      const setupStack = (startOffset: string, stepScroll: number) => {
        const cards = gsap.utils.toArray<HTMLElement>('.stacked-work-card');
        if (cards.length < 2 || !pinRef.current) return;

        cards.forEach((card, idx) => {
          if (idx > 0) {
            gsap.set(card, { yPercent: 112 });
          }
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: startOffset,
            end: () => `+=${(cards.length - 1) * stepScroll}`,
            pin: true,
            scrub: 0.75,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        cards.forEach((card, idx) => {
          if (idx === 0) return;
          tl.to(
            cards[idx - 1],
            {
              scale: 0.965,
              opacity: 0.88,
              duration: 1,
              ease: 'power2.out',
            },
            idx - 1
          ).to(
            card,
            {
              yPercent: 0,
              duration: 1,
              ease: 'power2.out',
            },
            idx - 1
          );
        });
      };

      mm.add('(min-width: 1024px)', () => setupStack('top 92px', 440));
      mm.add('(min-width: 768px) and (max-width: 1023px)', () => setupStack('top 88px', 380));
      mm.add('(max-width: 767px)', () => setupStack('top 84px', 320));

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [PROJECTS.length] }
  );

  return (
    <section
      id="selected-works"
      ref={sectionRef}
      style={{ backgroundColor: 'var(--bg-s3)' }}
      className="text-[var(--text-ink)] py-16 sm:py-24 border-b border-[var(--border-hairline)]"
    >
      <div className="studio-container">
        <div ref={pinRef} className="works-pin-wrapper">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pb-5 sm:pb-7 mb-5 sm:mb-7 border-b border-[var(--border-hairline)]">
            <div>
              <span className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[var(--accent-orange)] block mb-1.5">
                04 — Selected Works
              </span>
              <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.06]">
                Proprietary systems{' '}
                <span className="font-serif-editorial italic font-normal text-[var(--text-muted)]">
                  shipped from our lab.
                </span>
              </h2>
            </div>
            <Link
              href="/case-studies"
              className="link-editorial font-display text-xs sm:text-sm font-medium inline-flex items-center gap-1.5 text-[var(--text-ink)] hover:text-[var(--accent-orange)] shrink-0"
            >
              Explore All Case Studies <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Dynamic Stacked Cards Stage (Mobile, Tablet & Desktop) */}
          <div
            className="relative h-[430px] sm:h-[450px] md:h-[465px] lg:h-[490px]"
          >
            {PROJECTS.map((project, idx) => {
              const topOffset = idx * 10;
              return (
                <article
                  key={project.id}
                  style={{
                    backgroundColor: project.cardBg,
                    color: project.cardText,
                    top: `${topOffset}px`,
                    zIndex: (idx + 1) * 10,
                  }}
                  className="stacked-work-card absolute inset-x-0 rounded-2xl sm:rounded-3xl overflow-hidden border border-black/15 shadow-xl h-[400px] sm:h-[420px] md:h-[430px] lg:h-[450px]"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
                    {/* Info Side */}
                    <div className="lg:col-span-5 p-5 sm:p-8 lg:p-10 flex flex-col justify-between gap-3 sm:gap-5 h-full">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2.5 sm:mb-4">
                          <span
                            className="font-mono-tech text-[11px] sm:text-xs uppercase tracking-[0.14em]"
                            style={{ color: project.accentColor }}
                          >
                            {project.num} / {project.category}
                          </span>
                          <span
                            className="font-mono-tech text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full border"
                            style={{
                              borderColor: project.isDark ? 'rgba(255,255,255,0.2)' : 'rgba(23,24,23,0.18)',
                              color: project.mutedText,
                            }}
                          >
                            {project.badge}
                          </span>
                        </div>
                        <h3 className="font-display text-xl sm:text-3xl font-semibold tracking-tight">
                          {project.title}
                        </h3>
                        <p
                          className="mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed line-clamp-4 sm:line-clamp-none"
                          style={{ color: project.mutedText }}
                        >
                          {project.description}
                        </p>
                      </div>

                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="font-mono-tech text-[10px] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border"
                              style={{
                                borderColor: project.isDark ? 'rgba(255,255,255,0.18)' : 'rgba(23,24,23,0.14)',
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={
                              project.id === 'clownfounder'
                                ? 'btn-studio-accent !py-2 !px-4 sm:!py-2.5 sm:!px-5 !text-xs'
                                : project.isDark
                                ? 'btn-studio-outline-dark !py-2 !px-4 sm:!py-2.5 sm:!px-5 !text-xs'
                                : 'btn-studio-primary !py-2 !px-4 sm:!py-2.5 sm:!px-5 !text-xs'
                            }
                          >
                            {project.ctaLabel} <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                          <Link
                            href="/case-studies"
                            className="font-display text-xs font-medium inline-flex items-center gap-1 opacity-85 hover:opacity-100"
                          >
                            Case Study <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Visual Mockup Side with Custom Generated Background (Desktop) */}
                    <div
                      className={`hidden lg:flex lg:col-span-7 relative overflow-hidden p-8 items-center border-l ${
                        project.isDark ? 'border-white/12' : 'border-black/10'
                      }`}
                    >
                      <img
                        src={project.bgImage}
                        alt=""
                        loading="lazy"
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div
                        aria-hidden="true"
                        className={`absolute inset-0 ${
                          project.isDark ? 'bg-black/25' : 'bg-white/15'
                        }`}
                      />
                      <div className="relative z-10 w-full">
                      {project.previewType === 'terminal' && (
                        <div className="w-full rounded-2xl bg-[#141514] border border-white/12 overflow-hidden shadow-2xl">
                          <div className="px-4 py-2.5 bg-[#1B1C1B] border-b border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#F15A3B]" />
                              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                            </div>
                            <span className="font-mono-tech text-[10px] text-[#9E9B93]">
                              theclownfounder.vercel.app
                            </span>
                            <Terminal className="w-3.5 h-3.5 text-[#F15A3B]" />
                          </div>
                          <div className="p-6 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="font-mono-tech text-[10px] uppercase tracking-wider text-[#F15A3B]">
                                MORNING EXECUTIVE BRIEF // 08:00
                              </span>
                              <span className="font-mono-tech text-[10px] px-2 py-0.5 rounded bg-[#F15A3B]/15 text-[#F15A3B]">
                                1-TAP APPROVAL
                              </span>
                            </div>
                            <div className="grid grid-cols-3 gap-2.5">
                              {[
                                { unit: 'ENGINEERING', status: '3 PRs Verified', badge: 'CI Green' },
                                { unit: 'SALES & OPS', status: '2 Proposals Drafted', badge: 'Ready' },
                                { unit: 'FINANCE', status: 'Stripe Reconciled', badge: 'Synced' },
                              ].map((u) => (
                                <div key={u.unit} className="p-3 rounded-xl bg-[#1B1C1B] border border-white/8">
                                  <div className="font-mono-tech text-[10px] text-[#9E9B93]">{u.unit}</div>
                                  <div className="font-display text-sm font-medium mt-1">{u.status}</div>
                                  <div className="font-mono-tech text-[10px] text-[#F15A3B] mt-1.5">{u.badge}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {project.previewType === 'commerce' && (
                        <div className="w-full rounded-2xl bg-[#F8F6F1] border border-[#171817]/15 overflow-hidden shadow-lg">
                          <div className="px-4 py-2.5 border-b border-[#171817]/10 flex items-center justify-between">
                            <span className="font-mono-tech text-[10px] text-[#6B6A65]">
                              theclownmart.vercel.app
                            </span>
                            <span className="font-mono-tech text-[10px] text-[#3154D9] font-medium">
                              EDGE CACHED
                            </span>
                          </div>
                          <div className="p-6">
                            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#171817]/10">
                              <div className="flex items-center gap-2">
                                <ShoppingBag className="w-4 h-4 text-[#171817]" />
                                <span className="font-display text-sm font-semibold">FOOTWEAR CATALOG</span>
                              </div>
                              <span className="font-mono-tech text-[10px] px-2 py-0.5 rounded-full bg-[#3154D9]/10 text-[#3154D9]">
                                FACETED SEARCH
                              </span>
                            </div>
                            <div className="grid grid-cols-3 gap-2.5">
                              {['Runner V2', 'Court Low', 'Trail GTX'].map((item, i) => (
                                <div key={item} className="bg-white rounded-xl p-2.5 border border-[#171817]/10">
                                  <div className="h-12 rounded-lg bg-[#ECE8DF] mb-2 flex items-center justify-center font-mono-tech text-[10px] text-[#6B6A65]">
                                    SKU-0{i + 1}
                                  </div>
                                  <div className="font-display text-xs font-semibold">{item}</div>
                                  <div className="font-mono-tech text-[10px] text-[#6B6A65] mt-0.5">In Stock</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {project.previewType === 'code' && (
                        <div className="w-full rounded-2xl bg-[#171817] text-[#F2EFE7] p-6 font-mono-tech text-xs overflow-x-auto shadow-lg">
                          <div className="flex items-center justify-between text-[#9E9B93] mb-3">
                            <span>{`// ast-token-extractor.ts → global-kit-3x.json`}</span>
                            <Code2 className="w-4 h-4 text-[#F15A3B]" />
                          </div>
                          <pre className="leading-relaxed text-xs">
{`{
  "system_colors": ["#F2EFE7", "#171817", "#F15A3B"],
  "typography_scale": {
    "display": "Space Grotesk",
    "ratio": 1.25
  },
  "persistence": "100% ephemeral in-memory"
}`}
                          </pre>
                        </div>
                      )}

                      {project.previewType === 'reader' && (
                        <div className="w-full rounded-2xl bg-[#171817] text-[#F2EFE7] p-6 border border-white/15 shadow-xl">
                          <div className="flex items-center justify-between text-[10px] font-mono-tech text-[#9E9B93] pb-3 mb-3 border-b border-white/10">
                            <span className="inline-flex items-center gap-2">
                              <BookOpen className="w-3.5 h-3.5" /> LOCAL INDEXEDDB SHELF
                            </span>
                            <span className="text-[#F15A3B]">OFFLINE READY</span>
                          </div>
                          <div className="space-y-2.5 text-xs">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-[#222322]">
                              <span className="font-medium">Designing Data-Intensive Apps.pdf</span>
                              <span className="font-mono-tech text-[10px] text-[#9E9B93]">p.142</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-lg bg-[#222322]/70">
                              <span className="font-medium">Type Systems &amp; Architecture.pdf</span>
                              <span className="font-mono-tech text-[10px] text-[#9E9B93]">p.38</span>
                            </div>
                          </div>
                        </div>
                      )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
