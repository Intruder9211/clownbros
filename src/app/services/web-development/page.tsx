'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Monitor, Tablet, Smartphone } from 'lucide-react';
import ContactModal from '@/components/ContactModal';
import StudioCTA from '@/components/StudioCTA';
import HeroAmbientBg from '@/components/HeroAmbientBg';

export default function WebDevelopmentPage() {
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [modalOpen, setModalOpen] = useState(false);

  const widthClass =
    viewport === 'desktop' ? 'w-full' : viewport === 'tablet' ? 'max-w-md mx-auto' : 'max-w-xs mx-auto';

  return (
    <main>
      <ContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        preSelectedService="Web Development"
      />

      {/* Hero */}
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
            <span className="text-[#F15A3B]">Web Development</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.03]">
                Web platforms built for{' '}
                <span className="font-serif-editorial italic font-normal text-[#F15A3B]">
                  sub-second reality.
                </span>
              </h1>
            </div>
            <div className="lg:col-span-4 space-y-5">
              <p className="text-base text-[#6B6A65] leading-relaxed">
                Custom Next.js applications, SaaS portals, and headless commerce storefronts engineered for Core Web Vitals, accessibility, and clean backend integration.
              </p>
              <button type="button" onClick={() => setModalOpen(true)} className="btn-studio-primary">
                <span>Start Web Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Browser / Responsive Showcase */}
      <section className="bg-[#171817] text-[#F2EFE7] py-20 sm:py-24">
        <div className="studio-container">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="font-mono-tech text-xs uppercase tracking-[0.14em] text-[#F15A3B]">
                Interactive Viewport Lab
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold mt-1">
                Responsive architecture across every breakpoint.
              </h2>
            </div>

            <div className="inline-flex items-center gap-1 p-1 rounded-full bg-[#222322] border border-[#F2EFE7]/12">
              {[
                { id: 'desktop', icon: Monitor, label: 'Desktop' },
                { id: 'tablet', icon: Tablet, label: 'Tablet' },
                { id: 'mobile', icon: Smartphone, label: 'Mobile' },
              ].map((v) => {
                const Icon = v.icon;
                const active = viewport === v.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setViewport(v.id as 'desktop' | 'tablet' | 'mobile')}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono-tech text-xs transition-colors ${
                      active ? 'bg-[#F15A3B] text-[#F2EFE7]' : 'text-[#9E9B93] hover:text-[#F2EFE7]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{v.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className={`transition-all duration-300 ${widthClass}`}>
            <div className="rounded-2xl bg-[#202120] border border-[#F2EFE7]/15 overflow-hidden shadow-2xl">
              <div className="px-4 py-3 bg-[#1B1C1B] border-b border-[#F2EFE7]/10 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F15A3B]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F2EFE7]/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F2EFE7]/20" />
                </div>
                <span className="font-mono-tech text-[11px] text-[#9E9B93]">
                  app.clownbros.studio // {viewport.toUpperCase()}
                </span>
                <span className="font-mono-tech text-[11px] text-[#3154D9]">SSR + EDGE</span>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#F2EFE7]/10">
                  <div>
                    <div className="font-mono-tech text-[10px] text-[#F15A3B]">NEXT.JS APP ROUTER</div>
                    <div className="font-display text-xl font-semibold mt-1">Server-First Rendering</div>
                  </div>
                  <span className="font-mono-tech text-xs px-3 py-1 rounded-full bg-[#F2EFE7]/8 border border-[#F2EFE7]/12">
                    Zero Layout Shift
                  </span>
                </div>

                <div className={`grid gap-4 ${viewport === 'mobile' ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-3'}`}>
                  {[
                    { title: 'Frontend Layer', desc: 'React 19, TypeScript, Tailwind CSS, accessible semantics' },
                    { title: 'API & Data', desc: 'Route Handlers, Prisma ORM, PostgreSQL, Edge caching' },
                    { title: 'Performance', desc: 'Code splitting, font optimization, lazy-loaded media' },
                  ].map((b) => (
                    <div key={b.title} className="p-4 rounded-xl bg-[#171817] border border-[#F2EFE7]/10">
                      <div className="font-display text-sm font-semibold">{b.title}</div>
                      <p className="mt-1.5 text-xs text-[#9E9B93] leading-relaxed">{b.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Breakdown */}
      <section
        style={{ backgroundColor: 'var(--bg-s4)' }}
        className="text-[var(--text-ink)] py-20 sm:py-24"
      >
        <div className="studio-container grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: 'Next.js & React Applications',
              desc: 'Type-safe, server-rendered web platforms engineered for fast initial paint, clean routing, and maintainable component architecture.',
            },
            {
              title: 'Headless & Custom E-Commerce',
              desc: 'High-velocity storefronts (like ClownMart) with instant faceted search, optimistic cart state, and Shopify/Stripe integrations.',
            },
            {
              title: 'Backend APIs & Auth Integration',
              desc: 'RESTful and GraphQL endpoints, role-based access control, webhooks, and relational database modeling with PostgreSQL.',
            },
            {
              title: 'Web Performance & Core Web Vitals',
              desc: 'Systematic optimization of LCP, INP, and CLS through bundle auditing, image sizing, and edge caching.',
            },
          ].map((item) => (
            <div key={item.title} className="p-8 rounded-2xl bg-[#E8E3D8]/60 border border-[#171817]/12">
              <h3 className="font-display text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm sm:text-base text-[#6B6A65] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <StudioCTA />
    </main>
  );
}
