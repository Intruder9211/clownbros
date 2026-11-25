'use client';

import React, { useState, useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '@/lib/gsap';

interface BuildStage {
  num: string;
  title: string;
  phase: string;
  summary: string;
  deliverable: string;
  artifactType: 'architecture' | 'wireframe' | 'code' | 'security' | 'deploy';
}

const STAGES: BuildStage[] = [
  {
    num: '01',
    title: 'Discovery',
    phase: 'Days 1–5 // System Blueprint',
    summary:
      'We unpack product constraints, map user journeys, and lock down a concrete architecture spec and fixed milestone plan before writing production code.',
    deliverable: 'System Architecture + Scope Spec',
    artifactType: 'architecture',
  },
  {
    num: '02',
    title: 'Architecture & Design',
    phase: 'Week 1–2 // Tokens & Wireframes',
    summary:
      'Interactive Figma wireframes, editorial typography scales, and tokenized component libraries designed for clarity, accessibility, and fast engineering handoff.',
    deliverable: 'Figma Design System + Clickable Prototype',
    artifactType: 'wireframe',
  },
  {
    num: '03',
    title: 'Development',
    phase: 'Weekly Sprints // Clean TypeScript',
    summary:
      'Type-safe Next.js, React, Flutter, and Node.js engineering with daily GitHub commits, live staging previews, and modular API boundaries.',
    deliverable: 'Private Repo + Weekly Staging Builds',
    artifactType: 'code',
  },
  {
    num: '04',
    title: 'Testing & Security',
    phase: 'Pre-Release // Hardening & QA',
    summary:
      'Automated integration checks, OWASP Top 10 security reviews, dependency audits, and Core Web Vitals optimization across desktop and mobile.',
    deliverable: 'OWASP Audit + Lighthouse 95+ Tuning',
    artifactType: 'security',
  },
  {
    num: '05',
    title: 'Deployment & Growth',
    phase: 'Launch & Beyond // CI/CD & Telemetry',
    summary:
      'Zero-downtime rollouts to Vercel, AWS, or Docker with automated rollbacks, real-time error telemetry, 30-day bug warranty, and full IP transfer.',
    deliverable: 'CI/CD Pipeline + 100% IP Ownership',
    artifactType: 'deploy',
  },
];

export default function BuildRoom() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const stageEls = gsap.utils.toArray<HTMLElement>('.build-stage-item');
        stageEls.forEach((el, idx) => {
          ScrollTrigger.create({
            trigger: el,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => setActiveIndex(idx),
            onEnterBack: () => setActiveIndex(idx),
          });
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  const current = STAGES[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="bg-[#171817] text-[#F2EFE7] py-16 sm:py-28 border-y border-white/10"
    >
      <div className="studio-container">
        <div className="max-w-2xl mb-10 sm:mb-16">
          <span className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[var(--accent-orange)] block mb-3">
            06 — Inside The Build Room
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.08]">
            How an idea becomes{' '}
            <span className="font-serif-editorial italic font-normal text-[var(--accent-orange)]">
              production software.
            </span>
          </h2>
        </div>

        {/* Mobile & Tablet Horizontal Stage Filter */}
        <div className="lg:hidden flex flex-nowrap overflow-x-auto no-scrollbar gap-2 pb-6 mb-6 border-b border-white/10 -mx-1 px-1">
          {STAGES.map((stage, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={stage.num}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-full font-mono-tech text-xs border transition-colors ${
                  isActive
                    ? 'bg-[var(--accent-orange)] text-[#F2EFE7] border-[var(--accent-orange)]'
                    : 'bg-[#202120] text-[#9E9B93] border-white/12 hover:text-[#F2EFE7]'
                }`}
              >
                {stage.num} {stage.title}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: 5 Vertical Stacked Stage Cards */}
          <div className="lg:col-span-6 space-y-4">
            {STAGES.map((stage, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={stage.num}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`build-stage-item w-full text-left p-5 sm:p-7 rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? 'bg-[#202120] border-[var(--accent-orange)]'
                      : 'bg-transparent border-white/10 hover:border-white/25'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono-tech text-[11px] sm:text-xs text-[var(--accent-orange)]">
                      {stage.num} — {stage.phase}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 transition-opacity ${
                        isActive ? 'bg-[var(--accent-orange)] opacity-100' : 'bg-white/20 opacity-40'
                      }`}
                    />
                  </div>
                  <h3 className="font-display text-lg sm:text-2xl font-semibold text-[#F2EFE7]">
                    {stage.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#9E9B93] leading-relaxed">
                    {stage.summary}
                  </p>
                  <div className="mt-4 pt-3 border-t border-white/8 font-mono-tech text-[11px] text-[#F2EFE7]/75">
                    Deliverable: {stage.deliverable}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Sticky Visual Artifact Panel */}
          <div className="lg:col-span-6 lg:sticky lg:top-28 min-w-0">
            <div className="bg-[#202120] border border-[#F2EFE7]/12 rounded-3xl p-5 sm:p-8 shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-[#F2EFE7]/10">
                <span className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#9E9B93]">
                  BUILD ARTIFACT {'//'} STAGE {current.num}
                </span>
                <span className="font-mono-tech text-[11px] px-3 py-1 rounded-full bg-[#F15A3B]/15 text-[#F15A3B] whitespace-nowrap">
                  {current.title}
                </span>
              </div>

              {/* Dynamic Artifact View */}
              {current.artifactType === 'architecture' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#171817] border border-[#F2EFE7]/10">
                    <div className="font-mono-tech text-[11px] text-[#F15A3B] mb-3">
                      SYSTEM TOPOLOGY
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-center font-mono-tech text-xs">
                      <div className="p-3 rounded-lg bg-[#202120] border border-[#F2EFE7]/10">
                        Edge CDN
                        <div className="text-[10px] text-[#9E9B93] mt-1">Next.js App</div>
                      </div>
                      <div className="p-3 rounded-lg bg-[#202120] border border-[#3154D9]/50">
                        API Layer
                        <div className="text-[10px] text-[#9E9B93] mt-1">Auth + Queue</div>
                      </div>
                      <div className="p-3 rounded-lg bg-[#202120] border border-[#F15A3B]/50">
                        PostgreSQL
                        <div className="text-[10px] text-[#9E9B93] mt-1">Prisma ORM</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#171817] border border-[#F2EFE7]/10 font-mono-tech text-xs text-[#9E9B93]">
                    ✓ User flows mapped &nbsp; ✓ Threat model signed &nbsp; ✓ Fixed milestone schedule
                  </div>
                </div>
              )}

              {current.artifactType === 'wireframe' && (
                <div className="p-5 rounded-xl bg-[#171817] border border-[#F2EFE7]/10 space-y-4">
                  <div className="flex items-center justify-between font-mono-tech text-[11px] text-[#9E9B93]">
                    <span>DESIGN TOKENS &amp; WIREFRAME</span>
                    <span className="text-[#3154D9]">FIGMA AUTO-LAYOUT</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { name: 'Paper', hex: '#F2EFE7' },
                      { name: 'Ink', hex: '#171817' },
                      { name: 'Orange', hex: '#F15A3B' },
                      { name: 'Cobalt', hex: '#3154D9' },
                    ].map((c) => (
                      <div key={c.hex} className="p-2 rounded-lg bg-[#202120] border border-[#F2EFE7]/10">
                        <div className="h-8 rounded mb-1.5 border border-white/10" style={{ backgroundColor: c.hex }} />
                        <div className="font-mono-tech text-[10px]">{c.hex}</div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 rounded-lg border border-dashed border-[#F2EFE7]/20 space-y-2">
                    <div className="h-3 w-2/3 bg-[#F2EFE7]/15 rounded" />
                    <div className="h-2 w-full bg-[#F2EFE7]/8 rounded" />
                    <div className="h-2 w-4/5 bg-[#F2EFE7]/8 rounded" />
                  </div>
                </div>
              )}

              {current.artifactType === 'code' && (
                <div className="p-5 rounded-xl bg-[#171817] border border-[#F2EFE7]/10 font-mono-tech text-xs overflow-x-auto">
                  <div className="text-[#9E9B93] mb-3">{`// src/app/api/orders/route.ts`}</div>
                  <pre className="leading-relaxed text-[#F2EFE7]/90">
{`export async function POST(req: Request) {
  const payload = orderSchema.parse(await req.json());
  const tx = await db.$transaction(async (prisma) => {
    return prisma.order.create({ data: payload });
  });
  return NextResponse.json({ ok: true, id: tx.id });
}`}
                  </pre>
                </div>
              )}

              {current.artifactType === 'security' && (
                <div className="p-5 rounded-xl bg-[#171817] border border-[#F2EFE7]/10 space-y-3 font-mono-tech text-xs">
                  <div className="text-[#F15A3B]">PRE-RELEASE VERIFICATION</div>
                  {[
                    ['OWASP Top 10 Input & Auth Checks', 'PASSED'],
                    ['TypeScript Strict & ESLint Clean', 'PASSED'],
                    ['Core Web Vitals (LCP / CLS / INP)', 'VERIFIED'],
                    ['Cross-Device & Keyboard Accessibility', 'PASSED'],
                  ].map(([check, status]) => (
                    <div
                      key={check}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-[#202120]"
                    >
                      <span className="text-[#F2EFE7]/85">{check}</span>
                      <span className="text-[#F15A3B]">{status}</span>
                    </div>
                  ))}
                </div>
              )}

              {current.artifactType === 'deploy' && (
                <div className="p-4 sm:p-5 rounded-xl bg-[#171817] border border-[#F2EFE7]/10 space-y-4 font-mono-tech text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[#3154D9]">PRODUCTION PIPELINE</span>
                    <span className="text-[#F15A3B]">ZERO-DOWNTIME</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
                    {['git push', 'CI build', 'Edge Deploy', 'Telemetry'].map((step, i) => (
                      <div key={step} className="p-3 rounded-lg bg-[#202120] border border-[#F2EFE7]/10 flex flex-col items-center justify-center">
                        <div className="text-[10px] text-[#9E9B93]">0{i + 1}</div>
                        <div className="mt-1 text-[#F2EFE7] whitespace-nowrap">{step}</div>
                      </div>
                    ))}
                  </div>
                  <div className="text-[#9E9B93] text-[11px]">
                    100% source code, cloud infra, and IP transferred to client repository.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
