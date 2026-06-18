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

        setTimeout(() => {
            setIsSubmitting(false);
            setFormStatus({
                type: 'success',
                message: 'Your project brief was submitted successfully. Our lead developer will review details and email you in 24 hours.'
            });
            setFormData({ name: '', email: '', details: '', budget: '10k_25k' });
            setProjectTypes([]);
        }, 1500);
    };

    return (
        <main style={{ paddingTop: '120px' }}>
            {/* Contact Section */}
            <section className="scroll-reveal" style={{ paddingBottom: '96px' }}>
                <div className="container">
                    <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: '64px' }}>
                        {/* Left Info Panel */}
                        <div className="contact-info reveal-left visible" style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignSelf: 'start' }}>
                            <span className="section-tagline">Onboarding</span>
                            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '52px', fontWeight: 500, lineHeight: 1.15, color: 'var(--text-heading)' }}>
                                Have an idea? <br />
                                <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Let&apos;s make impact.</span>
                            </h1>
                            <p style={{ color: 'var(--text-body)', fontSize: '18px', lineHeight: 1.6 }}>
                                Tell us about your project or growth goals. Our engineering team reviews all briefs within 24 hours to map features, structure timelines, and propose design scopes.
                            </p>

                            {/* Contact Visual Asset */}
                            <div className="zoom-on-hover" style={{ width: '100%', height: '240px', borderRadius: 'var(--radius-image)', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-soft)', margin: '16px 0' }}>
                                <img 
                                    src="/clownbros_contact.png" 
                                    alt="ClownBros Minimalist Workspace Detail" 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            
                            <div className="contact-details" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
                                <div style={{ marginBottom: '24px' }}>
                                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--primary-hover)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>Direct Email</span>
                                    <a href="mailto:hello@clownbros.com" style={{ fontSize: '20px', fontWeight: 500, color: 'var(--text-heading)', textDecoration: 'none' }}>
                                        hello@clownbros.com
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
