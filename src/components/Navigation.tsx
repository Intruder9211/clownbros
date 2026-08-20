'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ContactModal from './ContactModal';

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const pathname = usePathname();

    // Close menu drawer & dropdowns on escape or outside click
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsOpen(false);
                setIsContactModalOpen(false);
                setActiveDropdown(null);
            }
        };

        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('.nav-item-dropdown')) {
                setActiveDropdown(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        document.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // Prevent body scroll when drawer or contact modal is open
    useEffect(() => {
        if (isOpen || isContactModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen, isContactModalOpen]);

    // Handle scroll events with RAF throttling for sticky header
    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    const isScrolled = currentScrollY > 20;

                    setScrolled(prev => prev !== isScrolled ? isScrolled : prev);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Pathname change effect for scroll reveal and delegated mouse hover states
    useEffect(() => {
        setActiveDropdown(null);

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

        if (window.matchMedia('(pointer: fine)').matches) {
            const cursorDot = document.getElementById('custom-cursor-dot');
            const cursorRing = document.getElementById('custom-cursor-ring');

            const handleMouseOver = (e: MouseEvent) => {
                const target = e.target as HTMLElement | null;
                if (target && target.closest('a, button, input, select, textarea, .checkpill, .value-card, .tech-card, .editorial-card, .faq-header, .service-header, .gig-card, .trust-badge-card')) {
                    cursorDot?.classList.add('hovered');
                    cursorRing?.classList.add('hovered');
                } else {
                    cursorDot?.classList.remove('hovered');
                    cursorRing?.classList.remove('hovered');
                }
            };

            document.addEventListener('mouseover', handleMouseOver, { passive: true });

            return () => {
                elements.forEach((el) => observer.unobserve(el));
                document.removeEventListener('mouseover', handleMouseOver);
            };
        }

        return () => {
            elements.forEach((el) => observer.unobserve(el));
        };
    }, [pathname]);

    // Hardware-accelerated GPU transform mouse cursor
    useEffect(() => {
        if (!window.matchMedia('(pointer: fine)').matches) return;

        const cursorDot = document.getElementById('custom-cursor-dot');
        const cursorRing = document.getElementById('custom-cursor-ring');
        if (!cursorDot || !cursorRing) return;

        let mouseX = -100;
        let mouseY = -100;
        let ringX = -100;
        let ringY = -100;
        let rafId: number | null = null;

        const updatePositions = () => {
            ringX += (mouseX - ringX) * 0.3;
            ringY += (mouseY - ringY) * 0.3;

            cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
            cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

            rafId = null;
        };

        const moveCursor = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!rafId) {
                rafId = requestAnimationFrame(updatePositions);
            }
        };

        const handleMouseLeave = () => {
            cursorDot.style.opacity = '0';
            cursorRing.style.opacity = '0';
        };

        const handleMouseEnter = () => {
            cursorDot.style.opacity = '1';
            cursorRing.style.opacity = '1';
        };

        window.addEventListener('mousemove', moveCursor, { passive: true });
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => {
        setIsOpen(false);
        setActiveDropdown(null);
    };

    const toggleAccordion = (name: string) => {
        setMobileAccordion(prev => prev === name ? null : name);
    };

    const openContactModal = () => {
        closeMenu();
        setIsContactModalOpen(true);
    };

    // Single active sub-menu control handlers
    const handleNavDropdownEnter = (name: string) => {
        setActiveDropdown(name);
    };

    const handleNavDropdownLeave = () => {
        setActiveDropdown(null);
    };

    const handleNavDropdownToggle = (name: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveDropdown(prev => prev === name ? null : name);
    };

    const handleSubLinkClick = () => {
        setActiveDropdown(null);
        closeMenu();
    };

    return (
        <>
            {/* Custom Cursors */}
            <div id="custom-cursor-dot" className="custom-cursor-dot"></div>
            <div id="custom-cursor-ring" className="custom-cursor-ring"></div>

            {/* Popup Contact Project Modal */}
            <ContactModal 
                isOpen={isContactModalOpen} 
                onClose={() => setIsContactModalOpen(false)} 
            />

            {/* Main Header */}
            <header className={`main-header ${scrolled ? 'scrolled' : ''}`}>
                <div className="nav-container">
                    {/* Brand Logo */}
                    <div className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <svg viewBox="0 0 100 100" width="28" height="28" fill="none" stroke="var(--primary)" strokeWidth="6" style={{ opacity: 0.9 }}>
                            <circle cx="38" cy="50" r="28" />
                            <circle cx="62" cy="50" r="28" style={{ stroke: 'var(--text-heading)', opacity: 0.6 }} />
                        </svg>
                        <Link href="/" className="brand-logo" onClick={closeMenu} style={{ letterSpacing: '0.05em', fontWeight: 600 }}>
                            CLOWNBROS<span>.</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation Links & Mega Dropdowns */}
                    <nav className="desktop-nav">
                        <ul className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '20px', listStyle: 'none' }}>
                            <li>
                                <Link href="/" className={pathname === '/' ? 'active' : ''} onClick={handleSubLinkClick}>
                                    Home
                                </Link>
                            </li>

                            {/* Mega Menu 1: Services */}
                            <li 
                                className={`nav-item-dropdown ${activeDropdown === 'services' ? 'open' : ''}`}
                                onMouseEnter={() => handleNavDropdownEnter('services')}
                                onMouseLeave={handleNavDropdownLeave}
                            >
                                <button 
                                    className={`nav-dropdown-trigger ${pathname.startsWith('/services') || activeDropdown === 'services' ? 'active' : ''}`}
                                    onClick={(e) => handleNavDropdownToggle('services', e)}
                                >
                                    <span>Services</span>
                                    <svg className="dropdown-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </button>
                                <div className={`mega-menu-panel mega-menu-wide ${activeDropdown === 'services' ? 'show' : ''}`}>
                                    <div className="mega-menu-grid">
                                        <div>
                                            <div className="mega-menu-col-title">Engineering & Design</div>
                                            <Link href="/services/web-development" className="mega-menu-item" onClick={handleSubLinkClick}>
                                                <div className="mega-menu-icon">
                                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                                                </div>
                                                <div className="mega-menu-text">
                                                    <h5>Web & Web3 Platforms</h5>
                                                    <p>Next.js & React web platforms.</p>
                                                </div>
                                            </Link>
                                            <Link href="/services/mobile-apps" className="mega-menu-item" onClick={handleSubLinkClick}>
                                                <div className="mega-menu-icon">
                                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                                                </div>
                                                <div className="mega-menu-text">
                                                    <h5>Mobile App Engineering</h5>
                                                    <p>iOS & Android native apps.</p>
                                                </div>
                                            </Link>
                                            <Link href="/services/ui-ux-design" className="mega-menu-item" onClick={handleSubLinkClick}>
                                                <div className="mega-menu-icon">
                                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/></svg>
                                                </div>
                                                <div className="mega-menu-text">
                                                    <h5>UI/UX Product Design</h5>
                                                    <p>Figma design systems & UI.</p>
                                                </div>
                                            </Link>
                                        </div>
                                        <div>
                                            <div className="mega-menu-col-title">Cloud & Innovation</div>
                                            <Link href="/services/cloud-devops" className="mega-menu-item" onClick={handleSubLinkClick}>
                                                <div className="mega-menu-icon">
                                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>
                                                </div>
                                                <div className="mega-menu-text">
                                                    <h5>Cloud & DevOps Setup</h5>
                                                    <p>AWS, Vercel & Docker CI/CD.</p>
                                                </div>
                                            </Link>
                                            <Link href="/services/ai-solutions" className="mega-menu-item" onClick={handleSubLinkClick}>
                                                <div className="mega-menu-icon">
                                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                                </div>
                                                <div className="mega-menu-text">
                                                    <h5>AI & ML Integration</h5>
                                                    <p>Custom LLMs & AI agents.</p>
                                                </div>
                                            </Link>
                                            <Link href="/services/seo-growth" className="mega-menu-item" onClick={handleSubLinkClick}>
                                                <div className="mega-menu-icon">
                                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                                                </div>
                                                <div className="mega-menu-text">
                                                    <h5>SEO & Organic Growth</h5>
                                                    <p>Technical SEO & speed tuning.</p>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="mega-menu-featured-box">
                                            <p>Need custom architecture for your product?</p>
                                            <Link href="/services" onClick={handleSubLinkClick}>All Services →</Link>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            {/* Dropdown 2: Company & Trust */}
                            <li 
                                className={`nav-item-dropdown ${activeDropdown === 'company' ? 'open' : ''}`}
                                onMouseEnter={() => handleNavDropdownEnter('company')}
                                onMouseLeave={handleNavDropdownLeave}
                            >
                                <button 
                                    className={`nav-dropdown-trigger ${pathname === '/about' || pathname === '/process' || pathname === '/trust' || pathname === '/case-studies' || activeDropdown === 'company' ? 'active' : ''}`}
                                    onClick={(e) => handleNavDropdownToggle('company', e)}
                                >
                                    <span>Company & Trust</span>
                                    <svg className="dropdown-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </button>
                                <div className={`mega-menu-panel mega-menu-compact ${activeDropdown === 'company' ? 'show' : ''}`}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                        <Link href="/about" className="mega-menu-item" onClick={handleSubLinkClick}>
                                            <div className="mega-menu-icon">
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                                            </div>
                                            <div className="mega-menu-text">
                                                <h5>Vision & Values</h5>
                                                <p>Our culture & ethos.</p>
                                            </div>
                                        </Link>
                                        <Link href="/process" className="mega-menu-item" onClick={handleSubLinkClick}>
                                            <div className="mega-menu-icon">
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                                            </div>
                                            <div className="mega-menu-text">
                                                <h5>How We Work</h5>
                                                <p>5-step delivery framework.</p>
                                            </div>
                                        </Link>
                                        <Link href="/trust" className="mega-menu-item" onClick={handleSubLinkClick}>
                                            <div className="mega-menu-icon">
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                                            </div>
                                            <div className="mega-menu-text">
                                                <h5>Trust & Security</h5>
                                                <p>100% IP transfer & SOC2.</p>
                                            </div>
                                        </Link>
                                        <Link href="/case-studies" className="mega-menu-item" onClick={handleSubLinkClick}>
                                            <div className="mega-menu-icon">
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                                            </div>
                                            <div className="mega-menu-text">
                                                <h5>Client Case Studies</h5>
                                                <p>Metrics & success stories.</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </li>

                            {/* Dropdown 3: Careers & Freelancers */}
                            <li 
                                className={`nav-item-dropdown ${activeDropdown === 'careers' ? 'open' : ''}`}
                                onMouseEnter={() => handleNavDropdownEnter('careers')}
                                onMouseLeave={handleNavDropdownLeave}
                            >
                                <button 
                                    className={`nav-dropdown-trigger ${pathname === '/careers' || activeDropdown === 'careers' ? 'active' : ''}`}
                                    onClick={(e) => handleNavDropdownToggle('careers', e)}
                                >
                                    <span>Careers & Network</span>
                                    <svg className="dropdown-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </button>
                                <div className={`mega-menu-panel mega-menu-compact ${activeDropdown === 'careers' ? 'show' : ''}`}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                        <Link href="/careers" className="mega-menu-item" onClick={handleSubLinkClick}>
                                            <div className="mega-menu-icon">
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                                            </div>
                                            <div className="mega-menu-text">
                                                <h5>Freelancer Portal</h5>
                                                <p>Top 3% elite talent network.</p>
                                            </div>
                                        </Link>
                                        <Link href="/careers#gigs" className="mega-menu-item" onClick={handleSubLinkClick}>
                                            <div className="mega-menu-icon">
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                                            </div>
                                            <div className="mega-menu-text">
                                                <h5>Open Freelance Gigs</h5>
                                                <p>Explore contract roles.</p>
                                            </div>
                                        </Link>
                                        <Link href="/careers#apply" className="mega-menu-item" onClick={handleSubLinkClick}>
                                            <div className="mega-menu-icon">
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="16" y1="11" x2="22" y2="11"/></svg>
                                            </div>
                                            <div className="mega-menu-text">
                                                <h5>Apply as Freelancer</h5>
                                                <p>Direct talent application.</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </nav>

                    {/* Right: Action CTA Popup Modal Trigger & Burger Toggle */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <button 
                            onClick={openContactModal} 
                            className="btn btn-primary header-cta-btn" 
                            style={{ padding: '9px 20px', fontSize: '13.5px', borderRadius: '8px', cursor: 'pointer' }}
                        >
                            Start a Project
                        </button>
                        
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

            {/* Slide-out Navigation Drawer (Mobile & Accordion) */}
            <div className={`nav-drawer ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
                <div className="drawer-overlay" onClick={closeMenu}></div>
                <div className="drawer-content">
                    <button className="close-menu" onClick={closeMenu} aria-label="Close Navigation Menu">
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    
                    <div className="drawer-body">
                        <nav className="drawer-menu">
                            <ul>
                                <li style={{ borderBottom: '1px solid var(--border-color-light)' }}>
                                    <Link href="/" className={`drawer-link ${pathname === '/' ? 'active' : ''}`} onClick={closeMenu}>
                                        Home
                                    </Link>
                                </li>

                                {/* Mobile Accordion: Services */}
                                <li className={`drawer-accordion ${mobileAccordion === 'services' ? 'open' : ''}`}>
                                    <button className="drawer-accordion-btn" onClick={() => toggleAccordion('services')}>
                                        <span>Services</span>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: mobileAccordion === 'services' ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }}>
                                            <polyline points="6 9 12 15 18 9"></polyline>
                                        </svg>
                                    </button>
                                    <div className="drawer-accordion-content">
                                        <Link href="/services/web-development" className="drawer-sub-link" onClick={closeMenu}>Web & Web3 Platforms</Link>
                                        <Link href="/services/mobile-apps" className="drawer-sub-link" onClick={closeMenu}>Mobile Apps</Link>
                                        <Link href="/services/ui-ux-design" className="drawer-sub-link" onClick={closeMenu}>UI/UX Product Design</Link>
                                        <Link href="/services/cloud-devops" className="drawer-sub-link" onClick={closeMenu}>Cloud & DevOps</Link>
                                        <Link href="/services/ai-solutions" className="drawer-sub-link" onClick={closeMenu}>AI & Machine Learning</Link>
                                        <Link href="/services/seo-growth" className="drawer-sub-link" onClick={closeMenu}>SEO & Organic Growth</Link>
                                        <Link href="/services" className="drawer-sub-link" style={{ fontWeight: 600, color: 'var(--primary-hover)' }} onClick={closeMenu}>Explore All Services →</Link>
                                    </div>
                                </li>

                                {/* Mobile Accordion: Company & Trust */}
                                <li className={`drawer-accordion ${mobileAccordion === 'company' ? 'open' : ''}`}>
                                    <button className="drawer-accordion-btn" onClick={() => toggleAccordion('company')}>
                                        <span>Company & Trust</span>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: mobileAccordion === 'company' ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }}>
                                            <polyline points="6 9 12 15 18 9"></polyline>
                                        </svg>
                                    </button>
                                    <div className="drawer-accordion-content">
                                        <Link href="/about" className="drawer-sub-link" onClick={closeMenu}>Vision & Values</Link>
                                        <Link href="/process" className="drawer-sub-link" onClick={closeMenu}>How We Work (Process)</Link>
                                        <Link href="/trust" className="drawer-sub-link" onClick={closeMenu}>Trust & Compliance</Link>
                                        <Link href="/case-studies" className="drawer-sub-link" onClick={closeMenu}>Client Case Studies</Link>
                                    </div>
                                </li>

                                {/* Mobile Accordion: Careers & Network */}
                                <li className={`drawer-accordion ${mobileAccordion === 'careers' ? 'open' : ''}`}>
                                    <button className="drawer-accordion-btn" onClick={() => toggleAccordion('careers')}>
                                        <span>Careers & Freelancers</span>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: mobileAccordion === 'careers' ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }}>
                                            <polyline points="6 9 12 15 18 9"></polyline>
                                        </svg>
                                    </button>
                                    <div className="drawer-accordion-content">
                                        <Link href="/careers" className="drawer-sub-link" onClick={closeMenu}>Freelancer Hub</Link>
                                        <Link href="/careers#gigs" className="drawer-sub-link" onClick={closeMenu}>Open Freelance Gigs</Link>
                                        <Link href="/careers#apply" className="drawer-sub-link" onClick={closeMenu}>Apply as Freelancer</Link>
                                    </div>
                                </li>

                                <li style={{ borderTop: '1px solid var(--border-color-light)', paddingTop: '12px' }}>
                                    <button onClick={openContactModal} className="drawer-link" style={{ background: 'none', border: 'none', textAlign: 'left', width: '100%', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit' }}>
                                        Start a Project
                                    </button>
                                </li>
                            </ul>
                        </nav>
                        
                        <div style={{ marginTop: '16px' }} className="mobile-only-cta">
                            <button onClick={openContactModal} className="btn btn-primary" style={{ display: 'flex', width: '100%', padding: '14px', justifyContent: 'center', cursor: 'pointer', borderRadius: '8px' }}>
                                Get in Touch
                            </button>
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


