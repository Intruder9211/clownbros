'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, ChevronDown, X } from 'lucide-react';
import ContactModal from './ContactModal';
import ThemeSwitcher from './ThemeSwitcher';
import { useScrollLock } from '@/lib/useScrollLock';

const SERVICE_CATEGORIES = [
  {
    group: 'Digital Experiences',
    items: [
      { title: 'Web Development', desc: 'Next.js, React & headless platforms', href: '/services/web-development' },
      { title: 'UI/UX Design', desc: 'Design systems, prototypes & UX', href: '/services/ui-ux-design' },
    ],
  },
  {
    group: 'Product & Systems',
    items: [
      { title: 'Mobile Apps', desc: 'Flutter, React Native & native builds', href: '/services/mobile-apps' },
      { title: 'AI Solutions', desc: 'LLM agents, RAG & workflow automation', href: '/services/ai-solutions' },
    ],
  },
  {
    group: 'Growth & Infrastructure',
    items: [
      { title: 'Cloud & DevOps', desc: 'AWS, Docker, CI/CD & observability', href: '/services/cloud-devops' },
      { title: 'SEO & Growth', desc: 'Technical SEO, Core Web Vitals & funnels', href: '/services/seo-growth' },
    ],
  },
];

const STUDIO_LINKS = [
  { title: 'About', desc: 'Philosophy, culture & engineering ethos', href: '/about' },
  { title: 'Process', desc: '5-stage build room delivery framework', href: '/process' },
  { title: 'Trust & Security', desc: 'NDAs, IP ownership & OWASP standards', href: '/trust' },
  { title: 'Careers', desc: 'Open roles & global engineering network', href: '/careers' },
];

export default function Navigation() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'services' | 'studio' | null>(null);
  const [mobileSection, setMobileSection] = useState<'services' | 'studio' | null>('services');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const pathname = usePathname();
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setActiveDropdown(null);
      setIsMobileOpen(false);
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setIsMobileOpen(false);
        setIsContactModalOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useScrollLock(isMobileOpen);

  // Subtle desktop-only cursor ring
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(pointer: fine) and (hover: hover)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ring = document.getElementById('studio-cursor-ring');
    if (!ring) return;

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let rafId: number | null = null;

    const render = () => {
      rx += (mx - rx) * 0.22;
      ry += (my - ry) * 0.22;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      if (Math.abs(mx - rx) > 0.3 || Math.abs(my - ry) > 0.3) {
        rafId = requestAnimationFrame(render);
      } else {
        rafId = null;
      }
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      ring.style.opacity = '1';
      if (!rafId) rafId = requestAnimationFrame(render);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('a, button, [role="button"], input, select, textarea')) {
        ring.classList.add('is-hovering');
      } else {
        ring.classList.remove('is-hovering');
      }
    };

    const onLeave = () => {
      ring.style.opacity = '0';
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const openMenu = (name: 'services' | 'studio') => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setActiveDropdown(name);
  };

  const scheduleClose = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setActiveDropdown(null), 140);
  };

  return (
    <>
      <div id="studio-cursor-ring" className="studio-cursor-ring" aria-hidden="true" />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[var(--bg-paper)]/92 backdrop-blur-md border-b border-[var(--border-hairline)]'
            : 'bg-[var(--bg-paper)]/78 backdrop-blur-sm border-b border-transparent'
        }`}
      >
        <div className="studio-container flex items-center justify-between h-20 gap-3">
          {/* Custom CLOWNBROS Final PNG Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-[var(--text-ink)] shrink-0"
            onClick={() => {
              setActiveDropdown(null);
              setIsMobileOpen(false);
            }}
          >
            <img
              src="/images/clownbros-mark.png"
              alt="ClownBros"
              className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-display text-base sm:text-lg font-bold tracking-[0.06em] uppercase text-[var(--text-ink)]">
              CLOWNBROS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary Navigation">
            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => openMenu('services')}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'services' ? null : 'services')}
                aria-expanded={activeDropdown === 'services'}
                className={`flex items-center gap-1.5 py-2 font-display text-sm font-medium tracking-wide transition-colors ${
                  pathname.startsWith('/services') || activeDropdown === 'services'
                    ? 'text-[var(--accent-orange)]'
                    : 'text-[var(--text-ink)] hover:text-[var(--accent-orange)]'
                }`}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'services' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {activeDropdown === 'services' && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[680px]"
                  onMouseEnter={() => openMenu('services')}
                  onMouseLeave={scheduleClose}
                >
                  <div className="bg-[var(--bg-ink)] text-[#F2EFE7] border border-white/15 rounded-2xl p-6 shadow-2xl">
                    <div className="grid grid-cols-3 gap-6">
                      {SERVICE_CATEGORIES.map((cat) => (
                        <div key={cat.group}>
                          <div className="font-mono-tech text-[10px] uppercase tracking-[0.14em] text-[#9E9B93] mb-3 pb-2 border-b border-white/10">
                            {cat.group}
                          </div>
                          <div className="flex flex-col gap-2">
                            {cat.items.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setActiveDropdown(null)}
                                className="group block p-2 -mx-2 rounded-lg hover:bg-white/8 transition-colors"
                              >
                                <div className="font-display text-sm font-medium text-[#F2EFE7] group-hover:text-[var(--accent-orange)] flex items-center justify-between">
                                  {item.title}
                                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </div>
                                <p className="text-xs text-[#9E9B93] mt-0.5 leading-snug">
                                  {item.desc}
                                </p>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="font-mono-tech text-xs text-[#9E9B93]">
                        End-to-end product architecture &amp; engineering
                      </span>
                      <Link
                        href="/services"
                        onClick={() => setActiveDropdown(null)}
                        className="font-display text-xs font-medium text-[var(--accent-orange)] hover:text-[#F2EFE7] inline-flex items-center gap-1 transition-colors"
                      >
                        Explore All Capabilities <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/case-studies"
              className={`link-editorial font-display text-sm font-medium tracking-wide transition-colors ${
                pathname === '/case-studies'
                  ? 'text-[var(--accent-orange)]'
                  : 'text-[var(--text-ink)] hover:text-[var(--accent-orange)]'
              }`}
            >
              Work
            </Link>

            {/* Company / About Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => openMenu('studio')}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'studio' ? null : 'studio')}
                aria-expanded={activeDropdown === 'studio'}
                className={`flex items-center gap-1.5 py-2 font-display text-sm font-medium tracking-wide transition-colors ${
                  ['/about', '/process', '/trust', '/careers'].includes(pathname) ||
                  activeDropdown === 'studio'
                    ? 'text-[var(--accent-orange)]'
                    : 'text-[var(--text-ink)] hover:text-[var(--accent-orange)]'
                }`}
              >
                <span>Company</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'studio' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {activeDropdown === 'studio' && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[320px]"
                  onMouseEnter={() => openMenu('studio')}
                  onMouseLeave={scheduleClose}
                >
                  <div className="bg-[var(--bg-ink)] text-[#F2EFE7] border border-white/15 rounded-2xl p-4 shadow-2xl flex flex-col gap-1">
                    {STUDIO_LINKS.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setActiveDropdown(null)}
                        className="group block p-2.5 rounded-xl hover:bg-white/8 transition-colors"
                      >
                        <div className="font-display text-sm font-medium text-[#F2EFE7] group-hover:text-[var(--accent-orange)] flex items-center justify-between">
                          {item.title}
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-xs text-[#9E9B93] mt-0.5">{item.desc}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/contact"
              className={`link-editorial font-display text-sm font-medium tracking-wide transition-colors ${
                pathname === '/contact'
                  ? 'text-[var(--accent-orange)]'
                  : 'text-[var(--text-ink)] hover:text-[var(--accent-orange)]'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right: 8-Theme Switcher + CTA + Mobile Trigger */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <ThemeSwitcher />

            <button
              type="button"
              onClick={() => setIsContactModalOpen(true)}
              className="hidden md:inline-flex btn-studio-primary !py-2.5 !px-5 !text-xs"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open Navigation Menu"
              aria-expanded={isMobileOpen}
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-[var(--border-hairline)] text-[var(--text-ink)] hover:bg-[var(--bg-ink)] hover:text-[#F2EFE7] transition-colors shrink-0"
            >
              <span className="sr-only">Menu</span>
              <div className="flex flex-col gap-1.5 w-4">
                <span className="h-[1.5px] w-full bg-current block" />
                <span className="h-[1.5px] w-3/4 bg-current block ml-auto" />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Responsive Mobile Menu */}
      <div
        className={`fixed inset-0 z-[70] bg-[var(--bg-ink)] text-[#F2EFE7] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isMobileOpen}
      >
        <div className="studio-container h-full flex flex-col justify-between py-6 overflow-y-auto">
          <div className="flex items-center justify-between pb-6 border-b border-white/12">
            <Link
              href="/"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center gap-2.5 font-display text-lg font-bold tracking-[0.06em] uppercase text-[#F2EFE7]"
            >
              <img
                src="/images/clownbros-mark-light.png"
                alt="ClownBros"
                className="h-8 w-auto object-contain"
              />
              <span>CLOWNBROS</span>
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileOpen(false)}
              aria-label="Close Navigation Menu"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-[#F2EFE7] hover:bg-[var(--accent-orange)] hover:border-[var(--accent-orange)] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="py-8 flex flex-col gap-6 my-auto">
            <Link
              href="/"
              onClick={() => setIsMobileOpen(false)}
              className="font-display text-3xl font-semibold tracking-tight hover:text-[var(--accent-orange)] transition-colors"
            >
              Home
            </Link>

            <div className="border-y border-white/12 py-4">
              <button
                type="button"
                onClick={() => setMobileSection(mobileSection === 'services' ? null : 'services')}
                className="w-full flex items-center justify-between font-display text-3xl font-semibold tracking-tight"
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-6 h-6 transition-transform duration-300 ${
                    mobileSection === 'services' ? 'rotate-180 text-[var(--accent-orange)]' : ''
                  }`}
                />
              </button>
              {mobileSection === 'services' && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 pl-2">
                  <Link href="/services" onClick={() => setIsMobileOpen(false)} className="text-sm font-medium text-[var(--accent-orange)]">
                    All Capabilities →
                  </Link>
                  <Link href="/services/web-development" onClick={() => setIsMobileOpen(false)} className="text-sm text-[#F2EFE7]/80 hover:text-[#F2EFE7]">
                    Web Development
                  </Link>
                  <Link href="/services/mobile-apps" onClick={() => setIsMobileOpen(false)} className="text-sm text-[#F2EFE7]/80 hover:text-[#F2EFE7]">
                    Mobile Apps
                  </Link>
                  <Link href="/services/ui-ux-design" onClick={() => setIsMobileOpen(false)} className="text-sm text-[#F2EFE7]/80 hover:text-[#F2EFE7]">
                    UI/UX Design
                  </Link>
                  <Link href="/services/cloud-devops" onClick={() => setIsMobileOpen(false)} className="text-sm text-[#F2EFE7]/80 hover:text-[#F2EFE7]">
                    Cloud &amp; DevOps
                  </Link>
                  <Link href="/services/ai-solutions" onClick={() => setIsMobileOpen(false)} className="text-sm text-[#F2EFE7]/80 hover:text-[#F2EFE7]">
                    AI Solutions
                  </Link>
                  <Link href="/services/seo-growth" onClick={() => setIsMobileOpen(false)} className="text-sm text-[#F2EFE7]/80 hover:text-[#F2EFE7]">
                    SEO &amp; Growth
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/case-studies"
              onClick={() => setIsMobileOpen(false)}
              className="font-display text-3xl font-semibold tracking-tight hover:text-[var(--accent-orange)] transition-colors"
            >
              Case Studies
            </Link>

            <div className="border-y border-white/12 py-4">
              <button
                type="button"
                onClick={() => setMobileSection(mobileSection === 'studio' ? null : 'studio')}
                className="w-full flex items-center justify-between font-display text-3xl font-semibold tracking-tight"
              >
                <span>Company</span>
                <ChevronDown
                  className={`w-6 h-6 transition-transform duration-300 ${
                    mobileSection === 'studio' ? 'rotate-180 text-[var(--accent-orange)]' : ''
                  }`}
                />
              </button>
              {mobileSection === 'studio' && (
                <div className="mt-4 grid grid-cols-2 gap-3 pl-2">
                  {STUDIO_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className="text-sm text-[#F2EFE7]/80 hover:text-[#F2EFE7]"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/contact"
              onClick={() => setIsMobileOpen(false)}
              className="font-display text-3xl font-semibold tracking-tight hover:text-[var(--accent-orange)] transition-colors"
            >
              Contact
            </Link>
          </div>

          <div className="pt-6 border-t border-white/12 flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-2 font-mono-tech text-xs text-[#9E9B93]">
              <a href="mailto:hello@clownbros.com" className="hover:text-[#F2EFE7]">
                hello@clownbros.com
              </a>
              <a href="tel:7303061282" className="hover:text-[#F2EFE7]">
                +91 73030 61282
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
