export interface VentureDetail {
  what: string;
  problem: string;
  solution: string;
  businessModel: string;
  whyNow: string;
  metrics: { label: string; value: string }[];
  roundInfo?: {
    status: string;
    allocated?: string;
    available?: string;
    note?: string;
  };
  externalUrl?: string;
}

export interface Venture {
  id: string;
  name: string;
  category: string;
  sector: string;
  tagline: string;
  description: string;
  status: 'live' | 'building' | 'featured';
  highlight?: string;
  detail: VentureDetail;
}

export const ventures: Venture[] = [
  {
    id: 'workhub',
    name: 'WorkHub',
    category: 'SaaS',
    sector: 'Workforce',
    tagline: '60% allocated. 40% available now.',
    description:
      'Workforce-management platform built on Pointspay infrastructure. Already in market, generating revenue. Founding-investor allocation is the only entry left.',
    status: 'featured',
    highlight: '60% allocated',
    detail: {
      what: 'WorkHub is a workforce-management platform built on top of Pointspay's payment infrastructure — combining scheduling, payroll, contractor management, and compliance into a single product for Nordic employers.',
      problem: 'Nordic SMEs juggle three to five disconnected tools to manage their workforce: one for scheduling, another for payroll, another for compliance documentation. The friction is expensive — errors, delays, and administrative overhead eat directly into margins.',
      solution: 'WorkHub consolidates the entire workflow into one platform. Managers schedule, approve timesheets, and run payroll from a single dashboard. Integration with Pointspay means payments settle instantly — no waiting, no manual bank transfers.',
      businessModel: 'Per-seat SaaS subscription (monthly or annual) with a transaction fee on payroll processed through the Pointspay rail. Revenue is recurring and grows with customer headcount.',
      whyNow: 'Pointspay's rail is live and proven. The workforce-management category in the Nordics is fragmented — no dominant player at the SME tier. AI-assisted scheduling and compliance automation have made it possible to build in months what would have taken years in the 2018 cycle.',
      metrics: [
        { label: 'Revenue', value: 'Live · generating' },
        { label: 'Round status', value: '60% allocated' },
        { label: 'Available', value: '40% remaining' },
        { label: 'Infrastructure', value: 'Pointspay' },
        { label: 'Target market', value: 'Nordic SMEs' },
        { label: 'Entry terms', value: 'Founding-investor' },
      ],
      roundInfo: {
        status: 'Open · closing soon',
        allocated: '60%',
        available: '40%',
        note: 'Founding-investor allocation only. This is the last entry point at current terms.',
      },
      externalUrl: 'https://workhub.pointspay.io',
    },
  },
  {
    id: 'keep',
    name: 'Keep',
    category: 'AI',
    sector: 'Accounting OS',
    tagline: '13 products. One platform. Your brand.',
    description:
      'White-labelled AI operating system for Nordic accounting firms — 13 client-facing products, fully white-labelled, live in three weeks.',
    status: 'live',
    highlight: 'Acquisition talks Q2 2026',
    detail: {
      what: 'Keep is a complete AI-powered operating system for Nordic accounting firms, delivered entirely under the firm\'s own brand. Thirteen client-facing products — from automated bookkeeping to tax advisory to client reporting — ship as one white-labelled suite.',
      problem: 'Major consolidators are buying Nordic accounting firms at record pace. Independent firms are losing ground on two fronts: they can\'t compete on technology, and they can\'t compete on margin. Acquiring a tech stack product-by-product is prohibitively expensive and slow.',
      solution: 'Keep flips the script. One contract, one onboarding, thirteen products — all branded to the firm. Clients see the firm\'s name on everything. The firm looks like a tech company without hiring a single developer.',
      businessModel: 'Annual SaaS licence per firm, scaled by the number of client seats. White-label premium adds a branding fee. Add-on modules (tax engine, payroll, audit prep) priced separately.',
      whyNow: 'AI has collapsed the cost of building accounting automation. The Nordic consolidation wave is accelerating — independent firms that don\'t modernise will be acquired at distressed multiples. Keep is the survival tool. A tier-1 consolidator is already in early acquisition discussions with Keep itself (counterparty named under NDA).',
      metrics: [
        { label: 'Products', value: '13 client-facing' },
        { label: 'Time to live', value: '3 weeks' },
        { label: 'Market', value: 'Nordic accounting' },
        { label: 'Model', value: 'White-label SaaS' },
        { label: 'M&A status', value: 'Talks — Q2 2026' },
        { label: 'Counterparty', value: 'Tier-1 consolidator (NDA)' },
      ],
      roundInfo: {
        status: 'Acquisition in motion',
        note: 'Early-stage acquisition discussions with a tier-1 Nordic consolidator. Counterparty named under signed NDA only. If a transaction completes, proceeds flow pro-rata to all Mosaic shareholders.',
      },
    },
  },
  {
    id: 'mdio',
    name: 'MDIO · Max Dahl',
    category: 'Media',
    sector: 'AI-native IP',
    tagline: 'The world\'s first AI-native Nordic Noir universe.',
    description:
      'One universe where the 14-volume saga, interactive cold-case platform, and personal AI investigator are the same product. Built for Netflix/HBO from day one.',
    status: 'live',
    highlight: '14 books + platform',
    detail: {
      what: 'MDIO is an AI-native Nordic Noir universe — not a book series with an app bolted on, but a single coherent world expressed simultaneously as a 14-volume crime saga, an interactive cold-case investigation platform, and a personal AI detective partner. All three are the same product.',
      problem: 'IP-driven entertainment is still built for 20th-century distribution: a book series generates a TV pitch, a TV show generates merchandise, merchandise generates a fan site. The audience moves between disconnected experiences. AI has made it possible to collapse those into one living universe — but no studio has done it yet.',
      solution: 'Every novel in the Max Dahl saga feeds the investigation platform. Readers become investigators. The AI partner — trained on the case files and universe lore — responds to real questions, gives tips, and evolves as the saga advances. It\'s designed for Netflix/HBO acquisition from day one: the IP is the pitch.',
      businessModel: 'Multi-stream: book sales (traditional + digital), platform subscription (investigation access + AI partner), licensing (TV/film rights, foreign translation), and brand partnerships within the universe.',
      whyNow: 'Streaming platforms are desperate for IP that comes with an engaged audience already attached. AI has made it economically viable to build an interactive universe at the same cost as a traditional book series. Nordic Noir has proven global appeal — the genre is already a Netflix staple.',
      metrics: [
        { label: 'Saga length', value: '14 volumes' },
        { label: 'Format', value: 'Books + Platform + AI' },
        { label: 'Target buyer', value: 'Netflix / HBO' },
        { label: 'Genre', value: 'Nordic Noir' },
        { label: 'IP model', value: 'Universe-first' },
        { label: 'Status', value: 'In production' },
      ],
    },
  },
  {
    id: 'streken',
    name: 'Streken Marketplace',
    category: 'Marketplace',
    sector: 'Art',
    tagline: 'Caricature art, archive prints, AI interpretations.',
    description:
      'A curated marketplace for caricature art — archive prints, AI-driven interpretations, and original commissions from Nordic illustrators.',
    status: 'live',
    detail: {
      what: 'Streken is a curated two-sided marketplace connecting Nordic caricature illustrators with buyers who want archive prints, AI-generated art interpretations, and bespoke original commissions.',
      problem: 'Caricature art exists in a distribution dead-end. Talented illustrators have no scalable channel — they sell at events or through Instagram DMs. Buyers who want personalised or archival art have no trusted, curated destination.',
      solution: 'Streken creates the category. Three product tiers: archive prints (digitised original works), AI interpretations (buyer uploads a photo, AI + illustrator produces a styled piece), and original commissions (bespoke, priced per brief). The marketplace handles payment, fulfilment, and quality control.',
      businessModel: 'Marketplace take-rate (20–30%) on each transaction. AI interpretation tier has a fixed price point with high margin. Subscription option for illustrators who want priority placement.',
      whyNow: 'AI image generation has created a new consumer appetite for personalised art — but buyers want human craft and authenticity, not pure AI output. Streken bridges the gap: AI as a starting layer, Nordic illustrator talent as the finishing layer.',
      metrics: [
        { label: 'Product tiers', value: '3 (archive / AI / commission)' },
        { label: 'Market', value: 'Nordic + export' },
        { label: 'Model', value: 'Marketplace + take-rate' },
        { label: 'Status', value: 'Live' },
        { label: 'Differentiator', value: 'Curated, human-finished' },
        { label: 'Category', value: 'Art marketplace' },
      ],
    },
  },
  {
    id: 'aidany',
    name: 'Ai Dany',
    category: 'AI',
    sector: 'Marketing',
    tagline: 'AI Creative Director that judges marketing ideas.',
    description:
      'Stops bad campaigns before they burn the budget. Reviews briefs, copy, and creative against decades of agency-grade taste.',
    status: 'live',
    detail: {
      what: 'Ai Dany is an AI Creative Director — a product that evaluates marketing ideas, copy, and creative briefs before they reach production. It catches weak concepts early, when changes are cheap, instead of after the budget has been spent.',
      problem: 'Most marketing waste happens upstream. A weak brief becomes a weak campaign. A campaign that fails after three weeks of production has already consumed 80% of its budget before the first impression is served. No tool in the current stack catches this early.',
      solution: 'Ai Dany reviews briefs, headlines, campaign concepts, and creative assets against a trained model built on decades of agency-grade creative standards. It scores, explains, and suggests improvements — before a single designer opens Figma.',
      businessModel: 'SaaS subscription per marketing team. Tiered by team size and monthly brief volume. Enterprise plan includes API access for direct integration with creative workflow tools (Asana, Monday, Notion).',
      whyNow: 'Marketing teams are under pressure to produce more content with fewer people. AI writing tools have flooded the market — but they create output, not judgement. Ai Dany fills the judgement gap: it\'s the senior creative review that most teams can\'t afford to hire full-time.',
      metrics: [
        { label: 'Function', value: 'Pre-production review' },
        { label: 'Model', value: 'SaaS per team' },
        { label: 'Integrations', value: 'Asana, Monday, Notion' },
        { label: 'Status', value: 'Live' },
        { label: 'Target', value: 'Marketing teams' },
        { label: 'Category', value: 'AI creative tools' },
      ],
    },
  },
  {
    id: 'guesthub',
    name: 'Guest Hub',
    category: 'SaaS',
    sector: 'Hospitality',
    tagline: 'Nine-module guest intelligence for restaurants.',
    description:
      'Nine-module guest intelligence platform — live in 2 weeks on top of any POS. Profiles, preferences, recommendations, retention.',
    status: 'live',
    detail: {
      what: 'Guest Hub is a nine-module guest intelligence platform for restaurants — a system that sits on top of any existing POS and gives the front-of-house team a real-time view of every guest: their history, preferences, dietary restrictions, visit frequency, and spend profile.',
      problem: 'Restaurants know almost nothing about their repeat guests. The POS captures transactions, not relationships. A guest who has visited 40 times is treated identically to a walk-in. That gap costs restaurants revenue in retention, upsell, and referrals.',
      solution: 'Guest Hub plugs into any POS via API and builds a living guest profile from every transaction. Staff see the profile on a tablet at the door: returning guest, last visit, favourite dish, allergies, preferred table. Nine modules cover the full guest lifecycle — from first visit to loyalty programme to re-engagement.',
      businessModel: 'Monthly SaaS subscription per venue, scaled by covers per month. Module add-ons (loyalty, SMS re-engagement, analytics) priced separately. Potential for data partnership revenue with food & beverage suppliers.',
      whyNow: 'Restaurant margins are at historic lows. Retention is the only lever operators can pull without cutting costs. Guest Hub turns every repeat visitor into a known, high-value relationship — live in two weeks, no POS replacement required.',
      metrics: [
        { label: 'Modules', value: '9' },
        { label: 'Time to live', value: '2 weeks' },
        { label: 'POS compatibility', value: 'Any (API)' },
        { label: 'Model', value: 'Per-venue SaaS' },
        { label: 'Status', value: 'Live' },
        { label: 'Sector', value: 'Hospitality' },
      ],
    },
  },
  {
    id: 'luxury-deal-scout',
    name: 'Luxury Deal Scout',
    category: 'AI',
    sector: 'Resale',
    tagline: 'Bloomberg-style intelligence for luxury resale.',
    description:
      'Unifies Vestiaire, Chrono24, Vinted, eBay into one feed — pricing signals, deal alerts, and sourcing intelligence for resellers.',
    status: 'live',
    detail: {
      what: 'Luxury Deal Scout is a Bloomberg-style intelligence terminal for the luxury resale market. It aggregates real-time data from Vestiaire Collective, Chrono24, Vinted, eBay, and private dealer networks into a single feed — with pricing signals, deal alerts, and sourcing intelligence for professional resellers.',
      problem: 'The luxury resale market is growing fast but remains opaque. Professional resellers — who drive a large share of volume — operate across five or more platforms manually, checking prices tab by tab, missing deals in the minutes between refreshes. There is no professional-grade tool built for this buyer.',
      solution: 'Luxury Deal Scout aggregates every platform into one terminal. It surfaces mispriced listings, tracks price history by reference, sends real-time deal alerts to a mobile app, and provides market intelligence reports by category. The professional reseller now has the same data advantage that Bloomberg gave to financial traders.',
      businessModel: 'Premium subscription (monthly/annual) with three tiers: Scout (alerts only), Analyst (full pricing intelligence), and Pro (API access + custom watch lists). Revenue scales with subscriber count — no transaction dependency.',
      whyNow: 'The luxury resale market crossed $50B globally in 2024. Platforms like Vestiaire and Chrono24 have made supply abundant. The edge now sits entirely in intelligence — who sees the deal first, who prices correctly, who sources ahead of the market.',
      metrics: [
        { label: 'Sources', value: 'Vestiaire, Chrono24, Vinted, eBay +' },
        { label: 'Model', value: 'Premium subscription' },
        { label: 'Tiers', value: '3 (Scout / Analyst / Pro)' },
        { label: 'Status', value: 'Live' },
        { label: 'Market', value: 'Global luxury resale' },
        { label: 'Category', value: 'AI · market intelligence' },
      ],
    },
  },
  {
    id: 'innlandet',
    name: 'Innlandet AI Partner',
    category: 'Agency',
    sector: 'Regional',
    tagline: 'Local digital partner for Innlandet craft businesses.',
    description:
      'Websites, customer portals, and command centers for craft and trades businesses across the Innlandet region.',
    status: 'live',
    detail: {
      what: 'Innlandet AI Partner is the local digital agency for craft and trades businesses across the Innlandet region of Norway — building websites, customer portals, booking systems, and AI-powered command centers under one retainer relationship.',
      problem: 'Craft and trades businesses in regional Norway are invisible online. Their websites were last updated in 2017. They don\'t have booking systems, CRM tools, or any way to manage their digital presence. The cost and complexity of fixing this has historically been out of reach.',
      solution: 'One monthly retainer. One point of contact. Innlandet AI Partner handles the entire digital footprint: a professional website, an online booking or enquiry system, a customer portal, and an AI-powered dashboard that shows the owner their leads, bookings, and reviews in one place.',
      businessModel: 'Monthly retainer per client (NOK 2,500–6,000 / month depending on scope). Setup fee for onboarding. Revenue is stable and recurring — no project-by-project volatility.',
      whyNow: 'AI has made it possible to build and maintain a professional digital presence at regional-agency cost. Innlandet has a dense concentration of craft businesses — carpenters, plumbers, electricians, landscapers — who are underserved by Oslo-based agencies.',
      metrics: [
        { label: 'Region', value: 'Innlandet, Norway' },
        { label: 'Target', value: 'Craft & trades SMEs' },
        { label: 'Model', value: 'Monthly retainer' },
        { label: 'Retainer range', value: 'NOK 2,500–6,000 / mo' },
        { label: 'Status', value: 'Live' },
        { label: 'Category', value: 'AI agency · regional' },
      ],
    },
  },
  {
    id: 'athlete-portal',
    name: 'Athlete Brand Portal',
    category: 'Marketplace',
    sector: 'Sports',
    tagline: 'Two-sided marketplace pairing athletes and brands.',
    description:
      'AI matching between athletes and brands — direct deals, transparent terms, no agency cut.',
    status: 'live',
    detail: {
      what: 'Athlete Brand Portal is a two-sided marketplace that matches athletes with brands for sponsorship and partnership deals — using AI to surface the right fit, and a structured deal flow that removes the sports agency from the middle.',
      problem: 'Sports sponsorship is a slow, relationship-driven market. Brands with budgets for athlete partnerships struggle to find the right fit below the top 1% of athletes. Athletes outside the elite tier — strong social followings, genuine niche authority — are invisible to brand teams. Sports agencies take 15–25% and only represent the athletes worth the administrative overhead.',
      solution: 'Athlete Brand Portal algorithmically matches athletes to brand briefs based on audience fit, engagement data, sport, and deal size. Both sides complete a verified profile. Deals are structured, signed, and tracked on-platform. No agency, no opaque negotiations — just a match, a term sheet, and a deal.',
      businessModel: 'Success fee (8–12%) on completed deals. Subscription for brands (unlimited brief posting, priority matching). Athlete profiles are free — supply-side growth drives the marketplace.',
      whyNow: 'Creator economy tools have trained a generation of athletes to think like media brands. Sponsorship is moving from traditional PR to performance-based partnership. The infrastructure to handle it directly didn\'t exist at sub-elite level — until now.',
      metrics: [
        { label: 'Model', value: 'Marketplace + success fee' },
        { label: 'Take-rate', value: '8–12% on deals' },
        { label: 'Agency cut removed', value: '15–25%' },
        { label: 'Status', value: 'Live' },
        { label: 'Matching', value: 'AI-powered' },
        { label: 'Category', value: 'Sports · marketplace' },
      ],
    },
  },
  {
    id: 'optimal-rekruttering',
    name: 'Optimal Rekruttering AI',
    category: 'AI',
    sector: 'Recruitment',
    tagline: 'AI screening layer for recruiters.',
    description:
      'Norwegian-language AI interviews, candidate scoring, 48-hour shortlist delivery to recruiters.',
    status: 'live',
    detail: {
      what: 'Optimal Rekruttering AI is an AI-powered screening layer that sits between job applications and the first human interview. It conducts asynchronous, Norwegian-language AI interviews, scores candidates against the role criteria, and delivers a ranked shortlist to the recruiter within 48 hours.',
      problem: 'Recruitment in Norway is slow. The average time from application close to first interview is 12–18 days. Recruiters spend 60–70% of their time on screening — reading CVs, chasing responses, booking calls — before they\'ve spoken to a single qualified candidate.',
      solution: 'Every applicant receives an AI-conducted interview within hours of applying — in Norwegian, tailored to the role. The AI evaluates competency, communication quality, and role fit. The recruiter receives a scored, ranked shortlist with AI-generated summaries. The first human touch is already with the top candidates.',
      businessModel: 'Per-role pricing (NOK 2,000–5,000 per position posted) plus a monthly subscription for volume users. Enterprise plan includes ATS integration and custom scoring frameworks.',
      whyNow: 'Norwegian employers face acute skills shortages in technical and trades roles. Speed-to-hire is now a competitive advantage. AI interview tools have matured to the point where candidates accept them as standard — and Norse-language quality is now strong enough for professional screening.',
      metrics: [
        { label: 'Language', value: 'Norwegian-native AI' },
        { label: 'Shortlist', value: 'Within 48 hours' },
        { label: 'Pricing', value: 'Per-role + subscription' },
        { label: 'ATS', value: 'Integrates via API' },
        { label: 'Status', value: 'Live' },
        { label: 'Category', value: 'AI · recruitment' },
      ],
    },
  },
  {
    id: 'wineiq',
    name: 'WineIQ',
    category: 'AI',
    sector: 'Fine Wine',
    tagline: 'The Bloomberg Terminal for fine wine.',
    description:
      'Pricing, intelligence, and pro tools in one feed — for collectors, dealers, and sommeliers.',
    status: 'live',
    detail: {
      what: 'WineIQ is a professional intelligence platform for the fine wine market — live pricing, auction results, critic scores, cellar valuations, and market trend analysis in a single feed. The Bloomberg Terminal, purpose-built for fine wine.',
      problem: 'Fine wine professionals — collectors, dealers, sommeliers, investors — make significant purchasing decisions using data scattered across auction house PDFs, Wine Advocate subscriber pages, and manually-maintained spreadsheets. There is no single professional-grade data terminal for the category.',
      solution: 'WineIQ aggregates auction results, live secondary market pricing, critic scores, producer release prices, and market trend signals into one dashboard. Collectors get real-time cellar valuations. Dealers get pricing intelligence before they bid. Sommeliers get list-building tools anchored in live market data.',
      businessModel: 'Tiered subscription: Collector (cellar tracking + valuation), Professional (full pricing intelligence + alerts), and Dealer (API access + white-label reporting). Annual contracts at professional and dealer tier.',
      whyNow: 'Fine wine as an asset class has grown significantly post-2020. A new generation of wine investors — younger, data-literate, accustomed to professional trading tools — has entered the market. They expect Bloomberg-grade data. WineIQ is built for them.',
      metrics: [
        { label: 'Data sources', value: 'Auction + secondary + critics' },
        { label: 'Tiers', value: '3 (Collector / Pro / Dealer)' },
        { label: 'Model', value: 'Annual subscription' },
        { label: 'Status', value: 'Live' },
        { label: 'Market', value: 'Fine wine · global' },
        { label: 'Category', value: 'AI · financial intelligence' },
      ],
    },
  },
  {
    id: 'csrd',
    name: 'CSRD Bærekraft',
    category: 'RegTech',
    sector: 'ESG',
    tagline: 'AI-native CSRD reporting for Nordic companies.',
    description:
      'Built for the 30,000+ Nordic companies caught by the EU CSRD directive. AI-native data ingestion, audit-ready reports.',
    status: 'live',
    detail: {
      what: 'CSRD Bærekraft is an AI-native CSRD (Corporate Sustainability Reporting Directive) compliance platform for Nordic companies. It handles data ingestion, gap analysis, narrative drafting, and audit-ready report generation — end to end.',
      problem: 'The EU CSRD directive catches 30,000+ Nordic companies in its first three rollout phases. Most have never produced a sustainability report. The directive requires detailed, structured disclosure across environmental, social, and governance dimensions — to a standard that currently requires expensive consultants and months of internal work.',
      solution: 'CSRD Bærekraft connects to existing data sources (HR systems, energy invoices, supply chain records), identifies CSRD gaps, and drafts the required disclosures using AI trained on the ESRS standards. The result is an audit-ready CSRD report produced in weeks, not months — without a sustainability consultancy.',
      businessModel: 'Annual SaaS licence per company, scaled by revenue tier (which determines CSRD scope). One-off gap assessment fee. Add-on for ongoing monitoring and re-reporting in subsequent years.',
      whyNow: 'CSRD phase-one companies (500+ employees) reported in 2025. Phase two (250+ employees) is 2026. Phase three (SMEs) begins 2027. The compliance wave is here — and most companies have no plan. First-mover advantage in Nordic-language CSRD tooling is significant.',
      metrics: [
        { label: 'Regulation', value: 'EU CSRD / ESRS' },
        { label: 'Target market', value: '30,000+ Nordic companies' },
        { label: 'Output', value: 'Audit-ready CSRD report' },
        { label: 'Timeline', value: 'Weeks, not months' },
        { label: 'Status', value: 'Live' },
        { label: 'Category', value: 'RegTech · ESG' },
      ],
    },
  },
  {
    id: 'soknadshjelp',
    name: 'SøknadsHjelp AI',
    category: 'AI',
    sector: 'Public Funding',
    tagline: 'Self-service AI for Innovation Norway and SkatteFUNN.',
    description:
      'No consultants. One guided session produces a fundable application — coached by AI trained on every approved grant.',
    status: 'live',
    detail: {
      what: 'SøknadsHjelp AI is a self-service platform that helps Norwegian businesses apply for public funding — Innovation Norway grants, SkatteFUNN R&D tax credits, and regional development funds — without hiring a grant consultant.',
      problem: 'Norwegian public funding programmes collectively distribute billions of kroner annually, but a significant share goes to companies that can afford professional grant writers. Smaller businesses — often the intended beneficiaries — submit weak applications or don\'t apply at all, because the process is opaque and the stakes feel high.',
      solution: 'SøknadsHjelp AI walks the founder through their project in a structured interview. The AI — trained on every published approved application and the latest programme criteria — drafts the application in real time, explains what reviewers prioritise, and flags sections that need strengthening before submission.',
      businessModel: 'Per-application fee (NOK 1,500–3,500 depending on programme complexity). Subscription option for businesses that apply repeatedly (accelerators, R&D-heavy companies). Success-based add-on tier under evaluation.',
      whyNow: 'Innovation Norway and SkatteFUNN digitised their intake portals in 2023–2024. The bottleneck shifted from submission to application quality. AI can now produce application-quality Norwegian prose — closing the gap that previously required a human consultant.',
      metrics: [
        { label: 'Programmes covered', value: 'Innovation Norway + SkatteFUNN +' },
        { label: 'Language', value: 'Norwegian-native AI' },
        { label: 'Model', value: 'Per-application + subscription' },
        { label: 'Pricing', value: 'NOK 1,500–3,500 / application' },
        { label: 'Status', value: 'Live' },
        { label: 'Category', value: 'AI · public funding' },
      ],
    },
  },
];

export interface InvestorTier {
  name: string;
  ticket: string;
  description: string;
  benefits: string[];
  highlighted?: boolean;
}

export const investorTiers: InvestorTier[] = [
  {
    name: 'Associate',
    ticket: 'NOK 100,000 – 499,000',
    description: 'Entry into the studio. Quarterly reporting and pro-rata participation in every exit.',
    benefits: [
      'Pro-rata share of all exits & dividends',
      'Quarterly investor letter',
      'Annual portfolio meeting',
      'LP agreement — one clean structure',
    ],
  },
  {
    name: 'Builder',
    ticket: 'NOK 500,000 – 1,999,000',
    description: 'Closer to the studio. Direct contact with the operating team and early venture briefings.',
    benefits: [
      'Everything in Associate',
      'Monthly venture briefings',
      'Direct line to operating team',
      'Early access to new ventures',
    ],
  },
  {
    name: 'Partner',
    ticket: 'NOK 2,000,000 – 4,999,000',
    description: 'Full studio access. Co-investment rights and advisory participation.',
    benefits: [
      'Everything in Builder',
      'Co-investment rights on direct rounds',
      'Advisory board access',
      'Studio strategy sessions',
    ],
    highlighted: true,
  },
  {
    name: 'Cornerstone',
    ticket: 'NOK 5,000,000 – 8,000,000',
    description: 'Anchor investor terms. Highest allocation priority across the portfolio.',
    benefits: [
      'Everything in Partner',
      'Highest allocation priority',
      'Founding partners wall',
      'Direct line to managing partners',
    ],
  },
];