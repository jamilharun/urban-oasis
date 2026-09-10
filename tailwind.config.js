/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'condo-dark': '#0f172a',   // Slate 900
        'condo-panel': '#161f33',  // one step up, for cards that need to lift off the ground
        'condo-light': '#f8fafc',  // Slate 50
        'condo-accent': '#c0a062', // brass — for dark backgrounds only
        'condo-ink': '#7a6224',    // brass darkened to 4.9:1 on condo-light
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      borderRadius: {
        // Two radii, used everywhere. Was five.
        card: '0.75rem',
        control: '0.5rem',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'rise': {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'rise': 'rise 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
      // Tailwind's `delay-*` sets transition-delay, not animation-delay — which is
      // why the hero cascade never played. These are the animation-delay scale.
      animationDelay: {
        0: '0ms',
        100: '100ms',
        200: '200ms',
        300: '300ms',
        400: '400ms',
      },
    },
  },
  plugins: [
    function ({ matchUtilities, theme }) {
      matchUtilities(
        { 'animate-delay': (value) => ({ animationDelay: value }) },
        { values: theme('animationDelay') },
      );
    },
  ],
}
