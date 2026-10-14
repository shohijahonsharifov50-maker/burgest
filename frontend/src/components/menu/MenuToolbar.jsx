import { useI18n } from '../../i18n/LanguageContext';

const SORT_OPTIONS = [
  ['default', 'sortDefault'],
  ['az', 'sortAZ'],
  ['cheap', 'sortCheap'],
  ['exp', 'sortExp'],
];

export function MenuToolbar({ query, onQueryChange, sort, onSortChange }) {
  const { t } = useI18n();
  return (
    <div className="menu-tools">
      <label className="field">
        <span className="vh">{t('search')}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" />
        </svg>
        <input type="search" value={query} placeholder={t('search')} autoComplete="off"
          onChange={(event) => onQueryChange(event.target.value)} />
      </label>
      <label className="sort">
        <span className="vh">{t('sortDefault')}</span>
        <select value={sort} onChange={(event) => onSortChange(event.target.value)}>
          {SORT_OPTIONS.map(([value, key]) => <option key={value} value={value}>{t(key)}</option>)}
        </select>
      </label>
    </div>
  );
}
