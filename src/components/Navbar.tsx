import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About & Investment' },
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
      className={cn(
        'sticky top-0 z-40 transition-all duration-300 border-b',
        scrolled
          ? 'bg-ink-950/90 backdrop-blur-xl border-white/5'
          : 'bg-transparent border-transparent',
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="w-9 h-9 rounded-md bg-ink-900 border border-gold-400/40 flex items-center justify-center group-hover:border-gold-400 transition-colors duration-200"
          >
            <span className="text-gold-400 font-display font-bold text-lg leading-none">M</span>
          </motion.div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-xl tracking-wide text-white">MOSAIC</span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400/70 hidden sm:inline">
              Venture Studio
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                cn(
                  'transition-colors duration-200 relative py-1',
                  isActive ? 'text-white nav-underline' : 'text-slate-300 hover:text-white',
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
            <Link
              to="/apply"
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-gold-400 text-ink-950 font-semibold text-sm hover:bg-gold-300 transition-colors duration-200 shadow-[0_0_30px_-10px_rgba(212,175,55,0.6)]"
            >
              Apply for Investment
            </Link>
          </motion.div>
        </div>

        {/* Mobile burger */}
        <motion.button
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="md:hidden p-2 text-white rounded-lg hover:bg-white/5 transition"
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
            className="md:hidden border-t border-white/5 bg-ink-950/95 backdrop-blur-xl overflow-hidden"
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
                    className={({ isActive }) =>
                      cn(
                        'block py-3 px-4 rounded-xl text-base transition-all duration-200',
                        isActive
                          ? 'bg-gold-400/10 text-white border border-gold-400/20'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white',
                      )
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.06, duration: 0.25 }}
                className="mt-2"
              >
                <Link
                  to="/apply"
                  className="block text-center px-5 py-3.5 rounded-full bg-gold-400 text-ink-950 font-semibold hover:bg-gold-300 transition"
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