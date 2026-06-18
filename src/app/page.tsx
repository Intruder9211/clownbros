'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
    return (
        <main>
            {/* Hero Section */}
            <section className="hero-section" id="hero" style={{ paddingTop: '160px', paddingBottom: '96px' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '64px', alignItems: 'center', marginBottom: '80px' }}>
                        {/* Left Column: Text Content */}
                        <div className="reveal-left visible">
                            <div className="hero-tagline animate-fade-in" style={{ marginBottom: '24px' }}>
                                <span className="pill-badge">EST. 2026 — BRAND PROMISE</span>
                            </div>
                            
                            <h1 className="hero-title animate-fade-in delay-1" style={{ fontFamily: 'var(--font-heading)', fontSize: '64px', fontWeight: 500, lineHeight: 1.15, marginBottom: '32px', color: 'var(--text-heading)' }}>
                                From Idea to Impact. <br />
                                <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>We shape the digital future.</span>
                            </h1>
                            
                            <p className="hero-lead animate-fade-in delay-2" style={{ fontSize: '20px', lineHeight: 1.6, color: 'var(--text-body)', marginBottom: '40px' }}>
                                ClownBros is a modern technology and digital transformation partner. We craft premium digital ecosystems, custom software architectures, and automated marketing funnels that accelerate global business growth.
                            </p>
                            
                            <div className="hero-actions animate-fade-in delay-3" style={{ display: 'flex', gap: '16px' }}>
                                <Link href="/services" className="btn btn-primary">Our Services</Link>
                                <Link href="/contact" className="btn btn-secondary">Start Project</Link>
                            </div>
                        </div>

                        {/* Right Column: Featured Workspace Visual */}
                        <div className="reveal-right visible zoom-on-hover" style={{ borderRadius: 'var(--radius-image)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-soft)', overflow: 'hidden', height: '520px', position: 'relative' }}>
                            <img 
                                src="/clownbros_workspace.png" 
                                alt="ClownBros Premium Workspace" 
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, rgba(38, 35, 31, 0.4))' }}></div>
                        </div>
                    </div>

                    {/* Agency Philosophy - Background Image */}
                    <div className="scroll-reveal zoom-on-hover" style={{ width: '100%', height: '480px', borderRadius: 'var(--radius-image)', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-soft)' }}>
                        <img 
                            src="/clownbros_concept.png" 
                            alt="Agency Philosophy" 
                            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(38, 35, 31, 0.65)', backdropFilter: 'blur(3px)' }}></div>
                        <div style={{ textAlign: 'center', padding: '48px', position: 'relative', zIndex: 1, maxWidth: '840px' }}>
                            <span className="section-tagline" style={{ color: 'var(--primary)', marginBottom: '16px' }}>Agency Philosophy</span>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '38px', fontWeight: 500, color: '#FFFFFF', lineHeight: 1.35 }}>
                                &ldquo;Every business deserves a premium digital presence regardless of its size.&rdquo;
                            </h2>
                        </div>
                    </div>
                </div>
            </section>

            {/* Introductory editorial statement (Aesop/Ralph Lauren feel) */}
            <section className="secondary-bg scroll-reveal" style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: '64px' }}>
                        <div>
                            <span className="section-tagline">Company Overview</span>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '40px', fontWeight: 500, color: 'var(--text-heading)' }}>
                                Long-term partner, not just a provider.
                            </h2>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                            <p style={{ fontSize: '18px', color: 'var(--text-body)', lineHeight: 1.7 }}>
                                We don&apos;t just build websites or application interfaces—we construct cohesive digital solutions. Our work connects creative design, custom code structures, search engine visibility, and lead generation under a unified strategy.
                            </p>
                            <div style={{ display: 'flex', gap: '48px', marginTop: '16px' }}>
                                <div>
                                    <h3 style={{ fontSize: '32px', color: 'var(--primary-hover)', fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>99%</h3>
                                    <p style={{ fontSize: '15px', color: 'var(--text-muted)' }}>Client retention rate through active support partnerships</p>
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '32px', color: 'var(--primary-hover)', fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>200+</h3>
                                    <p style={{ fontSize: '15px', color: 'var(--text-muted)' }}>Custom web & application builds deployed worldwide</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Services Preview Section */}
            <section className="scroll-reveal">
                <div className="container">
                    <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px', maxWidth: 'none', marginBottom: '80px' }}>
                        <div>
                            <span className="section-tagline">Featured Capabilities</span>
                            <h2 className="section-title" style={{ margin: 0 }}>What We Build</h2>
                        </div>
                        <Link href="/services" className="btn btn-secondary" style={{ fontSize: '15px', padding: '12px 24px' }}>View All Services</Link>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
                        <div className="editorial-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '340px' }}>
                            <div>
                                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary-hover)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>01 / Custom Web</span>
                                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', fontWeight: 500, margin: '16px 0 12px 0' }}>Website Development</h3>
                                <p style={{ fontSize: '16px', color: 'var(--text-body)' }}>Custom corporate web solutions, React/Next.js dynamic builds, WordPress headless, and eCommerce frameworks built to scale.</p>
                            </div>
                            <Link href="/services" style={{ color: 'var(--text-heading)', fontWeight: 600, fontSize: '15px', textDecoration: 'none', marginTop: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                Explore <span style={{ color: 'var(--primary)' }}>&rarr;</span>
                            </Link>
                        </div>

                        <div className="editorial-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '340px' }}>
                            <div>
                                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary-hover)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>02 / Software</span>
                                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', fontWeight: 500, margin: '16px 0 12px 0' }}>Mobile App Development</h3>
                                <p style={{ fontSize: '16px', color: 'var(--text-body)' }}>Native Android/iOS application structures, cross-platform deployments (Flutter/React Native), and robust custom SaaS portals.</p>
                            </div>
                            <Link href="/services" style={{ color: 'var(--text-heading)', fontWeight: 600, fontSize: '15px', textDecoration: 'none', marginTop: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                Explore <span style={{ color: 'var(--primary)' }}>&rarr;</span>
                            </Link>
                        </div>

                        <div className="editorial-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '340px' }}>
                            <div>
                                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary-hover)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>03 / Interaction</span>
                                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', fontWeight: 500, margin: '16px 0 12px 0' }}>UI/UX Design Systems</h3>
                                <p style={{ fontSize: '16px', color: 'var(--text-body)' }}>Complete Figma product layouts, visual wireframing, UX research, style design guidelines, and user navigation testing.</p>
                            </div>
                            <Link href="/services" style={{ color: 'var(--text-heading)', fontWeight: 600, fontSize: '15px', textDecoration: 'none', marginTop: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                Explore <span style={{ color: 'var(--primary)' }}>&rarr;</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dark contrast block for call-to-action (Aesop / Soho House inspired) */}
            <section className="dark-bg scroll-reveal" style={{ padding: '96px 0' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <span className="section-tagline" style={{ color: 'var(--primary)' }}>Partner With Us</span>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '48px', fontWeight: 500, margin: '16px 0 24px 0', color: '#FFFFFF' }}>
                        Ready to start your digital transformation?
                    </h2>
                    <p style={{ maxWidth: '640px', margin: '0 auto 40px auto', fontSize: '18px', color: 'var(--footer-text)' }}>
                        Tell us about your brand goals, scope of work, or software requirements. Our technology architects will prepare a custom proposal.
                    </p>
                    <Link href="/contact" className="btn btn-primary">Start a Project Brief</Link>
                </div>
            </section>
        </main>
    );
}
