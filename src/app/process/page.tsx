'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '@/lib/gsap';
import StudioCTA from '@/components/StudioCTA';
import HeroFrame from '@/components/HeroFrame';

const STEPS = [
  {
    num: '01',
    phase: 'Days 1–5',
    title: 'Discovery & Architecture Blueprinting',
    desc: 'We unpack your product requirements, define user journeys, evaluate technical feasibility, and produce a complete system architecture diagram and scope spec.',
    deliverables: ['System Architecture Diagram', 'Database Schema Spec', 'Interactive Wireframes', 'Fixed Milestone Schedule'],
  },
  {
    num: '02',
    phase: 'Weeks 1–2',
    title: 'Design System & Interactive Prototyping',
    desc: 'We establish typographic hierarchy, design tokens, and clickable Figma prototypes so every edge state is validated before full-stack sprint execution.',
    deliverables: ['Figma Design Tokens', 'Component Library', 'Clickable Prototype', 'WCAG Contrast Review'],
  },
  {
    num: '03',
    phase: 'Weekly Sprints',
    title: 'Agile Sprint Execution & Daily Commits',
    desc: 'Our engineers build in focused 1-week sprints with clean TypeScript. You receive direct access to private GitHub repositories and live staging previews.',
    deliverables: ['Staging Preview URLs', 'Private GitHub Access', 'Weekly Demo Reviews', 'Unit & Integration Tests'],
  },
  {
    num: '04',
    phase: 'Pre-Release',
    title: 'Security, Performance & QA Audits',
    desc: 'Before production, every build undergoes automated testing, Core Web Vitals speed tuning, OWASP Top 10 checks, and cross-device QA.',
    deliverables: ['OWASP Security Review', 'Core Web Vitals Tuning', 'Cross-Device QA Signoff', 'Accessibility Check'],
  },
  {
    num: '05',
    phase: 'Launch & Beyond',
    title: 'Zero-Downtime Deployment & IP Transfer',
    desc: 'We orchestrate smooth rollouts to Vercel, AWS, or Docker with error telemetry, 30-day bug warranty, and 100% intellectual property transfer.',
    deliverables: ['CI/CD Pipeline Setup', 'DNS & SSL Configuration', 'Error Telemetry', '100% IP & Code Transfer'],
  },
];

export default function ProcessPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        gsap.utils.toArray<HTMLElement>('.process-step-card').forEach((card, idx) => {
          ScrollTrigger.create({
            trigger: card,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => setActiveIdx(idx),
            onEnterBack: () => setActiveIdx(idx),
          });
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <main>
      <HeroFrame>
        <span className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[#F15A3B] block mb-4">
          Engineering Delivery Framework
        </span>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.03]">
              Five stages from{' '}
              <span className="font-serif-editorial italic font-normal text-[#3154D9]">
                concept to production.
              </span>
            </h1>
          </div>
          <div className="lg:col-span-4 space-y-5">
            <p className="text-base text-[#6B6A65] leading-relaxed">
              We replace vague agency timelines with transparent milestones, daily commits, and 100% IP ownership.
            </p>
            <Link href="/contact" className="btn-studio-primary">
              <span>Start Discovery</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </HeroFrame>

      {/* Scroll-Driven 5-Stage Journey */}
      <section ref={containerRef} className="bg-[#171817] text-[#F2EFE7] py-20 sm:py-28">
        <div className="studio-container grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Sticky Progress Rail */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <div className="font-mono-tech text-xs uppercase tracking-[0.14em] text-[#F15A3B]">
              STAGE {STEPS[activeIdx].num} OF 05
            </div>
            <h2 className="font-display text-3xl font-semibold leading-tight">
              {STEPS[activeIdx].title}
            </h2>
            <div className="space-y-2 pt-4 border-t border-[#F2EFE7]/12">
              {STEPS.map((s, idx) => (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`w-full flex items-center justify-between py-2 px-3 rounded-lg text-left font-mono-tech text-xs transition-colors ${
                    activeIdx === idx
                      ? 'bg-[#F15A3B] text-[#F2EFE7]'
                      : 'text-[#9E9B93] hover:text-[#F2EFE7]'
                  }`}
                >
                  <span>{s.num} — {s.title.split(' ')[0]}</span>
                  <span>{s.phase}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 5 Detailed Stage Cards */}
          <div className="lg:col-span-8 space-y-8">
            {STEPS.map((step, idx) => (
              <div
                key={step.num}
                className={`process-step-card p-8 sm:p-10 rounded-3xl border transition-colors ${
                  activeIdx === idx
                    ? 'bg-[#202120] border-[#F15A3B]'
                    : 'bg-[#1C1D1C] border-[#F2EFE7]/10'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono-tech text-xs text-[#F15A3B]">
                    PHASE {step.num} {'//'} {step.phase}
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-base text-[#9E9B93] leading-relaxed">{step.desc}</p>

                <div className="mt-6 pt-6 border-t border-[#F2EFE7]/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {step.deliverables.map((d) => (
                    <div key={d} className="font-mono-tech text-xs text-[#F2EFE7]/85 flex items-center gap-2">
                      <span className="text-[#F15A3B]">✓</span>
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StudioCTA />
    </main>
  );
}
