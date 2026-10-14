import { useMemo, useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../../motion/gsap';
import { useMotion } from '../../motion/MotionContext';
import { useI18n } from '../../i18n/LanguageContext';
import { OrderButton } from '../site/OrderButton';
import { RiseHeading } from '../site/RiseHeading';
import { CategoryChips } from './CategoryChips';
import { MenuCategory } from './MenuCategory';
import { MenuToolbar } from './MenuToolbar';
import { filterMenu } from './menuFilter';

/** The menu comes from the API (`useMenu`), so changes made in the admin panel show up here. */
export function MenuSection({ menu }) {
  const { t, lang } = useI18n();
  const { reduced } = useMotion();
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('default');
  const listRef = useRef(null);

  const categories = useMemo(
    () => filterMenu(menu.categories, { query, sort, lang }),
    [menu.categories, query, sort, lang],
  );
  const listKey = categories.map((c) => `${c.slug}:${c.items.map((i) => i.id).join('.')}`).join('|');

  // Rows fade in as they arrive; page measurements are refreshed whenever the list changes height.
  useGSAP(() => {
    if (!reduced) {
      ScrollTrigger.batch(listRef.current.querySelectorAll('.mitem'), {
        start: 'top 94%',
        once: true,
        onEnter: (rows) => gsap.fromTo(rows, { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.03, ease: 'power2.out', overwrite: true }),
      });
    }
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, { dependencies: [listKey, reduced], revertOnUpdate: true });

  return (
    <section className="menu" id="menu" data-theme-section="paper" aria-labelledby="menuTitle">
      <div className="wrap">
        <div className="menu-head">
          <RiseHeading id="menuTitle">{t('menuTitle')}</RiseHeading>
          <p className="lead">{t('menuLead')}</p>
        </div>

        <MenuToolbar query={query} onQueryChange={setQuery} sort={sort} onSortChange={setSort} />
        <CategoryChips categories={categories} listRef={listRef} />

        <div ref={listRef}>
          {categories.map((category) => <MenuCategory key={category.slug} category={category} />)}
        </div>

        {menu.status === 'loading' && <p className="menu-state">{t('menuLoading')}</p>}
        {menu.status === 'error' && (
          <div className="menu-state">
            <p>{t('menuError')}</p>
            <button type="button" className="btn btn--red" onClick={menu.retry}>{t('retry')}</button>
          </div>
        )}
        {menu.status === 'ready' && categories.length === 0 && <p className="menu-empty">{t('empty')}</p>}

        <div className="menu-foot">
          <p>{t('priceNote')}</p>
          <OrderButton />
        </div>
      </div>
    </section>
  );
}
