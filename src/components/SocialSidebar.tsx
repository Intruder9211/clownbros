'use client';

import React from 'react';

interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: React.ReactNode;
  color: string;
  hoverBg: string;
}

export default function SocialSidebar() {
  const socialLinks: SocialLink[] = [
    {
      id: 'whatsapp',
      name: 'Chat on WhatsApp',
      url: 'https://wa.me/917303061282?text=Hello%20ClownBros%2C%20I%20would%20like%20to%20discuss%20a%20project.',
      color: '#25D366',
      hoverBg: 'rgba(37, 211, 102, 0.12)',
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="#25D366">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      )
    },
    {
      id: 'linkedin',
      name: 'Connect on LinkedIn',
      url: 'https://linkedin.com/company/clownbros',
      color: '#0A66C2',
      hoverBg: 'rgba(10, 102, 194, 0.12)',
      icon: (
        <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="#0A66C2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect x="2" y="9" width="4" height="12"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      )
    },
    {
      id: 'instagram',
      name: 'Follow on Instagram',
      url: 'https://instagram.com/clownbros',
      color: '#E4405F',
      hoverBg: 'rgba(228, 64, 95, 0.12)',
      icon: (
        <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="#E4405F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      )
    },
    {
      id: 'x',
      name: 'Follow on X',
      url: 'https://x.com/clownbros',
      color: '#26231F',
      hoverBg: 'rgba(38, 35, 31, 0.1)',
      icon: (
        <svg viewBox="0 0 24 24" width="19" height="19" fill="#26231F">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      id: 'email',
      name: 'Direct Project Email',
      url: 'mailto:singhmohit101103@gmail.com?subject=Project%20Inquiry%20-%20ClownBros',
      color: '#C8AF7E',
      hoverBg: 'rgba(200, 175, 126, 0.15)',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#C8AF7E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      )
    }
  ];

  return (
    <aside className="sticky-social-bar" aria-label="Social and Direct Contact Channels">
      <div className="sticky-social-pill">
        {socialLinks.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`sticky-social-link link-${item.id}`}
            aria-label={item.name}
            style={{
              '--item-color': item.color,
              '--item-hover-bg': item.hoverBg
            } as React.CSSProperties}
          >
            <span className="sticky-social-icon">{item.icon}</span>
            <span className="sticky-social-tooltip">{item.name}</span>
          </a>
        ))}
      </div>
    </aside>
  );
}
