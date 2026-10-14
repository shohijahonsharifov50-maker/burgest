import { lazy, Suspense, useRef } from 'react';
import { BRAND_WORD, CONTACTS } from '../../config/site';
import { useInView } from '../../hooks/useInView';
import { gsap, useGSAP } from '../../motion/gsap';
import { useMotion } from '../../motion/MotionContext';
import { useI18n } from '../../i18n/LanguageContext';
import { ErrorBoundary } from '../site/ErrorBoundary';
import { LangSwitch } from '../site/LangSwitch';
import { RiseHeading } from '../site/RiseHeading';

// three.js is only downloaded when the visitor gets close to the footer.
const BurgerField = lazy(() => import('../burger-field/BurgerField'));

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M7 17L17 7M8 7h9v9" />
  </svg>
);

export function Footer() {
  const { t } = useI18n();
  const { reduced } = useMotion();
  const footerRef = useRef(null);
  const wordRef = useRef(null);
  const nearby = useInView(footerRef, { rootMargin: '800px 0px', once: true });
  const visible = useInView(footerRef);

  useGSAP(() => {
    if (reduced) return;
    gsap.fromTo(wordRef.current.children, { yPercent: 100 }, {
      yPercent: 0,
      stagger: 0.04,
      ease: 'none',
      scrollTrigger: { trigger: wordRef.current, start: 'top bottom', end: 'bottom bottom', scrub: true },
    });
  }, { dependencies: [reduced] });

  const links = [
    { href: CONTACTS.telegramBot, label: t('tg'), value: CONTACTS.telegramHandle, external: true },
    { href: CONTACTS.instagram, label: t('ig'), value: CONTACTS.instagramHandle, external: true },
    { href: CONTACTS.phoneHref, label: t('call'), value: CONTACTS.phoneLabel },
  ];

  return (
    <footer className="footer" id="footer" data-theme-section="dark" ref={footerRef}>
      <div className="foot-scene">
        {nearby && (
          <ErrorBoundary>
            <Suspense fallback={null}>
              <BurgerField areaRef={footerRef} visible={visible} reducedMotion={reduced} />
            </Suspense>
          </ErrorBoundary>
        )}
      </div>

      <div className="wrap">
        <div className="foot-top">
          <RiseHeading>{t('footTitle')}</RiseHeading>
          <p className="lead">{t('footSub')}</p>
        </div>

        <div className="foot-links">
          {links.map(({ href, label, value, external }) => (
            <a key={href} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
              <small>{label}</small><strong>{value}</strong><ArrowIcon />
            </a>
          ))}
        </div>

        <div className="foot-word" ref={wordRef} aria-hidden="true">
          {[...BRAND_WORD].map((letter, i) => <span className="fw" key={i}>{letter}</span>)}
        </div>

        <div className="foot-bot">
          <span>© {new Date().getFullYear()} BURGESTA. {t('rights')}</span>
          <nav aria-label="Footer">
            <a href="#menu">{t('navMenu')}</a>
            <a href="#reviews">{t('navReviews')}</a>
            <a href="#visit">{t('navVisit')}</a>
            <a href="#top">{t('top')}</a>
          </nav>
          <LangSwitch />
        </div>
      </div>
    </footer>
  );
}
