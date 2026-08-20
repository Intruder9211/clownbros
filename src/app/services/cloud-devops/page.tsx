'use client';

import React from 'react';
import Link from 'next/link';

export default function CloudDevOpsPage() {
    const features = [
        { title: 'AWS, GCP & Vercel Hosting', desc: 'Architect resilient serverless infrastructure with automated scaling, load balancing, and edge caching.' },
        { title: 'CI/CD Automated Pipelines', desc: 'Continuous integration and deployment via GitHub Actions, Docker containers, and automated test runners.' },
        { title: 'Database Optimization & Security', desc: 'High-availability PostgreSQL, MongoDB, and Redis setups with encrypted backups and zero-downtime migrations.' },
        { title: '24/7 Monitoring & Telemetry', desc: 'Real-time error tracking with Sentry, Datadog performance monitoring, and 99.9% uptime SLA management.' }
    ];

    return (
        <main style={{ paddingTop: '120px' }}>
            <section style={{ padding: '80px 0', backgroundColor: 'var(--background-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                <div className="container">
                    <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>
                        <span className="subtitle">DEDICATED SERVICE</span>
                        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 600, color: 'var(--text-heading)', lineHeight: 1.15, marginBottom: '20px' }}>
                            Cloud Infrastructure & DevOps
                        </h1>
                        <p style={{ fontSize: '19px', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '32px' }}>
                            Deploy, scale, and secure your cloud infrastructure. We engineer zero-downtime CI/CD deployment pipelines and automated serverless architectures.
                        </p>
                        <Link href="/contact" className="btn btn-primary" style={{ padding: '14px 32px', borderRadius: '10px' }}>
                            Consult Cloud Engineer
                        </Link>
                    </div>
                </div>
            </section>

            <section style={{ padding: '90px 0', backgroundColor: 'var(--background)' }}>
                <div className="container">
                    <div className="section-header" style={{ marginBottom: '50px', textAlign: 'center' }}>
                        <span className="subtitle">CLOUD CAPABILITIES</span>
                        <h2 className="title">Reliable, Secure & Automated Infrastructure</h2>
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
