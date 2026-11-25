'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Briefcase, LayoutGrid, Phone } from 'lucide-react';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<'project' | 'work' | 'home'>(
    pathname === '/contact' ? 'project' : pathname === '/case-studies' ? 'work' : 'home'
  );

  const handleExploreWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setActiveTab('work');
    if (pathname === '/') {
      const target = document.getElementById('selected-works');
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      style={{
        background:
          'linear-gradient(90deg, var(--bg-s1) 0%, var(--bg-s3) 34%, var(--bg-s4) 68%, var(--bg-s6) 100%)',
      }}
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border-hairline)] pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
    >
      {/* 4-color bottom gradient accent strip */}
      <div
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(90deg, var(--accent-orange) 0%, var(--accent-cobalt) 35%, #25D366 70%, #D97706 100%)',
        }}
        className="absolute bottom-0 left-0 right-0 h-[3px]"
      />
      <div className="grid grid-cols-[1fr_1fr_auto_1fr_1fr] items-center h-[64px] px-1.5 gap-1">
        {/* 1. Start Project (Left) */}
        <Link
          href="/contact"
          onClick={() => setActiveTab('project')}
          className="flex flex-col items-center justify-center gap-1 min-h-[48px] px-0.5 transition-transform active:scale-95"
        >
          <Briefcase
            className="w-[18px] h-[18px]"
            strokeWidth={2}
            style={{ color: '#F15A3B' }}
          />
          <span
            className={`font-display text-[9.5px] font-medium leading-none tracking-tight whitespace-nowrap ${
              pathname === '/contact' || activeTab === 'project'
                ? 'text-[#F15A3B]'
                : 'text-[var(--text-ink)]/85'
            }`}
          >
            Start Project
          </span>
        </Link>

        {/* 2. Explore Work */}
        <Link
          href="/#selected-works"
          onClick={handleExploreWork}
          className="flex flex-col items-center justify-center gap-1 min-h-[48px] px-0.5 transition-transform active:scale-95"
        >
          <LayoutGrid
            className="w-[18px] h-[18px]"
            strokeWidth={2}
            style={{ color: '#3154D9' }}
          />
          <span
            className={`font-display text-[9.5px] font-medium leading-none tracking-tight whitespace-nowrap ${
              activeTab === 'work' && pathname === '/'
                ? 'text-[#3154D9]'
                : 'text-[var(--text-ink)]/85'
            }`}
          >
            Explore Work
          </span>
        </Link>

        {/* 3. Center Final PNG Mark + CLOWNBROS Inline */}
        <Link
          href="/"
          onClick={() => setActiveTab('home')}
          aria-label="ClownBros Home"
          className="flex flex-col items-center justify-center gap-0.5 min-h-[48px] px-1.5 bg-transparent transition-transform active:scale-95"
        >
          <img
            src="/images/clownbros-mark.png"
            alt=""
            className="h-5 w-auto object-contain"
          />
          <span className="font-display text-[9.5px] font-bold tracking-[0.06em] uppercase text-[var(--text-ink)] whitespace-nowrap leading-none">
            CLOWNBROS
          </span>
        </Link>

        {/* 4. WhatsApp */}
        <a
          href="https://wa.me/917303061282?text=Hello%20ClownBros%2C%20I%20would%20like%20to%20discuss%20a%20project."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 min-h-[48px] px-0.5 transition-transform active:scale-95"
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="#25D366"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span className="font-display text-[9.5px] font-medium leading-none tracking-tight text-[var(--text-ink)]/85 whitespace-nowrap">
            WhatsApp
          </span>
        </a>

        {/* 5. Call Us (Right) */}
        <a
          href="tel:+917303061282"
          className="flex flex-col items-center justify-center gap-1 min-h-[48px] px-0.5 transition-transform active:scale-95"
        >
          <Phone
            className="w-[18px] h-[18px]"
            strokeWidth={2}
            style={{ color: '#D97706' }}
          />
          <span className="font-display text-[9.5px] font-medium leading-none tracking-tight text-[var(--text-ink)]/85 whitespace-nowrap">
            Call Us
          </span>
        </a>
      </div>
    </nav>
  );
}
