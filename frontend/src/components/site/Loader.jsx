import { useRef, useState } from 'react';
import { gsap, useGSAP } from '../../motion/gsap';
import { useMotion } from '../../motion/MotionContext';
import { LogoMark } from './LogoMark';

/**
 * Full-screen loader. When the first burger frames are in, its logo flies into the nav bar
 * and `onReveal` starts the hero entrance.
 */
export function Loader({ progress, ready, navMarkRef, onReveal }) {
  const rootRef = useRef(null);
  const markRef = useRef(null);
  const percentRef = useRef(null);
  const [finished, setFinished] = useState(false);
  const { reduced } = useMotion();

  useGSAP(() => {
    if (!reduced) gsap.set(navMarkRef.current, { autoAlpha: 0 });
  }, []);

  useGSAP(() => {
    if (!ready) return;
    if (reduced) {
      gsap.set(navMarkRef.current, { autoAlpha: 1 });
      setFinished(true);
      onReveal();
      return;
    }
    const from = markRef.current.getBoundingClientRect();
    const to = navMarkRef.current.getBoundingClientRect();
    gsap.timeline({ onComplete: () => setFinished(true) })
      .to(percentRef.current, { autoAlpha: 0, duration: 0.25 })
      .to(markRef.current, {
        x: to.left + to.width / 2 - (from.left + from.width / 2),
        y: to.top + to.height / 2 - (from.top + from.height / 2),
        scale: to.width / from.width,
        duration: 0.9,
        ease: 'expo.inOut',
      }, 0)
      .to(rootRef.current, { backgroundColor: 'rgba(0,0,0,0)', duration: 0.7, ease: 'power2.inOut' }, 0.35)
      .call(onReveal, null, 0.55)
      .set(navMarkRef.current, { autoAlpha: 1 }, 0.9)
      .set(rootRef.current, { autoAlpha: 0 }, 0.95);
  }, { dependencies: [ready] });

  if (finished) return null;
  return (
    <div className={`loader${ready ? ' is-ready' : ''}`} ref={rootRef} aria-hidden="true">
      <LogoMark ref={markRef} className="loader__mark" />
      <span className="loader__pct" ref={percentRef}>{Math.round(progress * 100)}%</span>
    </div>
  );
}
