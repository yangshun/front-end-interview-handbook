import nextI18nosticConfig from 'next-i18nostic/config';

import type { Locale } from '../types';

export default function parseI18nPathname(pathname: string): Readonly<{
  locale: Locale | null;
  pathname: string;
}> {
  for (const locale of nextI18nosticConfig.locales) {
    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      return { locale, pathname: pathname.replace(`/${locale}`, '') || '/' };
    }
  }

  return { locale: nextI18nosticConfig.defaultLocale, pathname };
}
