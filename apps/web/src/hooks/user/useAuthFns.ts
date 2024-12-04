import { usePathname } from 'next/navigation';
import type { ParsedUrlQueryInput } from 'querystring';
import url from 'url';

import { useAuthSignedInBefore } from '~/components/auth/useAuthSignedInBefore';
import { useIntl } from '~/components/intl';

import { useI18nRouter } from '~/next-i18nostic/src';

type HrefProps = Readonly<{
  next?: string;
  query?: ParsedUrlQueryInput;
}>;

function forwardCurrentSearchParams(href: string) {
  if (typeof window === 'undefined') {
    return href;
  }

  const urlObj = new URL(
    href,
    'https://greatfrontend.com', // The domain is not used.
  );

  const searchParams = new URLSearchParams(window.location.search);

  searchParams.forEach((value, key) => {
    urlObj.searchParams.set(key, value);
  });

  return url.format({
    pathname: urlObj.pathname,
    search: urlObj.search,
  });
}

export function useAuthSignInUp() {
  const [signedInBefore] = useAuthSignedInBefore();
  const intl = useIntl();
  const router = useI18nRouter();
  // To redirect post-login, so we can use the full pathname.
  const pathname = usePathname();

  function signInUpHref({ next, query }: HrefProps | undefined = {}): string {
    return url.format({
      pathname: signedInBefore ? '/login' : '/sign-up',
      query: {
        next: forwardCurrentSearchParams(
          next || pathname || window.location.pathname,
        ),
        ...query,
      },
    });
  }

  return {
    navigateToSignInUpPage: (hrefProps: HrefProps | undefined = {}) =>
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

  function logoutHref({ next, query }: HrefProps | undefined = {}): string {
    return url.format({
      pathname: '/logout',
      query: {
        next: forwardCurrentSearchParams(
          next || pathname || window.location.pathname,
        ),
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
    navigateToLogoutPage: (hrefProps: HrefProps | undefined = {}) =>
      router.push(logoutHref(hrefProps)),
  };
}
