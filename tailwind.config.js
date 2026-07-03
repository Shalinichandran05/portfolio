/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#050505',
        surface: '#0B0B0D',
        'blue-deep': '#070B12',
        'blue-mid': '#0A1628',
        accent: '#007BFF',
        glow: '#00BFFF',
        ink: '#FFFFFF',
        'ink-soft': '#C8CDD4',
        'ink-faint': '#7D8490',
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body: ['Outfit', 'sans-serif'],
        invite: ['"Cormorant Garamond"', 'serif'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(0, 191, 255, 0.35)',
        'glow-sm': '0 0 20px rgba(0, 191, 255, 0.25)',
        'glow-lg': '0 0 80px rgba(0, 191, 255, 0.4)',
      },
      backgroundImage: {
        'blue-radial': 'radial-gradient(circle at 12% 8%, rgba(0,123,255,0.18) 0%, transparent 28%), radial-gradient(circle at 82% 18%, rgba(0,191,255,0.11) 0%, transparent 24%), radial-gradient(circle at 50% 92%, rgba(0,123,255,0.10) 0%, transparent 34%), #050505',
        'card-gradient': 'radial-gradient(circle at 20% 0%, rgba(0,191,255,0.13), transparent 38%), rgba(12,12,14,0.68)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
        'rotate-flat': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        current: {
          '0%': { strokeDashoffset: '680' },
          '100%': { strokeDashoffset: '0' },
        },
        drift: {
          '0%, 100%': { transform: 'translateX(0px) translateY(0px)' },
          '50%': { transform: 'translateX(10px) translateY(-6px)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 26s linear infinite',
        'rotate-flat': 'rotate-flat 38s linear infinite',
        current: 'current 9s linear infinite',
        drift: 'drift 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}