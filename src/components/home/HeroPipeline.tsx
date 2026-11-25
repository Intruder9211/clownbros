'use client';

import React, { useState } from 'react';

interface StageNode {
  id: string;
  index: string;
  label: string;
  role: string;
  artifact: string;
  detail: string;
  stack: string[];
  accent: string;
}

const STAGES: StageNode[] = [
  {
    id: 'idea',
    index: '01',
    label: 'IDEA',
    role: 'Scope & Feasibility',
    artifact: 'architecture-spec.md',
    detail: 'Deconstruct business goals, map user flows, and define hard technical constraints before a single pixel is pushed.',
    stack: ['Domain Modeling', 'Threat Model', 'Fixed Spec'],
    accent: '#F15A3B',
  },
  {
    id: 'design',
    index: '02',
    label: 'DESIGN',
    role: 'Systems & Prototypes',
    artifact: 'tokens.figma.json',
    detail: 'Editorial typography, interactive wireframes, and tokenized component libraries engineered for accessibility and conversion.',
    stack: ['Figma Tokens', 'WCAG AA', 'Motion Spec'],
    accent: '#3154D9',
  },
  {
    id: 'development',
    index: '03',
    label: 'DEVELOPMENT',
    role: 'Full-Stack Engineering',
    artifact: 'src/app/api/route.ts',
    detail: 'Type-safe React, Next.js, Flutter, and Node.js systems with clean modular boundaries and automated test coverage.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL'],
    accent: '#F15A3B',
  },
  {
    id: 'deployment',
    index: '04',
    label: 'DEPLOYMENT',
    role: 'CI/CD & Hardening',
    artifact: '.github/workflows/ci.yml',
    detail: 'Zero-downtime rollouts, edge caching, OWASP checks, and automated rollback pipelines across Vercel and AWS.',
    stack: ['Docker', 'GitHub Actions', 'Edge CDN'],
    accent: '#3154D9',
  },
  {
    id: 'scale',
    index: '05',
    label: 'SCALE',
    role: 'Telemetry & Growth',
    artifact: 'vitals-99.9.telemetry',
    detail: 'Real-time error telemetry, Core Web Vitals optimization, and iterative product expansion backed by 100% IP ownership.',
    stack: ['Observability', 'Technical SEO', 'AI Agents'],
    accent: '#F15A3B',
  },
];

export default function HeroPipeline() {
  const [activeId, setActiveId] = useState<string>('development');

  const activeStage = STAGES.find((s) => s.id === activeId) || STAGES[2];

  return (
    <div
      className="bg-[#171817] text-[#F2EFE7] rounded-2xl border border-[#171817] p-4 sm:p-6 shadow-xl"
    >
      {/* Top Terminal Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#F2EFE7]/12">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F15A3B]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#3154D9]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#F2EFE7]/25" />
          <span className="ml-2 font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#9E9B93]">
            SYSTEM PIPELINE // INTERACTIVE
          </span>
        </div>
        <span className="font-mono-tech text-[11px] text-[#F15A3B]">
          STAGE {activeStage.index}/05
        </span>
      </div>

      {/* Interactive Node Chain: IDEA -> DESIGN -> DEVELOPMENT -> DEPLOYMENT -> SCALE */}
      <div className="relative">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {STAGES.map((stage, idx) => {
            const isActive = stage.id === activeId;
            return (
              <button
                key={stage.id}
                type="button"
                onMouseEnter={() => setActiveId(stage.id)}
                onFocus={() => setActiveId(stage.id)}
                onClick={() => setActiveId(stage.id)}
                className={`pipeline-node group relative text-left p-3.5 rounded-xl border transition-colors duration-200 ${
                  isActive
                    ? 'bg-[#262726] border-[#F15A3B] shadow-md'
                    : 'bg-[#202120] border-[#F2EFE7]/18 hover:border-[#F2EFE7]/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`font-mono-tech text-[10px] tracking-widest ${
                      isActive ? 'text-[#F15A3B]' : 'text-[#9E9B93]'
                    }`}
                  >
                    {stage.index}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full transition-transform duration-200 ${
                      isActive ? 'scale-125' : 'opacity-40 group-hover:opacity-80'
                    }`}
                    style={{ backgroundColor: stage.accent }}
                  />
                </div>
                <div className="font-display text-xs sm:text-[13px] font-semibold tracking-wide text-[#F2EFE7]">
                  {stage.label}
                </div>
                <div className="font-mono-tech text-[10px] text-[#9E9B93] mt-1 truncate">
                  {stage.role}
                </div>
                {idx < STAGES.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 text-[#9E9B93]/50 font-mono-tech text-[10px] z-10"
                  >
                    →
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Stage Inspection Panel */}
      <div className="mt-4 pt-4 border-t border-[#F2EFE7]/12 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-8">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="font-mono-tech text-[11px] px-2 py-0.5 rounded bg-[#F2EFE7]/8 text-[#F2EFE7]/90 border border-[#F2EFE7]/12">
              {activeStage.artifact}
            </span>
            <span className="font-mono-tech text-[11px] text-[#9E9B93]">
              {activeStage.role}
            </span>
          </div>
          <p className="text-sm text-[#F2EFE7]/85 leading-relaxed">
            {activeStage.detail}
          </p>
        </div>
        <div className="md:col-span-4 flex flex-wrap md:justify-end gap-1.5">
          {activeStage.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono-tech text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#F2EFE7]/15 text-[#F2EFE7]/80"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
