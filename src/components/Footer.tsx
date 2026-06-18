'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<{ type: 'success' | 'error' | 'idle'; message: string }>({
        type: 'idle',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);
        setStatus({ type: 'idle', message: '' });

        setTimeout(() => {
            setIsSubmitting(false);
            setEmail('');
            setStatus({
                type: 'success',
                message: 'Thank you for subscribing! Welcome to our editorial newsletter.'
            });
        }, 1200);
    };

    return (
        <footer className="main-footer">
            <div className="container">
                <div className="footer-top">
                    {/* Newsletter Block */}
                    <div className="footer-newsletter">
                        <h2 className="footer-brand-title">STAY AHEAD<span>.</span></h2>
                        <p className="newsletter-sub">
                            Get insights on digital transformations, modern development, and cloud tools once a month.
                        </p>
                        <form onSubmit={handleSubscribe} className="newsletter-form">
                            <div className="input-pill-wrapper">
                                <input 
                                    type="email" 
                                    className="newsletter-input" 
                                    placeholder="Your work email..." 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={isSubmitting}
                                />
                                <button 
                                    type="submit" 
                                    className="btn-newsletter" 
                                    aria-label="Subscribe to newsletter"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <div style={{ width: '16px', height: '16px', border: '2px solid black', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                                    ) : (
                                        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </form>
                        {status.type !== 'idle' && (
                            <div className="newsletter-msg" style={{ color: status.type === 'success' ? '#DCC7A1' : '#C75B56' }}>
                                {status.message}
                            </div>
                        )}
                        <div className="footer-socials" style={{ display: 'flex', gap: '20px', marginTop: '24px', alignItems: 'center' }}>
                            <a href="https://instagram.com/clownbros" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram" style={{ color: 'var(--footer-text)', display: 'flex', alignItems: 'center' }}>
                                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            </a>
                            <a href="https://youtube.com/@clownbros" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="YouTube" style={{ color: 'var(--footer-text)', display: 'flex', alignItems: 'center' }}>
                                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.95 1.96C5.12 19.5 12 19.5 12 19.5s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                            </a>
                            <a href="https://linkedin.com/company/clownbros" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn" style={{ color: 'var(--footer-text)', display: 'flex', alignItems: 'center' }}>
                                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                            </a>
                            <a href="https://x.com/clownbros" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="X (formerly Twitter)" style={{ color: 'var(--footer-text)', display: 'flex', alignItems: 'center' }}>
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                            </a>
                        </div>
                    </div>

                    {/* Footer Navigation Links */}
                    <div className="footer-nav-grid">
                        <div className="footer-nav-col">
                            <h4>Services</h4>
                            <ul>
                                <li><Link href="/services">Website Development</Link></li>
                                <li><Link href="/services">Mobile App Development</Link></li>
                                <li><Link href="/services">UI/UX Interface Design</Link></li>
                                <li><Link href="/services">Cloud Integrations</Link></li>
                                <li><Link href="/services">Digital Marketing & SEO</Link></li>
                            </ul>
                        </div>
                        <div className="footer-nav-col">
                            <h4>Company</h4>
                            <ul>
                                <li><Link href="/about">Vision & Mission</Link></li>
                                <li><Link href="/about">Core Values</Link></li>
                                <li><Link href="/services">Technology Stack</Link></li>
                                <li><Link href="/services#faqs">Common FAQs</Link></li>
                            </ul>
                        </div>
                        <div className="footer-nav-col">
                            <h4>Legal</h4>
                            <ul>
                                <li><Link href="#">Privacy Policy</Link></li>
                                <li><Link href="#">Terms of Service</Link></li>
                                <li><Link href="#">Cookie Settings</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <hr className="footer-divider" />

                <div className="footer-bottom">
                    <div className="footer-copyright">
                        <p>&copy; {new Date().getFullYear()} ClownBros Digital Ltd. All rights reserved. Partnering with startups and enterprises globally.</p>
                    </div>
                    <div className="footer-meta-info">
                        <p>Designed with luxury organic layout standards inspired by modern editorial styles.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
