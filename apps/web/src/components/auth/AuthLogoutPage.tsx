'use client';

import jsCookie from 'js-cookie';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { useIntl } from '~/components/intl';
import Container from '~/components/ui/Container';
import EmptyState from '~/components/ui/EmptyState';

import { useI18nRouter } from '~/next-i18nostic/src';
import { useSupabaseClientGFE } from '~/supabase/SupabaseClientGFE';

export default function AuthLogoutPage() {
  const supabaseClient = useSupabaseClientGFE();
  const intl = useIntl();
  const router = useI18nRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    async function logout() {
      await supabaseClient.auth.signOut();

      const nextSearchParam = searchParams?.get('next');
      // Redirect user to the previous page if defined and the
      // previous page is not the logout page.
      const redirectPath =
        !!nextSearchParam && nextSearchParam !== window.location.pathname
          ? nextSearchParam
          : '/interviews/dashboard';

      // TODO: There's a problem with signing out not actually signing out.
      // Force the cookie to be removed and wait a while before redirecting.
      setTimeout(() => {
        jsCookie.remove('supabase-auth-token');
        // Effects are fired twice in development and will result
        // in double redirection and the second redirection will end up
        // bringing the user to the default page. Do this check so that
        // this only runs if we're on the logout page.
        if (window.location.pathname.includes('/logout')) {
          // Do a hard redirect.
          window.location.href = redirectPath;
        }
      }, 1000);
    }

    logout();
  }, [searchParams, router, supabaseClient.auth]);

  return (
    <Container className="flex h-96 items-center justify-center">
      <EmptyState
        title={intl.formatMessage({
          defaultMessage: 'Signing out. See you again!',
          description: 'Main content of Sign Out page',
          id: 'R1ji0N',
        })}
        variant="exit"
      />
    </Container>
  );
}
