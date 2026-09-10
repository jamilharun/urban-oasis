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
      // Display scale with optical tracking baked in: the larger the size, the
      // tighter it needs to be set. A 100px headline at the same tracking as a
      // 40px one looks loose, which is the commonest way big type reads cheap.
      fontSize: {
        'display-xs': ['1.875rem', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'display-sm': ['2.75rem',  { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-md': ['3.75rem',  { lineHeight: '1.0',  letterSpacing: '-0.025em' }],
        'display-lg': ['4.75rem',  { lineHeight: '0.98', letterSpacing: '-0.03em' }],
        'display-xl': ['6.5rem',   { lineHeight: '1.02', letterSpacing: '-0.035em' }],
      },
      maxWidth: {
        // Body copy wants 60–70 characters. Note `ch` is the width of the zero
        // glyph (~0.6em in Inter), not the average character advance (~0.5em),
        // so these are ~20% larger than the character count they produce:
        // 54ch measures out to roughly 68 characters, which is the target.
        measure: '54ch',
        'measure-wide': '62ch',
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
        'route-in': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'rise': 'rise 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'route-in': 'route-in 220ms cubic-bezier(0.33, 1, 0.68, 1) both',
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
