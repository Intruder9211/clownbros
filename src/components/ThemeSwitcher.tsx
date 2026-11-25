'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Palette } from 'lucide-react';
import { STUDIO_THEMES, useStudioTheme } from './ThemeProvider';

export default function ThemeSwitcher() {
  const { theme, setThemeById } = useStudioTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onOutside);
    window.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onOutside);
      window.removeEventListener('keydown', onEsc);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={`Change color theme (current: ${theme.name})`}
        aria-expanded={open}
        className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-paper)]/85 hover:border-[var(--text-ink)] transition-colors"
      >
        <Palette className="w-4 h-4 transition-colors" style={{ color: theme.accent }} />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Select Color Theme"
          className="absolute left-1/2 -translate-x-1/2 top-full mt-2 rounded-full bg-[var(--bg-ink)] border border-white/15 p-2 shadow-2xl z-[80]"
        >
          <div className="flex flex-col items-center gap-2 max-h-[65vh] overflow-y-auto no-scrollbar py-0.5">
            {STUDIO_THEMES.map((t) => {
              const isActive = t.id === theme.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="menuitemradio"
                  aria-checked={isActive}
                  aria-label={t.name}
                  title={t.name}
                  onClick={() => {
                    setThemeById(t.id);
                    setOpen(false);
                  }}
                  className={`w-6 h-6 rounded-full border shrink-0 transition-transform hover:scale-110 ${
                    isActive
                      ? 'border-white ring-2 ring-white ring-offset-2 ring-offset-[#171817] scale-105'
                      : 'border-white/25'
                  }`}
                  style={{ backgroundColor: t.accent }}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
