'use client';

import React, { useState } from 'react';
import { ShieldCheck, Code2, GitCommit, Layers, Plus, Minus } from 'lucide-react';

const PRINCIPLES = [
  {
    id: 'lab',
    icon: Layers,
    animClass: 'animate-icon-float',
    label: '04 Live In-House Platforms',
    title: 'Production-Tested Lab',
    desc: 'The ClownFounder, ClownMart, ClownEaser, and ClownKosh are live systems built and operated by our team.',
  },
  {
    id: 'ip',
    icon: ShieldCheck,
    animClass: 'animate-icon-heartbeat',
    label: '100% IP & Source Transfer',
    title: 'Zero Vendor Lock-In',
    desc: 'Every repository, Figma file, database schema, and cloud account belongs to you from day one.',
  },
  {
    id: 'transparency',
    icon: GitCommit,
    animClass: 'animate-icon-rock',
    label: 'Daily Commits & Staging',
    title: 'Radical Code Transparency',
    desc: 'Direct GitHub access, live staging previews, and weekly milestone demos—never a black-box agency.',
  },
  {
    id: 'security',
    icon: Code2,
    animClass: 'animate-icon-heartbeat',
    label: 'OWASP & Core Web Vitals',
    title: 'Hardened Engineering',
    desc: 'Type-safe TypeScript, mutual NDAs, OWASP Top 10 practices, and 30-day post-launch warranty.',
  },
];

export default function ProofSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="proof"
      style={{ backgroundColor: 'var(--bg-s2)' }}
      className="text-[var(--text-ink)] py-16 sm:py-24 border-b border-[var(--border-hairline)]"
    >
      <div className="studio-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start mb-10 sm:mb-12">
          <div className="lg:col-span-5">
            <span className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[var(--accent-orange)] block mb-3">
              03 — Proof, Not Promises
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.1]">
              Built by engineers who{' '}
              <span className="font-serif-editorial italic font-normal text-[var(--text-muted)]">
                ship their own products.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-sm sm:text-lg text-[var(--text-muted)] leading-relaxed">
              Instead of hiding behind vanity logos or invented metrics, we prove our engineering standards through live in-house software, open repository workflows, and transparent delivery guarantees.
            </p>
          </div>
        </div>

        {/* Mobile: 2x2 Expandable Grid (Titles only by default) */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {PRINCIPLES.map((item) => {
            const Icon = item.icon;
            const isOpen = expandedId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-colors ${
                  isOpen
                    ? 'bg-[var(--bg-s1)] border-[var(--accent-orange)]'
                    : 'bg-[var(--bg-s1)] border-[var(--border-hairline)]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-4 flex flex-col justify-between gap-3 min-h-[104px]"
                >
                  <div className="w-full flex items-center justify-between gap-2">
                    <Icon className={`w-4 h-4 text-[var(--accent-orange)] shrink-0 ${item.animClass}`} />
                    <span className="w-6 h-6 rounded-full border border-[var(--border-hairline)] flex items-center justify-center shrink-0 text-[var(--text-ink)]">
                      {isOpen ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                    </span>
                  </div>
                  <h3 className="font-display text-sm font-semibold leading-snug text-[var(--text-ink)]">
                    {item.title}
                  </h3>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden px-4">
                    <div className="pb-4 pt-1 border-t border-[var(--border-hairline)]">
                      <span className="font-mono-tech text-[10px] uppercase tracking-wider text-[var(--accent-orange)] block mb-1">
                        {item.label}
                      </span>
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tablet & Desktop: 2 / 4 Column Grid with Hover Focus Zoom & Sibling Blur */}
        <div
          onMouseLeave={() => setHoveredId(null)}
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {PRINCIPLES.map((item) => {
            const Icon = item.icon;
            const isHovered = hoveredId === item.id;
            const isOtherBlurred = hoveredId !== null && !isHovered;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                className={`bg-[var(--bg-s1)] p-6 sm:p-7 rounded-2xl border flex flex-col justify-between gap-6 transition-all duration-300 ease-out ${
                  isHovered
                    ? 'scale-[1.03] z-10 border-[var(--accent-orange)] shadow-xl'
                    : isOtherBlurred
                    ? 'blur-[2.5px] opacity-60 scale-[0.985] border-[var(--border-hairline)]'
                    : 'border-[var(--border-hairline)]'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono-tech text-[11px] uppercase tracking-wider text-[var(--accent-orange)]">
                    {item.label}
                  </span>
                  <Icon
                    className={`w-5 h-5 shrink-0 transition-colors ${
                      isHovered ? 'text-[var(--accent-orange)]' : 'text-[var(--text-ink)]/80'
                    } ${item.animClass}`}
                  />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-[var(--text-ink)]">{item.title}</h3>
                  <p className="mt-2 text-sm text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
