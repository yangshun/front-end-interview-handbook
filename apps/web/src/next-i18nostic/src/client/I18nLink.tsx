import type { LinkProps } from 'next/link';
import Link from 'next/link';
import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';

import type { Locale } from '../types';
import i18nHref from '../utils/i18nHref';
import useI18n from './useI18n';

export type Props = LinkProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
  Readonly<{
    children?: React.ReactNode;
    locale?: Locale;
  }>;

function I18nLink(
  { locale: localeParam, href, ...props }: Props,
  ref: ForwardedRef<HTMLAnchorElement>,
) {
  const { locale: currentLocale } = useI18n();
  const locale = localeParam ?? currentLocale;

  return <Link ref={ref} href={i18nHref(href, locale)} {...props} />;
}

export default forwardRef(I18nLink);
