'use client';

import { usePathname } from 'next/navigation';

import type { Locale } from '../types';
import parseI18nPathname from '../utils/parseI18nPathname';

export default function useI18nPathname(): Readonly<{
  locale: Locale | null;
  pathname: string | null;
}> {
  const pathname = usePathname();

  if (pathname == null) {
    return { locale: null, pathname: null };
  }

  return parseI18nPathname(pathname);
}
