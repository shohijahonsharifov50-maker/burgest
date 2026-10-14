import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../../i18n/LanguageContext';

/** Sticky category bar. The chip of the section currently on screen is highlighted. */
export function CategoryChips({ categories, listRef }) {
  const { pick } = useI18n();
  const [active, setActive] = useState(null);
  const barRef = useRef(null);
  const slugs = categories.map((c) => c.slug).join(',');

  useEffect(() => {
    const sections = listRef.current?.querySelectorAll('.mcat') ?? [];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.dataset.slug));
    }, { rootMargin: '-35% 0px -60% 0px' });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [slugs, listRef]);

  useEffect(() => {
    const chip = barRef.current?.querySelector(`[data-slug="${active}"]`);
    if (chip) barRef.current.scrollTo({ left: chip.offsetLeft - 16, behavior: 'smooth' });
  }, [active]);

  return (
    <nav className="chips" aria-label="Menu categories" ref={barRef}>
      {categories.map((category) => (
        <a key={category.slug} href={`#cat-${category.slug}`} data-slug={category.slug}
          className={`chip${active === category.slug ? ' on' : ''}`}>
          {pick(category.name)}<sup>{category.items.length}</sup>
        </a>
      ))}
    </nav>
  );
}
