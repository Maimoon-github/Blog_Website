// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'earth-green': { DEFAULT: '#2D6A4F', dark: '#1B4332', light: '#40916C' },
        'earth-brown': { DEFAULT: '#5C3D2E', dark: '#3E2723', light: '#8D6E63' },
        'earth-cream': { DEFAULT: '#FAF9F6', dark: '#F5F0E8' },
        'earth-stone': '#E5E0D8',
        'earth-text': { DEFAULT: '#1A1A1A', secondary: '#5C5C5C', muted: '#8A8A8A' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'serif'],
      },
      boxShadow: {
        soft: '0 4px 24px rgba(28, 25, 23, 0.06)',
        subtle: '0 1px 3px rgba(28, 25, 23, 0.04)',
      },
      borderRadius: {
        card: '0.5rem',   // 8px — grounded, not overly rounded
        pill: '9999px',
      },
      maxWidth: {
        'prose': '65ch',  // Optimal for em-dash-heavy editorial voice
      },
    },
  },
  plugins: [],
};

export default config;