'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, WifiOff, Bell, Shield, Layers } from 'lucide-react';
import ContactModal from '@/components/ContactModal';
import StudioCTA from '@/components/StudioCTA';
import HeroAmbientBg from '@/components/HeroAmbientBg';

const SCREENS = [
  {
    id: 'sync',
    label: '01 Offline Sync',
    title: 'Local-First Storage',
    subtitle: 'SQLite & IndexedDB persistence with background conflict resolution.',
    badge: 'OFFLINE READY',
    items: ['Cached workspace state', 'Optimistic queue', 'Auto-reconcile on reconnect'],
  },
  {
    id: 'realtime',
    label: '02 Real-Time',
    title: 'WebSockets & Push',
    subtitle: 'Live order tracking, chat threads, and instant APNs/FCM notifications.',
    badge: 'LOW LATENCY',
    items: ['Bi-directional sockets', 'Background push handlers', 'Live status badges'],
  },
  {
    id: 'native',
    label: '03 Native APIs',
    title: 'Biometrics & Hardware',
    subtitle: 'FaceID, TouchID, camera capture, and secure keychain storage.',
    badge: 'IOS + ANDROID',
    items: ['Biometric auth gate', 'Encrypted token vault', '60fps native gestures'],
  },
];

export default function MobileAppsPage() {
  const [activeScreen, setActiveScreen] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const current = SCREENS[activeScreen];

  return (
    <main>
      <ContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        preSelectedService="Mobile App"
      />

      <section
        style={{ backgroundColor: 'var(--bg-s1)' }}
        className="text-[var(--text-ink)] pt-[88px] sm:pt-[92px] pb-3 sm:pb-4 px-3 sm:px-5"
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
            <div className="relative z-10">
          <div className="flex items-center gap-2 font-mono-tech text-xs text-[#6B6A65] mb-6">
            <Link href="/services" className="hover:text-[#F15A3B]">Services</Link>
            <span>/</span>
            <span className="text-[#F15A3B]">Mobile Apps</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h1 className="font-display text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.03]">
                Mobile software that feels{' '}
                <span className="font-serif-editorial italic font-normal text-[#3154D9]">
                  native in the hand.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-[#6B6A65] leading-relaxed max-w-xl">
                Cross-platform iOS and Android applications engineered with Flutter and React Native—featuring offline sync, real-time sockets, and end-to-end App Store publishing.
              </p>
              <button type="button" onClick={() => setModalOpen(true)} className="btn-studio-primary">
                <span>Build a Mobile App</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {/* Interactive Phone Mockup with Screen Transitions */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-[320px] rounded-[36px] bg-[#171817] text-[#F2EFE7] p-4 border-4 border-[#2A2B2A] shadow-2xl">
                <div className="w-20 h-4 bg-[#262726] rounded-full mx-auto mb-4" />
                <div className="rounded-2xl bg-[#202120] border border-[#F2EFE7]/10 p-5 min-h-[290px] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono-tech text-[10px] text-[#F15A3B]">{current.badge}</span>
                      <span className="w-2 h-2 rounded-full bg-[#3154D9]" />
                    </div>
                    <h2 className="font-display text-xl font-semibold">{current.title}</h2>
                    <p className="mt-2 text-xs text-[#9E9B93] leading-relaxed">{current.subtitle}</p>
                  </div>

                  <div className="space-y-2 mt-6">
                    {current.items.map((it) => (
                      <div key={it} className="px-3 py-2 rounded-lg bg-[#171817] border border-[#F2EFE7]/8 text-xs font-mono-tech">
                        ✓ {it}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Screen Switcher Tabs inside Device */}
                <div className="mt-4 grid grid-cols-3 gap-1.5">
                  {SCREENS.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setActiveScreen(idx)}
                      className={`py-2 px-1 rounded-xl font-mono-tech text-[10px] transition-colors ${
                        activeScreen === idx
                          ? 'bg-[#F15A3B] text-[#F2EFE7]'
                          : 'bg-[#222322] text-[#9E9B93] hover:text-[#F2EFE7]'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{ backgroundColor: 'var(--bg-s4)' }}
        className="text-[var(--text-ink)] py-20 sm:py-24"
      >
        <div className="studio-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Layers, title: 'Flutter & React Native', desc: 'Single-codebase velocity without sacrificing native frame rates.' },
            { icon: WifiOff, title: 'Offline-First Sync', desc: 'Local SQLite/IndexedDB persistence that works without connectivity.' },
            { icon: Bell, title: 'Real-Time & Push', desc: 'WebSockets, WebRTC, and reliable push notification pipelines.' },
            { icon: Shield, title: 'Store Publishing', desc: 'Complete Apple App Store and Google Play review & release management.' },
          ].map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.title} className="p-7 rounded-2xl bg-[#F2EFE7] border border-[#171817]/12">
                <Icon className="w-5 h-5 text-[#F15A3B] mb-4" />
                <h3 className="font-display text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-[#6B6A65] leading-relaxed">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <StudioCTA />
    </main>
  );
}
