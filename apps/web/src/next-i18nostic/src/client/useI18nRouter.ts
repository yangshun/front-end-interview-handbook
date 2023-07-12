import type {
  AppRouterInstance,
  NavigateOptions,
} from 'next/dist/shared/lib/app-router-context';
import { useRouter } from 'next/navigation';

import useI18n from './useI18n';
import type { Locale } from '../types';
import i18nHref from '../utils/i18nHref';

type I18nNavigateOptions = NavigateOptions & {
  locale?: Locale;
};

type I18nAppRouterInstance = AppRouterInstance & {
  push: (href: string, options?: I18nNavigateOptions) => void;
  replace: (href: string, options?: I18nNavigateOptions) => void;
};

export default function useI18nRouter(): I18nAppRouterInstance {
  const router = useRouter();
  const { locale: contextLocale } = useI18n();

  return {
    ...router,
    push: (href: string, options?: I18nNavigateOptions) => {
      const { locale, ...navigateOptions } = options ?? {};

      router.push(
        i18nHref(href, locale ?? contextLocale).toString(),
        navigateOptions,
      );
    },
    replace: (href: string, options?: I18nNavigateOptions) => {
      const { locale, ...navigateOptions } = options ?? {};

      router.replace(
        i18nHref(href, locale ?? contextLocale).toString(),
        navigateOptions,
      );
    },
  };
}
