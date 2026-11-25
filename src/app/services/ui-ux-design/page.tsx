'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import ContactModal from '@/components/ContactModal';
import StudioCTA from '@/components/StudioCTA';
import HeroAmbientBg from '@/components/HeroAmbientBg';

const JOURNEY = [
  {
    step: '01',
    name: 'Research',
    detail: 'Stakeholder interviews, heuristic audits, and mapping core user jobs-to-be-done.',
    artifact: 'User Flow & Friction Map',
  },
  {
    step: '02',
    name: 'Wireframes',
    detail: 'Low-fidelity structural layouts validating hierarchy and information density early.',
    artifact: 'Structural Grid Wireframes',
  },
  {
    step: '03',
    name: 'Design System',
    detail: 'Color tokens, typographic scales, spacing rules, and reusable Figma auto-layout components.',
    artifact: 'Figma Tokens & Component Kit',
  },
  {
    step: '04',
    name: 'Prototype',
    detail: 'Clickable interactive prototypes demonstrating transitions, edge states, and microinteractions.',
    artifact: 'Interactive Clickable Prototype',
  },
  {
    step: '05',
    name: 'Final Interface',
    detail: 'WCAG-compliant, developer-ready specs with clean handoff directly into React/Flutter code.',
    artifact: 'Production UI & Spec Handoff',
  },
];

export default function UIUXDesignPage() {
  const [activeIdx, setActiveIdx] = useState(2);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main>
      <ContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        preSelectedService="UI/UX Design"
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
            <span className="text-[#F15A3B]">UI/UX Design</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.03]">
                Interfaces designed with{' '}
                <span className="font-serif-editorial italic font-normal text-[#F15A3B]">
                  editorial restraint.
                </span>
              </h1>
            </div>
            <div className="lg:col-span-4 space-y-5">
              <p className="text-base text-[#6B6A65] leading-relaxed">
                We craft Figma design systems, interactive prototypes, and conversion-focused product interfaces that engineers love implementing.
              </p>
              <button type="button" onClick={() => setModalOpen(true)} className="btn-studio-primary">
                <span>Request Design System</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transformation Journey: Research -> Wireframes -> Design System -> Prototype -> Final Interface */}
      <section className="bg-[#171817] text-[#F2EFE7] py-20 sm:py-24">
        <div className="studio-container">
          <span className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[#F15A3B] block mb-3">
            Transformation Journey
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-10">
            Research → Wireframes → Design System → Prototype → Final Interface
          </h2>

          <div className="flex flex-nowrap sm:grid sm:grid-cols-5 overflow-x-auto no-scrollbar gap-3 mb-8 -mx-1 px-1 pb-1">
            {JOURNEY.map((j, idx) => (
              <button
                key={j.step}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`shrink-0 min-w-[130px] sm:min-w-0 text-left p-4 rounded-2xl border transition-colors ${
                  activeIdx === idx
                    ? 'bg-[#F15A3B] text-[#F2EFE7] border-[#F15A3B]'
                    : 'bg-[#202120] text-[#F2EFE7] border-[#F2EFE7]/12 hover:border-[#F2EFE7]/30'
                }`}
              >
                <div className="font-mono-tech text-[10px] opacity-80">{j.step}</div>
                <div className="font-display text-sm font-semibold mt-1">{j.name}</div>
              </button>
            ))}
          </div>

          <div className="p-8 rounded-3xl bg-[#202120] border border-[#F2EFE7]/12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="font-mono-tech text-xs text-[#F15A3B]">
                STAGE {JOURNEY[activeIdx].step} {'//'} {JOURNEY[activeIdx].artifact}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold mt-2">
                {JOURNEY[activeIdx].name}
              </h3>
              <p className="mt-3 text-base text-[#9E9B93] leading-relaxed">
                {JOURNEY[activeIdx].detail}
              </p>
            </div>
            <div className="lg:col-span-5 p-5 rounded-2xl bg-[#171817] border border-[#F2EFE7]/10 font-mono-tech text-xs space-y-2.5">
              <div className="text-[#9E9B93]">DESIGN TOKENS PREVIEW</div>
              <div className="flex items-center justify-between py-1.5 border-b border-[#F2EFE7]/8">
                <span>--font-display</span>
                <span className="text-[#F15A3B]">Space Grotesk</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-[#F2EFE7]/8">
                <span>--font-serif</span>
                <span className="text-[#3154D9]">Instrument Serif</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span>--contrast-ratio</span>
                <span>WCAG AA+</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StudioCTA />
    </main>
  );
}
