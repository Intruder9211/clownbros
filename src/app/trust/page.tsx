'use client';

import React from 'react';
import Link from 'next/link';

export default function TrustPage() {
    return (
        <main className="trust-page">
            {/* Hero Section */}
            <section style={{ padding: '120px 0 80px', backgroundColor: 'var(--background-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                <div className="container">
                    <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
                        <div className="career-badge" style={{ marginBottom: '20px' }}>
                            🛡️ Enterprise Governance & Security
                        </div>
                        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 600, color: 'var(--text-heading)', lineHeight: 1.15, marginBottom: '24px' }}>
                            Built on Trust, Security & <br />
                            <span style={{ fontStyle: 'italic', color: 'var(--primary-hover)' }}>Total Transparency</span>
                        </h1>
                        <p style={{ fontSize: '20px', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '32px' }}>
                            We protect your proprietary data, trade secrets, and brand reputation with strict NDA enforcement, 100% intellectual property transfer, and rigorous SOC2/GDPR code standards.
                        </p>
                        
                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link href="/contact" className="btn btn-primary" style={{ padding: '14px 32px', borderRadius: '10px' }}>
                                Request Mutual NDA & Contract
                            </Link>
                            <Link href="/process" className="btn btn-secondary" style={{ padding: '14px 32px', borderRadius: '10px', background: '#FFFFFF', border: '1px solid var(--border-color)' }}>
                                View Delivery SLA
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Trust Pillars */}
            <section style={{ padding: '90px 0', backgroundColor: 'var(--background)' }}>
                <div className="container">
                    <div className="section-header" style={{ marginBottom: '50px', textAlign: 'center' }}>
                        <span className="subtitle">GOVERNANCE & STANDARDS</span>
                        <h2 className="title">5 Pillars of Enterprise Trust</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
                        {/* Card 1 */}
                        <div className="trust-badge-card" style={{ textAlign: 'left', padding: '36px' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(220, 199, 161, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: 'var(--dark-section)' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            </div>
                            <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '12px' }}>Mutual NDA & IP Assignment</h3>
                            <p style={{ fontSize: '15px', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '16px' }}>
                                We sign non-disclosure agreements before reviewing any sensitive documentation. All source code, assets, database structures, and patents belong 100% to you.
                            </p>
                            <div style={{ fontSize: '13px', fontWeight: 600, color: '#4A8F63', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span>✓</span> Instant NDA execution on request
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="trust-badge-card" style={{ textAlign: 'left', padding: '36px' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(220, 199, 161, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: 'var(--dark-section)' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                            </div>
                            <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '12px' }}>SOC2 & OWASP Code Standards</h3>
                            <p style={{ fontSize: '15px', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '16px' }}>
                                Our codebase architecture adheres to OWASP Top 10 security guidelines, SQL injection prevention, encrypted environment secrets, and strict HTTPS/TLS protocols.
                            </p>
                            <div style={{ fontSize: '13px', fontWeight: 600, color: '#4A8F63', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span>✓</span> Automated dependency vulnerability scanning
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="trust-badge-card" style={{ textAlign: 'left', padding: '36px' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(220, 199, 161, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: 'var(--dark-section)' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                            </div>
                            <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '12px' }}>99.9% Infrastructure Uptime SLA</h3>
                            <p style={{ fontSize: '15px', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '16px' }}>
                                Cloud deployments hosted on multi-region AWS/Vercel serverless clusters feature automatic failover, database replication, and daily automated snapshots.
                            </p>
                            <div style={{ fontSize: '13px', fontWeight: 600, color: '#4A8F63', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span>✓</span> 24/7 automated uptime telemetry monitoring
                            </div>
                        </div>

                        {/* Card 4 */}
                        <div className="trust-badge-card" style={{ textAlign: 'left', padding: '36px' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(220, 199, 161, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: 'var(--dark-section)' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                            </div>
                            <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '12px' }}>GDPR & Data Privacy Compliance</h3>
                            <p style={{ fontSize: '15px', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '16px' }}>
                                Built-in data erasure compliance, cookie consent controls, encrypted user session tokens, and privacy-first data collection architectures.
                            </p>
                            <div style={{ fontSize: '13px', fontWeight: 600, color: '#4A8F63', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span>✓</span> Full compliance documentation provided
                            </div>
                        </div>

                        {/* Card 5 */}
                        <div className="trust-badge-card" style={{ textAlign: 'left', padding: '36px' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(220, 199, 161, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: 'var(--dark-section)' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                            </div>
                            <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '12px' }}>Escalation & Account Matrix</h3>
                            <p style={{ fontSize: '15px', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '16px' }}>
                                Every client receives a direct technical lead, emergency 15-minute SLA response channels, and transparent weekly progress audit logs.
                            </p>
                            <div style={{ fontSize: '13px', fontWeight: 600, color: '#4A8F63', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span>✓</span> Direct Slack & WhatsApp support channel
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Compliance Badge Certification Grid */}
            <section style={{ padding: '80px 0', backgroundColor: 'var(--background-secondary)', borderTop: '1px solid var(--border-color)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px' }}>
                        <span className="subtitle">VERIFIED REPUTATION</span>
                        <h2 className="title">Enterprise Compliance Badges</h2>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <div style={{ background: '#FFFFFF', padding: '20px 32px', borderRadius: '14px', border: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-heading)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ color: '#4A8F63', fontSize: '20px' }}>🔒</span> SSL / TLS 1.3 Encrypted
                        </div>
                        <div style={{ background: '#FFFFFF', padding: '20px 32px', borderRadius: '14px', border: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-heading)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ color: '#4A8F63', fontSize: '20px' }}>🛡️</span> OWASP Top 10 Compliant
                        </div>
                        <div style={{ background: '#FFFFFF', padding: '20px 32px', borderRadius: '14px', border: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-heading)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ color: '#4A8F63', fontSize: '20px' }}>📋</span> GDPR Data Ready
                        </div>
                        <div style={{ background: '#FFFFFF', padding: '20px 32px', borderRadius: '14px', border: '1px solid var(--border-color)', fontWeight: 600, color: 'var(--text-heading)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ color: '#4A8F63', fontSize: '20px' }}>⚡</span> 99.9% Uptime Guarantee
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
