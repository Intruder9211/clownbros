'use client';

import React, { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        details: '',
        budget: '10k_25k'
    });
    const [projectTypes, setProjectTypes] = useState<string[]>([]);
    const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | 'idle'; message: string }>({
        type: 'idle',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCheckboxChange = (type: string) => {
        if (projectTypes.includes(type)) {
            setProjectTypes(projectTypes.filter((t) => t !== type));
        } else {
            setProjectTypes([...projectTypes, type]);
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormStatus({ type: 'idle', message: '' });

        const { name, email, details, budget } = formData;
        const typesStr = projectTypes.length > 0 ? projectTypes.join(', ') : 'None selected';

        // Construct mailto link
        const subject = encodeURIComponent(`Project Brief from ${name}`);
        const body = encodeURIComponent(
            `Name: ${name}\n` +
            `Client Email: ${email}\n` +
            `Project Types: ${typesStr}\n` +
            `Estimated Budget: ${budget.replace('_', ' – ')}\n\n` +
            `Project Details:\n${details}`
        );
        const mailtoUrl = `mailto:singhmohit101103@gmail.com?subject=${subject}&body=${body}`;

        setTimeout(() => {
            setIsSubmitting(false);
            setFormStatus({
                type: 'success',
                message: 'Thank you for your interest! We have received your email details. We will review your project brief and call or email you back shortly.'
            });
            window.location.href = mailtoUrl;
            setFormData({ name: '', email: '', details: '', budget: '10k_25k' });
            setProjectTypes([]);
        }, 1200);
    };

    return (
        <main style={{ paddingTop: '120px' }}>
            {/* Contact Section */}
            <section className="scroll-reveal" style={{ paddingBottom: '96px' }}>
                <div className="container">
                    <div className="contact-grid">
                        {/* Left Info Panel */}
                        <div className="contact-info reveal-left visible" style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignSelf: 'start' }}>
                            <span className="section-tagline">Onboarding</span>
                            <h1 className="editorial-hero-title">
                                Have an idea? <br />
                                <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Let&apos;s make impact.</span>
                            </h1>
                            <p style={{ color: 'var(--text-body)', fontSize: '18px', lineHeight: 1.6 }}>
                                Tell us about your project or growth goals. Our engineering team reviews all briefs within 24 hours to map features, structure timelines, and propose design scopes.
                            </p>

                            {/* Contact Visual Asset */}
                            <div className="float-element svg-wrap-contact" style={{ margin: '16px 0' }}>
                                <svg viewBox="0 0 500 350" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '100%', maxHeight: '100%' }}>
                                  <defs>
                                    <linearGradient id="contactGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                      <stop offset="0%" stopColor="#FFFFFF" />
                                      <stop offset="60%" stopColor="#DCC7A1" />
                                      <stop offset="100%" stopColor="#C8AF7E" />
                                    </linearGradient>
                                    <linearGradient id="contactGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                                      <stop offset="100%" stopColor="#F3EEE5" stopOpacity="0.25" />
                                    </linearGradient>
                                    <linearGradient id="contactDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                      <stop offset="0%" stopColor="#3A3631" />
                                      <stop offset="100%" stopColor="#26231F" />
                                    </linearGradient>
                                    <filter id="contactShadow" x="-20%" y="-20%" width="140%" height="140%">
                                      <feDropShadow dx="0" dy="16" stdDeviation="12" floodColor="#26231F" floodOpacity="0.08" />
                                    </filter>
                                  </defs>

                                  {/* Ground shadow */}
                                  <ellipse cx="250" cy="270" rx="120" ry="20" fill="#26231F" opacity="0.04" filter="blur(6px)" />

                                  <g filter="url(#contactShadow)">
                                    {/* Base Ring / Platform */}
                                    <path d="M 140 200 L 250 145 L 360 200 L 250 255 Z" fill="none" stroke="#E6DED2" strokeWidth="1.5" opacity="0.8" />
                                    <path d="M 170 200 L 250 160 L 330 200 L 250 240 Z" fill="none" stroke="#DCC7A1" strokeWidth="1" strokeDasharray="4,4" opacity="0.6" />

                                    {/* Floating Onboarding Checklist Document */}
                                    <g transform="translate(40, -40)">
                                      <path d="M 210 190 L 260 165 L 260 225 L 210 250 Z" fill="#26231F" opacity="0.05" filter="blur(3px)" />
                                      <path d="M 210 170 L 260 145 L 260 215 L 210 240 Z" fill="#FFFFFF" stroke="#E6DED2" strokeWidth="1" />
                                      <path d="M 210 170 L 210 240 L 212 241 Z" fill="#E6DED2" />
                                      <line x1="220" y1="172.5" x2="250" y2="157.5" stroke="#26231F" strokeWidth="1.5" opacity="0.3" />
                                      <line x1="220" y1="187.5" x2="250" y2="172.5" stroke="#26231F" strokeWidth="1.5" opacity="0.3" />
                                      <line x1="220" y1="202.5" x2="250" y2="187.5" stroke="#26231F" strokeWidth="1.5" opacity="0.3" />
                                      <circle cx="216" cy="172.5" r="2.5" fill="#DCC7A1" />
                                      <circle cx="216" cy="187.5" r="2.5" fill="#DCC7A1" />
                                      <circle cx="216" cy="202.5" r="2.5" fill="#C8AF7E" />
                                    </g>

                                    {/* Floating Mailbox / Inbox Organiser */}
                                    <g transform="translate(-40, -10)">
                                      <ellipse cx="230" cy="210" rx="35" ry="15" fill="#26231F" opacity="0.08" filter="blur(3px)" />
                                      <path d="M 180 160 L 220 180 L 220 210 L 180 190 Z" fill="url(#contactDarkGrad)" stroke="#26231F" strokeWidth="0.5" />
                                      <path d="M 220 180 L 260 160 L 260 190 L 220 210 Z" fill="url(#contactGlassGrad)" stroke="#E6DED2" strokeWidth="1.5" />
                                      <path d="M 180 160 L 220 140 L 260 160 L 220 180 Z" fill="url(#contactGlassGrad)" stroke="#FFFFFF" strokeWidth="1.5" />

                                      {/* Emerging Envelope */}
                                      <g transform="translate(10, -25)">
                                        <path d="M 195 167.5 L 225 152.5 L 225 177.5 L 195 192.5 Z" fill="url(#contactGoldGrad)" stroke="#C8AF7E" strokeWidth="1" />
                                        <path d="M 195 167.5 L 210 180 L 225 172.5" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
                                      </g>
                                    </g>

                                    {/* Send Arrow / Flying Node */}
                                    <g transform="translate(0, -90)">
                                      <ellipse cx="250" cy="180" rx="20" ry="8" fill="#26231F" opacity="0.06" filter="blur(3px)" />
                                      <path d="M 240 160 L 260 145 L 260 152 L 270 147 L 270 157 L 255 163 L 255 158 Z" fill="url(#contactGoldGrad)" stroke="#C8AF7E" strokeWidth="1" />
                                      <path d="M 240 160 L 255 158 L 260 145 Z" fill="#C8AF7E" opacity="0.3" />
                                      <path d="M 225 195 L 245 165" stroke="#DCC7A1" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.7" />
                                    </g>

                                    {/* Small decorative circles/sparkles */}
                                    <circle cx="150" cy="130" r="3" fill="#DCC7A1" />
                                    <circle cx="330" cy="110" r="4" fill="#C8AF7E" />
                                    <circle cx="320" cy="220" r="2.5" fill="#26231F" opacity="0.4" />
                                  </g>
                                </svg>
                            </div>
                            
                            <div className="contact-details" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
                                <div style={{ marginBottom: '20px' }}>
                                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#dcc7a1', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>Direct Email</span>
                                    <a href="mailto:singhmohit101103@gmail.com" className="editorial-h4" style={{ textDecoration: 'none', color: 'var(--text-heading)' }}>
                                        singhmohit101103@gmail.com
                                    </a>
                                </div>
                                <div style={{ marginBottom: '20px' }}>
                                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--primary-hover)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>Call / WhatsApp</span>
                                    <a href="tel:7303061282" className="editorial-h4" style={{ textDecoration: 'none', color: 'var(--text-heading)' }}>
                                        +91 73030 61282
                                    </a>
                                </div>
                                <div>
                                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--primary-hover)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>Working Hours</span>
                                    <span style={{ fontSize: '16px', color: 'var(--text-body)' }}>
                                        UTC / EST / CET viewports (Global Support)
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right Form Card */}
                        <div className="editorial-form-container">
                            <form onSubmit={handleFormSubmit} className="project-form">
                                <div className="form-group">
                                    <label htmlFor="form-name" className="form-label">Full Name</label>
                                    <input 
                                        type="text" 
                                        id="form-name" 
                                        className="form-input" 
                                        placeholder="John Doe" 
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required 
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="form-email" className="form-label">Work Email</label>
                                    <input 
                                        type="email" 
                                        id="form-email" 
                                        className="form-input" 
                                        placeholder="john@company.com" 
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required 
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="form-group">
                                    <span className="form-label">What do you need help with?</span>
                                    <div className="project-types-grid">
                                        {[
                                            { id: 'web_development', label: 'Website Dev' },
                                            { id: 'mobile_apps', label: 'Mobile App' },
                                            { id: 'uiux_design', label: 'UI/UX Design' },
                                            { id: 'cloud_automation', label: 'Cloud & Automation' },
                                            { id: 'seo_marketing', label: 'SEO & Marketing' },
                                            { id: 'branding', label: 'Branding & Logo' }
                                        ].map((type) => (
                                            <label className="checkpill" key={type.id}>
                                                <input 
                                                    type="checkbox" 
                                                    checked={projectTypes.includes(type.id)}
                                                    onChange={() => handleCheckboxChange(type.id)}
                                                    disabled={isSubmitting}
                                                />
                                                <span>{type.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="form-details" className="form-label">Tell us about your project</label>
                                    <textarea 
                                        id="form-details" 
                                        className="form-textarea" 
                                        placeholder="Describe your brand goals, scope of work, features, or architectural specifications..." 
                                        rows={5} 
                                        value={formData.details}
                                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                                        required 
                                        disabled={isSubmitting}
                                    ></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="form-budget" className="form-label">Estimated Budget</label>
                                    <select 
                                        id="form-budget" 
                                        className="form-select"
                                        value={formData.budget}
                                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                        disabled={isSubmitting}
                                    >
                                        <option value="under_10k">Under $10,000</option>
                                        <option value="10k_25k">$10,000 – $25,000</option>
                                        <option value="25k_50k">$25,000 – $50,000</option>
                                        <option value="above_50k">$50,000+</option>
                                    </select>
                                </div>

                                {formStatus.type !== 'idle' && (
                                    <div className={`form-message ${formStatus.type === 'success' ? 'success' : 'error'}`}>
                                        {formStatus.message}
                                    </div>
                                )}

                                <button 
                                    type="submit" 
                                    className="btn btn-pill btn-primary btn-submit-form" 
                                    style={{ width: '100%', padding: '16px' }}
                                    disabled={isSubmitting}
                                >
                                    <span>{isSubmitting ? 'Submitting Brief...' : 'Send Project Brief'}</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
