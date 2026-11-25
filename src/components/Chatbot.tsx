'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  suggestions?: string[];
  cta?: { text: string; link: string };
}

const RESPONSES: {
  keywords: string[];
  answer: string;
  suggestions?: string[];
  cta?: { text: string; link: string };
}[] = [
  {
    keywords: ['hello', 'hi', 'hey', 'who'],
    answer:
      "Hey — welcome to ClownBros. Ask me about our engineering capabilities, proprietary products, timelines, or how we work.",
    suggestions: ['Capabilities', 'Our Products', 'Timelines', 'Start a Project'],
  },
  {
    keywords: ['web', 'next', 'react', 'frontend', 'ecommerce', 'site'],
    answer:
      'We engineer high-performance web applications, SaaS portals, and headless commerce storefronts on Next.js, React, and TypeScript.',
    suggestions: ['AI Solutions', 'Pricing & Timelines', 'Start a Project'],
    cta: { text: 'Web Development', link: '/services/web-development' },
  },
  {
    keywords: ['mobile', 'app', 'ios', 'android', 'flutter'],
    answer:
      'We build cross-platform iOS and Android apps with Flutter and React Native, complete with offline sync, real-time sockets, and store deployment.',
    cta: { text: 'Mobile Apps', link: '/services/mobile-apps' },
  },
  {
    keywords: ['ai', 'llm', 'agent', 'rag', 'automation'],
    answer:
      'We build custom LLM pipelines, RAG architectures, and autonomous workflow agents—like our in-house platform The ClownFounder.',
    cta: { text: 'AI Solutions', link: '/services/ai-solutions' },
  },
  {
    keywords: ['product', 'clownfounder', 'clownmart', 'clowneaser', 'clownkosh'],
    answer:
      'We build and ship our own products in-house: The ClownFounder (AI OS), ClownMart (Headless Commerce), ClownEaser (CSS Token & AI Studio), and ClownKosh (Offline PDF PWA).',
    cta: { text: 'View Case Studies', link: '/case-studies' },
  },
  {
    keywords: ['price', 'cost', 'budget', 'quote', 'timeline', 'long'],
    answer:
      'Every project begins with a clear discovery spec, fixed milestones, and 100% IP transfer. Marketing sites typically take 4–6 weeks; full SaaS/mobile builds take 8–12 weeks.',
    cta: { text: 'Start a Project Brief', link: '/contact' },
  },
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      sender: 'bot',
      text: "Welcome to ClownBros Studio. What are you looking to build?",
      suggestions: ['Capabilities', 'Our Products', 'Timelines', 'Start a Project'],
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);
  const msgCounterRef = useRef(0);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    msgCounterRef.current += 1;
    const userMsg: Message = { id: `u-${msgCounterRef.current}`, sender: 'user', text: trimmed };
    const lower = trimmed.toLowerCase();
    const match = RESPONSES.find((r) => r.keywords.some((k) => lower.includes(k)));

    msgCounterRef.current += 1;
    const botMsg: Message = {
      id: `b-${msgCounterRef.current}`,
      sender: 'bot',
      text:
        match?.answer ||
        'We engineer web platforms, mobile apps, UI/UX systems, cloud infrastructure, and AI workflows. Share your project brief and our senior engineers will respond within 24 hours.',
      suggestions: match?.suggestions || ['Capabilities', 'Timelines'],
      cta: match?.cta || { text: 'Start a Project', link: '/contact' },
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput('');
  };

  return (
    <div className="fixed bottom-[86px] md:bottom-5 right-4 md:right-5 z-40 flex flex-col items-end">
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-32px)] max-w-[360px] bg-[#171817] text-[#F2EFE7] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          <div className="px-4 py-3.5 border-b border-white/12 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#F15A3B]" />
              <div>
                <div className="font-display text-sm font-semibold">Studio Concierge</div>
                <div className="font-mono-tech text-[10px] text-[#9E9B93]">CLOWNBROS</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close studio concierge"
              className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center text-[#F2EFE7]/70 hover:text-[#F2EFE7] hover:bg-white/10"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div data-lenis-prevent className="p-4 h-72 overflow-y-auto space-y-3 text-xs">
            {messages.map((m) => (
              <div key={m.id} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#F15A3B] text-[#F2EFE7] rounded-br-sm'
                      : 'bg-[#202120] text-[#F2EFE7] border border-white/10 rounded-bl-sm'
                  }`}
                >
                  {m.text}
                </div>
                {m.cta && m.sender === 'bot' && (
                  <Link
                    href={m.cta.link}
                    onClick={() => setIsOpen(false)}
                    className="mt-1.5 inline-flex items-center gap-1 font-mono-tech text-[11px] text-[#F15A3B] hover:underline"
                  >
                    {m.cta.text} <ArrowUpRight className="w-3 h-3" />
                  </Link>
                )}
                {m.suggestions && m.sender === 'bot' && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {m.suggestions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => sendMessage(s)}
                        className="px-2.5 py-1 rounded-full border border-white/15 text-[11px] text-[#F2EFE7]/80 hover:border-[#F15A3B] hover:text-[#F2EFE7] transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="p-3 border-t border-white/12 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about services, stack, timelines..."
              className="flex-1 bg-[#202120] border border-white/15 rounded-full px-3.5 py-2 text-xs text-[#F2EFE7] placeholder:text-[#9E9B93] focus:outline-none focus:border-[#F15A3B]"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="w-8 h-8 rounded-full bg-[#F15A3B] text-[#F2EFE7] flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Studio Concierge"
        className="flex items-center gap-2 bg-[#171817] text-[#F2EFE7] border border-white/15 rounded-full px-4 py-2.5 shadow-lg hover:bg-[#F15A3B] hover:border-[#F15A3B] transition-colors"
      >
        <MessageSquare className="w-4 h-4" />
        <span className="font-display text-xs font-medium">Ask Studio</span>
      </button>
    </div>
  );
}
