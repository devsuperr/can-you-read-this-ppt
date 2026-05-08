import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ArrowUpRight, Search } from 'lucide-react';
import { ventures } from '@/lib/portfolio';
import { fadeUp, fadeUpMount, staggerContainer, staggerItem, widthReveal } from '@/lib/animations';
import { cn } from '@/lib/utils';

/* ─── Editorial palette — matches HomePage ──────────────────────────────── */
const INK    = '#1b1b1b';
const BEIGE  = '#dcdad5';
const MUTED  = '#c5c1b9';
const ACCENT = '#575ecf';
const HAIRLINE = 'rgba(255,255,255,0.08)';

export default function ProjectsPage() {
  const [query, setQuery]   = useState('');
  const [filter, setFilter] = useState<string>('All');

  const categories = useMemo(() => {
    const set = new Set(ventures.map((v) => v.category));
    return ['All', ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    return ventures.filter((v) => {
      const matchesCat = filter === 'All' || v.category === filter;
      const q = query.trim().toLowerCase();
      const matchesQ =
        !q ||
        v.name.toLowerCase().includes(q) ||
        v.sector.toLowerCase().includes(q) ||
        v.tagline.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q);
      return matchesCat && matchesQ;
    });
  }, [query, filter]);

  const featured = ventures.find((v) => v.id === 'workhub')!;

  return (
    <div className="page-enter" style={{ background: INK, color: '#fff' }}>

      {/* ═══ HERO ══════════════════════════════════════════════════════════ */}
      <section className="border-b" style={{ borderColor: HAIRLINE }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-20 md:pt-28 pb-20 md:pb-32">
          <motion.div {...fadeUpMount(0)} className="flex flex-wrap items-center justify-between gap-4 mb-16 md:mb-24">
            <span className="inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.3em]" style={{ color: MUTED }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
              The portfolio
            </span>
            <span className="text-[11px] uppercase tracking-[0.3em]" style={{ color: MUTED }}>
              13 ventures · One studio
            </span>
          </motion.div>

          <motion.h1
            {...fadeUpMount(0.1)}
            className="font-display font-light leading-[0.92] tracking-tight text-balance"
            style={{ fontSize: 'clamp(2.75rem,9vw,9rem)', color: '#fff' }}
          >
            Thirteen ventures.
            <br />
            <em className="italic font-normal" style={{ color: ACCENT }}>One</em>
            {' '}
            <span style={{ color: MUTED }}>studio.</span>
          </motion.h1>

          <motion.p
            {...fadeUpMount(0.25)}
            className="mt-10 text-lg md:text-2xl font-light leading-relaxed max-w-2xl"
            style={{ color: BEIGE }}
          >
            Every company Mosaic owns, builds, and operates — across AI, SaaS, marketplaces,
            media, and RegTech. One ticket, exposure to all of them.
          </motion.p>
        </div>
      </section>

      {/* ═══ FEATURED — WorkHub ════════════════════════════════════════════ */}
      <section className="border-b" style={{ borderColor: HAIRLINE }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-20">
          <motion.div
            {...fadeUp}
            className="grid lg:grid-cols-12 gap-0 border"
            style={{ borderColor: HAIRLINE }}
          >
            {/* Left — content */}
            <div className="lg:col-span-7 p-8 md:p-12 border-b lg:border-b-0 lg:border-r" style={{ borderColor: HAIRLINE }}>
              <div className="flex items-center gap-3 mb-8">
                <span
                  className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] px-3 py-1.5 font-medium"
                  style={{ background: ACCENT, color: '#fff' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white pulse-ring" />
                  Featured · Open round
                </span>
              </div>

              <h2 className="font-display text-4xl md:text-6xl font-light leading-[1.02] tracking-tight mb-4" style={{ color: '#fff' }}>
                {featured.name}
              </h2>
              <p className="text-lg font-medium mb-4" style={{ color: ACCENT }}>
                {featured.tagline}
              </p>
              <p className="text-base leading-relaxed mb-10" style={{ color: MUTED }}>
                {featured.description}
              </p>

              <Link
                to="/apply"
                className="group inline-flex items-center gap-2 px-7 py-4 text-sm font-medium transition-all"
                style={{ background: ACCENT, color: '#fff' }}
              >
                Reserve allocation
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </Link>
            </div>

            {/* Right — allocation stats */}
            <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-center">
              <div className="text-[11px] uppercase tracking-[0.3em] mb-6" style={{ color: MUTED }}>
                Allocation status
              </div>

              {/* Progress bar */}
              <div className="relative h-2 mb-3" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <motion.div
                  {...widthReveal('60%', 0.2)}
                  className="absolute left-0 top-0 h-full shimmer"
                />
              </div>
              <div className="flex items-center justify-between text-sm mb-12">
                <span className="font-medium" style={{ color: ACCENT }}>60% allocated</span>
                <span style={{ color: MUTED }}>40% available now</span>
              </div>

              {/* Stats grid */}
              <div
                className="grid grid-cols-2 gap-px"
                style={{ background: HAIRLINE }}
              >
                {[
                  { label: 'Sector',        value: 'Workforce SaaS' },
                  { label: 'Stage',         value: 'Revenue · Live' },
                  { label: 'Infrastructure','value': 'Pointspay' },
                  { label: 'Entry',         value: 'Founding-investor' },
                ].map((s) => (
                  <div key={s.label} className="p-5" style={{ background: INK }}>
                    <div className="text-[10px] uppercase tracking-[0.2em] mb-1" style={{ color: MUTED }}>
                      {s.label}
                    </div>
                    <div className="text-sm font-medium" style={{ color: '#fff' }}>
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FILTER BAR — sticky ═══════════════════════════════════════════ */}
      <div
        className="sticky top-[73px] z-30 border-b"
        style={{ background: `${INK}ee`, backdropFilter: 'blur(16px)', borderColor: HAIRLINE }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-5 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          {/* Search */}
          <div className="relative md:max-w-sm flex-1">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: MUTED }} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search ventures, sectors…"
              className="w-full pl-11 pr-4 py-3 text-sm focus:outline-none transition"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid ${HAIRLINE}`,
                color: '#fff',
              }}
            />
          </div>

          {/* Category pills */}
          <LayoutGroup>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={cn(
                    'relative px-4 py-2 text-[11px] uppercase tracking-[0.2em] transition border',
                    filter === c ? 'text-[#fff]' : 'hover:opacity-80',
                  )}
                  style={
                    filter === c
                      ? { background: ACCENT, borderColor: ACCENT }
                      : { borderColor: HAIRLINE, color: MUTED }
                  }
                >
                  {filter === c && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0"
                      style={{ background: ACCENT }}
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">{c}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>
        </div>
      </div>

      {/* ═══ VENTURES TABLE / GRID ═════════════════════════════════════════ */}
      <section className="border-b" style={{ borderColor: HAIRLINE }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 md:py-16">
          {/* Count */}
          <div className="mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${filter}-${query}-${filtered.length}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="text-[11px] uppercase tracking-[0.3em]"
                style={{ color: MUTED }}
              >
                {filtered.length} {filtered.length === 1 ? 'venture' : 'ventures'} shown
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="py-24 text-center"
              >
                <div className="inline-flex w-12 h-12 border items-center justify-center mb-6"
                  style={{ borderColor: HAIRLINE }}>
                  <Search size={18} style={{ color: MUTED }} />
                </div>
                <h3 className="font-display text-2xl font-light mb-3" style={{ color: '#fff' }}>
                  No ventures match
                </h3>
                <p className="text-sm mb-8" style={{ color: MUTED }}>
                  Try a different search term or clear the filter.
                </p>
                <button
                  onClick={() => { setQuery(''); setFilter('All'); }}
                  className="px-5 py-2.5 border text-sm transition hover:opacity-80"
                  style={{ borderColor: HAIRLINE, color: MUTED }}
                >
                  Reset filters
                </button>
              </motion.div>
            ) : (
              /* Editorial table rows on md+, card grid on mobile */
              <motion.div
                key={`grid-${filter}`}
                variants={staggerContainer}
                initial="initial"
                animate="whileInView"
              >
                {/* Table header — desktop only */}
                <div
                  className="hidden md:grid grid-cols-12 gap-6 pb-4 mb-0 border-b text-[10px] uppercase tracking-[0.25em]"
                  style={{ borderColor: HAIRLINE, color: MUTED }}
                >
                  <div className="col-span-1">#</div>
                  <div className="col-span-4">Venture</div>
                  <div className="col-span-2">Category</div>
                  <div className="col-span-3">Tagline</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-1" />
                </div>

                {filtered.map((v, i) => (
                  <motion.div
                    key={v.id}
                    variants={staggerItem}
                    layout
                    className="group border-b py-6 cursor-default"
                    style={{ borderColor: HAIRLINE }}
                  >
                    {/* Desktop row */}
                    <div className="hidden md:grid grid-cols-12 gap-6 items-center">
                      <div className="col-span-1 font-display text-2xl tabular-nums" style={{ color: 'rgba(255,255,255,0.15)' }}>
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <div className="col-span-4">
                        <div className="font-display text-2xl font-light group-hover:translate-x-1 transition-transform duration-300" style={{ color: '#fff' }}>
                          {v.name}
                        </div>
                        {v.highlight && (
                          <div className="mt-1.5 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>
                            <span className="w-1.5 h-1.5 rounded-full pulse-ring" style={{ background: ACCENT }} />
                            {v.highlight}
                          </div>
                        )}
                      </div>
                      <div className="col-span-2 text-[11px] uppercase tracking-[0.2em]" style={{ color: MUTED }}>
                        {v.category}
                        <br />
                        <span style={{ color: 'rgba(255,255,255,0.3)' }}>{v.sector}</span>
                      </div>
                      <div className="col-span-3 text-sm leading-snug" style={{ color: MUTED }}>
                        {v.tagline}
                      </div>
                      <div className="col-span-1">
                        <span
                          className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em]"
                          style={{ color: v.status === 'live' ? '#34d399' : ACCENT }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: v.status === 'live' ? '#34d399' : ACCENT }}
                          />
                          {v.status === 'live' ? 'Live' : v.status === 'featured' ? 'Open' : 'Building'}
                        </span>
                      </div>
                      <div className="col-span-1 flex justify-end">
                        <ArrowUpRight
                          size={18}
                          className="opacity-0 group-hover:opacity-60 -translate-x-1 group-hover:translate-x-0 transition-all duration-200"
                          style={{ color: BEIGE }}
                        />
                      </div>
                    </div>

                    {/* Mobile card */}
                    <div className="md:hidden">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <div className="font-display text-xl font-light" style={{ color: '#fff' }}>{v.name}</div>
                          <div className="text-[10px] uppercase tracking-[0.2em] mt-1" style={{ color: MUTED }}>{v.category} · {v.sector}</div>
                        </div>
                        <span
                          className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] shrink-0"
                          style={{ color: v.status === 'live' ? '#34d399' : ACCENT }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: v.status === 'live' ? '#34d399' : ACCENT }} />
                          {v.status === 'live' ? 'Live' : 'Open'}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{v.tagline}</p>
                      {v.highlight && (
                        <div className="mt-2 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em]" style={{ color: ACCENT }}>
                          <span className="w-1.5 h-1.5 rounded-full pulse-ring" style={{ background: ACCENT }} />
                          {v.highlight}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ═══ BEIGE CTA ═════════════════════════════════════════════════════ */}
      <section style={{ background: BEIGE, color: INK }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-40">
          <motion.div {...fadeUp} className="max-w-4xl">
            <div className="text-[11px] uppercase tracking-[0.3em] mb-8" style={{ color: ACCENT }}>
              One ticket. Every venture.
            </div>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-light leading-[1.05] tracking-tight text-balance">
              Own a piece of all 13 ventures —
              <span className="block mt-2" style={{ color: 'rgba(0,0,0,0.45)' }}>
                and every one we'll ever build.
              </span>
            </h2>
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <Link
                to="/apply"
                className="group inline-flex items-center gap-2 px-8 py-4 font-medium text-sm transition-all"
                style={{ background: INK, color: BEIGE }}
              >
                Apply for investment
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </Link>
              <a
                href="mailto:investment@mosaicventure.studio"
                className="inline-flex items-center gap-2 px-8 py-4 font-medium text-sm border transition hover:opacity-70"
                style={{ borderColor: 'rgba(0,0,0,0.2)', color: INK }}
              >
                Email a partner
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}