'use client';

import React from 'react';
import Link from 'next/link';

export default function UIUXDesignPage() {
    const features = [
        { title: 'Figma Design Systems', desc: 'Atomic design component libraries, color design tokens, typography scales, and UI documentation.' },
        { title: 'User Research & Wireframing', desc: 'In-depth target audience interviews, low-fidelity wireframes, user flow diagrams, and journey maps.' },
        { title: 'Interactive Prototypes', desc: 'Clickable high-fidelity prototypes demonstrating micro-animations, modal flows, and responsive transitions.' },
        { title: 'SaaS & Mobile UI Design', desc: 'Complex analytics dashboards, dark-mode interfaces, and mobile app UI tailored for maximum engagement.' }
    ];

    return (
        <main style={{ paddingTop: '120px' }}>
            <section style={{ padding: '80px 0', backgroundColor: 'var(--background-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                <div className="container">
                    <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>
                        <span className="subtitle">DEDICATED SERVICE</span>
                        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 600, color: 'var(--text-heading)', lineHeight: 1.15, marginBottom: '20px' }}>
                            UI/UX Product Design
                        </h1>
                        <p style={{ fontSize: '19px', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '32px' }}>
                            Transform raw product ideas into world-class visual interfaces. We design intuitive, luxury web and app experiences.
                        </p>
                        <Link href="/contact" className="btn btn-primary" style={{ padding: '14px 32px', borderRadius: '10px' }}>
                            Request Design System
                        </Link>
                    </div>
                </div>
            </section>

            <section style={{ padding: '90px 0', backgroundColor: 'var(--background)' }}>
                <div className="container">
                    <div className="section-header" style={{ marginBottom: '50px', textAlign: 'center' }}>
                        <span className="subtitle">DESIGN CAPABILITIES</span>
                        <h2 className="title">Crafting Human-Centered Interfaces</h2>
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
