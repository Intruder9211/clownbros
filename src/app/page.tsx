'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
    return (
        <main>
            {/* Hero Section */}
            <section className="hero-section" id="hero">
                <div className="container">
                    <div className="hero-grid" style={{ marginBottom: '80px' }}>
                        {/* Left Column: Text Content */}
                        <div className="reveal-left visible">
                            <div className="hero-tagline animate-fade-in" style={{ marginBottom: '16px' }}>
                                <span className="pill-badge">EST. 2026 — MODERN ENGINEERING STUDIO</span>
                            </div>
                            
                            <h1 className="hero-title editorial-hero-title animate-fade-in delay-1" style={{ marginBottom: '20px' }}>
                                From Concept to Impact. <br />
                                <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>We engineer high-performance digital products.</span>
                            </h1>
                            
                            <p className="hero-lead editorial-hero-lead animate-fade-in delay-2" style={{ marginBottom: '28px' }}>
                                ClownBros is a modern technology &amp; design studio. We craft lightning-fast web applications, mobile platforms, and scalable digital architectures for ambitious startups and expanding brands.
                            </p>
                            
                            <div className="hero-actions animate-fade-in delay-3" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                                <Link href="/services" className="btn btn-primary">Explore Capabilities</Link>
                                <Link href="/contact" className="btn btn-secondary">Schedule Discovery Call</Link>
                            </div>
                        </div>
 
                        {/* Right Column: Featured Workspace Visual */}
                        <div className="reveal-right visible float-element svg-wrap-hero">
                            <svg viewBox="0 0 600 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '100%', maxHeight: '100%' }}>
                              <defs>
                                <linearGradient id="workGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#FFFFFF" />
                                  <stop offset="60%" stopColor="#DCC7A1" />
                                  <stop offset="100%" stopColor="#C8AF7E" />
                                </linearGradient>
                                <linearGradient id="workGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
                                  <stop offset="100%" stopColor="#F3EEE5" stopOpacity="0.3" />
                                </linearGradient>
                                <linearGradient id="workDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#3A3631" />
                                  <stop offset="100%" stopColor="#26231F" />
                                </linearGradient>
                              </defs>
 
                              {/* Ground shadow */}
                              <ellipse cx="300" cy="420" rx="180" ry="30" fill="#26231F" opacity="0.04" filter="blur(10px)" />
 
                              <g>
                                {/* Base Ring grid */}
                                <ellipse cx="300" cy="300" rx="200" ry="100" fill="none" stroke="#E6DED2" strokeWidth="1.5" opacity="0.7" />
                                <ellipse cx="300" cy="300" rx="150" ry="75" fill="none" stroke="#DCC7A1" strokeWidth="1" strokeDasharray="6,4" opacity="0.5" />
 
                                {/* Primary 3D Isometric Screen Dashboard */}
                                <g transform="translate(0, -30)">
                                  {/* Back screen glass sheet */}
                                  <path d="M 180 200 L 380 100 L 460 180 L 260 280 Z" fill="url(#workGlassGrad)" stroke="#FFFFFF" strokeWidth="2" opacity="0.9" />
                                  {/* Top Header of screen */}
                                  <path d="M 180 200 L 380 100 L 400 120 L 200 220 Z" fill="#E6DED2" stroke="#E6DED2" strokeWidth="0.5" opacity="0.8" />
                                  {/* Screen layout sections */}
                                  <path d="M 200 220 L 250 195 L 290 235 L 240 260 Z" fill="#26231F" opacity="0.06" />
                                  {/* Small Card 1 */}
                                  <path d="M 270 185 L 340 150 L 370 180 L 300 215 Z" fill="#FFFFFF" stroke="#E6DED2" strokeWidth="1" />
                                  <line x1="285" y1="184.5" x2="335" y2="159.5" stroke="#DCC7A1" strokeWidth="2.5" />
                                  <line x1="285" y1="194.5" x2="315" y2="179.5" stroke="#26231F" strokeWidth="1.5" opacity="0.3" />
 
                                  {/* Small Card 2 with chart */}
                                  <path d="M 330 155 L 400 120 L 430 150 L 360 185 Z" fill="#FFFFFF" stroke="#E6DED2" strokeWidth="1" />
                                  <g transform="translate(10, 0)">
                                    {/* Bar 1 */}
                                    <path d="M 345 162.5 L 350 160 L 350 150 L 345 152.5 Z" fill="#DCC7A1" />
                                    <path d="M 350 160 L 355 157.5 L 355 147.5 L 350 150 Z" fill="#C8AF7E" />
                                    {/* Bar 2 */}
                                    <path d="M 360 155 L 365 152.5 L 365 137.5 L 360 140 Z" fill="#DCC7A1" />
                                    <path d="M 365 152.5 L 370 150 L 370 135 L 365 137.5 Z" fill="#C8AF7E" />
                                    {/* Bar 3 */}
                                    <path d="M 375 147.5 L 380 145 L 380 125 L 375 127.5 Z" fill="#26231F" />
                                    <path d="M 380 145 L 385 142.5 L 385 122.5 L 380 125 Z" fill="#3A3631" />
                                  </g>
                                </g>
 
                                {/* Floating Front Panel 1 (Left - Analytics) */}
                                <g transform="translate(-70, 40)">
                                  <path d="M 180 200 L 260 160 L 290 190 L 210 230 Z" fill="#26231F" opacity="0.06" filter="blur(4px)" />
                                  <path d="M 180 180 L 260 140 L 290 170 L 210 210 Z" fill="url(#workGlassGrad)" stroke="#FFFFFF" strokeWidth="1.5" />
                                  <ellipse cx="235" cy="175" rx="20" ry="10" fill="none" stroke="#E6DED2" strokeWidth="4" />
                                  <path d="M 225 180 A 20 10 0 0 1 245 170" fill="none" stroke="url(#workGoldGrad)" strokeWidth="4.5" strokeLinecap="round" />
                                  <line x1="200" y1="195" x2="235" y2="177.5" stroke="#C8AF7E" strokeWidth="2.5" />
                                  <line x1="200" y1="202" x2="218" y2="193" stroke="#26231F" strokeWidth="1.5" opacity="0.3" />
                                </g>
 
                                {/* Floating Front Panel 2 (Right - Automation Node) */}
                                <g transform="translate(100, -80)">
                                  <path d="M 240 220 L 320 180 L 350 210 L 270 250 Z" fill="#26231F" opacity="0.05" filter="blur(4px)" />
                                  <path d="M 240 200 L 320 160 L 350 190 L 270 230 Z" fill="url(#workDarkGrad)" stroke="#C8AF7E" strokeWidth="1" />
                                  <circle cx="260" cy="195" r="2.5" fill="#DCC7A1" />
                                  <line x1="268" y1="195" x2="305" y2="176.5" stroke="#FFFFFF" strokeWidth="2" opacity="0.9" />
                                  <circle cx="270" cy="210" r="2.5" fill="#DCC7A1" />
                                  <line x1="278" y1="210" x2="315" y2="191.5" stroke="#FFFFFF" strokeWidth="2" opacity="0.9" />
                                  <circle cx="330" cy="180" r="3.5" fill="#4A8F63" />
                                </g>
 
                                {/* Floating Spheres & Code Node */}
                                <g transform="translate(40, -140)">
                                  <circle cx="210" cy="210" r="8" fill="url(#workGoldGrad)" />
                                  <path d="M 210 210 L 150 240" stroke="#DCC7A1" strokeWidth="1.5" strokeDasharray="3,3" />
                                  <circle cx="150" cy="240" r="4" fill="#26231F" />
                                </g>
 
                                <g transform="translate(230, -50)">
                                  <circle cx="210" cy="210" r="12" fill="url(#workGlassGrad)" stroke="#FFFFFF" strokeWidth="1" />
                                  <circle cx="210" cy="210" r="4" fill="#C8AF7E" />
                                </g>
                              </g>
                            </svg>
                        </div>
                    </div>
 
                    {/* Agency Philosophy - 2-Column Split */}
                    <div className="scroll-reveal editorial-card philosophy-grid" style={{ backgroundColor: 'var(--dark-section)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-card)', overflow: 'hidden', position: 'relative' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <span className="section-tagline" style={{ color: 'var(--primary)', marginBottom: '0px' }}>Agency Philosophy</span>
                            <h2 className="editorial-h2" style={{ color: '#FFFFFF', margin: 0 }}>
                                &ldquo;Every ambitious idea deserves an enterprise-grade digital foundation — without the agency bloat.&rdquo;
                            </h2>
                            <p style={{ color: 'var(--footer-text)', fontSize: '16px', fontStyle: 'italic', marginTop: '8px', margin: 0 }}>
                                — ClownBros Core Engineering Philosophy
                            </p>
                        </div>
                        <div className="float-element svg-wrap-philosophy">
                            <svg viewBox="0 0 500 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '100%', maxHeight: '100%' }}>
                              <defs>
                                <linearGradient id="conceptGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#FFFFFF" />
                                  <stop offset="60%" stopColor="#DCC7A1" />
                                  <stop offset="100%" stopColor="#C8AF7E" />
                                </linearGradient>
                                <linearGradient id="conceptGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                                  <stop offset="100%" stopColor="#F3EEE5" stopOpacity="0.25" />
                                </linearGradient>
                                <linearGradient id="conceptDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#3A3631" />
                                  <stop offset="100%" stopColor="#26231F" />
                                </linearGradient>
                              </defs>

                              {/* Ground shadow */}
                              <ellipse cx="250" cy="320" rx="120" ry="20" fill="#26231F" opacity="0.05" filter="blur(8px)" />

                              <g>
                                {/* Base Ring */}
                                <ellipse cx="250" cy="240" rx="130" ry="65" fill="none" stroke="#E6DED2" strokeWidth="1.5" opacity="0.6" />
                                <ellipse cx="250" cy="240" rx="90" ry="45" fill="none" stroke="#DCC7A1" strokeWidth="1" strokeDasharray="4,4" opacity="0.5" />

                                {/* Architectural 3D Arches */}
                                <g transform="translate(-30, -30)">
                                  <path d="M 180 250 L 180 180 C 180 150, 220 130, 240 150 L 240 220" fill="none" stroke="url(#conceptGoldGrad)" strokeWidth="12" strokeLinecap="round" opacity="0.85" />
                                </g>

                                <g transform="translate(30, 0)">
                                  <path d="M 200 250 L 200 170 C 200 130, 250 110, 270 130 L 270 210" fill="none" stroke="url(#conceptGlassGrad)" strokeWidth="14" strokeLinecap="round" opacity="0.9" />
                                </g>

                                {/* Stacked Stairs / Growth Block */}
                                <g transform="translate(10, 20)">
                                  <path d="M 210 220 L 240 235 L 270 220 L 240 205 Z" fill="#E6DED2" stroke="#E6DED2" strokeWidth="0.5" />
                                  <path d="M 210 220 L 240 235 L 240 245 L 210 230 Z" fill="#F3EEE5" />
                                  <path d="M 240 235 L 270 220 L 270 230 L 240 245 Z" fill="#E6DED2" opacity="0.8" />
                                  
                                  <g transform="translate(5, -15)">
                                    <path d="M 210 220 L 240 235 L 270 220 L 240 205 Z" fill="url(#conceptGoldGrad)" stroke="#C8AF7E" strokeWidth="0.5" />
                                    <path d="M 210 220 L 240 235 L 240 245 L 210 230 Z" fill="#DCC7A1" />
                                    <path d="M 240 235 L 270 220 L 270 230 L 240 245 Z" fill="#C8AF7E" />
                                  </g>

                                  <g transform="translate(10, -30)">
                                    <path d="M 210 220 L 240 235 L 270 220 L 240 205 Z" fill="url(#conceptDarkGrad)" stroke="#26231F" strokeWidth="0.5" />
                                    <path d="M 210 220 L 240 235 L 240 245 L 210 230 Z" fill="#3A3631" />
                                    <path d="M 240 235 L 270 220 L 270 230 L 240 245 Z" fill="#26231F" />
                                  </g>
                                </g>

                                {/* Floating Spheres and Sparkles */}
                                <g transform="translate(0, -90)">
                                  <circle cx="250" cy="180" r="14" fill="url(#conceptGoldGrad)" />
                                  <circle cx="250" cy="180" r="22" fill="none" stroke="#DCC7A1" strokeWidth="1" strokeDasharray="3,3" />
                                </g>

                                <g transform="translate(-80, -80)">
                                  <circle cx="250" cy="180" r="6" fill="url(#conceptGlassGrad)" stroke="#FFFFFF" strokeWidth="0.5" />
                                </g>

                                <g transform="translate(90, -40)">
                                  <circle cx="250" cy="180" r="8" fill="url(#conceptDarkGrad)" />
                                  <path d="M 250 180 L 250 230" stroke="#C8AF7E" strokeWidth="1.5" strokeDasharray="3,3" />
                                </g>

                                {/* Small decorative sparkles */}
                                <circle cx="160" cy="130" r="2" fill="#DCC7A1" />
                                <circle cx="340" cy="120" r="3" fill="#C8AF7E" />
                                <circle cx="310" cy="220" r="2.5" fill="#26231F" opacity="0.4" />
                              </g>
                            </svg>
                        </div>
                    </div>
                </div>
            </section>

            {/* Introductory editorial statement (Aesop/Ralph Lauren feel) */}
            <section className="secondary-bg scroll-reveal" style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
                <div className="container">
                    <div className="overview-grid">
                        <div>
                            <span className="section-tagline">Company Overview</span>
                            <h2 className="editorial-h2" style={{ color: 'var(--text-heading)' }}>
                                Builders first. Long-term partners always.
                            </h2>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                            <p style={{ fontSize: '18px', color: 'var(--text-body)', lineHeight: 1.7 }}>
                                We replace agency layers and junior account managers with direct technical execution. We engineer full digital systems — connecting bespoke Figma UI/UX, clean TypeScript codebases, automated cloud CI/CD pipelines, and conversion-focused architectures under one transparent partnership.
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '24px', marginTop: '8px' }}>
                                <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                                    <h3 className="editorial-h2" style={{ color: 'var(--primary-hover)', marginBottom: '6px', fontSize: '32px' }}>&lt; 400ms</h3>
                                    <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>Target Core Web Vitals &amp; Sub-second speed</p>
                                </div>
                                <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                                    <h3 className="editorial-h2" style={{ color: 'var(--primary-hover)', marginBottom: '6px', fontSize: '32px' }}>100%</h3>
                                    <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>Source code, assets &amp; IP ownership transfer</p>
                                </div>
                                <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                                    <h3 className="editorial-h2" style={{ color: 'var(--primary-hover)', marginBottom: '6px', fontSize: '32px' }}>1-Week</h3>
                                    <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>Iterative agile sprints with live staging access</p>
                                </div>
                                <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                                    <h3 className="editorial-h2" style={{ color: 'var(--primary-hover)', marginBottom: '6px', fontSize: '32px' }}>30-Day</h3>
                                    <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>Post-launch bug warranty &amp; dedicated support</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
 
            {/* Featured Services Preview Section */}
            <section className="scroll-reveal">
                <div className="container">
                    <div className="section-header flex-header" style={{ maxWidth: 'none', marginBottom: '80px' }}>
                        <div>
                            <span className="section-tagline">Featured Capabilities</span>
                            <h2 className="section-title" style={{ margin: 0 }}>What We Build</h2>
                        </div>
                        <Link href="/services" className="btn btn-secondary" style={{ fontSize: '15px', padding: '12px 24px' }}>View All Services</Link>
                    </div>
 
                    <div className="services-grid">
                        <div className="editorial-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '340px' }}>
                            <div>
                                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary-hover)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>01 / Web &amp; Web Apps</span>
                                <h3 className="editorial-h3" style={{ margin: '16px 0 12px 0' }}>High-Performance Web Platforms</h3>
                                <p style={{ fontSize: '16px', color: 'var(--text-body)' }}>Custom Next.js &amp; React fullstack portals, headless eCommerce storefronts, interactive web applications, and optimized corporate sites.</p>
                            </div>
                            <Link href="/services" style={{ color: 'var(--text-heading)', fontWeight: 600, fontSize: '15px', textDecoration: 'none', marginTop: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                Explore Capabilities <span style={{ color: 'var(--primary)' }}>&rarr;</span>
                            </Link>
                        </div>
 
                        <div className="editorial-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '340px' }}>
                            <div>
                                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary-hover)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>02 / Mobile Engineering</span>
                                <h3 className="editorial-h3" style={{ margin: '16px 0 12px 0' }}>Cross-Platform Mobile Apps</h3>
                                <p style={{ fontSize: '16px', color: 'var(--text-body)' }}>Native iOS &amp; Android software engineered with Flutter and React Native, offering offline sync, real-time WebSockets, and seamless UX.</p>
                            </div>
                            <Link href="/services" style={{ color: 'var(--text-heading)', fontWeight: 600, fontSize: '15px', textDecoration: 'none', marginTop: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                Explore Capabilities <span style={{ color: 'var(--primary)' }}>&rarr;</span>
                            </Link>
                        </div>
 
                        <div className="editorial-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '340px' }}>
                            <div>
                                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary-hover)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>03 / Product Design</span>
                                <h3 className="editorial-h3" style={{ margin: '16px 0 12px 0' }}>UI/UX &amp; Design Systems</h3>
                                <p style={{ fontSize: '16px', color: 'var(--text-body)' }}>High-fidelity Figma prototypes, comprehensive design tokens, conversion-focused wireframing, and rigorous user journey testing.</p>
                            </div>
                            <Link href="/services" style={{ color: 'var(--text-heading)', fontWeight: 600, fontSize: '15px', textDecoration: 'none', marginTop: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                Explore Capabilities <span style={{ color: 'var(--primary)' }}>&rarr;</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
 
            {/* Dark contrast block for call-to-action (Aesop / Soho House inspired) */}
            <section className="dark-bg scroll-reveal" style={{ padding: '96px 0' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <span className="section-tagline" style={{ color: 'var(--primary)' }}>Partner With Us</span>
                    <h2 className="editorial-hero-title" style={{ margin: '16px 0 24px 0', color: '#FFFFFF' }}>
                        Ready to engineer your next digital breakthrough?
                    </h2>
                    <p className="editorial-large-text" style={{ maxWidth: '680px', margin: '0 auto 40px auto', color: 'var(--footer-text)' }}>
                        Schedule a complimentary 30-minute discovery &amp; architecture session. We&apos;ll deliver a tailored feature breakdown, tech stack recommendation, and fixed-milestone roadmap within 24 hours.
                    </p>
                    <Link href="/contact" className="btn btn-primary">Schedule Discovery Call</Link>
                </div>
            </section>
        </main>
    );
}
