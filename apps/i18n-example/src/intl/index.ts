import type { ResolvedIntlConfig } from 'react-intl';

import { createIntl,createIntlCache } from '@formatjs/intl';

export type IntlMessages = ResolvedIntlConfig['messages'];

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const locales = {
  de: () => import('../lang/de.json').then((module) => module.default),
  en: () => import('../lang/en.json').then((module) => module.default),
  zh: () => import('../lang/zh.json').then((module) => module.default),
};

export async function getLocaleMessages(locale: string): Promise<IntlMessages> {
  const i18nStrings = await locales[locale as keyof typeof locales]();
  const strings: IntlMessages = {};

  Object.entries(i18nStrings).map(([messageId, value]) => {
    strings[messageId] = value.defaultMessage;
  });

  return strings;
}

export async function getIntlServerOnly(locale: string) {
  const cache = createIntlCache();
  const messages = await getLocaleMessages(locale);

  return createIntl(
    {
      locale,
      messages,
    },
    cache,
  );
}
