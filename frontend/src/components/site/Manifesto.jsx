import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../../motion/gsap';
import { useMotion } from '../../motion/MotionContext';
import { useI18n } from '../../i18n/LanguageContext';
import { CountUp } from './CountUp';
import { LogoMark } from './LogoMark';

const LINE_KEYS = ['m1', 'm2', 'm3', 'm4'];

/** Red section: four words from guest reviews fill in letter by letter as you scroll. */
export function Manifesto({ itemCount }) {
  const { t, lang } = useI18n();
  const { reduced } = useMotion();
  const rootRef = useRef(null);
  const markRef = useRef(null);

  useGSAP(() => {
    if (reduced) return;
    const letters = rootRef.current.querySelectorAll('.mch');
    ScrollTrigger.create({
      trigger: rootRef.current,
      start: 'top 75%',
      end: 'bottom 70%',
      scrub: true,
      onUpdate: ({ progress }) => {
        const lit = Math.round(progress * 1.25 * letters.length);
        letters.forEach((letter, i) => letter.classList.toggle('lit', i < lit));
      },
    });
    gsap.from(markRef.current, {
      rotate: -25,
      scale: 0.6,
      autoAlpha: 0,
      ease: 'none',
      scrollTrigger: { trigger: rootRef.current, start: 'top bottom', end: 'top 20%', scrub: true },
    });
  }, { scope: rootRef, dependencies: [lang, reduced], revertOnUpdate: true });

  return (
    <section className="manifesto" id="manifesto" data-theme-section="red" ref={rootRef}>
      <div className="wrap">
        <LogoMark ref={markRef} className="big-mark" />
        <h2 className="mlines">
          {LINE_KEYS.map((key) => (
            <span className="mline" key={key} aria-label={t(key)}>
              {[...t(key)].map((char, i) => (
                <span className="mch" aria-hidden="true" key={i}>{char === ' ' ? ' ' : char}</span>
              ))}
            </span>
          ))}
        </h2>
        <p className="mnote">{t('mNote')}</p>
        <div className="stats">
          <p className="stat"><CountUp value={4.8} decimals={1} /><span className="stat__lbl">{t('s1')}</span></p>
          <p className="stat"><span className="stat__num">09–01</span><span className="stat__lbl">{t('s2')}</span></p>
          <p className="stat"><CountUp value={itemCount} /><span className="stat__lbl">{t('s3')}</span></p>
        </div>
      </div>
    </section>
  );
}
