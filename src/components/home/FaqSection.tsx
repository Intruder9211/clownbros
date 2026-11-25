'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

type FaqCategory =
  | 'General'
  | 'Services'
  | 'Pricing'
  | 'Development'
  | 'Design'
  | 'AI & Automation'
  | 'Security'
  | 'Support';

interface FaqItem {
  id: string;
  category: FaqCategory;
  q: string;
  a: string;
}

const CATEGORIES: FaqCategory[] = [
  'General',
  'Services',
  'Pricing',
  'Development',
  'Design',
  'AI & Automation',
  'Security',
  'Support',
];

const FAQS: FaqItem[] = [
  {
    id: 'faq-gen-1',
    category: 'General',
    q: 'What makes ClownBros different from a traditional digital agency?',
    a: 'You work directly with the engineers and designers building your product—no account-manager layers. We also build and operate our own in-house software platforms, so our recommendations come from real production experience.',
  },
  {
    id: 'faq-gen-2',
    category: 'General',
    q: 'Who do you typically partner with?',
    a: 'We work with early-stage startups launching their first product, growing SaaS and e-commerce brands, and established teams modernizing legacy web or mobile systems.',
  },
  {
    id: 'faq-srv-1',
    category: 'Services',
    q: 'What types of products and systems does ClownBros build?',
    a: 'We engineer custom web platforms (Next.js, React, headless commerce), cross-platform mobile apps (Flutter, React Native), UI/UX design systems, cloud & DevOps pipelines (AWS, Docker, Vercel), AI/LLM integrations, and technical SEO foundations.',
  },
  {
    id: 'faq-prc-1',
    category: 'Pricing',
    q: 'How do you structure pricing and milestones?',
    a: 'We operate with transparent, milestone-based scoping rather than open-ended hourly bloat. After an initial discovery call, you receive a clear architecture brief, fixed scope, and milestone schedule.',
  },
  {
    id: 'faq-prc-2',
    category: 'Pricing',
    q: 'How long does a typical project take from kickoff to launch?',
    a: 'Focused marketing sites and design systems typically ship in 4–6 weeks. Full-stack SaaS products, marketplaces, or mobile applications range from 8–12 weeks depending on integrations.',
  },
  {
    id: 'faq-dev-1',
    category: 'Development',
    q: 'How do you choose the right technology stack for a project?',
    a: 'We select proven, maintainable tools aligned with your team and growth stage—primarily TypeScript, Next.js, React, Node.js/NestJS, PostgreSQL, Flutter, and AWS/Vercel—avoiding unnecessary complexity.',
  },
  {
    id: 'faq-dev-2',
    category: 'Development',
    q: 'Can you work on or modernize an existing codebase?',
    a: 'Yes. We regularly audit, refactor, and extend existing React, Next.js, Node.js, and mobile repositories—resolving performance bottlenecks, security gaps, or stalled feature delivery.',
  },
  {
    id: 'faq-des-1',
    category: 'Design',
    q: 'Do you deliver reusable design systems or just static mockups?',
    a: 'We build complete Figma component libraries, color and typography tokens, responsive layouts, and interactive prototypes engineered for clean handoff into production code.',
  },
  {
    id: 'faq-ai-1',
    category: 'AI & Automation',
    q: 'How do you integrate AI and LLMs safely into existing products?',
    a: 'We build RAG pipelines, structured-output workflows, and human-in-the-loop agent systems with strict data boundaries—never training third-party models on your proprietary company data.',
  },
  {
    id: 'faq-sec-1',
    category: 'Security',
    q: 'Who owns the source code, design files, and intellectual property?',
    a: 'You do—100%. All source code, GitHub repositories, Figma design systems, database schemas, and cloud assets belong entirely to your organization from day one.',
  },
  {
    id: 'faq-sec-2',
    category: 'Security',
    q: 'Do you sign NDAs before reviewing sensitive product ideas or codebases?',
    a: 'Yes. We execute mutual NDAs prior to reviewing proprietary documentation, internal APIs, or commercial roadmaps.',
  },
  {
    id: 'faq-sup-1',
    category: 'Support',
    q: 'What does communication and post-launch support look like?',
    a: 'You get direct access to the engineers building your product via Slack/WhatsApp, private GitHub commits, and live staging links. Every launch includes a 30-day bug warranty with optional ongoing retainers.',
  },
];

export default function FaqSection() {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>('General');
  const [openId, setOpenId] = useState<string | null>('faq-gen-1');

  const filteredFaqs = FAQS.filter((f) => f.category === activeCategory);

  const handleCategoryChange = (cat: FaqCategory) => {
    setActiveCategory(cat);
    const nextList = FAQS.filter((f) => f.category === cat);
    setOpenId(nextList[0]?.id ?? null);
  };

  return (
    <section
      style={{ backgroundColor: 'var(--bg-s6)' }}
      className="text-[var(--text-ink)] py-20 sm:py-28 border-t border-[var(--border-hairline)]"
    >
      <div className="studio-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-4 space-y-5">
            <div>
              <span className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[var(--accent-orange)] block mb-3">
                08 — Frequently Asked
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.1]">
                Straight answers,{' '}
                <span className="font-serif-editorial italic font-normal text-[var(--text-muted)]">
                  before we start.
                </span>
              </h2>
              <p className="mt-4 text-sm text-[var(--text-muted)] leading-relaxed">
                Filter by topic to inspect how we handle scoping, IP ownership, NDAs, engineering, and post-launch support.
              </p>
            </div>

            <div className="font-mono-tech text-[11px] text-[var(--text-muted)] pt-2">
              Showing {filteredFaqs.length} {filteredFaqs.length === 1 ? 'question' : 'questions'} in{' '}
              <span className="text-[var(--text-ink)] font-medium">{activeCategory}</span>
            </div>
          </div>

          <div className="lg:col-span-8 min-w-0">
            {/* Category Filter Tabs (Horizontal Scroll on Mobile, Wrap on Tablet/Desktop) */}
            <div
              role="tablist"
              aria-label="FAQ Categories"
              className="flex flex-nowrap md:flex-wrap overflow-x-auto no-scrollbar gap-2 pb-5 md:pb-8 border-b border-[var(--border-hairline)] -mx-1 px-1"
            >
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleCategoryChange(cat)}
                    className={`shrink-0 whitespace-nowrap px-4 py-2.5 md:py-2 rounded-full font-display text-xs font-medium border transition-all duration-200 ${
                      isActive
                        ? 'bg-[var(--bg-ink)] text-[#F2EFE7] border-[var(--bg-ink)] shadow-sm'
                        : 'bg-white/60 text-[var(--text-ink)] border-[var(--border-hairline)] hover:border-[var(--text-ink)]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Filtered Accordion */}
            <div className="divide-y divide-[var(--border-hairline)] border-b border-[var(--border-hairline)]">
              {filteredFaqs.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <div key={item.id} className="py-5 transition-opacity duration-200">
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      aria-expanded={isOpen}
                      className="w-full flex items-start justify-between gap-4 text-left group"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 min-w-0">
                        <span className="font-mono-tech text-[10px] uppercase tracking-[0.14em] text-[var(--accent-orange)] shrink-0 sm:w-28">
                          {item.category}
                        </span>
                        <span className="font-display text-base sm:text-lg font-medium text-[var(--text-ink)] group-hover:text-[var(--accent-orange)] transition-colors">
                          {item.q}
                        </span>
                      </div>
                      <span className="w-8 h-8 rounded-full border border-[var(--border-hairline)] flex items-center justify-center shrink-0 text-[var(--text-ink)] group-hover:border-[var(--accent-orange)] group-hover:text-[var(--accent-orange)] transition-colors">
                        {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </span>
                    </button>

                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden sm:pl-32 pr-4 sm:pr-8">
                        <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
