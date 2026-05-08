import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { investorTiers } from '@/lib/portfolio';
import { fadeUp, fadeUpMount, staggerContainer, staggerItem } from '@/lib/animations';
import { cn } from '@/lib/utils';

/* ─── Editorial palette — matches HomePage ──────────────────────────────── */
const INK   = '#1b1b1b';
const BEIGE = '#dcdad5';
const MUTED = '#c5c1b9';
const ACCENT = '#575ecf';
const HAIRLINE = 'rgba(255,255,255,0.08)';
const HAIRLINE_DARK = 'rgba(0,0,0,0.10)';

export default function AboutPage() {
  return (
    <div className="page-enter" style={{ background: INK, color: '#fff' }}>

      {/* ═══ HERO ══════════════════════════════════════════════════════════ */}
      <section className="border-b" style={{ borderColor: HAIRLINE }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-20 md:pt-28 pb-20 md:pb-32">
          <motion.div {...fadeUpMount(0)} className="flex flex-wrap items-center justify-between gap-4 mb-16 md:mb-24">
            <span className="inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.3em]" style={{ color: MUTED }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
              About &amp; Investment
            </span>
            <span className="text-[11px] uppercase tracking-[0.3em]" style={{ color: MUTED }}>
              Mosaic Venture Studio
            </span>
          </motion.div>

          <motion.h1
            {...fadeUpMount(0.1)}
            className="font-display font-light leading-[0.92] tracking-tight text-balance"
            style={{ fontSize: 'clamp(2.75rem,9vw,9rem)', color: '#fff' }}
          >
            We don't just
            <br />
            <span style={{ color: MUTED }}>write cheques.</span>
            <br />
            We{' '}
            <em className="italic font-normal" style={{ color: ACCENT }}>build</em>
            <br />
            the companies.
          </motion.h1>

          <motion.div {...fadeUpMount(0.25)} className="mt-12 md:mt-20 grid md:grid-cols-12 gap-10 items-end">
            <p className="md:col-span-7 text-lg md:text-2xl font-light leading-relaxed max-w-2xl" style={{ color: BEIGE }}>
              Mosaic is a venture studio, not a fund. One operating backbone — shared engineering,
              design, finance, legal, and talent — serves every venture inside. Our upside comes
              from exits, not fees.
            </p>
            <div className="md:col-span-5 flex flex-col sm:flex-row md:justify-end gap-3">
              <Link
                to="/apply"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-medium text-sm transition-all"
                style={{ background: ACCENT, color: '#fff' }}
              >
                Apply for investment
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ WHY A STUDIO — numbered editorial table ═══════════════════════ */}
      <section className="border-b" style={{ borderColor: HAIRLINE }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-32 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <motion.div {...fadeUp} className="md:sticky md:top-32">
              <div className="text-[11px] uppercase tracking-[0.3em] mb-6" style={{ color: ACCENT }}>
                01 — Why a studio
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-light leading-[1.05] tracking-tight" style={{ color: '#fff' }}>
                Four structural
                <br />
                advantages that
                <br />
                <span style={{ color: MUTED }}>compound.</span>
              </h2>
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
                t: 'Shared operating backbone',
                d: 'One finance, legal, design, and engineering team serves every venture. Faster, cheaper, and higher quality than each startup hiring alone. Capital efficiency per venture is 3–5× a standalone.',
              },
              {
                n: '02',
                t: 'Better judgement, earlier',
                d: 'We kill bad ideas in weeks, not years. The studio's shared pattern-recognition surfaces misaligned teams and broken assumptions before capital is wasted at scale.',
              },
              {
                n: '03',
                t: 'Compounding know-how',
                d: 'Every venture teaches the next. Playbooks, tooling, and talent transfer across the portfolio from day one — the studio gets smarter with every build.',
              },
              {
                n: '04',
                t: 'Alignment of interests',
                d: 'We build with our own hands. Our upside comes from venture exits — not from collecting management fees. When you win, we win.',
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
                  <h3
                    className="font-display text-2xl md:text-3xl font-light mb-2 group-hover:translate-x-1 transition-transform duration-300"
                    style={{ color: '#fff' }}
                  >
                    {row.t}
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: MUTED }}>
                    {row.d}
                  </p>
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

      {/* ═══ BEIGE BLOCK — math of resilience ═════════════════════════════ */}
      <section style={{ background: BEIGE, color: INK }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-40">
          <motion.div {...fadeUp} className="max-w-4xl mb-16 md:mb-24">
            <div className="text-[11px] uppercase tracking-[0.3em] mb-8" style={{ color: ACCENT }}>
              02 — The math of resilience
            </div>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-light leading-[1.05] tracking-tight text-balance">
              Why a portfolio
              structurally beats
              a single bet.
              <span className="block mt-2" style={{ color: 'rgba(0,0,0,0.45)' }}>
                The numbers don't lie.
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: '-80px' }}
            className="grid md:grid-cols-2 gap-px border"
            style={{ background: HAIRLINE_DARK, borderColor: HAIRLINE_DARK }}
          >
            {/* Single bet */}
            <motion.div variants={staggerItem} className="p-10 md:p-14" style={{ background: BEIGE }}>
              <div className="text-[11px] uppercase tracking-[0.3em] mb-8" style={{ color: 'rgba(0,0,0,0.45)' }}>
                A single-company bet
              </div>
              <div className="font-display font-light leading-none tabular-nums mb-6"
                style={{ fontSize: 'clamp(4rem,10vw,8rem)', color: INK }}>
                10%
              </div>
              <p className="text-lg mb-6" style={{ color: INK }}>probability of success</p>
              <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(0,0,0,0.65)' }}>
                Binary outcome. All-or-nothing. Your entire investment hinges on one team, one
                market, one timing window.
              </p>
              <div
                className="inline-block text-sm font-medium px-4 py-2 border"
                style={{ borderColor: 'rgba(0,0,0,0.2)', color: 'rgba(0,0,0,0.6)' }}
              >
                → 90% chance of complete loss
              </div>
            </motion.div>

            {/* Mosaic portfolio */}
            <motion.div variants={staggerItem} className="p-10 md:p-14" style={{ background: BEIGE }}>
              <div className="text-[11px] uppercase tracking-[0.3em] mb-8" style={{ color: ACCENT }}>
                A Mosaic portfolio (10+ ventures)
              </div>
              <div className="font-display font-light leading-none tabular-nums mb-6"
                style={{ fontSize: 'clamp(4rem,10vw,8rem)', color: ACCENT }}>
                99%
              </div>
              <p className="text-lg mb-6" style={{ color: INK }}>probability at least one wins*</p>
              <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(0,0,0,0.65)' }}>
                Losses are absorbed by winners. One strong exit can return the entire portfolio.
                The power law works in your favour.
              </p>
              <div
                className="inline-block text-sm font-medium px-4 py-2 border"
                style={{ borderColor: ACCENT, color: ACCENT }}
              >
                → Return driven by winners, not luck
              </div>
            </motion.div>
          </motion.div>

          <motion.p {...fadeUp} className="mt-8 text-xs leading-relaxed max-w-3xl" style={{ color: 'rgba(0,0,0,0.45)' }}>
            * Based on a 10% per-venture success rate assumption, 10 independent ventures:
            1 − (0.9)¹⁰ ≈ 0.65 for "at least one successful exit"; ≈99% as portfolio size grows.
            Forward-looking and not a guarantee of any future event.
          </motion.p>
        </div>
      </section>

      {/* ═══ INVESTOR TIERS ════════════════════════════════════════════════ */}
      <section className="border-b" style={{ borderColor: HAIRLINE }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-40">
          <motion.div {...fadeUp} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24">
            <div className="max-w-2xl">
              <div className="text-[11px] uppercase tracking-[0.3em] mb-6" style={{ color: ACCENT }}>
                03 — Investor tiers
              </div>
              <h2 className="font-display text-4xl md:text-6xl font-light leading-[1.02] tracking-tight text-balance" style={{ color: '#fff' }}>
                Accessible at NOK 100,000.
                <span style={{ color: MUTED }}> Scalable up to NOK 8,000,000.</span>
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
                className="flex flex-col p-8 md:p-10 group"
                style={{ background: INK }}
              >
                {tier.highlighted && (
                  <div className="text-[10px] uppercase tracking-[0.25em] mb-4" style={{ color: ACCENT }}>
                    Most chosen
                  </div>
                )}
                <div className="font-display font-light tabular-nums mb-1"
                  style={{ fontSize: 'clamp(3rem,5vw,4.5rem)', color: tier.highlighted ? ACCENT : 'rgba(255,255,255,0.15)' }}>
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
                  className={cn(
                    'inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium transition border',
                    tier.highlighted
                      ? 'text-[#fff]'
                      : 'hover:opacity-80',
                  )}
                  style={
                    tier.highlighted
                      ? { background: ACCENT, borderColor: ACCENT }
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

      {/* ═══ WHY NOW — numbered editorial rows ═════════════════════════════ */}
      <section className="border-b" style={{ borderColor: HAIRLINE }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-40 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <motion.div {...fadeUp} className="md:sticky md:top-32">
              <div className="text-[11px] uppercase tracking-[0.3em] mb-6" style={{ color: ACCENT }}>
                04 — Why now
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-light leading-[1.05] tracking-tight" style={{ color: '#fff' }}>
                The conditions
                <br />
                have never been
                <br />
                <span style={{ color: MUTED }}>better.</span>
              </h2>
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
                t: 'AI has collapsed the cost of building software',
                d: 'What used to take a team of 10 and two years can be built by 2 people in three months. Our studio can spin up and validate ventures 5× faster than in the 2019 cycle, at a fraction of the capital.',
              },
              {
                n: '02',
                t: "Retail capital wants startup exposure — and can't access it",
                d: 'Traditional VC funds demand millions and accredited-investor paperwork. Mosaic opens the asset class at NOK 100,000 with one clean structure, one LP agreement, one quarterly update.',
              },
              {
                n: '03',
                t: 'Cross-border arbitrage is real and repeatable',
                d: 'A product built in India at Indian cost, sold in Norway at European prices, supported from a Nordic operations base. We already run this playbook daily — Mosaic institutionalises it.',
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
                  <h3
                    className="font-display text-2xl md:text-3xl font-light mb-2 group-hover:translate-x-1 transition-transform duration-300"
                    style={{ color: '#fff' }}
                  >
                    {row.t}
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: MUTED }}>
                    {row.d}
                  </p>
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

      {/* ═══ BEIGE BLOCK — Founding Five ═══════════════════════════════════ */}
      <section style={{ background: BEIGE, color: INK }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-40">
          <motion.div {...fadeUp} className="max-w-4xl mb-16 md:mb-20">
            <div className="text-[11px] uppercase tracking-[0.3em] mb-8" style={{ color: ACCENT }}>
              05 — Founding Five
            </div>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-light leading-[1.05] tracking-tight text-balance">
              Five seats.
              <span style={{ color: ACCENT }}> Founding-investor</span>
              <br />
              pricing. Closed when filled.
              <span className="block mt-2" style={{ color: 'rgba(0,0,0,0.45)' }}>
                Never offered again.
              </span>
            </h2>
            <p className="mt-8 text-lg md:text-xl leading-relaxed max-w-2xl" style={{ color: 'rgba(0,0,0,0.65)' }}>
              All five seats currently open. Standard tier minimums apply (NOK 100,000+).
              Speak with a managing partner to claim a seat.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: '-60px' }}
            className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px border"
            style={{ background: HAIRLINE_DARK, borderColor: HAIRLINE_DARK }}
          >
            {[
              { icon: '+25%', title: 'Bonus equity',       body: 'Each kroner invested receives equity worth 1.25× the standard rate. Effectively a 20% discount on price per share.' },
              { icon: '▲',    title: 'Tier upgrade',       body: 'Cornerstone-tier benefits unlocked at any qualifying ticket — including Builder and Partner levels.' },
              { icon: '★',    title: 'Founding Partner',   body: 'Named on the studio founding-partners wall. Lifetime advisory access to managing partners.' },
              { icon: '→',    title: 'First-look rights',  body: 'Right of first refusal on every new venture before it\'s offered to the broader investor pool.' },
              { icon: '$',    title: 'Early-liquidity',    body: 'Pro-rata in any liquidity event from day one — including the early-stage acquisition already in motion.' },
            ].map((b, i) => (
              <motion.div
                key={b.title}
                variants={staggerItem}
                className="p-8 md:p-10 flex flex-col"
                style={{ background: BEIGE }}
              >
                <div className="font-display text-4xl font-light mb-6 tabular-nums">
                  {i + 1}
                </div>
                <div className="font-display text-2xl mb-3 leading-tight">{b.icon} {b.title}</div>
                <p className="text-sm leading-relaxed flex-1" style={{ color: 'rgba(0,0,0,0.65)' }}>
                  {b.body}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...fadeUp} className="mt-12">
            <Link
              to="/apply"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-sm transition-all"
              style={{ background: INK, color: BEIGE }}
            >
              Claim a Founding Five seat
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}