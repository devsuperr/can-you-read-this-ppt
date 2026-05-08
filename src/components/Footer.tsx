import { Link } from 'react-router-dom';
import { Mail, Globe } from 'lucide-react';

/* All colours are inline — immune to Tailwind purge on the published build. */
const INK     = '#1b1b1b';
const MUTED   = '#c5c1b9';
const BEIGE   = '#dcdad5';
const ACCENT  = '#575ecf';
const HAIRLINE = 'rgba(255,255,255,0.08)';

export default function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${HAIRLINE}`, background: INK }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '80px 48px 48px' }}>

        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 56 }}>

          {/* Brand */}
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{
                width: 36, height: 36,
                background: '#0a1628',
                border: '1px solid rgba(212,175,55,0.4)',
                display: 'flex\', alignItems: \'center\', justifyContent: \'center',
                flexShrink: 0,
              }}>
                <span className="font-display" style={{ color: '#d4af37', fontWeight: 700, fontSize: 18 }}>M</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span className="font-display" style={{ fontSize: 20, letterSpacing: '0.05em', color: '#fff' }}>MOSAIC</span>
                <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.25em', color: MUTED }}>
                  Venture Studio
                </span>
              </div>
            </div>
            <p style={{ color: MUTED, fontSize: 13, lineHeight: 1.7, maxWidth: 360 }}>
              One investment vehicle that owns, builds, and operates a diversified portfolio
              of ventures. One ticket. Every venture. Shared success.
            </p>
            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <a
                href="mailto:investment@mosaicventure.studio"
                style={{ color: BEIGE, fontSize: 13, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                <Mail size={13} style={{ color: ACCENT }} />
                investment@mosaicventure.studio
              </a>
              <span style={{ color: MUTED, fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <Globe size={13} style={{ color: ACCENT }} />
                mosaicventure.studio
              </span>
            </div>
          </div>

          {/* Studio links */}
          <div>
            <h4 style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.25em', color: ACCENT, marginBottom: 16 }}>
              Studio
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { to: '/', label: 'Home' },
                { to: '/investors', label: 'Investors' },
                { to: '/about', label: 'About' },
                { to: '/projects', label: 'Portfolio' },
                { to: '/apply', label: 'Apply for Investment' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} style={{ color: MUTED, fontSize: 13, textDecoration: 'none' }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Investor info */}
          <div>
            <h4 style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.25em', color: ACCENT, marginBottom: 16 }}>
              Investors
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                'Founding Five terms',
                'Tickets NOK 100K – 8M',
                'Quarterly reporting',
                'Pro-rata exit participation',
                'One LP agreement',
              ].map((item) => (
                <li key={item} style={{ color: MUTED, fontSize: 13 }}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: `1px solid ${HAIRLINE}`,
          paddingTop: 28,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 16,
        }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
            © 2026 Mosaic Venture Studio AS · Oslo, Norway · Confidential
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', lineHeight: 1.6, maxWidth: 520 }}>
            Forward-looking statements are not a guarantee of future events. All transactions
            subject to NDA and definitive documentation. Investor Presentation · Confidential 2026.
          </div>
        </div>
      </div>
    </footer>
  );
}
