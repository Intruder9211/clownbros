'use client';

import React from 'react';
import Link from 'next/link';

export default function ProcessPage() {
    const steps = [
        {
            num: '01',
            title: 'Discovery & Architecture Blueprinting',
            subtitle: 'Phase 1 • Days 1-5',
            description: 'We unpack your product requirements, define user journeys, evaluate technical feasibility, and create a complete system architecture diagram and technical spec doc.',
            deliverables: ['System Architecture Diagram', 'Database Schema Specification', 'Interactive Figma Wireframes', 'Fixed Timeline & Scope Contract']
        },
        {
            num: '02',
            title: 'Agile Sprint Execution & Daily Code Commits',
            subtitle: 'Phase 2 • Sprints 1-4',
            description: 'Our senior engineering team builds in rapid 1-week sprints with clean TypeScript code. You get direct access to staging builds and private GitHub repositories from day 1.',
            deliverables: ['Staging Preview Deployment', 'Clean GitHub Repository Access', 'Weekly Progress Demo Calls', 'Automated Unit & Integration Tests']
        },
        {
            num: '03',
            title: 'Continuous Security, Performance & QA Audits',
            subtitle: 'Phase 3 • Quality Assurance',
            description: 'Before any line of code reaches production, it undergoes rigorous automated testing, Lighthouse 90+ speed tuning, OWASP security audits, and cross-browser QA.',
            deliverables: ['Security & Vulnerability Scan', 'Lighthouse 95+ Score Audit', 'Cross-Device QA Signoff', 'Penetration Test Report']
        },
        {
            num: '04',
            title: 'Zero-Downtime Production Deployment',
            subtitle: 'Phase 4 • Launch Day',
            description: 'We orchestrate smooth, zero-downtime production rollouts to Vercel, AWS, or Docker containers with automated rollback protection and real-time error tracking.',
            deliverables: ['DNS & SSL Setup', 'CI/CD Pipeline Configuration', 'Sentry/Datadog Telemetry', 'Full IP Codebase Ownership Transfer']
        },
        {
            num: '05',
            title: 'Post-Launch Care, SLA Guarantees & Support',
            subtitle: 'Phase 5 • Ongoing Partnership',
            description: 'We guarantee 99.9% uptime SLA and offer dedicated post-launch support retainers, performance monitoring, feature additions, and infrastructure scaling.',
            deliverables: ['30-Day Free Bug Warranty', '99.9% Server Uptime SLA', 'Dedicated Tech Account Lead', 'Quarterly System Optimization']
        }
    ];

    return (
        <main className="process-page">
            {/* Hero Banner */}
            <section style={{ padding: '120px 0 80px', backgroundColor: 'var(--background-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                <div className="container">
                    <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
                        <span className="subtitle" style={{ letterSpacing: '0.1em' }}>ENGINEERING EXCELLENCE</span>
                        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 600, color: 'var(--text-heading)', lineHeight: 1.15, marginBottom: '24px' }}>
                            Our Battle-Tested <br />
                            <span style={{ fontStyle: 'italic', color: 'var(--primary-hover)' }}>5-Step Delivery Framework</span>
                        </h1>
                        <p style={{ fontSize: '20px', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '32px' }}>
                            We eliminate software project guesswork with transparent milestones, daily code transparency, strict security audits, and 100% intellectual property ownership.
                        </p>
                        
                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                            <Link href="/contact" className="btn btn-primary" style={{ padding: '14px 32px', borderRadius: '10px' }}>
                                Start Your Project Risk-Free
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline Steps */}
            <section style={{ padding: '90px 0', backgroundColor: 'var(--background)' }}>
                <div className="container">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
                        {steps.map((step, idx) => (
                            <div key={step.num} className="scroll-reveal" style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '30px', background: '#FFFFFF', padding: '40px', borderRadius: '20px', border: '1px solid var(--border-color)', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                                <div className="timeline-step-number" style={{ width: '64px', height: '64px', fontSize: '24px' }}>
                                    {step.num}
                                </div>

                                <div>
                                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary-hover)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }}>
                                        {step.subtitle}
                                    </span>
                                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', color: 'var(--text-heading)', fontWeight: 600, marginBottom: '14px' }}>
                                        {step.title}
                                    </h2>
                                    <p style={{ fontSize: '16px', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '24px' }}>
                                        {step.description}
                                    </p>

                                    {/* Deliverables checklist */}
                                    <div style={{ background: 'var(--background-secondary)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color-light)' }}>
                                        <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px' }}>
                                            Key Deliverables:
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                                            {step.deliverables.map((item) => (
                                                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--text-heading)', fontWeight: 500 }}>
                                                    <span style={{ color: '#4A8F63', fontWeight: 700 }}>✓</span>
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Client Risk Guarantees */}
            <section style={{ padding: '90px 0', backgroundColor: 'var(--dark-section)', color: '#FFFFFF' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 60px' }}>
                        <span className="subtitle" style={{ color: 'var(--primary)' }}>RISK MITIGATION</span>
                        <h2 className="title" style={{ color: '#FFFFFF' }}>Our 4 Concrete Client Guarantees</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '30px' }}>
                        <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '32px', borderRadius: '18px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                            <div style={{ fontSize: '32px', marginBottom: '14px' }}>🛡️</div>
                            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#FFFFFF', marginBottom: '10px' }}>100% IP Ownership</h3>
                            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6 }}>
                                You own 100% of all code, designs, and database assets from minute one. Full IP assignment standard in all contracts.
                            </p>
                        </div>

                        <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '32px', borderRadius: '18px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                            <div style={{ fontSize: '32px', marginBottom: '14px' }}>💰</div>
                            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#FFFFFF', marginBottom: '10px' }}>Fixed-Budget Protection</h3>
                            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6 }}>
                                No hidden scope creep billing. Fixed milestone pricing agreements ensure your project stays strictly on budget.
                            </p>
                        </div>

                        <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '32px', borderRadius: '18px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                            <div style={{ fontSize: '32px', marginBottom: '14px' }}>⚡</div>
                            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#FFFFFF', marginBottom: '10px' }}>99.9% Uptime Guarantee</h3>
                            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6 }}>
                                Enterprise-grade infrastructure setup backed by SLA performance guarantees and rapid incident response.
                            </p>
                        </div>

                        <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '32px', borderRadius: '18px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                            <div style={{ fontSize: '32px', marginBottom: '14px' }}>📞</div>
                            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#FFFFFF', marginBottom: '10px' }}>Dedicated Tech Lead</h3>
                            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6 }}>
                                Speak directly with senior lead engineers on Slack or WhatsApp. No middleman account managers wasting your time.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
