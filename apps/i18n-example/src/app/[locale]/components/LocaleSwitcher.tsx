'use client';

import { I18nLink, useI18nPathname } from 'next-i18nostic';
import nextI18nosticConfig from 'next-i18nostic/config';

export default function LocaleSwitcher() {
  const { pathname } = useI18nPathname();

  return (
    <div style={{ display: 'flex' }}>
      <p>Language:</p>
      <ul style={{ columnGap: 10, display: 'flex', listStyleType: 'none' }}>
        {nextI18nosticConfig.locales.map((locale) => (
          <li key={locale}>
            <I18nLink href={pathname!} locale={locale}>
              {locale}
            </I18nLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
