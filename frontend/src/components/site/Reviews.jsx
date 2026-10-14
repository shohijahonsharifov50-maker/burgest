import { useRef } from 'react';
import { REVIEWS } from '../../data/reviews';
import { formatReviewDate } from '../../lib/format';
import { gsap, useGSAP } from '../../motion/gsap';
import { useMotion } from '../../motion/MotionContext';
import { useI18n } from '../../i18n/LanguageContext';
import { MONTHS } from '../../i18n/translations';
import { CountUp } from './CountUp';
import { RiseHeading } from './RiseHeading';

function Star({ dimmed = false }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" opacity={dimmed ? 0.85 : 1}>
      <path d="M12 2.5l2.9 6.2 6.8.7-5.1 4.6 1.5 6.7L12 17.3 5.9 20.7l1.5-6.7L2.3 9.4l6.8-.7z" />
    </svg>
  );
}

export function Reviews() {
  const { t, lang } = useI18n();
  const { reduced } = useMotion();
  const listRef = useRef(null);

  useGSAP(() => {
    if (reduced) return;
    gsap.fromTo(listRef.current.children, { autoAlpha: 0, y: 40 }, {
      autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: listRef.current, start: 'top 80%' },
    });
  }, { dependencies: [reduced] });

  return (
    <section className="reviews" id="reviews" data-theme-section="teal" aria-labelledby="revTitle">
      <div className="wrap">
        <div className="rev-top">
          <RiseHeading id="revTitle">{t('revTitle')}</RiseHeading>
          <div className="rating">
            <div className="rating__n"><CountUp value={4.8} decimals={1} /></div>
            <div className="rating__stars" aria-label="4.8 / 5">
              {[0, 1, 2, 3, 4].map((i) => <Star key={i} dimmed={i === 4} />)}
            </div>
            <p className="rating__lbl">{t('revBased')}</p>
          </div>
        </div>

        <div className="rev-list" ref={listRef}>
          {REVIEWS.map((review, i) => (
            <figure className={`rev${i === 0 ? ' rev--lead' : ''}`} key={review.author}>
              <blockquote className="rev__q">{review.text[lang]}</blockquote>
              <figcaption className="rev__by">
                <span className="rev__av" aria-hidden="true">{review.author[0]}</span>
                <span>
                  <b>{review.author}</b>
                  <span className="rev__meta">
                    <span className="rev__stars" aria-label="5/5">{[0, 1, 2, 3, 4].map((s) => <Star key={s} />)}</span>
                    {formatReviewDate(review.date, MONTHS[lang])}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="rev-src">{t('revSrc')}</p>
      </div>
    </section>
  );
}
