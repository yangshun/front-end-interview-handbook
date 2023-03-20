import I18nContext from './I18nContext';
import type { Locale } from '../types';

type Props = Readonly<{
  children: React.ReactNode;
  locale: Locale;
}>;

export default function I18nProvider({ locale, children }: Props) {
  return (
    <I18nContext.Provider value={{ locale }}>{children}</I18nContext.Provider>
  );
}
