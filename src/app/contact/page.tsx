'use client';

import React, { useState } from 'react';
import { ArrowUpRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import HeroAmbientBg from '@/components/HeroAmbientBg';

const PROJECT_TYPES = [
  'Web Development',
  'Mobile App',
  'UI/UX Design',
  'Cloud & DevOps',
  'AI Solutions',
  'SEO & Growth',
];

const BUDGET_RANGES = ['$2k – $5k', '$5k – $15k', '$15k – $35k', '$35k+'];
const TIMELINES = ['Urgent (2–4 weeks)', 'Standard (4–8 weeks)', 'Full Build (8–12+ weeks)', 'Flexible'];

export default function ContactPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [projectTypes, setProjectTypes] = useState<string[]>([]);
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    details: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });

  const toggleType = (t: string) => {
    setProjectTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.details.trim()) {
      setStatus({ type: 'error', message: 'Please fill in your name, email, and project description.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: 'idle', message: '' });

    const compiledDetails = [
      formData.company ? `Company: ${formData.company}` : null,
      timeline ? `Target Timeline: ${timeline}` : null,
      `\nProject Description:\n${formData.details}`,
    ]
      .filter(Boolean)
      .join('\n');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Not provided',
          budget: budget || undefined,
          projectTypes,
          details: compiledDetails,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({
          type: 'success',
          message:
            'Project brief received. Our senior engineers will review your scope and reply within 24 hours.',
        });
        setFormData({ name: '', email: '', company: '', phone: '', details: '' });
        setProjectTypes([]);
        setBudget('');
        setTimeline('');
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to submit brief.' });
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Network error. You can reach us directly at hello@clownbros.com.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <section
        style={{ backgroundColor: 'var(--bg-s1)' }}
        className="text-[var(--text-ink)] pt-[88px] sm:pt-[92px] pb-6 sm:pb-8 px-3 sm:px-5"
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
            className="relative overflow-hidden w-full rounded-[24px] sm:rounded-[32px] px-5 sm:px-8 lg:px-12 py-10 sm:py-14 lg:py-16"
          >
            <HeroAmbientBg />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Editorial Info */}
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[#F15A3B] block">
              Guided Project Briefing
            </span>
            <h1 className="font-display text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.03]">
              Have a product vision?{' '}
              <span className="font-serif-editorial italic font-normal text-[#F15A3B]">
                Let&apos;s engineer it.
              </span>
            </h1>
            <p className="text-base text-[#6B6A65] leading-relaxed">
              Walk through a quick 3-step brief. Our engineering leads respond with a concrete architecture approach and milestone roadmap within 24 hours.
            </p>

            <div className="pt-6 border-t border-[#171817]/12 space-y-3 text-sm">
              <div>
                <span className="font-mono-tech text-[11px] uppercase tracking-widest text-[#6B6A65] block">
                  Direct Email
                </span>
                <a href="mailto:hello@clownbros.com" className="font-display font-medium hover:text-[#F15A3B]">
                  hello@clownbros.com
                </a>
              </div>
              {process.env.NEXT_PUBLIC_CONTACT_PHONE && (
                <div>
                  <span className="font-mono-tech text-[11px] uppercase tracking-widest text-[#6B6A65] block">
                    Direct Phone / WhatsApp
                  </span>
                  <a
                    href={`tel:${process.env.NEXT_PUBLIC_CONTACT_PHONE.replace(/\s+/g, '')}`}
                    className="font-display font-medium hover:text-[#F15A3B]"
                  >
                    {process.env.NEXT_PUBLIC_CONTACT_PHONE}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right Multi-Step Briefing Form */}
          <div className="lg:col-span-7 bg-[#E8E3D8]/75 border border-[#171817]/15 rounded-3xl p-6 sm:p-10">
            {/* Step Progress Indicator */}
            <div className="flex flex-nowrap items-center justify-between gap-2 overflow-x-auto no-scrollbar pb-5 mb-7 border-b border-[#171817]/12">
              {[
                { n: 1, label: '01 Scope' },
                { n: 2, label: '02 Budget & Time' },
                { n: 3, label: '03 Details' },
              ].map((s) => (
                <button
                  key={s.n}
                  type="button"
                  onClick={() => setStep(s.n as 1 | 2 | 3)}
                  className={`shrink-0 whitespace-nowrap font-mono-tech text-[11px] sm:text-xs px-3 py-1.5 rounded-full transition-colors ${
                    step === s.n
                      ? 'bg-[#171817] text-[#F2EFE7]'
                      : 'text-[#6B6A65] hover:text-[#171817]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {status.type !== 'idle' && (
              <div
                className={`mb-6 p-4 rounded-xl border text-sm flex items-start gap-3 ${
                  status.type === 'success'
                    ? 'bg-[#171817] text-[#F2EFE7] border-[#171817]'
                    : 'bg-[#F15A3B]/10 text-[#171817] border-[#F15A3B]'
                }`}
              >
                {status.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#F15A3B] shrink-0 mt-0.5" />}
                <span>{status.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <div className="space-y-5">
                  <h2 className="font-display text-2xl font-semibold">What are we building?</h2>
                  <div className="flex flex-wrap gap-2.5">
                    {PROJECT_TYPES.map((type) => {
                      const active = projectTypes.includes(type);
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => toggleType(type)}
                          className={`px-4 py-2.5 rounded-full text-sm font-medium border transition-colors ${
                            active
                              ? 'bg-[#171817] text-[#F2EFE7] border-[#171817]'
                              : 'bg-[#F2EFE7] text-[#171817] border-[#171817]/15 hover:border-[#171817]'
                          }`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                  <div className="pt-4 flex justify-end">
                    <button type="button" onClick={() => setStep(2)} className="btn-studio-primary">
                      Continue <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-2xl font-semibold mb-3">Estimated Budget</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {BUDGET_RANGES.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setBudget(b)}
                          className={`p-3.5 rounded-xl text-sm font-medium border text-left transition-colors ${
                            budget === b
                              ? 'bg-[#171817] text-[#F2EFE7] border-[#171817]'
                              : 'bg-[#F2EFE7] text-[#171817] border-[#171817]/15 hover:border-[#171817]'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="font-display text-xl font-semibold mb-3">Target Timeline</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {TIMELINES.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTimeline(t)}
                          className={`p-3.5 rounded-xl text-sm font-medium border text-left transition-colors ${
                            timeline === t
                              ? 'bg-[#171817] text-[#F2EFE7] border-[#171817]'
                              : 'bg-[#F2EFE7] text-[#171817] border-[#171817]/15 hover:border-[#171817]'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button type="button" onClick={() => setStep(1)} className="btn-studio-outline !py-2.5 !px-4 !text-xs">
                      <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>
                    <button type="button" onClick={() => setStep(3)} className="btn-studio-primary">
                      Continue <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h2 className="font-display text-2xl font-semibold">Your Contact &amp; Brief</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="Full Name *"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#F2EFE7] border border-[#171817]/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#F15A3B]"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Work Email *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#F2EFE7] border border-[#171817]/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#F15A3B]"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Company / Organization"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-[#F2EFE7] border border-[#171817]/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#F15A3B]"
                    />
                    <input
                      type="tel"
                      placeholder="Phone / WhatsApp (Optional)"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#F2EFE7] border border-[#171817]/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#F15A3B]"
                    />
                  </div>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe what you're building, core goals, or existing codebase needs *"
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full bg-[#F2EFE7] border border-[#171817]/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#F15A3B] resize-none"
                  />

                  <div className="pt-2 flex items-center justify-between gap-4">
                    <button type="button" onClick={() => setStep(2)} className="btn-studio-outline !py-2.5 !px-4 !text-xs">
                      <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-studio-accent disabled:opacity-60"
                    >
                      <span>{isSubmitting ? 'Sending Brief...' : 'Submit Project Brief'}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
          </div>
        </div>
      </section>
    </main>
  );
}
