import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Smooth scrolling, shared by the whole app.
 *
 * Lenis intercepts the wheel and drives scrollTop itself, which means three
 * things have to be told about it or they fight it:
 *   - ScrollTrigger, or every reveal and the two drift moments read a stale
 *     scroll position and fire at the wrong place;
 *   - ScrollManager, whose window.scrollTo and scrollIntoView would be
 *     overridden by Lenis's own animation mid-flight;
 *   - the lightbox, whose body overflow lock Lenis simply ignores.
 *
 * It also does not run at all under prefers-reduced-motion. Hijacking the
 * wheel is exactly the kind of motion that setting exists to refuse, and a
 * damped scroll is unusable for anyone it makes ill.
 */
let instance = null;

/** The live Lenis, or null when smooth scrolling is off. */
export const getLenis = () => instance;

export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const lenis = new Lenis({
      duration: 1.05,
      // Slightly short of a full ease-out: the page settles rather than
      // gliding, which matches the 16px reveals.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
    });
    instance = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time) => lenis.raf(time * 1000);   // gsap ticks in seconds
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);            // gsap's own default
      lenis.destroy();
      instance = null;
    };
  }, []);
}
