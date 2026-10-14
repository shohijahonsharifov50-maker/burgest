import { useRef } from 'react';
import { gsap, useGSAP } from '../../motion/gsap';
import { useMotion } from '../../motion/MotionContext';

/** Section heading whose line slides up out of a mask when it reaches the viewport. */
export function RiseHeading({ id, children }) {
  const lineRef = useRef(null);
  const { reduced } = useMotion();

  useGSAP(() => {
    if (reduced) return;
    gsap.from(lineRef.current, {
      yPercent: 105,
      duration: 1,
      ease: 'expo.out',
      scrollTrigger: { trigger: lineRef.current, start: 'top 90%' },
    });
  }, { dependencies: [reduced] });

  return (
    <h2 className="h2" id={id}>
      <span className="clip"><span className="rise" ref={lineRef}>{children}</span></span>
    </h2>
  );
}
