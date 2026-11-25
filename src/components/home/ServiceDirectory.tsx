'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface CapabilityGroup {
  id: string;
  index: string;
  title: string;
  tagline: string;
  services: {
    name: string;
    href: string;
    summary: string;
    stack: string[];
  }[];
}

const GROUPS: CapabilityGroup[] = [
  {
    id: 'experiences',
    index: '01',
    title: 'Digital Experiences',
    tagline: 'Interfaces, storefronts, and design systems built for speed and clarity.',
    services: [
      {
        name: 'Web Development',
        href: '/services/web-development',
        summary: 'Custom Next.js & React web apps, SaaS portals, and headless commerce.',
        stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
      },
      {
        name: 'UI/UX Design',
        href: '/services/ui-ux-design',
        summary: 'Editorial interfaces, Figma design tokens, and interactive prototypes.',
        stack: ['Figma', 'Design Systems', 'WCAG AA', 'Prototyping'],
      },
    ],
  },
  {
    id: 'engineering',
    index: '02',
    title: 'Product Engineering',
    tagline: 'Cross-platform mobile apps and resilient backend architectures.',
    services: [
      {
        name: 'Mobile Apps',
        href: '/services/mobile-apps',
        summary: 'iOS & Android applications with Flutter, React Native, and offline sync.',
        stack: ['Flutter', 'React Native', 'WebSockets', 'App Store'],
      },
      {
        name: 'Full Capabilities & APIs',
        href: '/services',
        summary: 'Scalable REST/GraphQL APIs, PostgreSQL schemas, and auth systems.',
        stack: ['Node.js', 'NestJS', 'PostgreSQL', 'Prisma'],
      },
    ],
  },
  {
    id: 'intelligent',
    index: '03',
    title: 'Intelligent Systems',
    tagline: 'Custom LLM pipelines, RAG search, and workflow automation.',
    services: [
      {
        name: 'AI Solutions',
        href: '/services/ai-solutions',
        summary: 'Autonomous agents, vector retrieval (RAG), and document ingestion.',
        stack: ['OpenAI / Claude', 'RAG', 'PGVector', 'LangChain'],
      },
    ],
  },
  {
    id: 'growth',
    index: '04',
    title: 'Growth & Infrastructure',
    tagline: 'Zero-downtime cloud pipelines and technical search visibility.',
    services: [
      {
        name: 'Cloud & DevOps',
        href: '/services/cloud-devops',
        summary: 'AWS, Vercel, Docker containers, CI/CD automation, and telemetry.',
        stack: ['AWS', 'Docker', 'GitHub Actions', 'Vercel'],
      },
      {
        name: 'SEO & Growth',
        href: '/services/seo-growth',
        summary: 'Technical SEO architecture, schema markup, and Core Web Vitals tuning.',
        stack: ['Technical SEO', 'Schema.org', 'Core Web Vitals', 'Analytics'],
      },
    ],
  },
];

export default function ServiceDirectory() {
  const [activeGroupId, setActiveGroupId] = useState<string>('experiences');
  const activeGroup = GROUPS.find((g) => g.id === activeGroupId) || GROUPS[0];

  return (
    <section
      style={{ backgroundColor: 'var(--bg-s4)' }}
      className="text-[var(--text-ink)] py-20 sm:py-28 border-t border-[var(--border-hairline)]"
    >
      <div className="studio-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[var(--border-hairline)]">
          <div>
            <span className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[var(--accent-orange)] block mb-3">
              05 — What We Engineer
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.08]">
              Four capability pillars,{' '}
              <span className="font-serif-editorial italic font-normal text-[var(--text-muted)]">
                zero agency fluff.
              </span>
            </h2>
          </div>
          <Link
            href="/services"
            className="link-editorial font-display text-sm font-medium inline-flex items-center gap-1.5 shrink-0"
          >
            Full Service Directory <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile & Tablet: Sticky Layered Card Deck (Distinct from Selected Works) */}
        <div className="mt-8 space-y-5 lg:hidden pb-4">
          {GROUPS.map((group, idx) => (
            <div
              key={group.id}
              style={{
                top: `${88 + idx * 14}px`,
                zIndex: (idx + 1) * 10,
              }}
              className="sticky rounded-2xl bg-[var(--bg-s1)] border border-[var(--border-hairline)] p-5 shadow-[0_-6px_24px_rgba(0,0,0,0.06)] space-y-4 transition-transform duration-300"
            >
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-[var(--border-hairline)]">
                <div>
                  <span className="font-mono-tech text-[11px] text-[var(--accent-orange)]">
                    {group.index} {'//'} CAPABILITY
                  </span>
                  <h3 className="font-display text-xl font-semibold text-[var(--text-ink)] mt-0.5">
                    {group.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1 leading-relaxed">
                    {group.tagline}
                  </p>
                </div>
                <span className="font-mono-tech text-[10px] px-2 py-1 rounded-full bg-[var(--bg-s4)] text-[var(--text-ink)] shrink-0">
                  {group.services.length} {group.services.length === 1 ? 'Track' : 'Tracks'}
                </span>
              </div>
              <div className="space-y-2.5">
                {group.services.map((srv) => (
                  <Link
                    key={srv.name}
                    href={srv.href}
                    className="block p-3.5 rounded-xl bg-white/80 border border-[var(--border-hairline)] hover:border-[var(--accent-orange)] transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-display text-sm sm:text-base font-semibold text-[var(--text-ink)]">
                        {srv.name}
                      </span>
                      <ArrowUpRight className="w-4 h-4 shrink-0 text-[var(--accent-orange)]" />
                    </div>
                    <p className="mt-1 text-xs text-[var(--text-muted)] leading-relaxed">
                      {srv.summary}
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {srv.stack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono-tech text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-[var(--border-hairline)] text-[var(--text-ink)]/80"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Interactive Directory Tabs + Inspection Panel */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-10 mt-12">
          <div className="lg:col-span-5 flex flex-col divide-y divide-[var(--border-hairline)] border-y border-[var(--border-hairline)]">
            {GROUPS.map((group) => {
              const isActive = group.id === activeGroupId;
              return (
                <button
                  key={group.id}
                  type="button"
                  onMouseEnter={() => setActiveGroupId(group.id)}
                  onClick={() => setActiveGroupId(group.id)}
                  className={`group text-left py-6 px-3 transition-colors flex items-start justify-between gap-4 ${
                    isActive ? 'bg-white/60' : 'hover:bg-white/35'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="font-mono-tech text-[11px] text-[var(--accent-orange)] mb-1">
                      {group.index}
                    </div>
                    <div className="font-display text-xl sm:text-2xl font-semibold text-[var(--text-ink)]">
                      {group.title}
                    </div>
                    <p className="text-sm text-[var(--text-muted)] mt-1">{group.tagline}</p>
                  </div>
                  <ArrowUpRight
                    className={`w-5 h-5 shrink-0 mt-1 transition-transform duration-200 ${
                      isActive
                        ? 'text-[var(--accent-orange)] translate-x-0.5 -translate-y-0.5'
                        : 'text-[var(--text-muted)] opacity-40 group-hover:opacity-100'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between bg-white/65 border border-[var(--border-hairline)] rounded-3xl p-6 sm:p-10">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[var(--border-hairline)]">
                <span className="font-mono-tech text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
                  {activeGroup.index} {'//'} {activeGroup.title}
                </span>
                <span className="font-mono-tech text-xs text-[var(--accent-cobalt)]">
                  {activeGroup.services.length} {activeGroup.services.length === 1 ? 'Discipline' : 'Disciplines'}
                </span>
              </div>

              <div className="space-y-5">
                {activeGroup.services.map((srv) => (
                  <Link
                    key={srv.name}
                    href={srv.href}
                    className="group block p-5 sm:p-6 rounded-2xl bg-[var(--bg-s1)] border border-[var(--border-hairline)] hover:border-[var(--accent-orange)] transition-all"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display text-lg sm:text-xl font-semibold text-[var(--text-ink)] group-hover:text-[var(--accent-orange)] transition-colors">
                        {srv.name}
                      </h3>
                      <ArrowUpRight className="w-4 h-4 shrink-0 text-[var(--text-ink)] group-hover:text-[var(--accent-orange)] transition-colors" />
                    </div>
                    <p className="mt-2 text-sm text-[var(--text-muted)] leading-relaxed">{srv.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {srv.stack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono-tech text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-[var(--border-hairline)] text-[var(--text-ink)]/80"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-[var(--text-muted)]">
                Need a custom technical scope?
              </span>
              <Link href="/contact" className="btn-studio-primary !py-2.5 !px-5 !text-xs">
                Discuss Your Stack <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
