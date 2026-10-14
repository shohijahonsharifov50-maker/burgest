import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../../motion/gsap';
import { useMotion } from '../../motion/MotionContext';

/** A number that counts up from zero the first time it scrolls into view. */
export function CountUp({ value, decimals = 0, className = 'stat__num' }) {
  const ref = useRef(null);
  const playedRef = useRef(false);
  const { reduced } = useMotion();
  const finalText = value == null ? '—' : Number(value).toFixed(decimals);

  useGSAP(() => {
    const element = ref.current;
    if (reduced || value == null || playedRef.current) {
      element.textContent = finalText;
      return;
    }
    element.textContent = (0).toFixed(decimals);
    ScrollTrigger.create({
      trigger: element,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        playedRef.current = true;
        const counter = { n: 0 };
        gsap.to(counter, {
          n: value,
          duration: 1.4,
          ease: 'power2.out',
          onUpdate: () => { element.textContent = counter.n.toFixed(decimals); },
        });
      },
    });
  }, { dependencies: [value, reduced] });

  return <span ref={ref} className={className}>{finalText}</span>;
}
