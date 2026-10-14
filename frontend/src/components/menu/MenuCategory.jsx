import { formatPrice } from '../../lib/format';
import { useI18n } from '../../i18n/LanguageContext';

export function MenuCategory({ category }) {
  const { t, lang, pick } = useI18n();
  return (
    <section className="mcat" id={`cat-${category.slug}`} data-slug={category.slug}>
      <h3 className="mcat__title">{pick(category.name)}</h3>
      {category.note && <p className="mcat__note">{pick(category.note)}</p>}
      <ul className="mlist">
        {category.items.map((item) => (
          <li className="mitem" key={item.id}>
            <span className="mitem__name">
              {pick(item.name)}
              {item.tag && <em className={`mtag mtag--${item.tag === 'HIT' ? 'hit' : 'sig'}`}>{t(`tag${item.tag}`)}</em>}
            </span>
            <span className="mitem__dots" aria-hidden="true" />
            <span className="mitem__price">{formatPrice(item.price, lang, t('currency'))}</span>
            {item.weightGrams && <span className="mitem__w">{item.weightGrams} {t('grams')}</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}
