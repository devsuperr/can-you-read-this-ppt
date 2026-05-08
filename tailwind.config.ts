import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
          ink: {
            50: '#f7f8f5',
            100: '#e8ede4',
            200: '#d1dacb',
            300: '#aebda5',
            400: '#849976',
            500: '#667b56',
            600: '#4f6142',
            700: '#3f4d35',
            800: '#333f2d',
            900: '#1f2a1e',
            950: '#0b120d',
          },
          jungle: {
            50: '#eef8f1',
            100: '#d8efdf',
            200: '#b5dfc2',
            300: '#84c79b',
            400: '#4ba96e',
            500: '#289351',
            600: '#1d743f',
            700: '#195d35',
            800: '#164a2d',
            900: '#123d25',
            950: '#082114',
          },
          moss: {
            50: '#f5f7ed',
            100: '#e8ecd5',
            200: '#d3dcaf',
            300: '#b6c57f',
            400: '#98ab56',
            500: '#7a8d3d',
            600: '#5f7130',
            700: '#4a5828',
            800: '#3d4824',
            900: '#343e22',
            950: '#1a2110',
          },
          cream: '#f5efe1',
          paper: '#fbf7ef',
        },
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