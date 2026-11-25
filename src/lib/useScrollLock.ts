'use client';

import { useEffect } from 'react';

export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.classList.add('lenis-stopped');

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.documentElement.classList.remove('lenis-stopped');
    };
  }, [locked]);
}
