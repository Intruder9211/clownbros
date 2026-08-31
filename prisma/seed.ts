import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting ClownBros Database Seed...');

    // 1. Seed Company Profile
    const profile = await prisma.companyProfile.upsert({
        where: { id: 'clownbros-profile' },
        update: {},
        create: {
            id: 'clownbros-profile',
            companyName: 'ClownBros Digital Ltd.',
            tagline: 'Modern Engineering Studio',
            primaryEmail: 'hello@clownbros.com',
            supportEmail: 'singhmohit101103@gmail.com',
            address: 'Global / Remote HQ',
            instagramUrl: 'https://instagram.com/clownbros',
            youtubeUrl: 'https://youtube.com/@clownbros',
            linkedinUrl: 'https://linkedin.com/company/clownbros',
            twitterUrl: 'https://x.com/clownbros',
            githubUrl: 'https://github.com/clownbros',
            announcementText: 'EST. 2026 — MODERN ENGINEERING STUDIO',
            heroHeadline: 'From Concept to Impact.',
            heroSubheadline: 'We engineer high-performance digital products.'
        }
    });
    console.log('✅ Company profile initialized:', profile.companyName);

    // 2. Seed Default Admin User
    const defaultAdminEmail = process.env.ADMIN_EMAIL || 'admin@clownbros.com';
    const defaultPassword = process.env.ADMIN_INITIAL_PASSWORD || 'ClownBros#2026!Secure';
    const passwordHash = await bcrypt.hash(defaultPassword, 12);

    const admin = await prisma.adminUser.upsert({
        where: { email: defaultAdminEmail },
        update: {},
        create: {
            email: defaultAdminEmail,
            name: 'ClownBros Admin',
            passwordHash,
            role: Role.SUPERADMIN
        }
    });
    console.log(`✅ Default admin created: ${admin.email} (Initial password: ${defaultPassword})`);

    // 3. Seed Core Services
    const services = [
        {
            num: '01',
            slug: 'web-platforms',
            title: 'High-Performance Web Platforms',
            summary: 'Ultra-fast custom web apps, SaaS portals, and headless storefronts.',
            description: 'We engineer ultra-fast custom web applications, SaaS portals, headless eCommerce storefronts, and corporate websites built on Next.js, React, and TypeScript with sub-second page loads.',
            capabilities: [
                'Custom Web Applications (Next.js/React)',
                'Headless & Custom eCommerce',
                'High-Converting Corporate Portals',
                'Interactive Web Portfolios',
                'RESTful & GraphQL API Integrations',
                'Core Web Vitals & Speed Optimization'
            ],
            order: 1,
            featured: true
        },
        {
            num: '02',
            slug: 'mobile-apps',
            title: 'Cross-Platform Mobile Apps',
            summary: 'Native iOS & Android apps with offline sync and WebSockets.',
            description: 'Transform product concepts into native-feeling iOS and Android applications engineered with Flutter and React Native. Includes offline data synchronization, real-time WebSockets, and app store deployment.',
            capabilities: [
                'iOS & Android App Development',
                'Flutter & React Native Architecture',
                'Real-Time Chat & Video WebRTC',
                'Secure Payment Gateway Integrations',
                'Offline-First Local DB Sync',
                'App Store & Play Store Publishing'
            ],
            order: 2,
            featured: true
        },
        {
            num: '03',
            slug: 'ui-ux-design-systems',
            title: 'UI/UX & Interactive Design Systems',
            summary: 'Figma design tokens, clickable prototypes, and conversion UX.',
            description: 'We craft comprehensive Figma interface systems, clickable prototypes, and conversion-focused user journeys with complete design tokens, accessibility compliance, and developer-ready specs.',
            capabilities: [
                'Figma UI/UX Interface Design',
                'Interactive Clickable Prototypes',
                'Design Systems & Component Kits',
                'User Journey & UX Wireframing',
                'Conversion Rate Optimization (CRO)',
                'WCAG Accessibility Standards'
            ],
            order: 3,
            featured: true
        },
        {
            num: '04',
            slug: 'cloud-devops',
            title: 'Cloud Infrastructure & DevOps',
            summary: 'Scalable cloud foundations, automated CI/CD, and zero-downtime clustering.',
            description: 'Establish scalable, secure cloud foundations. We deploy automated CI/CD pipelines, containerized Docker clusters, database clustering, and zero-downtime serverless environments on AWS and Vercel.',
            capabilities: [
                'AWS & Vercel Cloud Architecture',
                'CI/CD Pipeline Automation (GitHub Actions)',
                'Docker Containerization & Clusters',
                'Database Clustering (PostgreSQL/MongoDB)',
                'SSL, CDN & Serverless Edge Caching',
                '24/7 Uptime & Error Telemetry'
            ],
            order: 4,
            featured: true
        },
        {
            num: '05',
            slug: 'ai-workflow-automation',
            title: 'AI & Workflow Automation',
            summary: 'Custom LLM agents, vector search, and business workflow automation.',
            description: 'Integrate custom LLM pipelines, autonomous AI agents, and automated business workflows that reduce operational bottlenecks and automate repetitive customer interactions.',
            capabilities: [
                'LLM & OpenAI/Claude Integrations',
                'Autonomous Workflow Agents',
                'Custom Vector Search & RAG Pipelines',
                'WhatsApp & CRM Automation',
                'Automated Document & Data Ingestion',
                'AI Customer Support Agents'
            ],
            order: 5,
            featured: true
        },
        {
            num: '06',
            slug: 'seo-growth',
            title: 'Technical SEO & Digital Growth',
            summary: 'Programmatic SEO, conversion funnels, and data attribution.',
            description: 'Drive organic search dominance and user acquisition with technical SEO audits, schema architecture, high-converting funnel design, and multi-channel performance marketing.',
            capabilities: [
                'Technical & Structural SEO',
                'Programmatic SEO & Schema Markup',
                'Conversion Funnel Engineering',
                'Google & Meta Performance Ads',
                'Content Strategy & Editorial Systems',
                'Analytics & Attribution Tracking'
            ],
            order: 6,
            featured: true
        },
        {
            num: '07',
            slug: 'brand-identity',
            title: 'Brand Identity & Visual Guidelines',
            summary: 'Visual guidelines, vector logos, brand books, and investor pitch decks.',
            description: 'Craft an authoritative, premium brand identity that commands high market value. We design cohesive visual guidelines, vector logos, brand books, and investor pitch decks.',
            capabilities: [
                'Logo & Visual Identity Systems',
                'Comprehensive Brand Style Guides',
                'Vector Graphics & Custom Iconography',
                'Investor Pitch Decks & Presentations',
                'Marketing Asset Templates',
                'Social Media Identity Kits'
            ],
            order: 7,
            featured: true
        },
        {
            num: '08',
            slug: 'backend-apis',
            title: 'Backend Systems & Custom APIs',
            summary: 'Low-latency server architectures, microservices, and database schemas.',
            description: 'Build secure, low-latency server architectures with Node.js, NestJS, and PostgreSQL. Engineered for high concurrency, enterprise authentication, and seamless third-party integrations.',
            capabilities: [
                'Scalable RESTful & GraphQL APIs',
                'Microservices & Message Queues (Redis/Kafka)',
                'Role-Based Authentication (OAuth/JWT)',
                'Enterprise Database Schemas',
                'Webhook & Third-Party Integrations',
                'Data Encryption & OWASP Security'
            ],
            order: 8,
            featured: true
        }
    ];

    for (const s of services) {
        await prisma.service.upsert({
            where: { slug: s.slug },
            update: s,
            create: s
        });
    }
    console.log(`✅ ${services.length} Services seeded.`);

    // 4. Seed Tech Stack Items
    const techStack = [
        { name: "HTML5 & CSS3", category: "frontend", description: "Semantic page structures combined with modern responsive layout variables.", order: 1 },
        { name: "JavaScript & TypeScript", category: "frontend", description: "Type-safe logic and interactive layouts utilizing state management patterns.", order: 2 },
        { name: "React.js & Next.js", category: "frontend", description: "Component-driven UI, server-side rendering, and maximized web core vitals.", order: 3 },
        { name: "Tailwind CSS", category: "frontend", description: "Rapid layout iterations utilizing a streamlined utility framework.", order: 4 },
        { name: "Node.js & Express", category: "backend", description: "Scalable network systems, rapid REST APIs, and asynchronous message queues.", order: 5 },
        { name: "NestJS", category: "backend", description: "Highly structured enterprise architecture for robust server application scalability.", order: 6 },
        { name: "PHP & Laravel", category: "backend", description: "Sleek monolithic patterns, database migrations, and clean routing structures.", order: 7 },
        { name: "PostgreSQL & MongoDB", category: "cloud", description: "Secure data persistence matching relational databases or flexible document models.", order: 8 },
        { name: "AWS & Azure", category: "cloud", description: "Elastic hosting, serverless containers, databases, and assets bucket delivery.", order: 9 },
        { name: "Vercel & Netlify", category: "cloud", description: "Instant pipeline deployments, global edge networks, and serverless route helpers.", order: 10 },
        { name: "Figma", category: "design", description: "High-fidelity interface layouts, component design systems, and visual prototypes.", order: 11 },
        { name: "Adobe Creative Suite", category: "design", description: "Vector illustrations, raw logo creation, layouts, and brand visual guides.", order: 12 }
    ];

    for (const t of techStack) {
        const existing = await prisma.techStackItem.findFirst({ where: { name: t.name } });
        if (existing) {
            await prisma.techStackItem.update({ where: { id: existing.id }, data: t });
        } else {
            await prisma.techStackItem.create({ data: t });
        }
    }
    console.log(`✅ ${techStack.length} Tech Stack items seeded.`);

    // 5. Seed Careers / Gigs
    const gigs = [
        {
            slug: 'nextjs-react-frontend-developer',
            title: 'Next.js & React Frontend Developer',
            category: 'Frontend',
            type: 'Contract / 15-30 hrs/wk',
            rate: '$18 - $30 / hr',
            location: 'Remote (Global)',
            skills: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Web Vitals'],
            description: 'Building modern, high-performance web app frontends and landing pages for client startups.',
            responsibilities: [
                'Translate Figma high-fidelity UI into pixel-perfect React/Next.js components.',
                'Optimize Web Core Vitals and client-side rendering performance.',
                'Integrate client API endpoints and manage application state.'
            ],
            requirements: [
                '2+ years of production experience with React and Next.js App Router.',
                'Deep proficiency with Tailwind CSS and CSS animation principles.',
                'Strong command of TypeScript typing and component contracts.'
            ],
            featured: true,
            order: 1
        },
        {
            slug: 'flutter-mobile-app-specialist',
            title: 'Flutter Mobile App Specialist',
            category: 'Mobile',
            type: 'Project Retainer',
            rate: '$16 - $28 / hr',
            location: 'Remote (Global)',
            skills: ['Flutter', 'Dart', 'Firebase', 'REST APIs', 'App Store Setup'],
            description: 'Assist in developing cross-platform iOS and Android mobile applications with clean UI and API integration.',
            responsibilities: [
                'Build cross-platform mobile apps for iOS and Android using Flutter.',
                'Integrate third-party SDKs, push notifications, and payment gateways.',
                'Prepare store submissions for Apple App Store and Google Play Store.'
            ],
            requirements: [
                'Proficiency in Dart & Flutter state management (Bloc / Riverpod / Provider).',
                'Experience publishing at least 1 production app to Google Play or Apple App Store.'
            ],
            featured: true,
            order: 2
        },
        {
            slug: 'fullstack-nodejs-database-developer',
            title: 'Fullstack Node.js & Database Developer',
            category: 'Backend',
            type: 'Freelance Contract',
            rate: '$20 - $35 / hr',
            location: 'Remote (Global)',
            skills: ['Node.js', 'PostgreSQL', 'Prisma', 'REST APIs', 'Express'],
            description: 'Architecting RESTful microservices, backend APIs, and real-time database models for web apps.',
            responsibilities: [
                'Design relational database schemas and ORM queries.',
                'Implement secure authentication, authorization, and rate limiting.',
                'Create maintainable REST and GraphQL API routes.'
            ],
            requirements: [
                'Solid experience with Node.js, Express/NestJS, and PostgreSQL.',
                'Understanding of OWASP security standards and caching strategies.'
            ],
            featured: false,
            order: 3
        },
        {
            slug: 'ui-ux-product-designer-figma',
            title: 'UI/UX Product Designer (Figma)',
            category: 'Design',
            type: 'Flex Contract (15-25 hrs/wk)',
            rate: '$15 - $25 / hr',
            location: 'Remote (Global)',
            skills: ['Figma', 'Wireframing', 'UI Components', 'Prototyping', 'Design Systems'],
            description: 'Design intuitive editorial web layouts, mobile app screens, and interactive visual component libraries.',
            responsibilities: [
                'Craft editorial, high-converting web and mobile user interfaces.',
                'Build reusable design systems, color tokens, and interactive components in Figma.',
                'Collaborate closely with engineering teams during handover.'
            ],
            requirements: [
                'Strong portfolio demonstrating typography, layout balance, and micro-interactions.',
                'Advanced knowledge of Figma auto-layout, components, and variables.'
            ],
            featured: true,
            order: 4
        },
        {
            slug: 'ai-llm-integration-developer',
            title: 'AI & LLM Integration Developer',
            category: 'AI/ML',
            type: 'Project-based Contract',
            rate: '$25 - $45 / hr',
            location: 'Remote (Global)',
            skills: ['OpenAI API', 'LangChain', 'Python', 'Vector DBs', 'Prompt Engineering'],
            description: 'Build intelligent LLM autonomous agents, vector search pipelines, and AI workflow tools for clients.',
            responsibilities: [
                'Design RAG architectures and embedding pipelines for enterprise client datasets.',
                'Implement agentic workflows using LangChain or LlamaIndex.',
                'Optimize prompt efficiency, latency, and LLM token usage.'
            ],
            requirements: [
                'Hands-on experience with OpenAI, Anthropic Claude, or open-source LLMs.',
                'Familiarity with vector databases (Pinecone, pgvector, Qdrant).'
            ],
            featured: false,
            order: 5
        },
        {
            slug: 'cloud-devops-specialist',
            title: 'Cloud DevOps Specialist',
            category: 'DevOps',
            type: 'Hourly On-Call Contract',
            rate: '$22 - $40 / hr',
            location: 'Remote (Global)',
            skills: ['AWS', 'Docker', 'Linux', 'Terraform', 'CI/CD Pipelines'],
            description: 'Automate deployment pipelines, server monitoring, and Docker containerization for production systems.',
            responsibilities: [
                'Set up GitHub Actions CI/CD workflows for automated testing and deploy.',
                'Manage AWS infrastructure (ECS, EC2, RDS, CloudFront, S3).',
                'Monitor system health, error rates, and security compliance.'
            ],
            requirements: [
                'Experience with Docker, Linux server administration, and AWS.',
                'Familiarity with infrastructure-as-code and SSL/DNS configuration.'
            ],
            featured: false,
            order: 6
        }
    ];

    for (const g of gigs) {
        await prisma.job.upsert({
            where: { slug: g.slug },
            update: g,
            create: g
        });
    }
    console.log(`✅ ${gigs.length} Job/Gig postings seeded.`);

    // 6. Seed Real In-House Ecosystem Platforms
    // Clear any old dummy ecosystem items
    await prisma.ecosystemItem.deleteMany({});

    const ecosystem = [
        {
            title: 'The ClownFounder',
            category: 'Autonomous AI OS',
            tagline: 'Multi-Agent AI, Next.js, Command Center',
            description: 'Autonomous AI Executive Team with founder-in-the-loop approvals. Parallel sales, engineering, QA, finance, and support units that handle operations and morning executive briefs.',
            websiteUrl: 'https://theclownfounder.vercel.app/',
            metrics: '4 Active In-House Platforms',
            featured: true,
            order: 1
        },
        {
            title: 'ClownEaser',
            category: 'Dev Tooling & AI',
            tagline: 'AST Extraction, Elementor 3.x, AI CSS Studio',
            description: 'Headless computed CSS token parser and Elementor AI CSS Studio. Extracts typography, container spacing, and colors directly into Elementor Global Kit 3.x schema.',
            websiteUrl: 'https://clowneaser.vercel.app/',
            metrics: 'AST Engine',
            featured: true,
            order: 2
        },
        {
            title: 'The ClownMart',
            category: 'Headless Commerce',
            tagline: 'Next.js 15, Edge Caching, Cart Architecture',
            description: 'Information-dense, high-velocity modern marketplace specializing in premium retail footwear. Engineered with sub-second catalog search, instant filtering, and responsive cart flows.',
            websiteUrl: 'https://theclownmart.vercel.app/',
            metrics: 'Sub-second Search',
            featured: true,
            order: 3
        },
        {
            title: 'ClownKosh',
            category: 'PWA & Doc Systems',
            tagline: 'Offline PWA, PDF.js Engine, IndexedDB',
            description: 'Distraction-free personal digital library and PDF reader Progressive Web App. Features client-side indexing, offline storage, document shelf management, and responsive reading views.',
            websiteUrl: 'https://clownkosh.vercel.app/',
            metrics: 'Offline PWA',
            featured: true,
            order: 4
        }
    ];

    for (const e of ecosystem) {
        await prisma.ecosystemItem.create({ data: e });
    }
    console.log(`✅ ${ecosystem.length} Real In-House Ecosystem platforms seeded.`);

    console.log('🎉 Seeding complete successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
