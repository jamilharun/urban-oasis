/** @type {import('tailwindcss').Config} */

// The noise tile for the grain layer, inlined so it costs no request.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'condo-dark': '#0f172a',   // Slate 900
        'condo-panel': '#161f33',  // one step up, for cards that lift off the ground
        'condo-light': '#f8fafc',  // Slate 50
        'condo-accent': '#c0a062', // brass — for dark backgrounds only
        'condo-ink': '#7a6224',    // brass darkened to 5.7:1 on condo-light
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      // Display scale with optical tracking baked in: the larger the size, the
      // tighter it needs to be set. A 100px headline at the same tracking as a
      // 40px one looks loose, which is the commonest way big type reads cheap.
      // The top two steps sit at/above 1.0 leading — below that, a descender on
      // line one lands on an ascender on line two.
      fontSize: {
        'display-xs': ['1.875rem', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'display-sm': ['2.75rem',  { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-md': ['3.75rem',  { lineHeight: '1.0',  letterSpacing: '-0.025em' }],
        'display-lg': ['4.75rem',  { lineHeight: '1.0',  letterSpacing: '-0.03em' }],
        'display-xl': ['6.5rem',   { lineHeight: '1.02', letterSpacing: '-0.035em' }],
      },
      maxWidth: {
        // Body copy wants 60–70 characters. Note `ch` is the width of the zero
        // glyph (~0.6em in Inter), not the average character advance (~0.5em),
        // so 54ch measures out to roughly 68 characters, which is the target.
        measure: '54ch',
        'measure-wide': '62ch',
      },
      borderRadius: {
        // Two radii, used everywhere. Was five.
        card: '0.75rem',
        control: '0.5rem',
      },
    },
  },
  plugins: [
    // Element defaults and the page ground. These are the only rules that are
    // not utilities — multi-stop gradients, a mask, a pseudo-element and a
    // global focus ring have no utility form, so they live here with the rest
    // of the design system rather than in a separate stylesheet.
    function ({ addBase, addComponents, theme }) {
      // theme() resolves fontFamily to a joined string, and fontSize to either
      // a bare size or a [size, options] tuple depending on the key.
      const size = (v) => (Array.isArray(v) ? v[0] : v);

      addBase({
        body: {
          backgroundColor: '#0b1220',
          color: theme('colors.condo-light'),
          fontFamily: theme('fontFamily.sans'),
          '-webkit-font-smoothing': 'antialiased',
        },

        // Brass on the dark ground; darkened on the light section, where the
        // brass itself is only 2.4:1.
        ':root': { '--focus-ring': theme('colors.condo-accent') },
        '.bg-condo-light': { '--focus-ring': theme('colors.condo-ink') },

        // Every interactive element sets outline-none somewhere; this is the
        // replacement, applied once rather than on each of them.
        ':where(a, button, input, select, [tabindex]):focus-visible': {
          outline: '2px solid var(--focus-ring)',
          outlineOffset: '2px',
        },

        // GSAP's matchMedia handles its own animations; this covers the CSS
        // transitions on hover.
        '@media (prefers-reduced-motion: reduce)': {
          '*, *::before, *::after': {
            transitionDuration: '0.01ms !important',
            animationDuration: '0.01ms !important',
          },
        },
      });

      addComponents({
        // Was repeated ten times with two different tracking values.
        '.eyebrow': {
          fontSize: size(theme('fontSize.xs')),
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.22em',
        },

        // The ground, in three layers instead of one flat fill. Sections are
        // transparent so all three show through.
        '.ground-ambient, .ground-structure, .ground-grain': {
          position: 'fixed',
          inset: '0',
          pointerEvents: 'none',
        },
        // Fixed, so it never repaints on scroll. Brass blooms top-left and
        // right with a cool lift at the base, so the page reads as a lit room.
        '.ground-ambient': {
          zIndex: '-3',
          background: [
            'radial-gradient(75rem 45rem at 8% -8%, rgba(192,160,98,0.13), transparent 62%)',
            'radial-gradient(60rem 45rem at 102% 28%, rgba(192,160,98,0.08), transparent 58%)',
            'radial-gradient(70rem 40rem at 50% 108%, rgba(122,152,196,0.10), transparent 62%)',
            'linear-gradient(180deg, #0b1220 0%, #101a2e 45%, #0a111f 100%)',
          ].join(', '),
        },
        // Scrolls with the page: hairlines every 88px standing in for the
        // building's floor plates, faded at both ends so they never look
        // like a table.
        '.ground-structure': {
          position: 'absolute',
          zIndex: '-2',
          height: 'auto',
          bottom: 'auto',
          minHeight: '100%',
          backgroundImage:
            'repeating-linear-gradient(180deg, rgba(255,255,255,0.032) 0, rgba(255,255,255,0.032) 1px, transparent 1px, transparent 88px)',
          maskImage:
            'linear-gradient(180deg, transparent, #000 12rem, #000 calc(100% - 12rem), transparent)',
        },
        // Film grain. What stops a dark UI reading as flat plastic.
        '.ground-grain': {
          zIndex: '-1',
          opacity: '0.32',
          mixBlendMode: 'overlay',
          backgroundImage: GRAIN,
        },

        // A brass bloom a section pins behind its own heading.
        '.section-bloom::before': {
          content: "''",
          position: 'absolute',
          top: '-6rem',
          left: '-10%',
          width: '55rem',
          height: '34rem',
          pointerEvents: 'none',
          background: 'radial-gradient(closest-side, rgba(192,160,98,0.11), transparent 70%)',
        },
      });
    },
  ],
};
