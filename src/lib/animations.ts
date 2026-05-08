/**
 * Shared Framer Motion variants for Mosaic Venture Studio.
 * Import and spread these onto motion elements for consistent, polished transitions.
 */

/** Fade up — single element, scroll-triggered */
export const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
};

/** Fade up — used for page hero (animate on mount, not on scroll) */
export const fadeUpMount = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
});

/** Stagger container — wraps a list of staggered children */
export const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
  viewport: { once: true, margin: '-60px' },
};

/** Stagger item — child of staggerContainer */
export const staggerItem = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

/** Scale-in — for modals, success states, pill badges */
export const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.92 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
});

/** Slide-down — for mobile nav drawers */
export const slideDown = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: 'auto' },
  exit: { opacity: 0, height: 0 },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
};

/** Width reveal — progress bars */
export const widthReveal = (toWidth: string, delay = 0.3) => ({
  initial: { width: 0 },
  whileInView: { width: toWidth },
  viewport: { once: true },
  transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay },
});