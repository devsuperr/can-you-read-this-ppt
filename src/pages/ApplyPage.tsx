import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Mail, Lock, ArrowUpRight, Loader2, AlertCircle } from 'lucide-react';
import { investorTiers } from '@/lib/portfolio';
import { fadeUp, fadeUpMount, staggerContainer, staggerItem } from '@/lib/animations';


/* ─── Editorial palette — matches HomePage / AboutPage / ProjectsPage ─────── */
const INK          = '#1b1b1b';
const BEIGE        = '#dcdad5';
const MUTED        = '#c5c1b9';
const ACCENT       = '#575ecf';
const HAIRLINE     = 'rgba(255,255,255,0.08)';
const HAIRLINE_DARK = 'rgba(0,0,0,0.10)';

/* ─── Types ────────────────────────────────────────────────────────────────── */
interface FormState {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  ticket: string;
  tier: string;
  foundingFive: boolean;
  source: string;
  notes: string;
}

const initialForm: FormState = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  ticket: 'NOK 500,000 – 1,999,000',
  tier: 'Builder',
  foundingFive: false,
  source: '',
  notes: '',
};

const ticketOptions = [
  { label: 'NOK 100,000 – 499,000',   tier: 'Associate' },
  { label: 'NOK 500,000 – 1,999,000', tier: 'Builder' },
  { label: 'NOK 2,000,000 – 4,999,000', tier: 'Partner' },
  { label: 'NOK 5,000,000 – 8,000,000', tier: 'Cornerstone' },
];

/* ══════════════════════════════════════════════════════════════════════════════
   APPLY PAGE
   ══════════════════════════════════════════════════════════════════════════════ */
export default function ApplyPage() {
  const [form, setForm]         = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [errors, setErrors]         = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key as string]) {
      setErrors((e) => { const n = { ...e }; delete n[key as string]; return n; });
    }
  }

  function selectTier(tier: string) {
    const map: Record<string, string> = {
      Associate:   'NOK 100,000 – 499,000',
      Builder:     'NOK 500,000 – 1,999,000',
      Partner:     'NOK 2,000,000 – 4,999,000',
      Cornerstone: 'NOK 5,000,000 – 8,000,000',
    };
    setForm((f) => ({ ...f, tier, ticket: map[tier] ?? f.ticket }));
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.fullName.trim())  e.fullName = 'Required';
    if (!form.email.trim())     e.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError(null);

    /* ── Email #1 — internal notification to the team ──────────────────── */
    const teamBody = `
      <div style="font-family:Inter,system-ui,sans-serif;color:#1b1b1b;max-width:640px;">
        <h2 style="font-family:Georgia,serif;font-weight:300;font-size:24px;margin:0 0 8px;">
          New investment application
        </h2>
        <p style="color:#575ecf;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;margin:0 0 24px;">
          Mosaic Venture Studio · mosaicventure.studio
        </p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:8px 0;color:#888;width:160px;">Full name</td><td style="padding:8px 0;font-weight:500;">${escapeHtml(form.fullName)}</td></tr>
          <tr><td style="padding:8px 0;color:#888;">Email</td><td style="padding:8px 0;"><a href="mailto:${escapeHtml(form.email)}" style="color:#575ecf;text-decoration:none;">${escapeHtml(form.email)}</a></td></tr>
          <tr><td style="padding:8px 0;color:#888;">Phone</td><td style="padding:8px 0;">${escapeHtml(form.phone) || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#888;">Company / family office</td><td style="padding:8px 0;">${escapeHtml(form.company) || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#888;">Tier</td><td style="padding:8px 0;font-weight:500;">${escapeHtml(form.tier)}</td></tr>
          <tr><td style="padding:8px 0;color:#888;">Ticket size</td><td style="padding:8px 0;">${escapeHtml(form.ticket)}</td></tr>
          <tr><td style="padding:8px 0;color:#888;">Founding Five</td><td style="padding:8px 0;color:${form.foundingFive ? '#575ecf' : '#888'};font-weight:${form.foundingFive ? '600' : '400'};">${form.foundingFive ? 'Yes — requested' : 'No'}</td></tr>
          <tr><td style="padding:8px 0;color:#888;">Source</td><td style="padding:8px 0;">${escapeHtml(form.source) || '—'}</td></tr>
        </table>
        <div style="margin-top:24px;padding-top:16px;border-top:1px solid #e5e5e5;">
          <div style="color:#888;font-size:13px;margin-bottom:8px;">Notes</div>
          <div style="white-space:pre-wrap;font-size:14px;line-height:1.6;">${escapeHtml(form.notes) || '(none)'}</div>
        </div>
      </div>
    `.trim();

    /* ── Email #2 — confirmation to the applicant ──────────────────────── */
    const firstName = form.fullName.split(' ')[0] || 'there';
    const applicantBody = `
      <div style="font-family:Inter,system-ui,sans-serif;color:#1b1b1b;max-width:640px;background:#dcdad5;padding:48px 40px;">
        <p style="color:#575ecf;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;margin:0 0 32px;">
          Mosaic Venture Studio · Oslo
        </p>
        <h1 style="font-family:Georgia,serif;font-weight:300;font-size:36px;line-height:1.1;margin:0 0 24px;color:#1b1b1b;">
          Thank you, <span style="color:#575ecf;">${escapeHtml(firstName)}</span>.
        </h1>
        <p style="font-size:16px;line-height:1.6;margin:0 0 20px;color:#1b1b1b;">
          We've received your application to invest in Mosaic Venture Studio. A managing
          partner is reviewing it personally and will respond within <strong>48 hours</strong>
          to schedule a confidential call.
        </p>
        <div style="margin:32px 0;padding:24px;background:#fff;border-left:3px solid #575ecf;">
          <div style="color:#888;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:12px;">
            Your application
          </div>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr><td style="padding:6px 0;color:#888;width:140px;">Tier</td><td style="padding:6px 0;font-weight:500;">${escapeHtml(form.tier)}</td></tr>
            <tr><td style="padding:6px 0;color:#888;">Ticket size</td><td style="padding:6px 0;">${escapeHtml(form.ticket)}</td></tr>
            ${form.foundingFive ? `<tr><td style="padding:6px 0;color:#888;">Founding Five</td><td style="padding:6px 0;color:#575ecf;font-weight:600;">Requested</td></tr>` : ''}
          </table>
        </div>
        <p style="font-size:15px;line-height:1.6;margin:0 0 20px;color:#1b1b1b;">
          In the meantime, you can browse the 13 ventures already inside the studio at
          <a href="https://mosaicventure.studio/projects" style="color:#575ecf;text-decoration:none;">mosaicventure.studio/projects</a>,
          or read the full investor case at
          <a href="https://mosaicventure.studio/investors" style="color:#575ecf;text-decoration:none;">/investors</a>.
        </p>
        <p style="font-size:15px;line-height:1.6;margin:0 0 32px;color:#1b1b1b;">
          If anything urgent comes up, reach us directly at
          <a href="mailto:investment@mosaicventure.studio" style="color:#575ecf;text-decoration:none;">investment@mosaicventure.studio</a>.
        </p>
        <div style="margin-top:40px;padding-top:24px;border-top:1px solid rgba(0,0,0,0.1);">
          <p style="font-family:Georgia,serif;font-style:italic;font-size:18px;line-height:1.4;margin:0 0 8px;color:#1b1b1b;">
            One investment. Every venture. Shared success.
          </p>
          <p style="color:#888;font-size:12px;margin:0;">
            Mosaic Venture Studio · Oslo · 2026 · Confidential
          </p>
        </div>
      </div>
    `.trim();

    /* ── Send both emails via no-cors fetch — fires server-side at Appointus.
         The Appointus API works cross-origin but doesn't return CORS headers,
         so we use mode:'no-cors'. The request DOES reach the server and the
         email IS sent; we just can't read the response (opaque response).
         This works on every domain — studio preview, published URL, custom domain.
         ───────────────────────────────────────────────────────────────────── */
    const API_URL = 'https://api.appointusonline.com/SendEmailWithFrom';
    const API_KEY = '061ac5ea-c9a6-4883-acd3-c21cdbb0dd62';

    const sendEmail = (to: string, subject: string, emailBody: string, from: string) =>
      fetch(API_URL, {
        method: 'POST',
        mode: 'no-cors',           // ← key fix: bypasses CORS preflight block
        headers: {
          'X-Api-Key': API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: to, subject, body: emailBody, from }),
      });

    try {
      // Fire both emails in parallel — no-cors means we can't check .ok,
      // but the requests reach Appointus and emails land in inbox.
      await Promise.all([
        sendEmail(
          'prabhjot.singh2475@gmail.com',
          `Mosaic Application — ${form.fullName} · ${form.tier}${form.foundingFive ? ' · Founding Five' : ''}`,
          teamBody,
          form.fullName,
        ),
        sendEmail(
          form.email,
          'Your Mosaic Venture Studio application',
          applicantBody,
          'Mosaic Venture Studio',
        ),
      ]);

      setSubmitting(false);
      setSubmitted(true);
    } catch (err) {
      setSubmitting(false);
      setSubmitError(
        'Network error. Please check your connection or email investment@mosaicventure.studio directly.',
      );
    }
  }

  function escapeHtml(s: string): string {
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* ── Success state ─────────────────────────────────────────────────────── */
  if (submitted) {
    return (
      <div
        className="min-h-[80vh] flex items-center justify-center px-6 py-20 page-enter"
        style={{ background: INK }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl w-full"
        >
          {/* Beige success card */}
          <div
            className="p-10 md:p-16 border"
            style={{ background: BEIGE, borderColor: HAIRLINE_DARK, color: INK }}
          >
            <div
              className="w-12 h-12 border flex items-center justify-center mb-8"
              style={{ borderColor: ACCENT }}
            >
              <Check size={20} style={{ color: ACCENT }} />
            </div>
            <div
              className="text-[11px] uppercase tracking-[0.3em] mb-6"
              style={{ color: ACCENT }}
            >
              Application received
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-light leading-[1.05] tracking-tight mb-6">
              Thank you,{' '}
              <span style={{ color: ACCENT }}>
                {form.fullName.split(' ')[0] || 'investor'}
              </span>.
            </h1>
            <p className="text-base leading-relaxed mb-10" style={{ color: 'rgba(0,0,0,0.65)' }}>
              A managing partner will reach out within 48 hours to schedule a confidential
              call. Your application has been logged and is under review.
            </p>
            <div
              className="flex items-center justify-between border-t border-b py-5 mb-10"
              style={{ borderColor: HAIRLINE_DARK }}
            >
              <div
                className="text-[10px] uppercase tracking-[0.25em]"
                style={{ color: 'rgba(0,0,0,0.45)' }}
              >
                Reference
              </div>
              <div className="font-mono text-sm" style={{ color: INK }}>
                MOSAIC-{Date.now().toString(36).toUpperCase()}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => { setSubmitted(false); setForm(initialForm); }}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-medium border transition hover:opacity-70"
                style={{ borderColor: 'rgba(0,0,0,0.2)', color: INK }}
              >
                Submit another application
              </button>
              <Link
                to="/projects"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-medium transition"
                style={{ background: INK, color: BEIGE }}
              >
                Browse the portfolio
                <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ── Main form ─────────────────────────────────────────────────────────── */
  return (
    <div className="page-enter" style={{ background: INK, color: '#fff' }}>

      {/* ═══ HERO ════════════════════════════════════════════════════════════ */}
      <section className="border-b" style={{ borderColor: HAIRLINE }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-20 md:pt-28 pb-20 md:pb-32">
          <motion.div
            {...fadeUpMount(0)}
            className="flex flex-wrap items-center justify-between gap-4 mb-16 md:mb-24"
          >
            <span
              className="inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.3em]"
              style={{ color: MUTED }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
              Apply for investment
            </span>
            <span className="text-[11px] uppercase tracking-[0.3em]" style={{ color: MUTED }}>
              All discussions confidential
            </span>
          </motion.div>

          <motion.h1
            {...fadeUpMount(0.1)}
            className="font-display font-light leading-[0.92] tracking-tight text-balance"
            style={{ fontSize: 'clamp(2.75rem,9vw,9rem)', color: '#fff' }}
          >
            Own a piece of
            <br />
            <span style={{ color: MUTED }}>every venture</span>
            <br />
            we{' '}
            <em className="italic font-normal" style={{ color: ACCENT }}>
              build.
            </em>
          </motion.h1>

          <motion.div
            {...fadeUpMount(0.25)}
            className="mt-12 md:mt-20 grid md:grid-cols-12 gap-10 items-end"
          >
            <p
              className="md:col-span-7 text-lg md:text-2xl font-light leading-relaxed max-w-2xl"
              style={{ color: BEIGE }}
            >
              Tickets from NOK 100,000 to NOK 8,000,000. One LP agreement. A managing
              partner responds within 48 hours.
            </p>
            <div
              className="md:col-span-5 flex flex-wrap md:justify-end gap-8"
            >
              {[
                { n: '48h',    label: 'Partner response' },
                { n: '5',      label: 'Founding Five seats' },
                { n: '100K+',  label: 'Minimum ticket (NOK)' },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    className="font-display text-3xl font-light tabular-nums"
                    style={{ color: ACCENT }}
                  >
                    {s.n}
                  </div>
                  <div
                    className="text-[10px] uppercase tracking-[0.2em] mt-1"
                    style={{ color: MUTED }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FORM BODY — split-screen ════════════════════════════════════════ */}
      <section>
        <div className="max-w-[1400px] mx-auto px-0 md:px-0">
          <div className="grid lg:grid-cols-12 gap-0">

            {/* ── LEFT — Tier selector + trust rail ────────────────────────── */}
            <motion.aside
              {...fadeUp}
              className="lg:col-span-5 border-b lg:border-b-0 lg:border-r py-16 md:py-20 px-6 md:px-12"
              style={{ borderColor: HAIRLINE }}
            >
              <div
                className="text-[11px] uppercase tracking-[0.3em] mb-8"
                style={{ color: ACCENT }}
              >
                01 — Choose your tier
              </div>

              <div className="space-y-px border" style={{ borderColor: HAIRLINE }}>
                {investorTiers.map((tier, i) => {
                  const active = form.tier === tier.name;
                  return (
                    <button
                      key={tier.name}
                      type="button"
                      onClick={() => selectTier(tier.name)}
                      className="w-full text-left p-7 flex items-start justify-between gap-6 group transition-all"
                      style={{
                        background: active ? ACCENT : 'transparent',
                        borderBottom: i < investorTiers.length - 1
                          ? `1px solid ${HAIRLINE}`
                          : 'none',
                      }}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span
                            className="font-display text-4xl font-light tabular-nums"
                            style={{ color: active ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)' }}
                          >
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <div>
                            <div
                              className="font-display text-xl font-light"
                              style={{ color: active ? '#fff' : '#fff' }}
                            >
                              {tier.name}
                            </div>
                            <div
                              className="text-xs font-medium mt-0.5"
                              style={{ color: active ? 'rgba(255,255,255,0.75)' : MUTED }}
                            >
                              {tier.ticket}
                            </div>
                          </div>
                        </div>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: active ? 'rgba(255,255,255,0.75)' : MUTED }}
                        >
                          {tier.description}
                        </p>
                      </div>
                      <div
                        className="w-5 h-5 border shrink-0 mt-1 flex items-center justify-center transition"
                        style={{
                          borderColor: active ? '#fff' : HAIRLINE,
                          background: active ? '#fff' : 'transparent',
                        }}
                      >
                        {active && (
                          <Check size={12} style={{ color: ACCENT }} />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Confidentiality note */}
              <div
                className="mt-8 flex items-start gap-3 border-t pt-8"
                style={{ borderColor: HAIRLINE }}
              >
                <Lock size={14} className="shrink-0 mt-0.5" style={{ color: MUTED }} />
                <p className="text-xs leading-relaxed" style={{ color: MUTED }}>
                  Confidential. Your application is reviewed only by Mosaic managing
                  partners. Standard NDA available on request. No unsolicited sharing.
                </p>
              </div>

              {/* Founding Five callout */}
              <div
                className="mt-6 p-6 border"
                style={{ borderColor: `${ACCENT}40`, background: `${ACCENT}0d` }}
              >
                <div
                  className="text-[10px] uppercase tracking-[0.25em] mb-3"
                  style={{ color: ACCENT }}
                >
                  Founding Five — 5 seats open
                </div>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
                  +25% bonus equity · Tier upgrade · First-look rights · Early-liquidity
                  participation. Tick the box in the form to apply.
                </p>
              </div>
            </motion.aside>

            {/* ── RIGHT — form fields ───────────────────────────────────────── */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="lg:col-span-7 py-16 md:py-20 px-6 md:px-12"
            >
              <div
                className="text-[11px] uppercase tracking-[0.3em] mb-8"
                style={{ color: ACCENT }}
              >
                02 — Your details
              </div>

              <form onSubmit={onSubmit} noValidate>
                {/* Name + Email */}
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <EditField
                    label="Full name"
                    required
                    error={errors.fullName}
                    value={form.fullName}
                    onChange={(v) => update('fullName', v)}
                    placeholder="Astrid Holmen"
                  />
                  <EditField
                    label="Email"
                    type="email"
                    required
                    error={errors.email}
                    value={form.email}
                    onChange={(v) => update('email', v)}
                    placeholder="astrid@example.com"
                  />
                  <EditField
                    label="Phone (optional)"
                    type="tel"
                    value={form.phone}
                    onChange={(v) => update('phone', v)}
                    placeholder="+47 …"
                  />
                  <EditField
                    label="Company / family office (optional)"
                    value={form.company}
                    onChange={(v) => update('company', v)}
                    placeholder="Holmen Capital"
                  />
                </div>

                {/* Ticket size */}
                <div className="mb-6">
                  <div
                    className="text-[11px] uppercase tracking-[0.25em] mb-3"
                    style={{ color: MUTED }}
                  >
                    Ticket size
                  </div>
                  <div className="grid sm:grid-cols-2 gap-px border" style={{ borderColor: HAIRLINE, background: HAIRLINE }}>
                    {ticketOptions.map((t) => {
                      const active = form.ticket === t.label;
                      return (
                        <button
                          key={t.label}
                          type="button"
                          onClick={() => { update('ticket', t.label); selectTier(t.tier); }}
                          className="p-5 text-left transition"
                          style={{
                            background: active ? ACCENT : INK,
                            color: active ? '#fff' : MUTED,
                          }}
                        >
                          <div className="text-sm font-medium">{t.label}</div>
                          <div
                            className="text-[10px] uppercase tracking-[0.2em] mt-1"
                            style={{ color: active ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.3)' }}
                          >
                            {t.tier}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Founding Five checkbox */}
                <label
                  className="mb-6 flex items-start gap-4 cursor-pointer group border-t border-b py-6"
                  style={{ borderColor: HAIRLINE }}
                >
                  <div
                    className="mt-0.5 w-5 h-5 border shrink-0 flex items-center justify-center transition"
                    style={{
                      borderColor: form.foundingFive ? ACCENT : HAIRLINE,
                      background: form.foundingFive ? ACCENT : 'transparent',
                    }}
                  >
                    {form.foundingFive && <Check size={12} color="#fff" />}
                  </div>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={form.foundingFive}
                    onChange={(e) => update('foundingFive', e.target.checked)}
                  />
                  <div>
                    <div className="text-sm font-medium text-white mb-1">
                      Apply for Founding Five terms
                    </div>
                    <div className="text-sm leading-relaxed" style={{ color: MUTED }}>
                      +25% bonus equity, tier upgrade, first-look rights, and early-liquidity
                      participation. Five seats only — claimed on a first-committed basis.
                    </div>
                  </div>
                </label>

                {/* Source + Notes */}
                <div className="space-y-6 mb-8">
                  <EditField
                    label="How did you hear about Mosaic? (optional)"
                    value={form.source}
                    onChange={(v) => update('source', v)}
                    placeholder="Introduction · LinkedIn · Press · Other"
                  />
                  <div>
                    <div
                      className="text-[11px] uppercase tracking-[0.25em] mb-3"
                      style={{ color: MUTED }}
                    >
                      Anything else we should know? (optional)
                    </div>
                    <textarea
                      value={form.notes}
                      onChange={(e) => update('notes', e.target.value)}
                      rows={4}
                      placeholder="Sectors of interest, timing, questions for the managing partner…"
                      className="w-full px-4 py-3 text-sm focus:outline-none transition resize-none"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: `1px solid ${HAIRLINE}`,
                        color: '#fff',
                      }}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor = `${ACCENT}80`)
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor = HAIRLINE)
                      }
                    />
                  </div>
                </div>

                {/* Error banner */}
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-5 p-4 flex items-start gap-3 border"
                    style={{
                      borderColor: 'rgba(248,113,113,0.3)',
                      background: 'rgba(248,113,113,0.05)',
                    }}
                    role="alert"
                  >
                    <AlertCircle size={16} className="shrink-0 mt-0.5" style={{ color: '#f87171' }} />
                    <div className="text-sm leading-relaxed" style={{ color: '#fca5a5' }}>
                      {submitError}
                    </div>
                  </motion.div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="group w-full inline-flex items-center justify-center gap-2 px-8 py-5 font-medium text-sm transition-all"
                  style={{
                    background: submitting ? `${ACCENT}80` : ACCENT,
                    color: '#fff',
                    cursor: submitting ? 'wait' : 'pointer',
                  }}
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      Submit application
                      <ArrowUpRight
                        size={16}
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition"
                      />
                    </>
                  )}
                </button>

                <p
                  className="mt-5 flex items-center justify-center gap-2 text-xs"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                >
                  <Mail size={11} />
                  A managing partner will respond within 48 hours.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ BEIGE BLOCK — studio promise ════════════════════════════════════ */}
      <section style={{ background: BEIGE, color: INK }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32">
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
                n: '01',
                title: 'Confidential by default',
                body: 'Every conversation with a managing partner is covered by mutual confidentiality. NDA available on first request.',
              },
              {
                n: '02',
                title: '48-hour response',
                body: 'A managing partner reviews every application personally and responds within two business days — no automated funnel.',
              },
              {
                n: '03',
                title: 'One clean structure',
                body: 'One LP agreement. One quarterly update. No 10-year lockup confusion. Clear terms from first conversation.',
              },
            ].map((c) => (
              <motion.div
                key={c.n}
                variants={staggerItem}
                className="p-8 md:p-10"
                style={{ background: BEIGE }}
              >
                <div
                  className="font-display text-6xl font-light leading-none mb-8 tabular-nums"
                  style={{ color: 'rgba(0,0,0,0.12)' }}
                >
                  {c.n}
                </div>
                <h3 className="font-display text-xl md:text-2xl mb-3 leading-tight">
                  {c.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(0,0,0,0.65)' }}>
                  {c.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Field — editorial text input, no rounded corners
   ───────────────────────────────────────────────────────────────────────────── */
interface EditFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: string;
}

function EditField({ label, value, onChange, placeholder, type = 'text', required, error }: EditFieldProps) {
  return (
    <div>
      <div
        className="text-[11px] uppercase tracking-[0.25em] mb-2.5 flex items-center gap-1"
        style={{ color: MUTED }}
      >
        {label}
        {required && <span style={{ color: ACCENT }}>*</span>}
      </div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 text-sm focus:outline-none transition"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: `1px solid ${error ? '#f87171' : HAIRLINE}`,
          color: '#fff',
        }}
        onFocus={(e) =>
          (e.currentTarget.style.borderColor = error ? '#f87171' : `${ACCENT}80`)
        }
        onBlur={(e) =>
          (e.currentTarget.style.borderColor = error ? '#f87171' : HAIRLINE)
        }
      />
      {error && (
        <div className="mt-1.5 text-xs" style={{ color: '#f87171' }}>
          {error}
        </div>
      )}
    </div>
  );
}