import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getLenis } from '../lib/lenis';

/**
 * React Router keeps the scroll position across navigations, so clicking a
 * suite 800px down the grid used to land you 800px down the detail page.
 * This resets to the top on a route change, and honours a hash when one is
 * present so `/#suites` works from anywhere in the app.
 *
 * Both go through Lenis when smooth scrolling is on. A native window.scrollTo
 * sets scrollTop directly, which Lenis overwrites on its next frame — the page
 * would jump and then slide back. Falls back to native when Lenis is off.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const lenis = getLenis();

    if (hash) {
      // The target may mount a frame after the route change.
      const raf = requestAnimationFrame(() => {
        const el = document.getElementById(hash.slice(1));
        if (!el) return;
        // No offset: Lenis already honours the scroll-mt-24 on section
        // anchors. Passing -96 to "account for" it double-counted and landed
        // the heading 192px down instead of 96.
        if (lenis) lenis.scrollTo(el);
        else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      return () => cancelAnimationFrame(raf);
    }

    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
