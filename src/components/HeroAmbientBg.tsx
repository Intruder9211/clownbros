'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap';

export default function HeroAmbientBg() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.to('.hero-flow-line-1', {
        xPercent: -6,
        yPercent: 4,
        duration: 14,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.hero-flow-line-2', {
        xPercent: 5,
        yPercent: -5,
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.hero-orb-1', {
        x: 36,
        y: -24,
        duration: 16,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.hero-orb-2', {
        x: -28,
        y: 28,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      {/* Subtle organic atmospheric washes */}
      <div
        className="hero-orb-1 absolute -top-24 right-[-8%] w-[420px] h-[420px] rounded-full opacity-[0.14] blur-3xl"
        style={{ backgroundColor: 'var(--accent-orange, #F15A3B)' }}
      />
      <div
        className="hero-orb-2 absolute bottom-[-15%] left-[-6%] w-[380px] h-[380px] rounded-full opacity-[0.11] blur-3xl"
        style={{ backgroundColor: 'var(--accent-cobalt, #3154D9)' }}
      />

      {/* Flowing kinetic contour ribbons */}
      <svg
        viewBox="0 0 1440 700"
        preserveAspectRatio="none"
        className="hero-flow-line-1 absolute inset-0 w-[112%] h-[112%] -left-[6%] -top-[6%] opacity-[0.14]"
        fill="none"
      >
        <path
          d="M-60 220 C 260 90, 560 360, 920 210 C 1180 100, 1340 240, 1520 150"
          stroke="var(--text-ink, #171817)"
          strokeWidth="1.2"
        />
        <path
          d="M-60 290 C 310 170, 610 420, 980 280 C 1220 190, 1370 300, 1520 220"
          stroke="var(--accent-orange, #F15A3B)"
          strokeWidth="1"
        />
      </svg>

      <svg
        viewBox="0 0 1440 700"
        preserveAspectRatio="none"
        className="hero-flow-line-2 absolute inset-0 w-[112%] h-[112%] -left-[6%] -top-[6%] opacity-[0.12]"
        fill="none"
      >
        <path
          d="M-60 510 C 290 380, 660 610, 1020 460 C 1250 365, 1390 480, 1520 420"
          stroke="var(--accent-cobalt, #3154D9)"
          strokeWidth="1.1"
        />
        <path
          d="M-60 575 C 340 460, 720 650, 1070 520 C 1290 440, 1410 535, 1520 490"
          stroke="var(--text-ink, #171817)"
          strokeWidth="0.9"
        />
      </svg>
    </div>
  );
}
