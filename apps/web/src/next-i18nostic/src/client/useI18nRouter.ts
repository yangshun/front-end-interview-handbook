'use client';

import type {
  AppRouterInstance,
  NavigateOptions,
  PrefetchOptions,
} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import type { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import url from 'url';

import type { Locale } from '../types';
import i18nHref from '../utils/i18nHref';
import useI18n from './useI18n';

type I18nNavigateOptions = NavigateOptions & {
  locale?: Locale;
};
type I18nPrefetchOptions = PrefetchOptions & {
  locale?: Locale;
};

type I18nAppRouterInstance = AppRouterInstance & {
  prefetch: (href: LinkProps['href'], options?: I18nPrefetchOptions) => void;
  push: (href: LinkProps['href'], options?: I18nNavigateOptions) => void;
  replace: (href: LinkProps['href'], options?: I18nNavigateOptions) => void;
};

export default function useI18nRouter(): I18nAppRouterInstance {
  const router = useRouter();
  const { locale: contextLocale } = useI18n();

  return {
    ...router,
    prefetch: (href: LinkProps['href'], options?: I18nPrefetchOptions) => {
      router.prefetch(
        url.format(i18nHref(href, options?.locale ?? contextLocale)),
        options?.kind != null ? { kind: options.kind } : undefined,
      );
    },
    push: (href: LinkProps['href'], options?: I18nNavigateOptions) => {
      const { locale, ...navigateOptions } = options ?? {};

      router.push(
        url.format(i18nHref(href, locale ?? contextLocale)),
        navigateOptions,
      );
    },
    replace: (href: LinkProps['href'], options?: I18nNavigateOptions) => {
      const { locale, ...navigateOptions } = options ?? {};

      router.replace(
        url.format(i18nHref(href, locale ?? contextLocale)),
        navigateOptions,
      );
    },
  };
}
