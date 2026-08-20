'use client';

import React from 'react';
import Link from 'next/link';

export default function MobileAppsPage() {
    const features = [
        { title: 'Flutter Cross-Platform', desc: 'Single codebase delivering pixel-perfect native iOS & Android performance with zero latency.' },
        { title: 'Native Swift & Kotlin', desc: 'Hardware-level mobile engineering utilizing Bluetooth, camera, biometrics, and offline sync.' },
        { title: 'SaaS Mobile Portals', desc: 'Empower your web app users with instant mobile push notifications, offline cache, and native UX.' },
        { title: 'App Store Optimization & Deployment', desc: 'End-to-end management of Apple App Store and Google Play Store publishing protocols.' }
    ];

    return (
        <main style={{ paddingTop: '120px' }}>
            <section style={{ padding: '80px 0', backgroundColor: 'var(--background-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                <div className="container">
                    <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>
                        <span className="subtitle">DEDICATED SERVICE</span>
                        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 600, color: 'var(--text-heading)', lineHeight: 1.15, marginBottom: '20px' }}>
                            Mobile App Engineering
                        </h1>
                        <p style={{ fontSize: '19px', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '32px' }}>
                            Build iOS & Android mobile applications that users love. From concept to App Store launch, we engineer sleek, scalable mobile experiences.
                        </p>
                        <Link href="/contact" className="btn btn-primary" style={{ padding: '14px 32px', borderRadius: '10px' }}>
                            Build Mobile App
                        </Link>
                    </div>
                </div>
            </section>

            <section style={{ padding: '90px 0', backgroundColor: 'var(--background)' }}>
                <div className="container">
                    <div className="section-header" style={{ marginBottom: '50px', textAlign: 'center' }}>
                        <span className="subtitle">MOBILE CAPABILITIES</span>
                        <h2 className="title">Engineered for iOS & Android Scale</h2>
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
