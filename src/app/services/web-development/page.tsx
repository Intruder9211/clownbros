'use client';

import React, { useState } from 'react';
import ContactModal from '@/components/ContactModal';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function WebDevelopmentPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState('');

    const handleCardClick = (title) => {
        setSelectedService(title);
        setIsModalOpen(true);
    };
    const features = [
        { title: 'Next.js 15 & React 19', desc: 'Type-safe, server-rendered web applications built for extreme speed and Google Core Web Vitals score of 95+.' },
        { title: 'WordPress & WooCommerce', desc: 'Fully animated, highly responsive, and customizable WordPress websites and WooCommerce stores tailored to your brand.' },
        { title: 'Shopify & Headless E-Commerce', desc: 'Fully animated and responsive Shopify stores, custom themes, and headless integrations delivering lightning-fast product pages.' },
        { title: 'Corporate & Web3 Platforms', desc: 'Sleek editorial brand websites, Web3 dApps, and interactive client portals designed to convert visitors.' },
        { title: 'Tailwind & Custom CSS Systems', desc: 'Responsive, fluid layouts with glassmorphism, micro-animations, and seamless dark mode support.' }
    ];

    return (
        <main>
            <section className="page-hero" style={{ backgroundColor: 'var(--background-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                <div className="container">
                    <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>
                        <span className="subtitle">DEDICATED SERVICE</span>
                        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 600, color: 'var(--text-heading)', lineHeight: 1.15, marginBottom: '20px' }}>
                            Web & Web3 Development
                        </h1>
                        <p style={{ fontSize: '19px', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '32px' }}>
                            We engineer high-performance web platforms, custom web applications, and headless e-commerce storefronts designed for speed, scale, and conversion.
                        </p>
                        <Link href="/contact" className="btn btn-primary" style={{ padding: '14px 32px', borderRadius: '10px' }}>
                            Start Web Project
                        </Link>
                    </div>
                </div>
            </section>

            <section style={{ padding: '90px 0', backgroundColor: 'var(--background)' }}>
                <div className="container">
                    <div className="section-header" style={{ marginBottom: '50px', textAlign: 'center' }}>
                        <span className="subtitle">CORE CAPABILITIES</span>
                        <h2 className="title">What We Build in Web Engineering</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
                        {features.map((f, i) => (
                            <motion.div key={f.title} onClick={() => handleCardClick(f.title)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.5 }} whileHover={{ y: -8, boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.1)' }} style={{ cursor: 'pointer', background: '#FFFFFF', padding: '32px', borderRadius: '18px', border: '1px solid var(--border-color)' }}>
                                <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '10px' }}>{f.title}</h3>
                                <p style={{ fontSize: '15px', color: 'var(--text-body)', lineHeight: 1.6 }}>{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} preSelectedService={selectedService} />
        </main>
    );
}
