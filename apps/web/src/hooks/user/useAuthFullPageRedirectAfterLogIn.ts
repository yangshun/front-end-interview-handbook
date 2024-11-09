import { useEffect } from 'react';

import { useAuthSignedInBefore } from '~/components/auth/useAuthSignedInBefore';

import { useUser } from '@supabase/auth-helpers-react';

export default function useAuthFullPageRedirectAfterLogin(
  next: string | null | undefined,
) {
  const user = useUser();
  const [, setSignedInBefore] = useAuthSignedInBefore();

  useEffect(() => {
    // Only run effect when user is logged in.
    if (user == null) {
      return;
    }

    setSignedInBefore(true);

    // Redirect user to the page they were intending to
    // go to (if defined) and if that page is not the current page.
    const redirectPath =
      !!next && next !== window.location.pathname ? next : '/questions';

    // The cookie is set on the client side, so race conditions can happen
    // where we redirect to a new page that checks for signed in status
    // on the server side but the auth cookie is not yet written.
    // Do a full page redirect to prevent race conditions.
    window.location.href = redirectPath;
  }, [next, setSignedInBefore, user]);
}
