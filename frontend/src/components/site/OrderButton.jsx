import { CONTACTS } from '../../config/site';
import { useI18n } from '../../i18n/LanguageContext';

export function OrderButton({ className = 'btn btn--red' }) {
  const { t } = useI18n();
  return (
    <a className={className} href={CONTACTS.telegramBot} target="_blank" rel="noopener noreferrer">
      {t('order')}
    </a>
  );
}
