'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface StudioTheme {
  id: string;
  name: string;
  paper: string;
  s1: string; // Hero
  s2: string; // Proof / Secondary
  s3: string; // Selected Works / Warm tint
  s4: string; // Services / Neutral tint
  s5: string; // Philosophy / Sage tint
  s6: string; // FAQs / Lavender tint
  ink: string;
  inkSoft: string;
  muted: string;
  accent: string;
  cobalt: string;
}

export const STUDIO_THEMES: StudioTheme[] = [
  {
    id: 'warm-paper',
    name: 'Warm Paper',
    paper: '#F2EFE7',
    s1: '#F2EFE7',
    s2: '#EAE9E4',
    s3: '#FCEAE2',
    s4: '#EAF0F8',
    s5: '#EAF0E8',
    s6: '#F0EDF8',
    ink: '#171817',
    inkSoft: '#222322',
    muted: '#6B6A65',
    accent: '#F15A3B',
    cobalt: '#3154D9',
  },
  {
    id: 'editorial-cream',
    name: 'Editorial Cream',
    paper: '#F8F4EA',
    s1: '#F8F4EA',
    s2: '#EDE8DF',
    s3: '#F5E6DC',
    s4: '#E8EEF5',
    s5: '#E8EFE9',
    s6: '#EFEBF7',
    ink: '#191816',
    inkSoft: '#252320',
    muted: '#69655E',
    accent: '#D94F30',
    cobalt: '#2347B8',
  },
  {
    id: 'sage-moss',
    name: 'Sage & Moss',
    paper: '#F1F4EE',
    s1: '#F1F4EE',
    s2: '#E6ECE2',
    s3: '#F2ECE4',
    s4: '#E3ECEC',
    s5: '#DCE6DA',
    s6: '#ECEEE8',
    ink: '#141B16',
    inkSoft: '#1E2720',
    muted: '#5D6860',
    accent: '#2D6A4F',
    cobalt: '#D95D39',
  },
  {
    id: 'cobalt-draft',
    name: 'Cobalt Draft',
    paper: '#EEF2F8',
    s1: '#EEF2F8',
    s2: '#E3E9F4',
    s3: '#F4EAE6',
    s4: '#E5EBF5',
    s5: '#E8F0EC',
    s6: '#ECEAF6',
    ink: '#131722',
    inkSoft: '#1D2230',
    muted: '#5D6475',
    accent: '#2447C4',
    cobalt: '#E85D3F',
  },
  {
    id: 'peach-ink',
    name: 'Peach & Ink',
    paper: '#FAF0EA',
    s1: '#FAF0EA',
    s2: '#F2EAE5',
    s3: '#F6E3D8',
    s4: '#EAEFF5',
    s5: '#EAF0EA',
    s6: '#F1EBF6',
    ink: '#1A1615',
    inkSoft: '#26201E',
    muted: '#6E6460',
    accent: '#E04F33',
    cobalt: '#2C49B8',
  },
  {
    id: 'lavender-studio',
    name: 'Lavender Studio',
    paper: '#F3F0F8',
    s1: '#F3F0F8',
    s2: '#EEECEF',
    s3: '#F5EBF1',
    s4: '#E8EFF7',
    s5: '#EAF0EC',
    s6: '#EAE5F4',
    ink: '#18161E',
    inkSoft: '#23202B',
    muted: '#676372',
    accent: '#6D3FD1',
    cobalt: '#E35638',
  },
  {
    id: 'blush-atelier',
    name: 'Blush Atelier',
    paper: '#F7EFF1',
    s1: '#F7EFF1',
    s2: '#EFEAEB',
    s3: '#F2E4E7',
    s4: '#EAEFF6',
    s5: '#EAF0EB',
    s6: '#F0ECF6',
    ink: '#1C1517',
    inkSoft: '#281F22',
    muted: '#6E6165',
    accent: '#C93B5B',
    cobalt: '#2D4EC4',
  },
  {
    id: 'monochrome-stone',
    name: 'Monochrome Stone',
    paper: '#F0F0EE',
    s1: '#F0F0EE',
    s2: '#E6E6E3',
    s3: '#ECECEA',
    s4: '#E4E6E8',
    s5: '#E8EAE6',
    s6: '#EAE8EC',
    ink: '#171817',
    inkSoft: '#242524',
    muted: '#636360',
    accent: '#171817',
    cobalt: '#F15A3B',
  },
  {
    id: 'amber-ochre',
    name: 'Amber Ochre',
    paper: '#FBF5EA',
    s1: '#FBF5EA',
    s2: '#F2E9DA',
    s3: '#F9E8D2',
    s4: '#EAF0F4',
    s5: '#ECF1E8',
    s6: '#F3EDF4',
    ink: '#1C1712',
    inkSoft: '#29211A',
    muted: '#6E6356',
    accent: '#D97706',
    cobalt: '#2B50B8',
  },
  {
    id: 'teal-harbor',
    name: 'Teal Harbor',
    paper: '#EEF5F4',
    s1: '#EEF5F4',
    s2: '#E2ECEA',
    s3: '#F6EBE4',
    s4: '#E4EFF2',
    s5: '#E3EFE9',
    s6: '#ECEAF4',
    ink: '#121C1B',
    inkSoft: '#1B2826',
    muted: '#5A6B69',
    accent: '#0F766E',
    cobalt: '#E35638',
  },
  {
    id: 'crimson-press',
    name: 'Crimson Press',
    paper: '#F7F1F0',
    s1: '#F7F1F0',
    s2: '#EFE6E4',
    s3: '#F7E3E0',
    s4: '#EAEFF6',
    s5: '#EAF0EB',
    s6: '#F0ECF5',
    ink: '#1A1313',
    inkSoft: '#261C1C',
    muted: '#6D5E5E',
    accent: '#B91C1C',
    cobalt: '#2447C4',
  },
  {
    id: 'midnight-indigo',
    name: 'Midnight Indigo',
    paper: '#F0F2F8',
    s1: '#F0F2F8',
    s2: '#E5E8F2',
    s3: '#F4EAE6',
    s4: '#E3E8F5',
    s5: '#E7EFEA',
    s6: '#ECE9F6',
    ink: '#131624',
    inkSoft: '#1D2134',
    muted: '#5B6178',
    accent: '#1E3A8A',
    cobalt: '#F15A3B',
  },
];

interface ThemeContextValue {
  theme: StudioTheme;
  setThemeById: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: STUDIO_THEMES[0],
  setThemeById: () => {},
});

export function useStudioTheme() {
  return useContext(ThemeContext);
}

function applyThemeVars(t: StudioTheme) {
  const root = document.documentElement;
  root.style.setProperty('--bg-paper', t.paper);
  root.style.setProperty('--bg-paper-alt', t.s2);
  root.style.setProperty('--bg-s1', t.s1);
  root.style.setProperty('--bg-s2', t.s2);
  root.style.setProperty('--bg-s3', t.s3);
  root.style.setProperty('--bg-s4', t.s4);
  root.style.setProperty('--bg-s5', t.s5);
  root.style.setProperty('--bg-s6', t.s6);
  root.style.setProperty('--bg-ink', t.ink);
  root.style.setProperty('--bg-ink-elevated', t.inkSoft);
  root.style.setProperty('--text-ink', t.ink);
  root.style.setProperty('--text-muted', t.muted);
  root.style.setProperty('--accent-orange', t.accent);
  root.style.setProperty('--accent-cobalt', t.cobalt);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<StudioTheme>(STUDIO_THEMES[0]);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('clownbros-theme');
      if (saved) {
        const found = STUDIO_THEMES.find((t) => t.id === saved);
        if (found) {
          applyThemeVars(found);
          const id = requestAnimationFrame(() => setTheme(found));
          return () => cancelAnimationFrame(id);
        }
      }
    } catch {
      // Ignore storage access errors
    }
    applyThemeVars(STUDIO_THEMES[0]);
  }, []);

  const setThemeById = (id: string) => {
    const found = STUDIO_THEMES.find((t) => t.id === id);
    if (!found) return;
    setTheme(found);
    applyThemeVars(found);
    try {
      sessionStorage.setItem('clownbros-theme', found.id);
    } catch {
      // Ignore storage access errors
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setThemeById }}>
      {children}
    </ThemeContext.Provider>
  );
}
