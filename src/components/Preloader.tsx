'use client';

import React, { useEffect, useState } from 'react';
import { useScrollLock } from '@/lib/useScrollLock';

const RINGS = [
  { inset: '40%', delay: '0s', z: 5, borderOpacity: 0.55 },
  { inset: '30%', delay: '0.2s', z: 4, borderOpacity: 0.42 },
  { inset: '20%', delay: '0.4s', z: 3, borderOpacity: 0.3 },
  { inset: '10%', delay: '0.6s', z: 2, borderOpacity: 0.2 },
  { inset: '0%', delay: '0.8s', z: 1, borderOpacity: 0.12 },
];

export default function Preloader() {
  const [fadingOut, setFadingOut] = useState(false);
  const [mounted, setMounted] = useState(true);

  useScrollLock(mounted && !fadingOut);

  useEffect(() => {
    let minTimer: ReturnType<typeof setTimeout> | null = null;
    let fadeTimer: ReturnType<typeof setTimeout> | null = null;
    let failsafeTimer: ReturnType<typeof setTimeout> | null = null;

    const dismiss = () => {
      setFadingOut(true);
      fadeTimer = setTimeout(() => setMounted(false), 480);
    };

    const scheduleReadyDismiss = () => {
      minTimer = setTimeout(dismiss, 550);
    };

    if (document.readyState === 'complete') {
      scheduleReadyDismiss();
    } else {
      window.addEventListener('load', scheduleReadyDismiss, { once: true });
    }

    // Hard failsafe so loader never gets stuck if an external asset stalls
    failsafeTimer = setTimeout(dismiss, 1600);

    return () => {
      window.removeEventListener('load', scheduleReadyDismiss);
      if (minTimer) clearTimeout(minTimer);
      if (fadeTimer) clearTimeout(fadeTimer);
      if (failsafeTimer) clearTimeout(failsafeTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      role="status"
      aria-label="Loading ClownBros"
      style={{ backgroundColor: 'var(--bg-ink)' }}
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500 ease-out ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative w-[210px] h-[210px] sm:w-[260px] sm:h-[260px] flex items-center justify-center">
        {/* Five Concentric Ripple Layers */}
        {RINGS.map((ring, idx) => (
          <div
            key={ring.inset}
            aria-hidden="true"
            style={{
              inset: ring.inset,
              zIndex: ring.z,
              animationDelay: ring.delay,
              borderColor:
                idx === 0
                  ? 'var(--accent-orange)'
                  : idx === 1
                  ? 'var(--accent-cobalt)'
                  : `rgba(242, 239, 231, ${ring.borderOpacity})`,
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
              boxShadow: '0 10px 28px rgba(0, 0, 0, 0.25)',
            }}
            className="animate-preloader-ripple absolute rounded-full border"
          />
        ))}

        {/* Exact Center: Final Transparent PNG Mark */}
        <div className="relative z-10 animate-preloader-eye flex items-center justify-center">
          <img
            src="/images/clownbros-mark-light.png"
            alt="ClownBros"
            className="w-20 sm:w-24 h-auto object-contain select-none"
          />
        </div>
      </div>
    </div>
  );
}
