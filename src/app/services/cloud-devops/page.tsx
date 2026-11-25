'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Server, GitBranch, Database, Activity } from 'lucide-react';
import ContactModal from '@/components/ContactModal';
import StudioCTA from '@/components/StudioCTA';
import HeroAmbientBg from '@/components/HeroAmbientBg';

const PIPELINE = [
  { step: '01', name: 'Git Push', cmd: 'git push origin main', status: 'Triggered' },
  { step: '02', name: 'Typecheck & Test', cmd: 'tsc --noEmit && vitest run', status: 'Passed' },
  { step: '03', name: 'Docker / Edge Build', cmd: 'docker buildx --platform linux/amd64', status: 'Verified' },
  { step: '04', name: 'Zero-Downtime Rollout', cmd: 'vercel deploy --prod / aws ecs update', status: 'Live' },
];

export default function CloudDevOpsPage() {
  const [activePipe, setActivePipe] = useState(3);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main>
      <ContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        preSelectedService="Cloud & DevOps"
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
            <span className="text-[#F15A3B]">Cloud &amp; DevOps</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.03]">
                Infrastructure that{' '}
                <span className="font-serif-editorial italic font-normal text-[#3154D9]">
                  never blinks.
                </span>
              </h1>
            </div>
            <div className="lg:col-span-4 space-y-5">
              <p className="text-base text-[#6B6A65] leading-relaxed">
                Automated CI/CD pipelines, containerized Docker workloads, and resilient AWS/Vercel cloud foundations with real-time error telemetry.
              </p>
              <button type="button" onClick={() => setModalOpen(true)} className="btn-studio-primary">
                <span>Consult Cloud Engineer</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
            </div>
          </div>
        </div>
      </section>

      {/* Automated Deployment Sequence & Topology */}
      <section className="bg-[#171817] text-[#F2EFE7] py-20 sm:py-24">
        <div className="studio-container">
          <div className="mb-10">
            <span className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[#F15A3B] block mb-2">
              CI/CD Deployment Sequence
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-semibold">
              From commit to global edge without manual intervention.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {PIPELINE.map((p, idx) => (
              <button
                key={p.step}
                type="button"
                onClick={() => setActivePipe(idx)}
                className={`text-left p-5 rounded-2xl border transition-colors ${
                  activePipe === idx
                    ? 'bg-[#222322] border-[#F15A3B]'
                    : 'bg-[#1D1E1D] border-[#F2EFE7]/10 hover:border-[#F2EFE7]/25'
                }`}
              >
                <div className="flex items-center justify-between font-mono-tech text-[11px] mb-3">
                  <span className="text-[#F15A3B]">{p.step}</span>
                  <span className="text-[#9E9B93]">{p.status}</span>
                </div>
                <div className="font-display text-lg font-semibold">{p.name}</div>
                <code className="block mt-2 font-mono-tech text-[11px] text-[#9E9B93] truncate">
                  {p.cmd}
                </code>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Server, title: 'AWS, GCP & Vercel', desc: 'Serverless edge functions, ECS clusters, and CDN caching.' },
              { icon: GitBranch, title: 'GitHub Actions CI/CD', desc: 'Automated lint, typecheck, test, and preview environments.' },
              { icon: Database, title: 'Database Reliability', desc: 'PostgreSQL/Redis clustering, automated backups, and migrations.' },
              { icon: Activity, title: 'Observability', desc: 'Structured logs, error alerts, and uptime monitoring.' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="p-6 rounded-2xl bg-[#202120] border border-[#F2EFE7]/10">
                  <Icon className="w-5 h-5 text-[#3154D9] mb-4" />
                  <h3 className="font-display text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-xs text-[#9E9B93] leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <StudioCTA />
    </main>
  );
}
