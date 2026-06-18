'use client';

import React from 'react';
import Link from 'next/link';

export default function About() {
    const values = [
        { title: 'Innovation First', desc: 'We leverage cutting-edge technologies to design scalable and forward-compatible solutions.', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
        { title: 'Transparency', desc: 'Honest conversations, explicit timelines, and open-book communication at every milestone.', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
        { title: 'Quality Over Quantity', desc: 'We deliberately limit our active client pipeline to commit extreme detail to every single project.', icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' },
        { title: 'Security & Scale', desc: 'Enterprise-grade architectures featuring high performance, server protection, and robust APIs.', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
        { title: 'Client Success', desc: 'Our growth is linked to yours. We measure ourselves solely by the impact and ROI we deliver.', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
        { title: 'Continuous Growth', desc: 'Technology evolves daily. We systematically upskill our teams to implement modern, stable tools.', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' }
    ];

    const targetAudience = [
        'Startups', 'Small Businesses', 'Medium Enterprises', 'Large Enterprises',
        'E-commerce Brands', 'Healthcare Companies', 'Educational Institutions',
        'Real Estate Agencies', 'Restaurants & Hotels', 'SaaS Companies',
        'Finance Companies', 'Manufacturing Businesses', 'Personal Brands & Influencers'
    ];

    return (
        <main style={{ paddingTop: '120px' }}>
            {/* About Page Hero */}
            <section className="scroll-reveal" style={{ paddingBottom: '64px' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '64px', alignItems: 'center' }}>
                    <div className="reveal-left visible">
                        <span className="section-tagline">Vision & Purpose</span>
                        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '52px', fontWeight: 500, lineHeight: 1.2, marginBottom: '24px' }}>
                            To build premium digital ecosystems that shape the digital presence of growing brands globally.
                        </h1>
                        <p style={{ fontSize: '18px', color: 'var(--text-body)', lineHeight: 1.7 }}>
                            We partner with businesses to elevate their operations, build robust cloud infrastructures, and craft interfaces that delight.
                        </p>
                    </div>
                    <div className="reveal-right visible zoom-on-hover" style={{ borderRadius: 'var(--radius-image)', overflow: 'hidden', height: '380px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-soft)', position: 'relative' }}>
                        <img 
                            src="/clownbros_about.png" 
                            alt="ClownBros Serene Architecture" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="secondary-bg scroll-reveal" style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '96px 0' }}>
                <div className="container">
                    <div className="vision-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                        <div className="editorial-card scroll-reveal" style={{ backgroundColor: '#FFFFFF', padding: '48px', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-color)', transitionDelay: '0.1s' }}>
                            <span className="panel-label" style={{ fontSize: '12px', fontWeight: 600, color: 'var(--primary-hover)', display: 'block', marginBottom: '16px' }}>OUR MISSION</span>
                            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 500, marginBottom: '20px', lineHeight: 1.3 }}>
                                Empowering businesses with digital solutions combining design, code, cloud automation, and marketing under a single partnership.
                            </h3>
                            <p style={{ color: 'var(--text-body)', fontSize: '17px' }}>
                                We believe every business deserves a premium digital presence, regardless of its size. We construct frameworks that simplify business operations, increase user acquisition, and elevate authority.
                            </p>
                        </div>

                        <div className="editorial-card scroll-reveal" style={{ backgroundColor: '#FFFFFF', padding: '48px', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-color)', transitionDelay: '0.2s' }}>
                            <span className="panel-label" style={{ fontSize: '12px', fontWeight: 600, color: 'var(--primary-hover)', display: 'block', marginBottom: '16px' }}>OUR VISION</span>
                            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 500, marginBottom: '20px', lineHeight: 1.3 }}>
                                Becoming one of the world&apos;s most trusted technology partners by delivering modern, scalable, and secure digital foundations.
                            </h3>
                            <p style={{ color: 'var(--text-body)', fontSize: '17px' }}>
                                We align as a long-term technology collaborator rather than a transactional vendor. Our goal is to accompany our clients on their expansion milestones, building architecture that adapts as they scale.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Target Audience Section */}
            <section className="scroll-reveal" style={{ padding: '96px 0' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: '64px', alignItems: 'center' }}>
                    <div>
                        <span className="section-tagline">Partnerships</span>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '40px', fontWeight: 500, color: 'var(--text-heading)' }}>
                            Who We Work With
                        </h2>
                        <p style={{ marginTop: '16px', color: 'var(--text-body)', fontSize: '17px' }}>
                            We partner with entities across stages, tailoring core development stack features and budgets to match specific operational needs.
                        </p>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {targetAudience.map((audience, i) => (
                            <span 
                                key={i} 
                                className="tag scroll-reveal" 
                                style={{ 
                                    padding: '10px 20px', 
                                    backgroundColor: 'var(--background-secondary)', 
                                    color: 'var(--text-heading)', 
                                    fontSize: '15px', 
                                    fontWeight: 500, 
                                    borderRadius: '9999px',
                                    border: '1px solid var(--border-color)',
                                    transition: 'var(--transition-quick)',
                                    transitionDelay: `${i * 0.05}s`
                                }}
                            >
                                {audience}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="secondary-bg scroll-reveal" style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '96px 0' }}>
                <div className="container">
                    <div className="section-header" style={{ marginBottom: '64px', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
                        <span className="section-tagline">Our Pillars</span>
                        <h2 className="section-title">Core Values</h2>
                        <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-body)' }}>
                            The values that guide our developers, designers, and marketing engineers through every pixel and query.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                        {values.map((val, i) => (
                            <div 
                                className="value-card scroll-reveal" 
                                key={i}
                                style={{
                                    backgroundColor: '#FFFFFF',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius-card)',
                                    padding: '32px',
                                    boxShadow: 'var(--shadow-soft)',
                                    transition: 'var(--transition-editorial)',
                                    transitionDelay: `${i * 0.1}s`,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '16px'
                                }}
                            >
                                <div style={{ color: 'var(--primary-hover)', display: 'flex', alignItems: 'center' }}>
                                    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d={val.icon} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 500, color: 'var(--text-heading)' }}>
                                    {val.title}
                                </h4>
                                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                                    {val.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom Call to Action */}
            <section className="scroll-reveal" style={{ padding: '96px 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '40px', fontWeight: 500, marginBottom: '24px' }}>
                        Let&apos;s build together.
                    </h2>
                    <p style={{ maxWidth: '540px', margin: '0 auto 32px auto', color: 'var(--text-body)' }}>
                        Connect with our digital architects to discuss details, scoping parameters, and custom solutions.
                    </p>
                    <Link href="/contact" className="btn btn-primary">Start a Project</Link>
                </div>
            </section>
        </main>
    );
}
