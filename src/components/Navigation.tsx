'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const pathname = usePathname();

    // Close menu drawer on pressing escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    // Handle scroll events to show/hide header and apply backdrop blur
    useEffect(() => {
        let lastScrollY = window.scrollY;
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > 40) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }

            if (currentScrollY > lastScrollY && currentScrollY > 120) {
                setHidden(true);
            } else {
                setHidden(false);
            }
            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Pathname change effect to reinitialize scroll reveal and cursor hovers
    useEffect(() => {
        // Scroll reveal observer
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = document.querySelectorAll('.scroll-reveal');
        elements.forEach((el) => observer.observe(el));

        // Cursor hovers binding
        const cursorDot = document.getElementById('custom-cursor-dot');
        const cursorRing = document.getElementById('custom-cursor-ring');
        
        if (!cursorDot || !cursorRing) return;

        const handleHoverStart = () => {
            cursorDot.classList.add('hovered');
            cursorRing.classList.add('hovered');
        };
        const handleHoverEnd = () => {
            cursorDot.classList.remove('hovered');
            cursorRing.classList.remove('hovered');
        };

        const interactives = document.querySelectorAll('a, button, input, select, textarea, .checkpill, .value-card, .tech-card, .editorial-card, .faq-header, .service-header');
        interactives.forEach((el) => {
            el.addEventListener('mouseenter', handleHoverStart);
            el.addEventListener('mouseleave', handleHoverEnd);
        });

        return () => {
            elements.forEach((el) => observer.unobserve(el));
            interactives.forEach((el) => {
                el.removeEventListener('mouseenter', handleHoverStart);
                el.removeEventListener('mouseleave', handleHoverEnd);
            });
        };
    }, [pathname]);

    // Mouse movement listener for custom cursors
    useEffect(() => {
        const cursorDot = document.getElementById('custom-cursor-dot');
        const cursorRing = document.getElementById('custom-cursor-ring');
        if (!cursorDot || !cursorRing) return;

        const moveCursor = (e: MouseEvent) => {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
            cursorRing.style.left = `${e.clientX}px`;
            cursorRing.style.top = `${e.clientY}px`;
        };

        const handleMouseLeave = () => {
            cursorDot.style.opacity = '0';
            cursorRing.style.opacity = '0';
        };

        const handleMouseEnter = () => {
            cursorDot.style.opacity = '1';
            cursorRing.style.opacity = '1';
        };

        window.addEventListener('mousemove', moveCursor);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'Vision & Values' },
        { path: '/services', label: 'What We Do' },
        { path: '/portfolio', label: 'Portfolio' },
        { path: '/contact', label: 'Start a Project' }
    ];

    return (
        <>
            {/* Custom Cursors */}
            <div id="custom-cursor-dot" className="custom-cursor-dot"></div>
            <div id="custom-cursor-ring" className="custom-cursor-ring"></div>

            {/* Main Header */}
            <header className={`main-header ${scrolled ? 'scrolled' : ''} ${hidden ? 'hidden' : ''}`}>
                <div className="nav-container">
                    {/* Left: Brand Logo & Intersecting Circles Mark */}
                    <div className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <svg viewBox="0 0 100 100" width="28" height="28" fill="none" stroke="var(--primary)" strokeWidth="6" style={{ opacity: 0.9 }}>
                            <circle cx="38" cy="50" r="28" />
                            <circle cx="62" cy="50" r="28" style={{ stroke: 'var(--text-heading)', opacity: 0.6 }} />
                        </svg>
                        <Link href="/" className="brand-logo" onClick={closeMenu} style={{ letterSpacing: '0.05em', fontWeight: 600 }}>
                            CLOWNBROS<span>.</span>
                        </Link>
                    </div>

                    {/* Center: Desktop Links */}
                    <nav>
                        <ul className="nav-links">
                            {navLinks.map((link) => (
                                <li key={link.path}>
                                    <Link 
                                        href={link.path} 
                                        className={pathname === link.path ? 'active' : ''}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Right: Action CTA & Burger Toggle */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                        <Link href="/contact" className="btn btn-primary header-cta-btn" style={{ padding: '10px 22px', fontSize: '14px', borderRadius: '8px' }}>
                            Get in Touch
                        </Link>
                        
                        <button 
                            className="menu-toggle" 
                            onClick={toggleMenu}
                            aria-label="Open Navigation Menu"
                            aria-expanded={isOpen}
                        >
                            <span className="burger-bar" style={{ transform: isOpen ? 'rotate(45deg) translateY(6px)' : 'none' }}></span>
                            <span className="burger-bar" style={{ transform: isOpen ? 'rotate(-45deg) translateY(-6px)' : 'none' }}></span>
                        </button>
                    </div>
                </div>
            </header>
 
            {/* Slide-out Navigation Drawer */}
            <div className={`nav-drawer ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
                <div className="drawer-overlay" onClick={closeMenu}></div>
                <div className="drawer-content">
                    <button className="close-menu" onClick={closeMenu} aria-label="Close Navigation Menu">
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    
                    <div className="drawer-body">
                        <nav className="drawer-menu">
                            <ul>
                                {navLinks.map((link) => (
                                    <li key={link.path}>
                                        <Link 
                                            href={link.path} 
                                            className={`drawer-link ${pathname === link.path ? 'active' : ''}`}
                                            onClick={closeMenu}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        
                        <div style={{ marginTop: '8px' }} className="mobile-only-cta">
                            <Link href="/contact" className="btn btn-primary" onClick={closeMenu} style={{ display: 'flex', width: '100%', padding: '14px' }}>
                                Get in Touch
                            </Link>
                        </div>
                    </div>

                    <div className="drawer-footer">
                        <p className="drawer-label">Get in Touch</p>
                        <a href="mailto:singhmohit101103@gmail.com" className="drawer-email" style={{ display: 'block', marginBottom: '8px' }}>
                            singhmohit101103@gmail.com
                        </a>
                        <a href="tel:7303061282" className="drawer-email" style={{ display: 'block', marginBottom: '24px' }}>
                            +91 73030 61282
                        </a>
                        <div className="drawer-socials" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                            <a href="https://instagram.com/clownbros" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram" style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
                                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            </a>
                            <a href="https://youtube.com/@clownbros" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="YouTube" style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
                                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.95 1.96C5.12 19.5 12 19.5 12 19.5s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                            </a>
                            <a href="https://linkedin.com/company/clownbros" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn" style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
                                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                            </a>
                            <a href="https://x.com/clownbros" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="X (formerly Twitter)" style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
