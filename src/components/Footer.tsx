'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('submitting');
    setTimeout(() => {
      setStatus('done');
      setEmail('');
    }, 600);
  };

  return (
    <footer className="bg-[var(--bg-ink)] text-[#F2EFE7] border-t border-white/12">
      <div className="studio-container pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/12">
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div>
              <Link href="/" className="inline-block">
                <img
                  src="/images/clownbros-logo-light.png"
                  alt="ClownBros — We Code. We Create. We Elevate."
                  className="h-24 sm:h-28 w-auto object-contain"
                />
              </Link>
              <p className="mt-5 text-sm text-[#9E9B93] max-w-sm leading-relaxed">
                Playful brand. Serious engineering. Unconventional execution. Independent digital engineering studio building products, software, and AI systems.
              </p>
            </div>

            <div>
              <div className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#9E9B93] mb-3">
                Engineering Dispatch
              </div>
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-sm">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  aria-label="Email for engineering dispatch"
                  className="min-w-0 flex-1 bg-white/8 border border-white/15 rounded-full px-4 py-2.5 text-sm text-[#F2EFE7] placeholder:text-[#9E9B93] focus:outline-none focus:border-[var(--accent-orange)] transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="shrink-0 px-4 py-2.5 rounded-full bg-[var(--accent-orange)] text-[#F2EFE7] font-display text-xs font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {status === 'submitting' ? '...' : 'Join'}
                </button>
              </form>
              {status === 'done' && (
                <p className="mt-2 font-mono-tech text-xs text-[var(--accent-orange)]">
                  Subscribed — monthly engineering notes only.
                </p>
              )}
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#9E9B93] mb-4">
                Capabilities
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/services" className="text-[#F2EFE7]/85 hover:text-[var(--accent-orange)] transition-colors">All Services</Link></li>
                <li><Link href="/services/web-development" className="text-[#F2EFE7]/85 hover:text-[var(--accent-orange)] transition-colors">Web Development</Link></li>
                <li><Link href="/services/mobile-apps" className="text-[#F2EFE7]/85 hover:text-[var(--accent-orange)] transition-colors">Mobile Apps</Link></li>
                <li><Link href="/services/ui-ux-design" className="text-[#F2EFE7]/85 hover:text-[var(--accent-orange)] transition-colors">UI/UX Design</Link></li>
                <li><Link href="/services/cloud-devops" className="text-[#F2EFE7]/85 hover:text-[var(--accent-orange)] transition-colors">Cloud &amp; DevOps</Link></li>
                <li><Link href="/services/ai-solutions" className="text-[#F2EFE7]/85 hover:text-[var(--accent-orange)] transition-colors">AI Solutions</Link></li>
                <li><Link href="/services/seo-growth" className="text-[#F2EFE7]/85 hover:text-[var(--accent-orange)] transition-colors">SEO &amp; Growth</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#9E9B93] mb-4">
                Company
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/case-studies" className="text-[#F2EFE7]/85 hover:text-[var(--accent-orange)] transition-colors">Case Studies</Link></li>
                <li><Link href="/about" className="text-[#F2EFE7]/85 hover:text-[var(--accent-orange)] transition-colors">About</Link></li>
                <li><Link href="/process" className="text-[#F2EFE7]/85 hover:text-[var(--accent-orange)] transition-colors">Process</Link></li>
                <li><Link href="/trust" className="text-[#F2EFE7]/85 hover:text-[var(--accent-orange)] transition-colors">Trust &amp; Security</Link></li>
                <li><Link href="/careers" className="text-[#F2EFE7]/85 hover:text-[var(--accent-orange)] transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="text-[#F2EFE7]/85 hover:text-[var(--accent-orange)] transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h3 className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#9E9B93] mb-4">
                Direct Line
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a href="mailto:hello@clownbros.com" className="text-[#F2EFE7]/85 hover:text-[var(--accent-orange)] transition-colors">
                    hello@clownbros.com
                  </a>
                </li>
                <li>
                  <a href="tel:7303061282" className="text-[#F2EFE7]/85 hover:text-[var(--accent-orange)] transition-colors">
                    +91 73030 61282
                  </a>
                </li>
                <li className="pt-2 flex flex-wrap gap-3 font-mono-tech text-xs">
                  <a href="https://github.com/clownbros" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-[#9E9B93] hover:text-[#F2EFE7]">
                    GitHub <ArrowUpRight className="w-3 h-3" />
                  </a>
                  <a href="https://linkedin.com/company/clownbros" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-[#9E9B93] hover:text-[#F2EFE7]">
                    LinkedIn <ArrowUpRight className="w-3 h-3" />
                  </a>
                  <a href="https://x.com/clownbros" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-[#9E9B93] hover:text-[#F2EFE7]">
                    X <ArrowUpRight className="w-3 h-3" />
                  </a>
                  <a href="https://instagram.com/clownbros" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-[#9E9B93] hover:text-[#F2EFE7]">
                    Instagram <ArrowUpRight className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#9E9B93]">
          <p>&copy; {new Date().getFullYear()} ClownBros Digital Ltd. Remote / Global Engineering.</p>
          <div className="flex items-center gap-6">
            <Link href="/trust" className="hover:text-[#F2EFE7] transition-colors">
              Privacy &amp; NDAs
            </Link>
            <Link href="/trust" className="hover:text-[#F2EFE7] transition-colors">
              IP &amp; Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
