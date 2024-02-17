import type {
  AppRouterInstance,
  NavigateOptions,
  PrefetchOptions,
} from 'next/dist/shared/lib/app-router-context';
import type { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';

import useI18n from './useI18n';
import type { Locale } from '../types';
import i18nHref from '../utils/i18nHref';

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
        i18nHref(href, options?.locale ?? contextLocale).toString(),
        options?.kind != null ? { kind: options.kind } : undefined,
      );
    },
    push: (href: LinkProps['href'], options?: I18nNavigateOptions) => {
      const { locale, ...navigateOptions } = options ?? {};

      router.push(
        i18nHref(href, locale ?? contextLocale).toString(),
        navigateOptions,
      );
    },
    replace: (href: LinkProps['href'], options?: I18nNavigateOptions) => {
      const { locale, ...navigateOptions } = options ?? {};

      router.replace(
        i18nHref(href, locale ?? contextLocale).toString(),
        navigateOptions,
      );
    },
  };
}
