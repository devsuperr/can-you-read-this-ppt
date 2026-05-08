import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { ventures } from '@/lib/portfolio';
import { fadeUp, fadeUpMount, staggerContainer, staggerItem } from '@/lib/animations';

/* ─── Editorial palette ─────────────────────────────────────────────────── */
const INK    = '#1b1b1b';
const BEIGE  = '#dcdad5';
const MUTED  = '#c5c1b9';
const ACCENT = '#575ecf';
const HAIRLINE      = 'rgba(255,255,255,0.08)';
const HAIRLINE_DARK = 'rgba(0,0,0,0.10)';

/* ─── Per-venture rich content ───────────────────────────────────────────── */
interface VentureDetail {
  headline: string;
  what: string;
  problem: string;
  solution: string;
  model: string;
  whyNow: string;
  metrics: { label: string; value: string }[];
  roundNote?: string;
  allocationPct?: number;
}

const details: Record<string, VentureDetail> = {
  workhub: {
    headline: 'Workforce management, reimagined on Pointspay infrastructure.',
    what: 'WorkHub is a modern workforce-management platform built on top of the Pointspay payment and identity infrastructure. It handles scheduling, timesheets, shift bidding, and payroll compliance for distributed teams.',
    problem: 'Workforce management tools are fragmented — one system for scheduling, another for payroll, a third for compliance. Mid-size employers lose 4–6 hours per manager per week reconciling data across platforms.',
    solution: 'A single platform that unifies shift management, real-time attendance, payroll export, and compliance reporting — all running on Pointspay's identity rails so every action is audit-ready by default.',
    model: 'Monthly SaaS per seat, tiered by team size. Integration fees for enterprise payroll connectors. Pointspay transaction revenue share on embedded payroll disbursements.',
    whyNow: 'Post-pandemic hybrid work has permanently fragmented the workforce. Employers are actively replacing legacy HR tools. WorkHub enters a market mid-replacement cycle, with a structural cost advantage from shared Mosaic engineering.',
    metrics: [
      { label: 'Round size', value: 'NOK 2.4M' },
      { label: 'Allocated', value: '60%' },
      { label: 'Available now', value: '40%' },
      { label: 'Stage', value: 'Revenue' },
      { label: 'Infrastructure', value: 'Pointspay' },
      { label: 'Time to deploy', value: '3 weeks' },
    ],
    roundNote: '60% of this round is already committed. Founding Five investors receive allocation priority — speak with a managing partner to reserve the remaining 40%.',
    allocationPct: 60,
  },
  keep: {
    headline: '13 client-facing products. One platform. Fully under your brand.',
    what: 'Keep is a white-labelled AI operating system for Nordic accounting firms. It delivers 13 integrated products — document ingestion, automated bookkeeping, VAT filing, payroll, client portal, and more — all under the firm's own brand identity.',
    problem: 'Nordic accounting firms face a two-front war: major consolidators are acquiring them at record pace while AI tools are eroding the value of manual bookkeeping. Independent firms can't afford to build their own tech stack.',
    solution: 'Keep gives independent firms enterprise-grade AI tooling in three weeks — fully white-labelled, deeply integrated with their existing workflows, and updated continuously by the Mosaic studio team.',
    model: 'White-label SaaS licence fee per firm, scaled by number of clients managed. Upsell on premium modules (audit prep, multi-entity consolidation). Revenue share on embedded payment flows.',
    whyNow: 'The EU accounting directive and Norway's SAF-T mandate are forcing firms to digitise now. Consolidators have created urgency — independent firms need to demonstrate tech capability or sell. Keep is the defensive tool that lets them compete.',
    metrics: [
      { label: 'Products included', value: '13' },
      { label: 'Time to live', value: '3 weeks' },
      { label: 'Exit discussions', value: 'Q2 2026' },
      { label: 'Acquirer tier', value: 'Tier-1 Nordic' },
      { label: 'Market', value: '4,200 firms' },
      { label: 'Stage', value: 'Live & scaling' },
    ],
    roundNote: 'Keep is in early-stage acquisition discussions with a Tier-1 Nordic accounting consolidator. Counterparty named under NDA. Founding Five investors participate in any liquidity event from day one.',
    allocationPct: 75,
  },
  mdio: {
    headline: 'The world\'s first AI-native Nordic Noir universe.',
    what: 'MDIO — Max Dahl — is a transmedia IP universe built from the ground up for the AI era. The 14-volume saga, an interactive cold-case investigation platform, and a personal AI investigator are not separate products bolted together — they are one unified experience.',
    problem: 'Traditional media IP is built for a single format: a book becomes a show, a show becomes a game. Each transition loses fidelity, audience, and margin. Meanwhile, readers and streamers want immersive, interactive worlds they can inhabit — not just watch.',
    solution: 'MDIO builds one universe across three surfaces simultaneously. Every chapter of the saga feeds the platform's case archive. The AI investigator is trained on the universe's lore, giving readers a companion that deepens as they read.',
    model: 'Book sales and subscription access to the investigation platform. Licensing to Netflix/HBO for screen adaptation. B2B licensing of the AI-narrative engine to other IP holders.',
    whyNow: 'Streaming platforms are actively seeking Nordic Noir with built-in audience and IP depth. The AI narrative tooling that makes MDIO possible didn't exist three years ago — first-mover advantage in AI-native storytelling is open right now.',
    metrics: [
      { label: 'Saga volumes', value: '14' },
      { label: 'Platform', value: 'Live Q3 2026' },
      { label: 'Target licensees', value: 'Netflix / HBO' },
      { label: 'IP surfaces', value: '3' },
      { label: 'Genre', value: 'Nordic Noir' },
      { label: 'AI partner', value: 'Integrated' },
    ],
  },
  streken: {
    headline: 'Archive prints, AI interpretations, and original caricature commissions — one marketplace.',
    what: 'Streken is a curated art marketplace focused exclusively on caricature — from museum-quality archive prints of historical subjects to AI-generated interpretations and live commissions from Nordic illustrators.',
    problem: 'Caricature art has no dedicated home online. Illustrators sell through generic platforms (Etsy, Instagram DMs) with no price discovery, no provenance tracking, and no collector infrastructure.',
    solution: 'A vertically specialised marketplace with artist onboarding, print-on-demand fulfilment, a provenance archive for historical works, and an AI interpretation layer that lets buyers commission personalised pieces at scale.',
    model: 'Marketplace commission (15–22%) on original sales. Print-on-demand margin on archive reproductions. Subscription tier for high-volume collectors and corporate gifting accounts.',
    whyNow: 'The art market is moving online. Niche vertical marketplaces consistently outperform general platforms on conversion and seller retention. AI image tools have made bespoke commissions economically viable for the first time.',
    metrics: [
      { label: 'Category', value: 'Art / Marketplace' },
      { label: 'Fulfilment', value: 'Print-on-demand' },
      { label: 'Revenue model', value: 'Commission' },
      { label: 'AI layer', value: 'Integrated' },
      { label: 'Target market', value: 'Nordic + EU' },
      { label: 'Stage', value: 'Building' },
    ],
  },
  aidany: {
    headline: 'An AI Creative Director that judges your marketing ideas before they burn the budget.',
    what: 'Ai Dany is a creative review tool trained on decades of award-winning advertising. It evaluates briefs, headlines, copy, and creative concepts against strategic criteria — giving marketing teams an impartial creative partner before anything goes to production.',
    problem: 'Bad campaigns get approved because the approval chain lacks creative rigour. CMOs and brand managers rely on gut feel and committee consensus rather than systematic creative evaluation. Billions are spent on mediocre work every year.',
    solution: 'A structured AI review layer that scores creative work on strategy alignment, emotional resonance, memorability, and brand consistency — with specific, actionable feedback, not vague scores.',
    model: 'SaaS subscription per marketing team. Enterprise tier for agency-wide deployment with custom brand guidelines training. API access for integration into existing creative workflow tools.',
    whyNow: 'AI tools have automated creative production. The bottleneck has shifted to creative quality control. Ai Dany enters exactly when marketing teams have more output to evaluate and fewer senior creatives to do it.',
    metrics: [
      { label: 'Category', value: 'AI / Marketing' },
      { label: 'Evaluation axes', value: '6' },
      { label: 'Revenue model', value: 'SaaS' },
      { label: 'Integration', value: 'API-first' },
      { label: 'Target buyer', value: 'CMO / Brand' },
      { label: 'Stage', value: 'Building' },
    ],
  },
  guesthub: {
    headline: 'Nine-module guest intelligence — live on any POS in two weeks.',
    what: 'Guest Hub is a hospitality intelligence platform for restaurants. It layers nine modules — guest profiles, preferences, visit history, recommendation engine, retention campaigns, feedback loops, table intelligence, event management, and loyalty — on top of any existing POS system.',
    problem: 'Restaurants are data-rich and insight-poor. POS systems collect transactional data but provide no guest-level intelligence. Repeat customers are treated like first-timers. Retention is managed through discount-heavy loyalty cards that erode margin.',
    solution: 'Guest Hub ingests POS data and builds a living guest profile for every cover — purchase history, dietary preferences, occasion triggers, communication preferences. The nine modules then activate that data across marketing, service, and operations.',
    model: 'Monthly SaaS per venue, tiered by covers per month. Integration fee for non-standard POS connectors. Marketplace revenue share on third-party campaign tools built on the Guest Hub API.',
    whyNow: 'The pandemic reset guest expectations. Personalisation is now table stakes for fine-casual and above. The POS market has fragmented into cloud-native systems with open APIs — the integration burden Guest Hub once faced has essentially disappeared.',
    metrics: [
      { label: 'Modules', value: '9' },
      { label: 'Time to live', value: '2 weeks' },
      { label: 'POS integrations', value: 'Any' },
      { label: 'Category', value: 'SaaS / Hospitality' },
      { label: 'Target market', value: 'Nordic restaurants' },
      { label: 'Stage', value: 'Live' },
    ],
  },
  'luxury-deal-scout': {
    headline: 'Bloomberg-style intelligence for the luxury resale market.',
    what: 'Luxury Deal Scout aggregates pricing, availability, and deal signals from Vestiaire Collective, Chrono24, Vinted, eBay, and specialist auction houses into a single unified feed — giving resellers, collectors, and dealers real-time market intelligence.',
    problem: 'The luxury resale market is fragmented across six or more platforms with no unified price discovery layer. Professional resellers spend 3–4 hours daily manually scanning platforms. Arbitrage opportunities disappear before they\'re spotted.',
    solution: 'A unified intelligence terminal: real-time cross-platform price aggregation, deal alerts for specified brands and references, trend analysis, authentication risk scoring, and a watchlist portfolio tracker.',
    model: 'Tiered subscription: Collector (price alerts), Pro (full feed + API), Dealer (white-label intelligence + bulk data). Annual contracts for institutional buyers (auction houses, insurance valuers).',
    whyNow: 'The pre-owned luxury market is projected to reach €70B by 2030. Professional reselling has become a full-time profession for tens of thousands of Europeans. None of them have access to institutional-grade data tools — until now.',
    metrics: [
      { label: 'Platforms unified', value: '6+' },
      { label: 'Category', value: 'AI / Resale' },
      { label: 'Update frequency', value: 'Real-time' },
      { label: 'Revenue model', value: 'Subscription' },
      { label: 'Market size', value: '€70B by 2030' },
      { label: 'Stage', value: 'Building' },
    ],
  },
  innlandet: {
    headline: 'Local digital partner for craft and trades businesses in Innlandet.',
    what: 'Innlandet AI Partner is a regional digital agency serving craft businesses, tradespeople, and local service providers across the Innlandet county. It delivers websites, customer portals, booking systems, and AI-powered command centres — all built and maintained by the Mosaic studio team.',
    problem: 'Small businesses in rural Norway are digitally underserved. Generic website builders require skills they don't have. National agencies are too expensive and don't understand local markets. The result is an invisible local economy.',
    solution: 'A regionally embedded digital partner that speaks the language, knows the regulations, and delivers enterprise-quality digital infrastructure at SME pricing — powered by Mosaic\'s studio-scale build efficiency.',
    model: 'Monthly retainer for ongoing maintenance and updates. Fixed project fees for initial builds. Upsell on AI command centres (automated booking, customer communication, inventory signals).',
    whyNow: 'Norwegian government digitisation grants (Innovasjon Norge) are actively funding SME digital transformation. Innlandet has a high concentration of craft businesses with zero digital presence and grant money available to spend.',
    metrics: [
      { label: 'Region', value: 'Innlandet, NO' },
      { label: 'Category', value: 'Agency / Regional' },
      { label: 'Revenue model', value: 'Retainer + project' },
      { label: 'Grant eligibility', value: 'Yes — IN funded' },
      { label: 'Target clients', value: 'Craft / trades SME' },
      { label: 'Stage', value: 'Live' },
    ],
  },
  'athlete-portal': {
    headline: 'Two-sided marketplace. Athletes and brands, matched by AI — no agency cut.',
    what: 'Athlete Brand Portal is a direct marketplace connecting athletes with brand partnership opportunities. AI matching surfaces the right athlete for each brief based on audience demographics, engagement rate, sport alignment, and brand values — replacing the agency layer entirely.',
    problem: 'Sports sponsorship and influencer marketing in athletics is brokered by agencies who take 20–35% and add 6–12 weeks of negotiation time. Brands overpay. Athletes underearn. Smaller athletes are invisible to brands entirely.',
    solution: 'A two-sided platform where brands post briefs and athletes apply directly. The AI matching engine scores fit, surfaces ranked candidates, and generates a deal structure. Both parties transact directly inside the platform.',
    model: 'Success fee (8–12%) on completed deals, charged to the brand. Premium athlete accounts with analytics and deal management tools (monthly subscription). Sponsored placement for brands seeking broad exposure.',
    whyNow: 'The athlete-as-media-channel model has been validated by creator economy platforms. Sports audiences are premium — higher income, higher purchase intent. Brands are actively moving budget from traditional sports sponsorship to athlete partnerships.',
    metrics: [
      { label: 'Category', value: 'Marketplace / Sports' },
      { label: 'Agency cut replaced', value: '20–35%' },
      { label: 'Platform fee', value: '8–12%' },
      { label: 'Matching engine', value: 'AI-powered' },
      { label: 'Target market', value: 'Nordic + EU athletes' },
      { label: 'Stage', value: 'Building' },
    ],
  },
  'optimal-rekruttering': {
    headline: 'AI screening in Norwegian. 48-hour shortlist. No CV pile.',
    what: 'Optimal Rekruttering AI is an intelligent screening layer that sits between job posting and recruiter review. It conducts structured Norwegian-language AI interviews with every applicant, scores them against the role criteria, and delivers a ranked shortlist within 48 hours.',
    problem: 'Recruiters spend 60–70% of their time screening applications that won't make the shortlist. The screening step is the most time-intensive and least value-adding part of recruitment — and it scales poorly with volume.',
    solution: 'Every applicant receives an AI-conducted interview — structured, consistent, bias-reduced, and fully in Norwegian. The system scores on competency, cultural alignment, and role fit, then delivers a ranked, reasoned shortlist to the recruiter.',
    model: 'Per-role fee for shortlist delivery. Monthly subscription for high-volume recruiters (agencies, enterprise HR). White-label API for ATS integrations (Teamtailor, Webcruiter).',
    whyNow: 'The Norwegian labour market is tight. Recruiters are overwhelmed. AI interview tools trained on English exist — but none optimised for Norwegian language, culture, and labour law compliance. First-mover advantage in a mid-size, high-value market.',
    metrics: [
      { label: 'Language', value: 'Norwegian' },
      { label: 'Shortlist SLA', value: '48 hours' },
      { label: 'Category', value: 'AI / Recruitment' },
      { label: 'Revenue model', value: 'Per-role + SaaS' },
      { label: 'ATS integrations', value: 'API-first' },
      { label: 'Stage', value: 'Live' },
    ],
  },
  wineiq: {
    headline: 'The Bloomberg Terminal for fine wine — pricing, intelligence, and pro tools in one feed.',
    what: 'WineIQ aggregates auction results, merchant pricing, critic scores, cellar release data, and provenance records into a unified professional intelligence platform for fine wine collectors, dealers, and sommeliers.',
    problem: 'Fine wine pricing is opaque, fragmented, and slow. Auction results live in PDFs. Merchant prices are manually scraped. Critics\' scores are locked in paywalls. Serious buyers make six-figure decisions with amateur-grade information.',
    solution: 'A unified feed that combines live auction data, merchant pricing, critic scores, and cellar release schedules — with portfolio tracking, deal alerts, and a valuation tool that uses comparable sales to give defensible price estimates.',
    model: 'Tiered subscription: Collector, Pro, Merchant. Enterprise licensing for insurers, banks, and family offices with cellar assets. API access for auction house and merchant integrations.',
    whyNow: 'Alternative assets — including fine wine — are increasingly held by HNWI portfolios seeking uncorrelated returns. The infrastructure supporting this market is 10 years behind equities. Institutional buyers want institutional-grade tools.',
    metrics: [
      { label: 'Category', value: 'AI / Fine Wine' },
      { label: 'Data sources', value: '12+ unified' },
      { label: 'Revenue model', value: 'Subscription + API' },
      { label: 'Target buyer', value: 'Collector / Dealer' },
      { label: 'Market size', value: '$50B+ wine assets' },
      { label: 'Stage', value: 'Building' },
    ],
  },
  csrd: {
    headline: 'AI-native CSRD reporting for the 30,000+ Nordic companies the EU directive caught.',
    what: 'CSRD Bærekraft is an AI-native sustainability reporting platform built specifically for the 30,000+ Nordic companies now required to file under the EU\'s Corporate Sustainability Reporting Directive. It ingests operational data, maps it to ESRS standards, and produces audit-ready reports.',
    problem: 'CSRD compliance requires 200+ data points across 12 reporting standards. Consultants charge NOK 400–800K per report. Most mid-market companies have no dedicated ESG function and no idea where to start.',
    solution: 'A guided AI workflow that walks companies through data collection, maps inputs to the correct ESRS disclosure requirements, flags gaps, and produces a structured report that satisfies both internal governance and external auditors.',
    model: 'Annual subscription per company, tiered by employee count. Accountant and advisor channel (white-label or referral). Government grant-eligible for SMEs in Norway via Innovasjon Norge.',
    whyNow: 'The CSRD deadline for the first wave of companies was January 2025. The second and third waves (covering most Nordic mid-market companies) hit in 2026 and 2027. There is a hard, legally mandated deadline creating immediate, non-discretionary demand.',
    metrics: [
      { label: 'Category', value: 'RegTech / ESG' },
      { label: 'Companies in scope', value: '30,000+ Nordic' },
      { label: 'ESRS standards', value: '12 covered' },
      { label: 'Consultant cost replaced', value: 'NOK 400–800K' },
      { label: 'Compliance deadline', value: '2026–2027' },
      { label: 'Stage', value: 'Live' },
    ],
  },
  soknadshjelp: {
    headline: 'Self-service AI for Innovation Norway and SkatteFUNN — no consultants, one session.',
    what: 'SøknadsHjelp AI is a guided grant-application tool for Norwegian SMEs. It coaches founders and operators through the Innovation Norway and SkatteFUNN application processes with an AI trained on every approved application in the archive — producing fundable drafts in a single guided session.',
    problem: 'Grant consultants charge NOK 30–80K to write a SkatteFUNN application — for a grant that\'s worth NOK 100–500K. Smaller companies can't afford the consultant and leave public funding on the table. The application process is opaque, inconsistent, and administratively burdensome.',
    solution: 'A structured AI coach that walks applicants through the grant criteria question by question, flags the evidence they need to provide, and assembles a compliant application document — trained on the language and framing patterns of approved applications.',
    model: 'Per-application fee (fraction of consultant cost). Subscription for accountants and advisors handling multiple clients. Revenue share with accounting firm partners who bundle SøknadsHjelp into their service offer.',
    whyNow: 'Innovation Norway\'s 2024 budget increased by 18%. SkatteFUNN approvals hit a five-year high. Awareness of available grants is at record levels — but uptake is constrained by the friction of the application process, not by lack of eligibility.',
    metrics: [
      { label: 'Category', value: 'AI / Public Funding' },
      { label: 'Grants covered', value: 'IN + SkatteFUNN' },
      { label: 'Consultant fee replaced', value: 'NOK 30–80K' },
      { label: 'Session length', value: '1 guided session' },
      { label: 'Revenue model', value: 'Per-application' },
      { label: 'Stage', value: 'Live' },
    ],
  },
};

/* ─────────────────────────────────────────────────────────────────────────
   VentureDetailPage
   Route: /projects/:id
   ───────────────────────────────────────────────────────────────────────── */
export default function VentureDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const venture = ventures.find((v) => v.id === id);
  const detail  = id ? details[id] : undefined;

  /* Unknown venture — fall through to NotFound */
  if (!venture || !detail) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-md">
          <div className="text-[11px] uppercase tracking-[0.3em] mb-4" style={{ color: ACCENT }}>
            Mosaic
          </div>
          <h1 className="font-display text-4xl font-light mb-4" style={{ color: '#fff' }}>
            Venture not found
          </h1>
          <p className="mb-8 text-base" style={{ color: MUTED }}>
            This venture isn't in the portfolio — or the link is incorrect.
          </p>
          <button
            onClick={() => navigate('/projects')}
            className="px-7 py-3 rounded-full font-medium text-sm"
            style={{ background: ACCENT, color: '#fff' }}
          >
            ← Back to portfolio
          </button>
        </div>
      </div>
    );
  }

  /* Sibling ventures (3 others, not self) */
  const siblings = ventures
    .filter((v) => v.id !== venture.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  const hasRound = venture.id === 'workhub' || venture.id === 'keep';

  return (
    <div className="page-enter" style={{ background: INK, color: '#fff' }}>

      {/* ═══ BACK STRIP ════════════════════════════════════════════════════ */}
      <div className="border-b" style={{ borderColor: HAIRLINE }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <button
            onClick={() => navigate('/projects')}
            className="inline-flex items-center gap-2 text-sm transition-colors hover:opacity-70"
            style={{ color: MUTED }}
          >
            <ArrowLeft size={14} />
            All ventures
          </button>
          <span
            className="text-[11px] uppercase tracking-[0.3em]"
            style={{ color: MUTED }}
          >
            {venture.category} · {venture.sector}
          </span>
        </div>
      </div>

      {/* ═══ HERO ══════════════════════════════════════════════════════════ */}
      <section className="border-b" style={{ borderColor: HAIRLINE }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-20 md:pb-32">

          {/* Eyebrow */}
          <motion.div
            {...fadeUpMount(0)}
            className="flex flex-wrap items-center gap-3 mb-10 md:mb-16"
          >
            <span
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em]"
              style={{ color: ACCENT }}
            >
              <span
                className={
                  venture.status === 'live' || venture.status === 'featured'
                    ? 'w-1.5 h-1.5 rounded-full bg-emerald-400'
                    : 'w-1.5 h-1.5 rounded-full'
                }
                style={
                  venture.status === 'building'
                    ? { background: ACCENT }
                    : undefined
                }
              />
              {venture.status === 'featured'
                ? 'Open round'
                : venture.status === 'live'
                ? 'Live'
                : 'Building'}
            </span>
            {venture.highlight && (
              <span
                className="text-[11px] uppercase tracking-[0.25em] px-3 py-1 border"
                style={{ borderColor: `${ACCENT}60`, color: ACCENT }}
              >
                {venture.highlight}
              </span>
            )}
          </motion.div>

          {/* Venture name */}
          <motion.h1
            {...fadeUpMount(0.1)}
            className="font-display font-light leading-[0.92] tracking-tight text-balance mb-8"
            style={{ fontSize: 'clamp(2.75rem,9vw,9rem)', color: '#fff' }}
          >
            {venture.name}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            {...fadeUpMount(0.2)}
            className="font-display text-xl md:text-2xl font-light mb-8 max-w-3xl leading-snug italic"
            style={{ color: ACCENT }}
          >
            {detail.headline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUpMount(0.3)}
            className="flex flex-wrap gap-3"
          >
            <Link
              to="/apply"
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-full font-medium text-sm transition-all"
              style={{ background: ACCENT, color: '#fff' }}
            >
              Invest in this venture
              <ArrowUpRight
                size={16}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition"
              />
            </Link>
            <button
              onClick={() => navigate('/projects')}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-medium text-sm border transition hover:bg-white/5"
              style={{ borderColor: 'rgba(255,255,255,0.15)', color: '#fff' }}
            >
              ← Back to portfolio
            </button>
          </motion.div>
        </div>
      </section>

      {/* ═══ ROUND INFO (WorkHub + Keep only) ═════════════════════════════ */}
      {hasRound && (
        <section className="border-b" style={{ borderColor: HAIRLINE }}>
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 md:py-16">
            <motion.div
              {...fadeUp}
              className="grid md:grid-cols-12 gap-px border"
              style={{ background: HAIRLINE, borderColor: HAIRLINE }}
            >
              {/* Status cell */}
              <div
                className="md:col-span-3 p-8 md:p-10 flex flex-col justify-between"
                style={{ background: ACCENT }}
              >
                <div className="text-[11px] uppercase tracking-[0.3em] mb-4 text-white/70">
                  Round status
                </div>
                <div className="font-display text-5xl font-light text-white tabular-nums">
                  {detail.allocationPct}%
                </div>
                <div className="text-sm text-white/80 mt-2">
                  allocated — {100 - (detail.allocationPct ?? 0)}% remaining
                </div>
              </div>

              {/* Progress + note */}
              <div
                className="md:col-span-9 p-8 md:p-10"
                style={{ background: INK }}
              >
                <div
                  className="text-[11px] uppercase tracking-[0.3em] mb-5"
                  style={{ color: MUTED }}
                >
                  Allocation progress
                </div>
                {/* Bar */}
                <div
                  className="w-full h-2 mb-8 rounded-none overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${detail.allocationPct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    className="h-full shimmer"
                  />
                </div>
                <p className="text-base leading-relaxed max-w-2xl" style={{ color: MUTED }}>
                  {detail.roundNote}
                </p>
                <Link
                  to="/apply"
                  className="inline-flex items-center gap-2 mt-6 text-sm uppercase tracking-[0.2em] pb-1 border-b transition"
                  style={{ borderColor: ACCENT, color: ACCENT }}
                >
                  Reserve your allocation
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ═══ FIVE NUMBERED EDITORIAL SECTIONS ═════════════════════════════ */}
      {([
        { n: '01', label: 'What it is',    body: detail.what },
        { n: '02', label: 'The problem',   body: detail.problem },
        { n: '03', label: 'The solution',  body: detail.solution },
        { n: '04', label: 'Business model', body: detail.model },
        { n: '05', label: 'Why now',       body: detail.whyNow },
      ]).map((sec, i) => (
        <section
          key={sec.n}
          className="border-b"
          style={{
            borderColor: HAIRLINE,
            background: i === 1 ? 'rgba(255,255,255,0.015)' : INK,
          }}
        >
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24 grid md:grid-cols-12 gap-10">
            <div className="md:col-span-3 flex md:flex-col gap-4 md:gap-0 items-start">
              <div
                className="font-display font-light tabular-nums leading-none"
                style={{ fontSize: 'clamp(3rem,5vw,5rem)', color: 'rgba(255,255,255,0.06)' }}
              >
                {sec.n}
              </div>
              <motion.div
                {...fadeUp}
                className="text-[11px] uppercase tracking-[0.3em] md:mt-4"
                style={{ color: ACCENT }}
              >
                {sec.label}
              </motion.div>
            </div>
            <motion.p
              {...fadeUp}
              className="md:col-span-9 text-lg md:text-xl leading-relaxed font-light self-center"
              style={{ color: BEIGE }}
            >
              {sec.body}
            </motion.p>
          </div>
        </section>
      ))}

      {/* ═══ BEIGE BLOCK — metrics grid ════════════════════════════════════ */}
      <section style={{ background: BEIGE, color: INK }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <motion.div {...fadeUp} className="mb-14">
            <div
              className="text-[11px] uppercase tracking-[0.3em] mb-4"
              style={{ color: ACCENT }}
            >
              06 — Venture at a glance
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light leading-tight tracking-tight">
              Key facts &amp; figures.
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-2 md:grid-cols-3 gap-px border"
            style={{ background: HAIRLINE_DARK, borderColor: HAIRLINE_DARK }}
          >
            {detail.metrics.map((m) => (
              <motion.div
                key={m.label}
                variants={staggerItem}
                className="p-8 md:p-10"
                style={{ background: BEIGE }}
              >
                <div
                  className="text-[10px] uppercase tracking-[0.3em] mb-4"
                  style={{ color: 'rgba(0,0,0,0.45)' }}
                >
                  {m.label}
                </div>
                <div
                  className="font-display font-light leading-none tabular-nums"
                  style={{ fontSize: 'clamp(1.75rem,3.5vw,2.75rem)', color: INK }}
                >
                  {m.value}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ MORE FROM THE PORTFOLIO ════════════════════════════════════════ */}
      <section className="border-b" style={{ borderColor: HAIRLINE }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <motion.div
            {...fadeUp}
            className="flex items-end justify-between gap-6 mb-14"
          >
            <div>
              <div
                className="text-[11px] uppercase tracking-[0.3em] mb-4"
                style={{ color: ACCENT }}
              >
                More from the studio
              </div>
              <h2
                className="font-display text-4xl md:text-5xl font-light leading-tight tracking-tight"
                style={{ color: '#fff' }}
              >
                Also inside Mosaic.
              </h2>
            </div>
            <Link
              to="/projects"
              className="group hidden md:inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] pb-1 border-b transition"
              style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#fff' }}
            >
              All 13 ventures
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
            </Link>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: '-60px' }}
            className="grid md:grid-cols-3 gap-px border"
            style={{ background: HAIRLINE, borderColor: HAIRLINE }}
          >
            {siblings.map((s) => (
              <motion.div key={s.id} variants={staggerItem}>
                <Link
                  to={`/projects/${s.id}`}
                  className="group flex flex-col p-8 md:p-10 h-full transition-colors"
                  style={{ background: INK, color: 'inherit', textDecoration: 'none' }}
                >
                  <div
                    className="text-[10px] uppercase tracking-[0.25em] mb-6"
                    style={{ color: MUTED }}
                  >
                    {s.category} · {s.sector}
                  </div>
                  <h3
                    className="font-display text-2xl md:text-3xl font-light mb-3 leading-tight group-hover:translate-x-1 transition-transform duration-300"
                    style={{ color: '#fff' }}
                  >
                    {s.name}
                  </h3>
                  <p
                    className="text-sm leading-relaxed flex-1"
                    style={{ color: MUTED }}
                  >
                    {s.tagline}
                  </p>
                  <div
                    className="mt-8 pt-5 border-t flex items-center justify-between"
                    style={{ borderColor: HAIRLINE }}
                  >
                    <span
                      className="flex items-center gap-1.5 text-xs uppercase tracking-[0.2em]"
                      style={{ color: s.status === 'live' ? '#34d399' : ACCENT }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: s.status === 'live' ? '#34d399' : ACCENT,
                        }}
                      />
                      {s.status === 'featured' ? 'Open round' : s.status === 'live' ? 'Live' : 'Building'}
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="opacity-0 group-hover:opacity-60 -translate-x-1 group-hover:translate-x-0 transition-all duration-300"
                      style={{ color: BEIGE }}
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ BEIGE CTA ═════════════════════════════════════════════════════ */}
      <section style={{ background: BEIGE, color: INK }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <motion.div
            {...fadeUp}
            className="grid md:grid-cols-12 gap-10 items-center"
          >
            <div className="md:col-span-7">
              <div
                className="text-[11px] uppercase tracking-[0.3em] mb-6"
                style={{ color: ACCENT }}
              >
                One ticket. Every venture.
              </div>
              <h2 className="font-display text-4xl md:text-6xl font-light leading-[1.02] tracking-tight text-balance">
                Invest in {venture.name} —
                <span style={{ color: 'rgba(0,0,0,0.45)' }}> and every other venture we'll ever build.</span>
              </h2>
            </div>
            <div className="md:col-span-5 flex flex-col sm:flex-row md:justify-end gap-3">
              <Link
                to="/apply"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-medium text-sm transition-all"
                style={{ background: INK, color: BEIGE }}
              >
                Apply for investment
                <ArrowUpRight
                  size={16}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition"
                />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-medium text-sm border transition hover:bg-black/5"
                style={{ borderColor: 'rgba(0,0,0,0.2)', color: INK }}
              >
                View all ventures
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}