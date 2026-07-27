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
        brand: {
          bg: '#0F1115',
          surface: '#1A1D24',
          accent: '#C5A059',
          'accent-hover': '#D4AF37',
          light: '#F8F9FA',
          text: '#F3F4F6',
          muted: '#9CA3AF',
          border: 'rgba(255, 255, 255, 0.08)',
        },
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
