'use client';

import React from 'react';
import HeroAmbientBg from './HeroAmbientBg';

interface HeroFrameProps {
  children: React.ReactNode;
  bottomPaddingClass?: string;
  innerClassName?: string;
}

export default function HeroFrame({
  children,
  bottomPaddingClass = 'pb-3 sm:pb-4',
  innerClassName = '',
}: HeroFrameProps) {
  return (
    <section
      style={{ backgroundColor: 'var(--bg-s1)' }}
      className={`text-[var(--text-ink)] pt-[88px] sm:pt-[92px] ${bottomPaddingClass} px-3 sm:px-5`}
    >
      <div
        style={{
          background:
            'linear-gradient(135deg, var(--accent-orange) 0%, var(--accent-cobalt) 50%, var(--accent-orange) 100%)',
        }}
        className="w-full max-w-[1440px] mx-auto p-[2px] rounded-[26px] sm:rounded-[34px] shadow-sm"
      >
        <div
          style={{ backgroundColor: 'var(--bg-s1)' }}
          className={`relative overflow-hidden w-full rounded-[24px] sm:rounded-[32px] px-5 sm:px-8 lg:px-12 py-10 sm:py-14 lg:py-16 ${innerClassName}`}
        >
          <HeroAmbientBg />
          <div className="relative z-10">{children}</div>
        </div>
      </div>
    </section>
  );
}
