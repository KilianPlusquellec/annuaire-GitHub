/** @type {import('tailwindcss').Config} */

// Toutes les couleurs passent par les tokens CSS de src/styles/index.scss.
// Elles sont stockées en canaux RGB pour garder les modificateurs d'opacité
// de Tailwind (`text-fg/60`, `bg-accent/10`, …).
const token = (name) => `rgb(var(${name}) / <alpha-value>)`;

export default {
  // `hover:` ne se déclenche que sur les appareils qui ont un vrai survol,
  // ce qui évite les états collants après un tap sur mobile.
  future: { hoverOnlyWhenSupported: true },
  darkMode: ['variant', '&:where([data-theme="dark"], [data-theme="dark"] *)'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: token('--bg'),
        shell: token('--shell'),
        card: token('--card'),
        line: token('--line'),
        fg: token('--fg'),
        'fg-2': token('--fg-2'),
        'fg-3': token('--fg-3'),
        accent: token('--accent'),
        'accent-ink': token('--accent-ink'),
        'accent-fg': token('--accent-fg'),
        danger: token('--danger'),
      },
      fontFamily: {
        sans: ['Geist Variable', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Geist Mono Variable', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        shell: 'var(--r-shell)',
        core: 'var(--r-core)',
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
        lift: 'var(--shadow-lift)',
        edge: 'var(--edge-highlight)',
      },
      transitionTimingFunction: {
        // Les easings natifs manquent de punch : courbes fortes uniquement.
        out: 'cubic-bezier(0.23, 1, 0.32, 1)',
        'in-out': 'cubic-bezier(0.77, 0, 0.175, 1)',
        drawer: 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      keyframes: {
        enter: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(100%)' },
        },
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        enter: 'enter 600ms cubic-bezier(0.23, 1, 0.32, 1) both',
        shimmer: 'shimmer 1.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        spin: 'spin 700ms linear infinite',
      },
    },
  },
  plugins: [],
};
