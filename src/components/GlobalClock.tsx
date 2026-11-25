'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Clock } from 'lucide-react';

const TIMEZONES = [
  { label: 'IST', name: 'India', tz: 'Asia/Kolkata' },
  { label: 'EST', name: 'New York', tz: 'America/New_York' },
  { label: 'GMT', name: 'London', tz: 'Europe/London' },
  { label: 'GST', name: 'Dubai', tz: 'Asia/Dubai' },
  { label: 'AEST', name: 'Sydney', tz: 'Australia/Sydney' },
];

export default function GlobalClock() {
  const [selectedTz, setSelectedTz] = useState(TIMEZONES[0]);
  const [timeStr, setTimeStr] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat('en-US', {
        timeZone: selectedTz.tz,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(now);
      setTimeStr(formatted);
    };
    update();
    const id = setInterval(update, 15000);
    return () => clearInterval(id);
  }, [selectedTz]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!timeStr) return null;

  return (
    <div ref={ref} className="fixed bottom-5 left-5 z-40 hidden md:block">
      {isOpen && (
        <div className="mb-2 bg-[#171817] text-[#F2EFE7] border border-[#F2EFE7]/15 rounded-xl p-2 shadow-xl w-44">
          <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[#9E9B93] px-2 py-1">
            Studio Timezone
          </div>
          {TIMEZONES.map((tz) => (
            <button
              key={tz.tz}
              type="button"
              onClick={() => {
                setSelectedTz(tz);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                selectedTz.tz === tz.tz
                  ? 'bg-[#F15A3B] text-[#F2EFE7]'
                  : 'text-[#F2EFE7]/80 hover:bg-[#F2EFE7]/10'
              }`}
            >
              <span>{tz.name}</span>
              <span className="font-mono-tech text-[10px] opacity-80">{tz.label}</span>
            </button>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle studio timezone"
        className="flex items-center gap-2 bg-[#F2EFE7]/90 backdrop-blur-md text-[#171817] border border-[#171817]/15 rounded-full px-3.5 py-2 shadow-sm hover:border-[#171817] transition-colors"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#F15A3B]" />
        <Clock className="w-3.5 h-3.5 text-[#6B6A65]" />
        <span className="font-mono-tech text-[11px] font-medium tracking-wide">
          {selectedTz.label} {timeStr}
        </span>
      </button>
    </div>
  );
}
