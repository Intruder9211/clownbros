'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface CaseStudy {
    id: string;
    client: string;
    title: string;
    category: string; // E-Commerce, FinTech, SaaS, AI, Mobile
    metric: string; // e.g. "+310% Conversion Boost"
    metricLabel: string;
    summary: string;
    challenge: string;
    solution: string;
    results: string[];
    techStack: string[];
}

const CASE_STUDIES: CaseStudy[] = [
    {
        id: 'cs-1',
        client: 'FinFlow Global',
        title: 'High-Frequency FinTech Dashboard & Mobile App Platform',
        category: 'FinTech',
        metric: '+310%',
        metricLabel: 'Conversion & User Retention Rate',
        summary: 'Re-engineered a legacy trading terminal into a ultra-fast Next.js web portal and Flutter native mobile app.',
        challenge: 'Legacy system suffered 4.2 second page loads, frequent WebSocket dropouts, and low mobile app store ratings.',
        solution: 'Built server-side rendered micro-frontends with real-time WebSockets, automated redis caching, and an intuitive dark-mode UI.',
        results: [
            'Page load time reduced from 4.2s to 380ms',
            'Zero server downtime over 18 consecutive months',
            'Mobile app store rating improved from 3.1 to 4.9 stars',
            'Over $45M processed in daily trading volume'
        ],
        techStack: ['Next.js 15', 'TypeScript', 'Flutter', 'Node.js', 'PostgreSQL', 'Redis']
    },
    {
        id: 'cs-2',
        client: 'Aura Luxury Apparel',
        title: 'High-Converting Editorial E-Commerce Storefront',
        category: 'E-Commerce',
        metric: '2.8x',
        metricLabel: 'Average Order Value Increase',
        summary: 'Designed and engineered an organic luxury editorial shopping experience for a premium fashion brand.',
        challenge: 'Generic Shopify template failed to communicate luxury brand identity, resulting in high cart abandonment.',
        solution: 'Created a bespoke headless Next.js e-commerce application integrated with Shopify Storefront API, custom 3D web interactive models, and 1-click checkout.',
        results: [
            'Checkout conversion rate surged by 184%',
            'Lighthouse mobile performance score reached 98/100',
            'Average session duration doubled from 1.8m to 4.4m',
            'Featured in Vogue Digital & Hypebeast'
        ],
        techStack: ['Next.js', 'Shopify API', 'Three.js', 'Tailwind', 'Vercel Edge']
    },
    {
        id: 'cs-3',
        client: 'OmniAI Automations',
        title: 'Autonomous LLM Workflow Agent Engine',
        category: 'AI',
        metric: '40 hrs/wk',
        metricLabel: 'Saved per Operations Team',
        summary: 'Architected an enterprise RAG agent platform that automates complex customer support and document processing.',
        challenge: 'Support team was overwhelmed processing 15,000 monthly legal documents manually.',
        solution: 'Deployed custom vector database pipelines using LangChain, OpenAI GPT-4o, and an intuitive human-in-the-loop dashboard.',
        results: [
            '91% automated resolution rate on support tickets',
            'Document ingestion speed increased by 40x',
            'Annual operational savings exceeding $320,000',
            'SOC2 security compliance verified'
        ],
        techStack: ['Python', 'OpenAI API', 'LangChain', 'Pinecone', 'React', 'FastAPI']
    },
    {
        id: 'cs-4',
        client: 'HealthSync Telehealth',
        title: 'HIPAA-Compliant Patient Portal & Mobile App',
        category: 'Mobile',
        metric: '500k+',
        metricLabel: 'Active Monthly Patients',
        summary: 'Built a secure, encrypted mobile telehealth platform connecting patients with specialist doctors across 12 countries.',
        challenge: 'Outdated telehealth vendor app crashed under peak traffic and lacked encrypted real-time video consults.',
        solution: 'Engineered native iOS/Android applications with WebRTC video calling, end-to-end encrypted chat, and automated appointment scheduling.',
        results: [
            'Scales smoothly across 500,000+ active patients',
            '100% HIPAA and GDPR privacy compliance',
            'Video call latency reduced under 120ms globally',
            'Rated Top 5 Health App in App Store'
        ],
        techStack: ['Swift', 'Kotlin', 'WebRTC', 'AWS MedTech', 'Node.js']
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

    const categories = ['All', 'FinTech', 'E-Commerce', 'AI', 'Mobile'];

    const filteredStudies = selectedCategory === 'All'
        ? CASE_STUDIES
        : CASE_STUDIES.filter(s => s.category.toLowerCase() === selectedCategory.toLowerCase());

    return (
        <main className="case-studies-page">
            {/* Hero Section */}
            <section style={{ padding: '120px 0 80px', backgroundColor: 'var(--background-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                <div className="container">
                    <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
                        <span className="subtitle" style={{ letterSpacing: '0.1em' }}>PROVEN PROOF OF WORK</span>
                        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 600, color: 'var(--text-heading)', lineHeight: 1.15, marginBottom: '24px' }}>
                            Client Success Stories & <br />
                            <span style={{ fontStyle: 'italic', color: 'var(--primary-hover)' }}>Measurable Impact</span>
                        </h1>
                        <p style={{ fontSize: '20px', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '36px' }}>
                            Discover how we help ambitious startups and global enterprises accelerate revenue, optimize user experience, and scale software infrastructure.
                        </p>
                        
                        {/* Category Filter Pills */}
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Showcase Grid */}
            <section style={{ padding: '90px 0', backgroundColor: 'var(--background)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '32px' }}>
                        {filteredStudies.map((study) => (
                            <div 
                                key={study.id} 
                                className="editorial-card scroll-reveal"
                                style={{ background: '#FFFFFF', padding: '36px', borderRadius: '20px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                            >
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
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

                                <button 
                                    onClick={() => setActiveModalStudy(study)}
                                    className="btn btn-secondary" 
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', fontSize: '14px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                                >
                                    <span>Read Full Case Breakdown</span>
                                    <span>→</span>
                                </button>
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
                                    The Challenge
                                </h3>
                                <p style={{ fontSize: '15px', color: 'var(--text-body)', lineHeight: 1.6 }}>
                                    {activeModalStudy.challenge}
                                </p>
                            </div>

                            <div>
                                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-heading)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                                    Our Engineering Solution
                                </h3>
                                <p style={{ fontSize: '15px', color: 'var(--text-body)', lineHeight: 1.6 }}>
                                    {activeModalStudy.solution}
                                </p>
                            </div>

                            <div>
                                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-heading)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                                    Quantifiable Results
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

                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                            <button onClick={() => setActiveModalStudy(null)} className="btn btn-secondary" style={{ padding: '10px 20px', borderRadius: '8px' }}>
                                Close
                            </button>
                            <Link href="/contact" className="btn btn-primary" style={{ padding: '10px 24px', borderRadius: '8px' }}>
                                Start Similar Project
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
