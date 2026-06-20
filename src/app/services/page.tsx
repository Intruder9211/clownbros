'use client';

import React, { useState } from 'react';

// Full Tech Stack list
const TECH_STACK = [
    { name: "HTML5 & CSS3", category: "frontend", desc: "Semantic page structures combined with modern responsive layout variables." },
    { name: "JavaScript & TypeScript", category: "frontend", desc: "Type-safe logic and interactive layouts utilizing state management patterns." },
    { name: "React.js & Next.js", category: "frontend", desc: "Component-driven UI, server-side rendering, and maximized web core vitals." },
    { name: "Tailwind CSS", category: "frontend", desc: "Rapid layout iterations utilizing a streamlined utility framework." },
    { name: "Node.js & Express", category: "backend", desc: "Scalable network systems, rapid REST APIs, and asynchronous message queues." },
    { name: "NestJS", category: "backend", desc: "Highly structured enterprise architecture for robust server application scalability." },
    { name: "PHP & Laravel", category: "backend", desc: "Sleek monolithic patterns, database migrations, and clean routing structures." },
    { name: "PostgreSQL & MongoDB", category: "cloud", desc: "Secure data persistence matching relational databases or flexible document models." },
    { name: "AWS & Azure", category: "cloud", desc: "Elastic hosting, serverless containers, databases, and assets bucket delivery." },
    { name: "Vercel & Netlify", category: "cloud", desc: "Instant pipeline deployments, global edge networks, and serverless route helpers." },
    { name: "Figma", category: "design", desc: "High-fidelity interface layouts, component design systems, and visual prototypes." },
    { name: "Adobe Creative Suite", category: "design", desc: "Vector illustrations, raw logo creation, layouts, and brand visual guides." }
];

export default function Services() {
    const [activeService, setActiveService] = useState<number | null>(0);
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [activeFilter, setActiveFilter] = useState('all');

    const filteredTech = TECH_STACK.filter(
        (tech) => activeFilter === 'all' || tech.category === activeFilter
    );

    const servicesList = [
        {
            num: '01',
            title: 'Website Development',
            desc: 'We build ultra-fast, premium custom corporate websites, interactive landing pages, portfolio sites, and high-conversion e-commerce storefronts tailored to business expansion plans.',
            subs: ['Custom Business Websites', 'Corporate Websites', 'Landing Pages', 'Portfolio Websites', 'Ecommerce Websites', 'WordPress & Headless CMS', 'React.js & Next.js Builds']
        },
        {
            num: '02',
            title: 'Mobile App Development',
            desc: 'Transform your product ideas into native Android, iOS, or high-performance cross-platform software. We engineer scalable SaaS and mobile commerce experiences.',
            subs: ['Android Applications', 'iOS Applications', 'Cross Platform Apps', 'Flutter Apps', 'React Native Apps', 'Business Applications', 'SaaS Applications']
        },
        {
            num: '03',
            title: 'UI/UX Design',
            desc: 'We construct comprehensive, custom-coded web and application interfaces that prioritize clean navigation, responsive grids, user research, and comprehensive design systems.',
            subs: ['Website UI Design', 'Mobile App UI Design', 'Dashboard Design', 'Wireframing', 'Prototyping', 'Design Systems', 'User Experience Research']
        },
        {
            num: '04',
            title: 'Digital Marketing',
            desc: 'We drive user acquisition via technical SEO, performance marketing (Google & Meta Ads), custom landing-page funnels, and CRM automation tools.',
            subs: ['SEO & Local SEO', 'Technical SEO', 'Content Marketing', 'Google Ads & Meta Ads', 'Performance Marketing', 'Email Marketing', 'Lead Generation']
        },
        {
            num: '05',
            title: 'Branding',
            desc: 'Formulate a premium visual brand identity that commands premium pricing. We construct guidelines, logos, and presentation systems.',
            subs: ['Logo Design', 'Brand Identity', 'Visual Guidelines', 'Social Media Branding', 'Business Presentations', 'Corporate Identity']
        },
        {
            num: '06',
            title: 'Social Media Management',
            desc: 'Scale online reach and nurture organic pipelines through targeted social strategies, content curation, and reels templates.',
            subs: ['Instagram Growth', 'Facebook Marketing', 'LinkedIn Marketing', 'YouTube Marketing', 'Content Planning', 'Reels Strategy', 'Creative Design']
        },
        {
            num: '07',
            title: 'Sales & Business Growth',
            desc: 'Architect sales funnels, connect custom CRMs, and configure AI chatbots to nurture leads and convert audiences automatically.',
            subs: ['Sales Funnel Creation', 'CRM Integration', 'Marketing Automation', 'WhatsApp Automation', 'AI Chatbots', 'Lead Nurturing', 'Conversion Optimization']
        },
        {
            num: '08',
            title: 'Cloud & Automation',
            desc: 'Establish database security, host serverless applications, build APIs, and construct automated release hooks.',
            subs: ['API Development', 'Backend Systems', 'Cloud Deployment (AWS/Azure/GCP)', 'VPS Management', 'CI/CD Pipelines', 'Business Automation']
        }
    ];

    return (
        <main style={{ paddingTop: '120px' }}>
            {/* Services Page Header */}
            <section className="scroll-reveal" style={{ paddingBottom: '64px' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '64px', alignItems: 'center' }}>
                    <div className="reveal-left visible">
                        <span className="section-tagline">Capabilities</span>
                        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '52px', fontWeight: 500, lineHeight: 1.2, marginBottom: '24px' }}>
                            What We Do
                        </h1>
                        <p style={{ maxWidth: '640px', color: 'var(--text-body)', fontSize: '20px', lineHeight: 1.6 }}>
                            End-to-end digital frameworks combining design excellence, robust code, cloud scalability, and business growth engines under one roof.
                        </p>
                    </div>
                    <div className="reveal-right visible float-element" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '320px', position: 'relative' }}>
                        <svg viewBox="0 0 500 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '100%', maxHeight: '100%' }}>
                          <defs>
                            <linearGradient id="servicesGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                              <stop offset="60%" stopColor="#DCC7A1" stopOpacity="0.85" />
                              <stop offset="100%" stopColor="#C8AF7E" stopOpacity="0.95" />
                            </linearGradient>
                            <linearGradient id="servicesGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                              <stop offset="100%" stopColor="#F3EEE5" stopOpacity="0.25" />
                            </linearGradient>
                            <linearGradient id="servicesDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#3A3631" />
                              <stop offset="100%" stopColor="#26231F" />
                            </linearGradient>
                            <radialGradient id="servicesGlow" cx="50%" cy="50%" r="50%">
                              <stop offset="0%" stopColor="#DCC7A1" stopOpacity="0.5" />
                              <stop offset="100%" stopColor="#DCC7A1" stopOpacity="0" />
                            </radialGradient>
                          </defs>

                          {/* Ground shadow */}
                          <ellipse cx="250" cy="310" rx="130" ry="25" fill="#26231F" opacity="0.05" filter="blur(8px)" />

                          <g>
                            {/* Floating base disc */}
                            <ellipse cx="250" cy="220" rx="140" ry="70" fill="url(#servicesGlassGrad)" stroke="#E6DED2" strokeWidth="1.5" opacity="0.75" />
                            <ellipse cx="250" cy="220" rx="110" ry="55" fill="none" stroke="#DCC7A1" strokeWidth="1" strokeDasharray="6,4" opacity="0.6" />

                            {/* Center 3D Cylinder / Cloud Core */}
                            <g transform="translate(0, -10)">
                              <ellipse cx="250" cy="220" rx="30" ry="15" fill="#26231F" opacity="0.1" />
                              <path d="M 220 190 A 30 15 0 0 0 280 190 L 280 215 A 30 15 0 0 1 220 215 Z" fill="#E6DED2" />
                              <ellipse cx="250" cy="190" rx="30" ry="15" fill="url(#servicesGlassGrad)" stroke="#E6DED2" strokeWidth="1" />
                              <line x1="250" y1="175" x2="250" y2="190" stroke="#DCC7A1" strokeWidth="2" />
                              <path d="M 220 150 A 30 15 0 0 0 280 150 L 280 175 A 30 15 0 0 1 220 175 Z" fill="url(#servicesDarkGrad)" />
                              <ellipse cx="250" cy="150" rx="30" ry="15" fill="url(#servicesGoldGrad)" stroke="#C8AF7E" strokeWidth="1.5" />
                              <circle cx="250" cy="150" r="4" fill="#FFFFFF" />
                              <circle cx="250" cy="150" r="10" fill="url(#servicesGlow)" />
                            </g>

                            {/* Web Platform Screen (Left) */}
                            <g transform="translate(-100, -30)">
                              <ellipse cx="250" cy="220" rx="20" ry="10" fill="#26231F" opacity="0.05" filter="blur(2px)" />
                              <path d="M 220 170 L 260 150 L 260 195 L 220 215 Z" fill="url(#servicesGlassGrad)" stroke="#DCC7A1" strokeWidth="1.5" />
                              <path d="M 220 170 L 260 150 L 260 160 L 220 180 Z" fill="#E6DED2" />
                              <circle cx="228" cy="173" r="1.5" fill="#C75B56" />
                              <circle cx="233" cy="170.5" r="1.5" fill="#D49B34" />
                              <circle cx="238" cy="168" r="1.5" fill="#4A8F63" />
                              <line x1="228" y1="184" x2="252" y2="172" stroke="#DCC7A1" strokeWidth="2" />
                              <line x1="228" y1="194" x2="245" y2="185.5" stroke="#C8AF7E" strokeWidth="1.5" />
                              <line x1="228" y1="204" x2="252" y2="192" stroke="#26231F" strokeWidth="1" opacity="0.4" />
                            </g>

                            {/* Mobile UI Screen (Right/Front) */}
                            <g transform="translate(80, 0)">
                              <ellipse cx="250" cy="220" rx="15" ry="8" fill="#26231F" opacity="0.05" filter="blur(2px)" />
                              <path d="M 235 180 L 260 192.5 L 260 235 L 235 222.5 Z" fill="url(#servicesDarkGrad)" stroke="#E6DED2" strokeWidth="1" />
                              <path d="M 237 183 L 258 193.5 L 258 231 L 237 220.5 Z" fill="url(#servicesGlassGrad)" stroke="#FFFFFF" strokeWidth="0.75" />
                              <path d="M 243 194 L 252 198.5 L 252 210 L 243 205.5 Z" fill="url(#servicesGoldGrad)" opacity="0.8" />
                              <circle cx="248.5" cy="220" r="2" fill="#DCC7A1" />
                            </g>

                            {/* Marketing/Growth Node (Back/Right) */}
                            <g transform="translate(60, -80)">
                              <ellipse cx="250" cy="220" rx="15" ry="8" fill="#26231F" opacity="0.05" filter="blur(2px)" />
                              <path d="M 245 220 L 245 190 L 235 190 L 250 170 L 265 190 L 255 190 L 255 220 Z" fill="url(#servicesGoldGrad)" stroke="#C8AF7E" strokeWidth="1" />
                              <path d="M 245 220 L 245 190 L 235 190 L 250 170 Z" fill="#C8AF7E" opacity="0.3" />
                            </g>

                            {/* Connection lines */}
                            <path d="M 220 200 L 170 190" stroke="#DCC7A1" strokeWidth="1.5" strokeDasharray="3,3" />
                            <path d="M 270 210 L 315 210" stroke="#DCC7A1" strokeWidth="1.5" strokeDasharray="3,3" />
                            <path d="M 265 180 L 300 150" stroke="#DCC7A1" strokeWidth="1.5" strokeDasharray="3,3" />

                            {/* Floating Sparkles / Spheres */}
                            <circle cx="160" cy="140" r="3" fill="#DCC7A1" />
                            <circle cx="340" cy="250" r="4" fill="#C8AF7E" />
                            <circle cx="320" cy="120" r="3" fill="#26231F" opacity="0.3" />
                            <circle cx="180" cy="260" r="5" fill="url(#servicesGlassGrad)" stroke="#DCC7A1" strokeWidth="1" />
                          </g>
                        </svg>
                    </div>
                </div>
            </section>

            {/* Service Accordions list */}
            <section className="secondary-bg scroll-reveal" style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '96px 0' }}>
                <div className="container">
                    <div className="services-wrapper" style={{ borderTop: '1px solid var(--border-color)' }}>
                        {servicesList.map((service, idx) => (
                            <div 
                                className={`service-accordion-item ${activeService === idx ? 'active' : ''}`} 
                                key={idx}
                                style={{ borderBottom: '1px solid var(--border-color)' }}
                            >
                                <div 
                                    className="service-header" 
                                    onClick={() => setActiveService(activeService === idx ? null : idx)}
                                    style={{
                                        padding: '32px 0',
                                        display: 'grid',
                                        gridTemplateColumns: '80px 1fr auto',
                                        alignItems: 'center',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <span className="service-num" style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-muted)' }}>{service.num}</span>
                                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 500 }}>{service.title}</h3>
                                     <span className="service-arrow" style={{
                                         width: '40px',
                                         height: '40px',
                                         borderRadius: '50%',
                                         border: '1px solid var(--border-color)',
                                         display: 'flex',
                                         alignItems: 'center',
                                         justifyContent: 'center',
                                         transform: activeService === idx ? 'rotate(45deg)' : 'none',
                                         backgroundColor: activeService === idx ? 'var(--primary)' : 'transparent',
                                         color: activeService === idx ? '#222222' : 'inherit',
                                         transition: 'var(--transition-editorial)'
                                     }}>
                                        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                                    </span>
                                </div>
                                <div 
                                    className="service-body" 
                                    style={{ 
                                        maxHeight: activeService === idx ? '800px' : '0',
                                        overflow: 'hidden',
                                        transition: 'max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                                    }}
                                >
                                    <div className="service-content-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '48px', paddingBottom: '40px', paddingLeft: '80px' }}>
                                        <div className="service-left">
                                            <p style={{ fontSize: '18px', color: 'var(--text-body)', lineHeight: 1.7 }}>
                                                {service.desc}
                                            </p>
                                        </div>
                                        <div className="service-right">
                                            <ul className="sub-services-list" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                {service.subs.map((sub, sIdx) => (
                                                    <li key={sIdx} style={{ fontSize: '15px', color: 'var(--text-heading)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--primary)' }}></span>
                                                        {sub}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Stack Section */}
            <section className="scroll-reveal" id="tech-stack" style={{ padding: '96px 0' }}>
                <div className="container">
                    <div className="section-header flex-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '32px', marginBottom: '64px' }}>
                        <div>
                            <span className="section-tagline">Technologies</span>
                            <h2 className="section-title" style={{ margin: 0 }}>Our Development Stack</h2>
                        </div>
                        
                        <div className="stack-filters" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {['all', 'frontend', 'backend', 'cloud', 'design'].map((filter) => (
                                <button
                                    key={filter}
                                    className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                                    onClick={() => setActiveFilter(filter)}
                                >
                                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="tech-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                        {filteredTech.map((tech, i) => (
                            <div 
                                className="tech-card" 
                                key={tech.name} 
                                style={{ 
                                    backgroundColor: '#FFFFFF', 
                                    border: '1px solid var(--border-color)', 
                                    borderRadius: 'var(--radius-card)', 
                                    padding: '32px', 
                                    boxShadow: 'var(--shadow-soft)',
                                    transition: 'var(--transition-editorial)',
                                    transitionDelay: `${(i % 3) * 0.1}s`
                                }}
                            >
                                <div className="tech-meta" style={{ display: 'flex', marginBottom: '16px' }}>
                                    <span className="tech-category" style={{ fontSize: '11px', fontWeight: 600, color: 'var(--primary-hover)', textTransform: 'uppercase', letterSpacing: '0.05em', backgroundColor: 'var(--background-secondary)', padding: '4px 10px', borderRadius: '4px' }}>{tech.category}</span>
                                </div>
                                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 500, marginBottom: '8px' }}>{tech.name}</h3>
                                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{tech.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQs Section */}
            <section className="secondary-bg scroll-reveal" id="faqs" style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '96px 0' }}>
                <div className="container">
                    <div className="section-header" style={{ marginBottom: '64px', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
                        <span className="section-tagline">Support</span>
                        <h2 className="section-title">Common Questions</h2>
                    </div>

                    <div className="faqs-wrapper" style={{ borderTop: '1px solid var(--border-color)', maxWidth: '800px', margin: '0 auto' }}>
                        {[
                            { q: "What does ClownBros do exactly?", a: "We are an end-to-end digital partner. We help startups and enterprises build and scale their presence through UI/UX design, custom web and mobile development, CRM setups, cloud architectures, and search engine optimization (SEO)." },
                            { q: "Do you work with startups, or just large enterprises?", a: "We work with both! Our target audience spans growing startups, medium businesses, SaaS brands, and large corporate enterprises. We customize our development and features based on your specific requirements and scaling stage." },
                            { q: "What technologies do you specialize in?", a: "Our standard stack includes HTML5, CSS3, JavaScript, TypeScript, React.js, Next.js, and Tailwind CSS for frontend. On the backend, we run Node.js/Express, NestJS, and PHP/Laravel, connected to PostgreSQL, MongoDB, or Cloud Firestore, hosted on AWS, Vercel, or Azure." },
                            { q: "How does pricing and project delivery work?", a: "We value complete transparency. After our initial consultation, we outline a fixed scope, project budget, and milestones. Payments are tied directly to review stages, ensuring you sign off on every feature before the next block begins." },
                            { q: "Do you offer post-launch support?", a: "Absolutely. We don't just build and hand over code — we aim to be your long-term technology partner. We offer dedicated hosting maintenance, analytics tracking, ongoing SEO optimization, and feature iterations post-launch." }
                        ].map((faq, i) => (
                            <div 
                                className={`faq-item ${activeFaq === i ? 'active' : ''}`} 
                                key={i}
                                style={{ borderBottom: '1px solid var(--border-color)', transition: 'var(--transition-editorial)' }}
                            >
                                <button 
                                    className="faq-header" 
                                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                                    aria-expanded={activeFaq === i}
                                    style={{
                                        width: '100%',
                                        background: 'transparent',
                                        border: 'none',
                                        textAlign: 'left',
                                        padding: '24px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        color: activeFaq === i ? 'var(--text-heading)' : 'inherit',
                                        fontFamily: 'var(--font-body)',
                                        fontWeight: 600
                                    }}
                                >
                                    <span className="faq-question" style={{ fontSize: '18px' }}>{faq.q}</span>
                                    <span className="faq-icon" style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        transform: activeFaq === i ? 'rotate(45deg)' : 'none',
                                        transition: 'var(--transition-editorial)',
                                        color: activeFaq === i ? 'var(--primary)' : 'inherit'
                                    }}>
                                        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                    </span>
                                </button>
                                <div 
                                    className="faq-body" 
                                    style={{ 
                                        maxHeight: activeFaq === i ? '500px' : '0',
                                        overflow: 'hidden',
                                        padding: '0 24px',
                                        transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                                    }}
                                >
                                    <p className="faq-answer" style={{ paddingBottom: '24px', fontSize: '16px', color: 'var(--text-body)', lineHeight: 1.6 }}>{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
