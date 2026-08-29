'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface CaseStudy {
    id: string;
    client: string;
    title: string;
    category: string; // AI, E-Commerce, DevTools, PWA
    metric: string; // e.g. "92% Focus", "< 320ms", "100% In-Memory"
    metricLabel: string;
    summary: string;
    challenge: string;
    solution: string;
    results: string[];
    techStack: string[];
    liveUrl: string;
}

const CASE_STUDIES: CaseStudy[] = [
    {
        id: 'cs-1',
        client: 'In-House Venture / AI Studio',
        title: 'The ClownFounder — Autonomous Company OS & Multi-Agent AI Suite',
        category: 'AI',
        metric: '92% Focus',
        metricLabel: 'Solo Founder Operational Overhead Reduced',
        summary: 'Autonomous AI Executive Team with founder-in-the-loop approvals. Parallel sales, engineering, QA, finance, and support units that handle operations and morning executive briefs.',
        challenge: 'Solo founders lose up to 82% of high-leverage product hours managing operational triage, change orders, billing reconciliations, and routine dev coordination.',
        solution: 'Engineered an autonomous multi-agent execution pipeline that triages webhooks and client communications, drafts 3-sentence proposals with evidence diffs, and executes upon 1-tap founder approval.',
        results: [
            'Autonomous triage across Sales, Engineering, QA, and Finance units',
            'Overnight Morning Brief system for zero-friction morning reviews',
            'Full Linear ticket, Stripe billing, and Resend email dispatch automation',
            'Isolated, zero-data-training enterprise security architecture'
        ],
        techStack: ['Next.js 15', 'TypeScript', 'Multi-Agent LLMs', 'Stripe API', 'Linear API', 'Tailwind'],
        liveUrl: 'https://theclownfounder.vercel.app/'
    },
    {
        id: 'cs-2',
        client: 'In-House Venture / Commerce Lab',
        title: 'The ClownMart — High-Velocity Headless E-Commerce Marketplace',
        category: 'E-Commerce',
        metric: '< 280ms',
        metricLabel: 'Edge-Cached Sub-Second Page Render Latency',
        summary: 'Information-dense, ultra-fast modern marketplace specializing in premium retail footwear with instant search, multi-faceted filtering, and responsive cart flows.',
        challenge: 'Standard e-commerce platforms suffer from bloated client scripts, heavy re-renders, and slow navigation transitions that cause checkout drop-offs.',
        solution: 'Architected a headless Next.js 15 commerce storefront utilizing Edge serverless caching, optimistic cart state updates, dynamic theme switching, and accessible keyboard navigation.',
        results: [
            'Sub-280ms global TTFB with Vercel Edge caching',
            'Instant multi-filter faceted catalog search with zero input lag',
            'Optimistic client-side cart synchronization and drawer checkout',
            'Seamless dark/light theme switching with zero layout shift'
        ],
        techStack: ['Next.js 15', 'TypeScript', 'Tailwind', 'SSR', 'Edge Caching', 'Lucide Icons'],
        liveUrl: 'https://theclownmart.vercel.app/'
    },
    {
        id: 'cs-3',
        client: 'In-House Venture / DevTools',
        title: 'ClownEaser — Headless Design Token Extractor & AI CSS Studio',
        category: 'DevTools',
        metric: '100% In-Memory',
        metricLabel: 'Zero-Persistence Ephemeral Extraction Engine',
        summary: 'Headless computed CSS token parser and Elementor AI CSS Studio. Extracts typography scales, container spacing, and palette tokens directly into Elementor Global Kit 3.x schema.',
        challenge: 'Design-to-CMS handoffs take hours of manual copy-pasting of CSS properties, hex values, and font metrics from static designs into website builders.',
        solution: 'Constructed an AST-based token extraction pipeline that headlessly computes live styles from HTML/ZIP packages and maps them directly to Elementor 3.x Global Kit JSON, backed by a natural-language AI CSS Studio.',
        results: [
            'Instant conversion of HTML/ZIP files into Elementor Global Kit 3.x JSON',
            'Integrated AI CSS Studio for generating scoped CSS animations via prompt',
            '100% ephemeral in-memory extraction with zero server persistence',
            'Automatic semantic color scoring and typography scale mapping'
        ],
        techStack: ['Next.js', 'Headless AST Parser', 'Elementor Global Kit 3.x', 'AI Prompt Engine', 'Tailwind'],
        liveUrl: 'https://clowneaser.vercel.app/'
    },
    {
        id: 'cs-4',
        client: 'In-House Venture / Document Systems',
        title: 'ClownKosh — Distraction-Free Personal PDF Library & Document Reader',
        category: 'PWA',
        metric: '100% Offline',
        metricLabel: 'IndexedDB Local Document Cache & PWA Capability',
        summary: 'Personal distraction-free digital library and PDF reader Progressive Web App with client-side indexing, document shelf management, and responsive reading view.',
        challenge: 'Traditional PDF readers are bloated with heavy desktop dependencies, intrusive cloud sign-ins, and poor mobile touch navigation.',
        solution: 'Built an offline-first PWA powered by PDF.js and IndexedDB that indexes documents locally in the browser cache, featuring dark reader themes, responsive zoom, and shelf organization.',
        results: [
            'Complete offline PWA installation on iOS, Android, and Desktop',
            'Zero server uploads — 100% private client-side IndexedDB document storage',
            'Fluid PDF rendering with custom zoom levels and bookmarking',
            'Distraction-free dark mode reader UI with zero intrusive telemetry'
        ],
        techStack: ['React', 'PDF.js', 'Progressive Web App (PWA)', 'IndexedDB', 'Service Workers'],
        liveUrl: 'https://clownkosh.vercel.app/'
    }
];

export default function CaseStudiesPage() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [activeModalStudy, setActiveModalStudy] = useState<CaseStudy | null>(null);

    // Disable background scrolling when modal is open
    React.useEffect(() => {
        if (activeModalStudy) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            document.documentElement.classList.add('lenis-stopped');
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            document.documentElement.classList.remove('lenis-stopped');
        }
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            document.documentElement.classList.remove('lenis-stopped');
        };
    }, [activeModalStudy]);

    const categories = ['All', 'AI', 'E-Commerce', 'DevTools', 'PWA'];

    const filteredStudies = selectedCategory === 'All'
        ? CASE_STUDIES
        : CASE_STUDIES.filter(s => s.category.toLowerCase() === selectedCategory.toLowerCase());

    return (
        <main className="case-studies-page">
            {/* Hero Section */}
            <section className="page-hero" style={{ backgroundColor: 'var(--background-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                <div className="container">
                    <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
                        <span className="subtitle" style={{ letterSpacing: '0.1em' }}>IN-HOUSE VENTURES &amp; PROOF OF CAPABILITY</span>
                        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 600, color: 'var(--text-heading)', lineHeight: 1.15, marginBottom: '24px' }}>
                            Solution Blueprints &amp; <br />
                            <span style={{ fontStyle: 'italic', color: 'var(--primary-hover)' }}>Live Proprietary Products</span>
                        </h1>
                        <p style={{ fontSize: '20px', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '36px' }}>
                            Explore production-grade software platforms, AI systems, and high-velocity storefronts engineered and operated by the ClownBros studio.
                        </p>

                        {/* Category Filter Tabs */}
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`tab-btn ${selectedCategory === cat ? 'active' : ''}`}
                                    style={{
                                        padding: '10px 20px',
                                        borderRadius: '30px',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        border: '1px solid var(--border-color)',
                                        background: selectedCategory === cat ? 'var(--text-heading)' : '#FFFFFF',
                                        color: selectedCategory === cat ? '#FFFFFF' : 'var(--text-heading)',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Case Studies Grid */}
            <section className="scroll-reveal" style={{ padding: '96px 0' }}>
                <div className="container">
                    <div className="gigs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '32px' }}>
                        {filteredStudies.map((study) => (
                            <div key={study.id} className="editorial-card" style={{ background: '#FFFFFF', padding: '36px', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                        <span className="gig-tag">{study.category}</span>
                                        <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>{study.client}</span>
                                    </div>

                                    {/* Metric Highlight Box */}
                                    <div style={{ background: 'var(--background-secondary)', padding: '20px', borderRadius: '14px', border: '1px solid var(--border-color-light)', marginBottom: '20px' }}>
                                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '38px', fontWeight: 700, color: 'var(--text-heading)', lineHeight: 1.1 }}>
                                            {study.metric}
                                        </div>
                                        <div style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>
                                            {study.metricLabel}
                                        </div>
                                    </div>

                                    <h2 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '12px', lineHeight: 1.3 }}>
                                        {study.title}
                                    </h2>
                                    <p style={{ fontSize: '15px', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '24px' }}>
                                        {study.summary}
                                    </p>

                                    {/* Tech Stack */}
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
                                        {study.techStack.map((tech) => (
                                            <span key={tech} style={{ fontSize: '12px', background: 'var(--background-secondary)', padding: '4px 10px', borderRadius: '6px', color: 'var(--text-body)', fontWeight: 500 }}>
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                                    <a
                                        href={study.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-primary"
                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', fontSize: '14px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                                    >
                                        <span>Explore Live Platform</span>
                                        <span>↗</span>
                                    </a>
                                    <button 
                                        onClick={() => setActiveModalStudy(study)}
                                        className="btn btn-secondary" 
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', fontSize: '13.5px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                                    >
                                        <span>Read Architecture Breakdown</span>
                                        <span>→</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Case Study Detail Modal */}
            {activeModalStudy && (
                <div className="modal-backdrop" onClick={() => setActiveModalStudy(null)}>
                    <div className="modal-card" data-lenis-prevent onClick={(e) => e.stopPropagation()} style={{ maxWidth: '720px' }}>
                        <button className="modal-close-btn" onClick={() => setActiveModalStudy(null)}>
                            ✕
                        </button>

                        <div style={{ marginBottom: '24px' }}>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                                <span className="gig-tag">{activeModalStudy.category}</span>
                                <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>{activeModalStudy.client}</span>
                            </div>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', color: 'var(--text-heading)', fontWeight: 600, lineHeight: 1.2 }}>
                                {activeModalStudy.title}
                            </h2>
                        </div>

                        {/* Metric Bar */}
                        <div style={{ background: 'var(--dark-section)', color: '#FFFFFF', padding: '24px', borderRadius: '14px', marginBottom: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.1em' }}>KEY PERFORMANCE METRIC</div>
                                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>{activeModalStudy.metricLabel}</div>
                            </div>
                            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '42px', fontWeight: 700, color: 'var(--primary)' }}>
                                {activeModalStudy.metric}
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '28px' }}>
                            <div>
                                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-heading)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                                    The Problem &amp; Challenge
                                </h3>
                                <p style={{ fontSize: '15px', color: 'var(--text-body)', lineHeight: 1.6 }}>
                                    {activeModalStudy.challenge}
                                </p>
                            </div>

                            <div>
                                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-heading)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                                    Our Engineering Architecture
                                </h3>
                                <p style={{ fontSize: '15px', color: 'var(--text-body)', lineHeight: 1.6 }}>
                                    {activeModalStudy.solution}
                                </p>
                            </div>

                            <div>
                                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-heading)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                                    Quantifiable Outcomes
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {activeModalStudy.results.map((r) => (
                                        <div key={r} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', color: 'var(--text-heading)', background: 'var(--background-secondary)', padding: '10px 14px', borderRadius: '8px' }}>
                                            <span style={{ color: '#4A8F63', fontWeight: 700 }}>✓</span>
                                            {r}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                            <button onClick={() => setActiveModalStudy(null)} className="btn btn-secondary" style={{ padding: '10px 20px', borderRadius: '8px' }}>
                                Close
                            </button>
                            <a href={activeModalStudy.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '10px 24px', borderRadius: '8px' }}>
                                Launch Live App ↗
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
