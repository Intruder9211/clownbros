'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUpRight, X, CheckCircle2 } from 'lucide-react';
import HeroFrame from '@/components/HeroFrame';
import { useScrollLock } from '@/lib/useScrollLock';

interface Gig {
  id: string;
  title: string;
  category: string;
  type: string;
  rate: string;
  location: string;
  skills: string[];
  description: string;
  featured?: boolean;
}

const FALLBACK_GIGS: Gig[] = [
  {
    id: 'gig-1',
    title: 'Next.js & React Frontend Developer',
    category: 'Frontend',
    type: 'Contract / 15-30 hrs/wk',
    rate: '$18 - $30 / hr',
    location: 'Remote (Global)',
    skills: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Web Vitals'],
    description: 'Building modern, high-performance web app frontends and editorial interfaces.',
    featured: true,
  },
];

const CATEGORIES = ['All', 'Frontend', 'Mobile', 'Backend', 'Design', 'AI/ML', 'DevOps'];
const SKILL_TAGS = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Flutter', 'Figma', 'Python', 'AWS', 'Docker', 'PostgreSQL'];

export default function CareersPage() {
  const [gigs, setGigs] = useState<Gig[]>(FALLBACK_GIGS);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedGig, setSelectedGig] = useState<Gig | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useScrollLock(isModalOpen);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    portfolio: '',
    track: 'Frontend Development',
    experience: '1-3 years',
    hourlyRate: '$20 - $35 / hr',
    availability: '20-30 hours/week',
    pitch: '',
  });
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch('/api/careers', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (mounted && data?.success && Array.isArray(data.jobs) && data.jobs.length > 0) {
          setGigs(data.jobs);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const filteredGigs =
    activeFilter === 'All'
      ? gigs
      : gigs.filter((g) => g.category.toLowerCase() === activeFilter.toLowerCase());

  const openApply = (gig?: Gig) => {
    setSelectedGig(gig || null);
    if (gig) setFormData((prev) => ({ ...prev, track: gig.title }));
    setSubmitResult(null);
    setIsModalOpen(true);
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);
    try {
      const res = await fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          selectedSkills,
          jobId: selectedGig?.id || null,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitResult({ success: true, message: data.message });
        setFormData({
          fullName: '',
          email: '',
          portfolio: '',
          track: 'Frontend Development',
          experience: '1-3 years',
          hourlyRate: '$20 - $35 / hr',
          availability: '20-30 hours/week',
          pitch: '',
        });
        setSelectedSkills([]);
      } else {
        setSubmitResult({ success: false, message: data.error || 'Submission failed.' });
      }
    } catch {
      setSubmitResult({ success: false, message: 'Network error submitting application.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <HeroFrame>
        <span className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[#F15A3B] block mb-4">
          Talent &amp; Freelancer Network
        </span>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.03]">
              Build with builders,{' '}
              <span className="font-serif-editorial italic font-normal text-[#F15A3B]">
                from anywhere.
              </span>
            </h1>
          </div>
          <div className="lg:col-span-4 space-y-5">
            <p className="text-base text-[#6B6A65] leading-relaxed">
              Remote-first engineering and design contracts paid in USD. Async-friendly, clear specs, and zero micromanagement.
            </p>
            <button type="button" onClick={() => openApply()} className="btn-studio-primary">
              <span>Apply to Network</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </HeroFrame>

      {/* Open Roles */}
      <section
        id="gigs"
        style={{ backgroundColor: 'var(--bg-s4)' }}
        className="text-[var(--text-ink)] py-16 sm:py-24"
      >
        <div className="studio-container">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold">Open Opportunities</h2>
            <div className="flex flex-nowrap md:flex-wrap overflow-x-auto no-scrollbar gap-2 w-full md:w-auto -mx-1 px-1 pb-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveFilter(cat)}
                  className={`shrink-0 whitespace-nowrap px-3.5 py-1.5 rounded-full font-display text-xs font-medium border transition-colors ${
                    activeFilter === cat
                      ? 'bg-[#171817] text-[#F2EFE7] border-[#171817]'
                      : 'bg-transparent text-[#171817] border-[#171817]/20 hover:border-[#171817]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="font-mono-tech text-xs text-[#6B6A65] py-12">Loading roles...</div>
          ) : (
            <div className="divide-y divide-[#171817]/12 border-y border-[#171817]/12">
              {filteredGigs.map((gig) => (
                <div
                  key={gig.id}
                  className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
                >
                  <div className="lg:col-span-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono-tech text-[11px] uppercase tracking-widest text-[#F15A3B]">
                        {gig.category}
                      </span>
                      <span className="font-mono-tech text-[11px] text-[#6B6A65]">
                        {gig.location}
                      </span>
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-semibold">{gig.title}</h3>
                    <p className="mt-2 text-sm text-[#6B6A65]">{gig.description}</p>
                  </div>

                  <div className="lg:col-span-4 space-y-2">
                    <div className="font-mono-tech text-xs text-[#171817]">
                      {gig.rate} &middot; {gig.type}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {gig.skills.slice(0, 4).map((s) => (
                        <span
                          key={s}
                          className="font-mono-tech text-[10px] px-2.5 py-0.5 rounded-full border border-[#171817]/15"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-2 flex lg:justify-end">
                    <button
                      type="button"
                      onClick={() => openApply(gig)}
                      className="btn-studio-outline !py-2.5 !px-5 !text-xs"
                    >
                      Apply <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Application Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[90] bg-[#171817]/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            data-lenis-prevent
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-[#F2EFE7] text-[#171817] border border-[#171817]/15 rounded-2xl p-6 sm:p-10 shadow-2xl my-auto max-h-[90vh] overflow-y-auto"
          >
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close application form"
              className="absolute top-5 right-5 w-9 h-9 rounded-full border border-[#171817]/15 flex items-center justify-center hover:bg-[#171817] hover:text-[#F2EFE7]"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="font-mono-tech text-xs uppercase tracking-widest text-[#F15A3B]">
              Talent Application
            </span>
            <h2 className="font-display text-2xl font-semibold mt-1 mb-6">
              {selectedGig ? `Apply: ${selectedGig.title}` : 'Join the ClownBros Network'}
            </h2>

            {submitResult && (
              <div
                className={`mb-5 p-4 rounded-xl border text-sm flex items-start gap-2.5 ${
                  submitResult.success
                    ? 'bg-[#171817] text-[#F2EFE7] border-[#171817]'
                    : 'bg-[#F15A3B]/10 text-[#171817] border-[#F15A3B]'
                }`}
              >
                {submitResult.success && <CheckCircle2 className="w-4 h-4 text-[#F15A3B] shrink-0 mt-0.5" />}
                <span>{submitResult.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Full Name *"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-white/70 border border-[#171817]/15 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#F15A3B]"
                />
                <input
                  type="email"
                  required
                  placeholder="Email *"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/70 border border-[#171817]/15 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#F15A3B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="url"
                  placeholder="GitHub / Portfolio URL"
                  value={formData.portfolio}
                  onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                  className="w-full bg-white/70 border border-[#171817]/15 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#F15A3B]"
                />
                <input
                  type="text"
                  required
                  placeholder="Primary Track *"
                  value={formData.track}
                  onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                  className="w-full bg-white/70 border border-[#171817]/15 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#F15A3B]"
                />
              </div>

              <div>
                <div className="font-mono-tech text-[11px] uppercase tracking-wider text-[#6B6A65] mb-2">
                  Core Skills
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {SKILL_TAGS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSkill(s)}
                      className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                        selectedSkills.includes(s)
                          ? 'bg-[#171817] text-[#F2EFE7] border-[#171817]'
                          : 'border-[#171817]/20 text-[#171817]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                rows={3}
                placeholder="Tell us about something challenging you built recently..."
                value={formData.pitch}
                onChange={(e) => setFormData({ ...formData, pitch: e.target.value })}
                className="w-full bg-white/70 border border-[#171817]/15 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#F15A3B] resize-none"
              />

              <button type="submit" disabled={isSubmitting} className="btn-studio-primary w-full justify-center">
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
