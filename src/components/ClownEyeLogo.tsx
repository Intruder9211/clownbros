'use client';

import React, { useEffect, useRef } from 'react';

interface ClownEyeLogoProps {
  variant?: 'light' | 'dark';
}

export default function ClownEyeLogo({ variant = 'light' }: ClownEyeLogoProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const leftPupilRef = useRef<SVGCircleElement>(null);
  const rightPupilRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;

    if (reducedMotion || !isFinePointer) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId: number | null = null;
    const maxOffset = 3.2;

    const updatePupils = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      if (leftPupilRef.current && rightPupilRef.current) {
        const transform = `translate(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px)`;
        leftPupilRef.current.style.transform = transform;
        rightPupilRef.current.style.transform = transform;
      }

      if (Math.abs(targetX - currentX) > 0.04 || Math.abs(targetY - currentY) > 0.04) {
        rafId = requestAnimationFrame(updatePupils);
      } else {
        rafId = null;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.hypot(dx, dy) || 1;
      const clampedScale = Math.min(dist / 160, 1);

      targetX = (dx / dist) * maxOffset * clampedScale;
      targetY = (dy / dist) * maxOffset * clampedScale;

      if (!rafId) {
        rafId = requestAnimationFrame(updatePupils);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const strokeColor = variant === 'dark' ? '#F2EFE7' : 'var(--text-ink, #171817)';
  const scleraFill = variant === 'dark' ? '#171817' : '#FFFFFF';
  const pupilFill = variant === 'dark' ? '#F2EFE7' : 'var(--text-ink, #171817)';

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 46 28"
      width="42"
      height="26"
      fill="none"
      aria-hidden="true"
      className="shrink-0 overflow-visible"
    >
      {/* Left Eye */}
      <g className="clown-eye-group">
        <ellipse
          cx="12.5"
          cy="14"
          rx="10"
          ry="11"
          fill={scleraFill}
          stroke={strokeColor}
          strokeWidth="2.1"
        />
        <circle
          ref={leftPupilRef}
          cx="12.5"
          cy="14"
          r="4"
          fill={pupilFill}
        />
        <circle cx="14" cy="12" r="1.2" fill="var(--accent-orange, #F15A3B)" />
      </g>

      {/* Right Eye */}
      <g className="clown-eye-group">
        <ellipse
          cx="33.5"
          cy="14"
          rx="10"
          ry="11"
          fill={scleraFill}
          stroke={strokeColor}
          strokeWidth="2.1"
        />
        <circle
          ref={rightPupilRef}
          cx="33.5"
          cy="14"
          r="4"
          fill={pupilFill}
        />
        <circle cx="35" cy="12" r="1.2" fill="var(--accent-orange, #F15A3B)" />
      </g>
    </svg>
  );
}
