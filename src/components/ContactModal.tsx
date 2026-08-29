'use client';

import React, { useState } from 'react';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        details: ''
    });
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

    // Disable background scrolling when modal is open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            document.documentElement.classList.add('lenis-stopped');
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            document.documentElement.classList.remove('lenis-stopped');
        }
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            document.documentElement.classList.remove('lenis-stopped');
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const availableServices = [
        'Web & Web3 App',
        'Mobile App (iOS/Android)',
        'UI/UX Design',
        'Cloud & DevOps',
        'AI & ML Solutions',
        'SEO & Growth'
    ];

    const toggleService = (service: string) => {
        setSelectedServices(prev =>
            prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        const { name, email, phone, details } = formData;
        const servicesStr = selectedServices.length > 0 ? selectedServices.join(', ') : 'General Inquiry';

        const subject = encodeURIComponent(`Project Brief from ${name}`);
        const body = encodeURIComponent(
            `Name: ${name}\n` +
            `Client Email: ${email}\n` +
            `Phone: ${phone || 'Not provided'}\n` +
            `Requested Services: ${servicesStr}\n\n` +
            `Project Details:\n${details}`
        );
        const mailtoUrl = `mailto:singhmohit101103@gmail.com?subject=${subject}&body=${body}`;

        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus({
                success: true,
                message: 'Thank you for reaching out! We received your brief and will contact you within 24 hours.'
            });
            window.location.href = mailtoUrl;
            setFormData({ name: '', email: '', phone: '', details: '' });
            setSelectedServices([]);
        }, 1000);
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-card" data-lenis-prevent onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
                <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
                    ✕
                </button>

                <div style={{ marginBottom: '20px' }}>
                    <span className="career-badge" style={{ marginBottom: '8px' }}>🚀 Complimentary Technical Discovery</span>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', color: 'var(--text-heading)', fontWeight: 600 }}>
                        Schedule a Free Architecture Session
                    </h2>
                    <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px' }}>
                        Tell us about your product or feature requirements. Our senior technical leads provide an architectural spec and fixed-budget roadmap within 24 hours.
                    </p>
                </div>

                {submitStatus?.success ? (
                    <div style={{ background: 'rgba(74, 143, 99, 0.15)', border: '1px solid #4A8F63', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
                        <div style={{ fontSize: '32px', marginBottom: '10px' }}>🎉</div>
                        <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '6px' }}>Project Brief Received!</h3>
                        <p style={{ fontSize: '14px', color: 'var(--text-body)', lineHeight: 1.5 }}>
                            {submitStatus.message}
                        </p>
                        <button onClick={onClose} className="btn btn-primary" style={{ marginTop: '18px', padding: '10px 24px', borderRadius: '8px' }}>
                            Close Window
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <div>
                            <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)', display: 'block', marginBottom: '6px' }}>What services do you need?</label>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {availableServices.map((service) => {
                                    const isSelected = selectedServices.includes(service);
                                    return (
                                        <button
                                            type="button"
                                            key={service}
                                            onClick={() => toggleService(service)}
                                            style={{
                                                padding: '6px 12px',
                                                borderRadius: '20px',
                                                fontSize: '12px',
                                                border: '1px solid',
                                                borderColor: isSelected ? 'var(--dark-section)' : 'var(--border-color)',
                                                background: isSelected ? 'var(--dark-section)' : '#FFFFFF',
                                                color: isSelected ? '#FFFFFF' : 'var(--text-body)',
                                                cursor: 'pointer',
                                                transition: 'all 0.15s ease'
                                            }}
                                        >
                                            {isSelected ? `✓ ${service}` : `+ ${service}`}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                            <div>
                                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)', display: 'block', marginBottom: '4px' }}>Full Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Your Name"
                                    style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '14px' }}
                                />
                            </div>
                            <div>
                                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)', display: 'block', marginBottom: '4px' }}>Work Email *</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="you@company.com"
                                    style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '14px' }}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)', display: 'block', marginBottom: '4px' }}>Phone / WhatsApp Number</label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="+1 (555) 000-0000"
                                style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '14px' }}
                            />
                        </div>

                        <div>
                            <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)', display: 'block', marginBottom: '4px' }}>Project Details & Timeline</label>
                            <textarea
                                rows={3}
                                required
                                value={formData.details}
                                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                                placeholder="Describe your project goals, key features, or expected launch timeline..."
                                style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit' }}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', fontSize: '15px', marginTop: '4px' }}
                        >
                            {isSubmitting ? 'Submitting Brief...' : 'Send Project Brief'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
