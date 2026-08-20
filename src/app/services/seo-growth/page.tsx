'use client';

import React from 'react';
import Link from 'next/link';

export default function SEOGrowthPage() {
    const features = [
        { title: 'Technical & Organic SEO Audits', desc: 'Optimize site architecture, canonical tags, XML sitemaps, structured schema data, and mobile crawlability.' },
        { title: 'Core Web Vitals Speed Tuning', desc: 'Transform slow loading metrics into sub-second page loads to score 95+ on Google PageSpeed Insights.' },
        { title: 'Content & Editorial Strategy', desc: 'Data-backed keyword cluster research and high-converting editorial articles that rank on page one.' },
        { title: 'Performance Marketing & Lead Funnels', desc: 'Targeted Google Ads, Meta Ads, and high-conversion landing page funnels designed to maximize ROI.' }
    ];

    return (
        <main style={{ paddingTop: '120px' }}>
            <section style={{ padding: '80px 0', backgroundColor: 'var(--background-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                <div className="container">
                    <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>
                        <span className="subtitle">DEDICATED SERVICE</span>
                        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 600, color: 'var(--text-heading)', lineHeight: 1.15, marginBottom: '20px' }}>
                            SEO & Organic Growth
                        </h1>
                        <p style={{ fontSize: '19px', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '32px' }}>
                            Drive targeted organic traffic and rank #1 on search engines. We engineer technical SEO, Core Web Vitals optimizations, and conversion funnels.
                        </p>
                        <Link href="/contact" className="btn btn-primary" style={{ padding: '14px 32px', borderRadius: '10px' }}>
                            Get Free SEO Audit
                        </Link>
                    </div>
                </div>
            </section>

            <section style={{ padding: '90px 0', backgroundColor: 'var(--background)' }}>
                <div className="container">
                    <div className="section-header" style={{ marginBottom: '50px', textAlign: 'center' }}>
                        <span className="subtitle">GROWTH CAPABILITIES</span>
                        <h2 className="title">Data-Driven Organic Expansion</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
                        {features.map((f) => (
                            <div key={f.title} style={{ background: '#FFFFFF', padding: '32px', borderRadius: '18px', border: '1px solid var(--border-color)' }}>
                                <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '10px' }}>{f.title}</h3>
                                <p style={{ fontSize: '15px', color: 'var(--text-body)', lineHeight: 1.6 }}>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
