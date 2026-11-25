'use client';

import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import ContactModal from './ContactModal';

interface StudioCTAProps {
  eyebrow?: string;
  headline?: string;
  subtext?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function StudioCTA({
  eyebrow = 'Ready When You Are',
  headline = "Have a big idea? Let's make it real.",
  subtext = 'Share your scope, timeline, or technical bottleneck. Our senior engineers will respond with a concrete architecture plan within 24 hours.',
  primaryLabel = 'Start a Project',
  secondaryLabel = 'View Case Studies',
  secondaryHref = '/case-studies',
}: StudioCTAProps) {
  const [open, setOpen] = useState(false);

  return (
    <section
      style={{ backgroundColor: 'var(--bg-s2)' }}
      className="text-[var(--text-ink)] py-20 sm:py-28 border-t border-[var(--border-hairline)]"
    >
      <ContactModal isOpen={open} onClose={() => setOpen(false)} />
      <div className="studio-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <span className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[var(--accent-orange)] block mb-5">
              {eyebrow}
            </span>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-[68px] font-semibold leading-[1.03] tracking-tight text-[var(--text-ink)]">
              {headline.includes("Let's make it real.") ? (
                <>
                  Have a big idea?{' '}
                  <span className="font-serif-editorial italic font-normal text-[var(--accent-orange)]">
                    Let&apos;s make it real.
                  </span>
                </>
              ) : (
                headline
              )}
            </h2>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            <p className="text-base text-[var(--text-muted)] leading-relaxed">{subtext}</p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="btn-studio-primary"
              >
                <span>{primaryLabel}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <Link href={secondaryHref} className="btn-studio-outline">
                {secondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
