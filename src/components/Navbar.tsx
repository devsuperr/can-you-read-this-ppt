import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
/* Editorial palette — matches every page. Inline styles so publish CSS
   can never strip or mismatch these values via Tailwind purge. */
const ACCENT = '#575ecf';
const MUTED  = '#c5c1b9';
const HAIRLINE = 'rgba(255,255,255,0.08)';

const links = [
  { to: '/', label: 'Home' },
  { to: '/investors', label: 'Investors' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/apply', label: 'Apply' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        borderBottom: `1px solid ${scrolled ? HAIRLINE : 'transparent'}`,
        background: scrolled ? 'rgba(27,27,27,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : undefined,
        transition: 'background 0.3s, border-color 0.3s',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group" style={{ textDecoration: 'none' }}>
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            style={{
              width: 36,
              height: 36,
              background: '#0a1628',
              border: '1px solid rgba(212,175,55,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span className="font-display" style={{ color: '#d4af37', fontWeight: 700, fontSize: 18, lineHeight: 1 }}>M</span>
          </motion.div>
          <div className="flex items-baseline gap-2">
            <span className="font-display" style={{ fontSize: 20, letterSpacing: '0.05em', color: '#fff' }}>MOSAIC</span>
            <span className="hidden sm:inline" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.25em', color: MUTED }}>
              Venture Studio
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" style={{ fontSize: 13 }}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              style={({ isActive }) => ({
                color: isActive ? '#fff' : MUTED,
                textDecoration: 'none',
                transition: 'color 0.2s',
                position: 'relative',
              })}
              className={({ isActive }) => isActive ? 'nav-underline' : ''}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <Link
              to="/apply"
              style={{
                background: ACCENT,
                color: '#fff',
                padding: '10px 22px',
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 500,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              Apply for Investment
            </Link>
          </motion.div>
        </div>

        {/* Mobile burger */}
        <motion.button
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="md:hidden p-2 rounded-lg transition"
          style={{ color: '#fff', background: 'transparent', border: 'none', cursor: 'pointer' }}
          onClick={() => setOpen((v) => !v)}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                style={{ display: 'block' }}
              >
                <X size={22} />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                style={{ display: 'block' }}
              >
                <Menu size={22} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden"
            style={{
              borderTop: `1px solid ${HAIRLINE}`,
              background: 'rgba(27,27,27,0.97)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <nav className="px-6 py-5 flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.25, ease: 'easeOut' }}
                >
                  <NavLink
                    to={l.to}
                    end={l.to === '/'}
                    style={({ isActive }) => ({
                      display: 'block',
                      padding: '12px 16px',
                      fontSize: 15,
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                      color: isActive ? '#fff' : MUTED,
                      background: isActive ? `${ACCENT}18` : 'transparent',
                      border: `1px solid ${isActive ? `${ACCENT}30` : 'transparent'}`,
                    })}
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.06, duration: 0.25 }}
                style={{ marginTop: 8 }}
              >
                <Link
                  to="/apply"
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    padding: '14px 20px',
                    borderRadius: 999,
                    background: ACCENT,
                    color: '#fff',
                    fontWeight: 500,
                    fontSize: 14,
                    textDecoration: 'none',
                  }}
                >
                  Apply for Investment
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}