import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#070d1a',
          900: '#0a1628',
          800: '#0f1d33',
          700: '#1a2942',
          600: '#243653',
        },
        gold: {
          50: '#fdf8ec',
          100: '#faecc4',
          200: '#f4d98a',
          300: '#ecc251',
          400: '#d4af37',
          500: '#b8932a',
          600: '#937321',
          700: '#6e561a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Fraunces"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        widest: '0.25em',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(rgba(212,175,55,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.06) 1px, transparent 1px)',
        'radial-gold':
          'radial-gradient(ellipse at top, rgba(212,175,55,0.18), transparent 60%)',
      },
    },
  },
  plugins: [],
} satisfies Config;