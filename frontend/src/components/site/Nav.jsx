import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../../motion/gsap';
import { useMotion } from '../../motion/MotionContext';
import { useI18n } from '../../i18n/LanguageContext';
import { LangSwitch } from './LangSwitch';
import { LogoMark } from './LogoMark';
import { OrderButton } from './OrderButton';

const LINKS = [
  ['#stage', 'navBurger'],
  ['#gallery', 'navPlace'],
  ['#menu', 'navMenu'],
  ['#reviews', 'navReviews'],
  ['#visit', 'navVisit'],
];

export function Nav({ navMarkRef }) {
  const { t } = useI18n();
  const { reduced } = useMotion();
  const navRef = useRef(null);
  const progressRef = useRef(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const sheetOpenRef = useRef(false);

  useEffect(() => {
    sheetOpenRef.current = sheetOpen;
    document.documentElement.classList.toggle('sheet-open', sheetOpen);
  }, [sheetOpen]);

  // Reading progress bar, translucent bar after the first scroll, and hide-while-scrolling-down.
  useGSAP(() => {
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        gsap.set(progressRef.current, { scaleX: self.progress });
        const nav = navRef.current;
        nav.classList.toggle('scrolled', self.scroll() > 40);
        nav.classList.toggle('hide', !reduced && self.direction === 1 && self.scroll() > 600 && !sheetOpenRef.current);
      },
    });
  }, { dependencies: [reduced] });

  const closeSheet = () => setSheetOpen(false);
  const links = (onClick) => LINKS.map(([href, key]) => (
    <a key={href} href={href} onClick={onClick}>{t(key)}</a>
  ));

  return (
    <>
      <div id="progress" ref={progressRef} aria-hidden="true" />
      <header className="nav" id="nav" ref={navRef}>
        <a className="brand" href="#top" aria-label="BURGESTA">
          <LogoMark ref={navMarkRef} />
          <span>BURGESTA</span>
        </a>
        <nav className="nav__links" aria-label="Main">{links()}</nav>
        <LangSwitch />
        <OrderButton />
        <button
          className="nav__toggle"
          type="button"
          aria-expanded={sheetOpen}
          aria-controls="navSheet"
          aria-label={t('menuToggle')}
          onClick={() => setSheetOpen((open) => !open)}
        >
          <i />
        </button>
      </header>

      <div className={`sheet${sheetOpen ? ' open' : ''}`} id="navSheet">
        <nav aria-label="Mobile">{links(closeSheet)}</nav>
        <LangSwitch />
        <OrderButton />
      </div>
    </>
  );
}
