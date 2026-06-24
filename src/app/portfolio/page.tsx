'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, X, ArrowRight, CheckCircle, Info } from 'lucide-react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

const Hero3D = dynamic(() => import('@/components/Hero3D'), { ssr: false });

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Project {
  id: string;
  title: string;
  url: string;
  category: 'websites' | 'webapps' | 'logistics';
  tagline: string;
  brief: string;
  challenge: string;
  solution: string;
  metrics: { label: string; value: string }[];
  techStack: string[];
  svgColor: string;
}

const PROJECTS_DATA: Project[] = [
  {
    id: 'space-artisans',
    title: 'Space Artisans Design Studio',
    url: 'https://spaceartisansdesignstudio.in/',
    category: 'websites',
    tagline: 'Luxury Interior & Architectural Showcase',
    brief: 'A visually rich digital portfolio built for a high-end interior architecture firm, emphasizing high-fidelity gallery overlays, fluid transitions, and a clean structural aesthetic.',
    challenge: 'High-resolution image portfolios often drag page speeds down, hurting search engine rankings and desktop rendering scores.',
    solution: 'We engineered a Next.js framework using optimized image pipelines, fluid page-transitions with cubic-bezier delays, and direct client consultation scheduling dashboards.',
    metrics: [
      { label: 'Core Vitals', value: '98/100' },
      { label: 'Asset Load Time', value: '< 0.3s' },
      { label: 'Client Inquiries', value: '+45%' }
    ],
    techStack: ['wordpress', 'elementor', 'custom design', 'js', 'css', 'framer-motion'],
    svgColor: '#DCC7A1'
  },
  {
    id: 'movers-vaughan',
    title: 'Movers Vaughan',
    url: 'http://moversvaughan.ca/',
    category: 'logistics',
    tagline: 'Automated Local Moving Quoting Platform',
    brief: 'A localized logistics brochure and lead generation machine, featuring an automated estimation calculator and SMS scheduling pipelines.',
    challenge: 'Manual phone and email inquiries for relocation pricing consumed massive office support overhead, resulting in slower turnaround times.',
    solution: 'We implemented an interactive distance and weight estimation system connected to Google Maps API, sending instant price estimates via Twilio SMS and logging inquiries directly to their CRM.',
    metrics: [
      { label: 'Local Google SEO', value: 'Top 3 Rank' },
      { label: 'Automated Quotes', value: '100% Logged' },
      { label: 'Lead Conversions', value: '+32%' }
    ],
    techStack: ['wordpress', 'elementor', 'custom design', 'js', 'css', 'framer-motion'],
    svgColor: '#C8AF7E'
  },
  {
    id: 'ricliso',
    title: 'Ricliso ISO Certification Portal',
    url: 'https://ricliso.org/',
    category: 'webapps',
    tagline: 'Enterprise ISO Verification & Appraising Platform',
    brief: 'A highly secure, audited corporate database and registration hub for Royal Impact Certification Ltd., supporting online ISO database lookups.',
    challenge: 'Falsified corporate compliance claims required a public, immutable verification database capable of managing thousands of certificates.',
    solution: 'We engineered a secure NestJS backend system with real-time certificate matching, multi-tenant appraiser roles, and AWS S3 document distribution pipelines.',
    metrics: [
      { label: 'Audited Registry', value: '10,000+' },
      { label: 'Data Security', value: 'AES-256' },
      { label: 'Search Latency', value: '0.1s' }
    ],
    techStack: ['wordpress', 'elementor', 'custom design', 'js', 'css', 'framer-motion', 'mysql'],
    svgColor: '#4A8F63'
  },
  {
    id: 'movers-richmondhill',
    title: 'Movers Richmond Hill',
    url: 'https://moversrichmondhill.ca/',
    category: 'logistics',
    tagline: 'Static RELO Performance Brochure',
    brief: 'A ultra-fast, static exported local brochure layout with fluid CSS animations and high-converting quote triggers.',
    challenge: 'A highly competitive local SEO environment required extreme website performance scores to secure organic mobile placements.',
    solution: 'We constructed a static HTML5/CSS3 layout optimized to zero-layout shifts (CLS). Using localized schema markup injections, the site achieves instant loading.',
    metrics: [
      { label: 'Page Load Speed', value: '0.2s' },
      { label: 'Mobile Score', value: '100/100' },
      { label: 'Local SEO Ranking', value: '#1 Spot' }
    ],
    techStack: ['HTML5', 'wordpress', 'elementor', 'custom design', 'js', 'css', 'framer-motion'],
    svgColor: '#D49B34'
  }
];

export default function Portfolio() {
  const [filter, setFilter] = useState<'all' | 'websites' | 'webapps' | 'logistics'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    setIsRendered(true);
    // Bind Escape key to close the drawer
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);

    // Initialize Lenis smooth scroll synced with GSAP ticker
    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.1,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      infinite: false,
      syncTouch: true
    });

    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // GSAP ScrollTrigger stagger fade + translateY on sections
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        const sections = gsap.utils.toArray('main > section');
        sections.forEach((sec: any) => {
          // Stagger direct elements inside sections
          const targets = sec.querySelectorAll('.reveal-left, .portfolio-filters, .portfolio-card');
          if (targets.length > 0) {
            gsap.fromTo(targets,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                duration: 1.0,
                stagger: 0.12,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: sec,
                  start: 'top 85%',
                  toggleActions: 'play none none none',
                }
              }
            );
          } else {
            gsap.fromTo(sec,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                duration: 1.0,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: sec,
                  start: 'top 85%',
                  toggleActions: 'play none none none',
                }
              }
            );
          }
        });
      });
    });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      lenis.destroy();
      gsap.ticker.remove(updateTicker);
      ctx.revert();
    };
  }, []);

  // CSS 3D Tilt Effect on project cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth <= 768) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    // Calculate rotate values: Max 15deg
    const rotateX = ((height / 2 - y) / (height / 2)) * 15;
    const rotateY = ((x - width / 2) / (width / 2)) * 15;

    gsap.to(card, {
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  };

  const filteredProjects = PROJECTS_DATA.filter(
    (project) => filter === 'all' || project.category === filter
  );

  return (
    <main className="portfolio-page-smooth" style={{ paddingTop: '120px' }}>
      <section 
        className="scroll-reveal" 
        style={{ 
          paddingTop: '64px',
          paddingBottom: '128px', 
          position: 'relative', 
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          minHeight: '450px'
        }}
      >
        <Hero3D />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="reveal-left" style={{ maxWidth: '800px' }}>
            <span className="section-tagline">Bespoke Implementations</span>
            <h1 className="editorial-hero-title" style={{ marginBottom: '24px' }}>
              Selected Works
            </h1>
            <p style={{ color: 'var(--text-body)', fontSize: '20px', lineHeight: 1.6 }}>
              Explore how we combine premium UI/UX design, custom high-performance code, and local SEO engineering to deliver measurable impact for our clients.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section style={{ padding: '64px 0 48px 0' }}>
        <div className="container">
          <div 
            className="portfolio-filters"
            style={{ 
              display: 'flex', 
              gap: '12px', 
              borderBottom: '1px solid var(--border-color)', 
              paddingBottom: '24px',
              flexWrap: 'wrap'
            }}
          >
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'websites', label: 'Websites' },
              { id: 'webapps', label: 'Web Apps' },
              { id: 'logistics', label: 'SEO & Logistics' }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`filter-btn ${filter === tab.id ? 'active' : ''}`}
                onClick={() => setFilter(tab.id as any)}
                style={{
                  background: filter === tab.id ? 'var(--primary)' : 'transparent',
                  color: filter === tab.id ? '#222222' : 'var(--text-body)',
                  border: '1px solid',
                  borderColor: filter === tab.id ? 'var(--primary)' : 'var(--border-color)',
                  padding: '8px 20px',
                  borderRadius: '9999px',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'var(--transition-quick)'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section style={{ padding: '0 0 128px 0' }}>
        <div className="container">
          <div 
            className="portfolio-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 1fr))',
              gap: '40px'
            }}
          >
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id}
                className="portfolio-card scroll-reveal visible"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-card)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-soft)',
                  transformStyle: 'preserve-3d',
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* SVG Conceptual Art */}
                <div 
                  className="portfolio-card-art-wrap"
                  style={{
                    height: '280px',
                    backgroundColor: 'var(--background-secondary)',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: '1px solid var(--border-color)',
                    overflow: 'hidden'
                  }}
                >
                  <div 
                    className="portfolio-card-overlay"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(38, 35, 31, 0.03)',
                      zIndex: 1,
                      transition: 'background-color 0.3s ease'
                    }}
                  />
                  
                  {project.id === 'space-artisans' && (
                    <svg viewBox="0 0 400 240" width="80%" height="80%" xmlns="http://www.w3.org/2000/svg">
                      <g stroke={project.svgColor} strokeWidth="1.5" fill="none" opacity="0.8">
                        <rect x="60" y="40" width="280" height="160" strokeDasharray="5 5" />
                        {/* Drawing columns */}
                        <line x1="120" y1="40" x2="120" y2="200" />
                        <line x1="200" y1="40" x2="200" y2="200" />
                        <line x1="280" y1="40" x2="280" y2="200" />
                        {/* Arches */}
                        <path d="M 120 120 A 40 40 0 0 1 200 120" />
                        <path d="M 200 120 A 40 40 0 0 1 280 120" />
                        {/* Center gold geometric balance */}
                        <circle cx="200" cy="120" r="10" fill={project.svgColor} opacity="0.3" />
                        <circle cx="200" cy="120" r="4" fill={project.svgColor} />
                        <circle cx="200" cy="120" r="24" strokeWidth="1" />
                      </g>
                    </svg>
                  )}

                  {project.id === 'movers-vaughan' && (
                    <svg viewBox="0 0 400 240" width="80%" height="80%" xmlns="http://www.w3.org/2000/svg">
                      <g stroke={project.svgColor} strokeWidth="1.5" fill="none" opacity="0.8">
                        {/* Connection points representing routes */}
                        <circle cx="80" cy="120" r="6" fill={project.svgColor} />
                        <circle cx="200" cy="60" r="6" />
                        <circle cx="320" cy="120" r="6" fill={project.svgColor} />
                        <circle cx="200" cy="180" r="6" />
                        
                        {/* Routing paths */}
                        <path d="M 80 120 C 140 60, 260 60, 320 120" strokeDasharray="3 3" />
                        <path d="M 80 120 C 140 180, 260 180, 320 120" />
                        <line x1="80" y1="120" x2="320" y2="120" />
                        <line x1="200" y1="60" x2="200" y2="180" strokeWidth="1" strokeDasharray="4 4" />
                        
                        {/* Cargo Moving Concept */}
                        <rect x="175" y="105" width="50" height="30" rx="4" fill="var(--background)" stroke={project.svgColor} strokeWidth="2" />
                        <line x1="200" y1="110" x2="200" y2="130" strokeWidth="1" />
                        <line x1="185" y1="120" x2="215" y2="120" strokeWidth="1" />
                      </g>
                    </svg>
                  )}

                  {project.id === 'ricliso' && (
                    <svg viewBox="0 0 400 240" width="80%" height="80%" xmlns="http://www.w3.org/2000/svg">
                      <g stroke={project.svgColor} strokeWidth="1.5" fill="none" opacity="0.8">
                        {/* Security check/badge design */}
                        <circle cx="200" cy="120" r="70" stroke={project.svgColor} strokeWidth="2" />
                        <circle cx="200" cy="120" r="60" strokeDasharray="6 4" />
                        <circle cx="200" cy="120" r="20" fill={project.svgColor} opacity="0.1" />
                        
                        {/* Certifier shield vectors */}
                        <path d="M 185 105 L 215 105 L 215 125 A 15 15 0 0 1 200 140 A 15 15 0 0 1 185 125 Z" fill="none" strokeWidth="2" />
                        <path d="M 193 120 L 198 125 L 208 115" stroke={project.svgColor} strokeWidth="2" />
                        
                        {/* Network verification nodes */}
                        <line x1="200" y1="50" x2="200" y2="28" strokeDasharray="3 3" />
                        <circle cx="200" cy="24" r="4" fill={project.svgColor} />
                        <line x1="200" y1="190" x2="200" y2="212" strokeDasharray="3 3" />
                        <circle cx="200" cy="216" r="4" fill={project.svgColor} />
                      </g>
                    </svg>
                  )}

                  {project.id === 'movers-richmondhill' && (
                    <svg viewBox="0 0 400 240" width="80%" height="80%" xmlns="http://www.w3.org/2000/svg">
                      <g stroke={project.svgColor} strokeWidth="1.5" fill="none" opacity="0.8">
                        {/* Performance optimization curves */}
                        <path d="M 50 190 Q 150 190, 200 120 T 350 50" strokeWidth="2.5" />
                        <path d="M 50 190 Q 150 200, 230 140 T 350 70" strokeDasharray="4 4" opacity="0.6" />
                        
                        {/* Speed coordinate grid */}
                        <line x1="50" y1="50" x2="50" y2="190" opacity="0.4" />
                        <line x1="50" y1="190" x2="350" y2="190" opacity="0.4" />
                        
                        {/* High-speed node */}
                        <circle cx="350" cy="50" r="6" fill={project.svgColor} />
                        <circle cx="350" cy="50" r="16" strokeWidth="1" strokeDasharray="3 2" />
                        
                        {/* Indicators */}
                        <line x1="200" y1="120" x2="200" y2="190" strokeDasharray="2 2" />
                        <circle cx="200" cy="120" r="4" fill={project.svgColor} />
                      </g>
                    </svg>
                  )}
                </div>

                {/* Card Info */}
                <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                    <span 
                      style={{ 
                        fontSize: '11px', 
                        fontWeight: 600, 
                        color: 'var(--primary-hover)', 
                        textTransform: 'uppercase', 
                        letterSpacing: '0.05em', 
                        backgroundColor: 'var(--background-secondary)', 
                        padding: '4px 12px', 
                        borderRadius: '4px' 
                      }}
                    >
                      {project.category === 'websites' ? 'Website' : project.category === 'webapps' ? 'Web App' : 'SEO & Logistics'}
                    </span>
                  </div>
                  
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 500, marginBottom: '8px' }}>
                    {project.title}
                  </h3>
                  
                  <p style={{ fontSize: '15px', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '16px' }}>
                    {project.tagline}
                  </p>
                  
                  <p style={{ fontSize: '16px', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '24px', flex: 1 }}>
                    {project.brief}
                  </p>

                  {/* Summary Metric Badges */}
                  <div 
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      borderTop: '1px solid var(--border-color)', 
                      borderBottom: '1px solid var(--border-color)', 
                      padding: '16px 0', 
                      marginBottom: '24px' 
                    }}
                  >
                    {project.metrics.slice(0, 2).map((metric, i) => (
                      <div key={i}>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
                          {metric.label}
                        </span>
                        <span style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-heading)', fontFamily: 'var(--font-heading)' }}>
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Action CTA */}
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setSelectedProject(project)}
                      style={{ 
                        flex: 1, 
                        padding: '12px 20px', 
                        fontSize: '14px', 
                        borderRadius: '8px', 
                        border: '1px solid var(--border-color)' 
                      }}
                    >
                      View Case Study
                    </button>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{ 
                        padding: '12px', 
                        borderRadius: '8px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      aria-label={`Visit ${project.title}`}
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Slide-out Drawer Overlay */}
      {selectedProject && (
        <div 
          className="drawer-overlay"
          onClick={() => setSelectedProject(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(38, 35, 31, 0.5)',
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            opacity: 1,
            transition: 'opacity 0.4s ease'
          }}
        >
          <div 
            className="drawer-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '100%',
              maxWidth: '560px',
              height: '100%',
              backgroundColor: 'var(--background)',
              borderLeft: '1px solid var(--border-color)',
              padding: '48px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              zIndex: 1001,
              boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.1)',
              transform: 'translateX(0)',
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Drawer Body Container */}
            <div style={{ overflowY: 'auto', flex: 1, paddingRight: '12px' }} className="chatbot-feed">
              {/* Drawer Header */}
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  marginBottom: '32px',
                  borderBottom: '1px solid var(--border-color)',
                  paddingBottom: '20px'
                }}
              >
                <div>
                  <span 
                    style={{ 
                      fontSize: '11px', 
                      fontWeight: 600, 
                      color: 'var(--primary-hover)', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.05em' 
                    }}
                  >
                    Case Study — {selectedProject.category === 'websites' ? 'Website' : selectedProject.category === 'webapps' ? 'Web App' : 'SEO & Logistics'}
                  </span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 500, margin: '8px 0 0 0' }}>
                    {selectedProject.title}
                  </h2>
                </div>
                
                <button
                  onClick={() => setSelectedProject(null)}
                  style={{
                    background: 'transparent',
                    cursor: 'pointer',
                    color: 'var(--text-heading)',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    border: '1px solid var(--border-color)'
                  }}
                  aria-label="Close Case Study"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Case Study Narrative Content */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {/* Project Brief */}
                <div>
                  <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '10px' }}>
                    The Brief
                  </h4>
                  <p style={{ fontSize: '16px', color: 'var(--text-body)', lineHeight: 1.7 }}>
                    {selectedProject.brief}
                  </p>
                </div>

                {/* Challenge */}
                <div 
                  style={{ 
                    backgroundColor: 'var(--background-secondary)', 
                    padding: '24px', 
                    borderRadius: 'var(--radius-input)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <Info size={18} style={{ color: 'var(--error)', marginTop: '2px' }} />
                    <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-heading)' }}>
                      The Challenge
                    </h4>
                  </div>
                  <p style={{ fontSize: '15px', color: 'var(--text-body)', lineHeight: 1.6 }}>
                    {selectedProject.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <CheckCircle size={18} style={{ color: 'var(--success)', marginTop: '2px' }} />
                    <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-heading)' }}>
                      Our Solution
                    </h4>
                  </div>
                  <p style={{ fontSize: '16px', color: 'var(--text-body)', lineHeight: 1.7 }}>
                    {selectedProject.solution}
                  </p>
                </div>

                {/* Metrics Grid */}
                <div>
                  <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '16px' }}>
                    Key Performance Metrics
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                    {selectedProject.metrics.map((metric, i) => (
                      <div 
                        key={i} 
                        style={{ 
                          border: '1px solid var(--border-color)', 
                          padding: '16px', 
                          borderRadius: 'var(--radius-input)', 
                          textAlign: 'center' 
                        }}
                      >
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                          {metric.label}
                        </span>
                        <span style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-heading)', fontFamily: 'var(--font-heading)' }}>
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '12px' }}>
                    Technology Implemented
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {selectedProject.techStack.map((tech, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '13px',
                          color: 'var(--text-heading)',
                          backgroundColor: 'var(--background-secondary)',
                          padding: '6px 14px',
                          borderRadius: '9999px',
                          border: '1px solid var(--border-color)',
                          fontWeight: 500
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer Footer Links */}
            <div 
              style={{ 
                borderTop: '1px solid var(--border-color)', 
                paddingTop: '24px', 
                marginTop: '32px',
                display: 'flex',
                gap: '16px'
              }}
            >
              <a
                href={selectedProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ flex: 1, padding: '14px', display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center' }}
              >
                <span>Launch Live Website</span>
                <ExternalLink size={16} />
              </a>
              <button
                className="btn btn-secondary"
                onClick={() => setSelectedProject(null)}
                style={{ padding: '14px 24px' }}
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
