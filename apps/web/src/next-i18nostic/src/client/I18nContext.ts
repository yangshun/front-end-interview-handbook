'use client';

import nextI18nosticConfig from 'next-i18nostic/config';
import { createContext } from 'react';

import type { Locale } from '../types';

export type I18nContextType = Readonly<{
  locale: Locale;
}>;

const LocaleContext = createContext<I18nContextType>({
  locale: nextI18nosticConfig.defaultLocale,
});

export default LocaleContext;
