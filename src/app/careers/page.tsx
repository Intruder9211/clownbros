'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Gig {
    id: string;
    title: string;
    category: string;
    type: string; // e.g. "Contract / 15-30 hrs/wk", "Project Retainer"
    rate: string; // e.g. "₹300 - ₹550 / hr"
    location: string;
    skills: string[];
    description: string;
    featured?: boolean;
}

const GIGS: Gig[] = [
    {
        id: 'gig-1',
        title: 'Junior Next.js & React Developer',
        category: 'Frontend',
        type: 'Contract / 15-30 hrs/wk',
        rate: '₹300 - ₹550 / hr',
        location: 'Remote (India)',
        skills: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Web Vitals'],
        description: 'Building modern, high-performance web app frontends and landing pages for client startups.',
        featured: true
    },
    {
        id: 'gig-2',
        title: 'Fresher Flutter Mobile Specialist',
        category: 'Mobile',
        type: 'Project Retainer',
        rate: '₹250 - ₹500 / hr',
        location: 'Remote (India)',
        skills: ['Flutter', 'Dart', 'Firebase', 'REST APIs', 'App Store Setup'],
        description: 'Assist in developing cross-platform iOS and Android mobile applications with clean UI and API integration.',
        featured: true
    },
    {
        id: 'gig-3',
        title: 'Junior Fullstack Node.js & DB Developer',
        category: 'Backend',
        type: 'Freelance Contract',
        rate: '₹300 - ₹600 / hr',
        location: 'Remote (India)',
        skills: ['Node.js', 'PostgreSQL', 'Prisma', 'REST APIs', 'Express'],
        description: 'Architecting RESTful microservices, backend APIs, and real-time database models for web apps.',
        featured: false
    },
    {
        id: 'gig-4',
        title: 'Fresher UI/UX Product Designer (Figma)',
        category: 'Design',
        type: 'Flex Contract (15-25 hrs/wk)',
        rate: '₹250 - ₹450 / hr',
        location: 'Remote (India)',
        skills: ['Figma', 'Wireframing', 'UI Components', 'Prototyping', 'Design Systems'],
        description: 'Design intuitive editorial web layouts, mobile app screens, and interactive visual component libraries.',
        featured: true
    },
    {
        id: 'gig-5',
        title: 'AI & LLM Integration Developer (Fresher)',
        category: 'AI/ML',
        type: 'Project-based Contract',
        rate: '₹350 - ₹700 / hr',
        location: 'Remote (India)',
        skills: ['OpenAI API', 'LangChain', 'Python', 'Vector DBs', 'Prompt Engineering'],
        description: 'Build intelligent LLM autonomous agents, vector search pipelines, and AI workflow tools for clients.',
        featured: false
    },
    {
        id: 'gig-6',
        title: 'Junior Cloud DevOps Specialist',
        category: 'DevOps',
        type: 'Hourly On-Call Contract',
        rate: '₹350 - ₹650 / hr',
        location: 'Remote (India)',
        skills: ['AWS', 'Docker', 'Linux', 'Terraform', 'CI/CD Pipelines'],
        description: 'Automate deployment pipelines, server monitoring, and Docker containerization for production systems.',
        featured: false
    }
];

export default function CareersPage() {
    const [activeFilter, setActiveFilter] = useState('All');
    const [selectedGig, setSelectedGig] = useState<Gig | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Disable background scrolling when modal is open
    React.useEffect(() => {
        if (isModalOpen) {
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
    }, [isModalOpen]);

    // Form state
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        portfolio: '',
        track: 'Frontend Development',
        experience: '0-2 years (Fresher)',
        hourlyRate: '₹300 - ₹500 / hr',
        availability: '20-30 hours/week',
        pitch: ''
    });
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);

    const categories = ['All', 'Frontend', 'Mobile', 'Backend', 'Design', 'AI/ML', 'DevOps'];
    const availableSkillTags = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Flutter', 'Figma', 'Python', 'AWS', 'GraphQL', 'Docker', 'Tailwind', 'PostgreSQL'];

    const filteredGigs = activeFilter === 'All' 
        ? GIGS 
        : GIGS.filter(g => g.category.toLowerCase() === activeFilter.toLowerCase());

    const openApplyModal = (gig?: Gig) => {
        if (gig) {
            setSelectedGig(gig);
            setFormData(prev => ({ ...prev, track: gig.title }));
        } else {
            setSelectedGig(null);
        }
        setIsModalOpen(true);
        setSubmitResult(null);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const toggleSkill = (skill: string) => {
        setSelectedSkills(prev => 
            prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitResult(null);

        try {
            const res = await fetch('/api/careers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    selectedSkills
                })
            });
            const data = await res.json();
            if (data.success) {
                setSubmitResult({ success: true, message: data.message });
                setFormData({
                    fullName: '',
                    email: '',
                    portfolio: '',
                    track: 'Frontend Development',
                    experience: '0-2 years (Fresher)',
                    hourlyRate: '₹300 - ₹500 / hr',
                    availability: '20-30 hours/week',
                    pitch: ''
                });
                setSelectedSkills([]);
            } else {
                setSubmitResult({ success: false, message: data.error || 'Submission failed.' });
            }
        } catch (err) {
            setSubmitResult({ success: false, message: 'Network error. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="careers-page">
            {/* Hero Section */}
            <section style={{ padding: '120px 0 80px', backgroundColor: 'var(--background-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                <div className="container">
                    <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
                        <div className="career-badge" style={{ marginBottom: '20px' }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4A8F63' }}></span>
                            India Freelance & Fresher Talent Network
                        </div>
                        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 600, color: 'var(--text-heading)', lineHeight: 1.15, marginBottom: '24px' }}>
                            Kickstart Your Freelance Career in India. <br />
                            <span style={{ fontStyle: 'italic', color: 'var(--primary-hover)' }}>At Fair Market Rates in ₹.</span>
                        </h1>
                        <p style={{ fontSize: '20px', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '36px' }}>
                            We partner with ambitious fresher and entry-level Indian freelance developers, UI/UX designers, and AI engineers. Build real-world client projects with guaranteed weekly payouts in Rupees (₹), 100% remote autonomy, and structured mentorship.
                        </p>
                        
                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <a href="#gigs" className="btn btn-primary" style={{ padding: '14px 32px', borderRadius: '10px' }}>
                                Explore Open Gigs (₹)
                            </a>
                            <button onClick={() => openApplyModal()} className="btn btn-secondary" style={{ padding: '14px 32px', borderRadius: '10px', background: '#FFFFFF', border: '1px solid var(--border-color)' }}>
                                Join Talent Network
                            </button>
                        </div>
                    </div>

                    {/* Stats Highlights */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginTop: '64px', paddingTop: '40px', borderTop: '1px solid var(--border-color)' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '42px', fontWeight: 700, color: 'var(--text-heading)' }}>₹50L+</div>
                            <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Paid to Indian Freelancers Annually</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '42px', fontWeight: 700, color: 'var(--text-heading)' }}>100%</div>
                            <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Remote Autonomy & Flexibility</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '42px', fontWeight: 700, color: 'var(--text-heading)' }}>Weekly (₹)</div>
                            <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Guaranteed Direct Bank Payouts</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '42px', fontWeight: 700, color: 'var(--text-heading)' }}>Fresher</div>
                            <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Curated Growth & Mentorship</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Freelance With Us */}
            <section style={{ padding: '90px 0', backgroundColor: 'var(--background)' }}>
                <div className="container">
                    <div className="section-header" style={{ marginBottom: '50px', textAlign: 'center' }}>
                        <span className="subtitle">THE FREELANCER ADVANTAGE</span>
                        <h2 className="title">Why Top Engineers & Designers Partner With ClownBros</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                        <div className="value-card" style={{ padding: '32px', background: '#FFFFFF', borderRadius: '18px', border: '1px solid var(--border-color)' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(220, 199, 161, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: 'var(--dark-section)' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                            </div>
                            <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '12px' }}>Guaranteed Weekly Payouts (₹)</h3>
                            <p style={{ fontSize: '15px', color: 'var(--text-body)', lineHeight: 1.6 }}>
                                No chasing client invoices. ClownBros handles client invoicing and guarantees your payout every Friday directly via UPI, IMPS, or Direct Bank Transfer in Rupees (₹).
                            </p>
                        </div>

                        <div className="value-card" style={{ padding: '32px', background: '#FFFFFF', borderRadius: '18px', border: '1px solid var(--border-color)' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(220, 199, 161, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: 'var(--dark-section)' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            </div>
                            <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '12px' }}>High-Impact Projects</h3>
                            <p style={{ fontSize: '15px', color: 'var(--text-body)', lineHeight: 1.6 }}>
                                Work on modern, clean codebases with modern tech stacks (Next.js 15, React 19, Flutter, AI agents) rather than maintaining legacy spaghetti code.
                            </p>
                        </div>

                        <div className="value-card" style={{ padding: '32px', background: '#FFFFFF', borderRadius: '18px', border: '1px solid var(--border-color)' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(220, 199, 161, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: 'var(--dark-section)' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            </div>
                            <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '12px' }}>Zero Micromanagement</h3>
                            <p style={{ fontSize: '15px', color: 'var(--text-body)', lineHeight: 1.6 }}>
                                We partner with ambitious freshers & developers and get out of their way. Set your own hours, focus on code quality, and work asynchronously.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filterable Gigs Directory */}
            <section id="gigs" style={{ padding: '90px 0', backgroundColor: 'var(--background-secondary)', borderTop: '1px solid var(--border-color)' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '40px' }}>
                        <div>
                            <span className="subtitle">OPEN FREELANCE CONTRACTS</span>
                            <h2 className="title">Active Gigs & Project Roles</h2>
                        </div>

                        {/* Filter Tabs */}
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    className={`filter-pill ${activeFilter === cat ? 'active' : ''}`}
                                    onClick={() => setActiveFilter(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Gig List Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
                        {filteredGigs.map((gig) => (
                            <div key={gig.id} className="gig-card">
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                                        <span className="gig-tag">{gig.category}</span>
                                        {gig.featured && (
                                            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: '#D49B34', textTransform: 'uppercase', background: 'rgba(212, 155, 52, 0.15)', padding: '2px 8px', borderRadius: '4px' }}>
                                                HIGH PRIORITY
                                            </span>
                                        )}
                                    </div>
                                    <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '8px' }}>
                                        {gig.title}
                                    </h3>
                                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px', display: 'flex', gap: '12px' }}>
                                        <span>📍 {gig.location}</span>
                                        <span>⏱️ {gig.type}</span>
                                    </div>
                                    <p style={{ fontSize: '14px', color: 'var(--text-body)', lineHeight: 1.5, marginBottom: '20px' }}>
                                        {gig.description}
                                    </p>

                                    {/* Skill pills */}
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
                                        {gig.skills.map(s => (
                                            <span key={s} style={{ fontSize: '12px', background: '#FFFFFF', border: '1px solid var(--border-color)', padding: '3px 8px', borderRadius: '6px', color: 'var(--text-body)' }}>
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-color-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block' }}>ESTIMATED RATE</span>
                                        <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-heading)' }}>{gig.rate}</span>
                                    </div>
                                    <button 
                                        onClick={() => openApplyModal(gig)}
                                        className="btn btn-primary"
                                        style={{ padding: '8px 18px', fontSize: '13px', borderRadius: '6px' }}
                                    >
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Selection Process Timeline */}
            <section style={{ padding: '90px 0', backgroundColor: 'var(--dark-section)', color: '#FFFFFF' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 60px' }}>
                        <span className="subtitle" style={{ color: 'var(--primary)' }}>TRANSPARENT ONBOARDING</span>
                        <h2 className="title" style={{ color: '#FFFFFF' }}>How Our Freelancer Onboarding Works</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '30px', position: 'relative' }}>
                        <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '28px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                            <div className="timeline-step-number" style={{ marginBottom: '16px' }}>1</div>
                            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#FFFFFF', marginBottom: '8px' }}>Quick Application</h3>
                            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.5 }}>
                                Submit your portfolio, GitHub, and primary skills. No tedious 10-page resume required.
                            </p>
                        </div>

                        <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '28px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                            <div className="timeline-step-number" style={{ marginBottom: '16px' }}>2</div>
                            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#FFFFFF', marginBottom: '8px' }}>Portfolio Review</h3>
                            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.5 }}>
                                Our tech leads review your live projects and code quality within 48 hours.
                            </p>
                        </div>

                        <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '28px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                            <div className="timeline-step-number" style={{ marginBottom: '16px' }}>3</div>
                            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#FFFFFF', marginBottom: '8px' }}>Paid Micro-Trial</h3>
                            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.5 }}>
                                Execute a small paid mini-task to evaluate workflow, communication, and speed.
                            </p>
                        </div>

                        <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '28px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                            <div className="timeline-step-number" style={{ marginBottom: '16px' }}>4</div>
                            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#FFFFFF', marginBottom: '8px' }}>Network Onboarding</h3>
                            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.5 }}>
                                Get matched with client projects, receive weekly payouts, and grow your rate over time.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Freelancer Application Modal Form */}
            {isModalOpen && (
                <div className="modal-backdrop" onClick={closeModal}>
                    <div className="modal-card" data-lenis-prevent onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={closeModal} aria-label="Close modal">
                            ✕
                        </button>

                        <div style={{ marginBottom: '24px' }}>
                            <span className="career-badge" style={{ marginBottom: '10px' }}>Direct Talent Application</span>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', color: 'var(--text-heading)', fontWeight: 600 }}>
                                {selectedGig ? `Apply for: ${selectedGig.title}` : 'Join ClownBros Freelancer Network'}
                            </h2>
                            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px' }}>
                                Fill out your details below. We guarantee a response within 48 hours.
                            </p>
                        </div>

                        {submitResult?.success ? (
                            <div style={{ background: 'rgba(74, 143, 99, 0.15)', border: '1px solid #4A8F63', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
                                <div style={{ fontSize: '32px', marginBottom: '12px' }}>🎉</div>
                                <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '8px' }}>Application Submitted!</h3>
                                <p style={{ fontSize: '14px', color: 'var(--text-body)', lineHeight: 1.5 }}>
                                    {submitResult.message}
                                </p>
                                <button onClick={closeModal} className="btn btn-primary" style={{ marginTop: '20px', padding: '10px 24px' }}>
                                    Close Window
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {submitResult?.success === false && (
                                    <div style={{ background: 'rgba(199, 91, 86, 0.15)', border: '1px solid #C75B56', padding: '12px', borderRadius: '8px', fontSize: '13px', color: '#C75B56' }}>
                                        {submitResult.message}
                                    </div>
                                )}

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <div>
                                        <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)', display: 'block', marginBottom: '6px' }}>Full Name *</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            placeholder="e.g. Alex Morgan"
                                            style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '14px' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)', display: 'block', marginBottom: '6px' }}>Email Address *</label>
                                        <input 
                                            type="email" 
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="alex@example.com"
                                            style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '14px' }}
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <div>
                                        <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)', display: 'block', marginBottom: '6px' }}>Portfolio / GitHub URL</label>
                                        <input 
                                            type="url" 
                                            value={formData.portfolio}
                                            onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                                            placeholder="https://github.com/yourusername"
                                            style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '14px' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)', display: 'block', marginBottom: '6px' }}>Target Hourly Rate</label>
                                        <input 
                                            type="text" 
                                            value={formData.hourlyRate}
                                            onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                                            placeholder="e.g. ₹350/hr"
                                            style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '14px' }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)', display: 'block', marginBottom: '6px' }}>Select Primary Tech Skills</label>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {availableSkillTags.map(tag => {
                                            const isSelected = selectedSkills.includes(tag);
                                            return (
                                                <button
                                                    type="button"
                                                    key={tag}
                                                    onClick={() => toggleSkill(tag)}
                                                    style={{
                                                        padding: '6px 12px',
                                                        borderRadius: '20px',
                                                        fontSize: '12px',
                                                        border: '1px solid',
                                                        borderColor: isSelected ? 'var(--dark-section)' : 'var(--border-color)',
                                                        background: isSelected ? 'var(--dark-section)' : '#FFFFFF',
                                                        color: isSelected ? '#FFFFFF' : 'var(--text-body)',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    {isSelected ? `✓ ${tag}` : `+ ${tag}`}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div>
                                    <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)', display: 'block', marginBottom: '6px' }}>Brief Bio & Top Recent Achievement</label>
                                    <textarea 
                                        rows={3}
                                        value={formData.pitch}
                                        onChange={(e) => setFormData({ ...formData, pitch: e.target.value })}
                                        placeholder="Highlight a project you built or a complex bug you resolved recently..."
                                        style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit' }}
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    className="btn btn-primary"
                                    disabled={isSubmitting}
                                    style={{ width: '100%', padding: '14px', borderRadius: '8px', marginTop: '8px', fontSize: '15px' }}
                                >
                                    {isSubmitting ? 'Submitting Application...' : 'Send Application'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </main>
    );
}
