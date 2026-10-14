import { useI18n } from '../../i18n/LanguageContext';
import { LANGUAGES } from '../../i18n/translations';

export function LangSwitch() {
  const { lang, setLang } = useI18n();
  return (
    <div className="lang" role="group" aria-label="Language">
      {LANGUAGES.map((code) => (
        <button key={code} type="button" aria-pressed={code === lang} onClick={() => setLang(code)}>
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
