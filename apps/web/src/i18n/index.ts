import { createIntl, createIntlCache } from '@formatjs/intl';

import type { ResolvedIntlConfig } from '~/components/intl';

export type IntlMessages = ResolvedIntlConfig['messages'];

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const locales = {
  'en-US': () =>
    import('../locales/compiled/en-US.json').then((module) => module.default),
  'pt-BR': () =>
    import('../locales/compiled/pt-BR.json').then((module) => module.default),
  'zh-CN': () =>
    import('../locales/compiled/zh-CN.json').then((module) => module.default),
};

export async function getLocaleMessages(locale: string): Promise<IntlMessages> {
  const i18nStrings = await locales[locale as keyof typeof locales]();

  return i18nStrings;
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
