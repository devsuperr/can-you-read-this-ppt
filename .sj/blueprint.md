# Project blueprint

## Project brief
Premium investor-facing site for **Mosaic Venture Studio**, built from the official PPT deck. One investment, every venture, shared success — Oslo-based studio, 13-venture portfolio, NOK 100K–8M tickets, Founding Five terms.

## Built so far
- Phase 1e (venture detail pages):
  - `src/pages/VentureDetailPage.tsx` — new page at `/projects/:id` for all 13 ventures:
    back strip → hero (display name, ACCENT tagline, description, dual CTAs) →
    round info panel (WorkHub/Keep only: ACCENT status cell + shimmer allocation bar) →
    5 numbered editorial sections (What it is / Problem / Solution / Business model / Why now) →
    6-cell `gap-px` metrics grid → beige CTA strip (venture-specific headline) →
    3-card "More from the studio" grid (fully linked to sibling detail pages)
  - `src/App.tsx` — `/projects/:id` route added (surgical 2-line patch)
  - `src/pages/ProjectsPage.tsx` — every table row + mobile card wrapped in `<Link to="/projects/:id">`;
    WorkHub featured card gets "View venture" secondary button alongside "Reserve allocation"
- Phase 1d (ApplyPage editorial restyle): full split-screen form, tier selector, beige promise block
- Phase 1c (all 4 pages on editorial palette #1b1b1b / #dcdad5 / #575ecf):
  HomePage, AboutPage, ProjectsPage, ApplyPage — hairline dividers, oversized display, sticky-left labels
- Phase 1b (animations): animations.ts, useCountUp.ts, GlowCard.tsx, page-enter + shimmer keyframes, AnimatePresence navbar
- Phase 1a (scaffold): Vite + React + TS, all 4 pages, Navbar, Footer, portfolio.ts (13 ventures + detail fields + 4 tiers)

## Pending
- Phase 2: Wire `/apply` form to real backend (Supabase `applications` table + Resend email to investment@mosaicventure.studio)
- Per-tier downloadable LP-agreement PDF
- Press / news / quarterly reporting page (`/news`)
- Gated investor dashboard (auth required, `/dashboard`)

## Architecture
- React Router v6, single SPA, no auth yet
- Mock data only — no Supabase, no edge functions
- All 13 ventures have full `detail` fields in `src/lib/portfolio.ts` (what/problem/solution/businessModel/whyNow/metrics/roundInfo)
- Editorial palette tokens inline per page: INK #1b1b1b, BEIGE #dcdad5, MUTED #c5c1b9, ACCENT #575ecf
- Tailwind `ink-*` / `gold-*` tokens still used in Navbar + Footer (shared chrome)
- Framer Motion `whileInView` + `staggerContainer` / `staggerItem` for all section reveals
- All copy sourced from `Mosaic_Venture_Studio_Deck.pptx`

## Last session
2026-05-09 — Added individual venture detail pages (Phase 1e). All 13 ventures fully clickable; detail pages cover 5 editorial sections + metrics + CTA + sibling grid.