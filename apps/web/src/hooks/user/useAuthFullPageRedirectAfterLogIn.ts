import { useUser } from '@supabase/auth-helpers-react';
import { useEffect, useRef } from 'react';
import url from 'url';

import { trpc } from '~/hooks/trpc';

import { useAuthSignedInBefore } from '~/components/auth/useAuthSignedInBefore';

import { i18nHref, useI18n } from '~/next-i18nostic/src';

export default function useAuthFullPageRedirectAfterLogin(
  next: string | null | undefined,
) {
  const user = useUser();
  const { locale } = useI18n();
  const [, setSignedInBefore] = useAuthSignedInBefore();

  const scheduleWelcomeSeriesEmailMutation =
    trpc.emails.scheduleWelcomeSeries.useMutation();
  const scheduleWelcomeSeriesEmailMutationRef = useRef(
    scheduleWelcomeSeriesEmailMutation,
  );

  useEffect(() => {
    // Only run effect when user is logged in.
    if (user == null) {
      return;
    }

    setSignedInBefore(true);

    // Redirect user to the page they were intending to
    // go to (if defined) and if that page is not the current page.
    const redirectPath =
      !!next && next !== window.location.pathname
        ? next
        : '/interviews/dashboard';

    // Attempt to schedule welcome series email
    // No-op if sent before or account created too long ago
    if (!redirectPath.includes('projects')) {
      scheduleWelcomeSeriesEmailMutationRef.current.mutateAsync({
        userId: user.id,
      });
    }

    // The cookie is set on the client side, so race conditions can happen
    // where we redirect to a new page that checks for signed in status
    // on the server side but the auth cookie is not yet written.
    // Do a full page redirect to prevent race conditions.
    window.location.href = url.format(i18nHref(redirectPath, locale));
  }, [next, setSignedInBefore, user, locale]);
}
