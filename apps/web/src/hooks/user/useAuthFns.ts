import { usePathname } from 'next/navigation';
import { useIntl } from 'react-intl';

import { useI18nRouter } from '~/next-i18nostic/src';

export function useAuthFns() {
  const intl = useIntl();
  const router = useI18nRouter();
  // To redirect post-login, so we can use the full pathname.
  const pathname = usePathname();

  function logoutHref(nextHref?: string) {
    return `/logout?next=${encodeURIComponent(
      nextHref ?? pathname ?? window.location.pathname,
    )}`;
  }

  function signInUpHref(nextHref?: string) {
    return `/login?next=${encodeURIComponent(
      nextHref ?? pathname ?? window.location.pathname,
    )}`;
  }

  return {
    logoutHref,
    logoutLabel: intl.formatMessage({
      defaultMessage: 'Sign Out',
      description: 'Link label to the sign out page',
      id: '641P5n',
    }),
    navigateToLogoutPage: (nextHref?: string) =>
      router.push(logoutHref(nextHref)),
    navigateToSignInUpPage: (nextHref?: string) =>
      router.push(signInUpHref(nextHref)),
    signInUpHref,
    signInUpLabel: intl.formatMessage({
      defaultMessage: 'Sign In / Up',
      description: 'Link label to the sign in / up page',
      id: 'q3MA2w',
    }),
  };
}
