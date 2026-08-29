'use client';

import React from 'react';
import Link from 'next/link';

export default function About() {
    const values = [
        { title: 'Engineering Craftsmanship', desc: 'We build with type-safe, modular architectures and strict code standards — zero brittle templates or technical debt.', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
        { title: 'Complete Transparency', desc: 'Direct staging links, open GitHub repositories, daily commits, and clear milestone sign-offs at every step.', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
        { title: '100% Asset Ownership', desc: 'You own all source code, Figma design files, cloud assets, and intellectual property from minute one.', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
        { title: 'Sub-Second Speed', desc: 'We engineer with Core Web Vitals at the forefront — sub-second page loads, automated caching, and high conversion rates.', icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' },
        { title: 'Outcome-Driven ROI', desc: 'We measure success by your software adoption, user retention, and tangible business revenue growth.', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
        { title: 'Dedicated Post-Launch Care', desc: 'Every build is backed by a 30-day bug warranty, direct Slack/WhatsApp channels, and 99.9% uptime SLA.', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' }
    ];

    const targetAudience = [
        'High-Growth Startups', 'SaaS Companies', 'E-Commerce Brands', 'FinTech & Trading',
        'Healthcare & Telehealth', 'Consulting & Agencies', 'Modern SMBs', 'Direct-to-Consumer Brands',
        'Real Estate Platforms', 'Education Platforms', 'Creator Brands & Media', 'Enterprise Portals'
    ];

    return (
        <main>
            {/* About Page Hero */}
            <section className="page-hero scroll-reveal" style={{ paddingBottom: '64px' }}>
                <div className="container about-hero-grid">
                    <div className="reveal-left visible">
                        <span className="section-tagline">Vision &amp; Purpose</span>
                        <h1 className="editorial-hero-title" style={{ marginBottom: '24px' }}>
                            Crafting high-performance digital systems with uncompromised engineering standards.
                        </h1>
                        <p style={{ fontSize: '18px', color: 'var(--text-body)', lineHeight: 1.7 }}>
                            We are an engineering-first digital studio built by builders, not salespeople. We eliminate agency bloat and deliver custom web apps, native mobile software, and cloud workflows that scale.
                        </p>
                    </div>
                    <div className="reveal-right visible float-element svg-wrap-about-hero">
                        <svg viewBox="0 0 500 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '100%', maxHeight: '100%' }}>
                          <defs>
                            <linearGradient id="aboutGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                              <stop offset="60%" stopColor="#DCC7A1" stopOpacity="0.8" />
                              <stop offset="100%" stopColor="#C8AF7E" stopOpacity="0.9" />
                            </linearGradient>
                            <linearGradient id="aboutCharcoalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#3A3631" />
                              <stop offset="100%" stopColor="#26231F" />
                            </linearGradient>
                            <linearGradient id="aboutGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
                              <stop offset="100%" stopColor="#F3EEE5" stopOpacity="0.3" />
                            </linearGradient>
                            <radialGradient id="aboutGlowRad" cx="50%" cy="50%" r="50%">
                              <stop offset="0%" stopColor="#DCC7A1" stopOpacity="0.6" />
                              <stop offset="100%" stopColor="#DCC7A1" stopOpacity="0" />
                            </radialGradient>
                            <radialGradient id="aboutSphereGrad" cx="35%" cy="35%" r="65%">
                              <stop offset="0%" stopColor="#FFFFFF" />
                              <stop offset="40%" stopColor="#DCC7A1" />
                              <stop offset="100%" stopColor="#C8AF7E" />
                            </radialGradient>
                            <filter id="aboutShadowFilter" x="-20%" y="-20%" width="140%" height="140%">
                              <feDropShadow dx="0" dy="16" stdDeviation="12" floodColor="#26231F" floodOpacity="0.08" />
                            </filter>
                          </defs>
 
                          {/* Ambient Ground Shadow */}
                          <ellipse cx="250" cy="330" rx="140" ry="25" fill="#26231F" opacity="0.05" filter="blur(8px)" />
 
                          <g filter="url(#aboutShadowFilter)">
                            {/* Base Isometric Grid / Ring */}
                            <path d="M 120 240 L 250 175 L 380 240 L 250 305 Z" fill="url(#aboutGlassGrad)" stroke="#E6DED2" strokeWidth="1.5" opacity="0.6" />
                            
                            {/* Inner rings */}
                            <ellipse cx="250" cy="240" rx="90" ry="45" fill="none" stroke="#DCC7A1" strokeWidth="1" strokeDasharray="4,4" opacity="0.8" />
                            <ellipse cx="250" cy="240" rx="50" ry="25" fill="none" stroke="#C8AF7E" strokeWidth="1.5" opacity="0.5" />
 
                            {/* Isometric Pillar 1 (Left) */}
                            <g transform="translate(-10, -10)">
                              <path d="M 150 240 L 180 255 L 180 215 L 150 200 Z" fill="#E6DED2" />
                              <path d="M 180 255 L 210 240 L 210 200 L 180 215 Z" fill="#F3EEE5" />
                              <path d="M 150 200 L 180 215 L 210 200 L 180 185 Z" fill="url(#aboutGlassGrad)" stroke="#E6DED2" strokeWidth="1" />
                            </g>
 
                            {/* Isometric Pillar 2 (Right/Back) */}
                            <g transform="translate(110, -50)">
                              <path d="M 150 240 L 180 255 L 180 185 L 150 170 Z" fill="#DCC7A1" opacity="0.9" />
                              <path d="M 180 255 L 210 240 L 210 170 L 180 185 Z" fill="#C8AF7E" opacity="0.9" />
                              <path d="M 150 170 L 180 185 L 210 170 L 180 155 Z" fill="url(#aboutGlassGrad)" stroke="#DCC7A1" strokeWidth="1" />
                            </g>
 
                            {/* Floating central glass plate */}
                            <path d="M 170 190 L 250 150 L 330 190 L 250 230 Z" fill="url(#aboutGlassGrad)" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.95" />
                            
                            {/* Connection lines */}
                            <path d="M 250 190 L 160 140 M 250 190 L 340 140 M 250 190 L 250 80" stroke="#DCC7A1" strokeWidth="2" strokeDasharray="3,3" />
 
                            {/* Central Floating Glow & Spheres */}
                            <circle cx="250" cy="190" r="18" fill="url(#aboutSphereGrad)" />
                            <ellipse cx="250" cy="190" rx="36" ry="18" fill="none" stroke="#DCC7A1" strokeWidth="1.5" opacity="0.7" />
                            
                            {/* Floating Node Left */}
                            <g transform="translate(-90, -50)">
                              <circle cx="250" cy="190" r="10" fill="url(#aboutCharcoalGrad)" />
                              <circle cx="250" cy="190" r="10" fill="none" stroke="#DCC7A1" strokeWidth="1" strokeDasharray="" />
                              <circle cx="250" cy="170" r="4" fill="#DCC7A1" />
                              <line x1="250" y1="190" x2="250" y2="170" stroke="#DCC7A1" strokeWidth="1" />
                            </g>
 
                            {/* Floating Node Right */}
                            <g transform="translate(90, -50)">
                              <circle cx="250" cy="190" r="10" fill="url(#aboutSphereGrad)" />
                              <circle cx="250" cy="190" r="18" fill="url(#aboutGlowRad)" />
                            </g>
 
                            {/* Top floating abstract shapes */}
                            <g transform="translate(0, -110)">
                              <ellipse cx="250" cy="190" rx="15" ry="5" fill="#DCC7A1" opacity="0.4" />
                              <path d="M 250 165 L 265 178 L 250 191 L 235 178 Z" fill="url(#aboutGoldGrad)" />
                              <path d="M 250 165 L 250 191 L 235 178 Z" fill="#C8AF7E" opacity="0.3" />
                            </g>
 
                            {/* Floating ring element */}
                            <g transform="translate(-40, -130)">
                              <ellipse cx="250" cy="190" rx="25" ry="12" fill="none" stroke="#DCC7A1" strokeWidth="2" />
                              <circle cx="230" cy="185" r="3" fill="#26231F" />
                              <circle cx="270" cy="195" r="3" fill="#26231F" />
                            </g>
                          </g>
                        </svg>
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="secondary-bg scroll-reveal" style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '96px 0' }}>
                <div className="container">
                    <div className="vision-grid">
                        <div className="editorial-card scroll-reveal" style={{ transitionDelay: '0.1s' }}>
                            <span className="panel-label" style={{ fontSize: '12px', fontWeight: 600, color: 'var(--primary-hover)', display: 'block', marginBottom: '16px' }}>OUR MISSION</span>
                            <h3 className="editorial-h3" style={{ marginBottom: '20px' }}>
                                To empower high-growth startups and established brands with modern software architectures, bespoke design systems, and rapid milestone execution.
                            </h3>
                            <p style={{ color: 'var(--text-body)', fontSize: '17px' }}>
                                We believe clients deserve direct access to the engineers and designers building their product. We replace guesswork with weekly sprint demos, verifiable staging deployments, and total intellectual property ownership.
                            </p>
                        </div>

                        <div className="editorial-card scroll-reveal" style={{ transitionDelay: '0.2s' }}>
                            <span className="panel-label" style={{ fontSize: '12px', fontWeight: 600, color: 'var(--primary-hover)', display: 'block', marginBottom: '16px' }}>OUR VISION</span>
                            <h3 className="editorial-h3" style={{ marginBottom: '20px' }}>
                                Setting a new benchmark for boutique technology partnerships rooted in transparency, speed, and engineering rigor.
                            </h3>
                            <p style={{ color: 'var(--text-body)', fontSize: '17px' }}>
                                We position ourselves as long-term technology collaborators. As your user base and operations expand, we ensure your codebase, cloud infrastructure, and user interfaces adapt effortlessly without costly rewrites.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Target Audience Section */}
            <section className="scroll-reveal" style={{ padding: '96px 0' }}>
                <div className="container partnerships-grid">
                    <div>
                        <span className="section-tagline">Partnerships</span>
                        <h2 className="editorial-h2" style={{ color: 'var(--text-heading)' }}>
                            Who We Work With
                        </h2>
                        <p style={{ marginTop: '16px', color: 'var(--text-body)', fontSize: '17px' }}>
                            We partner with founders, CTOs, and growth teams across stages — tailoring architecture blueprints, sprint cadences, and budgets to match specific operational goals.
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
                        <h2 className="section-title">Core Principles</h2>
                        <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-body)' }}>
                            The architectural standards and delivery guarantees that guide every sprint, component, and query.
                        </p>
                    </div>

                    <div className="values-grid">
                        {values.map((val, i) => (
                            <div 
                                className="value-card scroll-reveal" 
                                key={i}
                                style={{
                                    transitionDelay: `${i * 0.1}s`
                                }}
                            >
                                <div style={{ color: 'var(--primary-hover)', display: 'flex', alignItems: 'center' }}>
                                    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d={val.icon} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h4 className="editorial-h4" style={{ color: 'var(--text-heading)' }}>
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
                    <h2 className="editorial-h2" style={{ marginBottom: '24px' }}>
                        Let&apos;s build something extraordinary.
                    </h2>
                    <p style={{ maxWidth: '620px', margin: '0 auto 32px auto', color: 'var(--text-body)' }}>
                        Connect directly with our technical leads to discuss product specifications, architecture roadmaps, and fixed-budget milestone pricing.
                    </p>
                    <Link href="/contact" className="btn btn-primary">Schedule Discovery Call</Link>
                </div>
            </section>
        </main>
    );
}
