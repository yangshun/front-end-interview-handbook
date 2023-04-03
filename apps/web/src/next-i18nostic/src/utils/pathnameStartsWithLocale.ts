import type { Locale } from '../types';

export default function pathnameStartsWithLocale(
  pathname: string,
  locale: Locale,
) {
  if (pathname === `/${locale}`) {
    return true;
  }

  return pathname.startsWith(`/${locale}/`);
}
