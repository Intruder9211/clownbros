'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Shield, Lock, FileCheck, Eye, Server } from 'lucide-react';
import StudioCTA from '@/components/StudioCTA';
import HeroFrame from '@/components/HeroFrame';

const PILLARS = [
  {
    icon: FileCheck,
    title: 'Mutual NDA & 100% IP Assignment',
    desc: 'We execute mutual non-disclosure agreements before reviewing sensitive specs or repositories. All source code, Figma systems, database schemas, and cloud assets belong 100% to you.',
    note: 'Executed prior to discovery on request',
  },
  {
    icon: Shield,
    title: 'OWASP Top 10 Engineering Practices',
    desc: 'We build against OWASP Top 10 security guidelines—strict input validation, parameterized ORM queries, role-based access control, and encrypted environment secrets.',
    note: 'Automated dependency & lint checks in CI',
  },
  {
    icon: Lock,
    title: 'Data Handling & Privacy First',
    desc: 'Client data is isolated per environment. We never train third-party AI models on proprietary client codebases, documents, or user records.',
    note: 'Zero cross-client data sharing',
  },
  {
    icon: Eye,
    title: 'Transparent Repository Access',
    desc: 'Your engineering leads have direct visibility into private GitHub repositories, pull requests, and staging deployments from day one.',
    note: 'No black-box code handoffs',
  },
  {
    icon: Server,
    title: 'Resilient Cloud & Backups',
    desc: 'Production deployments use HTTPS/TLS, environment-scoped secrets, automated database snapshots, and rollback-ready CI/CD workflows.',
    note: 'Managed on your AWS / Vercel / Neon accounts',
  },
];

export default function TrustPage() {
  return (
    <main>
      <HeroFrame>
        <span className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[#F15A3B] block mb-4">
          Trust &amp; Security Center
        </span>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.03]">
              Your IP, your code,{' '}
              <span className="font-serif-editorial italic font-normal text-[#3154D9]">
                your control.
              </span>
            </h1>
          </div>
          <div className="lg:col-span-4 space-y-5">
            <p className="text-base text-[#6B6A65] leading-relaxed">
              Clear legal ownership, mutual NDAs, and disciplined OWASP security practices—stated accurately without inflated claims.
            </p>
            <Link href="/contact" className="btn-studio-primary">
              <span>Request Mutual NDA</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </HeroFrame>

      <section className="bg-[#171817] text-[#F2EFE7] py-20 sm:py-28">
        <div className="studio-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="p-8 rounded-2xl bg-[#202120] border border-[#F2EFE7]/12 flex flex-col justify-between gap-6"
                >
                  <div>
                    <Icon className="w-5 h-5 text-[#F15A3B] mb-5" />
                    <h2 className="font-display text-xl font-semibold">{p.title}</h2>
                    <p className="mt-3 text-sm text-[#9E9B93] leading-relaxed">{p.desc}</p>
                  </div>
                  <div className="pt-4 border-t border-[#F2EFE7]/10 font-mono-tech text-[11px] text-[#F15A3B]">
                    ✓ {p.note}
                  </div>
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
