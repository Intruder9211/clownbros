'use client';

import React from 'react';
import Link from 'next/link';

export default function AISolutionsPage() {
    const features = [
        { title: 'Custom LLM & OpenAI Integration', desc: 'Embed GPT-4o, Claude 3.5, or open-source Llama models directly into your web applications and SaaS products.' },
        { title: 'RAG & Vector Database Search', desc: 'Empower your company data with retrieval-augmented generation (RAG) using Pinecone, PGVector, and LangChain.' },
        { title: 'Autonomous AI Agents', desc: 'Build self-executing AI agents that automate customer service support, lead qualification, and document indexing.' },
        { title: 'AI Chatbots & Automation', desc: 'Custom WhatsApp, Telegram, and website chatbot widgets with human-in-the-loop fallback capability.' }
    ];

    return (
        <main style={{ paddingTop: '120px' }}>
            <section style={{ padding: '80px 0', backgroundColor: 'var(--background-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                <div className="container">
                    <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>
                        <span className="subtitle">DEDICATED SERVICE</span>
                        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 600, color: 'var(--text-heading)', lineHeight: 1.15, marginBottom: '20px' }}>
                            AI & Machine Learning Solutions
                        </h1>
                        <p style={{ fontSize: '19px', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '32px' }}>
                            Supercharge your product with artificial intelligence. We integrate custom LLMs, autonomous RAG agents, and intelligent workflow automation.
                        </p>
                        <Link href="/contact" className="btn btn-primary" style={{ padding: '14px 32px', borderRadius: '10px' }}>
                            Integrate AI Agents
                        </Link>
                    </div>
                </div>
            </section>

            <section style={{ padding: '90px 0', backgroundColor: 'var(--background)' }}>
                <div className="container">
                    <div className="section-header" style={{ marginBottom: '50px', textAlign: 'center' }}>
                        <span className="subtitle">AI CAPABILITIES</span>
                        <h2 className="title">Next-Generation Artificial Intelligence</h2>
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
