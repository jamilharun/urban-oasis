import { useEffect } from 'react';

export function useParallaxFallback() {
  useEffect(() => {
    // If the browser natively supports CSS scroll-driven animations, do nothing!
    if (typeof CSS !== 'undefined' && CSS.supports && CSS.supports('animation-timeline', 'view()')) {
      return;
    }

    let frameId;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const innerHeight = window.innerHeight;

      // 1. Hero Plate (animation-range: 0 100vh)
      const hero = document.querySelector('.hero-plate');
      if (hero) {
        const progress = Math.min(Math.max(scrollY / innerHeight, 0), 1);
        // scale 1.06 -> 1.14, translateY 0 -> 7%
        // Using 1.14 scale to prevent gap at the top when translating down
        const scale = 1.06 + progress * 0.08;
        const translateY = progress * 7;
        hero.style.transform = `scale(${scale}) translateY(${translateY}%)`;
      }

      // 2. Nav Over Hero (animation-range: 0 140px)
      const nav = document.querySelector('.nav-over-hero');
      if (nav) {
        const progress = Math.min(Math.max(scrollY / 140, 0), 1);
        if (progress > 0) {
          nav.style.backgroundColor = `rgba(15, 23, 42, ${progress * 0.72})`;
          nav.style.borderBottomColor = `rgba(255, 255, 255, ${progress * 0.1})`;
          nav.style.backdropFilter = `blur(${progress * 12}px)`;
        } else {
          nav.style.backgroundColor = 'transparent';
          nav.style.borderBottomColor = 'transparent';
          nav.style.backdropFilter = 'blur(0px)';
        }
      }

      // 3. Plate Drift (animation-timeline: view())
      const plates = document.querySelectorAll('.plate-drift');
      plates.forEach((plate) => {
        const rect = plate.getBoundingClientRect();
        // Calculate progress from when element enters bottom of screen (0) to leaves top of screen (1)
        const totalDistance = innerHeight + rect.height;
        const currentDistance = innerHeight - rect.top;
        const progress = Math.min(Math.max(currentDistance / totalDistance, 0), 1);
        
        // translateY -2.5% -> 2.5%
        const translateY = -2.5 + progress * 5;
        plate.style.transform = `scale(1.1) translateY(${translateY}%)`;
      });

      // 4. Reveals (animation-range: entry 5% entry 90%)
      const reveals = document.querySelectorAll('.reveal, .reveal-group > *');
      reveals.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // If element top is above 95% of viewport height, fade it in
        if (rect.top < innerHeight * 0.95) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          el.style.transition = 'opacity 0.8s cubic-bezier(0.33, 1, 0.68, 1), transform 0.8s cubic-bezier(0.33, 1, 0.68, 1)';
        } else if (!el.style.opacity) {
          // Initial state
          el.style.opacity = '0';
          el.style.transform = 'translateY(16px)';
        }
      });
    };

    const handleScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(onScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(frameId);
    };
  }, []);
}
