'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import ContactModal from '@/components/ContactModal';
import StudioCTA from '@/components/StudioCTA';
import HeroFrame from '@/components/HeroFrame';
import TechStackFlow from '@/components/TechStackFlow';

const CATEGORIES = [
  { id: 'all', label: 'All Disciplines' },
  { id: 'experiences', label: 'Digital Experiences' },
  { id: 'engineering', label: 'Product Engineering' },
  { id: 'intelligent', label: 'Intelligent Systems' },
  { id: 'growth', label: 'Growth & Infrastructure' },
];

const SERVICES = [
  {
    num: '01',
    group: 'experiences',
    title: 'High-Performance Web Platforms',
    href: '/services/web-development',
    illustration: '/images/services/web.png',
    summary: 'Ultra-fast custom web applications, SaaS portals, and headless commerce storefronts.',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'GraphQL / REST'],
    deliverables: [
      'Custom Web Applications & SaaS Portals',
      'Headless & Custom eCommerce Storefronts',
      'Core Web Vitals & Speed Optimization',
      'API & Third-Party Integrations',
    ],
  },
  {
    num: '02',
    group: 'engineering',
    title: 'Cross-Platform Mobile Apps',
    href: '/services/mobile-apps',
    illustration: '/images/services/mobile.png',
    summary: 'iOS and Android applications engineered with Flutter and React Native.',
    stack: ['Flutter', 'React Native', 'Swift / Kotlin', 'WebSockets'],
    deliverables: [
      'iOS & Android Production Apps',
      'Offline-First Local DB Sync',
      'Real-Time Chat & Push Notifications',
      'App Store & Play Store Publishing',
    ],
  },
  {
    num: '03',
    group: 'experiences',
    title: 'UI/UX & Interactive Design Systems',
    href: '/services/ui-ux-design',
    illustration: '/images/services/uiux.png',
    summary: 'Figma design tokens, clickable prototypes, and accessible user journeys.',
    stack: ['Figma', 'Design Tokens', 'WCAG AA', 'Prototyping'],
    deliverables: [
      'Component Libraries & Design Tokens',
      'User Journey & UX Wireframing',
      'Interactive Clickable Prototypes',
      'Developer-Ready Handoff Specs',
    ],
  },
  {
    num: '04',
    group: 'growth',
    title: 'Cloud Infrastructure & DevOps',
    href: '/services/cloud-devops',
    illustration: '/images/services/cloud.png',
    summary: 'Automated CI/CD pipelines, Docker clusters, and resilient cloud hosting.',
    stack: ['AWS', 'Vercel', 'Docker', 'GitHub Actions', 'PostgreSQL'],
    deliverables: [
      'Zero-Downtime CI/CD Pipelines',
      'Docker Containerization & Edge Caching',
      'Database Clustering & Backups',
      'Error Telemetry & Monitoring',
    ],
  },
  {
    num: '05',
    group: 'intelligent',
    title: 'AI & Workflow Automation',
    href: '/services/ai-solutions',
    illustration: '/images/services/ai.png',
    summary: 'Custom LLM pipelines, RAG vector search, and autonomous business agents.',
    stack: ['OpenAI / Claude', 'LangChain', 'PGVector', 'Python / Node'],
    deliverables: [
      'Custom RAG & Vector Search Pipelines',
      'Autonomous Workflow Agents',
      'Document & Data Ingestion',
      'CRM & Support Automation',
    ],
  },
  {
    num: '06',
    group: 'growth',
    title: 'Technical SEO & Digital Growth',
    href: '/services/seo-growth',
    illustration: '/images/services/seo.png',
    summary: 'Structural SEO, schema architecture, and high-converting funnel engineering.',
    stack: ['Technical SEO', 'Schema.org', 'Core Web Vitals', 'Analytics'],
    deliverables: [
      'Technical & Structural SEO Audits',
      'Programmatic Schema Markup',
      'Conversion Funnel Engineering',
      'Attribution & Analytics Setup',
    ],
  },
];

const TECH_MATRIX = [
  { name: 'Next.js & React', cat: 'Frontend', note: 'SSR, App Router, Server Actions' },
  { name: 'TypeScript', cat: 'Language', note: 'End-to-end type safety' },
  { name: 'Tailwind CSS', cat: 'Styling', note: 'Tokenized editorial systems' },
  { name: 'GSAP & ScrollTrigger', cat: 'Motion', note: 'Choreographed scroll & Flip' },
  { name: 'Flutter & React Native', cat: 'Mobile', note: 'Cross-platform iOS & Android' },
  { name: 'Node.js & NestJS', cat: 'Backend', note: 'Low-latency APIs & queues' },
  { name: 'PostgreSQL & Prisma', cat: 'Database', note: 'Relational schemas & migrations' },
  { name: 'AWS, Docker & Vercel', cat: 'Cloud', note: 'Edge networks & CI/CD' },
  { name: 'OpenAI, Claude & PGVector', cat: 'AI', note: 'RAG & multi-agent workflows' },
  { name: 'Figma', cat: 'Design', note: 'Auto-layout & design tokens' },
];

export default function ServicesPage() {
  const [activeCat, setActiveCat] = useState('all');
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

  const visibleServices =
    activeCat === 'all' ? SERVICES : SERVICES.filter((s) => s.group === activeCat);

  return (
    <main>
      <ContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        preSelectedService={selectedService}
      />

      {/* 1. Services Hero — Shared HeroFrame */}
      <HeroFrame>
        <span className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[var(--accent-orange)] block mb-4">
          Capability Directory
        </span>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.02]">
              Everything we{' '}
              <span className="font-serif-editorial italic font-normal text-[var(--accent-orange)]">
                architect, design &amp; ship.
              </span>
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className="text-base text-[var(--text-muted)] leading-relaxed">
              From initial system blueprints to production AI agents and cloud infrastructure—organized into focused engineering disciplines.
            </p>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-10 flex flex-nowrap md:flex-wrap overflow-x-auto no-scrollbar gap-2 -mx-1 px-1 pb-2">
          {CATEGORIES.map((c) => {
            const active = activeCat === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveCat(c.id)}
                className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-full font-display text-xs font-medium border transition-colors ${
                  active
                    ? 'bg-[var(--bg-ink)] text-[#F2EFE7] border-[var(--bg-ink)]'
                    : 'bg-transparent text-[var(--text-ink)] border-[var(--border-hairline)] hover:border-[var(--text-ink)]'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </HeroFrame>

      {/* 2. Service Cards — 1 Col Mobile, 3x3 Grid Tablet & Desktop */}
      <section
        style={{ backgroundColor: 'var(--bg-s4)' }}
        className="text-[var(--text-ink)] py-16 sm:py-24"
      >
        <div
          onMouseLeave={() => setExpandedCard(null)}
          className="studio-container grid grid-cols-1 md:grid-cols-3 gap-x-7 gap-y-10"
        >
          {visibleServices.map((srv) => {
            const hasAnyActive = expandedCard !== null;
            const isActive = expandedCard === srv.num;
            const showIllustration = hasAnyActive && !isActive;

            return (
              <article
                key={srv.num}
                tabIndex={0}
                onMouseEnter={() => setExpandedCard(srv.num)}
                onFocus={() => setExpandedCard(srv.num)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                    setExpandedCard(null);
                  }
                }}
                onClick={() => setExpandedCard(isActive ? null : srv.num)}
                style={{
                  background:
                    'linear-gradient(155deg, var(--bg-s1) 0%, var(--bg-s2) 60%, var(--bg-s3) 100%)',
                }}
                className={`group relative rounded-[26px] border px-6 sm:px-7 pt-7 sm:pt-8 pb-7 shadow-sm transition-all duration-300 ease-out focus:outline-none flex flex-col justify-between gap-5 ${
                  isActive
                    ? '-translate-y-1 shadow-xl border-[var(--accent-orange)]/60'
                    : 'border-[var(--border-hairline)]'
                }`}
              >
                <div className="space-y-3">
                  <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight leading-snug text-[var(--text-ink)]">
                    {srv.title}
                  </h2>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {srv.summary}
                  </p>
                </div>

                {/* Hover/Tap Swap Slot: Hidden in Default State; Active -> Key Deliverables | Inactive -> Transparent PNG */}
                <div
                  className={`relative w-full flex items-center overflow-hidden transition-all duration-300 ease-out ${
                    hasAnyActive ? 'h-[156px] opacity-100' : 'h-0 opacity-0'
                  }`}
                >
                  {/* Inactive Cards (only when another card is active): Transparent PNG Illustration */}
                  <div
                    aria-hidden={!showIllustration}
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out ${
                      showIllustration
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-95 pointer-events-none'
                    }`}
                  >
                    <img
                      src={srv.illustration}
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-contain select-none pointer-events-none"
                    />
                  </div>

                  {/* Active Card: Key Deliverables */}
                  <div
                    aria-hidden={!isActive}
                    className={`w-full pt-3 border-t border-[var(--border-hairline)] transition-all duration-300 ease-out ${
                      isActive
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-2 pointer-events-none'
                    }`}
                  >
                    <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--accent-orange)] mb-2">
                      Key Deliverables
                    </div>
                    <div className="space-y-1.5">
                      {srv.deliverables.map((d) => (
                        <div key={d} className="text-xs sm:text-sm text-[var(--text-ink)] flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-orange)] mt-1.5 shrink-0" />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Connected Animated Technology Stack Showcase */}
                <div className="relative pt-1">
                  <TechStackFlow label="Connected Stack" items={srv.stack} />
                </div>

                {/* Bottom Action Labels — Inside the Card Container, Visible Only When Cursor Is on That Card */}
                <div
                  aria-hidden={!isActive}
                  className={`pt-3 border-t border-[var(--border-hairline)] flex items-center justify-between gap-2 transition-all duration-300 ease-out ${
                    isActive
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-1.5 pointer-events-none'
                  }`}
                >
                  <Link
                    href={srv.href}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 font-display text-xs font-semibold text-[var(--text-ink)] hover:text-[var(--accent-orange)] transition-colors"
                  >
                    <span>Inspect Discipline</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedService(srv.title);
                      setModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 font-display text-xs font-semibold text-[var(--text-ink)] hover:text-[var(--accent-orange)] transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-orange)]" />
                    <span>Request Scope</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 3. Production Stack Section (Interactive Hover Lift + Sibling Blur) */}
      <section className="bg-[#171817] text-[#F2EFE7] py-20 sm:py-24">
        <div className="studio-container">
          <div className="mb-12">
            <span className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[var(--accent-orange)] block mb-3">
              Production Stack
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold">
              Tools we trust in production.
            </h2>
          </div>

          <div
            onMouseLeave={() => setHoveredTech(null)}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3"
          >
            {TECH_MATRIX.map((tech) => {
              const isHovered = hoveredTech === tech.name;
              const isBlurred = hoveredTech !== null && !isHovered;

              return (
                <div
                  key={tech.name}
                  onMouseEnter={() => setHoveredTech(tech.name)}
                  className={`bg-[#1F201F] p-6 rounded-2xl border flex flex-col justify-between gap-4 transition-all duration-300 ease-out ${
                    isHovered
                      ? '-translate-y-1.5 scale-[1.03] z-10 border-[var(--accent-orange)] shadow-2xl'
                      : isBlurred
                      ? 'blur-[2px] opacity-55 scale-[0.985] border-white/10'
                      : 'border-white/12'
                  }`}
                >
                  <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--accent-orange)]">
                    {tech.cat}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-[#F2EFE7]">{tech.name}</h3>
                    <p className="mt-1.5 text-xs text-[#9E9B93]">{tech.note}</p>
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
