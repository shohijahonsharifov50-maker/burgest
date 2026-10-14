import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const MotionContext = createContext(null);

/** Offsets for in-page links: menu categories sit under the sticky nav + chip bar. */
function anchorOffset(hash) {
  if (hash.startsWith('#cat-')) return -140;
  if (hash === '#top') return 0;
  return -10;
}

/**
 * Owns smooth scrolling (Lenis driven by the GSAP ticker) and tells components whether to animate.
 * With reduced motion there is no Lenis and every section renders in its final state.
 */
export function MotionProvider({ children }) {
  const reduced = usePrefersReducedMotion();
  const lenisRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle('no-motion', reduced);
    if (reduced) return undefined;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    const tick = (time) => lenis.raf(time * 1000);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    lenisRef.current = lenis;

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  const scrollTo = useCallback((target, offset = 0) => {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return;
    if (lenisRef.current) lenisRef.current.scrollTo(element, { offset, duration: 1.4 });
    else element.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  }, [reduced]);

  // Every same-page link (#menu, #cat-burger, #top…) scrolls smoothly instead of jumping.
  useEffect(() => {
    const onClick = (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute('href');
      if (hash.length < 2 || !document.querySelector(hash)) return;
      event.preventDefault();
      scrollTo(hash, anchorOffset(hash));
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [scrollTo]);

  const value = useMemo(() => ({ reduced, scrollTo, getLenis: () => lenisRef.current }), [reduced, scrollTo]);
  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

export function useMotion() {
  const context = useContext(MotionContext);
  if (!context) throw new Error('useMotion must be used inside <MotionProvider>');
  return context;
}
