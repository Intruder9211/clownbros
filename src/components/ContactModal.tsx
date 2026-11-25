'use client';

import React, { useState, useEffect } from 'react';
import { X, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useScrollLock } from '@/lib/useScrollLock';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedService?: string;
}

export default function ContactModal({ isOpen, onClose, preSelectedService }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    details: '',
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  const baseServices = [
    'Web Development',
    'Mobile App',
    'UI/UX Design',
    'Cloud & DevOps',
    'AI Solutions',
    'SEO & Growth',
  ];

  const availableServices =
    preSelectedService && !baseServices.includes(preSelectedService)
      ? [...baseServices, preSelectedService]
      : baseServices;

  useScrollLock(isOpen);

  useEffect(() => {
    if (isOpen) {
      if (preSelectedService) {
        const id = requestAnimationFrame(() => setSelectedServices([preSelectedService]));
        return () => cancelAnimationFrame(id);
      }
    } else {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
        setSelectedServices([]);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isOpen, preSelectedService]);

  if (!isOpen) return null;

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Not provided',
          budget: formData.budget || undefined,
          details: formData.details,
          projectTypes: selectedServices,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSubmitStatus({
          success: true,
          message: 'Brief received. Our engineering leads will respond within 24 hours.',
        });
        setFormData({ name: '', email: '', phone: '', budget: '', details: '' });
        setSelectedServices([]);
      } else {
        setSubmitStatus({
          success: false,
          message: data.error || 'Failed to submit brief. Please try again.',
        });
      }
    } catch {
      setSubmitStatus({
        success: false,
        message: 'Network error while submitting. Please email hello@clownbros.com directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[90] bg-[#171817]/65 backdrop-blur-sm flex items-center justify-center p-5 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      {/* Gradient Frame Popup Container */}
      <div
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
        style={{
          background:
            'linear-gradient(135deg, var(--accent-orange) 0%, var(--accent-cobalt) 50%, var(--accent-orange) 100%)',
        }}
        className="w-full max-w-[520px] p-[2px] rounded-[26px] shadow-2xl"
      >
        <div
          style={{ backgroundColor: 'var(--bg-s1)' }}
          className="relative w-full text-[var(--text-ink)] rounded-[24px] p-5 sm:p-7 max-h-[78dvh] overflow-y-auto no-scrollbar"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 w-8 h-8 rounded-full border border-[var(--border-hairline)] flex items-center justify-center text-[var(--text-ink)] hover:bg-[var(--bg-ink)] hover:text-[#F2EFE7] transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="mb-4 pr-8">
            <span className="font-mono-tech text-[10px] uppercase tracking-[0.14em] text-[var(--accent-orange)]">
              Project Briefing
            </span>
            <h2 id="modal-project-title" className="font-display text-xl sm:text-2xl font-semibold mt-0.5 leading-tight">
              Start a Project with ClownBros
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
              Share your scope — we respond with an architecture plan within 24 hours.
            </p>
          </div>

          {submitStatus && (
            <div
              className={`mb-4 p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                submitStatus.success
                  ? 'bg-[#171817] text-[#F2EFE7] border-[#171817]'
                  : 'bg-[var(--accent-orange)]/10 text-[var(--text-ink)] border-[var(--accent-orange)]'
              }`}
            >
              {submitStatus.success && <CheckCircle2 className="w-4 h-4 text-[var(--accent-orange)] shrink-0 mt-0.5" />}
              <span>{submitStatus.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block font-mono-tech text-[10px] uppercase tracking-[0.1em] text-[var(--text-muted)] mb-1.5">
                Focus Areas
              </label>
              <div className="flex flex-nowrap sm:flex-wrap overflow-x-auto no-scrollbar gap-1.5 pb-0.5">
                {availableServices.map((srv) => {
                  const active = selectedServices.includes(srv);
                  return (
                    <button
                      key={srv}
                      type="button"
                      onClick={() => toggleService(srv)}
                      className={`shrink-0 whitespace-nowrap px-3 py-1 rounded-full text-[11px] font-medium border transition-colors ${
                        active
                          ? 'bg-[var(--bg-ink)] text-[#F2EFE7] border-[var(--bg-ink)]'
                          : 'bg-white/60 text-[var(--text-ink)] border-[var(--border-hairline)] hover:border-[var(--text-ink)]'
                      }`}
                    >
                      {srv}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-mono-tech text-[10px] uppercase tracking-[0.1em] text-[var(--text-muted)] mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full bg-white/80 border border-[var(--border-hairline)] rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:border-[var(--accent-orange)]"
                />
              </div>
              <div>
                <label className="block font-mono-tech text-[10px] uppercase tracking-[0.1em] text-[var(--text-muted)] mb-1">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@company.com"
                  className="w-full bg-white/80 border border-[var(--border-hairline)] rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:border-[var(--accent-orange)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-mono-tech text-[10px] uppercase tracking-[0.1em] text-[var(--text-muted)] mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 / +91 ..."
                  className="w-full bg-white/80 border border-[var(--border-hairline)] rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:border-[var(--accent-orange)]"
                />
              </div>
              <div>
                <label className="block font-mono-tech text-[10px] uppercase tracking-[0.1em] text-[var(--text-muted)] mb-1">
                  Estimated Budget
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full bg-white/80 border border-[var(--border-hairline)] rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:border-[var(--accent-orange)]"
                >
                  <option value="">Select range</option>
                  <option value="$2k - $5k">$2k – $5k</option>
                  <option value="$5k - $15k">$5k – $15k</option>
                  <option value="$15k - $35k">$15k – $35k</option>
                  <option value="$35k+">$35k+</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-mono-tech text-[10px] uppercase tracking-[0.1em] text-[var(--text-muted)] mb-1">
                Project Brief *
              </label>
              <textarea
                rows={2}
                required
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                placeholder="What are you building and what is your target timeline?"
                className="w-full bg-white/80 border border-[var(--border-hairline)] rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:border-[var(--accent-orange)] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-studio-primary w-full justify-center !py-3 !text-xs sm:!text-sm disabled:opacity-60"
            >
              <span>{isSubmitting ? 'Sending Brief...' : 'Send Project Brief'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
