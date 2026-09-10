import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * All of the site's motion, in one place.
 *
 * gsap.matchMedia handles prefers-reduced-motion for us: under `reduce`
 * nothing in the block ever runs, and reverting it restores every element to
 * the state it had in the markup. That removes the whole
 * "base state must be the finished state" discipline the CSS version needed,
 * and unlike scroll-driven CSS timelines this runs in Safari and Firefox too.
 *
 * Distances stay small — 16px and a 1.08x drift. Expensive motion settles; it
 * does not travel. Drift is used on exactly two moments, never on every block.
 *
 * `routeKey` re-runs the setup after a route change, since the DOM is new.
 */
export function useSiteMotion(routeKey) {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // --- Intro. The hero is above the fold, so it plays on load. ---------
      const intro = gsap.utils.toArray('[data-intro]');
      if (intro.length) {
        gsap.from(intro, {
          opacity: 0,
          y: 20,
          duration: 0.9,
          ease: 'power2.out',
          stagger: 0.1,
        });
      }

      // --- Reveals. A standalone block, then grouped rows. -----------------
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 16,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        });
      });

      // stagger is why this is one call instead of nth-child range offsets.
      gsap.utils.toArray('.reveal-group').forEach((group) => {
        gsap.from(group.children, {
          opacity: 0,
          y: 16,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.09,
          scrollTrigger: { trigger: group, start: 'top 88%' },
        });
      });

      // --- Drift. The hero plate travels less than the scroll, so it reads
      //     as sitting behind the content rather than moving with it. -------
      gsap.utils.toArray('.hero-plate').forEach((el) => {
        gsap.fromTo(el,
          { scale: 1.06, yPercent: 0 },
          {
            scale: 1.14,
            yPercent: 7,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top top', end: '+=100%', scrub: true },
          });
      });

      gsap.utils.toArray('.plate-drift').forEach((el) => {
        gsap.fromTo(el,
          { scale: 1.1, yPercent: -2.5 },
          {
            yPercent: 2.5,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          });
      });

      // --- The bar finds its ground as you leave the hero. -----------------
      const nav = document.querySelector('[data-nav-over-hero]');
      if (nav) {
        gsap.fromTo(nav,
          { backgroundColor: 'rgba(15,23,42,0)', borderBottomColor: 'rgba(255,255,255,0)', backdropFilter: 'blur(0px)' },
          {
            backgroundColor: 'rgba(15,23,42,0.72)',
            borderBottomColor: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(12px)',
            ease: 'none',
            scrollTrigger: { start: 0, end: 140, scrub: true },
          });
      }
    });

    return () => mm.revert();
  }, [routeKey]);
}

/** The 220ms settle when a page arrives. */
export function usePageIn(routeKey) {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('[data-page]', { opacity: 0, y: 6, duration: 0.22, ease: 'power2.out' });
    });
    return () => mm.revert();
  }, [routeKey]);
}
