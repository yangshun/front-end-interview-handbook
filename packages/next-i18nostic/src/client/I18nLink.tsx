import type { LinkProps } from 'next/link';
import Link from 'next/link';
import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';

import i18nHref from '../utils/i18nHref';
import type { Locale } from '../types';
import useI18n from './useI18n';

type Props = LinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> &
  Readonly<{
    children?: React.ReactNode;
    locale?: Locale;
  }>;

function I18nLink(
  { locale: localeParam, href, ...rest }: Props,
  ref: ForwardedRef<HTMLAnchorElement>,
) {
  const { locale: currentLocale } = useI18n();
  const locale = localeParam ?? currentLocale;

  return <Link ref={ref} href={i18nHref(href, locale)} {...rest} />;
}

export default forwardRef(I18nLink);
