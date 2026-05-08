import { Link } from 'react-router-dom';
import { Mail, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-ink-950 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-md bg-ink-900 border border-gold-400/40 flex items-center justify-center">
                <span className="text-gold-400 font-display font-bold text-lg leading-none">M</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-xl tracking-wide text-white">MOSAIC</span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400/70">
                  Venture Studio
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              One investment vehicle that owns, builds, and operates a diversified portfolio of
              ventures. One ticket. Every venture. Shared success.
            </p>
            <div className="mt-6 flex flex-col gap-2 text-sm">
              <a
                href="mailto:investment@mosaicventure.studio"
                className="text-slate-300 hover:text-gold-400 transition inline-flex items-center gap-2"
              >
                <Mail size={14} className="text-gold-400" />
                investment@mosaicventure.studio
              </a>
              <span className="text-slate-300 inline-flex items-center gap-2">
                <Globe size={14} className="text-gold-400" />
                mosaicventure.studio
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-gold-400 mb-4">Studio</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-300 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-300 hover:text-white transition">
                  About & Investment
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-slate-300 hover:text-white transition">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/apply" className="text-slate-300 hover:text-white transition">
                  Apply for Investment
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-gold-400 mb-4">Investor</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="text-slate-300">Founding Five terms</li>
              <li className="text-slate-300">Tickets NOK 100K – 8M</li>
              <li className="text-slate-300">Quarterly reporting</li>
              <li className="text-slate-300">Pro-rata exit participation</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-slate-500">
          <div>© 2026 Mosaic Venture Studio AS · Oslo, Norway · Confidential</div>
          <div className="max-w-2xl text-slate-500/80 leading-relaxed">
            Forward-looking statements are not a guarantee of future events. All transactions
            subject to NDA and definitive documentation.
          </div>
        </div>
      </div>
    </footer>
  );
}