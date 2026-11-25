'use client';

import React from 'react';
import { Mail, MessageCircle } from 'lucide-react';

const LINKS = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    href: 'https://wa.me/917303061282?text=Hello%20ClownBros%2C%20I%20would%20like%20to%20discuss%20a%20project.',
    renderIcon: () => <MessageCircle className="w-3.5 h-3.5" />,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/clownbros',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/clownbros',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://instagram.com/clownbros',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:hello@clownbros.com',
    renderIcon: () => <Mail className="w-3.5 h-3.5" />,
  },
];

export default function SocialSidebar() {
  return (
    <aside
      aria-label="Studio Social Links"
      className="fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col gap-2 bg-[#F2EFE7]/90 backdrop-blur-md border border-[#171817]/12 rounded-full p-1.5 shadow-sm"
    >
      {LINKS.map((item) => (
        <a
          key={item.id}
          href={item.href}
          target={item.id === 'email' ? undefined : '_blank'}
          rel={item.id === 'email' ? undefined : 'noopener noreferrer'}
          aria-label={item.label}
          title={item.label}
          className="w-8 h-8 rounded-full flex items-center justify-center text-[#171817]/70 hover:text-[#F2EFE7] hover:bg-[#171817] transition-colors"
        >
          {item.renderIcon()}
        </a>
      ))}
    </aside>
  );
}
