import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: '#1F4852',
          dark: '#15363E',
        },
        gold: {
          DEFAULT: '#F4BE12',
          hi: '#FFC515',
        },
        graphite: '#1E2A2E',
        'warm-white': '#F8F8F5',
        concrete: '#ECEDE9',
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(30,42,46,0.08)',
        'card-hover': '0 8px 24px rgba(30,42,46,0.14)',
        gold: '0 0 0 3px rgba(244,190,18,0.35)',
      },
    },
  },
  plugins: [],
}
export default config
