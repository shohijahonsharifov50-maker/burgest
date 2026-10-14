import { CONTACTS } from '../../config/site';
import { useI18n } from '../../i18n/LanguageContext';
import { RiseHeading } from './RiseHeading';

export function Visit() {
  const { t } = useI18n();
  return (
    <section className="visit" id="visit" data-theme-section="paper" aria-labelledby="visitTitle">
      <div className="wrap">
        <RiseHeading id="visitTitle">{t('visitTitle')}</RiseHeading>
        <div className="visit-grid">
          <dl className="info">
            <div><dt>{t('addrL')}</dt><dd>{t('addr')}</dd></div>
            <div><dt>{t('hoursL')}</dt><dd>{t('hours')}</dd></div>
            <div><dt>{t('phoneL')}</dt><dd><a href={CONTACTS.phoneHref}>{CONTACTS.phoneLabel}</a></dd></div>
            <div>
              <a className="btn btn--red" href={CONTACTS.directions} target="_blank" rel="noopener noreferrer">{t('route')}</a>
            </div>
          </dl>
          <div className="map">
            <iframe title="BURGESTA map" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={CONTACTS.mapEmbed} />
          </div>
          <div className="visit-photo"><img src="/img/facade-day.jpg" alt="" loading="lazy" /></div>
        </div>
      </div>
    </section>
  );
}
