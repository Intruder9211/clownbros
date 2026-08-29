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
            title: 'High-Performance Web Platforms',
            desc: 'We engineer ultra-fast custom web applications, SaaS portals, headless eCommerce storefronts, and corporate websites built on Next.js, React, and TypeScript with sub-second page loads.',
            subs: ['Custom Web Applications (Next.js/React)', 'Headless & Custom eCommerce', 'High-Converting Corporate Portals', 'Interactive Web Portfolios', 'RESTful & GraphQL API Integrations', 'Core Web Vitals & Speed Optimization']
        },
        {
            num: '02',
            title: 'Cross-Platform Mobile Apps',
            desc: 'Transform product concepts into native-feeling iOS and Android applications engineered with Flutter and React Native. Includes offline data synchronization, real-time WebSockets, and app store deployment.',
            subs: ['iOS & Android App Development', 'Flutter & React Native Architecture', 'Real-Time Chat & Video WebRTC', 'Secure Payment Gateway Integrations', 'Offline-First Local DB Sync', 'App Store & Play Store Publishing']
        },
        {
            num: '03',
            title: 'UI/UX & Interactive Design Systems',
            desc: 'We craft comprehensive Figma interface systems, clickable prototypes, and conversion-focused user journeys with complete design tokens, accessibility compliance, and developer-ready specs.',
            subs: ['Figma UI/UX Interface Design', 'Interactive Clickable Prototypes', 'Design Systems & Component Kits', 'User Journey & UX Wireframing', 'Conversion Rate Optimization (CRO)', 'WCAG Accessibility Standards']
        },
        {
            num: '04',
            title: 'Cloud Infrastructure & DevOps',
            desc: 'Establish scalable, secure cloud foundations. We deploy automated CI/CD pipelines, containerized Docker clusters, database clustering, and zero-downtime serverless environments on AWS and Vercel.',
            subs: ['AWS & Vercel Cloud Architecture', 'CI/CD Pipeline Automation (GitHub Actions)', 'Docker Containerization & Clusters', 'Database Clustering (PostgreSQL/MongoDB)', 'SSL, CDN & Serverless Edge Caching', '24/7 Uptime & Error Telemetry']
        },
        {
            num: '05',
            title: 'AI & Workflow Automation',
            desc: 'Integrate custom LLM pipelines, autonomous AI agents, and automated business workflows that reduce operational bottlenecks and automate repetitive customer interactions.',
            subs: ['LLM & OpenAI/Claude Integrations', 'Autonomous Workflow Agents', 'Custom Vector Search & RAG Pipelines', 'WhatsApp & CRM Automation', 'Automated Document & Data Ingestion', 'AI Customer Support Agents']
        },
        {
            num: '06',
            title: 'Technical SEO & Digital Growth',
            desc: 'Drive organic search dominance and user acquisition with technical SEO audits, schema architecture, high-converting funnel design, and multi-channel performance marketing.',
            subs: ['Technical & Structural SEO', 'Programmatic SEO & Schema Markup', 'Conversion Funnel Engineering', 'Google & Meta Performance Ads', 'Content Strategy & Editorial Systems', 'Analytics & Attribution Tracking']
        },
        {
            num: '07',
            title: 'Brand Identity & Visual Guidelines',
            desc: 'Craft an authoritative, premium brand identity that commands high market value. We design cohesive visual guidelines, vector logos, brand books, and investor pitch decks.',
            subs: ['Logo & Visual Identity Systems', 'Comprehensive Brand Style Guides', 'Vector Graphics & Custom Iconography', 'Investor Pitch Decks & Presentations', 'Marketing Asset Templates', 'Social Media Identity Kits']
        },
        {
            num: '08',
            title: 'Backend Systems & Custom APIs',
            desc: 'Build secure, low-latency server architectures with Node.js, NestJS, and PostgreSQL. Engineered for high concurrency, enterprise authentication, and seamless third-party integrations.',
            subs: ['Scalable RESTful & GraphQL APIs', 'Microservices & Message Queues (Redis/Kafka)', 'Role-Based Authentication (OAuth/JWT)', 'Enterprise Database Schemas', 'Webhook & Third-Party Integrations', 'Data Encryption & OWASP Security']
        }
    ];

    return (
        <main>
            {/* Services Page Header */}
            <section className="page-hero scroll-reveal" style={{ paddingBottom: '64px' }}>
                <div className="container about-hero-grid">
                    <div className="reveal-left visible">
                        <span className="section-tagline">Capabilities</span>
                        <h1 className="editorial-hero-title" style={{ marginBottom: '24px' }}>
                            Full-Spectrum Digital Engineering
                        </h1>
                        <p style={{ maxWidth: '640px', color: 'var(--text-body)', fontSize: '20px', lineHeight: 1.6 }}>
                            End-to-end digital capabilities combining bespoke UI/UX, robust TypeScript codebases, scalable cloud deployments, and conversion-optimized growth architectures.
                        </p>
                    </div>
                    <div className="reveal-right visible float-element svg-wrap-services-hero">
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
                                    <div className="service-content-grid" style={{ paddingBottom: '40px' }}>
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
                    <div className="section-header flex-header" style={{ marginBottom: '64px' }}>
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
 
                    <div className="tech-grid">
                        {filteredTech.map((tech, i) => (
                            <div 
                                className="tech-card" 
                                key={tech.name} 
                                style={{ 
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
                            { q: "How does ClownBros ensure high quality and zero project risk?", a: "We work in rapid 1-week iterative sprints. You receive private staging preview links and direct GitHub repository access from Day 1. Payments are milestone-driven — you only approve funds once each deliverable is tested and accepted." },
                            { q: "Who owns the source code and designs after launch?", a: "You own 100% of all intellectual property, source code, Figma design systems, databases, and cloud resources. Complete legal IP assignment is standard in all of our contracts." },
                            { q: "Do you sign a Mutual NDA before reviewing our project brief?", a: "Absolutely. We routinely sign non-disclosure agreements before reviewing proprietary specifications, database schemas, or business workflows. Your intellectual property and concept are completely confidential." },
                            { q: "How does pricing and timeline scoping work?", a: "Following our initial technical discovery call, we deliver a comprehensive architectural roadmap with fixed-scope pricing and milestone deadlines. There are no hidden fees or unexpected billable hours." },
                            { q: "What post-launch warranty and support do you provide?", a: "Every production release includes a 30-day bug warranty where any issues are resolved free of charge. We also provide direct Slack and WhatsApp technical support channels and ongoing cloud SLA maintenance." }
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
