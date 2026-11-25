'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import ContactModal from '@/components/ContactModal';
import StudioCTA from '@/components/StudioCTA';
import HeroAmbientBg from '@/components/HeroAmbientBg';

const WORKFLOW = [
  {
    id: 'input',
    step: '01',
    label: 'Input',
    desc: 'User prompts, PDFs, webhooks, or CRM events normalized into structured payloads.',
    tech: 'REST / Webhooks / PDF Ingestion',
  },
  {
    id: 'retrieval',
    step: '02',
    label: 'Retrieval',
    desc: 'Hybrid semantic + keyword search over chunked company knowledge in vector databases.',
    tech: 'PGVector / Pinecone / Embeddings',
  },
  {
    id: 'llm',
    step: '03',
    label: 'LLM',
    desc: 'Context-grounded reasoning using OpenAI, Anthropic Claude, or self-hosted open models.',
    tech: 'Structured Outputs / Tool Calling',
  },
  {
    id: 'agents',
    step: '04',
    label: 'Agents',
    desc: 'Multi-step execution units with human-in-the-loop approval gates before external actions.',
    tech: 'LangChain / Custom State Machines',
  },
  {
    id: 'output',
    step: '05',
    label: 'Output',
    desc: 'Verified API mutations, drafted proposals, Slack briefs, or streamed UI responses.',
    tech: 'Streaming SSE / Audit Logs',
  },
];

export default function AISolutionsPage() {
  const [activeNode, setActiveNode] = useState(2);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main>
      <ContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        preSelectedService="AI Solutions"
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
            <span className="text-[#F15A3B]">AI Solutions</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.03]">
                Intelligent systems with{' '}
                <span className="font-serif-editorial italic font-normal text-[#F15A3B]">
                  deterministic guardrails.
                </span>
              </h1>
            </div>
            <div className="lg:col-span-4 space-y-5">
              <p className="text-base text-[#6B6A65] leading-relaxed">
                Production RAG pipelines, autonomous workflow agents, and custom LLM integrations engineered with strict data boundaries.
              </p>
              <button type="button" onClick={() => setModalOpen(true)} className="btn-studio-primary">
                <span>Integrate AI Systems</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Workflow Visualization: Input -> Retrieval -> LLM -> Agents -> Output */}
      <section className="bg-[#171817] text-[#F2EFE7] py-20 sm:py-24">
        <div className="studio-container">
          <span className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[#F15A3B] block mb-2">
            AI Pipeline Architecture
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-semibold mb-10">
            Input → Retrieval → LLM → Agents → Output
          </h2>

          <div className="flex flex-nowrap sm:grid sm:grid-cols-5 overflow-x-auto no-scrollbar gap-3 mb-8 -mx-1 px-1 pb-1">
            {WORKFLOW.map((node, idx) => (
              <button
                key={node.id}
                type="button"
                onClick={() => setActiveNode(idx)}
                className={`shrink-0 min-w-[125px] sm:min-w-0 text-left p-5 rounded-2xl border transition-colors ${
                  activeNode === idx
                    ? 'bg-[#F15A3B] text-[#F2EFE7] border-[#F15A3B]'
                    : 'bg-[#202120] text-[#F2EFE7] border-[#F2EFE7]/12 hover:border-[#F2EFE7]/30'
                }`}
              >
                <div className="font-mono-tech text-[10px] opacity-80">{node.step}</div>
                <div className="font-display text-lg font-semibold mt-1">{node.label}</div>
              </button>
            ))}
          </div>

          <div className="p-8 rounded-3xl bg-[#202120] border border-[#F2EFE7]/12 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="font-mono-tech text-xs text-[#F15A3B]">
                NODE {WORKFLOW[activeNode].step} {'//'} {WORKFLOW[activeNode].label.toUpperCase()}
              </span>
              <p className="mt-2 text-base sm:text-lg text-[#F2EFE7] leading-relaxed">
                {WORKFLOW[activeNode].desc}
              </p>
            </div>
            <div className="font-mono-tech text-xs px-4 py-2.5 rounded-xl bg-[#171817] border border-[#F2EFE7]/12 text-[#9E9B93] shrink-0">
              {WORKFLOW[activeNode].tech}
            </div>
          </div>
        </div>
      </section>

      <StudioCTA />
    </main>
  );
}
