import type { RedirectType } from 'next/navigation';
import { redirect } from 'next/navigation';
import URL from 'url';

import i18nHref from './i18nHref';

type RedirectOptions = Readonly<{ locale: string; type?: RedirectType }>;

export default function i18nRedirect(
  url: string,
  opts: RedirectOptions,
): never {
  const { locale, type } = opts;
  const localizedUrl = URL.format(i18nHref(url, locale));

  return redirect(localizedUrl, type);
}
