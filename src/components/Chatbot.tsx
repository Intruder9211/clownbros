'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  suggestions?: string[];
  cta?: {
    text: string;
    link: string;
  };
}

const CONCIERGE_RESPONSES: { keywords: string[]; answer: string; suggestions?: string[]; cta?: { text: string; link: string } }[] = [
  {
    keywords: ['hello', 'hi', 'hey', 'greetings', 'who are you', 'concierge'],
    answer: "Welcome to ClownBros. I am your digital concierge. I am here to guide you through our bespoke service offerings and answer any questions about our technology capabilities. What can we build for you today?",
    suggestions: ["Explore Capabilities", "Our Tech Stack", "Pricing & Timelines", "Start a Project"]
  },
  {
    keywords: ['web', 'website', 'react', 'nextjs', 'development', 'frontend', 'wordpress', 'cms', 'ecommerce', 'storefront'],
    answer: "Our flagship Web Development capability crafts high-performance, responsive websites. We specialize in custom React.js and Next.js applications, headless CMS architectures, and premium e-commerce storefronts tailored to optimize load speeds and conversion. Every line of code is hand-crafted to meet the highest performance and SEO standards.",
    suggestions: ["View Technologies", "See UI/UX Design", "Start a Project"],
    cta: { text: "Learn More on Services Page", link: "/services" }
  },
  {
    keywords: ['mobile', 'app', 'android', 'ios', 'flutter', 'react native', 'phone', 'software'],
    answer: "We engineer native and cross-platform mobile solutions utilizing Flutter and React Native. From SaaS-based platforms to premium mobile commerce systems, we build software optimized for fluid performance, security, and high-fidelity animations on both iOS and Android platforms.",
    suggestions: ["Explore Cloud Integration", "Start a Project"],
    cta: { text: "Let's Get Started", link: "/contact" }
  },
  {
    keywords: ['design', 'ui', 'ux', 'figma', 'prototype', 'wireframe', 'user experience', 'visual'],
    answer: "At ClownBros, design is foundational. We create complete typography scales, responsive grids, high-fidelity interactive prototypes in Figma, and custom design systems. Our UI/UX philosophy blends luxury aesthetics with effortless usability.",
    suggestions: ["See Web Development", "Branding Design", "Explore Stack"],
    cta: { text: "View Our Services", link: "/services" }
  },
  {
    keywords: ['marketing', 'seo', 'ads', 'google ads', 'meta ads', 'facebook ads', 'lead', 'traffic', 'conversion'],
    answer: "We drive premium user acquisition through technical SEO, structured content funnels, and high-ROI Google and Meta ad campaigns. Our analytics and automation setup ensures that traffic turns into high-value leads and customers.",
    suggestions: ["Social Media Growth", "Sales Funnels"],
    cta: { text: "Talk to our team", link: "/contact" }
  },
  {
    keywords: ['brand', 'branding', 'logo', 'identity', 'guidelines', 'presentation'],
    answer: "We formulate premium brand identities, custom logos, visual systems, and presentation materials. We help elevate your business's visual footprint to command premium positioning in your industry.",
    suggestions: ["UI/UX Design", "Start a Project"],
    cta: { text: "Contact Brand Designers", link: "/contact" }
  },
  {
    keywords: ['social', 'instagram', 'youtube', 'linkedin', 'facebook', 'reels', 'content'],
    answer: "Our Social Media Management service designs high-end reels templates, drafts content plans, and deploys growth strategies on Instagram, LinkedIn, and YouTube to nurture organic lead pipelines and build a loyal audience.",
    suggestions: ["Digital Marketing", "Start a Project"]
  },
  {
    keywords: ['sales', 'funnel', 'growth', 'automation', 'crm', 'chatbot', 'whatsapp'],
    answer: "We design high-converting sales funnels, integrate CRM systems (like Salesforce or HubSpot), build WhatsApp automations, and configure customized AI chatbots that work 24/7 to nurture leads and close sales automatically.",
    suggestions: ["API & Cloud Setup", "Start a Project"],
    cta: { text: "Integrate a Chatbot", link: "/services#tech-stack" }
  },
  {
    keywords: ['cloud', 'aws', 'backend', 'api', 'database', 'server', 'hosting', 'security', 'azure', 'vercel'],
    answer: "We build secure, auto-scaling backend APIs in Node.js/NestJS and PHP/Laravel. Our cloud engineers deploy architectures on AWS, Azure, and Google Cloud with robust PostgreSQL or MongoDB databases, complete with secure CI/CD pipelines.",
    suggestions: ["Explore Technologies", "Start a Project"]
  },
  {
    keywords: ['price', 'pricing', 'cost', 'budget', 'how much', 'quote'],
    answer: "We pride ourselves on full transparency. Every project begins with a discovery phase where we outline a fixed scope, project budget, and clear milestones. Payments are tied to milestone sign-offs. Since each build is bespoke, get in touch with us to receive a custom quote within 24 hours.",
    suggestions: ["Start a Project", "Capabilities", "Project Timelines"],
    cta: { text: "Request a Custom Quote", link: "/contact" }
  },
  {
    keywords: ['timeline', 'duration', 'time', 'how long', 'milestone', 'delivery'],
    answer: "Timelines depend on scope. Simple custom websites typically span 4 to 6 weeks. Complex web applications or custom SaaS/mobile apps range from 8 to 12 weeks. We map out precise weekly deliverables in our initial proposal so you always know what to expect.",
    suggestions: ["Pricing Info", "Our Capabilities", "Start a Project"]
  },
  {
    keywords: ['startup', 'enterprise', 'corporate', 'business', 'scale', 'client'],
    answer: "We support ambitious startups looking to launch their MVP quickly, as well as medium businesses and large corporate enterprises migrating to modern frameworks. Our codebases are designed to be fast, maintainable, and fully scalable.",
    suggestions: ["Our Technologies", "Start a Project"]
  },
  {
    keywords: ['tech', 'stack', 'technologies', 'node', 'php', 'laravel', 'postgres', 'mongo', 'typescript', 'tailwind'],
    answer: "We build using a refined technology stack. For frontend, we use React.js, Next.js, TypeScript, and Tailwind CSS. For backend systems, we run Node.js/Express, NestJS, and PHP/Laravel. Database solutions include PostgreSQL, MongoDB, and Firebase, hosted on AWS, Vercel, and Azure.",
    suggestions: ["Explore Services", "Pricing Info", "Start a Project"],
    cta: { text: "See Full Stack", link: "/services#tech-stack" }
  },
  {
    keywords: ['support', 'maintenance', 'hosting', 'after', 'launch', 'optimization'],
    answer: "Yes, we offer ongoing post-launch support. This includes dedicated VPS or serverless hosting management, database maintenance, periodic security patches, monthly technical SEO audits, and speed optimizations to ensure your systems perform at their peak.",
    suggestions: ["Pricing Info", "Start a Project"]
  },
  {
    keywords: ['portfolio', 'project', 'work', 'case studies', 'case study', 'examples', 'clients', 'done', 'space artisans', 'movers vaughan', 'ricliso', 'richmondhill'],
    answer: "We have built several bespoke products for our global clients, including Space Artisans Design Studio (luxury architecture), Movers Vaughan & Movers Richmond Hill (automated logistics engines & local SEO), and Ricliso (enterprise ISO certification portals). You can explore our interactive case studies and see live builds on our dedicated Portfolio page.",
    suggestions: ["Our Tech Stack", "Start a Project"],
    cta: { text: "View Portfolio Page", link: "/portfolio" }
  },
  {
    keywords: ['contact', 'touch', 'start', 'meeting', 'call', 'hire', 'project', 'onboard', 'phone', 'number', 'email', 'singhmohit'],
    answer: "We would love to discuss your vision. You can start a project by filling out our onboarding questionnaire, emailing us at singhmohit101103@gmail.com, or calling/messaging us at +91 73030 61282. Let's build something exceptional.",
    suggestions: ["Pricing & Timelines", "Capabilities"],
    cta: { text: "Go to Onboarding Form", link: "/contact" }
  }
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const feedEndRef = useRef<HTMLDivElement>(null);

  // Initialize with greeting
  useEffect(() => {
    setMessages([
      {
        id: 'greet',
        sender: 'bot',
        text: "Greetings. Welcome to ClownBros. I am your concierge. How can I help you elevate your digital assets today?",
        timestamp: new Date(),
        suggestions: ["Our Capabilities", "Technology Stack", "Pricing & Timelines", "Start a Project"]
      }
    ]);
  }, []);

  // Auto scroll
  useEffect(() => {
    if (feedEndRef.current) {
      feedEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getBotResponse = (input: string): { text: string; suggestions?: string[]; cta?: { text: string; link: string } } => {
    const cleanInput = input.toLowerCase().trim();
    
    // Find matching response
    for (const res of CONCIERGE_RESPONSES) {
      if (res.keywords.some(keyword => cleanInput.includes(keyword))) {
        return {
          text: res.answer,
          suggestions: res.suggestions,
          cta: res.cta
        };
      }
    }

    // Default response
    return {
      text: "I want to make sure I give you the most accurate answer. ClownBros specializes in custom Web/Mobile Apps, UI/UX Design, Branding, Marketing, and Cloud/Automation workflows. Could you specify which capability you'd like to explore, or would you like to speak to our team directly?",
      suggestions: ["Web Development", "UI/UX Design", "Pricing Info", "Start a Project"],
      cta: { text: "Contact a Human Representative", link: "/contact" }
    };
  };

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate thinking delay
    const delay = 600 + Math.random() * 600;
    setTimeout(() => {
      const response = getBotResponse(textToSend);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.text,
        timestamp: new Date(),
        suggestions: response.suggestions,
        cta: response.cta
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, delay);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <>
      {/* Floating Action Button (FAB) */}
      <button 
        className={`chatbot-launcher ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close Concierge Chat" : "Open Concierge Chat"}
      >
        {isOpen ? (
          <X className="launcher-icon close" size={24} />
        ) : (
          <div className="launcher-content">
            <MessageSquare className="launcher-icon chat" size={22} />
            <span className="launcher-pulse"></span>
          </div>
        )}
      </button>

      {/* Chat Container */}
      <div className={`chatbot-container ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-brand">
            <div className="chatbot-avatar">
              <Bot size={18} className="bot-avatar-icon" />
            </div>
            <div>
              <h3>Concierge Assistant</h3>
              <p className="chatbot-status">
                <span className="status-dot"></span>
                Online — ClownBros Concierge
              </p>
            </div>
          </div>
          <button 
            className="chatbot-close-btn" 
            onClick={() => setIsOpen(false)}
            aria-label="Close Chat"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages Feed */}
        <div className="chatbot-feed">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-message-wrapper ${msg.sender}`}>
              {msg.sender === 'bot' && (
                <div className="chat-msg-avatar">
                  <Sparkles size={12} />
                </div>
              )}
              <div className="chat-message-bubble">
                <p className="message-text">{msg.text}</p>
                
                {msg.cta && (
                  <div className="message-cta-wrapper">
                    <Link 
                      href={msg.cta.link} 
                      className="message-cta-btn"
                      onClick={() => {
                        if (!msg.cta?.link.startsWith('#')) {
                          setIsOpen(false);
                        }
                      }}
                    >
                      <span>{msg.cta.text}</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="chat-message-wrapper bot">
              <div className="chat-msg-avatar">
                <Sparkles size={12} />
              </div>
              <div className="chat-message-bubble typing">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={feedEndRef} />
        </div>

        {/* Suggestion Pills */}
        {!isTyping && messages[messages.length - 1]?.suggestions && (
          <div className="chatbot-suggestions">
            {messages[messages.length - 1].suggestions?.map((sugg, i) => (
              <button 
                key={i} 
                className="suggestion-pill"
                onClick={() => handleSuggestionClick(sugg)}
              >
                {sugg}
              </button>
            ))}
          </div>
        )}

        {/* Input Footer */}
        <form 
          className="chatbot-input-area"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputValue);
          }}
        >
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your inquiry..."
            disabled={isTyping}
            className="chatbot-input"
            aria-label="Chat input"
          />
          <button 
            type="submit" 
            disabled={!inputValue.trim() || isTyping}
            className="chatbot-send-btn"
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </>
  );
}
