import { useEffect, useRef } from 'react';
import { BRAND_WORD, BURGER_FILM } from '../../config/site';
import { createFrameSequence } from '../../lib/frameSequence';
import { gsap, ScrollTrigger, useGSAP } from '../../motion/gsap';
import { useMotion } from '../../motion/MotionContext';
import { useI18n } from '../../i18n/LanguageContext';
import { OrderButton } from './OrderButton';

const { orbitFrames: ORBIT, explodeFrames: EXPLODE } = BURGER_FILM;
const TOTAL_FRAMES = ORBIT + EXPLODE;

/** Scroll progress at which the orbit hands over to the exploded view, and where that ends. */
const ORBIT_END = 0.4;
const EXPLODE_END = 0.84;
const CALLOUTS_END = 0.87;

const CALLOUTS = [
  { key: 'c1', at: 0.5, side: 'left' },
  { key: 'c2', at: 0.57, side: 'right' },
  { key: 'c3', at: 0.64, side: 'left' },
  { key: 'c4', at: 0.71, side: 'right' },
  { key: 'c5', at: 0.78, side: 'left' },
];

const isNarrow = () => window.innerWidth <= 860;

function frameForProgress(progress) {
  if (progress < ORBIT_END) return Math.round((progress / ORBIT_END) * (ORBIT - 1));
  if (progress < EXPLODE_END) {
    return ORBIT + Math.round(((progress - ORBIT_END) / (EXPLODE_END - ORBIT_END)) * (EXPLODE - 1));
  }
  return TOTAL_FRAMES - 1;
}

function frameUrl(index) {
  const folder = Math.min(window.innerWidth, window.innerHeight) < 700 ? BURGER_FILM.mobilePath : BURGER_FILM.desktopPath;
  return `${folder}/${String(index + 1).padStart(3, '0')}.jpg`;
}

/**
 * The pinned opening scene: the burger turns 360° as you scroll, then comes apart layer by layer,
 * and a red circle wipes the screen into the next section.
 */
export function Stage({ revealed, onFramesProgress }) {
  const { t } = useI18n();
  const { reduced } = useMotion();
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const playerRef = useRef(null);
  const layerNumRef = useRef(null);
  const progressCallback = useRef(onFramesProgress);
  progressCallback.current = onFramesProgress;

  useEffect(() => {
    const player = createFrameSequence(canvasRef.current, {
      totalFrames: TOTAL_FRAMES,
      segments: [[0, ORBIT], [ORBIT, TOTAL_FRAMES]],
      frameUrl,
    });
    playerRef.current = player;
    player.draw(0);
    player.load((progress) => progressCallback.current?.(progress));
    return () => player.dispose();
  }, []);

  // Hero entrance: hidden until the loader hands over, then letters rise one by one.
  useGSAP(() => {
    if (reduced) return;
    const q = gsap.utils.selector(rootRef);
    if (!revealed) {
      gsap.set(q('.bw'), { yPercent: 110 });
      gsap.set(q('.hero-intro'), { autoAlpha: 0, y: 24 });
      return;
    }
    gsap.timeline()
      .to(q('.bw'), { yPercent: 0, duration: 1.1, stagger: 0.05, ease: 'expo.out' })
      .to(q('.hero-intro'), { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' }, 0.45);
  }, { scope: rootRef, dependencies: [revealed, reduced] });

  // Scroll scene.
  useGSAP(() => {
    if (reduced) return;
    const q = gsap.utils.selector(rootRef);
    const callouts = q('.callout');

    const timeline = gsap.timeline({ defaults: { ease: 'none' } })
      .to(q('#scrollHint'), { autoAlpha: 0, duration: 0.04 }, 0)
      .to(q('.hero__sub, .hero__ctas'), { autoAlpha: 0, y: -30, duration: 0.1 }, 0.05)
      .to(q('#bigword'), { yPercent: -18, scale: 0.86, autoAlpha: 0, duration: 0.26 }, 0.12)
      .fromTo(q('#anatHead'), { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.06 }, ORBIT_END + 0.04)
      .to(q('#anatHead'), { autoAlpha: 0, y: -30, duration: 0.05 }, 0.86)
      .fromTo(q('#wipe'), { clipPath: 'circle(0% at 50% 55%)' },
        { clipPath: 'circle(150% at 50% 55%)', duration: 0.12, ease: 'power2.in' }, 0.88)
      .set({}, {}, 1);

    ScrollTrigger.create({
      trigger: rootRef.current,
      start: 'top top',
      end: () => `+=${window.innerHeight * (isNarrow() ? 5.2 : 5.6)}`,
      pin: q('#stagePin')[0],
      scrub: true,
      anticipatePin: 1,
      animation: timeline,
      onUpdate: ({ progress }) => {
        playerRef.current?.draw(frameForProgress(progress));
        let shown = 0;
        callouts.forEach((callout, i) => {
          const at = CALLOUTS[i].at;
          const nextAt = CALLOUTS[i + 1]?.at ?? CALLOUTS_END;
          // On phones only one callout fits, so each one hides when the next arrives.
          const visible = progress >= at && progress < CALLOUTS_END && (!isNarrow() || progress < nextAt);
          if (progress >= at) shown = i + 1;
          if (callout.dataset.visible === String(visible)) return;
          callout.dataset.visible = String(visible);
          const offset = CALLOUTS[i].side === 'right' ? 30 : -30;
          gsap.to(callout, { autoAlpha: visible ? 1 : 0, x: visible ? 0 : offset, duration: 0.45, ease: 'power3.out', overwrite: true });
        });
        layerNumRef.current.textContent = String(Math.max(1, shown));
      },
    });
  }, { scope: rootRef, dependencies: [reduced] });

  return (
    <section className="stage" id="stage" data-theme-section="dark" aria-label="BURGESTA" ref={rootRef}>
      <div className="stage__pin" id="stagePin">
        <h1 className="bigword" id="bigword" aria-label={BRAND_WORD}>
          {[...BRAND_WORD].map((letter, i) => <span className="bw" key={i}>{letter}</span>)}
        </h1>
        <canvas id="stageCanvas" ref={canvasRef} aria-hidden="true" />

        <div className="hero__foot">
          <p className="hero__sub hero-intro"><b>Happiness with us.</b><span>{t('heroSub')}</span></p>
          <div className="hero__ctas hero-intro">
            <OrderButton />
            <a className="btn btn--line" href="#menu">{t('seeMenu')}</a>
          </div>
        </div>
        <div className="scroll-hint hero-intro" id="scrollHint"><span>{t('scroll')}</span><i /></div>

        <div className="anat-head" id="anatHead">
          <div><p>{t('anatKicker')}</p><h2>{t('anatTitle')}</h2></div>
          <p className="layer-count">
            <span ref={layerNumRef}>1</span>/{CALLOUTS.length}<small>{t('layer')}</small>
          </p>
        </div>
        {CALLOUTS.map(({ key, side }, i) => (
          <article key={key} className={`callout callout--${i + 1}${side === 'right' ? ' callout--r' : ''}`}>
            <h3>{t(`${key}t`)}</h3>
            <p>{t(`${key}d`)}</p>
          </article>
        ))}
        <div className="wipe" id="wipe" aria-hidden="true" />
      </div>
    </section>
  );
}
