import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { investorTiers } from '@/lib/portfolio';
import { useCountUp } from '@/hooks/useCountUp';
import { fadeUp, fadeUpMount, staggerContainer, staggerItem, widthReveal } from '@/lib/animations';
import { cn } from '@/lib/utils';

/* ─── Editorial palette — matches the rest of the site ──────────────────── */
const INK    = '#1b1b1b';
const BEIGE  = '#dcdad5';
const MUTED  = '#c5c1b9';
const ACCENT = '#575ecf';
const HAIRLINE      = 'rgba(255,255,255,0.08)';
const HAIRLINE_DARK = 'rgba(0,0,0,0.10)';

export default function InvestorPage() {
  return (
    <div className="page-enter" style={{ background: INK, color: '#fff' }}>

      {/* ═══ HERO ══════════════════════════════════════════════════════════ */}
      <section className="border-b" style={{ borderColor: HAIRLINE }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-20 md:pt-28 pb-20 md:pb-32">

          {/* eyebrow */}
          <motion.div
            {...fadeUpMount(0)}
            className="flex flex-wrap items-center justify-between gap-4 mb-16 md:mb-24"
          >
            <span className="inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.3em]" style={{ color: MUTED }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
              For Investors — Mosaic Venture Studio
            </span>
            <span className="text-[11px] uppercase tracking-[0.3em]" style={{ color: MUTED }}>
              Oslo · 2026 · Confidential
            </span>
          </motion.div>

          {/* headline */}
          <motion.h1
            {...fadeUpMount(0.1)}
            className="font-display font-light leading-[0.92] tracking-tight text-balance"
            style={{ fontSize: 'clamp(2.75rem,9vw,9.5rem)', color: '#fff' }}
          >
            Own a piece of
            <br />
            <span style={{ color: MUTED }}>every venture</span>
            <br />
            we'll{' '}
            <em className="italic font-normal" style={{ color: ACCENT }}>ever</em>
            <br />
            build.
          </motion.h1>

          {/* sub + CTAs */}
          <div className="mt-12 md:mt-20 grid md:grid-cols-12 gap-10 items-end">
            <motion.p
              {...fadeUpMount(0.25)}
              className="md:col-span-7 text-lg md:text-2xl font-light leading-relaxed max-w-2xl"
              style={{ color: BEIGE }}
            >
              One ticket into the holding company. Thirteen operating ventures inside today.
              Every company we build tomorrow. Tickets from NOK 100,000 — no fund minimum,
              no 10-year lockup, one clean LP agreement.
            </motion.p>
            <motion.div
              {...fadeUpMount(0.35)}
              className="md:col-span-5 flex flex-col sm:flex-row md:justify-end gap-3"
            >
              <Link
                to="/apply"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-medium text-sm transition-all"
                style={{ background: ACCENT, color: '#fff' }}
              >
                Apply for investment
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-medium text-sm border transition-all hover:bg-white/5"
                style={{ borderColor: 'rgba(255,255,255,0.15)', color: '#fff' }}
              >
                View portfolio
              </Link>
            </motion.div>
          </div>
        </div>

        {/* marquee */}
        <motion.div
          {...fadeUpMount(0.45)}
          className="border-t border-b py-5 overflow-hidden"
          style={{ borderColor: HAIRLINE }}
        >
          <div className="flex items-center gap-12 md:gap-20 whitespace-nowrap text-[11px] uppercase tracking-[0.3em] px-6" style={{ color: MUTED }}>
            <span>13 Ventures in studio</span>
            <span style={{ color: ACCENT }}>●</span>
            <span>NOK 100K — 8M tickets</span>
            <span style={{ color: ACCENT }}>●</span>
            <span>Founding Five — all 5 open</span>
            <span style={{ color: ACCENT }}>●</span>
            <span>WorkHub · 60% allocated</span>
            <span style={{ color: ACCENT }}>●</span>
            <span>Keep · acquisition in motion Q2 2026</span>
            <span style={{ color: ACCENT }}>●</span>
            <span>One LP agreement · one quarterly update</span>
          </div>
        </motion.div>
      </section>

      {/* ═══ THE PROBLEM — beige inverted ══════════════════════════════════ */}
      <section style={{ background: BEIGE, color: INK }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-40">
          <motion.div {...fadeUp} className="max-w-4xl mb-16 md:mb-24">
            <div className="text-[11px] uppercase tracking-[0.3em] mb-8" style={{ color: ACCENT }}>
              01 — The problem with early-stage investing
            </div>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-light leading-[1.05] tracking-tight text-balance">
              The trade-off no investor
              should have to make.
              <span className="block mt-3" style={{ color: 'rgba(0,0,0,0.45)' }}>
                We removed it.
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: '-80px' }}
            className="grid md:grid-cols-3 gap-px border"
            style={{ background: HAIRLINE_DARK, borderColor: HAIRLINE_DARK }}
          >
            {[
              {
                stat: '90%',
                title: 'Most startups fail',
                body: "Nine out of ten early-stage ventures don't survive their first decade. A single-company bet is a binary outcome.",
              },
              {
                stat: '10×',
                title: 'Diversification is gated',
                body: 'Traditional VCs demand millions in commitments, accredited-only tickets, and 10-year lockups. Effectively closed to most investors.',
              },
              {
                stat: '01',
                title: 'One shot at picking right',
                body: "Angel investors typically back one or two companies. Even with sharp judgement, the math is unforgiving — most still end up with nothing.",
              },
            ].map((c) => (
              <motion.div key={c.stat} variants={staggerItem} className="p-8 md:p-12" style={{ background: BEIGE }}>
                <div className="font-display text-6xl md:text-7xl font-light mb-8 leading-none tabular-nums">
                  {c.stat}
                </div>
                <h3 className="font-display text-xl md:text-2xl mb-3 leading-snug">{c.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(0,0,0,0.65)' }}>{c.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ THE THESIS — numbered editorial table ═════════════════════════ */}
      <section className="border-b" style={{ borderColor: HAIRLINE }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-32 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <motion.div {...fadeUp} className="md:sticky md:top-32">
              <div className="text-[11px] uppercase tracking-[0.3em] mb-6" style={{ color: ACCENT }}>
                02 — Why Mosaic
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-light leading-[1.05] tracking-tight" style={{ color: '#fff' }}>
                A studio,
                <br />
                not a fund.
                <br />
                <span style={{ color: MUTED }}>Built to compound.</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed max-w-md" style={{ color: MUTED }}>
                We don't write cheques and wait. We build, operate, and compound know-how across
                every venture — so each new company benefits from everything that came before.
              </p>
            </motion.div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: '-100px' }}
            className="md:col-span-8 divide-y"
            style={{ borderColor: HAIRLINE }}
          >
            {[
              {
                n: '01',
                t: 'Diversified by construction',
                d: 'One holding company. Thirteen operating ventures across AI, SaaS, marketplaces, media, and RegTech. One ticket is exposure to all of them — now and in every venture we ever build.',
              },
              {
                n: '02',
                t: 'Operated, not just funded',
                d: 'Shared finance, legal, design, and engineering serve every venture. Capital efficiency per venture is 3–5× a standalone startup. Better work, less capital, faster validation.',
              },
              {
                n: '03',
                t: 'Resilient by math',
                d: '99% probability that at least one venture in a 10+ portfolio produces a meaningful exit. Losses are absorbed by winners. The power law works in your favour.',
              },
              {
                n: '04',
                t: 'Aligned by exit',
                d: 'Our upside comes from venture exits — not management fees. We build with our own hands and hold equity in every company. When you win, we win.',
              },
            ].map((row) => (
              <motion.div
                key={row.n}
                variants={staggerItem}
                className="grid grid-cols-12 gap-6 py-8 group cursor-default"
                style={{ borderColor: HAIRLINE }}
              >
                <div className="col-span-2 md:col-span-1 font-display text-2xl tabular-nums" style={{ color: ACCENT }}>
                  {row.n}
                </div>
                <div className="col-span-10 md:col-span-8">
                  <h3 className="font-display text-2xl md:text-3xl font-light mb-2 group-hover:translate-x-1 transition-transform duration-300" style={{ color: '#fff' }}>
                    {row.t}
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: MUTED }}>{row.d}</p>
                </div>
                <div className="hidden md:flex col-span-3 justify-end items-start pt-2">
                  <ArrowUpRight
                    size={20}
                    className="opacity-0 group-hover:opacity-60 -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                    style={{ color: BEIGE }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ══════════════════════════════════════════════════ */}
      <section className="border-b" style={{ borderColor: HAIRLINE }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-40">
          <motion.div {...fadeUp} className="max-w-3xl mb-16 md:mb-24">
            <div className="text-[11px] uppercase tracking-[0.3em] mb-6" style={{ color: ACCENT }}>
              03 — How it works
            </div>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-light leading-[1.02] tracking-tight text-balance" style={{ color: '#fff' }}>
              From your capital to a diversified portfolio —
              <span style={{ color: MUTED }}> in one step.</span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: '-80px' }}
            className="grid md:grid-cols-3 gap-12 md:gap-16"
          >
            {[
              {
                n: '01',
                t: 'You invest in Mosaic',
                d: 'A single ticket into the holding company. No need to pick companies, sectors, or stages. NOK 100,000 to NOK 8,000,000. One LP agreement.',
              },
              {
                n: '02',
                t: 'We deploy across the portfolio',
                d: '80% of your capital is allocated across current and future ventures. 20% funds the operating backbone — legal, compliance, finance, audit, and shared services.',
              },
              {
                n: '03',
                t: 'You share every outcome',
                d: 'Your shareholding entitles you to a proportional share of every exit, dividend, and secondary. One win can carry the portfolio — and you\'re always in.',
              },
            ].map((s, i) => (
              <motion.div key={s.n} variants={staggerItem} className="relative">
                <div
                  className="font-display font-light leading-none mb-2 -ml-1 tabular-nums"
                  style={{ fontSize: 'clamp(5rem,11vw,10rem)', color: i === 1 ? ACCENT : 'rgba(255,255,255,0.08)' }}
                >
                  {s.n}
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-light mb-4 leading-tight" style={{ color: '#fff' }}>
                  {s.t}
                </h3>
                <p className="text-base leading-relaxed max-w-sm" style={{ color: MUTED }}>{s.d}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ WORKHUB FEATURED ROUND ════════════════════════════════════════ */}
      <section className="border-b" style={{ borderColor: HAIRLINE }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-40">
          <motion.div {...fadeUp} className="max-w-2xl mb-16 md:mb-20">
            <div className="text-[11px] uppercase tracking-[0.3em] mb-6" style={{ color: ACCENT }}>
              04 — Open round
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-light leading-[1.02] tracking-tight" style={{ color: '#fff' }}>
              WorkHub.
              <span style={{ color: MUTED }}> 40% of the round remains.</span>
            </h2>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="grid md:grid-cols-12 gap-8 p-8 md:p-12 border"
            style={{
              borderColor: 'rgba(255,255,255,0.1)',
              background: 'linear-gradient(135deg, rgba(87,94,207,0.08), transparent 60%)',
            }}
          >
            <div className="md:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] px-3 py-1 rounded-full"
                  style={{ background: 'rgba(87,94,207,0.15)', color: ACCENT, border: `1px solid ${ACCENT}40` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full pulse-ring" style={{ background: ACCENT }} />
                  Featured · Open round
                </span>
              </div>
              <h3 className="font-display text-4xl md:text-5xl font-light leading-tight mb-4" style={{ color: '#fff' }}>
                WorkHub
              </h3>
              <p className="text-lg leading-relaxed mb-4 max-w-xl" style={{ color: BEIGE }}>
                Workforce-management platform built on Pointspay infrastructure. Already in market, generating revenue.
              </p>
              <p className="text-sm leading-relaxed max-w-xl" style={{ color: MUTED }}>
                60% of the round is committed to early backers. Founding-investor allocation is the only entry left for new capital. Once filled, this ticket at these terms will not be offered again.
              </p>
              <Link
                to="/apply"
                className="group inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full text-sm font-medium transition-all"
                style={{ background: ACCENT, color: '#fff' }}
              >
                Reserve your allocation
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </Link>
            </div>

            <div className="md:col-span-5 md:border-l md:pl-8" style={{ borderColor: HAIRLINE }}>
              <div className="flex items-baseline justify-between mb-3">
                <span className="text-[10px] uppercase tracking-[0.25em]" style={{ color: MUTED }}>Round allocation</span>
                <span className="font-display text-3xl tabular-nums" style={{ color: ACCENT }}>60%</span>
              </div>
              <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <motion.div
                  {...widthReveal('60%', 0.2)}
                  className="h-full rounded-full shimmer"
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.2em]" style={{ color: MUTED }}>
                <span>Allocated to early backers</span>
                <span style={{ color: '#fff' }}>40% available</span>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-6 pt-8 border-t" style={{ borderColor: HAIRLINE }}>
                {[
                  { l: 'Stage', v: 'Live · revenue generating' },
                  { l: 'Infrastructure', v: 'Pointspay' },
                  { l: 'Target market', v: 'Nordic SMEs' },
                  { l: 'Entry terms', v: 'Founding-investor' },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="text-[10px] uppercase tracking-[0.25em] mb-2" style={{ color: MUTED }}>{s.l}</div>
                    <div className="text-sm" style={{ color: '#fff' }}>{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ EARLY LIQUIDITY — confidential card ═══════════════════════════ */}
      <section className="border-b" style={{ borderColor: HAIRLINE }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-40">
          <motion.div
            {...fadeUp}
            className="grid md:grid-cols-12 gap-10 p-8 md:p-12 border"
            style={{
              borderColor: 'rgba(255,255,255,0.1)',
              background: 'linear-gradient(135deg, rgba(87,94,207,0.05), transparent 70%)',
            }}
          >
            <div className="md:col-span-4">
              <div
                className="text-[11px] uppercase tracking-[0.3em] mb-6 inline-flex items-center gap-2"
                style={{ color: ACCENT }}
              >
                <span className="w-1.5 h-1.5 rounded-full pulse-ring" style={{ background: ACCENT }} />
                Confidential · Q2 2026
              </div>
              <h3 className="font-display text-3xl md:text-4xl font-light leading-tight" style={{ color: '#fff' }}>
                Early liquidity already on the table.
              </h3>
            </div>
            <div className="md:col-span-8">
              <p className="text-lg leading-relaxed mb-6" style={{ color: BEIGE }}>
                Keep — the white-labelled AI accounting OS in our portfolio — is in early-stage acquisition
                discussions with a tier-1 Nordic consolidator rolling up the accounting market.
                Counterparty named under NDA.
              </p>
              <p className="text-sm leading-relaxed mb-8" style={{ color: MUTED }}>
                If a transaction completes, proceeds flow into Mosaic and are distributed pro-rata to every
                shareholder — a first liquidity event before the studio is at full deployment.
                Founding-Five investors participate at preferential pricing from day one.
              </p>
              <Link
                to="/projects/keep"
                className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] pb-1 border-b transition"
                style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#fff' }}
              >
                View Keep venture detail
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </Link>
              <p className="mt-8 text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
                * Discussions are preliminary and subject to NDA. No transaction is committed; timing, terms,
                counterparty identity, and outcome are subject to change.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ INVESTOR TIERS ════════════════════════════════════════════════ */}
      <section className="border-b" style={{ borderColor: HAIRLINE }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-40">
          <motion.div {...fadeUp} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24">
            <div className="max-w-2xl">
              <div className="text-[11px] uppercase tracking-[0.3em] mb-6" style={{ color: ACCENT }}>
                05 — Investor tiers
              </div>
              <h2 className="font-display text-4xl md:text-6xl font-light leading-[1.02] tracking-tight text-balance" style={{ color: '#fff' }}>
                Accessible at NOK 100,000.
                <span style={{ color: MUTED }}> Scalable to NOK 8,000,000.</span>
              </h2>
            </div>
            <Link
              to="/apply"
              className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] self-start md:self-end pb-2 border-b transition-colors"
              style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#fff' }}
            >
              Apply now
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
            </Link>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: '-80px' }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-px border"
            style={{ background: HAIRLINE, borderColor: HAIRLINE }}
          >
            {investorTiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                className="flex flex-col p-8 md:p-10"
                style={{ background: INK }}
              >
                {tier.highlighted && (
                  <div className="text-[10px] uppercase tracking-[0.25em] mb-4" style={{ color: ACCENT }}>
                    Most chosen
                  </div>
                )}
                <div
                  className="font-display font-light tabular-nums mb-1 leading-none"
                  style={{ fontSize: 'clamp(3rem,5vw,4.5rem)', color: tier.highlighted ? ACCENT : 'rgba(255,255,255,0.12)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display text-2xl font-light mb-2 mt-4" style={{ color: '#fff' }}>
                  {tier.name}
                </h3>
                <div className="text-sm font-medium mb-4" style={{ color: ACCENT }}>
                  {tier.ticket}
                </div>
                <p className="text-sm leading-relaxed mb-8 flex-1" style={{ color: MUTED }}>
                  {tier.description}
                </p>
                <ul className="space-y-3 mb-8 border-t pt-6" style={{ borderColor: HAIRLINE }}>
                  {tier.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm" style={{ color: MUTED }}>
                      <Check size={13} className="shrink-0 mt-0.5" style={{ color: ACCENT }} />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/apply"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium transition border"
                  style={
                    tier.highlighted
                      ? { background: ACCENT, borderColor: ACCENT, color: '#fff' }
                      : { borderColor: HAIRLINE, color: MUTED }
                  }
                >
                  Apply — {tier.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ BEIGE — FOUNDING FIVE ══════════════════════════════════════════ */}
      <section style={{ background: BEIGE, color: INK }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-40">
          <motion.div {...fadeUp} className="max-w-4xl">
            <div className="text-[11px] uppercase tracking-[0.3em] mb-8" style={{ color: ACCENT }}>
              06 — Founding-investor terms
            </div>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-light leading-[1.02] tracking-tight text-balance">
              The Founding Five.
              <span className="block mt-2" style={{ color: 'rgba(0,0,0,0.5)' }}>
                Five seats. Closed when filled. Never offered again.
              </span>
            </h2>
            <p className="mt-8 text-lg max-w-2xl leading-relaxed" style={{ color: 'rgba(0,0,0,0.65)' }}>
              Five investors. First in. Best terms — permanently locked at founding-investor pricing,
              whatever the studio's valuation does from here.
            </p>
          </motion.div>

          {/* benefits grid */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: '-80px' }}
            className="mt-16 md:mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-px border"
            style={{ background: HAIRLINE_DARK, borderColor: HAIRLINE_DARK }}
          >
            {[
              {
                label: '+25% Bonus equity',
                body: 'Each kroner invested receives equity worth 1.25× the standard rate — effectively a 20% discount on price per share.',
              },
              {
                label: 'Tier upgrade',
                body: 'Cornerstone-tier benefits unlocked at any qualifying ticket, including Builder and Partner levels.',
              },
              {
                label: 'Founding Partner status',
                body: 'Named on the studio founding-partners wall. Lifetime advisory access to managing partners.',
              },
              {
                label: 'First-look rights',
                body: 'Right of first refusal on every new venture before it\'s offered to the broader investor pool.',
              },
              {
                label: 'Early-liquidity participation',
                body: 'Pro-rata in any liquidity event from day one — including the acquisition conversation already in motion.',
              },
              {
                label: 'Standard minimums apply',
                body: 'Founding Five terms apply to the first five committed investors. NOK 100,000+ to qualify. Speak with a managing partner to claim a seat.',
              },
            ].map((b) => (
              <motion.div key={b.label} variants={staggerItem} className="p-8 md:p-10" style={{ background: BEIGE }}>
                <h3 className="font-display text-xl mb-3 leading-snug">{b.label}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(0,0,0,0.65)' }}>{b.body}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* 5-seat grid */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-5 mt-16 md:mt-20 border-t border-l"
            style={{ borderColor: HAIRLINE_DARK }}
          >
            {[1, 2, 3, 4, 5].map((seat) => (
              <motion.div
                key={seat}
                variants={staggerItem}
                className="aspect-square md:aspect-[4/3] flex flex-col items-center justify-center border-r border-b hover:bg-black/[0.03] transition-colors duration-300"
                style={{ borderColor: HAIRLINE_DARK }}
              >
                <div
                  className="font-display font-light leading-none"
                  style={{ fontSize: 'clamp(3rem,7vw,5.5rem)', color: 'rgba(0,0,0,0.85)' }}
                >
                  0{seat}
                </div>
                <div className="mt-3 text-[10px] uppercase tracking-[0.25em]" style={{ color: ACCENT }}>
                  Open
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            {...fadeUp}
            className="mt-16 md:mt-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8 pt-10 border-t"
            style={{ borderColor: HAIRLINE_DARK }}
          >
            <p className="font-display text-2xl md:text-3xl font-light leading-snug max-w-xl" style={{ color: INK }}>
              Tickets from NOK 100,000 to NOK 8,000,000.
              <br />
              <span style={{ color: 'rgba(0,0,0,0.5)' }}>A managing partner responds within 48 hours.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/apply"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-medium text-sm transition-all"
                style={{ background: INK, color: '#fff' }}
              >
                Apply for investment
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </Link>
              <a
                href="mailto:investment@mosaicventure.studio"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-medium text-sm border transition-all hover:bg-black/5"
                style={{ borderColor: 'rgba(0,0,0,0.2)', color: INK }}
              >
                Email a partner
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ STUDIO IN NUMBERS ═════════════════════════════════════════════ */}
      <section className="border-b" style={{ borderColor: HAIRLINE }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-28">
          <motion.div {...fadeUp} className="mb-12">
            <div className="text-[11px] uppercase tracking-[0.3em] mb-4" style={{ color: ACCENT }}>
              07 — Why now
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-light leading-tight" style={{ color: '#fff' }}>
              The conditions have never been better.
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: '-40px' }}
            className="grid grid-cols-2 md:grid-cols-4 gap-px border-y"
            style={{ background: HAIRLINE, borderColor: HAIRLINE }}
          >
            <BigStat variants={staggerItem} value={13} label="Ventures already inside" />
            <BigStat variants={staggerItem} value={99} suffix="%" label="Probability ≥ 1 wins (10+ ventures)" />
            <BigStat variants={staggerItem} value={5} suffix="×" label="Capital efficiency vs. standalone startup" />
            <BigStat variants={staggerItem} value={5} label="Founding Five seats open" accent />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: '-80px' }}
            className="mt-16 grid md:grid-cols-3 gap-px border"
            style={{ background: HAIRLINE, borderColor: HAIRLINE }}
          >
            {[
              {
                n: '01',
                t: 'AI collapsed the cost of building',
                d: 'What used to take 10 people and 2 years can now be built by 2 people in 3 months. The studio spins up and validates ventures 5× faster than in the 2019 cycle.',
              },
              {
                n: '02',
                t: 'Retail capital wants startup exposure',
                d: 'Traditional VC funds demand millions and accredited-investor paperwork. Mosaic opens the asset class at NOK 100,000 — one clean structure, one LP agreement, one quarterly update.',
              },
              {
                n: '03',
                t: 'Cross-border arbitrage is real',
                d: 'A product built in India at Indian cost, sold in Norway at European prices, supported from a Nordic operations base. We already run this playbook daily.',
              },
            ].map((r) => (
              <motion.div key={r.n} variants={staggerItem} className="p-8 md:p-10" style={{ background: INK }}>
                <div className="font-display text-4xl tabular-nums mb-6" style={{ color: ACCENT }}>{r.n}</div>
                <h3 className="font-display text-xl md:text-2xl font-light mb-3 leading-snug" style={{ color: '#fff' }}>{r.t}</h3>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{r.d}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.p {...fadeUp} className="mt-10 text-xs leading-relaxed max-w-3xl" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Based on a 10% per-venture success rate, 10 independent ventures: 1 − (0.9)¹⁰ ≈ 65% for
            "at least one successful exit"; ≈99% as portfolio size grows. Forward-looking and not a
            guarantee of any future event.
          </motion.p>
        </div>
      </section>
    </div>
  );
}

/* ─── Animated stat tile ────────────────────────────────────────────────── */
interface BigStatProps {
  value: number;
  suffix?: string;
  label: string;
  accent?: boolean;
  variants?: typeof staggerItem;
}

function BigStat({ value, suffix = '', label, accent, variants }: BigStatProps) {
  const { ref, display } = useCountUp(value, 1500, suffix);
  return (
    <motion.div variants={variants} className="p-8 md:p-10 lg:p-12" style={{ background: INK }}>
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={cn('font-display font-light leading-none tabular-nums text-5xl md:text-6xl lg:text-7xl')}
        style={{ color: accent ? ACCENT : '#fff' }}
      >
        {display}
      </div>
      <div className="mt-5 text-[11px] uppercase tracking-[0.25em] leading-relaxed max-w-[18ch]" style={{ color: MUTED }}>
        {label}
      </div>
    </motion.div>
  );
}