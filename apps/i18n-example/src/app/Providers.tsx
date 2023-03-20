'use client';

import { I18nProvider } from 'next-i18nostic';
import nextI18nosticConfig from 'next-i18nostic/config';
import { IntlProvider } from 'react-intl';

import type { IntlMessages } from '~/intl';

type Props = Readonly<{
  children: React.ReactNode;
  intlMessages: IntlMessages;
  locale: string;
}>;

export function Providers({ children, intlMessages, locale }: Props) {
  return (
    <I18nProvider locale={locale}>
      <IntlProvider
        defaultLocale={nextI18nosticConfig.defaultLocale}
        locale={locale}
        messages={intlMessages}>
        {children}
      </IntlProvider>
    </I18nProvider>
  );
}
