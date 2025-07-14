import { usePathname } from 'next/navigation';
import type { ParsedUrlQueryInput } from 'querystring';
import { useLocation } from 'react-use';
import url from 'url';
import { useIsClient } from 'usehooks-ts';

import { useAuthSignedInBefore } from '~/components/auth/useAuthSignedInBefore';
import { useIntl } from '~/components/intl';

import { useI18nRouter } from '~/next-i18nostic/src';
import { mergeURLWithCurrentParamsHash } from '~/utils/merge-url-params-hash';

type AuthHrefProps = Readonly<{
  next?: string;
  query?: ParsedUrlQueryInput;
}>;

export function useAuthSignInUp() {
  const [signedInBefore] = useAuthSignedInBefore();
  const intl = useIntl();
  const router = useI18nRouter();
  // To redirect post-login, so we can use the full pathname.
  const pathname = usePathname();
  const isClient = useIsClient();

  // `signInUpHref()` relies on window and does not update when the search param changes
  // Hence use useLocation() to listen to URL changes and force re-renders
  useLocation();

  function signInUpHref({
    next,
    query,
  }: AuthHrefProps | undefined = {}): string {
    const resolvedNext = next || pathname || window.location.pathname;

    return url.format({
      pathname: signedInBefore ? '/login' : '/sign-up',
      query: {
        // To prevent hydration errors and add query params
        // when on the client
        next: isClient
          ? mergeURLWithCurrentParamsHash(resolvedNext)
          : resolvedNext,
        ...query,
      },
    });
  }

  return {
    navigateToSignInUpPage: (hrefProps: AuthHrefProps | undefined = {}) =>
      router.push(signInUpHref(hrefProps)),
    signInUpHref,
    signInUpLabel: intl.formatMessage({
      defaultMessage: 'Sign in / up',
      description: 'Link label to the sign in / up page',
      id: 'Hh2IoR',
    }),
  };
}

export function useAuthLogout() {
  const intl = useIntl();
  const router = useI18nRouter();
  // To redirect post-login, so we can use the full pathname.
  const pathname = usePathname();
  const isClient = useIsClient();

  // `logoutHref()` relies on window and does not update when the search param changes
  // Hence use useLocation() to listen to URL changes and force re-renders
  useLocation();

  function logoutHref({ next, query }: AuthHrefProps | undefined = {}): string {
    const resolvedNext = next || pathname || window.location.pathname;

    return url.format({
      pathname: '/logout',
      query: {
        // To prevent hydration errors and add query params
        // when on the client
        next: isClient
          ? mergeURLWithCurrentParamsHash(resolvedNext)
          : resolvedNext,
        ...query,
      },
    });
  }

  return {
    logoutHref,
    logoutLabel: intl.formatMessage({
      defaultMessage: 'Sign out',
      description: 'Link label to the sign out page',
      id: 'BDbpLJ',
    }),
    navigateToLogoutPage: (hrefProps: AuthHrefProps | undefined = {}) =>
      router.push(logoutHref(hrefProps)),
  };
}
