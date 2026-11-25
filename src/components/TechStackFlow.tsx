'use client';

import React from 'react';
import {
  Cloud,
  Container,
  GitBranch,
  Database,
  Code2,
  Cpu,
  Smartphone,
  PenTool,
  Globe,
  Layers,
  Search,
  BarChart3,
  Zap,
  CreditCard,
  FileCode2,
  BookOpen,
} from 'lucide-react';

function getTechIcon(tech: string) {
  const lower = tech.toLowerCase();
  if (lower.includes('aws') || lower.includes('vercel')) return Cloud;
  if (lower.includes('docker')) return Container;
  if (lower.includes('github') || lower.includes('ci') || lower.includes('linear') || lower.includes('service')) return GitBranch;
  if (lower.includes('postgres') || lower.includes('pgvector') || lower.includes('indexeddb')) return Database;
  if (lower.includes('flutter') || lower.includes('react native') || lower.includes('swift') || lower.includes('pwa')) return Smartphone;
  if (lower.includes('figma') || lower.includes('design')) return PenTool;
  if (lower.includes('openai') || lower.includes('langchain') || lower.includes('rag') || lower.includes('llm') || lower.includes('ai')) return Cpu;
  if (lower.includes('seo') || lower.includes('schema')) return Search;
  if (lower.includes('analytics')) return BarChart3;
  if (lower.includes('vitals') || lower.includes('websocket') || lower.includes('edge')) return Zap;
  if (lower.includes('stripe')) return CreditCard;
  if (lower.includes('ast') || lower.includes('elementor')) return FileCode2;
  if (lower.includes('pdf')) return BookOpen;
  if (lower.includes('next') || lower.includes('react') || lower.includes('ssr')) return Globe;
  if (lower.includes('tailwind')) return Layers;
  return Code2;
}

interface TechStackFlowProps {
  label: string;
  items: string[];
}

export default function TechStackFlow({ label, items }: TechStackFlowProps) {
  return (
    <div>
      <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-2.5">
        {label}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {items.map((tech, idx) => {
          const TechIcon = getTechIcon(tech);
          return (
            <React.Fragment key={tech}>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/80 shadow-xs transition-transform duration-300 group-hover:-translate-y-0.5">
                <TechIcon
                  className="w-3.5 h-3.5 text-[var(--accent-orange)] animate-icon-float shrink-0"
                  style={{ animationDelay: `${idx * 160}ms` }}
                />
                <span className="font-mono-tech text-[10px] font-medium text-[var(--text-ink)] whitespace-nowrap">
                  {tech}
                </span>
              </div>
              {idx < items.length - 1 && (
                <span
                  aria-hidden="true"
                  className="w-2.5 h-[1.5px] bg-gradient-to-r from-[var(--accent-orange)]/60 to-[var(--accent-cobalt)]/60 rounded-full animate-pulse"
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
