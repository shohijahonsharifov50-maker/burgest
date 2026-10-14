import { useRef } from 'react';
import { GALLERY } from '../../data/gallery';
import { gsap, useGSAP } from '../../motion/gsap';
import { useMotion } from '../../motion/MotionContext';
import { useI18n } from '../../i18n/LanguageContext';
import { RiseHeading } from './RiseHeading';

/** Restaurant photos travelling sideways while the section is pinned. */
export function Gallery() {
  const { t } = useI18n();
  const { reduced } = useMotion();
  const rootRef = useRef(null);
  const pinRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(() => {
    if (reduced) return;
    const track = trackRef.current;
    const distance = () =>
      Math.max(0, track.scrollWidth - window.innerWidth + parseFloat(getComputedStyle(track).paddingLeft));
    const scroll = { trigger: rootRef.current, start: 'top top', end: () => `+=${distance()}`, invalidateOnRefresh: true };

    gsap.to(track, { x: () => -distance(), ease: 'none', scrollTrigger: { ...scroll, pin: pinRef.current, scrub: 1, anticipatePin: 1 } });
    track.querySelectorAll('img').forEach((img) => {
      gsap.fromTo(img, { xPercent: -8 }, { xPercent: 8, ease: 'none', scrollTrigger: { ...scroll, scrub: true } });
    });
  }, { scope: rootRef, dependencies: [reduced] });

  return (
    <section className="gallery" id="gallery" data-theme-section="dark" aria-labelledby="galTitle" ref={rootRef}>
      <div className="gal-pin" ref={pinRef}>
        <div className="wrap gal-head">
          <RiseHeading id="galTitle">{t('galTitle')}</RiseHeading>
          <p className="lead">{t('galLead')}</p>
        </div>
        <div className="gal-track" ref={trackRef}>
          {GALLERY.map(({ src, captionKey }) => (
            <figure className="gcard" key={src}>
              <img src={src} alt="" loading="lazy" />
              <figcaption>{t(captionKey)}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
